import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { wp } from '../../utils/constants';

interface Category {
  id: number;
  nameOfHashtag: string;
}

interface CategoryListProps {
  data: Category[];
  selectedItem: number;
  onSelectCategory: (categoryId: number,name:string) => void;
}

const CategoryItem: React.FC<{category: any;isSelected: boolean;onPress: () => void}> = ({ category, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.categoryItem, isSelected ? styles.selectedCategory : null]}
    onPress={onPress}>
    <Text style={[styles.categoryName, isSelected ? styles.selectedCategoryText : null]}>
      {category?.nameOfHashtag}
    </Text>
  </TouchableOpacity>
);

const CategoryList: React.FC<CategoryListProps> = ({ data, selectedItem, onSelectCategory }) => (
  <FlatList
    horizontal
    data={data}
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <CategoryItem
        category={item}
        isSelected={selectedItem === item.id}
        onPress={() => { 
          onSelectCategory(item.id,item.nameOfHashtag)
        }} 
      />
    )}
  />
);

const styles = StyleSheet.create({
  categoryItem: {
    paddingHorizontal: wp(3.5),
    paddingVertical: wp(2),
    borderRadius: 5,
    marginHorizontal: wp(1.5),
    backgroundColor:'#183047', 
  
  },
  selectedCategory: {
    backgroundColor: '#102335',
  },
  selectedCategoryText: {
    color: 'white',
    fontSize:12, 
    
  },
  categoryName: {
    fontSize:12,
    color:'#C2C2C2',
    // fontFamily:MyFonts.OpenSansRegular,
    textTransform:'capitalize'
  },
});

export default CategoryList;