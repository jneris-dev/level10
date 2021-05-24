import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ResultScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ResultScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})