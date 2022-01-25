import React, { useCallback, useMemo, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Box, Paper, Tabs, Tab } from '@mui/material';

export type NavTab = {
  id: string;
  label: string;
  href: string;
  component: ReactNode;
};

export type NavTabsRecord = {
  [x: string]: NavTab;
};

/**
 * NavTabs props
 */
export interface NavTabsProps {
  tabs: NavTabsRecord;
  tabsDefault: string;
}

/**
 * NavTabs
 */
export const NavTabs = ({ tabs, tabsDefault }: NavTabsProps) => {
  const { query, push } = useRouter();
  const activeTab = useMemo(
    () => query.tab || tabsDefault,
    [query, tabsDefault],
  );

  const changeTab = useCallback(
    (tab: string, url: string) => {
      const { id } = query;
      const queryNew = id
        ? {
            id,
            tab,
          }
        : { tab };
      push({
        pathname: url,
        query: queryNew,
      });
    },
    [push, query],
  );

  return (
    <Paper>
      <Box>
        <Tabs value={activeTab} textColor="primary" indicatorColor="primary">
          {Object.values(tabs).map(({ label, id, href }: NavTab) => (
            <Tab
              label={label}
              key={`tab-${id}`}
              value={id}
              onClick={() => changeTab(id, href)}
            />
          ))}
        </Tabs>
      </Box>
      <Box p={3}>
        {Object.values(tabs).map(({ id, component }: NavTab) => (
          <Box key={`panel-${id}`}>{activeTab === id && component}</Box>
        ))}
      </Box>
    </Paper>
  );
};
