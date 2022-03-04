import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SimpleButton = (props) => {
    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: props.color}]} onPress={() => props.action()}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: 40,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    text: {
        color: '#fff',
        fontSize: 16
    }
})

export default SimpleButton;