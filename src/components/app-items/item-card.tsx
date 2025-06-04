import React from 'react';
import { View, FlatList, StyleSheet, Text , Image} from 'react-native'; 
import { hp } from '../../utils/constants';
// import { MyColors } from '../../config/MyColors';


interface Item {
  id: number;
  name: string;
  discount: string;
  image: any;
}

interface ItemListProps {
  items: Item[];
}

const ItemCard: React.FC<{ item: Item }> = ({ item }) => (
  <View style={styles.itemCard}>
    <Image resizeMode='contain' style={styles.image} source={item.image} />
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.discount}>{item.discount}</Text>
  </View>
);

const ItemList: React.FC<ItemListProps> = ({ items }) => (
  <FlatList
    data={items}
    numColumns={3}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <ItemCard item={item} />}
  />
);

const styles = StyleSheet.create({
  itemCard: {
    flex: 1,
    borderWidth:1,
    borderColor:'#C2C2C2',
    borderRadius:3,
    
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    padding: 2,
  },
  itemName: {
    fontSize: 12,
    // fontFamily: MyFonts.OpenSansRegular,
    marginTop: 1,
    marginBottom: 2,
  },
  discount: {
    fontSize: 11,
    // fontFamily: MyFonts.OpenSansRegular,
    color:'#fff',
    backgroundColor:'#2984DF',
    padding:hp(.1),
    paddingHorizontal:hp(2),
    borderRadius:10
  },
  image:{
    width:hp(9.5),
    height:hp(9.5),
  }
});

export default ItemList;