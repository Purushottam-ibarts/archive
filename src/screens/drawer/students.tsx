import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/sectionHeader'
import PageLayout from '../../layouts/page-layout/page-layout'
import StudentsCard from '../../components/app-cards/student-card'
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx'
import { filterData, getStudents } from '../../store/students/studentsActions'
import CategoryAndItems from '../../components/app-items/app-item'
import { hp } from '../../utils/constants'
import VideoCard from '../../components/app-cards/video-card'
import GuidlinesCard from '../../components/app-cards/gudlines-card'
import { BlurView } from '@react-native-community/blur'
import { useNavigation } from '@react-navigation/native'
import LinkButton from '../../components/linkbutton'

const Students: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation();
  const user = useAppSelector((state) => state.userSlice);
  const [isAssignMode, setIsAssignMode] = useState(false);
  const [isHashtage, setHashtage] = useState('Images');
  // console.log('isHashtage: ', isHashtage);

  const content: any = useAppSelector(state => state.studentSlice?.content);
  const hashtags: any = useAppSelector(state => state.studentSlice?.hashtags);
  // console.log('hashtags: ', hashtags);

  useEffect(() => {
    dispatch(getStudents())
  }, [])

  const onSelect = (val: any) => {
    // console.log('val: ', val);
    setHashtage(val)
    dispatch(filterData({ contentType: 'students', nameOfHashtag: val }))
  }

  return (
    <>
       {
        user.privilege < 2 &&
        <LinkButton/>
      }
    <PageLayout containerStyles={styles.container}
      flatList={{
        data: content,
        // data:studentData?.content !== undefined && studentData?.content.length > 0 ? studentData?.content:[],
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
            <View style={{ backgroundColor: '#102335', paddingVertical: 5 }}>
              <CategoryAndItems categories={hashtags} itemsData={hashtags} onSelect={onSelect} />
            </View>
            <>
              <View style={{ backgroundColor: '#102335', marginBottom: 22 }}>
                <Text style={styles.text}> Disclaimer: All information provided in this section is provided is by fellow students and has not been verified by DIAN club so information should be used at your discretion</Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: 'gray', marginHorizontal: 5, }} />
            </>
          </React.Fragment>
        ),
        keyExtractor: (item: any, index) => `${index}`,
        renderItem: ({ item }) => { 
          // console.log('isHashtage: ', isHashtage);
          if (isHashtage == 'Videos' || isHashtage == 'Wellbeing') {
            return  <VideoCard data={item} />
          } 
          else if (isHashtage == 'Images') {
          return  <StudentsCard data={item}
              isSelected={true} onSelect={() => { }} isAssignMode={isAssignMode}
            />
          } 
          else if(isHashtage == 'students' || isHashtage == 'Generic Notes' || isHashtage == 'Past Papers' || isHashtage == 'Lecture Notes') {
          return <GuidlinesCard data={item} />
          }
        },
        numColumns: 2,
      }}
    />
    </>
  )
}

export default Students
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // marginBottom: hp(3.5),
    marginBottom:'15%',
    // backgroundColor:'red',
    // bottom:50,
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 22
  },
  item: {
    width: '48%',
    alignItems: 'center',
    // paddingVertical: 22,
    // marginBottom: 20,

  },
  image: {
    marginBottom: 8,
  },
  text: {
    color: 'white',
    fontSize: 15,
    margin: 11,
    // backgroundColor:'#102335'
  },
  textContainer: {
    backgroundColor: '#102335',
    padding: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 10,
    marginRight: 10,
  },
  button2: {
    backgroundColor: '#102335',
    paddingVertical: 15,
    paddingHorizontal: 55,
    borderRadius: 10,
  },
  button3: {
    backgroundColor: '#D9AA59',
    padding: 11,
    borderRadius: 11,
    marginTop: 22,
    paddingHorizontal: 22
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
});  