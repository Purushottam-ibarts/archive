import React, { Component } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/sectionHeader';
import QuantityButton from '../../components/quantityButton';

const ShopGuideline2:React.FC=()=> {
    return (
      <ImageBackground
      source={require("../../assets/images/backgroundimg.png")}
      style={styles.backgroundimg}>
      <View style={styles.container}>
      <Header/>
      <View style={{height: '33%',marginTop:'5%'}}>     
          <View style={styles.imageBackground2}>
              <Image source={require('../../assets/images/Dianbook2.png')}/>
          </View>
            <Text style={styles.price}>Guidebook</Text>
            <Text style={styles.textStyling}>Dentistry in a Nutshell</Text>
            <Text style={styles.textStyling}>£295.00 GBP</Text>
            <Text style={styles.TaxStyling}>Tax included.</Text>
            <Text style={styles.qtyStyling}>Quantity:</Text>
      </View>
      <View style={{marginTop:'38%',backgroundColor:'#102335'}}>
      <QuantityButton />
      </View>
      <TouchableOpacity style={{alignItems:'center',
      marginTop:11,
      backgroundColor:'#D9AA59',
      paddingHorizontal: '25%',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ccc',
      }}>
        <Text style={{color:'white',fontSize:15,padding:6}}>Add to card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems:'center',
      marginTop:11,
      backgroundColor:'#3C0DEF',
      paddingHorizontal: '24%',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ccc',
      }}>
        <Text style={{color:'white',fontSize:15,padding:5}}>Buy with shop</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // padding: 66,
      alignItems: 'center',
      width: '100%',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      margin: 10,
      color: '#D9AA59',
    },
    imageBackground:{
      backgroundColor:'#102335',
      borderRadius:11,
      height: '100%', 
      padding:'5%', 
      alignItems: 'center',
    },
    imageBackground2:{
      // backgroundColor:'#102335',
      borderRadius:11,
      height: '100%', 
      marginBottom: 5,
    },
    textStyling:{
      color: 'white',
      marginVertical:5,
      fontSize:22
    },
    TaxStyling:{
      color: 'white',
      marginVertical:5,
      fontSize:11
    },
    qtyStyling:{
      color: 'white',
      marginVertical:5,
      fontSize:11
    },
    price:{
      color: '#888585',
      fontSize: 15
    },
    image:{
      // backgroundColor:'red',
      // width:  212.87,
      // height:  212.8,
    },
    description: {
      fontSize: 16,
      marginBottom: 20,
    },
    plansContainer: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    planButton: {
      backgroundColor: '#f2f2f2',
      padding: 15,
      borderRadius: 6,
      marginBottom: 10,
      width: '100%',
    },
    selectedPlan: {
      backgroundColor: '#3897f0',
      color: '#fff',
    },
    planText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    planPrice: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    planDetails: {
      marginTop: 22, 
    },
    planLabel:{
    marginVertical:5,   
    fontSize:18
    },
    buttonContainer:{
      marginTop:'5%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      marginHorizontal:'5%'
      },
      subsButton:{
      backgroundColor:'#1e1c1c',
      borderRadius:5,
      borderColor:'orange',
      borderWidth:0.5
      },
      textButton:{
      color:'white',
      fontSize:15,
      paddingVertical:11,
      paddingHorizontal:66
      },
      backgroundimg:{
        flex: 1,height:'100%',
        // justifyContent: "flex-end",
      },
   
  });

export default ShopGuideline2