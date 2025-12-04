/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Empty } from 'components/layout';
import { useI18n } from 'hooks';
import { Text } from '../Text';

interface MethodParam {
  name?: string;
  type?: string;
}

interface Method {
  name?: string;
  returnType?: string;
  parameters?: MethodParam[];
}

/**
 * Methods props
 */
export interface MethodsProps {
  data?: Method[];
}

/**
 * Methods
 */
export const Methods = ({ data }: MethodsProps) => {
  const { t } = useI18n();

  if (!data || data?.length === 0) {
    return <Empty />;
  }

  if (data && data?.length > 0) {
    return (
      <>
        {data.map((met) => {
          return (
            <Accordion
              key={`${met?.name ?? 'method'}-${met?.returnType ?? 'return'}-${
                met?.parameters?.length ?? 0
              }`}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight={600}>{met?.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Text
                  label={t('return-type')}
                  value={met?.returnType}
                  spacing={1}
                  paragraph
                  variant="body2"
                />
                {met?.parameters && met.parameters.length > 0 && (
                  <Box>
                    <Box>
                      <Typography variant="body1" fontWeight={600} gutterBottom>
                        {t('params')}
                      </Typography>
                    </Box>
                    <Box>
                      {met?.parameters.map((param) => (
                        <Box
                          py={1}
                          key={`${param?.name ?? 'param'}-${param?.type ?? 'type'}`}
                        >
                          <Text
                            label={t('name')}
                            value={param?.name}
                            spacing={1}
                            variant="body2"
                          />
                          <Text
                            label={t('type')}
                            value={param?.type}
                            spacing={1}
                            variant="body2"
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </>
    );
  }

  return null;
};
