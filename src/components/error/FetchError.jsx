import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet
} from 'react-native'
import { errorTexts } from '../../utils/Messages';

const reloadIcon = require('../../../assets/reload.png');

const FetchError = (props) => {
    return (
        <View style={styles.errorView}>
        <Text style={styles.errorText}>{errorTexts.fetchErrorText}</Text>
        <TouchableOpacity onPress={() => props.action()} style={styles.refetchArea}>
          <Image source={reloadIcon} style={styles.reloadIcon} />
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    errorView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      errorText: {
        fontSize: 18,
        textAlign: 'center',
      },
      refetchArea: {
        height: 40,
        width: 40,
      },
      reloadIcon: {
        height: 30,
        width: 30,
        marginTop: 20,
      },
})


export default FetchError;