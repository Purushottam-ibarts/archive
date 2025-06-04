import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'react-native-image-picker';
import PageLayout from '../../layouts/page-layout/page-layout';
import AppIcon from '../../components/app-icon/app-icon';
import { IconNames } from '../../components/app-icon/app-icon.data';
import { editProfile } from '../../store/editPrrofile/editProfileAction';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { hp } from '../../utils/constants';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userSlice.user);
  console.log('user: ', user);
  const [imageSource, setImageSource] = useState(null);

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

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      username: '',
      gdc_number: '',
      bio: '',
      designation: '',
      location: '',
      instagram_url: '',
      facebook_url: '',
      twitter_url: '',
      linkedin_url: '',
    },
  });

  useEffect(()=>{
    setValue('username',user?.firstName)
    setValue('instagram_url',user?.instagram_url)
    setValue('facebook_url',user?.facebook_url)
    setValue('twitter_url',user?.twitter_url)
    setValue('linkedin_url',user?.linkedin_url)
    setValue('gdc_number',user?.gdc_number)
    setValue('bio',user?.bio)
    setValue('designation',user?.designation)
    setValue('location',user?.location)
  },[])

  const saveEditData = async (data:any) => {
    // console.log('data: ', data);
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('gdc_number', data.gdc_number);
      formData.append('bio', data.bio);
      formData.append('designation', data.designation);
      formData.append('location', data.location);
      formData.append('instagram_url', data.instagram_url);
      formData.append('facebook_url', data.facebook_url);
      formData.append('twitter_url', data.twitter_url);
      formData.append('linkedin_url', data.linkedin_url);
      if (imageSource) {
        formData.append('editProfilePic', {
          uri: imageSource.uri,
          name: imageSource.fileName,
          type: imageSource.type,
        });
      }
      dispatch(editProfile(formData));
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
    <PageLayout
      containerStyles={styles.container}
      flatList={{
        data: [1],
        keyExtractor: (item, index) => `${index}`,
        renderItem:()=>{
          return(  
            <Pressable style={styles.container}>
              {/* <View style={styles.userProfileContainer}>
                <Pressable style={styles.userProfile}>
                  {imageSource !== null ? (
                    <Image source={{ uri: imageSource.uri }} style={styles.image} />
                  ) : (
                    <AppIcon icon={IconNames.USER_PROFILES} size={15} />
                  )}
                </Pressable>
                <View style={styles.textContaier}>
                  <Text style={styles.userName}>Jhon Doe / General</Text>
                  <Text style={styles.userDescription}>Set up your Dian Club presence and hiring needs</Text>
                </View>
              </View> */}

              {/* <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>Upgrade</Text>
                <Text style={styles.upgradeAccButtonText}>Your Account</Text>
              </TouchableOpacity> */}

              <View style={styles.userProfileContainer}>
                <Pressable onPress={selectImage} style={styles.userProfile}>
                  {imageSource !== null ? (
                    <Image source={{ uri: imageSource.uri }} style={styles.image} />
                  ) : (
                    <AppIcon icon={IconNames.USER_PROFILES} size={15} />
                  )}
                </Pressable>
                <View style={styles.editTextContaier}>
                <View style={styles.textContaier}>
                  <Text style={styles.userName}>{user?.name} / General</Text>
                  <Text style={styles.userDescription}>Set up your Dian Club presence and hiring needs</Text>
                </View>
                  {/* <TouchableOpacity style={styles.editUserContaier}>
                    <Text style={styles.editUserName}>Upload New Picture</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editUserContaier}>
                    <Text style={styles.editUserDescription}>Delete</Text>
                  </TouchableOpacity> */}
                </View>
              </View>

              <View style={styles.row}>
                <View style={{width:'48%'}}>
                  {['username', 'gdc_number', 'designation', 'location'].map((field, index) => (
                    <Controller
                      key={index}
                      control={control}
                      name={field}
                      rules={{
                        required: `${field.replace(/_/g, ' ')} is required`,
                        minLength: {
                          value: 2,
                          message: `${field.replace(/_/g, ' ')} should be at least 2 characters`
                        },
                        maxLength: {
                          value: 100,
                          message: `${field.replace(/_/g, ' ')} should not exceed 100 characters`
                        },
                        pattern: field.includes('url') ? {
                          value: /^https?:\/\/.+\..+/,
                          message: 'Enter a valid URL'
                        } : null,
                      }}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                          <TextInput
                            style={[styles.input, 
                              // error && { borderColor: 'red' }
                            ]}
                            value={value}
                            onChangeText={onChange}
                            placeholder={field.replace(/_/g, ' ')}
                            placeholderTextColor="#9696A7"
                          />
                          {error && <Text style={{ color: 'red',bottom:5 }}>{error.message}</Text>}
                        </>
                      )}
                    />
                  ))}
                </View>
                <View style={{width:'48%'}}>
                  {['instagram_url', 'facebook_url', 'twitter_url', 'linkedin_url'].map((field, index) => (
                    <Controller
                      key={index}
                      control={control}
                      name={field}
                      rules={{
                        required: `${field.replace(/_/g, ' ')} is required`,
                        pattern: {
                          value: /^https?:\/\/.+\..+/,
                          message: 'Enter a valid URL'
                        },
                      }}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                          <TextInput
                            style={[styles.input, 
                              // { borderColor: 'red' }
                            ]}
                            value={value}
                            onChangeText={onChange}
                            placeholder={field.replace(/_/g, ' ')}
                            placeholderTextColor="#9696A7"
                          />
                          {error && <Text style={{ color: 'red',bottom:5 }}>{error.message}</Text>}
                        </>
                      )}
                    />
                  ))}
                </View>
              </View>
              <View>
                <Controller
                  control={control}
                  name="bio"
                  rules={{
                    required: 'Bio is required',
                    minLength: {
                      value: 10,
                      message: 'Bio should be at least 10 characters'
                    },
                    maxLength: {
                      value: 500,
                      message: 'Bio should not exceed 500 characters'
                    },
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                      <TextInput
                        style={[styles.BioInput, 
                          // error && { borderColor: 'red' }
                        ]}
                        value={value}
                        onChangeText={onChange}
                        placeholder="Bio"
                        placeholderTextColor="#9696A7"
                      />
                      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </>
                  )}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(saveEditData)}>
                <Text style={styles.saveButtonText}>Save Change</Text>
              </TouchableOpacity>
            </Pressable>
          )
        },
        numColumns: 1,
      }}
      />
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    backgroundColor: '#1C2D42',
    paddingBottom:hp(4),
    flex: 1,
  },
  userProfileContainer: {
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
  },
  textContaier: {
    marginLeft: 11,
    width: '77%',
  },
  editTextContaier: {
    marginLeft: 11,
    width: '77%',
    flexDirection: 'row',
  },
  editUserContaier: {
    backgroundColor: '#102335',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#656565',
    marginRight: 11,
  },
  userProfile: {
    height: hp(10),
    width: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#102335',
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
  },
  userDescription: {
    color: '#A8A8A8',
    marginTop: 5,
  },
  editUserName: {
    color: '#9696A7',
  },
  editUserDescription: {
    color: '#9696A7',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  upgradeButton: {
    backgroundColor: '#1C1C1C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
    borderColor: '#B79150',
    borderWidth: 1,
    width: '60%',
    flexDirection: 'row',
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
    paddingVertical: 11,
    paddingRight: '18%',
    paddingLeft: 18,
    borderRadius: 5,
    marginBottom: 10,
    color: '#9696A7',
    borderWidth: 0.5,
    borderColor: '#656565',
  },
  BioInput: {
    backgroundColor: '#102335',
    paddingVertical: '11%',
    paddingLeft: 11,
    borderRadius: 5,
    marginBottom: 10,
    color: '#9696A7',
    borderWidth: 0.5,
    borderColor: '#656565',
  },
  saveButton: {
    backgroundColor: '#D9AA59',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '60%',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditProfile;
