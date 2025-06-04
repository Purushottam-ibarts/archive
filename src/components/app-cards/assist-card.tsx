import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import AppIcon from '../app-icon/app-icon';
import { IconNames } from '../app-icon/app-icon.data';
import { useNavigation } from '@react-navigation/native';

const AssistCard = ({data}:{data:any}) => { 
    // console.log('data: ', data);
    const navigation = useNavigation();
    const handleAssist = (provider: string) => {
      // console.log(`Handle pages ${provider}`);
      navigation.navigate(`${provider}`)
    };
  return (
    <Pressable style={styles.cardBox}>
    <TouchableOpacity onPress={() => { handleAssist(`${data?.screenName}`) }}
    style={{ marginVertical: '5%', marginHorizontal: '5%', paddingLeft: 10 }}>
      <Image source={data?.img} style={{ marginBottom: '1%' }} />
      {/* <AppIcon icon={IconNames.SPEECH_TO_TEXT} size={20} containerStyle={{padding:15,marginBottom: '1%'}}/> */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 15, color: 'gray' }}>{data?.name}</Text>
        <Text style={styles.titleText}>{data?.title}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} style={styles.btnBox} onPress={() => { handleAssist(`${data?.screenName}`) }}>
      {/* <AppIcon icon={IconNames.RIGHT_ICON} size={20} containerStyle={{padding:15}}/> */}
    </TouchableOpacity>
  </Pressable>
  );
};

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
});

export default AssistCard;
