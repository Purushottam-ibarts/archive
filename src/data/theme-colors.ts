import { GenerateSingleAppThemeColor } from "../feature/app-theming/functions/app-theme-methods";

 
export type AppThemeColorsKeysType = keyof typeof AppThemesColorsData;
export const AppThemesColorsData = Object.freeze({
  primary_lighter: GenerateSingleAppThemeColor('#d6ecd4', '#d6ecd4'),
  primary_light: GenerateSingleAppThemeColor('#48C73A', '#48C73A'),
  primary: GenerateSingleAppThemeColor('#102335', '#102335'),
  // primary_dark: GenerateSingleAppThemeColor('#31a126', '#31a126'),
  primary_dark: GenerateSingleAppThemeColor('#102335', '#102335'),
  primary_darkest: GenerateSingleAppThemeColor('#071625', '#071625'),

  secondary: GenerateSingleAppThemeColor('#F2E31B', '#F2E31B'),
  secondary_dark: GenerateSingleAppThemeColor('#e5d50d', '#e5d50d'),

  bg: GenerateSingleAppThemeColor('#fafafa', '#fafafa'),
  bg_dark: GenerateSingleAppThemeColor('#f3f3f3', '#f3f3f3'),
  bg_darker: GenerateSingleAppThemeColor('#BFC9DA', '#BFC9DA'),
  bg_darkest: GenerateSingleAppThemeColor('#7D8FAB', '#7D8FAB'),

  shadow: GenerateSingleAppThemeColor('#E8ECF2', '#E8ECF2'),
  shadow_dark: GenerateSingleAppThemeColor('#d8dfe9', '#32A126'),

  text_lightest: GenerateSingleAppThemeColor('#BFC9DA', '#BFC9DA'),
  text_lighter: GenerateSingleAppThemeColor('#7D8FAB', '#7D8FAB'),
  text: GenerateSingleAppThemeColor('#303733', '#303733'),
  text_heading: GenerateSingleAppThemeColor('#5B5B5B', '#5B5B5B'),
  text_input_bd: GenerateSingleAppThemeColor('#A7A7A7', '#A7A7A7'),

  text_alt: GenerateSingleAppThemeColor('#FFFFFF', '#FFFFFF'),

  error: GenerateSingleAppThemeColor('#CB4B4B', '#CB4B4B'),
  warning: GenerateSingleAppThemeColor('#000000', '#000000'),

  white: GenerateSingleAppThemeColor('#fff', '#fff'),
  profile_box: GenerateSingleAppThemeColor('#ebcccc', '#ebcccc'),
  out_of_stock: GenerateSingleAppThemeColor('#BB5A77', '#BB5A77'),

  card_border: GenerateSingleAppThemeColor('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)'),
  stick_border: GenerateSingleAppThemeColor('#9EA6BE', '#9EA6BE'),
  icon: GenerateSingleAppThemeColor('#45000000', '#45000000'),
});
