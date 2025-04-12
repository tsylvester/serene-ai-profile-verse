
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  card: string;
  cardForeground: string;
  destructive: string;
  destructiveForeground: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeState {
  mode: ThemeMode;
  colors: ThemeColors;
}

export interface ThemeContextType {
  theme: ThemeState;
  setMode: (mode: ThemeMode) => void;
  setColors: (colors: Partial<ThemeColors>) => void;
}
