import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Header from '../../components/sectionHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { getNotesTemp, getSaveTemp } from '../../store/notesTemplete/notesTempAction';
import { IconNames } from '../../components/app-icon/app-icon.data';
import PageLayout from '../../layouts/page-layout/page-layout';
import TemplateCard from '../../components/app-cards/template-card';
import LinkButton from '../../components/linkbutton.tsx';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const TemplateScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice);
  const allTemplates = useAppSelector((state) => state.notesTempSlice?.tempContent);
  // console.log('allTemplates: ', allTemplates);
  const saveTemplates = useAppSelector((state) => state.notesTempSlice?.saveTemplates);
  // console.log('saveTemplates:>>>> ', saveTemplates);
  // console.log('allTemplates:---> ', allTemplates);
  const [selectedButton, setSelectedButton] = useState('Select Template');
  useEffect(() => {
      dispatch(getNotesTemp());  
  }, []);
  useEffect(() => {
    // console.log('selectedButton',selectedButton); 
      dispatch(getSaveTemp());  
  }, [selectedButton]);
 

  return (
    <>
    { user.privilege < 2 && <LinkButton/> }
    <PageLayout
      isBack={true}
      containerStyles={styles.container}
      flatList={{
        data: selectedButton == 'Save' ? saveTemplates : allTemplates.allTemplates,
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === 'Select Template' ? [styles.selectedButton, styles.activeButton] : styles.unselectedButton
                ]}
                onPress={() => setSelectedButton('Select Template')}
              >
                <Text style={[ styles.buttonText, selectedButton === 'Select Template' ? styles.selectedText : styles.unselectedText
                ]}>Select Template</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === 'Save' ? [styles.selectedButton, styles.activeButton] : styles.unselectedButton
                ]}
                onPress={() => setSelectedButton('Save')}
              >
                <Text style={[
                  styles.buttonText,
                  selectedButton === 'Save' ? styles.selectedText : styles.unselectedText
                ]}>Save</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ),
        keyExtractor: (item: any, index) => `${index}`,
        renderItem: ({ item }) =>
          <TemplateCard data={item} selected={selectedButton == 'Save' ? true:false}/>,
        numColumns: 2,
      }}
    />
    </>
  );
};

export default TemplateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '10%',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 22,
    alignItems: 'center',
    flex: 1,
  },
  item: {
    width: '48%',
    backgroundColor: '#2F4A64',
    borderRadius: 22,
    alignItems: 'center',
    paddingVertical: 22,
    marginBottom: 20,
    borderColor: '#D9AA59',
    borderTopWidth: 0.5,

  },
  image: {
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
  selectTempButton: {
    backgroundColor: 'white',
  },
  button2: {
    backgroundColor: '#102335',
    paddingVertical: 15,
    paddingHorizontal: 55,
    borderRadius: 10,
  },
  templateButton: {
    marginRight: 'auto',
  },
  buttonText: {
    color: '#102335',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText2: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundimg: {
    flex: 1,
    height: '100%',
  },
  selectTextButton: {
    color: '#102335',
    fontSize: 15,
  },
  selectSaveButton: {
    color: 'white',
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#102335',
  },
  unselectedButton: {
    backgroundColor: 'white',
    borderColor: '#102335',
    borderWidth: 1,
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: '#102335',
  },
  activeButton: {
    zIndex: 2,
  },

});
