import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Clipboard,
  Alert,
  Pressable,
} from 'react-native';
import PageLayout from '../../layouts/page-layout/page-layout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { storeNotesTemp } from '../../store/notesTemplete/notesTempAction';
import Voice from '@react-native-voice/voice';
import { showMessage } from '../../store/common';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define the route prop type
interface RouteParams {
  route: {
    params: {
      data: {
        id: string;
        title: string;
      };
    };
  };
}

// Define the types for the singleNotesData
interface SingleNote {
  title: string;
  headings: Array<{
    heading: string;
    content?: { [key: string]: string } | string; // Support InputText and content objects
  }>;
}

// Define the component with proper props
const SaveTemplatesDetails: React.FC<RouteParams> = ({ route }) => {
  const { id: Id, title } = route.params.data; // Destructure route data
  const dispatch = useAppDispatch();
  const saveTemplatesDetails = useAppSelector((state) => state.notesTempSlice?.saveTemplatesDetails) as SingleNote[];
//   console.log('saveTemplatesDetails: ', saveTemplatesDetails);
   
   

  
  const copyAllText = () => {
    const allTexts = Object.values(saveTemplatesDetails).flat().join('\n');
    if (allTexts) {
      Clipboard.setString(allTexts);
      Alert.alert('Success', 'All selected text has been copied to the clipboard!');
    } else {
      Alert.alert('No text selected', 'Please select text before copying.');
    }
  };

  return (
    <PageLayout
      containerStyles={styles.container}
      isBack={true}
      flatList={{
        data: saveTemplatesDetails,
        keyExtractor: (_, index) => `${index}`,
        renderItem: ({ item ,index}) => { 
          return(
            <View>
              <Pressable style={styles.section}>
                <Text style={styles.sectionTitle}>{item?.title}</Text>
                <View style={styles.optionsContainer}>
                  {item?.headings.map((headingItem:any, i) => {
                    return(
                      <View key={i} style={styles.optionGroup}>
                        <Text style={styles.optionText}>{headingItem?.heading}</Text>
                        <View style={styles.contentContainer}>
                          {headingItem?.content && typeof headingItem?.content != "string" ? (
                            Object.values(headingItem?.content).map((value:any, inde) => (
                              <TouchableOpacity key={inde} style={[ styles.content]}>
                                <Text style={styles.contentText}>{value}</Text>
                              </TouchableOpacity>
                            ))
                          ) : (
                            <View 
                            // style={styles.textInputContainer}
                            >
                                <Text style={styles.contentText}>{headingItem?.content}</Text> 
                            </View>
                          )}
                        </View>
                      </View>
                    )
                  })}
                </View>
              </Pressable>
            </View>
          )
        },
        numColumns: 1,
        listFooterComponent: () => (
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.copyButton} onPress={copyAllText}>
              <Text style={styles.buttonText}>Copy Text</Text>
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d9a867',
    backgroundColor: '#2F4A64',
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  optionGroup: {
    marginBottom: 15,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 11,
    fontWeight: '600',
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    backgroundColor: '#132230',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginRight: 10,
  },
  selectedContent: {
    borderColor: '#d9a867',
    borderWidth: 1,
  },
  contentText: {
    color: 'white',
    fontSize: 14,
  },
  textInputContainer: {
    width: '100%',
    flexDirection: 'row',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#132230',
    height: 40,
    alignItems: 'center',
  },
  textInput: {
    color: 'white',
    paddingHorizontal: 10,
    width: '90%',
  },
  microphone: {
    backgroundColor: '#d9a867',
    borderRadius: 5,
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '55%',
    justifyContent: 'space-between',
    marginBottom: 44,
  },
  saveButton: {
    paddingVertical: 11,
    backgroundColor: '#102335',
    paddingHorizontal: 33,
    borderRadius: 10,
  },
  copyButton: {
    paddingVertical: 11,
    backgroundColor: '#D9AA59',
    paddingHorizontal: 33,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SaveTemplatesDetails;
