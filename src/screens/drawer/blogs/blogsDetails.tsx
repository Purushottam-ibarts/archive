import React, { useEffect } from 'react'
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../../store/hooks.tsx';
import CategoryAndItems from '../../../components/app-items/app-item';
import { hp } from '../../../utils/constants';
import Header from '../../../components/sectionHeader';

const BlogsDetails: React.FC=()=>  {
  const dispatch = useAppDispatch()
  const { content, hashtags }: any = useAppSelector((state) => state.blogsSlice.blogDetails);
  // console.log('content: ',  content[0]?.content);
  // const blog_details = useAppSelector((state) => state.blogsSlice.blogDetails);
  // console.log('blog_details: ', blog_details);
 

    return (
      <ImageBackground source={require('../../../assets/images/backgroundimg.png')} style={styles.backgroundimg}>
      <View style={styles.container}>
        <Header />
        <FlatList showsVerticalScrollIndicator={false} 
        data={content[0]?.content} 
        // keyExtractor={(item) => item.id.toString()} 
        // numColumns={2}
        style={{marginBottom:hp(10)}}
          renderItem={({ item }:{item:any}) => {
            // console.log('item: ', item.image);
            const encodedImageUri = item?.image ? encodeURI(item.image) : null;
            // console.log('encodedImageUri: ', encodedImageUri);
            return (
              <View style={styles.itemsContainer}>
                <TouchableOpacity style={styles.item}>
                <View style={{width:'90%',paddingVertical:10}}><Text style={{
                    textAlign:'center',
                    fontWeight:'bold',
                    color:'white',
                    fontSize:25,
                  }}>{item?.heading}</Text></View>
                  <View style={{width:'90%',paddingVertical:10}}><Text style={{
                    textAlign:'center',
                    fontWeight:'500',
                    color:'#d2cdcd',
                    fontSize:15,
                  }}>{item?.description}</Text></View>
                  {/* <Image source={require('../../../assets/images/Rectangle34.png')} style={styles.image} />  */}
                  <Image source={{ uri: encodedImageUri }} style={styles.image} /> 
                </TouchableOpacity>
              </View>
            )
          }}
          // ListFooterComponent={() => {
          //   return (
          //     <TouchableOpacity style={styles.button3}>
          //       <Text style={styles.text}>New Content Released Every Month</Text>
          //     </TouchableOpacity>
          //   )
          // }}
        />
      </View>
    </ImageBackground>
    )
}
export default BlogsDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  itemsContainer: {
    flex: 1,
    alignItems:'center',
  },
  item: {
    width: '100%', 
    alignItems: 'center', 
  },
  image: {
    width:'90%',
    // height:'100%',
    height:hp(30),
    resizeMode:'stretch',
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
  button3:{
    backgroundColor:'#D9AA59',
    padding:11,
    borderRadius:11,
    marginTop:22,
    marginHorizontal:22,
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
