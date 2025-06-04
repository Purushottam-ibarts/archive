import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Linking, Alert } from 'react-native'; // Added Linking here
import PageLayout from '../../layouts/page-layout/page-layout';
import AppIcon from '../../components/app-icon/app-icon';
import { IconNames } from '../../components/app-icon/app-icon.data';

const PubMed: React.FC = () => {
  const [value, setValue] = useState('');

  const search = () => {
    if (value.trim() !== '') { 
      const encodedQuery = encodeURIComponent(value); 
      const url = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodedQuery}`;
      Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
    } else {
      // console.log('No search term entered.');
      Alert.alert('No search term entered.');
    }
  }

  return (
    <PageLayout containerStyles={styles.container}
      flatList={{
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
            <View style={styles.container}>
              <Text style={styles.title}>PubMed Search</Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={setValue}
                  placeholder="Enter your search term..."
                  placeholderTextColor="#656565"
                />
                <Pressable style={styles.iconContainer} onPress={search}>
                  <AppIcon icon={IconNames.SEARCH} size={20} containerStyle={styles.iconContainer} />
                </Pressable>
              </View>
            </View>
          </React.Fragment>
        ),
        keyExtractor: (item: any, index) => `${item.title}_${item.id}_${index}`,
      }}
    />
  )
}

export default PubMed;

const styles = StyleSheet.create({
  container: {
    // flex:1
  },
  title: {
    color: 'white',
    marginVertical: 22,
    paddingLeft: 33,
    fontSize: 25,
  },
  iconContainer: {
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e1c1c',
    marginHorizontal: '5%',
    paddingRight: 22,
    borderRadius: 15,
    borderColor: '#656565',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 22,
    color: 'white',
    borderRadius: 15,
    paddingLeft: 15,
  },
});
