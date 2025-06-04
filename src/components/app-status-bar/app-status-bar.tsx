import React from 'react';
import { ColorValue, Platform, SafeAreaView, StatusBar, StatusBarStyle } from 'react-native';

interface IProps {
    backgroundColor: ColorValue;
    barStyle: StatusBarStyle;
}

const AppStatusBar: React.FC<IProps> = ({ backgroundColor, barStyle }) => (
    <>
        {Platform.OS === 'android' && <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />}
        {Platform.OS === 'ios' && <SafeAreaView style={{ flex: 0, backgroundColor }} />}
    </>
);

export default AppStatusBar;