import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppIcon from '../app-icon/app-icon';
import { IconNames } from '../app-icon/app-icon.data';

const AppCertificate = ({
  awardeeName,
  gdcNumber,
  cpdHours,
  completionDate,
  director1Name,
  director2Name,
}) => {
//   console.log('awardeeName: ', awardeeName);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CPD Certificate</Text>
      <Text style={styles.subtitle}>This Certificate is Awarded to:</Text>
      <Text style={styles.awardeeName}>{awardeeName}</Text>
      <Text style={styles.details}>GDC Number:</Text>
      <Text style={styles.value}>{gdcNumber}</Text>
      <Text style={styles.details}>Number of verifiable CPD Hours:</Text>
      <Text style={styles.value}>{cpdHours}</Text>
      <Text style={styles.details}>Date Completed:</Text>
      <Text style={styles.value}>{completionDate}</Text>
      {/* <Image source={clubLogo} c={styles.clubLogo} /> */}
      <AppIcon icon={IconNames.DIAN_LOGO} size={10}/>

      <Text style={styles.learningOutcomes}>
        GDC Learning Outcomes: C, D{'\n'}
        See Platform for aims and objectives.
      </Text>
      <View style={styles.directorsContainer}>
        <View style={styles.director}>
          {/* <Image source={director1Signature} style={styles.signature} /> */}
      <AppIcon icon={IconNames.SIGNATURE_LEFT} size={10} />

          <Text style={styles.directorName}>{director1Name}</Text>
          <Text style={styles.directorTitle}>Director of DIAN Club</Text>
        </View>
        {/* <Image source={certificateLogo} style={styles.certificateLogo} /> */}
      <AppIcon icon={IconNames.DIAN_STAMP} size={20}/>

        <View style={styles.director}>
          {/* <Image source={director2Signature} style={styles.signature} /> */}
      <AppIcon icon={IconNames.SIGNATURE_RIGHT} size={10}/>

          <Text style={styles.directorName}>{director2Name}</Text>
          <Text style={styles.directorTitle}>Director of DIAN Club</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor: '#B79150',
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    // height:'90%',
    marginTop: 55
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  awardeeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  details: {
    fontSize: 14,
    marginTop: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clubLogo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  learningOutcomes: {
    textAlign: 'center',
    marginVertical: 10,
  },
  directorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  director: {
    alignItems: 'center',
  },
  signature: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  directorName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  directorTitle: {
    fontSize: 12,
    color: '#777',
  },
  certificateLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});

export default AppCertificate;
