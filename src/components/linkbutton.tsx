import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { hp } from '../utils/constants';

const LinkButton: React.FC = () => {
    const navigation = useNavigation()

    return (  
        <BlurView style={styles.mainContainer} blurAmount={2} blurType='dark'>
            <Pressable style={styles.headingBox}>
                <Text style={styles.textHeading}>This page is available to subscribers only.
                    Unlock premium features by subscribing to one of our plans.
                    </Text>
            </Pressable>
            
            <Pressable onPress={() => { navigation.navigate('Pricing') }} style={styles.btnBox} >
                <Text style={styles.btnText}>Subscribe Now</Text>
            </Pressable> 
        </BlurView>  
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        alignItems: 'center',
    },
    mainContainer:{
        position: 'absolute',
        // top: '15%', 
        width: '100%',
        // height: '100%',
        // flex:1,
        // zIndex: 1,
        marginTop: '15%',
    },
    headingBox:{
        marginTop: '50%',
        alignItems: 'center',
        alignSelf: 'center', 
    },
    textHeading:{
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',

    },
    btnBox:{
        // width:'90%',
        height:hp(5),
        borderRadius: 5,
        marginHorizontal:20,
        // alignSelf: 'center', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9AA59', 
    },
    btnText:{
        color: '#0f0d5f',
        fontSize: 15,
        paddingHorizontal: 5
    }, 
});

export default LinkButton;