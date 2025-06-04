import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, Pressable, Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { getStudentsNotes, saveStudentsNotes } from '../../store/students/studentsActions';

const StudentsCard: React.FC<{ data: any, isSelected?: boolean,}>  = ({ data, isSelected,}) => {
  // console.log('data: ', data);
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const noteCotent:any = useAppSelector(state => state.studentSlice?.noteCotent);  
  // console.log('noteCotent:>>>> ', noteCotent);
  const [note, setNote] = useState(noteCotent || '');

  useEffect(() => { 
    if (noteCotent) {
      setNote(noteCotent);
    }
  }, [noteCotent]);
  // const res = await dispatch(getSingleNotesTemp(data.id)).unwrap();
  
  const openModal = (imageUrl) => {
    // console.log('imageUrl: ===============');
    setSelectedImageUrl(imageUrl);
    setModalVisible(true);
    dispatch(getStudentsNotes({ noteId:data.id}));
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveNote =async() => {
  // console.log('data:--->> ', data.id);

    // console.log('Saved note:', note);
    data.note = note;
    const formData = new FormData();
    formData.append('noteId', data.id);
    formData.append('noteContent', note); 
    const res = await dispatch(saveStudentsNotes(formData)).unwrap()
    // console.log('res: ', res);
    if(res.success){
      closeModal();
    }
  };

  return (
    <View style={[styles.container, isSelected && styles.selectedContainer]}>
      <Pressable style={styles.itemsContainer} 
      // onPress={() => { openModal(data?.thumbnailUrl) }}
      >
        <TouchableOpacity style={styles.itemsContainer}>
          <Image source={{ uri: data?.thumbnailUrl }} style={styles.image} />
        </TouchableOpacity> 
        <Icon name="edit" size={20} color="#000" style={styles.editIcon} onPress={() => { openModal(data?.thumbnailUrl)}}/>
      </Pressable>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
         {/* <KeyboardAvoidingView> */}
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <Image source={{ uri: selectedImageUrl }} style={styles.modalImage} />
            <TextInput
              style={styles.noteInput}
              placeholder="Write your note here..."
              value={ note}
              onChangeText={setNote}
              multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
              <Text style={styles.saveButtonText}>Save Note</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        {/* </KeyboardAvoidingView> */}
      </Modal>
      </ScrollView>
    </View>
  );
};

export default StudentsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // margin: 11,
  },
  itemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 4,
    // marginHorizontal: 10,
  },
  selectedContainer: {
    // borderWidth: 2,
    // borderColor: '#2a5b88',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  image: {
    height: 145,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    resizeMode:'stretch',
  },
  editIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height:'85%',
    backgroundColor: '#FCF8C7',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    color: 'red',
  },
  modalImage: {
    width: '100%',
    // height: '50%',
    height: 355,
    marginBottom: 10,
    borderRadius: 10,
  },
  noteInput: {
    backgroundColor: '#FCF8C7',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    height: 250,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#D9AA59',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
