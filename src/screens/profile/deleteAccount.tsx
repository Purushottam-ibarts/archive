import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import PageLayout from '../../layouts/page-layout/page-layout';
import AppIcon from '../../components/app-icon/app-icon';
import { IconNames } from '../../components/app-icon/app-icon.data';
import { useAppDispatch } from '../../store/hooks.tsx';
import { saveToken } from '../../store/user/userSlice';

const DeleteAccount = () => {
  const dispatch = useAppDispatch();
  return (
    <PageLayout
      containerStyles={styles.container}
      flatList={{
        data: [1],
        keyExtractor: (item: any, index) => `${item}_${index}`,
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
            <View style={styles.container}>
              <View>
              <AppIcon icon={IconNames.DELETE_IMG} size={20} />
              </View>
              <Text style={styles.title}>We're Sorry To See You Go</Text>
              <Text style={styles.subtitle}>
                Be advised, account deletion is final. There will be no way to restore your account.
              </Text>
              <View style={styles.buttonContainer}>
                {/* <TouchableOpacity style={styles.nevermindButton}>
                  <Text style={styles.nevermindButtonText}>Cancel</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.deleteButton} onPress={()=>{dispatch(saveToken(null))}}>
                  <Text style={styles.deleteButtonText}>Delete My Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </React.Fragment>
        ),
        numColumns: 1,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // height: '100%',
    padding: 20,
    backgroundColor: '#102335',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#9AA5B1',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // width: '100%',
    alignItems: 'center',
  },
  nevermindButton: {
    backgroundColor: '#D9AA59',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  nevermindButtonText: {
    color: 'white',
    fontSize: 18,
    // fontWeight: 'bold',
  },
  deleteButton: {
    // backgroundColor: '#1C1C1C',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    borderColor:'#656565',
    borderWidth: 1,
  },
  deleteButtonText: {
    color: '#9696A7',
    fontWeight: 'bold',
    // fontSize: 18,
  },
});

export default DeleteAccount;
