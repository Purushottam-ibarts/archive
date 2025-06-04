import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PageLayout from '../../layouts/page-layout/page-layout';
import * as ImagePicker from 'react-native-image-picker';
import { hp } from '../../utils/constants';
import AppIcon from '../../components/app-icon/app-icon';
import { IconNames } from '../../components/app-icon/app-icon.data';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';

const GeneralScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice?.user);
  console.log('user: ', user);
  const navigation = useNavigation()
  const [imageSource, setImageSource] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const selectImage = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (!response.didCancel && !response.error && response.assets && response.assets.length > 0) {
        setImageSource(response.assets[0]);
      }
    });
  };

  return (
    <PageLayout
      containerStyles={styles.container}
      flatList={{
        data: [1],
        keyExtractor: (item, index) => `${index}`,
        listHeaderComponent: (
          <View style={styles.container}>
            <View style={styles.userProfileContainer}>
              <Pressable
              //  onPress={selectImage} 
               style={styles.userProfile}>
                {imageSource !== null ? (
                  <Image source={{ uri: imageSource.uri }} style={styles.image} />
                ) : (
                  <AppIcon icon={IconNames.USER_PROFILES} size={20} />
                )}
              </Pressable>
              <View style={styles.textContaier}>
              <Text style={styles.userName}>{user.name} / General</Text>
              <Text style={styles.userDescription}>Set up your Dian Club presence and hiring needs</Text>
              </View>
            </View>

            {/* <TouchableOpacity style={styles.upgradeButton} onPress={()=>{navigation.navigate('Pricing')}}>
              <Text style={styles.upgradeButtonText}>Upgrade</Text>
              <Text style={styles.upgradeAccButtonText}>Your Account</Text>
            </TouchableOpacity> */}

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#656565"
              value={user.name}
              // onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#656565"
              value={user.email}
              // onChangeText={setEmail}
            />

            {/* <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Change</Text>
            </TouchableOpacity> */}
          </View>
        ),
        numColumns: 1,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
    backgroundColor: '#1C2D42',
  },
  userProfileContainer: {
    alignItems: 'center',
    marginVertical: 20,
    flexDirection:'row',
  },
  textContaier:{
    marginLeft:11,
    width:'77%',
  },
  userProfile: {
    height: hp(10),
    width: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#102335',
    // borderWidth: 2,
    borderRadius: hp(50),
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  userName: {
    marginTop: 10,
    color: '#fff',
    fontSize: 22,
    // fontWeight: 'bold',
  },
  userDescription: {
    color: '#A8A8A8',
    // textAlign: 'center',
    marginTop: 5,
  },
  upgradeButton: {
    backgroundColor: '#1C1C1C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
    borderColor:'#B79150',
    borderWidth: 1,
    width:'60%',
    flexDirection:'row',
  },
  upgradeButtonText: {
    color: '#D9AA59',
    fontWeight: 'bold',
     marginRight: 5,
  },
  upgradeAccButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#102335',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    color: 'white',
    borderWidth: 0.5,
    borderColor: '#656565',
  },
  saveButton: {
    backgroundColor: '#D9AA59',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width:'60%',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GeneralScreen;
