'use client';
import React, { createContext, useContext, useState } from 'react';

interface ElevationScrollContextProps {
  enableElevationScroll: boolean;
  setEnableElevationScroll: (value: boolean) => void;
}

const ThemeConfigContext = createContext<ElevationScrollContextProps>({
  enableElevationScroll: true,
  setEnableElevationScroll: () => {},
});

export const useThemeConfig = () => useContext(ThemeConfigContext);

export function ThemeConfigProvider({ children }: { children: React.ReactNode }) {
  const [enableElevationScroll, setEnableElevationScroll] = useState(true);

  return (
    <ThemeConfigContext.Provider value={{ enableElevationScroll, setEnableElevationScroll }}>
      {children}
    </ThemeConfigContext.Provider>
  );
}
