import React from 'react';
import { ThemeType, ThemeColorsType, ThemesColorsDataType } from '..';
import { defaultTheme } from '../config';

interface IThemeContextType {
  theme: ThemeType;
  themeColors: ThemeColorsType;
  themesColorsData: ThemesColorsDataType;
  setTheme: (switchToThisTheme: ThemeType) => void;
}

const AppThemeContext = React.createContext<IThemeContextType>({
  theme: defaultTheme,
  themeColors: {},
  themesColorsData: {},
  setTheme: () => {},
});

export default AppThemeContext;
