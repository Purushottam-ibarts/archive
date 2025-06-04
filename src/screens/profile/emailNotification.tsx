import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PageLayout from '../../layouts/page-layout/page-layout';

const EmailNotification = () => {
  
  return (
    <PageLayout  isBack={true} 
      containerStyles={styles.container}
      flatList={{
        data: [1],
        keyExtractor: (item: any, index) => `${item?.title}_${item?.id}_${index}`,
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
            <View style={styles.container}>
            <Text> EmailNotification</Text>
            </View>
          </React.Fragment>
        ),
        numColumns: 1,
      }}
    />
  );
};

const styles = StyleSheet.create({
  backgroundimg: {
    flex: 1,
    height: '100%',
  },
  container: {
    height: '100%',
  },
  row: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  btnrow: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  input: {
    backgroundColor: '#102335',
    paddingVertical: 11,
    // paddingHorizontal: 38,
    paddingRight: '18%',
    paddingLeft: 11,
    borderRadius: 5,
    marginBottom: 10,
    color: 'white',
    borderWidth: 0.5,
    borderColor: '#656565',
  },
  textArea: {
    marginTop: '2%',
    backgroundColor: '#102335',
    height: '15%',
    marginHorizontal: '5%',
    borderRadius: 5,
    borderColor: '#656565',
    borderWidth: 0.5,
  },
  textAreaInput: {
    color: '#656565',
    marginLeft: 11,
    marginTop: 8,
  },
  recordButton: {
    backgroundColor: '#83785D',
    borderRadius: 5,
  },
  stopButton: {
    backgroundColor: '#162D42',
    borderRadius: 5,
    borderColor: '#656565',
    borderWidth: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    paddingVertical: 11,
    paddingHorizontal: '9%',
  },
  selectProcedure: {
    marginTop: '5%',
    backgroundColor: '#102335',
    height: '5%',
    marginHorizontal: '5%',
    borderRadius: 5,
    borderColor: '#656565',
    borderWidth: 0.5,
  },
  selectProcedureText: {
    color: '#656565',
    marginLeft: 11,
    marginTop: 8,
  },
  note: {
    color: 'white',
    marginLeft: 18,
    marginTop: 8,
    marginHorizontal: '5%',
  },
  sendButtonContainer: {
    marginTop: '3%',
    // marginHorizontal: '5%',
    // paddingHorizontal: '5%',
    // paddingLeft: 2,
    // paddingRight: 10,
    marginBottom: '5%',
    width: '40%',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#D9AA59',
    borderRadius: 5,
    borderColor: '#1e1c1c',
    borderWidth: 0.5,
  },
});

export default EmailNotification;
