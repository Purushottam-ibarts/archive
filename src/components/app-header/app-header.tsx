// import * as React, { useEffect }  from 'react';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, ScrollView, Pressable, Platform, TextInput, FlatList, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppIcon from '../app-icon/app-icon';
import { IconNames } from '../app-icon/app-icon.data';
import { logo, notification, profile } from '../../data/static-assets';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { hp } from '../../utils/constants';
import { useAppDispatch } from '../../store/hooks.tsx';
import { profileStatus, savePrivilege, saveToken } from '../../store/user/userSlice';
import { getSearch } from '../../store/searching/searchingAction';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { showMessage } from '../../store/common';
interface IProps {
    headerTitle?: string;
    isBack?: boolean;
    containerSty?:ViewStyle
}
GoogleSignin.configure({
    webClientId: "922254907050-7u7dr1vfj7jhb22u30c9nerga82vhs0g.apps.googleusercontent.com",
});
const AppHeader: React.FC<IProps> = ({ headerTitle, isBack,containerSty}) => {
    const navigation: any = useNavigation();
    const dispatch = useAppDispatch();
    const isProfile = useSelector(state => state.userSlice.profile);
    const token = useSelector(state => state.userSlice.token);
    // console.log('token: ', token);
    const [profile, setProfile] = useState(false);
    const [dashboard, showDashBoard] = useState(false);
    const [term, setTerm] = useState('denture');
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);


    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'],
            webClientId: '922254907050-2vratur39sgrvdg6vip2g5cv0u4ha13e.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);

    const showProfile = async () => {
        // await GoogleSignin.signOut();
        setProfile(!profile)
        // console.log('profile: ',);
    }

    const searchChanges = () => {
        console.log('searchChanges: ');
        // let val = term + 1;
        // setTerm(val);
    };

    return (
        <>
            <SafeAreaView style={[styles.container,containerSty]}>

                <Pressable onPress={() => { isBack ? navigation.goBack() : navigation.openDrawer() }}style={styles.leftIcon}>
                    <AppIcon icon={isBack ? IconNames.ARROWLEFT : IconNames.MENU} size={15} containerStyle={{ paddingHorizontal: 10 }} />
                </Pressable>

                <TouchableOpacity style={styles.heading}>
                    <AppIcon icon={IconNames.DIAN_LOGO} size={15}/> 
                </TouchableOpacity>

                <Pressable style={styles.rightIcon} >
                    {
                        token !== null &&
                        <TouchableOpacity onPress={() => { navigation.navigate('Notification') }}>
                            <AppIcon icon={IconNames.NOTIFICATION} size={25} containerStyle={{ paddingHorizontal: 5 }} />
                        </TouchableOpacity>
                    } 
                    {
                        token != null ?
                            <TouchableOpacity onPress={() => showProfile()}>
                                <Menu>
                                    <MenuTrigger>
                                        <AppIcon icon={IconNames.PROFILE} size={15} containerStyle={{ paddingHorizontal: 5 }} />
                                    </MenuTrigger>
                                    <MenuOptions customStyles={optionsStyles}>
                                        {
                                            isProfile != true ?
                                                <MenuOption onSelect={() => {
                                                    dispatch(profileStatus(true));
                                                    // navigation.openDrawer()
                                                    navigation.navigate('EditProfile')
                                                }} text='Profile' />
                                                :
                                                <MenuOption onSelect={() => {
                                                    dispatch(profileStatus(false));
                                                    navigation.openDrawer()
                                                }} text='Dashboard' />
                                        }
                                        <MenuOption onSelect={() => {
                                            dispatch(saveToken(null))
                                            dispatch(profileStatus(false));
                                            navigation.navigate('MainDrawer')
                                            dispatch(showMessage('Logout'))
                                            dispatch(savePrivilege(0));
                                        }} text='Sign Out' />
                                    </MenuOptions>
                                </Menu>
                            </TouchableOpacity>
                            :
                            <Menu>
                                <MenuTrigger>
                                    <AppIcon icon={IconNames.PROFILE} size={15} containerStyle={{ paddingHorizontal: 5 }} />
                                </MenuTrigger>
                                <MenuOptions customStyles={optionsStyles}>
                                    <MenuOption onSelect={() => {
                                        navigation.navigate('Login')
                                    }} text='Login' />
                                </MenuOptions>
                            </Menu>
                    }

                </Pressable> 

            </SafeAreaView> 
        </>
    );
};

const optionsStyles = {
    optionsContainer: {
    backgroundColor: '#102335',
      padding: 10,
      borderRadius: 8,
      width: 150,
    },
    optionsWrapper: {
      padding: 5,
    },
    optionWrapper: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc', // Border color for the options
    },
    optionText: {
      color: '#ffffff', // Text color for options
      fontSize: 16,
    },
  };

const styles = StyleSheet.create({
    // container: {
    //     flexDirection: 'row',
    //     backgroundColor: '#102335',
    //     // height:Platform.OS==='ios'? hp(6.5) :hp(12), 
    //     height: Platform.OS === 'ios' ? 50 : 20,
    //     width: '100%',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     alignContent: 'center',
    //     paddingHorizontal: 10,
    //     paddingTop: 20
    // },
    profileContainer: {
        backgroundColor: '#102335',
        height: hp(10),
        width: '33%',
        position: 'absolute',
        zIndex: 1,
        top: hp(8),
        alignSelf: 'flex-end',
        justifyContent: 'space-evenly',
        borderRadius: 1,
        paddingLeft: 8,
        // paddingVertical:10,
    },
    leftIcon: {
        width: '15%'
    },
    heading: {
        // marginRight:hp(1.5), 
        alignItems: 'center',
        // width: '70%'
    },
    rightIcon: {
        transform: [
            // { rotate: "90deg" },
        ],
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        width: '20%',
        paddingRight:22
        // top: hp(2)
    },
    headerText: {
        // fontSize: hp(1.6),
        // color: MyColors.black,
        // fontFamily: MyFonts.OpenSansBold
    },
    logo: {
        // width: 177,
        // height: 33,
        // marginBottom:11,
        // marginRight: '11%',
        resizeMode: 'contain'
        // alignSelf: 'center',
    },


    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 22,
        backgroundColor: '#102335',
    },
    searchInput: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    resultsContainer: {
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        zIndex: 1,
    },
    itemText: {
        padding: 10,
    },
});

export default AppHeader;