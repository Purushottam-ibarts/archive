import {useContext} from 'react';
import ThemeContext from '../provider/app-theme-context';

export const useAppTheme = () => {
  const themeContext = useContext(ThemeContext);
  return {
    theme: themeContext.theme,
    themeColors: themeContext.themeColors,
    setTheme: themeContext.setTheme,
  };
};
