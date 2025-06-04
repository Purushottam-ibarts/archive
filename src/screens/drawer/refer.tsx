import React, { useState } from 'react'
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/sectionHeader'
import PageLayout from '../../layouts/page-layout/page-layout'
import AppIcon from '../../components/app-icon/app-icon'
import { IconNames } from '../../components/app-icon/app-icon.data'
import RefCards from '../../components/app-cards/ ref-card'

const Refer: React.FC=()=>  {
  const [data] = useState([
    { 
      name: 'Stewart Beggs', 
      img: require('../../assets/images/Ellipse1.png'),
    },
    { 
      name: 'Laura Williams', 
      img: require('../../assets/images/Ellipse2.png'),
    },
    { 
      name: 'Dr Sara Belo',
      mail:require('../../assets/icons/Group1.png'), 
      img: require('../../assets/images/Ellipse3.png'),
    },
    { 
      name: 'Imi Nasser', 
      img: require('../../assets/images/Ellipse4.png'),
    },
    { 
      name: 'Chad Everett Cluff', 
      img: require('../../assets/images/Ellipse5.png'),
    },
    { 
      name: 'Khalil Hussein', 
      img: require('../../assets/images/Ellipse6.png'),
    },
    { 
      name: 'Fran Bresford', 
      img: require('../../assets/images/Ellipse7.png'),
    },
    { 
      name: 'Salman Primohammad', 
      img: require('../../assets/images/Ellipse8.png'),
    },
    { 
      name: 'Salman Primohammad', 
      img: require('../../assets/images/Ellipse8.png'),
    },
    { 
      name: 'Salman Primohammad', 
      img: require('../../assets/images/Ellipse8.png'),
    },
    { 
      name: 'Salman Primohammad', 
      img: require('../../assets/images/Ellipse8.png'),
    },
    { 
      name: 'Salman Primohammad', 
      img: require('../../assets/images/Ellipse8.png'),
    },
  ])
  
  return (
    <PageLayout containerStyles={styles.container}
      flatList={{
        data: data,
        keyExtractor: (item: any, index) => `${item.title}_${item.id}_${index}`,
        renderItem: ({ item }) => <RefCards data={item} />,
        numColumns: 2,
      }}
    />
  )
    
}
export default Refer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  avatarContainer:{
    backgroundColor:'#102335',
    width:'100%',
    borderRadius:11,
    alignItems: 'center', 
    height:150,
    marginTop:55,
  },
  socialIcons:{
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-evenly', 
  },
  icons:{ 
    margin:5,
    marginTop:10,
  },
  itemsContainer: {
    flex:1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  item: {
    width: '48%', 
    alignItems: 'center', 
  },
  image: { 
    position: 'absolute', 
    top: -44,    
    zIndex: 2,
   },
  text: {
    color: '#D9AA59',
    fontSize: 16,
    marginTop: 77
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
    paddingHorizontal:22
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