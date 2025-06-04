// BillingCard.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BillingCard = ({ planType, cancelDate, onReactivate, onReactivateAnnually }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.planType}>{planType}: Canceled</Text>
      <Text style={styles.cancelDate}>Canceled {cancelDate}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onReactivate}>
          <Text style={styles.buttonText}>Reactivate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onReactivateAnnually}>
          <Text style={styles.buttonText}>Reactivate Annually</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#102335',
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
    borderColor: '#656565',
    borderWidth: 1,
    alignItems: 'center',
  },
  planType: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  cancelDate: {
    color: '#A8A8A8',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#102335',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#656565',
    borderWidth: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#9696A7',
    fontWeight: 'bold',
  },
});

export default BillingCard;
