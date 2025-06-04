import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import AppIcon from '../../components/app-icon/app-icon';
import { IconNames } from '../../components/app-icon/app-icon.data';
import PageLayout from '../../layouts/page-layout/page-layout';
import Voice from '@react-native-voice/voice';
import Clipboard from '@react-native-clipboard/clipboard';
import { useAppDispatch } from '../../store/hooks.tsx';
import { storeSpeechRecord } from '../../store/speechToText/speechToTextAction';
import MicIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

const SpeechScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [transcriptText, setTranscriptText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const voiceRef = useRef({
    start: () => Voice.start('en-US'),
    stop: () => Voice.stop(),
    destroy: () => Voice.destroy(),
    removeListeners: () => Voice.removeAllListeners(),
  });

  useEffect(() => {
    const onSpeechStart = () => setIsListening(true);
    const onSpeechEnd = () => setIsListening(false);
    const onSpeechResults = (event: any) => setTranscript(event.value[0]);

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      voiceRef.current.destroy().then(voiceRef.current.removeListeners);
    };
  }, []);

  const toggleListening = () => { 
    if (isListening) {
      setIsListening(false);
      voiceRef.current.stop(); // Stop listening if already listening
    } else {
      setIsListening(true);
      voiceRef.current.start(); // Start listening if not currently listening
    }
  };
  

  const startListening = () => {
    voiceRef.current.start();
  };

  const stopListening = () => {
    voiceRef.current.stop();
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  const copyToClipboard = () => {
    Clipboard.setString(transcript);
    Alert.alert('Text copied to clipboard');
  };

  const speechData = async () => {
    const data = new FormData();
    data.append('data', transcript);
    const res = await dispatch(storeSpeechRecord(data)).unwrap();
    // console.log('res: ', res);
    if (res.status) {
      setTranscript('');
    }
  };

  return (
    <PageLayout
      isBack={true}
      containerStyles={styles.container}
      flatList={{
        data: [1],
        keyExtractor: (item: any, index) => `${item?.title}_${item?.id}_${index}`,
        renderItem: () => (
          <>
            <TouchableOpacity style={{ 
              marginLeft: '5%', 
              marginTop: '5%',
              padding:25,
              // margin:30,
              borderRadius:50,
              backgroundColor:'#d9a867',
              alignSelf: 'flex-start',
              alignItems: 'center',
              justifyContent: 'center'
           }}
            //  onPress={startListening}
             onPress={toggleListening}
             >
              {/* <AppIcon icon={IconNames.MIRCOPHONE} size={20} /> */}
              <View style={{ position: 'absolute',  }} >
                <Icon name={isListening ? 'microphone' : 'microphone-slash'} size={20} color="white" />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ marginLeft: '5%', marginTop: '5%' }} onPress={stopListening}>
              <Text style={{ color: 'white' }}>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: '5%', marginTop: '5%' }} onPress={resetTranscript}>
              <Text style={{ color: 'white' }}>Reset</Text>
            </TouchableOpacity> */}
            <View style={styles.transcriptContainer}>
              <TextInput
                style={styles.transcriptInput}
                multiline
                value={transcript}
                onChangeText={setTranscript}
                placeholder="Your transcribed text will appear here"
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={() => speechData()}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                <Text style={styles.buttonText}>Copy Text</Text>
              </TouchableOpacity>
            </View>
          </>
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transcriptContainer: {
    marginTop: '5%',
    backgroundColor: '#102335',
    height: '60%',
    marginHorizontal: '5%',
    borderRadius: 5,
    borderColor: 'orange',
    borderWidth: 0.5,
    padding: '5%',
  },
  transcriptInput: {
    color: 'white',
    flex: 1,
  },
  buttonContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  saveButton: {
    backgroundColor: '#102335',
    borderRadius: 5,
    borderWidth: 0.5,
    paddingVertical: 11,
    paddingHorizontal: 66,
  },
  copyButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
    borderColor: '#1e1c1c',
    borderWidth: 0.5,
    paddingVertical: 11,
    paddingHorizontal: 55,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default SpeechScreen;
