import React, { useState } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import ItemButton from '../buttons/ItemButton';

const BusinessList = (props) => {
    const [refreshing, setRefreshing] = useState(false);

    const editBusiness = (businessId, name) => {
        props.navigation.navigate('Add Business', {
            businessId,
            name
        })
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await props.refreshBusinessList()
        setRefreshing(false);
    }

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollContainer}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {
                props.items.map((item, index) => {
                    return(
                        <ItemButton
                            key={index}
                            id={item.businessId}
                            name={item.name}
                            action={editBusiness}
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
        // backgroundColor: 'yellow',
        width: '100%',
    },
})

export default BusinessList;