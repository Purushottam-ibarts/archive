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
const TemplatesDetails: React.FC<RouteParams> = ({ route }) => {
  const { id: Id, title } = route.params.data; // Destructure route data
  const dispatch = useAppDispatch();
  const singleNotesData = useAppSelector((state) => state.notesTempSlice?.singleNotes) as SingleNote[];
  // console.log('singleNotesData: ', singleNotesData);

  const [selectedTexts, setSelectedTexts] = useState<Record<string, string[]>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [isListening, setIsListening] = useState(false);
  const [currentHeading, setCurrentHeading] = useState<string | null>(null);
  const [template, setTemplate] = useState<any>([]); 
  const [obj, setObject] = useState<any>([]); 
  // console.log('obj: ', obj);
  // console.log('template: ', template); 

  const isListeningRef = useRef(false);
  const currentHeadingRef = useRef<string | null>(null);

  useEffect(() => { 
    const data =  singleNotesData.map((data) => { 
     const Data = data.headings.map((item) => { 
      // console.log('item: ', item?.content);
      if(item?.content == 'InputText'){
        return{
          content:'',
          heading:item.heading
         }
      } else{
        return{
          content:[],
          heading:item.heading
         }
      }
      })
      return{
        headings:Data,
        title:data?.title
      }
    }) 
    // console.log('data: ', data);
    setTemplate(data); 
  }, [singleNotesData]);

  useEffect(() => {
    Voice.onSpeechStart = () => {
      isListeningRef.current = true;
      setIsListening(true);
    };

    Voice.onSpeechEnd = () => {
      isListeningRef.current = false;
      setIsListening(false);
    };

    Voice.onSpeechResults = (event) => {
      const text = event?.value?.[0] || '';
      if (isListeningRef.current && currentHeadingRef.current) {
        setComments((prevComments) => ({
          ...prevComments,
          [currentHeadingRef.current!]: text,
        }));
        const updatedHeadings = template?.map((headingItem:any, index:any) => { 
          if (index ===obj?.indexToUpdate) { 
            const data = headingItem?.headings?.map((item:any, ind:any) => { 
              // console.log('item: ', item);
              if (ind == obj?.i) { 
                    return { 
                      content: text,  
                      heading: obj?.heading
                    }; 
                } 
                return item
            }) 
            return {
              headings:data,
              title:headingItem?.title
            }
          } else{ 
            return {
              title:headingItem?.title,
              headings:headingItem?.headings,
            }
          }
        });  
        // console.log('updatedHeadings: ', updatedHeadings[0].headings);
        setTemplate(updatedHeadings)
      }
    };

    Voice.onSpeechError = () => {
      isListeningRef.current = false;
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const stopListening = async () => {
    try {
      await Voice.stop();
      isListeningRef.current = false;
      currentHeadingRef.current = null;
      setIsListening(false);
      setCurrentHeading(null);
    } catch (error) {
      console.error('Error stopping voice recognition: ', error);
    }
  };

  // const startListening = async (heading: string) => {
  const startListening = async (indexToUpdate: any,i:any,heading:any) => {
    // console.log('i: ', i);
    // console.log('heading: ', heading);
    // console.log('indexToUpdate: ', indexToUpdate);
    let data={
      i,heading,indexToUpdate
    }
    setObject(data)
    if (isListeningRef.current) {
      dispatch(showMessage('Already listening'));
      return;
    }

    try {
      await Voice.start('en-US');
      currentHeadingRef.current = heading;
      setCurrentHeading(heading);
      isListeningRef.current = true;
      setIsListening(true);
    } catch (error) {
      Alert.alert('Error', 'Unable to start voice recognition');
    }
  };
 
  const handleTextSelection = (indexToUpdate: any,i:any, text: any,heading:any) => {
    var isSelected:any;
    setSelectedTexts((prevSelectedTexts) => { 
      const currentSelection = prevSelectedTexts[heading] || []; 
       isSelected = currentSelection.includes(text); 
      return {
        ...prevSelectedTexts,
        [heading]: isSelected ? currentSelection.filter((t) => t !== text) : [...currentSelection, text],  
      };
    }); 
    const updatedHeadings = template?.map((headingItem:any, index:any) => { 
      if (index === indexToUpdate) { 
        const data = headingItem?.headings?.map((item:any, ind:any) => { 
          if (ind == i) {
            if(item?.content !='InputText'){ 
              if(isSelected){
                return { 
                  content: item?.content?.filter((t:any) => t == text),
                  heading: heading
                };
              } 
              else{ 
                return { 
                  content: [...item?.content, text],  
                  heading: heading
                };
              }
            }
          }else{ 
            return item 
          }
        }) 
        return {
          headings:data,
          title:headingItem?.title
        }
      } else{ 
        return {
          title:headingItem?.title,
          headings:headingItem?.headings,
        }
      }
    });  
    setTemplate(updatedHeadings)
  }; 

  const handleCommentChange = (indexToUpdate: any,i:any, text: any,heading:any) => {
    // console.log('text: ', text);
    // console.log('heading: ', heading);
    // console.log('indexToUpdate: ', indexToUpdate);
    setComments(prevComments => ({
      ...prevComments,
      [heading]: text,
    }));
 

    const updatedHeadings = template?.map((headingItem:any, index:any) => { 
      if (index === indexToUpdate) { 
        const data = headingItem?.headings?.map((item:any, ind:any) => { 
          if (ind == i) { 
                return { 
                  content: text,  
                  heading: heading
                }; 
            } 
            return item
        }) 
        return {
          headings:data,
          title:headingItem?.title
        }
      } else{ 
        return {
          title:headingItem?.title,
          headings:headingItem?.headings,
        }
      }
    });  
    setTemplate(updatedHeadings)
    
  };
   
  const saveFunc = () => {  
    // console.log('template: ', template[0]?.headings[0]);
    // console.log('template: ', template[0].headings[0]);
    // console.log('template: ', template);
    let data = Object.assign(template)
    // console.log('data: ', data);
    const serializedData = JSON.stringify(data);
    // console.log('serializedData: ', serializedData);
    const formData = new FormData();
    formData.append('templateId', Id);
    formData.append('templateName', title);
    formData.append('notesData', serializedData);  
    dispatch(storeNotesTemp(formData));
  };

  
  const copyAllText = () => {
    const allTexts = Object.values(selectedTexts).flat().join('\n');
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
        data: singleNotesData,
        keyExtractor: (_, index) => `${index}`,
        renderItem: ({ item ,index}) => { 
          // console.log('index: ', index);
          return(
            <View>
              <Pressable style={styles.section}>
                <Text style={styles.sectionTitle}>{item?.title}</Text>
                <View style={styles.optionsContainer}>
                  {item?.headings.map((headingItem, i) => {
                    // console.log('i: ', i);
                    // console.log('headingItem: ', headingItem);
                    return(
                      <View key={i} style={styles.optionGroup}>
                        <Text style={styles.optionText}>{headingItem?.heading}</Text>
                        <View style={styles.contentContainer}>
                          {headingItem?.content && headingItem?.content !== 'InputText' ? (
                            Object.values(headingItem?.content).map((value, inde) => (
                              <TouchableOpacity key={inde} style={[ styles.content, selectedTexts[headingItem.heading]?.includes(value) ? styles.selectedContent : null, ]}
                                // onPress={() => handleTextSelection(headingItem.heading, value)}
                                onPress={() => handleTextSelection(index,i,value,headingItem.heading)}
                              >
                                <Text style={styles.contentText}>{value}</Text>
                              </TouchableOpacity>
                            ))
                          ) : (
                            <View style={styles.textInputContainer}>
                              <TextInput
                                style={styles.textInput}
                                placeholder="Type your comments here"
                                placeholderTextColor="#999"
                                value={comments[headingItem.heading] || ''}
                                // onChangeText={(val) => handleCommentChange(headingItem.heading, val)}
                                onChangeText={(val) => handleCommentChange(index,i,val,headingItem.heading)}
                              />
                              <TouchableOpacity style={styles.microphone}
                                onPress={() => isListening && currentHeading === headingItem.heading
                                    ? stopListening() : 
                                    // startListening(headingItem.heading)
                                    startListening(index,i,headingItem.heading)
                                }
                              >
                                <Icon name={isListening && currentHeading === headingItem.heading ? 'microphone' : 'microphone-slash'} size={20} color="white" />
                              </TouchableOpacity>
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
            <TouchableOpacity style={styles.saveButton} onPress={saveFunc}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
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

export default TemplatesDetails;
