import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import BusinessList from '../components/lists/BusinessList';
import BusinessRepository from '../repository/BusinessRepository'

const plusIcon = require('../../assets/plus.png')

const Business = ({ navigation }) => {
    const [businesses, setBusinesses] = useState([])

    const refreshBusinessList = async () => {
        const data = await BusinessRepository.getAll()
        setBusinesses(data)
    }

    useEffect(() => {
        refreshBusinessList()
    },[])

    return (
        <View style={styles.container}>
            <BusinessList items={businesses} refreshBusinessList={refreshBusinessList} navigation={navigation}/>
            <View style={styles.bottomArea}>
            <TouchableOpacity style={styles.plusIconArea} onPress={() => navigation.navigate('Add Business')}>
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
    }
});

export default Business;