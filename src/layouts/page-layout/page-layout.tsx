import React, { useRef, useState } from 'react';
import { ColorValue, FlatList, GestureResponderEvent, ImageBackground, Keyboard, KeyboardAvoidingView, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, Platform, Pressable, SafeAreaView, ScrollView, StatusBarStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import BaseLayout from '../base-layout/base-layout';
import { Text } from 'react-native-svg';
import { backgroundImg } from '../../data/static-assets';
import AppHeader from '../../components/app-header/app-header';

interface IProps<T> {
    statusBar?: { backgroundColor: ColorValue; style: StatusBarStyle; };
    homeIndicatorBar?: { backgroundColor: ColorValue; };
    containerStyles?: ViewStyle;
    headerTitle?: string;
    containerStylesbtn?: ViewStyle;
    conditionalButtonStyle?: ViewStyle
    flatList: {
        listHeaderComponent?: any;
        listFooterComponent?: any;
        emptyComponent?: any;
        data?: T[];
        keyExtractor?: (item: T, index: any) => string;
        numColumns?: number;
        renderItem?: ListRenderItem<T>;
        renderedItemsContainerStyle?: ViewStyle;
        onEndReached?:any
    };
    isBack?:boolean
}

const PageLayout = <T extends unknown>({ statusBar,isBack, homeIndicatorBar, containerStyles, flatList, headerTitle, conditionalButtonStyle,  }: IProps<T>) => {
    const mainScrollViewRef = useRef<FlatList | null>(null);

    return (
        <BaseLayout statusBar={statusBar} homeIndicatorBar={homeIndicatorBar}>
            <ImageBackground source={backgroundImg} style={{flex: 1, }}>
                <View style={styles.headerView}>
                    <AppHeader headerTitle={headerTitle} isBack={isBack}/>
                    {flatList.listHeaderComponent}
                </View>
                <View style={[styles.container,containerStyles]}>
                    <Pressable onPress={() => Keyboard.dismiss()}>
                        <FlatList
                            ref={mainScrollViewRef}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            removeClippedSubviews={true}
                            ListHeaderComponent={
                                <React.Fragment>
                                    {/* <AppHeader headerTitle={headerTitle} /> */}
                                    {/* {flatList.listHeaderComponent} */}
                                </React.Fragment>
                            }
                            data={flatList.data || []}
                            numColumns={flatList.numColumns || 1}
                            renderItem={flatList.renderItem}
                            ListFooterComponent={flatList.listFooterComponent}
                            ListEmptyComponent={flatList.emptyComponent}
                            onEndReached={flatList.onEndReached}
                            keyExtractor={flatList.keyExtractor}
                        />
                    </Pressable>
                </View>
            </ImageBackground>
        </BaseLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
    },
    content: {
        // marginHorizontal:20,
        // height: screen_height
    },
    headerView: {
        // position: 'absolute',
        // height:55,
        // top: 10,
        // width: '100%', 
        // borderBottomColor: _themeColors.shadow, 
        // backgroundColor: _themeColors.bg,
        // zIndex: 10,
    },
    footerBox: {
        alignItems: 'center',
    }
});

export default PageLayout;