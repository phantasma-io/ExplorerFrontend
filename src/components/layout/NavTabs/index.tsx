import React, { useCallback, useEffect, useState, ReactNode } from 'react';
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
  const { query, replace, isReady } = useRouter();
  const [activeTab, setActiveTab] = useState<string>(tabsDefault);

  useEffect(() => {
    if (!isReady) return;

    const nextTab =
      typeof query.tab === 'string' && query.tab.length > 0
        ? query.tab
        : tabsDefault;

    setActiveTab(nextTab);
  }, [isReady, query.tab, tabsDefault]);

  const changeTab = useCallback(
    (tab: string, url: string) => {
      const { id } = query;
      const queryNew = id
        ? {
            id,
            tab,
          }
        : { tab };
      setActiveTab(tab);
      void replace(
        {
          pathname: url,
          query: queryNew,
        },
        undefined,
        { shallow: true, scroll: false },
      );
    },
    [replace, query],
  );

  return (
    <Paper>
      <Box>
        <Tabs
          value={activeTab}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
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
      <Box px={2} pt={1} pb={2}>
        {Object.values(tabs).map(({ id, component }: NavTab) => (
          <Box key={`panel-${id}`}>{activeTab === id && component}</Box>
        ))}
      </Box>
    </Paper>
  );
};
