
import { Moon, Sun, PaintBucket } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { ThemeMode } from "@/types/theme";
import { useTheme as useNextTheme } from "next-themes";

const presetThemes = {
  default: {},
  blue: {
    primary: "hsl(221 83% 53%)",
    accent: "hsl(217 91% 60%)",
  },
  green: {
    primary: "hsl(142 76% 36%)",
    accent: "hsl(142 71% 45%)",
  },
  purple: {
    primary: "hsl(280 67% 55%)",
    accent: "hsl(270 58% 58%)",
  },
  amber: {
    primary: "hsl(38 92% 50%)",
    accent: "hsl(43 96% 58%)",
  },
};

export function ThemeSwitcher() {
  const { theme, setMode, setColors } = useTheme();
  const { setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme change is only shown after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update both theme providers when mode changes
  const handleModeChange = (value: ThemeMode) => {
    setMode(value);
    setTheme(value);
  };

  // Apply preset theme colors
  const applyThemePreset = (presetName: keyof typeof presetThemes) => {
    setColors(presetThemes[presetName]);
  };

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          {theme.mode === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={theme.mode} onValueChange={handleModeChange}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <PaintBucket className="mr-2 h-4 w-4" />
            <span>Theme Colors</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => applyThemePreset('default')}>
              Default
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyThemePreset('blue')}>
              Blue
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyThemePreset('green')}>
              Green
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyThemePreset('purple')}>
              Purple
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyThemePreset('amber')}>
              Amber
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
