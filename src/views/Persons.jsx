import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import PersonList from '../components/lists/PersonList';
import PersonRepository from '../repositories/PersonRepository';
import { useQuery } from 'react-query';
import FetchError from '../components/error/FetchError';

const plusIcon = require('../../assets/plus.png');
const editIcon = require('../../assets/edit.png');

const Persons = ({ route, navigation }) => {
  const { business } = route.params || {};
  const { data, isLoading, isError, isRefetching, refetch } = useQuery(
    'getAllPersons',
    () => PersonRepository.getAll(business.businessId)
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
      <View style={styles.horizontalView}>
        <Text style={styles.company}>{business.name}</Text>
        <TouchableOpacity
          style={styles.editIconArea}
          onPress={() => navigation.navigate('Business', { business })}
        >
          <Image source={editIcon} style={styles.editIcon}></Image>
        </TouchableOpacity>
      </View>
      <PersonList
        items={data}
        business={business}
        refreshPersonList={refetch}
        navigation={navigation}
      />
      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={styles.plusIconArea}
          onPress={() => navigation.navigate('Person', { business })}
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
  company: {
    fontSize: 38,
    marginTop: 15,
    marginBottom: 15,
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  },
  editIcon: {
    height: 25,
    width: 25,
  },
  loadingSpinner: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default Persons;
