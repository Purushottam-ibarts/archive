import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal, FlatList, TextInput, Platform, Pressable } from 'react-native';
import PageLayout from '../../layouts/page-layout/page-layout';
import VideoCard from '../../components/app-cards/video-card';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { fetchDashboardData, filterData } from '../../store/dashboard/dashboardActions';
import DateTimePicker from '@react-native-community/datetimepicker';
import CategoryAndItems from '../../components/app-items/app-item';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import LinkButton from '../../components/linkbutton';

const Videos: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const videos = useAppSelector(state => state.dashboardSlice?.videos || []);
  // console.log('videos: ', videos);
  const hashtags = useAppSelector(state => state.dashboardSlice?.hashtags || []);
  const user = useAppSelector((state) => state.userSlice);
  // console.log('hashtags: ', hashtags);
  const [data, setData] = useState(1);
  const [isAssignMode, setIsAssignMode] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  // console.log('selectedVideos: ', selectedVideos.length);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(fetchDashboardData({ page: data }));
        // console.log('Videos screen is unfocused');
      };
    }, [])
  );


  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setSelectedDate(currentDate.toLocaleDateString());
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(Platform.OS === 'ios');
    setDate(currentTime);
    setSelectedTime(currentTime.toLocaleTimeString());
  };

  useEffect(() => {
    setData(1);
  }, []);

  useEffect(() => {
    dispatch(fetchDashboardData({ page: data }));
  }, [data]);

  const handleEndReached = () => {
    setData(data + 1);
  };

  const handleAssign = () => {
    setIsAssignMode(!isAssignMode);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideos(prevSelected => {
      if (prevSelected.includes(video)) {
        return prevSelected.filter(v => v !== video);
      } else {
        return [...prevSelected, video];
      }
    });
  };

  const handleAssignNow = () => {
    setIsModalVisible(true);
  };

  const renderItem = ({ item }) => {
    // console.log('item: ', item);
    return (
      <VideoCard
        data={item}
        isSelected={selectedVideos.includes(item)}
        onSelect={() => handleVideoSelect(item)}
        isAssignMode={isAssignMode}
      />
    )
  };

  const onSelect = (val: any) => {
    // console.log('val: ', val);
    dispatch(filterData({ contentType: 'reels', nameOfHashtag: val }))
    // console.log('val: ', val);
  }
  return (
    <View style={styles.container}>
      {
        user.privilege < 2 &&
        <LinkButton />
      }
      <PageLayout
        // containerStyles={styles.container}
        flatList={{
          data: videos,
          listHeaderComponent: (
            <>
              <View style={{ backgroundColor: '#102335', paddingVertical: 5 }}>
                <CategoryAndItems categories={hashtags} itemsData={hashtags} onSelect={onSelect} />
              </View>
              <View style={styles.header}>
                <TouchableOpacity style={styles.assignButton} onPress={handleAssign}>
                  <Text style={styles.assignButtonText}>Assign</Text>
                </TouchableOpacity>
                {
                  selectedVideos.length > 0 ?
                    <TouchableOpacity style={styles.assignNowButton} onPress={handleAssignNow}>
                      <Text style={styles.assignNowButtonText}>Assign Now</Text>
                    </TouchableOpacity>
                    : null
                }
                {/* {isAssignMode && (
                <TouchableOpacity style={styles.assignNowButton} onPress={handleAssignNow}>
                  <Text style={styles.assignNowButtonText}>Assign Now</Text>
                </TouchableOpacity>
              )} */}
              </View>
            </>
          ),
          numColumns: 2,
          renderItem: renderItem,
          onEndReached: handleEndReached,
          keyExtractor: (item) => item?.id?.toString(), // Use the unique identifier for keys
        }}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalSectionTitle}>Select Video</Text>
            <View style={styles.selectedContainer}>
              <FlatList
                data={selectedVideos}
                renderItem={({ item }) => <VideoCard data={item} isSelected={true} onSelect={() => { }} isAssignMode={isAssignMode} />}
                keyExtractor={(item) => item?.id?.toString()}
                numColumns={2}
                contentContainerStyle={styles.flatListContent}
              />
            </View>
            <Text style={styles.modalSectionTitle}>Assign To</Text>
            <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor="#999" />
            <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor="#999" />
            <Text style={styles.modalSectionTitle}>Deadline</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              {/* <TextInput
                value={selectedDate}
                placeholder="Select Date"
                placeholderTextColor="#999"
                editable={false}
                style={{color:'white'}}
              /> */}
              <Text style={{ color: '#999' }}>Select Date</Text>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  themeVariant='dark'
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
              {/* <TextInput
                value={selectedTime}
                placeholder="Select Time"
                placeholderTextColor="#999"
                editable={false}
                style={{color:'white'}}
              /> */}
              <Text style={{ color: '#999' }}>Select Time</Text>
              {showTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  display='clock'
                  onChange={handleTimeChange}
                  themeVariant='dark'
                />
              )}
            </TouchableOpacity>
            {/* {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
                themeVariant='dark'
              />
            )} */}
            {/* {showTimePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="time"
                display="default"
                onChange={handleTimeChange}
                themeVariant='dark'
              />
            )} */}

            <TouchableOpacity style={styles.assignNowButtonModal} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.assignNowButtonTextModal}>Assign Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // paddingBottom: 22,
  },
  selectedContainer: {
    maxHeight: 250,
    width: '100%',
    marginBottom: 25,
    // backgroundColor:'red',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#102335',
  },
  assignButton: {
    backgroundColor: '#1c3a57',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#102335',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#B79150',
    borderWidth: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: '#102335',
    padding: 10,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  modalSectionTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#081726',
    borderRadius: 8,
    padding: 10,
    color: 'white',
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  assignNowButtonModal: {
    backgroundColor: '#D9AA59',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  assignNowButtonTextModal: {
    color: 'white',
    fontSize: 16,
  },
  flatListContent: {
    paddingBottom: 10,
    width: '100%',
    marginHorizontal: 11
  },
  assignNowButton: {
    backgroundColor: '#D9AA59',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  assignNowButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
