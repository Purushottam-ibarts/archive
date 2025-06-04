import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Button, ActivityIndicator, Pressable } from 'react-native';
import Video from 'react-native-video';
import { useAppDispatch } from '../../store/hooks.tsx';
import { storeSurveyForm, storeWatchTime, updateWatchTime } from '../../store/assignVideos/assignVideosAction'; 
import { Controller, useForm } from 'react-hook-form';
import { hp, wp } from '../../utils/constants';
import AppIcon from '../app-icon/app-icon';
import { IconNames } from '../app-icon/app-icon.data';

const VideoCard: React.FC<{ data: any, isSelected?: boolean, onSelect?: () => void, isAssignMode?: boolean }> = ({ data, isSelected, onSelect, isAssignMode }) => {
  // console.log('data: ', data);
  // console.log('data:---', data);
  const dispatch = useAppDispatch();
  const [isPaused, setPaused] = useState(true);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [surveyModalVisible, setSurveyModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const durationInSeconds = data?.duration?.split(':').reduce((acc: any, time: any) => (60 * acc) + +time, 0);

  const togglePlayPause = () => {
    console.log('togglePlayPause: ');
    setPaused(!isPaused);
  };

  const openVideoModal = () => {
    setVideoModalVisible(true);
    setPaused(false); // Start playing when modal opens
  };

  const closeVideoModal = async () => {
    // const res = await dispatch(updateWatchTime({
    //   video_id:data.id,
    //   video_type:'video', 
    //   watched_time:Math.floor(currentTime),
    // })).unwrap();
    // console.log('updateWatchTime res: ----->>>', res);

    setVideoModalVisible(false);
    setPaused(true); // Pause when modal closes
  };

  const onProgress = async (val) => {

    // console.log('durationInSeconds: ', durationInSeconds);
    // console.log('currentTime: ', Math.floor(val.currentTime));

    // if ((currentTime / durationInSeconds) * 100 >= 100) 

    setCurrentTime(val.currentTime);
    if (Math.floor(val?.currentTime) == durationInSeconds) {
      const res = await dispatch(storeWatchTime({
        video_id: data.id,
        video_type: 'video',
        total_length: data?.duration,
        watched_time: Math.floor(val?.playableDuration),
      })).unwrap();
      // console.log('res: ', res);
      if (res?.status) {
        setVideoModalVisible(false);
        setSurveyModalVisible(true);
      }
    }
  };

  const onLoadStart = () => {
    setLoading(true);
  };

  const onLoad = () => {
    setLoading(false);
  };
 
  const watchPercentage = (currentTime / durationInSeconds) * 100;
  // console.log('watchPercentage: ', Math.floor(currentTime));

  const handleSurveySubmit = (data) => {
    // console.log('Survey Answers: ', data);
    const formData = new FormData();
    formData.append('question1', data.question1);
    formData.append('question2', data.question2);
    formData.append('question3', data.question3);
    dispatch(storeSurveyForm(formData))
    setSurveyModalVisible(false);
    // reset();
  };

  return (
    <Pressable style={[styles.container, isSelected && styles.selectedContainer]}>
      <TouchableOpacity style={styles.itemsContainer} onPress={openVideoModal}>
        <View>
          <Image source={{ uri: data?.thumbnail || data?.thumbnailUrl }} style={styles.image} />
          {isAssignMode && (
            <TouchableOpacity style={isSelected ? styles.selectedIndicator : styles.selectionIndicator}
              onPress={onSelect}>
              <Text style={[styles.selectionText, { color: isSelected ? '#000' : '#fff' }]}>✔</Text>
            </TouchableOpacity>
          )}
        </View>
      {!isNaN(watchPercentage) && (
        <View style={styles.watchTimeContainer}>
          <Text style={styles.watchTimeText}>Watch Time: {watchPercentage.toFixed(2)}%</Text>
          <AppIcon icon={IconNames.VIDEO_PLAY} size={20} />
        </View>
      )}
      </TouchableOpacity>
      {/* {isNaN(watchPercentage) ? '' : <Text>Watch Time: {watchPercentage.toFixed(2)}%</Text>} */}
      
      <Modal
        animationType="slide"
        transparent={false}
        visible={videoModalVisible}
        onRequestClose={closeVideoModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeVideoModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          {loading && (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '55%' }}>
              <ActivityIndicator size="large" color="#2a5b88" />
            </View>
          )}
          {data?.url ? (
            <Video
              source={{ uri: data?.url }}
              style={styles.video}
              paused={isPaused}
              resizeMode="contain"
              onProgress={onProgress}
              onLoadStart={onLoadStart}
              onLoad={onLoad}
              onFullscreenPlayerWillPresent={() => {
                setPaused(false)
                console.log('-<>><><>----');
              }
              }
              onFullscreenPlayerWillDismiss={() => {
                // setPaused(true)
                console.log('-----');
              }}
              controls={true}
            />
          ) : (
            <Text>No video available</Text>
          )}
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={surveyModalVisible}
        onRequestClose={() => setSurveyModalVisible(false)}
      >
        <View style={styles.surveyContainer}>
          <View style={styles.surveyContent}>
            <Text style={styles.surveyQuestion}>How will this video help your clinical and non-clinical skills?</Text>
            <Controller
              control={control}
              name="question1"
              defaultValue=""
              rules={{ required: 'This field is required.' }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    style={styles.surveyInput}
                    placeholder="Type your answer here..."
                    placeholderTextColor='#999'
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.question1 && <Text style={styles.errorText}>{errors.question1.message}</Text>}
                </>
              )}
            />
            <Text style={styles.surveyQuestion}>What is the main point you have learnt?</Text>
            <Controller
              control={control}
              name="question2"
              defaultValue=""
              rules={{ required: 'This field is required.' }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    style={styles.surveyInput}
                    placeholder="Type your answer here..."
                    placeholderTextColor='#999'
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.question2 && <Text style={styles.errorText}>{errors.question2.message}</Text>}
                </>
              )}
            />
            <Text style={styles.surveyQuestion}>In what way will you change or improve your workflow?</Text>
            <Controller
              control={control}
              name="question3"
              defaultValue=""
              rules={{ required: 'This field is required.' }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    style={styles.surveyInput}
                    placeholder="Type your answer here..."
                    placeholderTextColor='#999'
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.question3 && <Text style={styles.errorText}>{errors.question3.message}</Text>}
                </>
              )}
            />
            <TouchableOpacity onPress={handleSubmit(handleSurveySubmit)} style={{ alignItems: 'center', borderRadius: 8 }}>
              <Text style={[styles.surveyQuestion, { backgroundColor: '#D9AA59', padding: 11 }]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    // backgroundColor:'#fff',
    // alignItems: 'center',
    margin: 11,
    marginBottom:hp(3)
  },
  // selectedContainer: {
  //   borderColor: '#D9AA59',
  //   borderWidth: 2,
  // },
  itemsContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    marginBottom: 10,
    // position: 'relative',
  },
  image: {
    // width: 175,
    // height: 125,
    height: hp(14.5),
    // height: '50%',
    width: wp(45),
    // padding: 10,
    borderRadius: 10,
    // resizeMode: 'stretch',
    resizeMode: 'contain',
    // resizeMode: 'cover',
    backgroundColor: '#102335',
  },
  watchTimeContainer: {
    position: 'absolute',
    zIndex:-1,
    bottom: hp(-4),
    height:hp(6),
    width: wp(45),
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems: 'center', 
    backgroundColor: '#102335',  
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    paddingTop:hp(2),
    // paddingVertical: 8,  
  },
  watchTimeText: {
    color: '#fff', // White text color
    fontSize: 11, // Adjust the font size as needed

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: 300,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },
  selectionIndicator: {
    position: 'absolute',
    top: wp(0),
    right: wp(0),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: wp(0),
    right: wp(0),
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionText: {
    color: 'white',
    fontSize: 18,
  },
  selectButton: {
    color: '#D9AA59',
    marginTop: 5,
  },

  surveyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  surveyContent: {
    backgroundColor: '#2F4A64',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  surveyQuestion: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  surveyInput: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#142230',
    color: 'white',

  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
  }, 
});

export default VideoCard;


