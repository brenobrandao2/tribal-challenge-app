import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import { useQuery } from 'react-query';
import FetchError from '../components/error/FetchError';
import BusinessList from '../components/lists/BusinessList';
import BusinessRepository from '../repositories/BusinessRepository';

const plusIcon = require('../../assets/plus.png');

const Businesses = ({ navigation }) => {
  const { data, isLoading, isError, isRefetching, refetch } = useQuery(
    'getAllBusinesses',
    BusinessRepository.getAll
  );

  if (isLoading || isRefetching) {
    return (
      <ActivityIndicator
        size={'large'}
        style={styles.loadingSpinner}
        color={'rgb(65, 75, 178)'}
      />
    );
  }

  if (isError) {
    return (
      <FetchError action={refetch} />
    );
  }

  return (
    <View style={styles.container}>
      <BusinessList
        items={data}
        refreshBusinessList={refetch}
        navigation={navigation}
      />
      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={styles.plusIconArea}
          onPress={() => navigation.navigate('Business')}
        >
          <Image source={plusIcon} style={styles.plusIcon}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  plusIcon: {
    height: 40,
    width: 40,
  },
  plusIconArea: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomArea: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSpinner: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default Businesses;
