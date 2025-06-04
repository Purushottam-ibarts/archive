import { headerContainerHeight, headerHeight } from '@/containers/header/header-index/header-index-styles';
import { fontStyles } from '@/data/styles-data';
import { ThemeColorsType, ThemeType } from '@/features/app-theming';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface IStyles extends StyleSheet.NamedStyles<any> {
  container: ViewStyle;
  content: ViewStyle;
  headerAnimContainer: ViewStyle;
  headerView: ViewStyle;
  animatedHeaderBox: ViewStyle;
  logoutText: TextStyle;
}

const headerAnimContainerBorderBottomWidth = 1.25;

export const handleGenerateStylesheet = (_themeColors: ThemeColorsType, _currentTheme: ThemeType) => {
  return StyleSheet.create<IStyles>({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: _themeColors.bg,
    },
    content: {
      flex: 1,
    },
    headerAnimContainer: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: headerContainerHeight + 5,
      zIndex: 10,
    },
    headerView: {
      height: headerHeight + 44,
      shadowColor: '#000',
      backgroundColor: _themeColors.bg_darker,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,

      elevation: 11,
    },
    animatedHeaderBox: {
      width: '100%',
      height: headerContainerHeight,
      // paddingHorizontal: 75,
      paddingLeft: 10,
      backgroundColor: _themeColors.primary_dark,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignContent: 'flex-end',
      borderBottomRightRadius: 25,
      borderBottomLeftRadius: 25,
      shadowOffset: { width: 10, height: headerContainerHeight },
      shadowOpacity: 0.2,
      shadowRadius: 35,
      elevation: 5,
    },
    logoutText: {
      ...fontStyles['font-2xl-semibold'],
      color: _themeColors.white,
      lineHeight: 33,
    },
  });
};
