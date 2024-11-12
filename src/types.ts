import type { ReactNode } from 'react';
import type { TextStyle } from 'react-native';

export interface CalendarPickerProps {
  visible: boolean;
  children?: ReactNode;
  onClose: () => void;
  theme?: 'dark' | 'light';
  onDateSelect: (date: string) => void;
  language?: 'en' | 'np';
  brandColor?: string;
  dayTextStyle?: TextStyle;
  weekTextStyle?: TextStyle;
  titleTextStyle?: TextStyle;
}
export type DateString = string;
