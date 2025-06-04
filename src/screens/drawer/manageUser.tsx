import React, { useEffect } from 'react';
import { Alert, Pressable, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import PageLayout from '../../layouts/page-layout/page-layout';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { getUsers, postManageUser } from '../../store/manageUser/manageUserAction';
import { wp } from '../../utils/constants';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import LinkButton from '../../components/linkbutton';

interface IProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  designation?: string;
}

const ManageUsers: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const userss: any = useAppSelector(state => state.manageUserSlice?.manageUsers);
  const user = useAppSelector((state) => state.userSlice);
  // console.log('user: ', user.privilege);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<IProps>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      designation: '',
    }
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleAddAccount = async(val: IProps) => {  
    // console.log('data: ', val);
    const data = new FormData();
  data.append('firstName', val.firstName);  
  data.append('lastName', val.lastName);  
  data.append('email', val.email);  
  data.append('designation', val.designation);  
  const res = await dispatch(postManageUser(data)).unwrap();
  // console.log('res: ', res); 
  if(res.status){
    dispatch(getUsers());
  }
    
    // Add your logic to handle the new user data
  };

  return (
    <>
       {
        user.privilege < 2 &&
        <BlurView
        style={{
            position: 'absolute',
            top: '15%',
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,

        }}
        blurAmount={2}
        blurType='dark'
    >
        <Pressable
            style={{
                marginTop: '50%',
                alignItems: 'center',
                alignSelf: 'center',
                marginHorizontal:20
            }}>
            <Text style={{
                color: '#fff',
                fontSize: 15,
                textAlign: 'center',

            }}>
              <Text style={{
                // fontWeight:'bold',
                fontSize:17
                }}>This page is available exclusively to subscribers of the  
                <Text style={{
                fontWeight:'bold',fontSize:17}}> Dentistry Owner</Text> plan.</Text>
              <Text style={{fontWeight:'bold',fontSize:20,lineHeight:32,paddingVertical:33}}>
              </Text>
              <View style={{paddingTop:22}}/>
              <Text style={{fontWeight:'bold',fontSize:20,top:22}}>                                       </Text>
              
            </Text>
            <Text
            style={{
              color: '#fff',
              fontSize: 15,
              textAlign: 'center',
              paddingTop:22
          }}
            >Subscribe to the Dentistry Owner plan to unlock this feature and start assigning videos and tasks to your staff or students. The plan also includes free access for up to 6 additional users.</Text>
        </Pressable>
        <TouchableOpacity onPress={() => {
            navigation.navigate('Pricing')
        }}
            style={{
                backgroundColor: '#D9AA59',
                paddingVertical: '2%',
                paddingHorizontal: '2%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                alignSelf: 'center',
                marginBottom: 10,
                marginTop: 10
            }}>
            <Text style={{
                color: '#0f0d5f',
                fontSize: 15,
                paddingHorizontal: 5
            }}>Subscribe Now</Text>
        </TouchableOpacity>
    </BlurView>
      }
    <PageLayout containerStyles={styles.container}
      flatList={{
        data: userss,
        keyExtractor: (item: any, index) => `${item.title}_${item.id}_${index}`,
        listHeaderComponent: (
          <View style={styles.addUsers}>
            <Text style={styles.text}>Add Users</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Controller
                  control={control}  name="firstName"
                  rules={{ required: 'Name is required' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="First Name"
                      placeholderTextColor={'#9696A7'} 
                    />
                  )} 
                />
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
              </View>
              <View style={styles.inputWrapper}>
              <Controller
                  control={control}  name="lastName"
                  rules={{ required: 'lastName is required' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="last Name"
                      placeholderTextColor={'#9696A7'} 
                    />
                  )} 
                />
                {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Controller
                  control={control}
                  rules={{ 
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]/,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Email"
                      keyboardType="email-address"
                      placeholderTextColor={'#9696A7'} 
                    />
                  )}
                  name="email"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
              </View>
              <View style={styles.inputWrapper}>
                <Controller
                  control={control}
                  rules={{ required: 'Designation is required' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Designation"
                      placeholderTextColor={'#9696A7'}
                    />
                  )}
                  name="designation"
                />
                {errors.designation && <Text style={styles.errorText}>{errors.designation.message}</Text>}
              </View>
            </View>
            <TouchableOpacity style={styles.addAccount} onPress={handleSubmit(handleAddAccount)}>
              <Text style={styles.textAccount}>Add Account</Text>
            </TouchableOpacity>
          </View>
        ),
        renderItem: ({ item, index }) => {
          return (
            <Pressable>
              <View>
                {index == 0 &&
                  <>
                    <Text style={styles.text}>Users</Text>
                    <View style={styles.headerContainer}>
                      <Text style={styles.headerText}>Name</Text>
                      <Text style={styles.headerText}>Designation</Text>
                      <Text style={styles.headerText}>Email</Text>
                    </View>
                  </>
                }
                <View style={styles.userItem}>
                  <Text style={[styles.userInfo, { width: wp(25) }]}>{item.name}</Text>
                  <Text style={[styles.userInfo, { width: wp(30) }]}>{item.designation}</Text>
                  <Text style={[styles.userInfo, { width: wp(22) }]} numberOfLines={1}>{item.email}</Text>
                </View>
                <View style={styles.horizontalLine} />
              </View>
            </Pressable>
          );
        },
      }}
    />
    </>
  );
};

export default ManageUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F4A64',
    alignSelf: 'center',
    width: '90%',
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    // marginBottom: 11,
    marginBottom:'10%',
  },
  addUsers: {
    backgroundColor: '#2F4A64',
    marginHorizontal: 22,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    padding: 11,
    borderRadius: 5,
    backgroundColor: '#102335',
    color: 'white',
    marginBottom: 5,
  },
  addAccount: {
    backgroundColor: '#102335',
    borderRadius: 5,
    padding: 8,
    marginTop: 11,
    borderColor: '#D9AA59',
    borderWidth: 1,
    marginBottom: 11,
    alignItems: 'center',
  },
  textAccount: {
    color: '#D9AA59',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  userItem: {
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    color: 'white',
    fontSize: 14,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#102335',
    borderRadius: 10,
    padding: 12,
    marginTop: 22,
  },
  headerText: {
    color: '#9696A7',
    fontSize: 16,
  },
  horizontalLine: {
    borderBottomColor: '#102335',
    borderBottomWidth: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});
