import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack'

import { Categories } from '../services/types'
import { getObject } from '../services/storageService'
import { KEYS } from '../constants/keys'

import Geography from '../assets/categories/Geography.svg';
import History from '../assets/categories/History.svg';
import Mythology from '../assets/categories/Mythology.svg';
import Politics from '../assets/categories/Politics.svg';
import Sports from '../assets/categories/Sports.svg';
import GeneralKnowledge from '../assets/categories/GeneralKnowledge.svg';

import colors from '../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import fonts from '../styles/fonts';

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

    const Icon = () => {
        switch (route.params.category) {
            case 'General Knowledge':
                return <GeneralKnowledge width={70} height={70} />
            case 'Geography':
                return <Geography width={70} height={70} />
            case 'History':
                return <History width={70} height={70} />
            case 'Mythology':
                return <Mythology width={70} height={70} />
            case 'Politics':
                return <Politics width={70} height={70} />
            case 'Sports':
                return <Sports width={70} height={70} />
        }
    }

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

    const navigateToFeedback = () => {
        navigation.replace('FeedbackScreen')
    }

    if (error) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={styles.loaderText}>SOMETHING GOES WRONG, TRY AGAIN</Text>
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.scrollViewContainer}>
                    <View style={styles.header}>
                        {Icon()}
                        <Text style={styles.title}>Congratulations !!</Text>
                        <Text style={styles.subTitle}>This is your performance about:</Text>
                        <Text style={styles.subTitleBold}> {route.params.category}</Text>
                        <Text style={styles.subTitle}>
                            finished in:
                    <Text style={styles.subTitleBold}> {date}</Text>
                        </Text>
                    </View>
                    <View style={styles.resultsWrap}>
                        <View style={styles.totalWrap}>
                            <Text>
                                <Text style={styles.totalUper}>{totalRight}</Text>
                                <Text style={styles.totalOf}>/10</Text>
                            </Text>
                        </View>
                        <View style={styles.lvWrap}>
                            <Text style={styles.totalCorrects}>Total Hits</Text>
                            <View style={styles.lvBox}>
                                <Text>
                                    <Text style={styles.lvStars}>★
                                <Text style={styles.lvStarsDisable}>★★</Text>
                                    </Text>
                                    <Text style={styles.lvSubTitle}> easy</Text>
                                </Text>
                                <Text style={styles.lvTitle}>{totalEasy}</Text>
                            </View>
                            <View style={styles.lvBox}>
                                <Text>
                                    <Text style={styles.lvStars}>★
                                <Text style={styles.lvStarsDisable}>★</Text>
                                    </Text>
                                    <Text style={styles.lvSubTitle}> medium</Text>
                                </Text>
                                <Text style={styles.lvTitle}>{totalMedium}</Text>
                            </View>
                            <View style={styles.lvBox}>
                                <Text>
                                    <Text style={styles.lvStars}>★★★</Text>
                                    <Text style={styles.lvSubTitle}> hard</Text>
                                </Text>
                                <Text style={styles.lvTitle}>{totalHard}</Text>
                            </View>
                        </View>
                        <View style={styles.exitContainer}>
                            <TouchableOpacity style={styles.exitButton} onPress={navigateToHome}>
                                <Text style={styles.exitButtonLabel}>back to start</Text>
                            </TouchableOpacity>
                            <Text style={styles.feedbackLabel} onPress={navigateToFeedback}>
                                See Feedback
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderText: {
        fontFamily: fonts.heading,
        fontSize: 20,
        color: colors.heading,
    },
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    header: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        marginTop: 12,
        color: colors.heading,
        marginBottom: 5,
    },
    subTitle: {
        fontFamily: fonts.text,
        color: colors.text,
        fontSize: 15
    },
    subTitleBold: {
        fontFamily: fonts.heading,
        color: colors.heading,
        marginBottom: 5,
    },
    resultsWrap: {
        flex: 1,
        width: '100%',
        position: 'relative',
    },
    totalWrap: {
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalUper: {
        fontFamily: fonts.heading,
        fontSize: 90,
        color: colors.heading,
    },
    totalOf: {
        fontFamily: fonts.heading,
        fontSize: 40,
        color: colors.text,
    },
    lvWrap: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    totalCorrects: {
        fontFamily: fonts.heading,
        fontSize: 20,
        marginBottom: 15,
        color: colors.heading,
    },
    lvBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 60,
        backgroundColor: colors.light,
        marginBottom: 10,
        borderRadius: 5,
        paddingHorizontal: 25,
    },
    lvTitle: {
        fontFamily: fonts.heading,
        fontSize: 20,
        color: colors.heading,
        textAlign: 'right',
    },
    lvStars: {
        fontSize: 15,
        color: colors.sky,
    },
    lvStarsDisable: {
        color: colors.light_sky,
    },
    lvSubTitle: {
        fontFamily: fonts.text,
        fontSize: 15,
        color: colors.text,
    },
    exitContainer: {
        width: '100%',
        marginTop: 20,
        marginBottom: 30,
    },
    exitButton: {
        width: '100%',
        height: 55,
        backgroundColor: colors.sky,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    exitButtonLabel: {
        fontFamily: fonts.heading,
        fontSize: 15,
        color: colors.white,
        textTransform: 'uppercase',
    },
    feedbackLabel: {
        fontFamily: fonts.text,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 15,
        color: colors.heading,
        textDecorationLine: 'underline',
    }
})