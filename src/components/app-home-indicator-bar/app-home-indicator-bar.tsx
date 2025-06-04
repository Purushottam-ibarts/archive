import React from 'react';
import { ColorValue, Platform, SafeAreaView, View } from 'react-native';

interface IProps {
    backgroundColor: ColorValue;
    children: any
}

const AppHomeIndicatorBar: React.FC<IProps> = ({ children, backgroundColor }) => (
    <>
        {(Platform.OS === 'android') && (
            <SafeAreaView style={{ flex: 1, }}>
                {children}
            </SafeAreaView>
        )}
        {(Platform.OS === 'ios') && (
            <SafeAreaView style={{ flex: 1, backgroundColor }}>
                {children}
            </SafeAreaView>
        )}
    </>
);

export default AppHomeIndicatorBar;