import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showMessage } from '../../store/common';
import { saveHeading } from '../../store/notesTemplete/notesTempSlice';

const Section = ({ data, selectedTexts, setSelectedTexts }) => {
  console.log('>>>>>>>>>>>>>>>>>>>');
  const dispatch = useAppDispatch();
  const currentHeading1 = useAppSelector((state) => state.notesTempSlice?.currentHeading); 
  // console.log('currentHeading: ', currentHeading1);
  const [comments, setComments] = useState({}); // Stores comments for each heading
  // console.log('comments: ', comments);
  const [isListening, setIsListening] = useState(false); // UI state for voice listening
  const [currentHeading, setCurrentHeading] = useState(null); // Tracks the currently active heading
  // console.log('currentHeading: ', currentHeading); 
  const isListeningRef = useRef(false); // Ref for managing isListening state internally
  const currentHeadingRef = useRef(null); // Ref for managing currentHeading internally
  console.log('currentHeadingRef: ', currentHeadingRef);

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
      const text = event?.value?.[0] || ''; // Get the recognized text
      // console.log('currentHeadingRef:>> ', currentHeading1);
      console.log('Recognized Text: ', text);

      if (isListeningRef.current) {
        console.log('===');
        setComments((prevComments) => {
          const currentText = prevComments[currentHeading1] || ''; 
          return {
            ...prevComments,
            [currentHeading1]: currentText + ' ' + text, 
          };
        });

        
        
        // setComments((prevComments) => {
        //   const currentText = prevComments[currentHeading1] || '';
        //   console.log('currentText: ', currentText);
        //   return {
        //     ...prevComments,
        //     [currentHeading1]: currentText + ' ' + text, // Append new text
        //   };
        // });
      }
    };

    Voice.onSpeechError = (error) => { 
      isListeningRef.current = false;
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
 
  const stopListening = async () => {
    // console.log('Stopping listening...');
    try {
      await Voice.stop();
      isListeningRef.current = false;
      currentHeadingRef.current = null;
      setIsListening(false);
      setCurrentHeading(null);
    } catch (error) {
      console.error('Error stopping voice recognition: ', error);
      // Alert.alert('Error', 'Unable to stop voice recognition');
    }
  };

  const startListening = async (heading) => {
    
    if (isListeningRef.current) {
      // console.log('Already listening. Ignoring startListening call...');
      dispatch(showMessage('Already listening'));
      return;
    }

    try {
      console.log('Starting --->> ', heading);
      await Voice.start('en-US');
      currentHeadingRef.current = heading;
      setCurrentHeading(heading);
      isListeningRef.current = true;
      setIsListening(true);
      dispatch(saveHeading(heading)); 
    } catch (error) {
      // console.error('Error starting voice recognition: ', error);
      Alert.alert('Error', 'Unable to start voice recognition');
    } 
  };

  // Handle changes to the comments manually via TextInput
  const handleCommentChange = (key, value) => {
    // console.log('key: ', key);
    setComments((prevComments) => ({
      ...prevComments,
      [key]: value,
    }));
  };

  // Handle text selection for additional functionality (optional)
  const handleTextSelection = (heading, text) => {
    setSelectedTexts((prevSelectedTexts) => {
      const currentSelection = prevSelectedTexts[heading] || [];
      const isSelected = currentSelection.includes(text);

      return {
        ...prevSelectedTexts,
        [heading]: isSelected
          ? currentSelection.filter((t) => t !== text) // Remove if already selected
          : [...currentSelection, text], // Add if not already selected
      };
    });
  };
 

  return (
    <Pressable style={styles.section}>
      <Text style={styles.sectionTitle}>{data?.title}</Text>
      <View style={styles.optionsContainer}>
        {data?.headings.map((headingItem, i) => (
          <View key={i} style={styles.optionGroup}>
            <Text style={styles.optionText}>{headingItem?.heading}</Text>

            <View style={styles.contentContainer}>
              {headingItem?.content && headingItem?.content !== 'InputText' ? (
                <>
                  {Object.values(headingItem?.content).map((value, index) => (
                    <View key={index} style={styles.contentWrapper}>
                      <TouchableOpacity
                        style={[
                          styles.content,
                          selectedTexts[headingItem.heading]?.includes(value) ? styles.selectedContent : null,
                        ]}
                        onPress={() => handleTextSelection(headingItem.heading, value)}
                      >
                        <Text style={styles.contentText}>{value}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              ) : (
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Type your comments here"
                    placeholderTextColor="#999"
                    value={comments[headingItem.heading] || ''} 
                    onChangeText={(val) => handleCommentChange(headingItem.heading, val)} // Update comment with manual text input
                  />
                  <TouchableOpacity
                    onPress={() =>
                      isListening && currentHeading === headingItem.heading
                        ? stopListening()
                        : 
                          startListening(headingItem.heading)
                    }
                    style={styles.microphone}
                  >
                    <Icon
                      name={isListening && currentHeading === headingItem.heading ? 'microphone' : 'microphone-slash'} size={20} color="white"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default Section
// export default React.memo(Section, (prevProps, nextProps) => {
//   return (
//     prevProps.data === nextProps.data &&
//     prevProps.selectedTexts === nextProps.selectedTexts &&
//     prevProps.setSelectedTexts === nextProps.setSelectedTexts
//   );
// });

