import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import PersonInfoCard from '../cards/PersonInfoCard';

const PersonList = (props) => {
    const business = props.business

    const onRefresh = async () => {
        await props.refreshPersonList()
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
                props.items.map((item, index) => {
                    return(
                        <PersonInfoCard
                            key={index}
                            business={business}
                            person={item}
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
    },
    scrollContainer: {
        width: '100%',
    },
})

export default PersonList;