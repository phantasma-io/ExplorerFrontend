import { TextProps } from 'components/display';

export interface OverviewItem extends TextProps {
  link?: {
    href: string;
    external?: boolean;
  };
}
