import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { useLocalState } from '@ricardo-jrm/reaper';
import { dateFormat } from '@ricardo-jrm/dervish';
import { HistoryPriceResults, FiatCurrencies } from 'types/api';
import { endpoints, DATE_CHART } from 'cfg';

export type FiatSelectors = {
  [key in FiatCurrencies]: boolean;
};

export type LineData = {
  x: string;
  y: number;
};

export const TokenPriceChart = () => {
  const [chartLimit, chartLimitSet] = useLocalState<number>(
    'token-chart-limit',
    30,
  );
  const [fiatSelection, fiatSelectionSet] = useLocalState<FiatSelectors>(
    'token-fiat-select',
    {
      usd: true,
      eur: false,
      gbp: false,
      jpy: false,
      cad: false,
      aud: false,
      cny: false,
      rub: false,
    },
  );

  const { query } = useRouter();

  const { data, error, loading } = useEmpathy<HistoryPriceResults>(
    endpoints['/historyprices']({
      symbol: (query?.id as string) || '',
      order_by: 'date',
      order_direction: 'desc',
      limit: chartLimit,
    }),
  );

  const chartCfg = useMemo(() => {
    // colors
    const colors: string[] = [];

    // data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartData: any[] = [];
    if (fiatSelection.usd) {
      const usd: {
        id: string;
        data: LineData[];
      } = {
        id: 'USD',
        data: [],
      };
      if (data?.history_prices) {
        data.history_prices.reverse().forEach((item) => {
          if (item?.price && item?.price?.date && item?.price?.usd) {
            usd.data.push({
              x: dateFormat(
                new Date(parseInt(item.price.date, 10) * 1000),
                DATE_CHART,
              ),
              y: item?.price?.usd,
            });
          }
        });
      }
      chartData.push(usd);
    }

    return { colors, data: chartData };
  }, [data, fiatSelection]);

  console.log({ data, chartCfg });

  return (
    <Box>
      {chartCfg.data && (
        <Box>
          <Box pt={1}>
            <Typography fontWeight={600} variant="body2">
              {`Token price: ${chartCfg.data[0].data[0].x} - ${
                chartCfg.data[0].data[chartCfg.data[0].data.length - 1].x
              }`}
            </Typography>
          </Box>
          <Box sx={{ height: '270px' }}>
            <ResponsiveLine
              data={chartCfg.data || []}
              margin={{ top: 18, right: 45, bottom: 21, left: 45 }}
              useMesh
              enableGridX={false}
              enableGridY={false}
              enableArea
              axisBottom={null}
              curve="catmullRom"
            />
          </Box>
          <Box py={1}>SLIDER</Box>
        </Box>
      )}
    </Box>
  );
};
