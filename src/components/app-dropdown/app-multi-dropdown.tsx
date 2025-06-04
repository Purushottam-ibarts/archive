import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { hp } from '../../utils/constants';


interface selectedDateInput {
    options: any,
    onChange: any,
    dropdownName: any
}

const MultiSelectDropdown = ({ options, onChange, dropdownName }: selectedDateInput) => {
    // console.log('options: ', options);
    const [selectedItems, setSelectedItems] = useState([]);
    // console.log('selectedItems: ', selectedItems);
    const [show, setShow] = useState(false); 

    useEffect(()=>{
        onChange(selectedItems);
    },[selectedItems])

    const toggleItem = (item: any) => {
        // console.log('Data----: ');
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
        
        // console.log('selectedItems: ', selectedItems.length);
        // onChange(selectedItems);
    };

    return (
        <View> 
        {/* <View style={[styles.dropdownHeading,]}><Text style={[styles.dropdownText]}>{dropdownName}</Text></View> */}
        <TouchableOpacity style={{ 
            borderRadius: 11,
            marginHorizontal:20,
            marginTop:hp(2)
         }} onPress={() => { setShow(!show) }}>
            <View style={styles.inputBox }>
                <Text numberOfLines={1} style={styles.textTitles}>{selectedItems.length > 0 ? selectedItems.map((item) => item?.procedureTreatment).join(', '):'Select Procedure options'}</Text>
                <Text style={{ color: 'black' }}></Text><Text style={{ color: 'black' }}>▼</Text>
            </View>
                {
                    show && <View style={[styles.inputContainer]}>
                        {options.map((item: any) => {
                            return (
                                <TouchableOpacity key={item.value}
                                    onPress={() => toggleItem(item)}
                                    style={{  padding: 10,  backgroundColor: !selectedItems.includes(item) ?    'white':'black'}}
                                >
                                    <Text  style={{ color: selectedItems.includes(item) ?  '#ECECEC' :'#000' }}>{item.procedureTreatment}</Text>
                                </TouchableOpacity>
                            )
                        })
                        }
                </View>
            }

        </TouchableOpacity>
            </View>
    );
};


export default MultiSelectDropdown;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dropdownHeading: {
        marginHorizontal: 0,
        paddingVertical: 10,
    },
    textTitles: {
        color: 'black',
        width:'90%',
        fontSize:12,
        paddingLeft:5
    },
    dropdownText: {
        fontSize:10,
        color: 'black',
        // fontFamily: MyFonts.OpenSansSemiBold,
    },
    inputBox: {
        borderRadius: 5,
        opacity: 0.8,
        backgroundColor:'white',
        height: hp(5),
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
    },
    inputContainer: {
        borderRadius: 5,
        opacity: 0.8, 
    },
    input: {
        // flex: 1,
        // color: _themeColors.white,
        // fontFamily: MyFonts.OpenSansRegular,
        color: 'black',

    },
    error: {
        // color: MyColors.redPrimary,
        fontSize: 12,
        marginTop: 5,
    },


    buttonStyle: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ECECEC'
    },
    buttonTextStyle: {
        width: '100%',
        fontSize: 12,
        textAlign: 'left',
        color: 'black',
        textTransform: 'capitalize',
    },
    rowTextStyle: {
        width: '90%',
        fontSize: 15,
        textAlign: 'left',
        marginLeft: 20,
        textTransform: 'capitalize',
    },
    selectedRowTextStyle: {
        width: '100%',
        fontSize: 15,

    },
})