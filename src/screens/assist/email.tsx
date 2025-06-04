import React, { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native';
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import PageLayout from '../../layouts/page-layout/page-layout';
import { hp, wp } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showMessage } from '../../store/common';
import Video from 'react-native-video';
import { backgroundImg } from '../../data/static-assets';
import AppHeader from '../../components/app-header/app-header';
import AppHeaderOne from '../../components/app-header/app-header-2';
import { getEmailTemp, storeEmailTemp } from '../../store/emailTemplete/emailTempAction.';
import MultiSelectDropdown from '../../components/app-dropdown/app-multi-dropdown';
import { useForm, Controller } from 'react-hook-form';
import { useIsFocused } from '@react-navigation/native';

const EmailScreen = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.common.loading);
  const allTemplates = useAppSelector((state) => state.emailTempSlice?.data);
  // console.log('allTemplates: ', allTemplates);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState(false);
  const [formData, setFormData] = useState({
    dentistName: '',
    patientName: '',
    subject: '',
    practiceEmail: '',
    patientEmail: '',
    dentistEmail: '',
  });
  const [cameraReady, setCameraReady] = useState(false);
  const [recordedPath, setRecordedPath] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  // console.log('videoUri: ', videoUri);
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  // console.log('selectedTemplate: ', selectedTemplate.length);
  const devices = useCameraDevices();
  const cameraRef = useRef(null);
  const device = useCameraDevice('front');
  // console.log('device: ', device);

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getEmailTemp());
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setVideoUri(null);
      setIsRecording(false);
    }
  }, [isFocused]);

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraStatus = await Camera.requestCameraPermission();
      const microphoneStatus = await Camera.requestMicrophonePermission();

      setCameraPermission(cameraStatus === 'authorized');
      setMicrophonePermission(microphoneStatus === 'authorized');
    };

    requestPermissions();
    //  cameraRef?.current?.stopRecording();
  }, []);

  const { control, handleSubmit, formState: { errors } } = useForm();




  const startRecording = async () => {
    // console.log('startRecording: ',cameraRef.current);
    // if (isRecording || !cameraRef.current) return;
    setVideoUri(null)
    setIsRecording(true);
    if (cameraRef.current) {
      dispatch(showMessage('Starting Reecordig '))
      try {
        const video = await cameraRef.current.startRecording({
          filePath: '/storage/emulated/0/DCIM/Camera/my_video.mp4', // Specify the file path
          onRecordingFinished: (video) => {
            // console.log('Recording finished:', video);
            setIsRecording(false);
            setVideoUri(video.path); // Store the video URI for preview
            dispatch(showMessage('Reecordig End'))
          },
          onRecordingError: (error) => {
            // console.error('Recording error:', error);
            Alert.alert('Recording Error', `Error: ${error.message}`);
            setIsRecording(false);
          },
        });
      } catch (error) {
        console.error('Error during recording:', error);
        Alert.alert('Recording Error', `Error: ${error.message}`);
        setIsRecording(false);
      }
    } else {
      dispatch(showMessage('Press Again to continue'))
    }
  };
  const stopRecording = async () => {
    console.log('==');
    // const data =  await cameraRef.current.stopRecording();
    // console.log('data: ', data);
    // setIsRecording(false); 

    try {
      if (cameraRef.current && isRecording) {
        console.log("Stopping recording...");
        const data = await cameraRef.current.stopRecording();
        console.log("Recording stopped successfully:", data);
        setIsRecording(false);
        setVideoUri(data?.path);
      } else {
        console.warn("Cannot stop recording. Camera not initialized or no recording in progress.");
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
      Alert.alert("Error", "An error occurred while stopping the recording.");
    }
  };



  const onSubmit = async (formData) => {
    // console.log('Form Data:', formData);
    // console.log('Selected Template:', selectedTemplate);

    const data = new FormData();
    data.append('dentistName', formData.dentistName);
    data.append('dentistEmail', formData.dentistEmail);
    data.append('patientName', formData.patientName);
    data.append('patientEmail', formData.patientEmail);
    data.append('practiceEmail', formData.practiceEmail);
    data.append('subject', formData.subject);

    data.append('emailContent', selectedTemplate);
    data.append('videoLink', videoUri);

    try {
      const res = await dispatch(storeEmailTemp(data)).unwrap();
      console.log('Email sent successfully:', res);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };


  return (
    <ImageBackground source={backgroundImg} style={{ flex: 1, }}>
      <View style={{ flex: 1 }}>
        <AppHeader headerTitle={'headerTitle'} isBack={true} containerSty={{ height: hp(16) }} />
        <ScrollView contentContainerStyle={{}} bounces={false}>
          <Pressable style={styles.container}>

            <View>
              <View style={styles.row}>
                <View>
                  {['dentistName', 'patientName', 'subject'].map((field, index) => (
                    <React.Fragment key={index}>
                      <Controller
                        control={control}
                        name={field}
                        rules={{ required: `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required` }}
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                            placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            placeholderTextColor="#656565"
                          />
                        )}
                      />
                      {errors[field] && <Text style={styles.error}>{errors[field].message}</Text>}
                    </React.Fragment>
                  ))}
                </View>
                <View>
                  {['dentistEmail', 'patientEmail', 'practiceEmail'].map((field, index) => (
                    <React.Fragment key={index}>
                      <Controller
                        control={control}
                        name={field}
                        rules={{
                          required: `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`,
                          pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
                        }}
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                            placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            placeholderTextColor="#656565"
                          />
                        )}
                      />
                      {errors[field] && <Text style={styles.error}>{errors[field].message}</Text>}
                    </React.Fragment>
                  ))}
                </View>
              </View>
            </View>
            <View style={{ height: hp(35), backgroundColor: '#102335', marginHorizontal: 20, marginBottom: 10 }}>
              {
                videoUri ?
                  <>
                    <Video source={{ uri: videoUri }} style={styles.video} controls resizeMode='contain' />
                    <TouchableOpacity onPress={() => setVideoUri(null)}
                    // style={styles.button}
                    >
                      <Text style={styles.buttonText}>Record Again</Text>
                    </TouchableOpacity>
                  </>
                  :
                  <View>
                    {
                      isRecording &&
                      <View style={{ height: '100%', width: '90%', alignSelf: 'center' }}>
                        <Camera
                          ref={cameraRef}
                          style={styles.camera}
                          // {...props}
                          isActive={true}
                          device={device}
                          video
                          audio
                          preview
                        />
                      </View>
                    }
                  </View>
              }
            </View>




            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.recordButton}
                onPress={startRecording}
              // disabled={isRecording || !cameraReady}
              >
                <Text style={styles.buttonText}>Start Recording</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.stopButton}
                onPress={stopRecording}
              // disabled={!isRecording}
              >
                <Text style={styles.buttonText}>Stop Recording</Text>
              </TouchableOpacity>
            </View>
            {recordedPath ? (
              <Text style={styles.recordedPathText}>Video saved at: {recordedPath}</Text>
            ) : null}

            <MultiSelectDropdown
              options={allTemplates?.emailTemplates}
              onChange={(val) => {
                setSelectedTemplate(val);
              }}

              dropdownName={'Select Procedure options'}
            />

            <Text style={styles.note}>
              Note: Please read the chosen template(s) carefully and ensure the price is added or deleted before sending.
            </Text>
            <View style={styles.textArea}>
              {selectedTemplate?.map((template, index) => {
                // console.log('template: ', template?.procedureTreatment);
                return (
                  <View key={index} style={[styles.textArea,{marginHorizontal:0}]}>
                    <TextInput
                      style={styles.introduction}
                      multiline={true}
                      placeholder="Introduction"
                      placeholderTextColor="#ffffff"
                      value={template?.introduction}
                      onChangeText={(text) => {
                        setSelectedTemplate(prevTemplates =>
                          prevTemplates.map(t =>
                            t.id === template.id ? { ...t, introduction: text } : t
                          )
                        );
                      }}
                    />
                    <Text style={styles.sectionTitle}>Advantages:</Text>
                    <TextInput
                      style={styles.listItem}
                      multiline={true}
                      placeholder="Pros"
                      placeholderTextColor="#ffffff"
                      value={template?.pros}
                      onChangeText={(text) => {
                        setSelectedTemplate(prevTemplates =>
                          prevTemplates.map(t =>
                            t?.id === template?.id ? { ...t, pros: text } : t
                          )
                        );
                      }}
                    />
                    <Text style={styles.sectionTitle}>Disadvantages:</Text>
                    <TextInput
                      style={styles.listItem}
                      multiline={true}
                      placeholder="Cons"
                      placeholderTextColor="#ffffff"
                      value={template?.cons}
                      onChangeText={(text) => {
                        setSelectedTemplate(prevTemplates =>
                          prevTemplates?.map(t =>
                            t?.id === template.id ? { ...t, cons: text } : t
                          )
                        );
                      }}
                    />
                  </View>
                )
              })}
            </View>
            <View style={styles.sendButtonContainer}>
              {loading ?
                <TouchableOpacity style={styles.sendButton}>
                  <Text style={styles.buttonText}>Loading</Text>
                </TouchableOpacity>
                : <TouchableOpacity style={styles.sendButton} onPress={handleSubmit(onSubmit)}>
                  <Text style={styles.buttonText}>Send Email</Text>
                </TouchableOpacity>}
            </View>

          </Pressable>
        </ScrollView>

      </View>
    </ImageBackground>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    color: 'red',
    bottom: 5
  },
  row: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  btnRow: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  camera: {
    // flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#102335',
    paddingVertical: 11,
    paddingRight: '18%',
    paddingLeft: 11,
    borderRadius: 5,
    marginBottom: 10,
    color: 'white',
    borderWidth: 0.5,
    borderColor: '#656565',
    width: wp(45)
  },
  textArea: {
    backgroundColor: '#1e2b3b',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 20
  },
  introduction: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  listItem: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
  },
  textAreaInput: {
    color: '#656565',
    marginLeft: 11,
    marginTop: 8,
  },
  recordButton: {
    backgroundColor: '#83785D',
    borderRadius: 5,
  },
  stopButton: {
    backgroundColor: '#162D42',
    borderRadius: 5,
    borderColor: '#656565',
    borderWidth: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    paddingVertical: 11,
    paddingHorizontal: '9%',
  },
  selectProcedure: {
    marginTop: '2%',
    backgroundColor: '#102335',
    height: '10%',
    marginHorizontal: '5%',
    borderRadius: 5,
    borderColor: '#656565',
    borderWidth: 0.5,
  },
  selectProcedureText: {
    color: '#656565',
    marginLeft: 11,
    marginTop: 8,
    // paddingVertical:hp(5)
  },
  note: {
    color: 'white',
    marginLeft: 18,
    marginTop: 8,
    marginHorizontal: '5%',
  },
  sendButtonContainer: {
    marginTop: '3%',
    paddingBottom: '25%',
    width: '40%',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#D9AA59',
    borderRadius: 5,
    borderColor: '#1e1c1c',
    borderWidth: 0.5,
  },
  recordedPathText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },


  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  // button: {
  //     width: '44%',
  //     alignItems: 'center',
  //     backgroundColor: 'gray',
  //     padding: 10,
  // },
  // buttonText: {
  //     color: '#fff',
  // },
});

export default EmailScreen;


