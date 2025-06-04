import React, { useState } from 'react'
import { Alert, Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/sectionHeader';
import { ScrollView } from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';

const DownloadCard = ({ data }: { data: any }) => {
  // console.log('data:--->> ', data.files);

  const downloadFile = async (url) => {
    const fileName = url.split('/').pop();
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    // console.log('downloadDest: ', downloadDest);

    RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
    }).promise
      .then(() => {
        Alert.alert('Download Success', `File downloaded to ${downloadDest}`);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Download Failed', 'An error occurred while downloading the file.');
      });
  };
  return (
    <TouchableOpacity style={styles.item} 
    onPress={() => downloadFile(data.files[0])}
    >
      <Image source={{ uri: data?.thumbnailFile }} style={styles.image} />
      {/* <Text style={styles.text}>{data.text}</Text> */}
    </TouchableOpacity>

  )
}

export default DownloadCard
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
    marginHorizontal: 10,
  },
  image: {
    height: 125,
    // width:160,
    width: '100%',
    // padding:10, 
    borderRadius: 10,
    // resizeMode:'stretch'
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginVertical: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 10,
    marginRight: 10,
  },
  button2: {
    backgroundColor: '#102335',
    paddingVertical: 15,
    paddingHorizontal: 55,
    borderRadius: 10,
  },
  button3: {
    backgroundColor: '#D9AA59',
    padding: 11,
    borderRadius: 11,
    marginTop: 22,
    paddingHorizontal: 22
  },
  templateButton: {
    marginRight: 'auto',
  },
  buttonText: {
    color: '#102335',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText2: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundimg: {
    flex: 1,
    height: '100%',
  },
});
