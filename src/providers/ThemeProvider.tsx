
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure theme is only applied after first render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme={defaultTheme} enableSystem>
      {children}
    </NextThemesProvider>
  );
}

// Theme context for advanced theme customization beyond light/dark
type ThemeColor = {
  primary: string;
  secondary: string;
  accent: string;
};

type ThemeContextType = {
  setCustomColors: (colors: Partial<ThemeColor>) => void;
  customColors: ThemeColor;
};

const defaultColors: ThemeColor = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
};

const ThemeContext = createContext<ThemeContextType>({
  setCustomColors: () => {},
  customColors: defaultColors,
});

export const useThemeContext = () => useContext(ThemeContext);

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [customColors, setCustomColorsState] = useState<ThemeColor>(defaultColors);

  const setCustomColors = (colors: Partial<ThemeColor>) => {
    const newColors = { ...customColors, ...colors };
    setCustomColorsState(newColors);
    
    // Apply custom colors to CSS variables
    if (colors.primary) document.documentElement.style.setProperty("--primary", colors.primary);
    if (colors.secondary) document.documentElement.style.setProperty("--secondary", colors.secondary);
    if (colors.accent) document.documentElement.style.setProperty("--accent", colors.accent);
  };

  return (
    <ThemeContext.Provider value={{ customColors, setCustomColors }}>
      {children}
    </ThemeContext.Provider>
  );
}
