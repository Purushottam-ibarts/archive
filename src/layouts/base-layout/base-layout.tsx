import { ColorValue, StatusBarStyle } from 'react-native';
import React from 'react';
// import { ReactJsxOnlyChildren } from '@global';
import AppStatusBar from '../../components/app-status-bar/app-status-bar';
import AppHomeIndicatorBar from '../../components/app-home-indicator-bar/app-home-indicator-bar';
import { useAppTheme } from '../../feature/app-theming';


interface IProps {
    statusBar?: { backgroundColor: ColorValue; style: StatusBarStyle; };
    homeIndicatorBar?: { backgroundColor: ColorValue; };
    children: any; // ReactJsxOnlyChildren
}

const BaseLayout: React.FC<IProps> = ({ children, statusBar, homeIndicatorBar }) => {
    const { themeColors } = useAppTheme();

    return (
        <>
            <AppStatusBar backgroundColor={statusBar?.backgroundColor || themeColors.primary_dark} barStyle={statusBar?.style || 'dark-content'} />
            <AppHomeIndicatorBar backgroundColor={homeIndicatorBar?.backgroundColor || themeColors.primary_dark} children={children} />
        </>
    );
};

export default BaseLayout;