import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

  const Splash: React.FC =()=>{

    const navigation = useNavigation();

    useEffect(()=>{
        setTimeout(()=> navigation.navigate('Login'),2000)
    })
    
    const goToDrawer = () => { navigation.navigate('MainDrawer') };

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={goToDrawer}>
            {/* <Text style={styles.label}>This is Splash screen.... </Text> */}
            </TouchableOpacity>
        </View>
    )
} 
export default Splash


const styles = StyleSheet.create({
    container:{
        // backgroundColor:'red',
        marginVertical: "100%",
        marginHorizontal: "25%",
    },
    label:{
        fontSize:18
    }
})
