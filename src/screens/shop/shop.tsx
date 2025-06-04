import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import Header from '../../components/sectionHeader';

const ShopScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigation = useNavigation();
  const handlePlanSelection = (plan: string | React.SetStateAction<null>) => {
    setSelectedPlan(plan);
    // console.log('plan: ', plan);
  };

  const shopguideline = (provider: string) =>{
    // console.log('provider: ', provider);
    navigation.navigate(`${provider}`)
  }

  return (
  <ImageBackground
    source={require("../../assets/images/backgroundimg.png")}
    style={styles.backgroundimg}>
    <View style={styles.container}>
      <Header/>
      <Text style={styles.title}>Shop</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{height: '33%',}}>
        <TouchableOpacity onPress={()=>{shopguideline('ShopGuide')}}>      
          <View style={styles.imageBackground}>
              <Image source={require('../../assets/images/Dianbook1.png')}/>
          </View>
        </TouchableOpacity>
            <Text style={styles.textStyling}>Dentistry in a Nutshell</Text>
            <Text style={styles.price}>£64.99 GBP</Text>
      </View>

      <View style={{height: '33%',marginTop:'30%'}}>
        <TouchableOpacity onPress={()=>{shopguideline('ShopGuide2')}}>      
          <View style={styles.imageBackground2}>
              <Image source={require('../../assets/images/Dianbook2.png')}/>
          </View>
        </TouchableOpacity>
            <Text style={styles.textStyling}>Dentistry in a Nutshell</Text>
            <Text style={styles.price}>£64.99 GBP</Text>
      </View>
       
    </ScrollView>
    </View>
    </ImageBackground>
  );
};

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
    marginVertical:11
  },
  price:{
    color: 'gray',
    // marginVertical:11
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

export default ShopScreen;
