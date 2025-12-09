import React, { ReactNode } from 'react';
import { useThemeMode } from 'containers/ThemeProvider';
import { Box, Container } from '@mui/material';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from 'cfg';
import { Header, Footer } from 'components/layout';

export interface LayoutHomeProps {
  children: ReactNode;
}

export const LayoutHome = ({ children }: LayoutHomeProps) => {
  const { themeActive } = useThemeMode();
  const bg = themeActive?.palette?.secondary?.main || '#17b1e8';
  const bgDark = themeActive?.palette?.secondary?.dark || '#0f7aa7';

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `radial-gradient(circle at 29% 55%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 4%,transparent 4%, transparent 44%,transparent 44%, transparent 100%),radial-gradient(circle at 85% 89%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 52%,transparent 52%, transparent 100%),radial-gradient(circle at 6% 90%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 53%,transparent 53%, transparent 64%,transparent 64%, transparent 100%),radial-gradient(circle at 35% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 6%,transparent 6%, transparent 98%,transparent 98%, transparent 100%),radial-gradient(circle at 56% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 16%,transparent 16%, transparent 23%,transparent 23%, transparent 100%),radial-gradient(circle at 42% 0%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 3%,transparent 3%, transparent 26%,transparent 26%, transparent 100%),radial-gradient(circle at 29% 28%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 75%,transparent 75%, transparent 100%),radial-gradient(circle at 77% 21%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 35%,transparent 35%, transparent 55%,transparent 55%, transparent 100%),radial-gradient(circle at 65% 91%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 46%,transparent 46%, transparent 76%,transparent 76%, transparent 100%),linear-gradient(45deg, ${bg},${bgDark});`,
      }}
    >
      <Header height={HEADER_HEIGHT} />
      <Container>{children}</Container>
      <div style={{ width: '100%', height: `${FOOTER_HEIGHT}px` }} />
      <Footer height={FOOTER_HEIGHT} />
    </Box>
  );
};
