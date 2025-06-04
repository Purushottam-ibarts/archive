import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Modal, ActivityIndicator } from 'react-native';
import PageLayout from '../../layouts/page-layout/page-layout';
import AppIcon from '../../components/app-icon/app-icon';
import { IconNames } from '../../components/app-icon/app-icon.data';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { getCertificate } from '../../store/downnload/downloadAction';
import Share from 'react-native-share';
import { hp } from '../../utils/constants';  

const Certificate = () => {
  const dispatch = useAppDispatch()
  const  data:any = useAppSelector(state => state.downloadSlice?.data);
  const  token:any = useAppSelector(state => state.userSlice.token);
  // console.log('token: ', token);
  const [name, setName] = useState('Jhon Doe');
  const [hours, setHours] = useState('22 : 00 : 01');
  const [gdcNumber, setGdcNumber] = useState('');
  const [pdfPath, setPdfPath] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getCertificate()
  }, [])

  const getCertificate = async () => {   
    try { 
      const response = await fetch('https://www.dentistryinanutshell.com/dian/public/api/certificate-pdf', {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        }, 
      });  
      if (response.ok) {
        const data = await response;
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob); 
        setPdfPath(objectURL); 
      } else {
        console.error(`Request failed. Status: ${response.status}, Message: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error('error',error); 
    }
  }

  
  const downloadCertificateFunc = async () => {  
    try {
      const response = await fetch('https://www.dentistryinanutshell.com/dian/public/api/certificate-pdf', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const blob = await response.blob();
  
        // File path where the PDF will be saved
        const filePath = `${RNFS.DocumentDirectoryPath}/CPD_Certificate.pdf`;
  
        // Write the file to the local filesystem
        const fileReader = new FileReader();
        fileReader.onload = async (event) => {
          const base64Data = event.target.result.split(',')[1]; // Get the base64 string
          await RNFS.writeFile(filePath, base64Data, 'base64');
          // Alert.alert('Success', 'Certificate downloaded successfully!');
          Share.open({
            url: `file://${filePath}`,
            type: 'application/pdf',
            title: 'Share CPD Certificate',
          }).catch((err) => console.log(err));
        };
        fileReader.readAsDataURL(blob);
      } else {
        Alert.alert('Error', 'Failed to fetch the certificate.');
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'An error occurred while downloading the certificate.');
    }
  }

  return (
    <PageLayout
      containerStyles={styles.container}
      flatList={{
        data: [1],
        keyExtractor: (item, index) => `${item}_${index}`,
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
         
          </React.Fragment>
        ),
        renderItem:()=>{
          return(
            <View style={styles.container}>
            <Text style={styles.title}>CPD Certificate</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#656565"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Hours"
              placeholderTextColor="#656565"
              value={hours}
              onChangeText={setHours}
            />

            <TextInput
              style={styles.input}
              placeholder="GDC No."
              placeholderTextColor="#656565"
              value={gdcNumber}
              onChangeText={setGdcNumber}
            />

            <TouchableOpacity style={styles.viewButton} onPress={()=>{setIsModalVisible(true)}}>
              <Text style={styles.viewButtonText}>View Certificate</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.downloadButton} onPress={downloadCertificateFunc}>
              <View>
                <AppIcon icon={IconNames.DOWNLOAD} size={20} />
              </View>
              <Text style={styles.downloadButtonText}>Download Certificate</Text>
            </TouchableOpacity> 

              <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() =>{
                  console.log('lll ');
                  setIsModalVisible(false)
                }}
              >
                <View style={styles.modalContainer}> 
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                    {pdfPath ? (
                      <View style={styles.pdfContainer}>
                        <Pdf
                          source={{ uri: pdfPath }}
                          onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`number of pages: ${numberOfPages}`);
                          }}
                          onPageChanged={(page, numberOfPages) => {
                            console.log(`current page: ${page}`);
                          }}
                          onError={(error) => {
                            console.log(error);
                          }}
                          style={styles.pdf}
                        />
                      </View>
                    )
                    :
                    <View style={styles.pdfContainer}>
                    <ActivityIndicator size="large" color='#D9AA59' />
                    </View>
                  } 
                  </View>
              </Modal>

             
          </View>
          )
        },
        numColumns: 1,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 10,
    backgroundColor: '#1C2D42',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#102335',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 15,
    color: 'white',
    borderWidth: 0.5,
    borderColor: '#656565',
  },
  viewButton: {
    backgroundColor: '#1C1C1C',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: '#D9AA59',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  downloadButtonText: {
    color: '#1C2D42',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  pdfContainer: {
    // flex: 1,
    // marginTop: 20,
    marginTop:hp(20)
  },
  pdf: {
    // flex: 1,
    width: '100%',
    // backgroundColor:'red',
    height:hp(44),
    // height: '80%',
  },
  modalContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
  }, 
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#D9AA59',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    top:hp(10)
  },
  closeButtonText: {
    color: '#1C2D42',
    fontWeight: 'bold',
  },
  
});

export default Certificate;
