import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  FlatList,
  Alert,
  NativeModules,
  Platform,
  TouchableOpacity,
  Modal,
  BackHandler,
} from 'react-native';
import PageLayout from '../../layouts/page-layout/page-layout';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { getWorkFlow } from '../../store/workFlow/workFlowAction';
import { hp } from '../../utils/constants';
import CategoryAndItems from '../../components/app-items/app-item';
import { filterData } from '../../store/dashboard/dashboardActions';
import { useNavigation } from '@react-navigation/native';
import LinkButton from '../../components/linkbutton'; 
import Icon  from 'react-native-vector-icons/AntDesign';
import ImageModalWithZoom from '../../components/image-zoom.tsx';

const { ScreenCapturePrevent } = NativeModules;

const WorkFlow: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation(); // Use navigation for stack-based navigation
  const user = useAppSelector((state) => state.userSlice);
  const hashtags = useAppSelector((state) => state.workFlowSlice?.hashtags);
  const workFlow = useAppSelector((state) => state.dashboardSlice?.videos);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getWorkFlow());

    // Prevent screen recording
    if (Platform.OS === 'ios' && ScreenCapturePrevent) {
      ScreenCapturePrevent.startPreventing();
    } else if (Platform.OS === 'android') {
      NativeModules?.PreventScreenRecordingModule?.enableSecureFlag();
    }

    // Handle Android Back Button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      if (Platform.OS === 'ios' && ScreenCapturePrevent) {
        ScreenCapturePrevent.stopPreventing();
      }
      backHandler.remove(); // Clean up back handler
    };
  }, [dispatch, isModalVisible]);

  const handleBackPress = () => {
    if (isModalVisible) {
      // If modal is open, close it instead of exiting the app
      closeModal();
      return true; // Prevent default back behavior
    }
    return false; // Allow default back behavior if modal is not open
  };

  const onSelect = (val: any) => {
    dispatch(filterData({ contentType: 'workFlows', nameOfHashtag: val }));
  };

  const handleImagePress = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const WorkFlowCard = ({ item }: { item: any }) => (
    <Pressable style={styles.itemsContainer}>
      <TouchableOpacity onPress={() => handleImagePress(item?.thumbnailUrl)}>
        <Image source={{ uri: item?.thumbnailUrl }} style={styles.image} />
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <>
      {user.privilege < 2 && <LinkButton />}
      <PageLayout
        containerStyles={styles.container}
        flatList={{
          data: workFlow,
          listHeaderComponent: (
            <React.Fragment key={'list-header-components-fragment'}>
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Work Flow</Text>
              </View>
              <View
                style={{
                  height: hp(5),
                  marginVertical: 5,
                  alignSelf: 'flex-start',
                  paddingLeft: 5,
                }}
              >
                {hashtags.data && (
                  <CategoryAndItems
                    categories={hashtags?.data?.hashtags}
                    itemsData={hashtags?.data?.hashtags}
                    onSelect={onSelect}
                  />
                )}
              </View>
            </React.Fragment>
          ),
          renderItem: ({ item }) => <WorkFlowCard item={item} />,
          numColumns: 1,
        }}
      />

      {/* Full-Screen Image Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
      <ImageModalWithZoom selectedImage={selectedImage} closeModal={closeModal} />
        {/* <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}> 
            <Icon name={'close'}  size={20} color="white" />
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
          )}
        </View> */}
      </Modal>
    </>
  );
};

export default WorkFlow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:hp(7)
  },
  headerContainer: {
    paddingVertical: 22,
    paddingLeft: 33,
  },
  title: {
    color: 'white',
    fontSize: 25,
  },
  itemsContainer: {
    margin: 5,
  },
  image: {
    width: '100%',
    height: hp(25),
    resizeMode: 'stretch',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain', // Ensure the image maintains aspect ratio
  },
  closeButton: {
    position: 'absolute',
    top: hp(20),
    right: 20,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
