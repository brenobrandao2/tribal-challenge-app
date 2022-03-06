import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import ItemButton from '../buttons/ItemButton';

const BusinessList = (props) => {

    const openBusiness = (business) => {
        props.navigation.navigate('Persons', {
            business
        })
    }

    const onRefresh = async () => {
        await props.refreshBusinessList()
    }

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollContainer}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={onRefresh}
                />
            }
        >
            {
                props.items.map((item) => {
                    return(
                        <ItemButton
                            key={item.businessId}
                            name={item.name}
                            action={() => openBusiness(item)}
                            navigation={props.navigation}
                        />
                    )
                })
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        alignItems: 'center',
        paddingVertical: 25,
    },
    scrollContainer: {
        width: '100%',
    },
})

export default BusinessList;