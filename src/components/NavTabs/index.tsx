import React, { useCallback, useMemo, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Box, Paper, Tabs, Tab } from '@mui/material';

export type NavTab = {
  id: string;
  label: string;
  href: string;
  component: ReactNode;
};

export type NavTabRecord = {
  [x: string]: NavTab;
};

/**
 * NavTabs props
 */
export interface NavTabsProps {
  tabs: NavTabRecord;
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
      push({
        pathname: url,
        query: {
          ...query,
          tab,
        },
      });
    },
    [push, query],
  );

  return (
    <Paper>
      <Box>
        <Tabs
          value={activeTab}
          textColor="secondary"
          indicatorColor="secondary"
        >
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
