import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert, Platform } from 'react-native';
import { saveToken } from '../store/user/userSlice';
import { useAppDispatch } from '../store/hooks.tsx';
import { statusCodes, isErrorWithCode, GoogleSignin, } from "@react-native-google-signin/google-signin";
import AppIcon from '../components/app-icon/app-icon';
import { IconNames } from '../components/app-icon/app-icon.data';
import { AppleLogin, googleLogin } from '../store/user/userActions'; 
import appleAuth, {
  AppleRequestScope,
  AppleRequestOperation,
} from '@invertase/react-native-apple-authentication';
import { jwtDecode } from "jwt-decode";
 
// GoogleSignin.configure({
//   webClientId: "936264218927-pd0ac98g5e8qded4pg14s73tr8pdh3sh.apps.googleusercontent.com", 
// });

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useAppDispatch()

  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['email'], 
      webClientId:'884222288746-qis88m91ssu7jorquavvbc122bjdhg3a.apps.googleusercontent.com', 
      // webClientId:'936264218927-f7q7vb2tn1vvh14qc8kdoiaas968cosl.apps.googleusercontent.com', 
      offlineAccess: true,
    });
  }, []);
 

  const signIn = async () => {
    // console.log('signIn: ',);
    // await GoogleSignin.signOut();
    // console.log('signout: ',);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo: ', userInfo);
      const formData = new FormData()
      formData.append('email', userInfo.user.email); 
      formData.append('name', userInfo.user.name); 
      formData.append('gid', userInfo.user.id); 
      const res = await dispatch(googleLogin(formData)).unwrap();
      if(res?.status){
        // console.log('res: >>>>>>>>>', res);
        navigation.navigate('MainDrawer')
      }
    } catch (error) {
      console.log('error: ', error); 
    }
  };
 
   const onAppleButtonPress = async () => {

    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      }); 
      const { user,email, fullName, identityToken } = appleAuthRequestResponse; 
      // console.log('identityToken: ', identityToken);
      const credentialState = await appleAuth.getCredentialStateForUser(user);   
      // console.log('credentialState: ', credentialState);
      if (credentialState === appleAuth.State.AUTHORIZED) {  
        if (identityToken) { 
          if(email == null){ 
            const jsonString = jwtDecode(identityToken);  
            const name = jsonString?.email?.split('@')[0];  
            const data = {
              email: jsonString?.email,
              first_name: name,
            }; 
            const formData = new FormData()
            formData.append('email', data.email); 
            formData.append('name', data.first_name); 
            formData.append('gid', user); 
            // console.log('data:-11-- ', data);
            const res = await dispatch(googleLogin(formData)).unwrap(); 
            if(res?.status){
              // console.log('res: >>>>>>>>>', res);
              navigation.navigate('MainDrawer')
            }
          }else{

            const data = {
              email: email,
              first_name: fullName?.givenName,
            };  
            const formData = new FormData()
            formData.append('email', data.email); 
            formData.append('name', data.first_name); 
            formData.append('gid', user); 
            const res = await dispatch(googleLogin(formData)).unwrap(); 
            if(res?.status){
              // console.log('res: >>>>', res);
              navigation.navigate('MainDrawer')
            }
          }
        }
      }
      else if(identityToken){
        const jsonString = jwtDecode(identityToken);  
        const name = jsonString?.email?.split('@')[0];  
        const data = {
          email: jsonString?.email,
          first_name: name,
        }; 
        const formData = new FormData()
        formData.append('email', data.email); 
        formData.append('name', data.first_name); 
        formData.append('gid', user); 
        // console.log('data:-11-- ', data);
        const res = await dispatch(googleLogin(formData)).unwrap(); 
        if(res?.status){
          // console.log('res: >>>>>>>>>', res);
          navigation.navigate('MainDrawer')
        }
      } 
      else {
        console.log('User is not authorized');
      }
    } catch (error) {
      console.log(error, '==> error');
    }  
  };
   
  return (
    <ImageBackground
      source={require("../assets/images/backgroundimg.png")}
      style={styles.backgroundimg}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Let's login to explore continues</Text>

        <Image
          source={require("../assets/logo/logo.png")}
          style={styles.logo} />
        <View style={{}}>
 
          <TouchableOpacity style={{ marginBottom: 22 }} onPress={()=> signIn()}>
            <AppIcon icon={IconNames.GOOGLE_LOGIN} size={20} />
          </TouchableOpacity>
 
          {Platform.OS == 'ios' && <TouchableOpacity
           onPress={() => onAppleButtonPress()} 
           style={{ marginBottom: 22 }} >
            <AppIcon icon={IconNames.APPLE_LOGIN} size={20} />
          </TouchableOpacity>}
          
        </View>


        {/* <TouchableOpacity style={styles.button} onPress={() => { login() }}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity> */}

      </View>
    </ImageBackground>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundimg: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor:'red'
  },
  logo: {
    width: 255.83,
    height: 50.31,
    marginVertical: 33,
    // alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: 'gray'
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white'
  },
  input: {
    padding: 13,
    borderRadius: 5,
    marginVertical: 11,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    // paddingHorizontal:44,
    paddingRight: '40%',
    color: 'black'
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 20,
  },
  forgotPassword: {
    fontSize: 12,
    color: '#D9AA59',
    marginLeft: 10,
  },
  keepMeLogin: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#D9AA59',
    width: '80%',
    height: '8%',
  },
  textButton: {
    fontSize: 22,
    color: 'white', alignSelf: 'center', padding: 2, fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: 'white'
  },
  signupHereText: {
    color: '#D9AA59'
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
    // alignItems: 'center',
    marginTop: 22
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});


