import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hp } from '../utils/constants';

const ImageModalWithZoom = ({ selectedImage, closeModal }: { selectedImage: string; closeModal: () => void }) => {
  const scale = useRef(new Animated.Value(1)).current;

  // Debugging selectedImage
//   console.log('Selected Image URL: ', selectedImage);

  const onPinchGestureEvent = Animated.event([{ nativeEvent: { scale } }], {
    useNativeDriver: true,
  });

  const onPinchHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Icon name={'close'} size={30} color="white" />
      </TouchableOpacity>
      {selectedImage ? (
        <PinchGestureHandler
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}
        >
          <Animated.View style={styles.imageContainer}>
            <Animated.Image
              source={{ uri: selectedImage }}
              style={[styles.fullScreenImage, { transform: [{ scale }] }]}
              resizeMode="contain"
            />
          </Animated.View>
        </PinchGestureHandler>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ImageModalWithZoom;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: hp(20),
    right: 20,
    zIndex: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"red",
    width: '100%',
    height: '100%',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    // backgroundColor:"red"
  },
});
