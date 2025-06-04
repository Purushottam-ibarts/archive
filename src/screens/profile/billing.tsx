import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PageLayout from '../../layouts/page-layout/page-layout';
import * as ImagePicker from 'react-native-image-picker';
import { hp } from '../../utils/constants';
import AppIcon from '../../components/app-icon/app-icon';
import { IconNames } from '../../components/app-icon/app-icon.data'; 
import BillingCard from '../../components/app-cards/appBillingCard';

const Billing = () => {
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

  const handleReactivate = () => {
    console.log('Handle reactivation logic here');
  };

  const handleReactivateAnnually = () => {
    console.log('Handle annual reactivation logic here');
  };

  return (
    <PageLayout
      containerStyles={styles.container}
      flatList={{
        data: [1],
        keyExtractor: (item, index) => `${item?.title}_${item?.id}_${index}`,
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
            <View style={styles.container}>
              <View style={styles.userProfileContainer}>
                <Pressable onPress={selectImage} style={styles.userProfile}>
                  {imageSource !== null ? (
                    <Image source={{ uri: imageSource.uri }} style={styles.image} />
                  ) : (
                    <AppIcon icon={IconNames.USER_PROFILES} size={15} />
                  )}
                </Pressable>
                <View style={styles.textContaier}>
                  <Text style={styles.userName}>Jhon Doe / Billing</Text>
                  <Text style={styles.userDescription}>Manage billing information and view receipts</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>Upgrade</Text>
                <Text style={styles.upgradeAccButtonText}>Your Account</Text>
              </TouchableOpacity>

              <BillingCard 
                planType="Pro Monthly" 
                cancelDate="July 23rd, 2023" 
                onReactivate={handleReactivate} 
                onReactivateAnnually={handleReactivateAnnually} 
              />
              <BillingCard 
                planType="Pro Annual" 
                cancelDate="May 18th, 2023" 
                onReactivate={handleReactivate} 
                onReactivateAnnually={handleReactivateAnnually} 
              />
              <BillingCard 
                planType="Pro Monthly" 
                cancelDate="March 27th, 2023" 
                onReactivate={handleReactivate} 
                onReactivateAnnually={handleReactivateAnnually} 
              />
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
    height: '100%',
    padding: 20,
    backgroundColor: '#1C2D42',
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
});

export default Billing;
