import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react'
import { Button, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Header from '../../components/sectionHeader';
import PageLayout from '../../layouts/page-layout/page-layout';
import AppIcon from '../../components/app-icon/app-icon';
import { IconNames } from '../../components/app-icon/app-icon.data';
import AssistCard from '../../components/app-cards/assist-card';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { fetchDashboardData } from '../../store/dashboard/dashboardActions';
import { BlurView } from '@react-native-community/blur';
import LinkButton from '../../components/linkbutton';

const Assist: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation: any = useNavigation();
  const videos = useAppSelector(state => state.dashboardSlice.videos); 
  const user = useAppSelector((state) => state.userSlice);
  // console.log('user:|||||||| ', user);
  const token = useAppSelector(state => state.userSlice.token);
  // console.log('token: ', token);
  // console.log('dashboardState: ', videos);

  useFocusEffect(() => { 
    // if(user.privilege < 2){
    //   navigation.navigate('Pricing') 
    // }  
  }, );

  const [data] = useState([
    { 
      screenName:'Speech',
      name: 'Notes',
      title: 'Speech To Text',
      img: require('../../assets/icons/voiceToText.png'),
      IconNames:IconNames.SPEECH_TO_TEXT,
    },
    {
      screenName:'Email',
      name: 'Patient',
      title: 'Email Sender',
      img: require('../../assets/icons/email.png'),
      IconNames:IconNames.EMAIL_SENDER,
    },
    {
      screenName:'Template',
      name: 'Notes',
      title: 'Template',
      img: require('../../assets/icons/arrow.png'),
      IconNames:IconNames.TEMPLATE,
    },
    {
      screenName:'VideoExplainer',
      name: 'Patient',
      title: 'Explainer Videos',
      img: require('../../assets/icons/videoExplainer.png'),
      IconNames:IconNames.EXPLAINER_VIDEO,
    },
  ])
 
  useEffect(()=>{
    // dispatch(fetchDashboardData({email:'hancockghostwriters@gmail.com'}))
  },[])
 
  return (
    <>
    <LinkButton/>
    { user.privilege < 2 && <LinkButton/> }
      <PageLayout containerStyles={styles.container} 
        flatList={{
          data: data,
          keyExtractor: (item: any, index) => `${item?.title}_${item?.id}_${index}`,
          listHeaderComponent: (
            <React.Fragment key={'list-header-components-fragment'}>
              <View style={{ flex: 1, height: 1, backgroundColor: 'gray', marginHorizontal: 5, }} />
              <Text style={styles.headerText}>Please access the ASSIST feature	only in laptops and desktop computers.
               We are currently working towards making in available	in other form factors like Tablets and mobile and will be available soon!</Text>
            </React.Fragment>
          ),
          renderItem: ({ item }) => <AssistCard data={item} /> ,
          numColumns: 1,
          listFooterComponent:({ item }) =>
          <TouchableOpacity style={styles.button3}>
          <Text style={styles.text}>New Content Released Every Month</Text>
        </TouchableOpacity>,
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundimg: {
    // flex: 1,height:'100%',
    // justifyContent: "flex-end",
  },
  headerText: {
    fontSize: 15,
    backgroundColor: '#102335',
    color: 'white',
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button3:{
    backgroundColor:'#D9AA59',
    borderRadius:11,
    marginTop:33,
    alignItems: 'center', 
    paddingHorizontal:22,
    marginHorizontal:33,
    paddingVertical:22, 
    marginBottom:88,
  },
  cardBox: {
    marginTop: '11%',
    backgroundColor: '#102335',
    marginHorizontal: '5%',
    borderRadius: 10
  },
  titleText: {
    color: 'white',
    fontSize: 25,
    paddingTop: 5,
  },
  btnBox: {
    display: 'flex',
    alignSelf: 'flex-end',
    // width: '20%',
    justifyContent: 'center',
    // margin: 10,
    marginRight: 20,
    marginBottom: 20,
    // padding: 22,
    backgroundColor: '#071625',
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#D9AA59',
    borderBottomColor: '#071625',
  }
})

export default Assist
