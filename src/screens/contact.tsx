import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking, ImageBackground, ScrollView, Image, Pressable } from 'react-native';
import Header from '../components/sectionHeader';
import PageLayout from '../layouts/page-layout/page-layout';

export const ContactCard: React.FC<{ email: string, description: string, imageUri: any }> = ({ email, description, imageUri }) => {
  return (
    <Pressable style={styles.imageBackground}>
      <Image source={require('../assets/icons/email.png')} />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.description}>{description}</Text>
        <Text style={{ color: 'white', fontSize: 16 }}>{email}</Text>
      </View>
    </Pressable>
  );
};

const ContactUsScreen = () => {
  const [contactDetails] = useState([
    {
      email: 'admin@dentistryinanutshell.com',
      description: ' Have a question, concern or complaint? Send your message to our team.',
      imageUri: require('../assets/icons/email.png'),
    },
    {
      email: ' admin@dentistryinanutshell.com',
      description: 'Keen to get involved and explore working with us? Send your message to',
      imageUri: require('../assets/icons/email.png'),
    },
    {
      email: ' team@dentistryinanutshell.com',
      description: 'Want to advertise your service or product send your message to',
      imageUri: require('../assets/icons/email.png'),
    },
  ]);
  return (
    <PageLayout
      containerStyles={styles.container} 
      flatList={{
        data: contactDetails,
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Contact Us</Text>
            </View>
          </React.Fragment>
        ),
        keyExtractor: (item, index) => `${item.name}_${index}`,
        numColumns: 1,
        renderItem: ({ item }) => (
          <ContactCard
            email={item.email}
            description={item.description}
            imageUri={item.imageUri}
          />
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 33,
    // paddingBottom:55, 
  },
  headerContainer: {
    marginLeft: 11,
    marginTop: 11,
    marginRight: 2,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    fontFamily: 'Anek Telugu',
    margin: 11,
    color: '#D9AA59',
    alignSelf: 'center',
  },
  description: {
    fontSize: 15,
    marginVertical: 11,
    color: 'gray',
    textAlign: 'center',
  },
  imageBackground: {
    backgroundColor: '#102335',
    borderRadius: 11,
    paddingTop: '8%',
    paddingBottom: '11%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    marginBottom: 11,
    marginVertical: '1%',
    margin: 11,
    borderColor: '#D9AA59',
    borderWidth: 1,
  },
  imageBackground2: {
    backgroundColor: '#102335',
    borderRadius: 11,
    height: '100%',
    paddingTop: '8%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    marginBottom: '33%',
    marginVertical: '4%',
    margin: 11,
  },
  textInput: {
    fontSize: 16,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
  },
  messageInput: {
    fontSize: 16,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f2f2f2',
    marginBottom: 20,
    height: 100,
  },
  button: {
    backgroundColor: '#3897f0',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  iconText: {
    fontSize: 24,
  },
  backgroundimg: {
    flex: 1, height: '100%',
    // justifyContent: "flex-end",
  },
});

export default ContactUsScreen;






