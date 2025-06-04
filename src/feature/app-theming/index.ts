import { ColorValue } from 'react-native';
import { AppThemeColorsKeysType } from '../../data/theme-colors';

export type ThemeType = 'light' | 'dark';
export type ThemeColorsType = Record<AppThemeColorsKeysType, ColorValue>;
export type ThemeColorsDataValueType = { light: ColorValue; dark: ColorValue };
export type ThemesColorsDataType = Record<AppThemeColorsKeysType, ThemeColorsDataValueType>;

export { AppThemeProvider } from './provider/app-theme-provider';
export { useAppTheme } from './hook/use-app-theme';
