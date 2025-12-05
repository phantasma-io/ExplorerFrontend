/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useEcho } from 'hooks/useEcho';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Empty } from 'components/layout';
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
  const { echo } = useEcho();

  if (!data || data?.length === 0) {
    return <Empty />;
  }

  if (data && data?.length > 0) {
    return (
      <>
        {data.map((met) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight={600}>{met?.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Text
                  label={echo('return-type')}
                  value={met?.returnType}
                  spacing={1}
                  paragraph
                  variant="body2"
                />
                {met?.parameters && met.parameters.length > 0 && (
                  <Box>
                    <Box>
                      <Typography variant="body1" fontWeight={600} gutterBottom>
                        {echo('params')}
                      </Typography>
                    </Box>
                    <Box>
                      {met?.parameters.map((param) => (
                        <Box py={1}>
                          <Text
                            label={echo('name')}
                            value={param?.name}
                            spacing={1}
                            variant="body2"
                          />
                          <Text
                            label={echo('type')}
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
