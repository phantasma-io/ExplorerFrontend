import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import csvDownload from 'json-to-csv-export';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useEcho } from 'hooks/useEcho';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import {
  EventResult,
  Transaction,
  TransactionParams,
  TransactionResults,
} from 'types/api';
import { Table } from 'components/table';
import { Dialog } from 'components/layout';
import { useTransactionData } from 'hooks/api';
import { InlineSearch } from 'components/table/Controls/InlineSearch';

export interface TransactionsListProps {
  address?: string;
  block?: string;
}

type ExportFormat = 'raw' | 'koinly';
type DatePreset =
  | 'custom'
  | 'last-7-days'
  | 'last-30-days'
  | 'previous-month'
  | 'year-to-date'
  | 'previous-year';

const KOINLY_COLUMNS = [
  'Date',
  'Sent Amount',
  'Sent Currency',
  'Received Amount',
  'Received Currency',
  'Fee Amount',
  'Fee Currency',
  'Net Worth Amount',
  'Net Worth Currency',
  'Label',
  'Description',
  'TxHash',
] as const;

type KoinlyRow = Record<(typeof KOINLY_COLUMNS)[number], string>;

type ExportEvent = {
  amount: string;
  currency: string;
  description: string;
  isNft: boolean;
};

type KoinlyExportOptions = {
  address: string;
  includeFungible: boolean;
  includeNft: boolean;
  groupSwap: boolean;
  includeFees: boolean;
  includeFeeOnly: boolean;
};

const pad2 = (value: number) => value.toString().padStart(2, '0');

const DEFAULT_PRESET: DatePreset = 'previous-year';

const formatUtcInputValue = (date: Date) =>
  `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(
    date.getUTCDate(),
  )}T${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}`;

const toUtcDate = (
  year: number,
  monthIndex: number,
  day: number,
  hour = 0,
  minute = 0,
) => new Date(Date.UTC(year, monthIndex, day, hour, minute, 0));

const getPresetRange = (preset: DatePreset) => {
  if (preset === 'custom') return null;

  // Use UTC calendar boundaries to avoid local timezone shifts in exports.
  const now = new Date();
  const nowUtc = toUtcDate(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
  );

  switch (preset) {
    case 'last-7-days': {
      const from = new Date(nowUtc.getTime() - 7 * 24 * 60 * 60 * 1000);
      return {
        from: formatUtcInputValue(from),
        to: formatUtcInputValue(nowUtc),
      };
    }
    case 'last-30-days': {
      const from = new Date(nowUtc.getTime() - 30 * 24 * 60 * 60 * 1000);
      return {
        from: formatUtcInputValue(from),
        to: formatUtcInputValue(nowUtc),
      };
    }
    case 'previous-month': {
      const year = nowUtc.getUTCFullYear();
      const month = nowUtc.getUTCMonth();
      const from = toUtcDate(year, month - 1, 1, 0, 0);
      const to = toUtcDate(year, month, 0, 23, 59);
      return {
        from: formatUtcInputValue(from),
        to: formatUtcInputValue(to),
      };
    }
    case 'year-to-date': {
      const year = nowUtc.getUTCFullYear();
      const from = toUtcDate(year, 0, 1, 0, 0);
      return {
        from: formatUtcInputValue(from),
        to: formatUtcInputValue(nowUtc),
      };
    }
    case 'previous-year': {
      const year = nowUtc.getUTCFullYear() - 1;
      const from = toUtcDate(year, 0, 1, 0, 0);
      const to = toUtcDate(year, 11, 31, 23, 59);
      return {
        from: formatUtcInputValue(from),
        to: formatUtcInputValue(to),
      };
    }
    default:
      return null;
  }
};

const parseUtcInputValue = (value: string) => {
  if (!value) return null;
  const [datePart, timePart] = value.split('T');
  if (!datePart || !timePart) return null;
  const [yearText, monthText, dayText] = datePart.split('-');
  const [hourText, minuteText, secondText] = timePart.split(':');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  // `datetime-local` omits seconds, so default to 0 to avoid Date.UTC NaN.
  const second = secondText === undefined ? 0 : Number(secondText);
  if ([year, month, day, hour, minute, second].some((item) => Number.isNaN(item))) {
    return null;
  }
  const utc = Date.UTC(year, month - 1, day, hour, minute, second);
  if (!Number.isFinite(utc)) return null;
  return Math.floor(utc / 1000).toString();
};

const formatKoinlyDate = (unixSeconds?: string) => {
  if (!unixSeconds) return '';
  const parsed = Number(unixSeconds);
  if (!Number.isFinite(parsed)) return '';
  const date = new Date(parsed * 1000);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(
    date.getUTCDate(),
  )} ${pad2(date.getUTCHours())}:${pad2(
    date.getUTCMinutes(),
  )}:${pad2(date.getUTCSeconds())}`;
};

const normalizeAddress = (value: string) => value.trim().toLowerCase();

const isNftEvent = (event: EventResult) =>
  Boolean(event.nft_metadata) ||
  (event.token_event?.token ? !event.token_event.token.fungible : false);

const createKoinlyRow = (tx: Transaction): KoinlyRow => ({
  Date: formatKoinlyDate(tx.date),
  'Sent Amount': '',
  'Sent Currency': '',
  'Received Amount': '',
  'Received Currency': '',
  'Fee Amount': '',
  'Fee Currency': '',
  'Net Worth Amount': '',
  'Net Worth Currency': '',
  Label: '',
  Description: '',
  TxHash: tx.hash ?? '',
});

const buildKoinlyRows = (
  transactions: Transaction[],
  options: KoinlyExportOptions,
) => {
  const rows: KoinlyRow[] = [];
  const addressNormalized = normalizeAddress(options.address);
  const nftPlaceholders = new Map<string, string>();
  let nftIndex = 1;

  const getNftPlaceholder = (key: string) => {
    if (!nftPlaceholders.has(key)) {
      nftPlaceholders.set(key, `NFT${nftIndex}`);
      nftIndex += 1;
    }
    return nftPlaceholders.get(key) ?? `NFT${nftIndex}`;
  };

  const toExportEvent = (event: EventResult): ExportEvent | null => {
    const nft = isNftEvent(event);
    if (nft && !options.includeNft) return null;
    if (!nft && !options.includeFungible) return null;

    if (nft) {
      const nftKey =
        event.token_id ||
        event.nft_metadata?.name ||
        `${event.transaction_hash ?? ''}:${event.event_id ?? ''}`;
      const currency = getNftPlaceholder(nftKey);
      // Koinly expects NFT placeholders to use amount=1; token_event.value is often the token id.
      const amount = '1';
      const description = event.nft_metadata?.name || event.token_id || '';
      return {
        amount,
        currency,
        description,
        isNft: true,
      };
    }

    const amount = event.token_event?.value ?? '';
    const currency = event.token_event?.token?.symbol || event.token_id || '';
    if (!amount || !currency) return null;
    return {
      amount,
      currency,
      description: '',
      isNft: false,
    };
  };

  for (const tx of transactions) {
    const date = formatKoinlyDate(tx.date);
    if (!date) continue;

    const feeAmount = options.includeFees ? tx.fee ?? '' : '';
    const feeCurrency = feeAmount ? 'KCAL' : '';
    const sentEvents: ExportEvent[] = [];
    const receivedEvents: ExportEvent[] = [];

    // Limit to explicit transfer events to avoid misclassifying other on-chain actions in Koinly.
    for (const event of tx.events ?? []) {
      if (!event.event_kind) continue;
      const eventAddress = normalizeAddress(event.address ?? '');
      const eventName = normalizeAddress(event.address_name ?? '');
      if (eventAddress !== addressNormalized && eventName !== addressNormalized)
        continue;
      if (event.event_kind !== 'TokenSend' && event.event_kind !== 'TokenReceive')
        continue;

      const exportEvent = toExportEvent(event);
      if (!exportEvent) continue;
      if (event.event_kind === 'TokenSend') {
        sentEvents.push(exportEvent);
      } else {
        receivedEvents.push(exportEvent);
      }
    }

    let rowsAdded = 0;
    let feeAssigned = false;

    const assignFee = (row: KoinlyRow) => {
      // Apply fee once per transaction to avoid double counting on multi-transfer rows.
      if (feeAssigned || !feeAmount) return;
      row['Fee Amount'] = feeAmount;
      row['Fee Currency'] = feeCurrency;
      feeAssigned = true;
    };

    if (
      options.groupSwap &&
      sentEvents.length === 1 &&
      receivedEvents.length === 1 &&
      !sentEvents[0].isNft &&
      !receivedEvents[0].isNft
    ) {
      const row = createKoinlyRow(tx);
      row['Sent Amount'] = sentEvents[0].amount;
      row['Sent Currency'] = sentEvents[0].currency;
      row['Received Amount'] = receivedEvents[0].amount;
      row['Received Currency'] = receivedEvents[0].currency;
      row.Label = 'Swap';
      assignFee(row);
      rows.push(row);
      rowsAdded += 1;
      continue;
    }

    for (const event of sentEvents) {
      const row = createKoinlyRow(tx);
      row['Sent Amount'] = event.amount;
      row['Sent Currency'] = event.currency;
      row.Description = event.description;
      assignFee(row);
      rows.push(row);
      rowsAdded += 1;
    }

    for (const event of receivedEvents) {
      const row = createKoinlyRow(tx);
      row['Received Amount'] = event.amount;
      row['Received Currency'] = event.currency;
      row.Description = event.description;
      assignFee(row);
      rows.push(row);
      rowsAdded += 1;
    }

    if (rowsAdded === 0 && options.includeFeeOnly && feeAmount) {
      const row = createKoinlyRow(tx);
      row['Sent Amount'] = feeAmount;
      row['Sent Currency'] = 'KCAL';
      row.Description = 'Network fee';
      rows.push(row);
    }
  }

  return rows;
};

type TransactionsExportProps = {
  address: string;
  rawTransactions: Transaction[];
};

const TransactionsExportButton = ({
  address,
  rawTransactions,
}: TransactionsExportProps) => {
  const { echo } = useEcho();
  const defaultRange = getPresetRange(DEFAULT_PRESET);
  const [isOpen, isOpenSet] = useState(false);
  const [format, formatSet] = useState<ExportFormat>('koinly');
  const [preset, presetSet] = useState<DatePreset>(DEFAULT_PRESET);
  const [from, fromSet] = useState(
    defaultRange?.from ??
      formatUtcInputValue(
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      ),
  );
  const [to, toSet] = useState(
    defaultRange?.to ?? formatUtcInputValue(new Date()),
  );
  const [includeFungible, includeFungibleSet] = useState(true);
  const [includeNft, includeNftSet] = useState(false);
  const [groupSwap, groupSwapSet] = useState(true);
  const [includeFees, includeFeesSet] = useState(true);
  const [includeFeeOnly, includeFeeOnlySet] = useState(true);
  const [exporting, exportingSet] = useState(false);
  const [exportError, exportErrorSet] = useState<string | null>(null);

  const closeDialog = useCallback(() => {
    if (!exporting) {
      exportErrorSet(null);
      isOpenSet(false);
    }
  }, [exporting]);

  const openDialog = useCallback(() => {
    isOpenSet(true);
  }, []);

  const applyPreset = useCallback((value: DatePreset) => {
    const range = getPresetRange(value);
    if (!range) return;
    fromSet(range.from);
    toSet(range.to);
  }, []);

  const normalizeFilenameAddress = (value: string) =>
    value.replace(/[^a-zA-Z0-9-_]/g, '');
  const toFilenameDate = (value: string) => value.replace(/[^0-9]/g, '');

  const fetchTransactions = useCallback(
    async (params: TransactionParams) => {
      const transactions: Transaction[] = [];
      let cursor: string | undefined;
      let safetyCounter = 0;

      do {
        const response = await axios.get<TransactionResults>(
          endpoints['/transactions']({
            ...params,
            cursor,
          }),
          { timeout: 60_000 },
        );
        const data = response.data;
        if (data?.transactions?.length) {
          transactions.push(...data.transactions);
        }
        cursor = data?.next_cursor || undefined;
        safetyCounter += 1;
      } while (cursor && safetyCounter < 1000);

      return transactions;
    },
    [],
  );

  const handleExport = useCallback(async () => {
    exportErrorSet(null);

    if (format === 'raw') {
      const filename = `PhantasmaExplorer-Transactions-${nanoid()}.csv`;
      csvDownload(rawTransactions, filename, ',');
      isOpenSet(false);
      return;
    }

    const fromUnix = parseUtcInputValue(from);
    const toUnix = parseUtcInputValue(to);
    if (!fromUnix || !toUnix || !Number.isFinite(Number(fromUnix)) || !Number.isFinite(Number(toUnix))) {
      exportErrorSet('Select a valid date range.');
      return;
    }
    if (Number(fromUnix) > Number(toUnix)) {
      exportErrorSet('Start date must be before end date.');
      return;
    }

    exportingSet(true);
    try {
      const transactions = await fetchTransactions({
        address,
        date_greater: fromUnix,
        date_less: toUnix,
        limit: 100,
        order_by: 'id',
        order_direction: 'asc',
        with_events: 1,
        with_event_data: 1,
        with_nft: includeNft ? 1 : 0,
      });
      const rows = buildKoinlyRows(transactions, {
        address,
        includeFungible,
        includeNft,
        groupSwap,
        includeFees,
        includeFeeOnly,
      });
      if (!rows.length) {
        exportErrorSet('No transactions found for the selected range.');
        return;
      }
      const filename = `PhantasmaExplorer-Transactions-Koinly-${normalizeFilenameAddress(
        address,
      )}-${toFilenameDate(from)}-${toFilenameDate(to)}.csv`;
      csvDownload(rows, filename, ',');
      isOpenSet(false);
    } catch (error) {
      exportErrorSet('Export failed. Please try again.');
    } finally {
      exportingSet(false);
    }
  }, [
    address,
    fetchTransactions,
    format,
    from,
    to,
    rawTransactions,
    includeFungible,
    includeNft,
    groupSwap,
    includeFees,
    includeFeeOnly,
  ]);

  const formatOptions = [
    { value: 'koinly', label: 'Koinly (universal)' },
    { value: 'raw', label: 'Raw (current page)' },
  ] as const;

  const presetOptions = [
    { value: 'custom', label: 'Custom range' },
    { value: 'last-7-days', label: 'Last 7 days' },
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'previous-month', label: 'Previous month' },
    { value: 'year-to-date', label: 'Year to date' },
    { value: 'previous-year', label: 'Previous calendar year' },
  ] as const;

  return (
    <>
      <Button
        size="small"
        onClick={openDialog}
        endIcon={<FileDownloadIcon color="inherit" />}
        color="inherit"
      >
        {echo('table-exportCsv')}
      </Button>
      <Dialog
        isOpen={isOpen}
        handleClose={closeDialog}
        title={echo('table-exportCsv')}
        actions={
          <Button
            variant="contained"
            onClick={handleExport}
            disabled={exporting}
            endIcon={
              exporting ? <CircularProgress size={16} /> : <FileDownloadIcon />
            }
          >
            Export
          </Button>
        }
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControl size="small" fullWidth>
            <InputLabel id="tx-export-format">Format</InputLabel>
            <Select
              labelId="tx-export-format"
              value={format}
              label="Format"
              onChange={(event) =>
                formatSet(event.target.value as ExportFormat)
              }
            >
              {formatOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {format === 'raw' && (
            <Typography variant="body2" color="text.secondary">
              Raw export downloads only the current page from the table.
            </Typography>
          )}

          {format === 'koinly' && (
            <>
              <FormControl size="small" fullWidth>
                <InputLabel id="tx-export-preset">Preset</InputLabel>
                <Select
                  labelId="tx-export-preset"
                  value={preset}
                  label="Preset"
                  onChange={(event) => {
                    const value = event.target.value as DatePreset;
                    presetSet(value);
                    if (value !== 'custom') {
                      applyPreset(value);
                    }
                  }}
                >
                  {presetOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box display="flex" gap={2} flexWrap="wrap">
                <TextField
                  type="datetime-local"
                  label="From (UTC)"
                  size="small"
                  value={from}
                  onChange={(event) => {
                    fromSet(event.target.value);
                    presetSet('custom');
                  }}
                  fullWidth
                />
                <TextField
                  type="datetime-local"
                  label="To (UTC)"
                  size="small"
                  value={to}
                  onChange={(event) => {
                    toSet(event.target.value);
                    presetSet('custom');
                  }}
                  fullWidth
                />
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeFungible}
                    onChange={(event) =>
                      includeFungibleSet(event.target.checked)
                    }
                  />
                }
                label="Include fungible tokens"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeNft}
                    onChange={(event) => includeNftSet(event.target.checked)}
                  />
                }
                label="Include NFTs (uses NFT placeholders)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={groupSwap}
                    onChange={(event) => groupSwapSet(event.target.checked)}
                  />
                }
                label="Group 1:1 swaps as a single row (Label=Swap)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeFees}
                    onChange={(event) =>
                      includeFeesSet(event.target.checked)
                    }
                  />
                }
                label="Include fees (KCAL)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeFeeOnly}
                    onChange={(event) =>
                      includeFeeOnlySet(event.target.checked)
                    }
                    disabled={!includeFees}
                  />
                }
                label="Include fee-only transactions"
              />
            </>
          )}

          {exportError && (
            <Typography variant="body2" color="error">
              {exportError}
            </Typography>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export const TransactionsList = ({ address, block }: TransactionsListProps) => {
  const { echo } = useEcho();

  const tableProps = useTable('cursor');
  const {
    limit,
    order_by,
    order_direction,
    cursor,
    onPageData,
    resetPagination,
  } = tableProps;

  // filter states
  const [_address, _addressSet] = useState<TransactionParams['address']>(
    address || undefined,
  );
  const [blockHeight, blockHeightSet] = useState<
    TransactionParams['block_height']
  >(block);
  const [q, qSet] = useState<TransactionParams['q']>(undefined);
  const [search, searchSet] = useState<string>('');

  const { data, loading, error } = useApi<TransactionResults>(
    endpoints['/transactions']({
      limit,
      order_by,
      order_direction,
      cursor: cursor || undefined,
      address: _address,
      block_height: blockHeight,
      q,
    }),
  );

  const { cols, rows, withError } = useTransactionData(data, loading);

  useEffect(() => {
    onPageData?.(data?.next_cursor ?? null, data?.transactions?.length || 0);
  }, [data, onPageData]);

  const applySearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      searchSet(trimmed);

      if (!trimmed) {
        _addressSet(address || undefined);
        blockHeightSet(block || undefined);
        qSet(undefined);
        resetPagination?.();
        return;
      }

      qSet(trimmed);

      resetPagination?.();
    },
    [address, block, resetPagination],
  );

  const exporter = address ? (
    <TransactionsExportButton
      address={address}
      rawTransactions={data?.transactions || []}
    />
  ) : undefined;

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Transactions"
        raw={data?.transactions || []}
        cols={cols}
        rows={rows}
        linkOptions={{
          route: '/transaction',
          key: 'hash',
          title: echo('explore-transaction'),
        }}
        {...tableProps}
        loading={loading}
        error={error || withError}
        exporter={exporter}
        addon={
          <InlineSearch
            value={search}
            onChange={searchSet}
            onSubmit={applySearch}
            placeholder={echo('search')}
          />
        }
      />
    </Box>
  );
};
