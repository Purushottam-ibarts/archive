import { ColorValue } from 'react-native';
import { ThemesColorsDataType, ThemeColorsType, ThemeType, ThemeColorsDataValueType } from '..';

export const GenerateSingleAppThemeColor = (light: ColorValue, dark: ColorValue): ThemeColorsDataValueType => ({ light, dark });

export const GetAppThemeColors = (theme: ThemeType, themesColorsData: ThemesColorsDataType): ThemeColorsType => {
  const extractedThemeColors: ThemeColorsType = {};
  Object.entries(themesColorsData).forEach(([key, value]) => {
    extractedThemeColors[key] = value[theme];
  });
  return extractedThemeColors;
};
