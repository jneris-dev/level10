import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { SvgFromUri } from 'react-native-svg';
import { useRoute, useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack'

import { Categories } from '../services/types'
import { getObject } from '../services/storageService'
import { KEYS } from '../constants/keys'

import colors from '../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

type RouteParams = {
    key: string
    name: string
    params: {
        category: Categories
    }
}

type StorageObject = {
    questionName: string
    questionNumber: number
    rightAnswer: boolean
    wrongAnswer: boolean
    date: string
    dificulty: string
}

export const ResultScreen = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [totalRight, setTotalRight] = useState('')
    const [totalEasy, setTotalEasy] = useState('')
    const [totalMedium, setTotalMedium] = useState('')
    const [totalHard, setTotalHard] = useState('')
    const [date, setDate] = useState('')

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const route = useRoute<RouteParams>()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `Results: ${route.params.category}`
        })
    }, [])

    const loadData = async () => {
        const response: StorageObject[] = await getObject(KEYS[route.params.category])

        if (!response) {
            setLoading(false)
            return setError(true)
        }

        const easyQuestions: StorageObject[] = []
        const mediumQuestions: StorageObject[] = []
        const hardQuestions: StorageObject[] = []

        response.map((item: StorageObject) => {
            if (item.rightAnswer && item.dificulty === 'easy') {
                easyQuestions.push(item)
            }
            if (item.rightAnswer && item.dificulty === 'medium') {
                mediumQuestions.push(item)
            }
            if (item.rightAnswer && item.dificulty === 'hard') {
                hardQuestions.push(item)
            }

            return null
        })

        const totalRightAnswers = easyQuestions.length + mediumQuestions.length + hardQuestions.length

        setTotalRight(String(totalRightAnswers))
        setDate(String(response[0].date))
        setTotalEasy(String(easyQuestions.length))
        setTotalMedium(String(mediumQuestions.length))
        setTotalHard(String(hardQuestions.length))
    }

    useEffect(() => {
        setLoading(true)

        loadData()

        setLoading(false)
    }, [])

    const navigateToHome = () => navigation.replace('HomeScreen')
    if (error) {
        return (
            <View style={styles.loaderContainer}>
                <Text>SOMETHING GOES WRONG, TRY AGAIN</Text>
                <View style={styles.exitContainer}>
                    <TouchableOpacity style={styles.exitButton} onPress={navigateToHome}>
                        <Text style={styles.exitButtonLabel}>Exit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator color={colors.sky} size="large" />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <SvgFromUri
                    uri={`https://jneris.com.br/api/src/assets/level10/categories/${route.params.category}.svg`}
                    width={70}
                    height={70}
                />
                <Text style={styles.title}>Parabéns !!</Text>
                <Text>Check level in <Text>{route.params.category}</Text></Text>
                <Text>finished in: {date}</Text>
            </View>
            <View>
                <View>
                    <Text>{totalRight}</Text>
                    <Text>of</Text>
                    <Text>10</Text>
                </View>
                <View>
                    <View>
                        <View>
                            <Icon name="star" fill={colors.sky} style={styles.starIcon} />
                            <Icon name="star" fill={colors.light_sky} style={styles.starIcon} />
                            <Icon name="star" fill={colors.light_sky} style={styles.starIcon} />
                            <Text>{totalEasy}</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Icon name="star" fill={colors.sky} style={styles.starIcon} />
                            <Icon name="star" fill={colors.sky} style={styles.starIcon} />
                            <Icon name="star" fill={colors.light_sky} style={styles.starIcon} />
                            <Text>{totalMedium}</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Icon name="star" fill={colors.sky} style={styles.starIcon} />
                            <Icon name="star" fill={colors.sky} style={styles.starIcon} />
                            <Icon name="star" fill={colors.sky} style={styles.starIcon} />
                            <Text>{totalHard}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.exitContainer}>
                    <TouchableOpacity style={styles.exitButton} onPress={navigateToHome}>
                        <Text style={styles.exitButtonLabel}>Exit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {

    },
    starIcon: {

    }
})