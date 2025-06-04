import { ReactJsxOnlyChildren } from '@global';
import React, { useState } from 'react';
import { ThemeColorsType, ThemesColorsDataType, ThemeType } from '..';
import { GetAppThemeColors } from '../functions/app-theme-methods';
import ThemeContext from './app-theme-context';

interface IProps {
    theme: ThemeType;
    themesColorsData: ThemesColorsDataType;
    children: ReactJsxOnlyChildren;
}

export const AppThemeProvider: React.FC<IProps> = ({ theme, themesColorsData, children }) => {
    const [activeTheme, setActiveTheme] = useState<ThemeType>(theme);
    const [activeThemeColors, setActiveThemeColors] = useState<ThemeColorsType>(GetAppThemeColors(theme, themesColorsData));

    const setTheme = (switchToThisTheme: ThemeType) => {
        setActiveTheme(switchToThisTheme);
        setActiveThemeColors(GetAppThemeColors(switchToThisTheme, themesColorsData));
    };

    return (
        <ThemeContext.Provider value={{ theme: activeTheme, themeColors: activeThemeColors, themesColorsData, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};