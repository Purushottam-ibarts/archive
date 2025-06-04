import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'; 
import PageLayout from '../layouts/page-layout/page-layout';
import { useAppDispatch, useAppSelector } from '../store/hooks.tsx';
import { getNotifications } from '../store/user/userActions';

const NotificationScreen = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.userSlice.notifications)


  useEffect(() => {
    dispatch(getNotifications());
  }, [])
  

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item?.title}</Text>
      <Text style={styles.notificationDescription}>{item?.description}</Text>
    </TouchableOpacity>
  );

  return (
    <PageLayout
      containerStyles={styles.container}
      flatList={{
        data: notifications,
        keyExtractor: (item) => item.id,
        renderItem: renderItem,
        numColumns: 1,
        listHeaderComponent: (
          <Text style={styles.header}>Notifications</Text>
        ),
        emptyComponent: <Text style={styles.empty}>No notifications available</Text>
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, 
    backgroundColor: '#1C2D42',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 20,
    color:'#fff', 
    paddingHorizontal: 30,
    paddingVertical: 10,
    textAlign: 'center',
  },
  empty: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 20,
    color:'#fff', 
    paddingHorizontal: 30,
    paddingVertical: 10,
    textAlign: 'center',
  },
  notificationItem: { 
    // backgroundColor: '#1C2D42', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',   
  },
  notificationDescription: {
    fontSize: 14,
    color: '#6c757d',
  },
});

export default NotificationScreen;
