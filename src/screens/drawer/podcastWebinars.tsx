import React, { useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/sectionHeader'
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx'
import { filterData, getPodsCast } from '../../store/podsCast&Webinar/podsCastAction'
import CategoryAndItems from '../../components/app-items/app-item'
import { hp } from '../../utils/constants'
import PageLayout from '../../layouts/page-layout/page-layout'
import VideoCard from '../../components/app-cards/video-card'

const PodsCastWebinars: React.FC = () => {
  const dispatch = useAppDispatch()
  const podcastData = useAppSelector((state) => state.podcastSlice?.podsCast); 
  const hashtags = useAppSelector((state) => state.podcastSlice?.hashtags);  
  // console.log('hashtags: ', hashtags);

  const onSelect = (val: any) => {
    // console.log('val: ', val);
    dispatch(filterData({ contentType: 'Podcasts', nameOfHashtag: val }))
  }
  const [data, setData] = useState(1) 
  useEffect(() => {
    dispatch(getPodsCast())
  }, [data])

  const handleEndReached = () => {
    console.log('End reached');
    let val = data + 1
    setData(val)
  };

  return ( 
        <PageLayout
          containerStyles={styles.container}
          flatList={{
            data: podcastData, 
            listHeaderComponent: (
              <View style={{ height: hp(5), marginVertical: 5, alignSelf: 'flex-start', paddingLeft: 5 }}>
                <CategoryAndItems categories={hashtags} itemsData={hashtags} onSelect={onSelect} />
              </View>
            ),
            renderItem: ({ item }) => <VideoCard data={item} selected={false} />,
            numColumns: 2, 
          }}
        /> 
  )
}
export default PodsCastWebinars

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    marginBottom:'15%',
    // backgroundColor:'red',
  },
  itemsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    // width: '48%',
    // alignItems: 'center',
    // paddingVertical: 22,
    // marginBottom: 20,

  },
  image: {
    // marginBottom: 8,
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