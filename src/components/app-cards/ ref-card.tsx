import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import AppIcon from '../app-icon/app-icon';
import { IconNames } from '../app-icon/app-icon.data';

const RefCards = ({data}:{data:any}) => { 

    const handleButton = (provider: string) => {
        // console.log(`Handle pages ${provider}`);
        // navigation.navigate(`${provider}`)
      };

  return (
      <Pressable style={styles.itemsContainer}>
          <View style={styles.avatarContainer}>
              <Image source={data.img} style={styles.image} />
              <Text style={styles.text}>{data.name}</Text>
              <View style={styles.socialIcons}>
                  <TouchableOpacity style={styles.icons} onPress={() => { handleButton('Email') }}>
                      <AppIcon icon={IconNames.MAIL} size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.icons} onPress={() => { handleButton('Web') }}>
                      <AppIcon icon={IconNames.WEB} size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.icons} onPress={() => { handleButton('Instagram') }}>
                      <AppIcon icon={IconNames.INSTAGRAM} size={20} />
                  </TouchableOpacity>
              </View>
          </View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default RefCards;
