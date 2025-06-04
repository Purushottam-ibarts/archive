import React, { useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/sectionHeader'
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx'
import { filterData, getBusiness } from '../../store/businessFinance/businesActions'
import CategoryAndItems from '../../components/app-items/app-item'
import { hp } from '../../utils/constants'
import PageLayout from '../../layouts/page-layout/page-layout'
import VideoCard from '../../components/app-cards/video-card'
import { useNavigation } from '@react-navigation/native'
import { BlurView } from '@react-native-community/blur'
import LinkButton from '../../components/linkbutton'

const BusinessFinance: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const user = useAppSelector((state) => state.userSlice);
  const businessReels = useAppSelector((state) => state.businessSlice?.businessReels); 
  const hashtags = useAppSelector((state) => state.businessSlice?.hashtags); 
  const financeReels = useAppSelector((state) => state.businessSlice?.financeReels);  

  useEffect(() => {
    dispatch(getBusiness())
  }, [])

  const handleButton = (provider: string) => {
    console.log(`Handle pages ${provider}`);
    // navigation.navigate(`${provider}`)
  };

  const onSelect = (val: any) => {
    console.log('val: ', val);
    dispatch(filterData({ contentType: 'businessAndFinances', nameOfHashtag: val }))
  }

  return (
    <>
      {
        user.privilege < 2 &&
        <LinkButton/>
      }
    
    <PageLayout
      containerStyles={styles.container}
      flatList={{
        data: businessReels, 
        // data: [1,2], 
        // keyExtractor: (item:any, index) => item.id.tostring(),
        listHeaderComponent: (
          <View style={{ height: hp(5), marginVertical: 5, alignSelf: 'flex-start', paddingLeft: 5 }}>
            <CategoryAndItems categories={hashtags} itemsData={hashtags} onSelect={onSelect} />
          </View>),
        renderItem: ({ item }) => <VideoCard data={item} />,
        numColumns: 2,
      }}
    />
</>
  )
}
export default BusinessFinance

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    width: '48%',
    alignItems: 'center',
  },
  image: {
    width: hp(20),
    height: hp(20),
    resizeMode: 'contain'
  },
  text: {
    color: 'white',
    fontSize: 16
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
    marginHorizontal: 22,
    alignItems: 'center',
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