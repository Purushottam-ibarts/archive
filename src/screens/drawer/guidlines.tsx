import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PageLayout from '../../layouts/page-layout/page-layout';
import GuidlinesCard from '../../components/app-cards/gudlines-card';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { filterData, getGuideLine } from '../../store/guidelines/guidelinesActions';
import CategoryAndItems from '../../components/app-items/app-item';
import { hp } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import LinkButton from '../../components/linkbutton';

const Guidlines: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const user = useAppSelector((state) => state.userSlice);
  const  guideLines:any = useAppSelector(state => state?.guideLinesSlice?.guideLines);
  const  hashtags:any = useAppSelector(state => state?.guideLinesSlice?.hashtags);

  useEffect(() => {
    dispatch(getGuideLine())
  }, [])
 
  const onSelect = (val: any) => { 
    console.log('val: ', val);
    dispatch(filterData({ contentType: 'guidelines', nameOfHashtag: val }))
  } 
  
  return ( 
    <>
    {
     user.privilege < 2 &&
<LinkButton/>
   }
    <PageLayout containerStyles={styles.container}
      flatList={{
        data: guideLines,
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
            <View style={{backgroundColor: '#102335', paddingVertical:hp(3)}}>
            <CategoryAndItems categories={hashtags} itemsData={hashtags} onSelect={onSelect} />
            </View>
          </React.Fragment>
        ),
        keyExtractor: (item: any, index) => `${item?.title}_${item?.id}_${index}`,
        renderItem: ({ item }) => <GuidlinesCard data={item} />,
        numColumns: 2,
      }}
    />
     </>
  )
}

export default Guidlines
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:hp(3)
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
    // marginBottom: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginVertical: 15
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

