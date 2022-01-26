import { EchoProvider } from '@ricardo-jrm/echo';
import { AppProvider } from '../src/containers/AppProvider';
import { locales, localesDefault } from '../src/cfg';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <AppProvider>
      <EchoProvider echo={locales} echoDefault={localesDefault}>
        {Story()}
      </EchoProvider>
    </AppProvider>
  ),
];
