import { Alert } from "react-native"

export const simpleMessageAlert = (text) => {
    return Alert.alert(
        '',
        text,
        [
            {
                text: 'Ok',
                onPress: () => {},
                style: 'default'
            }
        ])
}

export const confirmationAlert = (text, action) => {
    return Alert.alert(
        '',
        text,
        [
            {
                text: 'Delete',
                onPress: () => action(),
                style: 'destructive'
            },
            {
                text: 'Cancel',
                style: 'cancel'
            }
        ])
}