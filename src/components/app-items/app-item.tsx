import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';    
import CategoryList from './catego-item';
import ItemList from './item-card';

interface Category {
    id: number;
    name: string; 
}

interface Item {
    id: number;
    name: string;
    discount: string;
    image: any;
}

interface CategoryAndItemsProps {
    categories: Category[];
    itemsData: { [key: string]: Item[] };
    onSelect: (name:string) => void;
}

const CategoryAndItems: React.FC<CategoryAndItemsProps> = ({ categories, itemsData,onSelect}) => {
    // console.log('categories: ', categories);
    const [selectedCategory, setSelectedCategory] = useState<number>(categories[0]?.id);

    const selectCategory = (categoryId: number,nameOfHashtag:string) => { 
        // console.log('categoryId: ', categoryId);
        setSelectedCategory(categoryId);
        onSelect(nameOfHashtag)
    };

    return (
        <View>
            <View style={styles.container}>
                <CategoryList data={categories}  selectedItem={selectedCategory} onSelectCategory={selectCategory} />
            </View> 
        </View>

    );
};

const styles = StyleSheet.create({
    container: { 
        marginVertical: 4, 
        alignItems: 'center', 
    },
    noList: { 
        justifyContent: 'center',
        alignItems: 'center',
        height: 60
    },
    orangeHeading:{ 
        color:'#7D8FAB', 
        textDecorationLine:'underline',
        fontSize:17,
        paddingTop:4
    }
});

export default CategoryAndItems;