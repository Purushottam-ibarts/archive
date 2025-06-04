import React from 'react';
import { View, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { IconNames } from '../app-icon/app-icon.data';
import AppIcon from '../app-icon/app-icon';
import { useDispatch } from 'react-redux';
import { AddDrawerData } from '../../store/drawer/drawerSlice';
import { Linking } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { hp } from '../../utils/constants';
import { CommonActions } from '@react-navigation/native';
import { profileStatus } from '../../store/user/userSlice';

interface IProps {
  state: any;
  navigation: any;
}

const AppTabs: React.FC<IProps> = ({ state, navigation }) => {
  const { routeNames, index } = state;
  const focused = routeNames[index];
  const dispatch = useDispatch();

  const tabsData = [
    { name: 'Assist', icon: IconNames.ASSIST, navigation: 'Assist' },
    { name: 'About', icon: IconNames.ABOUT, navigation: 'About' },
    { name: 'Faqs', icon: IconNames.FAQS, navigation: 'Faqs' },
    // { name: 'Contact', icon: IconNames.CONTACT, navigation: 'Contact' },
    { name: 'Pricing', icon: IconNames.PRICING, navigation: 'Pricing' },
    { name: 'Privacy', icon: IconNames.PRICING, navigation: 'Privacy' },
    // { name: 'Shop', icon: IconNames.SHOP, navigation: 'Shop' },
  ];

  const handlePress = (item:any) => {
    // console.log('item: ', item);
    if (item.navigation === 'Shop') {
      const url = 'https://diandental.myshopify.com/';
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      });
    }
    else if (item.navigation === 'Assist') {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Assist" }],
        })
      );
      dispatch(profileStatus(false));
    }
    else {
      navigation.navigate(item.navigation);
      dispatch(AddDrawerData(item.navigation));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <BlurView
        style={styles.absolute}
        // blurType='ultraThinMaterialDark'
        blurAmount={1}
        blurType='dark'
      />
      <FlatList
        data={tabsData}
        bounces={false}
        contentContainerStyle={styles.tabContainer}
        renderItem={({ item }) => {
          const isFocused = item?.navigation === focused;
          return (
            <Pressable
              style={[styles.tabItem, isFocused && styles.tabItemFocused]}
              onPress={() => handlePress(item)}
            >
              <AppIcon icon={item.icon} size={24} color={isFocused ? '#D9AA59' : '#fff'} />
              <Text style={[styles.itemText, isFocused && styles.itemTextFocused]}>{item?.name}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.navigation}
        horizontal
      />
    </View>
  );
};

export default AppTabs;

const styles = StyleSheet.create({
  mainContainer: {
    // zIndex: 100,
    flexDirection: 'row',
    borderTopWidth: 0,
    position: 'absolute',
    // left: 10,
    // right: 10,
    bottom: 0,
    // paddingBottom:10,
    // elevation: 0, 
    borderRadius: 20,
    overflow: 'hidden',
    // height:hp(30)
    // backgroundColor:'transparent',
    // backgroundColor:'#fff',
  },
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // backgroundColor:'#132230'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    paddingVertical: 10,
    height: hp(10)
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tabItemFocused: {
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  itemText: {
    color: '#FFFFFF',
    marginTop: 4,
    fontSize: 12,
  },
  itemTextFocused: {
    color: '#D9AA59',
  },
});

