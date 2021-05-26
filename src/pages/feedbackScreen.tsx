import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native'

import colors from '../styles/colors'

export const FeedbackScreen = () => {
    const [loading, setLoading] = useState(false)

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator color={colors.sky} size="large" />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text>FeedbackScreen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})