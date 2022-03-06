import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';

const editIcon = require('../../../assets/edit.png')

const PersonInfoCard = (props) => {
    const person = props.person
    const business = props.business

    const editPerson = () => {
        props.navigation.navigate('Person', {
            business,
            person
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.horizontalViewTitle}>
                <Text style={styles.name}>{person.name}</Text>
                <TouchableOpacity onPress={() => editPerson()}>
                    <Image source={editIcon} style={styles.editIcon}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.role}>{person.role}</Text>
            <View style={styles.horizontalViewContent}>
                <Text style={styles.phone}>{person.phone}</Text>
                <Text style={styles.email}>{person.email}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '88%',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: 'rgba(230, 230, 230, 0.8)'
    },
    horizontalViewTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
    },
    name: {
        fontSize: 20,
    },
    role: {
        marginTop: 5,
        fontSize: 16,
    },
    phone: {
        fontSize: 16,
    },
    email: {
        fontSize: 16,
    },
    horizontalViewContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    editIcon: {
        height: 25,
        width: 25,
    }
})

export default PersonInfoCard;