import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { getSearch } from '../../store/searching/searchingAction'; 
import PageLayout from '../../layouts/page-layout/page-layout';
import VideoCard from '../../components/app-cards/video-card'; 
import { getSingleDashboardVideo } from '../../store/singleDashboardVideo/singleDashboardAction';
import CategoryAndItems from '../../components/app-items/app-item';
import { hp } from '../../utils/constants';
import { filterData } from '../../store/dashboard/dashboardActions';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation()
    const search: any = useAppSelector((state) => state?.searchSlice?.search);
    const singleVideos = useAppSelector(state => state.singleDashboardSlice?.videos || []);
    const hashtags = useAppSelector(state => state.singleDashboardSlice?.hashtags || []);
    // console.log('hashtags: ', hashtags);
     
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]); 
    const [selectedItem, setSelectedItem] = useState(null); 
    const [isFocused, setIsFocused] = useState(true);
    const [data, setData] = useState(1);

    useEffect(() => {
        setData(1);
      }, []);
    
      useEffect(() => {
        dispatch(getSingleDashboardVideo({ page: data }));
      }, [data]);

    useEffect(() => {
        if (term) {
            dispatch(getSearch({ term }))
                .then(response => {
                    if (response && response.payload.results) {
                        setResults(response.payload.results);  
                    }
                })
                .catch(error => {
                    console.error('Search error:', error);
                });
        } else {
            setResults([]);
        }
    }, [term]);

    const onSelect = async(item: any) => {
        // console.log('item: ', item);
        // setSelectedItem(item);
        // setTerm('');
        // setIsFocused(false);
        // setData(item)
        const res= await dispatch(getSingleDashboardVideo(item)).unwrap();
        // console.log('res: ', res);
        if(res.status === true){
            navigation.navigate('Videos')
            setResults([])
            setTerm('')
        }
    };

    const onSelection = (val: any) => {
        // console.log('val: ', val);
        dispatch(filterData({ contentType: 'reels', nameOfHashtag: val}))
      }

    if (selectedItem) {
        return (
            <PageLayout
                containerStyles={styles.container}
                flatList={{
                    data: [singleVideos],  
                    listHeaderComponent: (
                        <View style={{ height: hp(5), marginVertical: 5, alignSelf: 'flex-start', paddingLeft: 5 }}>
                          <CategoryAndItems categories={hashtags} itemsData={hashtags} onSelect={onSelection} />
                        </View>),
                    renderItem: ({ item }) => <VideoCard data={item} />,
                    numColumns: 1, 
                }}
            />
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                onChangeText={setTerm}
                value={term}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search"
            />
            {
            // isFocused && 
            results.length > 0 && (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.url} 
                    style={styles.resultsContainer}
                    renderItem={({ item }) => (
                        <TouchableOpacity  
                        onPress={() => {
                            // console.log('====');
                            onSelect(item.id)
                        }}>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#1c3a57',
    },
    searchInput: {
        fontSize: 18,
        padding: 10,
        backgroundColor: '#FFFFFF',
        margin: 10,
        borderRadius: 5,
        marginTop: 35,
    },
    itemText: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    resultsContainer: {
        position: 'absolute',
        top: 100,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        zIndex: 1,
    },
    button3: {
        padding: 10,
        backgroundColor: '#FFC107',
        alignItems: 'center',
        margin: 20,
        borderRadius: 5,
    },
    text: {
        color: '#1c3a57',
        fontWeight: 'bold',
    },
});

export default SearchScreen;
