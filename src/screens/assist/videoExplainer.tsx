import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PageLayout from '../../layouts/page-layout/page-layout';
import VideoCard from '../../components/app-cards/video-card';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { fetchDashboardData } from '../../store/dashboard/dashboardActions';
import { getPatientVideo } from '../../store/patientVideo/patientVideoAction';
import CategoryAndItems from '../../components/app-items/app-item';

const VideosExplainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const patientVideosData:any = useAppSelector((state) => state.patientVideoSlice?.data);
  const hashtags:any = useAppSelector((state) => state.patientVideoSlice?.hashtags);
  // console.log('patientVideosData: ', patientVideosData);
  const [ data, setData] =useState(1) 
  useEffect(()=>{
    dispatch(getPatientVideo())
  },[])
  
  const handleEndReached = () => {
    // console.log('End reached'); 
    let val = data+1 
    setData(val)
  };
  const onSelect = (val: any) => { 
    // console.log('val: ', val);
  } 
  
  return (
    // <Text>Video explanee</Text>
    <PageLayout isBack={true} 
      containerStyles={styles.container}
      flatList={{
        data: patientVideosData,
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
            <View style={{backgroundColor: '#102335', paddingVertical:5}}>
            {/* <CategoryAndItems categories={hashtags} itemsData={hashtags} onSelect={onSelect} /> */}
            </View>
            <>
            <View style={{ backgroundColor: '#102335', marginBottom: 22 }}>
              <Text style={styles.text}> In this section we have created simulation videos of common procedures and issues you may want to use as visual aid to show your patients to help improve the patient experience and allow them to have a better understanding.</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray', marginHorizontal: 5, }} />
            </>
          </React.Fragment>
        ),
        // keyExtractor: (item:any, index) => item.id.tostring(),
        renderItem: ({ item }) => <VideoCard data={item} />,
        numColumns: 2,
        handleEndReached:()=>{
          handleEndReached()
        }
      }}
    />
  );
}

export default VideosExplainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:'10%',
    // alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
    margin: 11,
    // backgroundColor:'#102335'
  },
});

