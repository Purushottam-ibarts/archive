import React, { useEffect } from 'react'
import { Image, ImageBackground, Linking, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/sectionHeader'
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx'
import { getCoursesData } from '../../store/courses/coursesAction'
import PageLayout from '../../layouts/page-layout/page-layout'
import { hp } from '../../utils/constants'
import { BlurView } from '@react-native-community/blur'
import { useNavigation } from '@react-navigation/native'
import LinkButton from '../../components/linkbutton'

const Courses: React.FC=()=>  {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const user = useAppSelector((state) => state.userSlice);
  const courses: any = useAppSelector((state) => state.coursesSlice?.content);
  // console.log('courses: ', courses);
  useEffect(() => {
    dispatch(getCoursesData())
  }, [])

  const handleButton = (provider: string) => {
    console.log(`Handle pages ${provider}`);
    // navigation.navigate(`${provider}`)
  };
  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };
    return (
      <>
      {
       user.privilege < 2 &&
       <LinkButton/>
     }
      <PageLayout
      containerStyles={styles.container}
      flatList={{
        data: courses,
        //  == undefined ? []:businessReels,
        // keyExtractor: (item:any, index) => item.id.tostring(),
        renderItem: ({ item }) => {
          // console.log('item: ', item);  
          return(
          <View style={styles.itemsContainer}>
          <TouchableOpacity style={styles.item} onPress={() => openURL(item?.url)}>
            <Image source={{uri:`https://www.dentistryinanutshell.com/dian/public/courses/${item?.thumbnail_name}`}} style={styles.image}/>
            {/* <Text style={styles.text1}>Dental implant training</Text> */}
          </TouchableOpacity> 
          </View>
          )
        },
        listFooterComponent: (
          <TouchableOpacity style={styles.button3}>
            <Text style={styles.text}>New Content Released Every Month</Text>
          </TouchableOpacity>
        ),
        numColumns: 2,
      }}
    />
    </>
    )
}
export default Courses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  itemsContainer: {
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop:22
  },
  item: {
    width: '48%', 
    // backgroundColor: '#1d354d',
    // borderEndWidth:1,
    // alignItems: 'center',
    // paddingVertical: 22,
    // marginBottom: 20,
    
  },
  image: {
    marginBottom: 8, 
    // width: '100%', 
    width: hp(20),
    height: hp(20),
   },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text1: {
    color: 'white',
    fontSize: 16,
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
    alignItems: 'center', 
    paddingHorizontal:22,
    marginHorizontal:33,
    paddingVertical:22, 
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

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

