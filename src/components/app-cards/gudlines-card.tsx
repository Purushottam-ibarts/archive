import React, { useState } from 'react'
import { Image, ImageBackground, Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { hp } from '../../utils/constants';

const openURL = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };
const GuidlinesCard = ({ data }: { data: any }) => {
    // console.log('data: ', data);
    return (
        <Pressable style={styles.itemsContainer}>
            <TouchableOpacity style={styles.item} onPress={() => openURL(data.url)}>
                {/* <Image source={require('../../assets/images/Rectangle70.png')} style={styles.image} /> */}
                <Image source={{uri:data?.thumbnailUrl || data?.contentUrl}} style={styles.image}/>
                {/* <Text style={styles.text}>{data.name}</Text> */}
            </TouchableOpacity>
        </Pressable>
    )
}
export default GuidlinesCard
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 5,
        marginHorizontal: 10,
    },
    item: {
        // width: '48%', 
        // alignItems: 'center',
        // paddingVertical: 22,
        // marginBottom: 20,
        borderRadius:25,
    },
    image: {
        width: hp(20),
        height:hp(15),
        resizeMode:'contain',
        // borderRadius:25,
    },
    text: {
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
    button3: {
        backgroundColor: '#D9AA59',
        padding: 11,
        borderRadius: 11,
        marginTop: 22,
        paddingHorizontal: 22
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

