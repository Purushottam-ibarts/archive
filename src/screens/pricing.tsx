import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Alert, Platform, Modal, Linking, ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks.tsx';
import { addSubscriiption, getPlans, postPaymentIntent } from '../store/pricing/pricingAction';
import PageLayout from '../layouts/page-layout/page-layout';
import PlanCard from '../components/app-cards/plan-card'; 
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import Config from 'react-native-config';
import ReusableBottomSheet from '../components/app-bottom-sheet';
import { hp } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
import * as RNIap from 'react-native-iap';
import { pricings } from '../utils/pricing';
import { showMessage } from '../store/common';
import { savePrivilege } from '../store/user/userSlice';

const MembershipScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const token = useAppSelector(state => state.userSlice.token);
  const user = useAppSelector(state => state.userSlice.user);
  // console.log('user: ', user.privilege);
  const [view, setView] = useState('monthly');
  const [products, setProducts] = useState([]);
  const [purchaseId, setPurchaseId] = useState(''); 
  // console.log('purchaseId: ', purchaseId);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const productIds :any= Platform.select({
    // ios: ['DO_50_m', 'DO_525_y', 'pm_15_m', 'pm_165_y', 'sm_7_m', 'sy_65_y'],
    android: ['do_50_m', 'do_525_y', 'pm_15_m', 'pm_165_y', 'sm_7_m', 'sy_65_y'],
  });

  useEffect(() => {
    const initIAP = async () => {
      try {
        const connection = await RNIap.initConnection();
        console.log('IAP connection status: ', connection);
        if (connection) {
          fetchProducts();
          getPurchaseHistory();
        }
      } catch (error) {
        console.error('Error initializing IAP connection:', error);
      }
    };
    initIAP();
    return () => {
      RNIap.endConnection(); // Clean up IAP connection on unmount
    };
  }, []);

  const fetchProducts = async () => {
    try {
      setLoader(true)
      // const availableProducts:any = await RNIap.getProducts({ skus: ['do_50_m'] });
      const availableProducts:any = await RNIap.getSubscriptions(items).catch(()=>{
        console.log('error finding available products');
      }).then((res) => {
        console.log(res);
      });
      console.log('availableProducts: ', availableProducts);
      setProducts(availableProducts);
      setLoader(false)
    } catch (error) {
      setLoader(false)
      // console.error('Error fetching products:', error);
      // Alert.alert('Error', 'Unable to fetch products');
    }
  };

  const getPurchaseHistory = async () => {
    try {  
      const purchaseHistory:any = await RNIap.getPurchaseHistory({ skus: productIds })
      // console.log('purchaseHistory: ------->>>', purchaseHistory);
      const recipt  = purchaseHistory[purchaseHistory.length - 1]?.productId;
      // console.log('ProductId--->>  ', recipt);
      setPurchaseId(recipt)
      if(recipt){
        validate(recipt)
      } 
    } catch (error) {
      console.log('error: ', error);
      // setLoader(false)
      // Alert.alert('Error', 'Unable to fetch products');
    }
  };

  const validate=async(recipt:any)=>{
    const reciptBody = {
      "recipt-data":'recipt',
      "password":'6bb9bf1b19c9497b8ad5e9f242f508a8'
    }
    
    const result:any = await RNIap.validateReceiptIos(reciptBody,true)
    .then((res)=>{
      if(res.status =='21002'){
        // console.log('res: ------>>>>', res);
        Alert.alert('Success', 'Your subscription is valid and active.');
        navigation.navigate('Assist')
      }
    })
    .catch((error)=>{
      console.log('error: ', error);
    }) 
  }
  
  const handlePurchase = async (productId:any) => { 
    // console.log('productId: ', productId);

    if(token !== null){ 
      try {
        const purchase:any = await RNIap.requestSubscription({ sku: productId.productId });
        // console.log('Purchase response:', purchase);
        if (purchase) { 
            const receipt = purchase.transactionReceipt;
            if (receipt) {
              validate(receipt);
              const res = await dispatch(addSubscriiption({
                plan_name: productId?.description,
                subscriptionId: purchase?.productId,
                customerId: purchase?.transactionId,
                product_id:purchase?.productId,
              })).unwrap(); 
      
              if (res?.status) {
                dispatch(savePrivilege(res.planId))
                // Alert.alert('Success', res?.message);
              }else{
                // Alert.alert('', res?.message);
                dispatch(savePrivilege(res.planId))
              }
            }
        }
        // Alert.alert('Success', 'Your purchase was successful!');
      } catch (error) {
        console.error('Purchase error:', error);
      } finally {
        setIsPurchasing(false);
      }
    }else{
      navigation.navigate('Login')
      dispatch(showMessage('Please Login'));
      // console.log('----');
    }
  };


  const filteredPlans = products
    .filter(product => {
      const isMonthly = product.subscriptionPeriodUnitIOS === "MONTH";
      const shouldInclude = view === 'monthly' ? isMonthly : !isMonthly;
      // console.log(`Product: ${product.productId}, View: ${view}, Included: ${shouldInclude}`);
      return shouldInclude;
    })
    .map((product, index) => {
      const plan = { ...product, id: product.productId || index };
      // console.log('Mapped Plan:', plan);
      return plan;
    });

  const closeModal = () => {
    setModalVisible(false);
  };

  const openAppleTermsOfUse = () => {
    const url = 'https://www.dentistryinanutshell.com/dian/public/terms-and-conditions';
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  }; 

  return (
    <View style={styles.container}>
      <PageLayout
        containerStyles={{
          marginBottom: hp(22),
          width: '80%',
          alignItems: 'center',
          alignSelf: 'center',
        }}
        flatList={{
          data: filteredPlans, 
          listHeaderComponent: (
            <React.Fragment key={'list-header-components-fragment'}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.title}>Join The Dian Club</Text>
                <Text style={styles.description}>Select your plan</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.monthlyButton, view === 'monthly' && styles.activeButton]}
                  onPress={() => setView('monthly')}>
                  <Text style={styles.textButton}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.yearlyButton, view === 'yearly' && styles.activeButton]}
                  onPress={() => setView('yearly')}>
                  <Text style={styles.textButton}>Yearly</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          ),
          renderItem: ({ item }) => {
            const isSubscribed = item.productId == purchaseId; 
            return(
              <Pressable style={styles.plansContainer}>
              {loader ? (
               <ActivityIndicator size="large" color="#D9AA59" /> // Show loader if loading
             ) : (
               <PlanCard data={item} handleCheckout={() => handlePurchase(item)}   isSubscribed={isSubscribed}/>
             )} 
           </Pressable>
            )
          },
          listFooterComponent: (
            <Pressable style={{ marginBottom: hp(22), }}>
              <TouchableOpacity
              // onPress={() => { setModalVisible(true) }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    color: '#fff'
                  }}
                >Subscription Details</Text>
              </TouchableOpacity>
              <View>
                <Text style={{
                  fontSize: 22,
                  color: '#fff',
                }}>Terms of Auto-Renewal</Text>
                <Text style={{
                  fontSize: 15,
                  color: '#fff',
                  marginTop: 10
                }}>

                  Payment will be charged to your iTunes Account upon confirmation of purchase.
                  Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period.
                  Your account will be charged for renewal within 24 hours prior to the end of the current period, and the cost of the renewal will be displayed.
                  Subscriptions can be managed by the user, and auto-renewal can be turned off by going to the user’s Account Settings after purchase.
                </Text>
              </View>
              <TouchableOpacity onPress={openAppleTermsOfUse}
                style={{
                  backgroundColor: '#102335',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.title}> Terms of Use</Text>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>

                    <View>
                      <Text style={{
                        fontSize: 22,
                        color: '#fff',
                      }}>Terms of Auto-Renewal</Text>
                      <Text style={{
                        fontSize: 15,
                        color: '#fff',
                        marginTop: 10
                      }}>

                        Payment will be charged to your iTunes Account upon confirmation of purchase.
                        Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period.
                        Your account will be charged for renewal within 24 hours prior to the end of the current period, and the cost of the renewal will be displayed.
                        Subscriptions can be managed by the user, and auto-renewal can be turned off by going to the user’s Account Settings after purchase.
                      </Text>
                    </View>
                  </View>
                </View>
              </Modal>

            </Pressable>),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10,
    color: '#D9AA59',
  },
  description: {
    fontSize: 16,
    color: 'white',
  },
  plansContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginVertical: '5%',
    position: 'relative',
  },
  button: {
    borderRadius: 5,
    borderColor: 'orange',
    borderWidth: 0.5,
    paddingVertical: 11,
    paddingHorizontal: 66,
    zIndex: 1,
  },
  monthlyButton: {
    backgroundColor: '#102335',
  },
  yearlyButton: {
    backgroundColor: '#102335',
    position: 'absolute',
    left: '50%',
  },
  activeButton: {
    zIndex: 2,
    backgroundColor: '#D9AA59',
  },
  textButton: {
    color: 'white',
    fontSize: 15,
  },
  modalBackground: {
    // flex: 1,
    height: '50%',
    marginTop: '50%',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  modalContainer: {
    width: '100%',
    height: '85%',
    // backgroundColor: '#FCF8C7',
    backgroundColor: '#102335',
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
});

export default MembershipScreen;
