import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Header: React.FC = () => {
  const navigation = useNavigation()
  const handleNotification = () => {
    console.log('Notification');
  }

  const handleProfile = () => {
    console.log('Profile');
  }
  const handleMenu = () => {
    console.log('Menu');
    // navigation.navigate('MainDrawer')
    navigation.openDrawer()
  }

  return (

    <View style={styles.container}>

      <TouchableOpacity onPress={() => handleMenu()}>
        <Image
          source={require("../assets/icons/menu.png")}
          style={styles.menu}
        />
      </TouchableOpacity>
      <Image
        source={require("../assets/icons/maskgroup.png")}
        style={styles.logo}
      />
      <TouchableOpacity onPress={() => handleNotification()}>
        <Image
          source={require("../assets/icons/Vector(1).png")}
          style={styles.vector1}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleProfile()}>
        <Image
          source={require("../assets/icons/Vector(2).png")}
          style={styles.vector2}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#102335',
    width: '100%',
    height: '22%',
    alignItems: 'center',
    // flex:1,
    // justifyContent:'space-between',
    flexDirection: 'row',
    // paddingTop:'22%',
    // paddingBottom:'5%',
    // marginRight:'15%',
    // paddingHorizontal:'5%',
  },
  textStyling: {
    color: 'white'
  },
  logo: {
    width: 177,
    height: 33,
    // marginBottom:11,
    marginRight: '11%',
    // alignSelf: 'center',
  },
  menu: {
    width: 33,
    height: 33,
    marginLeft: 15,
    marginRight: '15%',
  },
  vector1: {
    width: 11,
    height: 11,
    marginHorizontal: '1%',
  },
  vector2: {
    width: 12,
    height: 11,
    marginHorizontal: '1%',
  }


})