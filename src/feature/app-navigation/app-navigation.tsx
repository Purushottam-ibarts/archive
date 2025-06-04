import 'react-native-gesture-handler';
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../../screens/login";
import Assist from "../../screens/assist/assist-index";
import SpeechScreen from "../../screens/assist/speech";
import EmailScreen from "../../screens/assist/email";
import TemplateScreen from "../../screens/assist/template";
import PodsCastWebinars from "../../screens/drawer/podcastWebinars";
import About from "../../screens/about";

import Blogs from "../../screens/drawer/blogs/blogs";
import AppDrawer from "../../components/app-drawer/appDrawer";
import AppTabs from "../../components/app-tabs/app-tabs";
import { useAppSelector } from '../../store/hooks.tsx'; 
import Students from '../../screens/drawer/students'; 
import BusinessFinance from '../../screens/drawer/businessFinance'; 
import PubMed from '../../screens/drawer/pubMed';
import Download from '../../screens/drawer/download';
import FaqScreen from '../../screens/faqs';
import ContactUsScreen from '../../screens/contact';
import MembershipScreen from '../../screens/pricing';
import ShopScreen from '../../screens/shop/shop';
import ManageUsers from '../../screens/drawer/manageUser';
import WellBeing from '../../screens/drawer/wellBeing';
import Courses from '../../screens/drawer/courses';
import Guidlines from '../../screens/drawer/guidlines';
import Refer from '../../screens/drawer/refer';
import Forum from '../../screens/drawer/forum'; 
import WorkFlow from '../../screens/drawer/workFlow';
import BlogsDetails from '../../screens/drawer/blogs/blogsDetails';
import ShopGuide from '../../screens/shop/shopGuide';
import Videos from '../../screens/drawer/videos';
import VideosExplainer from '../../screens/assist/videoExplainer';
import GeneralScreen from '../../screens/profile/general';
import EditProfile from '../../screens/profile/editProfile';
import Certificate from '../../screens/profile/certificate';
import EmailNotification from '../../screens/profile/emailNotification';
import Billing from '../../screens/profile/billing';
import DeleteAccount from '../../screens/profile/deleteAccount';
import AppCertificate from '../../components/app-certificate/appCertificate';
import SearchScreen from '../../screens/search/search';
import templatesDetails from '../../screens/templates/templatesDetails';
import NotificationScreen from '../../screens/notification';
import PrivacyScreen from '../../screens/privacy';
import SaveTemplatesDetails from '../../screens/templates/saveTemplatesDetails.tsx';

interface IProps {
    navigationRef?: React.Ref<ReactNavigation.RootParamList>,
    initialRouteName: string;
} 
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TemplatesStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}> 
        <Stack.Screen name="Template" component={TemplateScreen} /> 
        <Stack.Screen name="templatesDetails" component={templatesDetails} /> 
        <Stack.Screen name="savetemplatesDetails" component={SaveTemplatesDetails} /> 
    </Stack.Navigator>
);
const AssistStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Assist" component={Assist} />
        <Stack.Screen name="Speech" component={SpeechScreen} />
        <Stack.Screen name="Email" component={EmailScreen} />
        <Stack.Screen name="Template" component={TemplatesStack} />
        <Stack.Screen name="VideoExplainer" component={VideosExplainer} />
    </Stack.Navigator>
);

const ShopStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Shop" component={ShopScreen} />
            <Stack.Screen name="ShopGuide" component={ShopGuide} />
            {/* <Stack.Screen name="ShopGuide2" component={ShopGuideline2} /> */}
        </Stack.Navigator>
    );
}
const CertificateStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Certificate" component={Certificate} />
            {/* <Stack.Screen name="AppCertificate" component={AppCertificate} /> */}
        </Stack.Navigator>
    );
}

const SearchStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SearchMain" component={SearchScreen} options={{ title: 'Search' }} /> 
        </Stack.Navigator>
    );
};

const BottomTabNavigator = () => (
    <Tab.Navigator initialRouteName='Assist' screenOptions={{ headerShown: false }} tabBar={(props: any) => <AppTabs {...props} />}>

<Tab.Screen
            name="Assist"
            component={AssistStack}
            listeners={({ navigation }) => ({
                tabPress: (e) => {
                    console.log('===');
                    e.preventDefault(); // Prevent default behavior
                    // navigation.dispatch(
                    //     CommonActions.reset({
                    //         index: 0,
                    //         routes: [{ name: "Assist" }], // Reset stack to "Assist"
                    //     })
                    // );
                },
            })}
        />
        
         
        {/* <Tab.Screen name="Assist" component={AssistStack} /> */}
        <Tab.Screen name="Pricing" component={MembershipScreen} />
        <Tab.Screen name="Faqs" component={FaqScreen} />
        <Tab.Screen name="Privacy" component={PrivacyScreen} />
        <Tab.Screen name="Contact" component={ContactUsScreen} />
        <Tab.Screen name="Shop" component={ShopStack} />
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="SearchMain" component={SearchScreen} />
        <Tab.Screen name="Notification" component={NotificationScreen} />
        <Tab.Screen name="ManageUsers" component={ManageUsers} />
        <Tab.Screen name="Videos" component={Videos} />
        <Tab.Screen name="PodsCastWebinars" component={PodsCastWebinars} />
        <Tab.Screen name="Blogs" component={Blogs} />
        <Tab.Screen name="BlogsDetails" component={BlogsDetails} />
        <Tab.Screen name="Student" component={Students} />
        <Tab.Screen name="PubMed" component={PubMed} /> 
        <Tab.Screen name="BusinessFinance" component={BusinessFinance} />
        <Tab.Screen name="Download" component={Download} />
        <Tab.Screen name="WellBeing" component={WellBeing} />
        <Tab.Screen name="Courses" component={Courses} />
        <Tab.Screen name="Guidelines" component={Guidlines} />
        <Tab.Screen name="Refer" component={Refer} />
        <Tab.Screen name="Forum" component={Forum} />
        <Tab.Screen name="WorkFlows" component={WorkFlow} />
                 
        <Tab.Screen name="General" component={GeneralScreen} />
        <Tab.Screen name="EditProfile" component={EditProfile} />
        <Tab.Screen name="CPDCertificate" component={CertificateStack} />
        <Tab.Screen name="Billing" component={Billing} />
        <Tab.Screen name="DeleteAccount" component={DeleteAccount} /> 

        {/* <Tab.Screen name="EmailNotification" component={EmailNotification} /> */}

    </Tab.Navigator>
);  
const DrawerNavigator = () => (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={props => <AppDrawer {...props} />}>
        <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
);

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
);

const MainStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} options={{ headerShown: false }} /> 
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="SearchMain" component={SearchScreen} options={{ title: 'Search' }} /> */}
    </Stack.Navigator>
);

const AppNavigation: React.FC<IProps> = () => {
    const token = useAppSelector(state => state.userSlice.token);
    // console.log('token:---', token);

    return (
        <NavigationContainer>
            {/* {token ? <MainStack /> : <AuthStack />} */}
            <MainStack />
        </NavigationContainer>
    );
};

export default AppNavigation;
