import { THEME_COLORS } from '../../utils/constants';

// Create a type for the valid theme color keys
export type ValidThemeColorKey = (typeof THEME_COLORS)[number];

export interface Theme {
  key: string;
  value: {
    themeColor: Record<ValidThemeColorKey, string>;
    categoryColor: Array<string>;
  };
}
