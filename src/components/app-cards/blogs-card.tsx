import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import { useAppDispatch } from '../../store/hooks.tsx';
import { getBlogDetails } from '../../store/blogs/blogsActions';

const BlogsCard = ({ data }: { data: any }) => {
  // console.log('BlogData:-->> ', data.thumbnail); 
  const navigation = useNavigation();
  const dispatch = useAppDispatch()

  const blogDetails = async () => { 
    let blogId:any = data.id; 
    const res = await dispatch(getBlogDetails({blogId:blogId})).unwrap()
    // console.log('res: ', res);
    if(res.status== true){
      navigation.navigate('BlogsDetails')
    }
  };

  return (
    <TouchableOpacity style={styles.itemsContainer} onPress={blogDetails}>
      <View style={styles.item}>
        <Image source={{ uri: data?.thumbnail }} defaultSource={require('../../assets/images/backgroundimg.png')} style={styles.image} />
        {/* <Text style={styles.text}>{data?.nameOfPublisher}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  itemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
    marginHorizontal: 10,
  },
  item: {

  },
  image: {
    height: 125,
    width: 160,
    // width:'100%',
    padding: 10,
    borderRadius: 10,
    resizeMode: 'stretch'
  },
  text: {
    color: 'white',
    //   width:'48%',
    fontSize: 16,
    marginVertical: 11,
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

export default BlogsCard;
