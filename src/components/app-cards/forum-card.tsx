import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/sectionHeader';
import { ScrollView } from 'react-native-gesture-handler';
import AppIcon from '../app-icon/app-icon';
import { IconNames } from '../app-icon/app-icon.data';

const ForumCard = ({ data }: { data: any }) => {
    // console.log('data: ', data);
    const handleButton = (provider: string) => {
        // console.log(`Handle pages ${provider}`);
        // navigation.navigate(`${provider}`)
    };
    return (
        <Pressable style={styles.itemsContainer}>
            <TouchableOpacity
            // onPress={()=>{shopguideline('ShopGuide')}}
            >
                <View style={styles.imageBackground}>
                <AppIcon icon={IconNames.PROFLIEGUIDE} size={15} containerStyle={{ paddingHorizontal: 10 }} />
                    <Text style={styles.question}>
                        {data.question}
                    </Text>
                    <Text style={styles.description}>
                        {data.text}
                    </Text>
                </View>
            </TouchableOpacity>
        </Pressable>
    )
}
export default ForumCard
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 55,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 15,
    },
    textContainer: {
        backgroundColor: '#102335',
        padding: 15,
        marginBottom: 11
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 11,
        color: '#D9AA59',
    },
    description: {
        fontSize: 15,
        marginVertical: 5,
        color: '#9696A7',
        textAlign: 'center',
    },
    question: {
        fontSize: 15,
        marginVertical: 11,
        color: 'white',
        textAlign: 'center',
    },
    imageBackground: {
        backgroundColor: '#102335',
        borderRadius: 11,
        // height: '100%',
        paddingTop: '8%',
        paddingHorizontal: '5%',
        alignItems: 'center',
        paddingBottom: '11%',
        marginVertical: '1%',
        margin: 11,
    },
    imageBackground2: {
        backgroundColor: '#102335',
        borderRadius: 11,
        height: '100%',
        paddingTop: '8%',
        paddingHorizontal: '5%',
        alignItems: 'center',
        marginBottom: '33%',
        marginVertical: '4%',
        margin: 11,
    },
    textInput: {
        fontSize: 16,
        padding: 10,
        borderRadius: 6,
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
    },
    messageInput: {
        fontSize: 16,
        padding: 10,
        borderRadius: 6,
        backgroundColor: '#f2f2f2',
        marginBottom: 20,
        height: 100,
    },
    button: {
        backgroundColor: '#3897f0',
        padding: 15,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    iconText: {
        fontSize: 24,
    },
    backgroundimg: {
        flex: 1, height: '100%',
        // justifyContent: "flex-end",
    },
});

