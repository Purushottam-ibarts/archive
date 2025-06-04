import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import PageLayout from '../../../layouts/page-layout/page-layout';
import BlogsCard from '../../../components/app-cards/blogs-card';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.tsx';
import { getBlogs } from '../../../store/blogs/blogsActions';
import CategoryAndItems from '../../../components/app-items/app-item';
import { hp } from '../../../utils/constants';
import { BlurView } from '@react-native-community/blur';
import LinkButton from '../../../components/linkbutton';

const Blogs: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation();
  const blogsData:any = useAppSelector((state) => state.blogsSlice.blogs);
  const user = useAppSelector((state) => state.userSlice);
  // console.log('blogsData: ', blogsData);
  // console.log('hashtags: ', hashtags);

  useEffect(()=>{
    dispatch(getBlogs())
  },[])

  const onSelect = (val: any) => { 
    console.log('val: ', val);
  } 
  
  return ( 
    // <View><Text>sds</Text></View>
    <>
      {
        user.privilege < 1   &&
        <LinkButton/>
      }
    <PageLayout containerStyles={styles.container}
      flatList={{
        data: blogsData?.blogs,
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
            <View style={{ height: hp(5), marginVertical: 5, alignSelf: 'flex-start', paddingLeft: 5 }}>
            {/* <CategoryAndItems categories={hashtags} itemsData={hashtags} onSelect={onSelect} /> */}
            </View>
          </React.Fragment>
        ),
        keyExtractor: (item: any, index) => `${item.title}_${item.id}_${index}`,
        renderItem: ({ item }) => <BlogsCard data={item} />,
        numColumns: 2,
      }}
    />
    </>
  )
}

export default Blogs
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:hp(7)
    // alignItems: 'center',
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
