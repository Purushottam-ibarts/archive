import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface IStyles extends StyleSheet.NamedStyles<any> {
  container: ViewStyle; 
}

export const handleGenerateStylesheet = () =>
  StyleSheet.create<IStyles>({
    container: {
      width: '100%',
      // height: '30%',
      flex:1, 
    },
  });
