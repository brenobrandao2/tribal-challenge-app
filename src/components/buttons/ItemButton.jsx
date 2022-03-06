import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const arrowRightIcon = require('../../../assets/next.png')

const ItemButton = (props) => {
    const name = props.name
    return (
        <TouchableOpacity style={styles.container} onPress={() => props.action()}>
            <Text style={styles.name}>{name}</Text>
            <Image source={arrowRightIcon} style={styles.iconRight}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '88%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: 'rgba(230, 230, 230, 0.8)'
    },
    name: {
        fontSize: 20,
    },
    iconRight: {
        height: 20,
        width: 20,
    }
})

export default ItemButton;