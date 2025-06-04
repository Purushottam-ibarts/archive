import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIcon from '../app-icon/app-icon';
import { IconNames } from '../app-icon/app-icon.data';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { getSaveTemplates, getSingleNotesTemp } from '../../store/notesTemplete/notesTempAction';

const TemplateCard = ({ data,selected}) => {
  // console.log('selected: ', selected);
  // console.log('data: ', data);
  const navigation = useNavigation();
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    // dispatch(getSingleNotesTemp({ page:data}));
  }, []);
  
  const drawerData = [
    {
      id: 1,
      title: 'Comprehensive Exam',
      icon: IconNames.COMPREHENSIVE_EXAM,
      navigation: 'templatesDetails',
    },
    {
      id: 2,
      title: 'Routine Exam',
      icon: IconNames.ROUTINE_EXAM,
      navigation: 'templatesDetails',
    },
    {
      id: 3,
      title: 'Filling Composite',
      icon: IconNames.FILLING_COMPOSITE,
      navigation: 'templatesDetails',
    },
    {
      id: 4,
      title: 'Child Exam',
      icon: IconNames.CHILD_EXAM,
      navigation: 'templatesDetails',
    },
    {
      id: 5,
      title: 'Treatment Options',
      icon: IconNames.TREATMENT_OPTIONS,
      navigation: 'templatesDetails',
    },
    {
      id: 6,
      title: 'Filling: amalgam or GIC',
      icon: IconNames.FILLING_COMPOSITE2,
      navigation: 'templatesDetails',
    },
    {
      id: 7,
      title: 'Emergency Appointment',
      icon: IconNames.EMERGENCY_APPOINTMENT,
      navigation: 'templatesDetails',
    },
    {
      id: 8,
      title: 'RCT 1',
      icon: IconNames.RCT_1,
      navigation: 'templatesDetails',
    },
    {
      id: 9,
      title: 'RCT 2',
      icon: IconNames.RCT_2,
      navigation: 'templatesDetails',
    },
    {
      id: 10,
      title: 'Dry Socket',
      icon: IconNames.DRY_SOCKET,
      navigation: 'templatesDetails',
    },
    {
      id: 11,
      title: 'Pericoronitis',
      icon: IconNames.PERICOROITIS,
      navigation: 'templatesDetails',
    },
    {
      id: 12,
      title: 'Crown Preparation',
      icon: IconNames.CROWN_PREPARATION,
      navigation: 'templatesDetails',
    },
    {
      id: 13,
      title: 'Crown / bridge fit',
      icon: IconNames.CROWN_BRIDGE_FIT,
      navigation: 'templatesDetails',
    },
  ];

  const matchingIcon = drawerData.find(item => {
    // console.log('item: ', item);
    if(selected){
     return item.title == data.templateName 
    }else{
      return item.title == data.title 
    }
  })?.icon; 
  const matchingNavigation = drawerData.find(item => { 
    if(selected){
      return item.title == data.templateName 
     }else{
       return item.title === data.title
     }
  })?.navigation; 

  const getTemplate=async()=>{ 
    // console.log('data: ', data);
    if(selected){
      const res = await dispatch(getSaveTemplates(data.id)).unwrap(); 
      if(res.status== 'success'){
        // console.log('>>>>>>>',data);
        navigation.navigate('savetemplatesDetails',{data})
      }
    }else{
      const res = await dispatch(getSingleNotesTemp(data.id)).unwrap(); 
      if(res.status== 'success'){
        // console.log('>>>>>>>',data);
        navigation.navigate(matchingNavigation,{data})
      }
    }

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={()=>{  getTemplate() }} >
        {matchingIcon && <AppIcon icon={matchingIcon} size={20} />}
        <View style={styles.itemsContainer}><Text style={styles.text}>{data?.title || data?.templateName}</Text></View>
      </TouchableOpacity>
    </View>
  );
};

export default TemplateCard;

const styles = StyleSheet.create({
  container: { 
    width: '45%',
    marginHorizontal: '2%',
  }, 
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 11,
    alignItems: 'center', 
  },
  text: {
    color: 'white',
    fontSize: 14,
  }, 
  item: {
    backgroundColor: '#2F4A64',
    borderRadius: 22,
    alignItems: 'center',
    paddingVertical: 22,
    marginBottom: 20,
    borderColor: '#D9AA59',
    borderTopWidth: 0.5,
  },
});

