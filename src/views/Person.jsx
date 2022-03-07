import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleButton from '../components/buttons/SimpleButton';
import PersonRepository from '../repositories/PersonRepository';
import { confirmationAlert, simpleMessageAlert } from '../utils/Alerts';
import { useMutation, useQueryClient } from 'react-query';
import { validateEmail } from '../utils/Validations'
import { personTexts } from '../utils/Messages';

const Person = ({ route, navigation }) => {
  const queryClient = useQueryClient();

  const [businessName, setBusinessName] = useState();
  const [businessId, setBusinessId] = useState();
  const [personId, setPersonId] = useState();
  const [personName, setPersonName] = useState('');
  const [personRole, setPersonRole] = useState('');
  const [personEmail, setPersonEmail] = useState('');
  const [personPhone, setPersonPhone] = useState('');
  const [emptyFields, setEmptyFields] = useState(false);

  const { mutateAsync: mutateCreate, isLoading: isCreating } = useMutation(
    PersonRepository.create
  );
  const { mutateAsync: mutateUpdate, isLoading: isUpdating } = useMutation(
    PersonRepository.update
  );
  const { mutateAsync: mutateDelete, isLoading: isDeleting } = useMutation(
    PersonRepository.delete
  );

  const getPerson = () => {
    return {
      email: personEmail,
      name: personName,
      phone: personPhone,
      role: personRole,
    };
  };

  const savePerson = async () => {
    if (validateForm()) {
      if (businessId && personId) {
        await mutateUpdate({ businessId, personId, person: getPerson() })
          .then(() => goBack())
          .catch(() => {
            simpleMessageAlert(personTexts.failToSavePerson)
          })
      } else {
        await mutateCreate({ businessId, person: getPerson() })
          .then(() => goBack())
          .catch(() => {
            simpleMessageAlert(personTexts.failToSavePerson)
          })
      }
    }
  };

  const deletePerson = async () => {
    await mutateDelete({ businessId, personId })
      .then(() => goBack())
      .catch(() => {
        simpleMessageAlert(personTexts.failToDeletePerson)
      })
  };

  const confirmDeletion = () => {
    confirmationAlert(personTexts.confirmPersonDeletion, deletePerson);
  };

  const goBack = () => {
    queryClient.invalidateQueries('getAllPersons');
    navigation.goBack();
  };

  const validateForm = () => {
    if (isAnyFieldEmpty()) {
        simpleMessageAlert(personTexts.checkFields)
        return false
    } else if (!validateEmail(personEmail)){
        simpleMessageAlert(personTexts.invalidEmail)
        return false
    }
    return true
  }

  const isAnyFieldEmpty = () => {
    if (!personName || !personRole || !personEmail || !personPhone) {
      setEmptyFields(true);
      return true;
    }
    return false;
  };

  const getInputStyle = (field) => {
    if (emptyFields && !field) {
      return [styles.input, styles.emptyInput];
    } else {
      return styles.input;
    }
  };

  useEffect(() => {
    const { business, person } = route.params || {};

    setBusinessId(business.businessId);
    setBusinessName(business.name || '');

    if (person?.personId) {
      setPersonId(person.personId);
      setPersonName(person.name || '');
      setPersonRole(person.role || '');
      setPersonEmail(person.email || '');
      setPersonPhone(person.phone || '');
    }
  }, []);

  if (isCreating || isUpdating || isDeleting) {
    return <ActivityIndicator size={'large'} style={styles.loadingSpinner} />;
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.inputArea}
        contentContainerStyle={styles.inputAreaContent}
      >
        <TextInput
          style={getInputStyle(businessName)}
          editable={false}
          value={businessName}
          placeholder={'Business name'}
          onChangeText={setBusinessName}
        />
        <TextInput
          style={getInputStyle(personName)}
          value={personName}
          placeholder={'Person name'}
          onChangeText={setPersonName}
        />
        <TextInput
          style={getInputStyle(personRole)}
          value={personRole}
          placeholder={'Person role'}
          onChangeText={setPersonRole}
        />
        <TextInput
          style={getInputStyle(personEmail)}
          value={personEmail}
          placeholder={'Person e-mail'}
          onChangeText={setPersonEmail}
          keyboardType='email-address'
        />
        <TextInput
          style={getInputStyle(personPhone)}
          value={personPhone}
          placeholder={'Person phone'}
          onChangeText={setPersonPhone}
          keyboardType='phone-pad'
        />
      </KeyboardAwareScrollView>
      {businessId && personId ? (
        <View style={styles.bottomArea}>
          <SimpleButton
            text='Delete person'
            color='rgb(242, 71, 38)'
            action={confirmDeletion}
          />
          <SimpleButton
            text='Save person'
            color='rgb(26, 201, 87)'
            action={savePerson}
          />
        </View>
      ) : (
        <View style={styles.bottomArea}>
          <SimpleButton
            text='Save person'
            color='rgb(65, 75, 178)'
            action={savePerson}
          />
        </View>
      )}
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
  inputAreaContent: {
    alignItems: 'center',
  },
  inputArea: {
    width: '100%',
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
  emptyInput: {
    borderColor: 'rgb(255, 0, 0)',
  },
  bottomArea: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  loadingSpinner: {
      backgroundColor: '#fff',
      flex: 1,
  }
});

export default Person;
