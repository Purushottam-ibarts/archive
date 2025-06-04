import { Image, View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DrawerContentComponentProps, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import AppIcon from '../app-icon/app-icon';
import { IconNames } from '../app-icon/app-icon.data';
import { useSelector, useDispatch } from 'react-redux';
import { AddDrawerData } from '../../store/drawer/drawerSlice';
import { useAppSelector } from '../../store/hooks.tsx';
import { showMessage } from '../../store/common';
import { wp } from '../../utils/constants.tsx';


interface IProps extends DrawerContentComponentProps {
    // No need to define individual props since DrawerContentComponentProps contains necessary props
}

const AppDrawer: React.FC<IProps> = ({ state, navigation }) => {
    // console.log('navigation: ', navigation);
    // console.log('state: ', state);

    const drawerState = useSelector(state => state.drawerSlice.drawersData); 
    const profile = useSelector(state => state.userSlice.profile); 
    // console.log('profile: ', profile);
    const user = useSelector(state => state.userSlice);   
    const token = useSelector(state => state.userSlice.token);
    // console.log('token: ', token);
    // console.log('Privilege--->>>> ', user?.privilege);
    // const status = useSelector(state => state.usersSlice); 
    const dispatch = useDispatch();
    const { routeNames, index } = state; 
    const focused = routeNames[index]; 
    const [drawerData] = useState([
        {
            name: 'Search',
            icon: IconNames.SEARCH,
            navigation: 'SearchMain',
            privilege:0,
        },
        {
            name: 'Manage Users',
            icon: IconNames.MANAGEUSER,
            navigation: 'ManageUsers',
            privilege:3,
        },
        {
            name: 'Videos',
            icon: IconNames.VIDEO,
            navigation: 'Videos',
            privilege:0,
        },
        {
            name: 'Podcast and Webinnars',
            icon: IconNames.PODCASTWEBINARS,
            navigation: 'PodsCastWebinars',
            privilege:2,
        },
        {
            name: 'Blogs',
            icon: IconNames.BLOGS,
            navigation: 'Blogs',
            privilege:2,
        },
        {
            name: 'Student',
            icon: IconNames.STUDENT,
            navigation: 'Student',
            privilege:1,
        },
        {
            name: 'PubMed',
            icon: IconNames.PUBMED,
            navigation: 'PubMed',
            privilege:0,
        },
        {
            name: 'Business And Finance',
            icon: IconNames.WORKFLOW,
            navigation: 'BusinessFinance',
            privilege:2,
        },
        {
            name: 'Download',
            icon: IconNames.DOWNLOAD,
            navigation: 'Download',
            privilege:2,
        },
        {
            name: 'WellBeing',
            icon: IconNames.WELLBEING,
            navigation: 'WellBeing',
            privilege:2,
        },
        {
            name: 'Courses',
            icon: IconNames.COURSES,
            navigation: 'Courses',
            privilege:2,
        },
        {
            name: 'Guidelines',
            icon: IconNames.GUIDELINES,
            navigation: 'Guidelines',
            privilege:2,
        },
        // {
        //     name: 'Refer',
        //     icon: IconNames.REFER,
        //     navigation: 'Refer',
        // },
        {
            name: 'Forum',
            icon: IconNames.FORUM,
            navigation: 'Forum',
            privilege:0,
        },
        {
            name: 'Work Flows',
            icon: IconNames.WORKFLOW,
            navigation: 'WorkFlows',
            privilege:2,
        },
        {
            name: 'Contact',
            icon: IconNames.BLOGS,
            navigation: 'Contact',
            privilege:0,
        },
       
       
        // {
        //     name: 'Videos',
        //     icon: IconNames.ACTIVEBOX,
        //     navigation: 'Videos',
        // },
    ])
    const [profileData] =useState([
        {
            name: 'General',
            icon: IconNames.GENERAL,
            navigation: 'General',
        },
        {
            name: 'EditProfile',
            icon: IconNames.EDIT_PROFILE,
            navigation: 'EditProfile',
        },
        {
            name: 'CPDCertificate',
            icon: IconNames.CPD_CERTIFICATE,
            navigation: 'CPDCertificate',
        }, 
        // {
        //     name: 'Billing',
        //     icon: IconNames.BILLING,
        //     navigation: 'Billing',
        // },
        {
            name: 'DeleteAccount',
            icon: IconNames.DELETE_ACCOUNT,
            navigation: 'DeleteAccount',
        },
    ])
    useEffect(() => {
        dispatch(AddDrawerData(drawerData));
    }, [])

    return (
        <View style={styles.container}> 
            {
                profile  == true ?
                <FlatList
                ListHeaderComponent={
                    <React.Fragment>
                        <View style={{ 
                            marginTop: '10%', 
                            alignItems:'flex-start',
                            marginLeft:wp(10)
                        }}>
                            <Text style={{
                                color:'#fff',
                                textTransform:'capitalize',
                                fontSize:25
                            }}>Home</Text>
                        </View>
                    </React.Fragment>
                }
                data={profileData}
                renderItem={({ item }) => {
                    // console.log('item: --', item);
                    const isFocused = item?.navigation === drawerState;
                    // console.log('isFocused: ', isFocused); 
                    return (
                        <Pressable style={styles.containerBox} onPress={() =>{ 
                            navigation.navigate(item.navigation);
                            dispatch(AddDrawerData(item.navigation));
                        }
                        }>
                            {isFocused && <AppIcon icon={IconNames.ACTIVEBOX} size={20} containerStyle={styles.activeBox} />}
                            <View style={styles.itemBox}>
                                <AppIcon icon={item.icon} size={20} />
                                <Text style={styles.itemText}>{item?.name}</Text>
                            </View>
                        </Pressable>
                    )
                }}
            />
            :
            <FlatList
                ListHeaderComponent={
                    <React.Fragment>
                        <View style={{ marginTop: '10%', }}></View>
                    </React.Fragment>
                }
                data={drawerData}
                renderItem={({ item }) => {
                    // console.log('item: ', item.privilege);
                    const isFocused = item?.navigation === drawerState;
                    // console.log('isFocused: ', isFocused);
                    // if(user?.privilege >= item?.privilege){
                        return (
                            <Pressable style={styles.containerBox} 
                            onPress={() =>{ 
                                navigation.navigate(item.navigation);
                                // if(token !== null){
                                //     if(user?.privilege >= item?.privilege){
                                //         navigation.navigate(item.navigation);
                                //         dispatch(AddDrawerData(item.navigation));
                                //     }
                                //     else{
                                //         console.log('===');
                                //         dispatch(showMessage('Access denied'))
                                //         navigation.navigate('Pricing')
                                //     }
                                // }else{
                                //     navigation.navigate('Login')
                                //     dispatch(showMessage('Please Login'));
                                // }
                            }}>
                                {isFocused && <AppIcon icon={IconNames.ACTIVEBOX} size={20} containerStyle={styles.activeBox} />}
                                <View style={[styles.itemBox,{
                                    borderTopWidth:item.name =='Contact' ? 1 :0,
                                    borderColor:'#fff',
                                    paddingTop:item.name =='Contact' ? 20:0,
                                    width:'100%'
                                }]}>
                                    <AppIcon icon={item.icon} size={20} />
                                    <Text style={styles.itemText}>{item?.name}</Text>
                                </View>
                            </Pressable>
                        )
                    // } 
                }}
            /> 
            }
        </View>
    );
};

export default AppDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center', 
        width: '100%',
        backgroundColor: '#102335',
        // marginTop:'10%',
        // top:'10%',
        paddingTop: '10%',
    },
    containerBox: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 11,
        marginVertical: '10%',
        paddingLeft: '5%',
    },
    itemText: {
        color: '#fff',
        paddingHorizontal: 10
    },
    activeBox: {
        position: 'absolute'
    },
    itemBox: {
        marginLeft: '5%',
        flexDirection: 'row',
    }
});
