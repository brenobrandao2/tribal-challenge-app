import React, { useEffect, useState,  } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import SimpleButton from '../components/buttons/SimpleButton';
import BusinessRepository from '../repository/BusinessRepository'
import { confirmationAlert, emptyFieldAlert } from '../utils/Alerts';

const AddBusiness = ({ route, navigation }) => {
    const [businessName, setBusinessName] = useState('')
    const [businessId, setBusinessId] = useState()

    const saveBusiness = async () => {
        if (!businessName) {
            emptyFieldAlert('Please enter the business name')
        }
        else {
            let response
            if (businessId) {
                response = await BusinessRepository.update(businessId, businessName)
            }
            else {
                response = await BusinessRepository.create(businessName)
            }
            console.log(response)
            navigation.goBack()
        }
    }

    const deleteBusiness = () => {
        confirmationAlert(
            'Do you really want to delete this business?',
            async () => {
                response = await BusinessRepository.delete(businessId)
                console.log(response)
                navigation.goBack()
            }
        )
    }

    useEffect(() => {
        const { businessId, name } = route.params || {}
        if (businessId && name) {
            setBusinessName(name)
            setBusinessId(businessId)
        }
    },[])

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={businessName} placeholder={'Business name'} onChangeText={setBusinessName}/>
            {
                businessId ?
                    <View style={styles.bottomArea}>
                        <SimpleButton text='Delete business' color='rgb(242, 71, 38)' action={deleteBusiness} />
                        <SimpleButton text='Edit business' color='rgb(26, 201, 87)' action={saveBusiness}/>
                    </View>
                    :
                    <View style={styles.bottomArea}>
                        <SimpleButton text='Create business' color='rgb(65, 75, 178)' action={saveBusiness}/>
                    </View>
            }
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        height: 60,
        marginTop: 30,
        width: '88%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(133, 133, 133, 0.8)',
        borderRadius: 8,
        padding: 10,
        fontSize: 20,
    },
    bottomArea: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20
    }
});

export default AddBusiness;