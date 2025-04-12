
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeColors, ThemeContextType, ThemeMode, ThemeState } from "@/types/theme";

const defaultLightColors: ThemeColors = {
  primary: "hsl(222.2 47.4% 11.2%)",
  secondary: "hsl(210 40% 96.1%)",
  accent: "hsl(210 40% 96.1%)",
  background: "hsl(0 0% 100%)",
  foreground: "hsl(222.2 84% 4.9%)",
  muted: "hsl(210 40% 96.1%)",
  mutedForeground: "hsl(215.4 16.3% 46.9%)",
  border: "hsl(214.3 31.8% 91.4%)",
  input: "hsl(214.3 31.8% 91.4%)",
  card: "hsl(0 0% 100%)",
  cardForeground: "hsl(222.2 84% 4.9%)",
  destructive: "hsl(0 84.2% 60.2%)",
  destructiveForeground: "hsl(210 40% 98%)",
};

const defaultDarkColors: ThemeColors = {
  primary: "hsl(210 40% 98%)",
  secondary: "hsl(217.2 32.6% 17.5%)",
  accent: "hsl(217.2 32.6% 17.5%)",
  background: "hsl(222.2 84% 4.9%)",
  foreground: "hsl(210 40% 98%)",
  muted: "hsl(217.2 32.6% 17.5%)",
  mutedForeground: "hsl(215 20.2% 65.1%)",
  border: "hsl(217.2 32.6% 17.5%)",
  input: "hsl(217.2 32.6% 17.5%)",
  card: "hsl(222.2 84% 4.9%)",
  cardForeground: "hsl(210 40% 98%)",
  destructive: "hsl(0 62.8% 30.6%)",
  destructiveForeground: "hsl(210 40% 98%)",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeState>({
    mode: defaultTheme,
    colors: defaultLightColors,
  });

  // Apply CSS variables when colors change
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme.mode === "dark" || 
      (theme.mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    const colors = isDark ? 
      { ...defaultDarkColors, ...theme.colors } : 
      { ...defaultLightColors, ...theme.colors };
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  // Set mode and update colors accordingly
  const setMode = (mode: ThemeMode) => {
    setTheme(prev => ({
      ...prev,
      mode
    }));
  };

  // Update specific colors
  const setColors = (colors: Partial<ThemeColors>) => {
    setTheme(prev => ({
      ...prev,
      colors: { ...prev.colors, ...colors }
    }));
  };

  // Ensure theme is only applied after first render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setMode, setColors }}>
      <NextThemesProvider attribute="class" defaultTheme={theme.mode} enableSystem>
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
}
