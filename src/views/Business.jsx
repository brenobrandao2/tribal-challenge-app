import React, { useEffect, useState,  } from 'react';
import { StyleSheet, TextInput, View, ActivityIndicator } from 'react-native';
import SimpleButton from '../components/buttons/SimpleButton';
import BusinessRepository from '../repositories/BusinessRepository'
import PersonRepository from '../repositories/PersonRepository'
import { confirmationAlert, invalidFieldAlert } from '../utils/Alerts';
import { useMutation, useQueryClient } from 'react-query'

const confirmBusinessDeletion = 'Do you really want to delete this business and all its employees?'
const invalidBusinessName = 'Please enter the business name'

const Business = ({ route, navigation }) => {
    const queryClient = useQueryClient()

    const [businessName, setBusinessName] = useState('')
    const [businessId, setBusinessId] = useState()

    const { mutateAsync: mutateCreate, isLoading: isCreating } = useMutation(BusinessRepository.create)
    const { mutateAsync: mutateUpdate, isLoading: isUpdating } = useMutation(BusinessRepository.update)
    const { mutateAsync: mutateDelete, isLoading: isDeleting } = useMutation(BusinessRepository.delete)

    const createBusiness = async () => {
        if (!businessName) {
            invalidFieldAlert(invalidBusinessName)
        }
        else {
            await mutateCreate(businessName)
            goBack()
        }
    }

    const updateBusiness = async () => {
        if (!businessName) {
            invalidFieldAlert(invalidBusinessName)
        }
        else {
            await mutateUpdate({ businessId, name: businessName })
            goBack()
        }
    }

    const confirmDeletion = () => {
        confirmationAlert(
            confirmBusinessDeletion,
            deleteBusinessAndPersons
        )
    }

    const deleteBusinessAndPersons = async () => {
        await deleteBusinessPersons()
        await deleteBusiness()
    }

    const deleteBusinessPersons = async () => {
        const personList = await PersonRepository.getAll(businessId)
        await PersonRepository.deleteMany(businessId, personList)
    }

    const deleteBusiness = async () => {
        await mutateDelete(businessId)
        goBack()
    }

    const goBack = () => {
        queryClient.invalidateQueries('getAllBusinesses')
        navigation.popToTop()
    }

    useEffect(() => {
        const { business } = route.params || {}
        const { businessId, name } = business || {}

        if (businessId && name) {
            setBusinessName(name)
            setBusinessId(businessId)
        }
    },[])

    if (isCreating || isUpdating || isDeleting) {
        return (
            <ActivityIndicator size={'large'} style={styles.loadingSpinner} />
        )
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={businessName} placeholder={'Business name'} onChangeText={setBusinessName}/>
            {
                businessId ?
                    <View style={styles.bottomArea}>
                        <SimpleButton text='Delete business' color='rgb(242, 71, 38)' action={confirmDeletion} />
                        <SimpleButton text='Save business' color='rgb(26, 201, 87)' action={updateBusiness}/>
                    </View>
                    :
                    <View style={styles.bottomArea}>
                        <SimpleButton text='Save business' color='rgb(65, 75, 178)' action={createBusiness}/>
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
    },
    loadingSpinner: {
        backgroundColor: '#fff',
        flex: 1,
    }
});

export default Business;