import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/sectionHeader';
import { ScrollView } from 'react-native-gesture-handler';
import PageLayout from '../../layouts/page-layout/page-layout';
import DownloadCard from '../../components/app-cards/download-card';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { getDownload } from '../../store/downnload/downloadAction';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import LinkButton from '../../components/linkbutton';
import { hp } from '../../utils/constants.tsx';

const Download: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const user = useAppSelector((state) => state.userSlice);
  const data: any = useAppSelector(state => state.downloadSlice?.data);
  // console.log('data: ', data);

  useEffect(() => {
    dispatch(getDownload())
  }, [])
  return (
    <>
      {user.privilege < 2 && <LinkButton />}
      <PageLayout containerStyles={styles.container}
        flatList={{
          data: data,
          keyExtractor: (item: any, index) => `${item.title}_${item.id}_${index}`,
          renderItem: ({ item }) => <DownloadCard data={item} />,
          numColumns: 2,
        }}
      />
    </>
  )
}

export default Download
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    marginBottom:hp(5),
    marginTop: 22,
    // paddingBottom: 22,
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 22
  },
  item: {
    width: '48%',
    alignItems: 'center',
    // paddingVertical: 22,
    // marginBottom: 20,

  },
  image: {
    // marginBottom: 8,
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
