import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import AppIcon from '../app-icon/app-icon';
import { IconNames } from '../app-icon/app-icon.data';

const PlanCard = ({ data, handleCheckout,isSubscribed }: { data: any, handleCheckout: any, isSubscribed:any}) => {
    // console.log('isSubscribed:///>>>> ', isSubscribed);
    // console.log('data:--->', data);
    let data1 =  [
        'Access to 60+ exclusive Videos',
        ' Full access to all Podcasts and Webinars',
        ' Assist',
        ' Unlimited access to current and new Blogs',
        'Personalized notes feature on the Student Page',
        ' Business and Finance',
        ' Downloads',
        'Wellbeing',
        'Courses',
        'Guidelines',
        'Workflows',
        'Engage in community discussions via the Forum',
        'Ability to add and assign employees to track development on videos',
      ]
    let data2 =  [
        'Access to 60+ exclusive Videos',
        ' Full access to all Podcasts and Webinars',
        ' Assist',
        ' Unlimited access to current and new Blogs',
        'Personalized notes feature on the Student Page',
        ' Business and Finance',
        ' Downloads',
        'Wellbeing',
        'Courses',
        'Guidelines',
        'Workflows',
        'Engage in community discussions via the Forum',
        'Ability to add and assign employees up to 6th track development on videos',
      ]
    let data3 =  [
        'Access to 60+ exclusive Videos',
      ' Full access to all Podcasts and Webinars',
      ' Assist',
      ' Unlimited access to current and new Blogs',
      'Personalized notes feature on the Student Page',
      ' Business and Finance',
      ' Downloads',
      'Wellbeing',
      'Courses',
      'Guidelines',
      'Workflows',
      'Engage in community discussions via the Forum',
      ]
    let data4 =  [
        'Access to 60+ exclusive Videos',
        ' Full access to all Podcasts and Webinars',
        ' Assist',
        ' Unlimited access to current and new Blogs',
        'Personalized notes feature on the Student Page',
        ' Business and Finance',
        ' Downloads',
        'Wellbeing',
        'Courses',
        'Guidelines',
        'Workflows',
        'Engage in community discussions via the Forum',
      ]
    let data5 =  [
        'Access to 60+ exclusive Videos',
        ' Full access to all Podcasts and Webinars',
        ' Unlimited access to current and new Blogs',
        ' Personalized notes feature on the Student Page',
        ' Workflows',
        ' Engage in community discussions via the Forum',
      ]
    let data6 = [
        'Access to 60+ exclusive Videos',
        ' Full access to all Podcasts and Webinars',
        ' Unlimited access to current and new Blogs',
        ' Personalized notes feature on the Student Page',
        ' Workflows',
        ' Engage in community discussions via the Forum',
      ]
    return (
        <Pressable style={styles.planButton}>
            <AppIcon icon={IconNames.BILLING_ELLIPSE} size={10} />
            <View style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', width: '100%', marginTop: 25,}}>
                <View style={{ }}>
                    <Text style={[styles.planText, { alignSelf: 'center' }]} numberOfLines={1}>
                        {/* {data.productId == 'DO_50_m' && 'De'} */}
                        {data.title}
                    </Text>
                    <View style={{flexDirection:'column',alignSelf:'center'}}>
                    <Text style={[styles.planPrice,{fontSize:25}]}>
                        {data.localizedPrice}
                        <Text style={[styles.planPrice,{fontSize:20}]}>{data.productId == 'DO_50_m' && '-Month'}</Text>
                        <Text style={[styles.planPrice,{fontSize:20}]}>{data.productId == 'pm_15_m' && '-Month'}</Text>
                        <Text style={[styles.planPrice,{fontSize:20}]}>{data.productId == 'sm_7_m' && '-Month'}</Text>
                        {/* {data.productId == 'pm_15_m' && '-Month'}
                        {data.productId == 'sm_7_m' && '-Month'} */}
                        {/* {data.productId == 'DO_525_y' && '-Year'}
                        {data.productId == 'pm_165_y' && '-Year'}
                        {data.productId == 'sy_65_y' && '-Year'} */}
                        <Text style={[styles.planPrice,{fontSize:20}]}>{data.productId == 'DO_525_y' && '-Year'}</Text>
                        <Text style={[styles.planPrice,{fontSize:20}]}>{data.productId == 'pm_165_y' && '-Year'}</Text>
                        <Text style={[styles.planPrice,{fontSize:20}]}>{data.productId == 'sy_65_y' && '-Year'}</Text>
                    </Text>
                    <Text style={styles.planPrice}>
                        {data.productId == 'DO_50_m' && '(auto-renewing)'}
                        {data.productId == 'pm_15_m' && '(auto-renewing)'}
                        {data.productId == 'sm_7_m' && '(auto-renewing)'}
                    </Text>
                    </View>
                    {/* <Text style={[styles.planPrice,{fontSize:15}]}>
                    {data.productId == 'DO_50_m' && '1 Month'} 
                    {data.productId == 'pm_15_m' && '1 Month'} 
                    {data.productId == 'sm_7_m' && '1 Month'} 
                    {data.productId == 'DO_525_y' && '12 Month'} 
                    {data.productId == 'pm_165_y' && '12 Month'} 
                    {data.productId == 'sy_65_y' && '12 Month'} 
                    </Text> */}
                </View>
            </View>
            <View style={styles.planDetails}>
                {
                    data.productId == 'DO_50_m' &&
                    data1.map((detail, index) => {  
                        return(
                            <View key={index} 
                            style={{
                                borderBottomWidth:1,
                                borderColor:'#50575c'
                            }}
                            >
                                {/* {index == 0 && <Text style={[styles.planLabel,{fontSize:25,textDecorationLine:'underline'}]}>Includes access to these features</Text>} */}
                                <Text style={styles.planLabel} numberOfLines={1}>
                                    {/* <View style={{width:10,height:10,backgroundColor:'#fff',borderRadius:20,}}/> */}
                                    {detail}</Text> 
                                {index < data.length - 1 && <View style={styles.divider} />}
                            </View>
                        )
                    })
                }
                {
                    data.productId == 'DO_525_y' &&
                    data2.map((detail, index) => { 
                        return(
                            <View key={index}
                            style={{
                                borderBottomWidth:1,
                                borderColor:'#50575c'
                            }}
                            >
                                {/* {index == 0 && <Text style={[styles.planLabel,{fontSize:25,textDecorationLine:'underline'}]}>Includes access to these features</Text>} */}
                                <Text style={styles.planLabel}>{detail}</Text> 
                                {index < data.length - 1 && <View style={styles.divider} />}
                            </View>
                        )
                    })
                }
                {
                    data.productId == 'pm_15_m' &&
                    data3.map((detail, index) => { 
                        return(
                            <View key={index}
                            style={{
                                borderBottomWidth:1,
                                borderColor:'#50575c'
                            }}
                            >
                                {/* {index == 0 && <Text style={[styles.planLabel,{fontSize:25,textDecorationLine:'underline'}]}>Includes access to these features</Text>} */}
                                <Text style={styles.planLabel}>{detail}</Text> 
                            </View>
                        )
                    })
                }
                {
                    data.productId == 'pm_165_y' &&
                    data4.map((detail, index) => { 
                        return(
                            <View key={index}
                            style={{
                                borderBottomWidth:1,
                                borderColor:'#50575c'
                            }}
                            >
                                {/* {index == 0 && <Text style={[styles.planLabel,{fontSize:25,textDecorationLine:'underline'}]}>Includes access to these features</Text>} */}
                                <Text style={styles.planLabel}>{detail}</Text> 
                            </View>
                        )
                    })
                }
                {
                    data.productId == 'sm_7_m' &&
                    data5.map((detail, index) => { 
                        return(
                            <View key={index}
                            style={{
                                borderBottomWidth:1,
                                borderColor:'#50575c'
                            }}
                            >
                                {/* {index == 0 && <Text style={[styles.planLabel,{fontSize:25,textDecorationLine:'underline'}]}>Includes access to these features</Text>} */}
                                <Text style={styles.planLabel}>{detail}</Text> 
                            </View>
                        )
                    })
                }
                {
                    data.productId == 'sy_65_y' &&
                    data6.map((detail, index) => { 
                        return(
                            <View key={index}
                            style={{
                                borderBottomWidth:1,
                                borderColor:'#50575c'
                            }}
                            >
                                {/* {index == 0 && <Text style={[styles.planLabel,{fontSize:25,textDecorationLine:'underline'}]}>Includes access to these features</Text>} */}
                                <Text style={styles.planLabel}>{detail}</Text> 
                            </View>
                        )
                    })
                }
                {/* {data1.map((detail, index) => (
                    <React.Fragment key={index}>
                        <Text style={styles.planLabel}>{detail}</Text>
                        {index < data.accessPages.length - 1 && <View style={styles.divider} />}
                    </React.Fragment>
                ))} */}
            </View>
            {
                isSubscribed == true ?
            <TouchableOpacity 
            // onPress={handleCheckout}
            style={styles.btn}>
                <Text style={styles.btnBox}>Subscribed</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={handleCheckout}style={styles.btn}>
            <Text style={styles.btnBox}>Subscribe Now</Text>
        </TouchableOpacity>
            }
        </Pressable>
    );
};

const styles = StyleSheet.create({
    planButton: {
        backgroundColor: '#102335',
        // padding: 15,
        paddingHorizontal: 30,
        borderRadius: 16,
        marginBottom: 10,
        width: '100%',
        // bottom:11,
        // alignItems:'center',
    },
    planText: {
        fontSize: 23,
        color: 'white',
        // width:'50%',
        textAlign: 'center',
    },
    planPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        // marginLeft: 15,
        alignSelf: 'center', 
    },
    planDetails: {
        // marginTop: 22,
    },
    planLabel: {
        marginVertical: 11,
        fontSize: 15,
        color: 'white',
        textTransform:'capitalize',
        // textDecorationLine:'underline',
        // textAlign:'center'
    },
    divider: {
        width: '100%',
        height: 1,
        borderWidth:1,
        backgroundColor: 'gray',
    },
    btn:{
        backgroundColor:'#D9AA59',
        paddingVertical:'5%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        alignSelf:'center',
        marginBottom:10,
        marginTop:10
    },
    btnBox:{ 
        color: '#0f0d5f', 
        fontSize: 15,
        paddingHorizontal:10
    }

});

export default PlanCard;
