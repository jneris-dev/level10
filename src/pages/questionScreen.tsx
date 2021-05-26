import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, SafeAreaView, Text, ActivityIndicator, StyleSheet, } from 'react-native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { useRoute, useNavigation, ParamListBase } from '@react-navigation/native'
import { decode } from 'html-entities'
import { Icon } from 'react-native-eva-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ScrollView } from 'react-native-gesture-handler'

import { getQuestions } from '../services/getQuestions'
import { Categories, Dificulty, Response } from '../services/types'
import { getObject, removeItem, storeData, storeObject } from '../services/storageService'
import { KEYS } from '../constants/keys'

import { AnswerSelectButton } from '../components/answerSelectButton'

import colors from '../styles/colors'
import fonts from '../styles/fonts'


type RouteParam = {
	key: string
	name: string
	params: {
		category?: Categories
		dificulty?: Dificulty
		correctAnswers?: number
		wrongAnswers?: number
		upgradeDificulty?: boolean
		downgradeDificulty?: boolean
		previousAnswerWasRight?: boolean
		questionNumber?: number
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

const shuffle = (array: string[]) => {
	return array.sort(() => Math.random() - 0.5)
}

export const QuestionScreen = () => {
	const [loading, setLoading] = useState(false)
	const [question, setQuestion] = useState('')
	const [answers, setAnswers] = useState<string[]>([])
	const [correctAnswer, setCorrectAnswer] = useState('')
	const [userAnswerChoise, setUserAnswerChoise] = useState('')
	const [categorySelected, setCategorySelected] = useState<string>()

	const route = useRoute<RouteParam>()
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

	const loadData = async (dificulty: Dificulty, category: Categories) => {
		setLoading(true)
		const response: Response = await getQuestions(dificulty, category)

		setQuestion(response.results[0].question)
		setCorrectAnswer(response.results[0].correct_answer)
		setCategorySelected(response.results[0].category)

		const allAnswer: string[] = response.results[0].incorrect_answers
		allAnswer.push(response.results[0].correct_answer)

		setAnswers(shuffle(allAnswer))

		setLoading(false)
	}

	useLayoutEffect(() => {
		setUserAnswerChoise('')
		navigation.setOptions({
			headerTitle: route?.params?.category || 'Question Screen'
		})
	}, [])

	useEffect(() => {
		const {
			category,
			dificulty,
			upgradeDificulty,
			downgradeDificulty
		} = route.params

		function setDificulty(receivedDificulty: Dificulty) {
			navigation.setParams({
				dificulty: receivedDificulty,
				upgradeDificulty: false,
				downgradeDificulty: false
			})

			return loadData(receivedDificulty, category!)
		}

		if (upgradeDificulty) {
			switch (dificulty) {
				case 'easy':
					setDificulty('medium')
					break
				case 'medium':
					setDificulty('hard')
					break
				case 'hard':
					setDificulty('hard')
					break
			}
		}

		if (downgradeDificulty) {
			switch (dificulty) {
				case 'easy':
					setDificulty('easy')
					break
				case 'medium':
					setDificulty('easy')
					break
				case 'hard':
					setDificulty('medium')
					break
			}
		}

		if (!downgradeDificulty && !upgradeDificulty) {
			setDificulty(dificulty || 'medium')
		}
	}, [])

	const getLevelBadge = () => {
		switch (route.params.dificulty) {
			case 'easy':
				return (
					<Text>
						<Icon name="star" fill={colors.sky} style={styles.badgeStar} />
						<Icon name="star" fill={colors.light_sky} style={styles.badgeStar} />
						<Icon name="star" fill={colors.light_sky} style={styles.badgeStar} />
					</Text>
				)
			case 'medium':
				return (
					<Text>
						<Icon name="star" fill={colors.sky} style={styles.badgeStar} />
						<Icon name="star" fill={colors.sky} style={styles.badgeStar} />
						<Icon name="star" fill={colors.light_sky} style={styles.badgeStar} />
					</Text>
				)
			case 'hard':
				return (
					<Text>
						<Icon name="star" fill={colors.sky} style={styles.badgeStar} />
						<Icon name="star" fill={colors.sky} style={styles.badgeStar} />
						<Icon name="star" fill={colors.sky} style={styles.badgeStar} />
					</Text>
				)
			default:
				return (
					<Text>
						<Icon name="star" fill={colors.sky} style={styles.badgeStar} />
						<Icon name="star" fill={colors.sky} style={styles.badgeStar} />
						<Icon name="star" fill={colors.light_sky} style={styles.badgeStar} />
					</Text>
				)
		}
	}

	const handleUserChoise = (answer: string) => {
		if (userAnswerChoise === '') {
			setUserAnswerChoise(answer)
		} else if (userAnswerChoise !== '') {
			setUserAnswerChoise('')
		}
	}

	const checkAnswer = async () => {
		const {
			category,
			dificulty,
			correctAnswers,
			wrongAnswers,
			upgradeDificulty,
			downgradeDificulty,
			previousAnswerWasRight,
			questionNumber
		} = route.params

		let navigationParams = {
			category,
			dificulty,
			correctAnswers,
			wrongAnswers,
			upgradeDificulty,
			downgradeDificulty,
			previousAnswerWasRight,
			questionNumber: !!questionNumber ? questionNumber + 1 : 2
		}

		navigationParams = {
			...navigationParams,
			previousAnswerWasRight: userAnswerChoise === correctAnswer
		}

		if (userAnswerChoise === correctAnswer) {
			navigationParams = {
				...navigationParams,
				correctAnswers: !!correctAnswers ? correctAnswers + 1 : 1
			}
		} else if (userAnswerChoise !== correctAnswer) {
			navigationParams = {
				...navigationParams,
				wrongAnswers: !!wrongAnswers ? wrongAnswers + 1 : 1
			}
		}

		if (previousAnswerWasRight) {
			userAnswerChoise === correctAnswer &&
				(navigationParams = {
					...navigationParams,
					upgradeDificulty: true
				})
		}

		if (previousAnswerWasRight === false) {
			userAnswerChoise !== correctAnswer &&
				(navigationParams = {
					...navigationParams,
					downgradeDificulty: true
				})
		}

		const setDataToStorage: StorageObject = {
			date: new Date().toDateString(),
			dificulty: dificulty || 'medium',
			questionName: decode(question),
			questionNumber: questionNumber || 1,
			rightAnswer: userAnswerChoise === correctAnswer,
			wrongAnswer: userAnswerChoise !== correctAnswer
		}

		let storageData = await getObject(KEYS[category!])

		if (questionNumber === 1 && storageData !== null) {
			await removeItem(KEYS[category!])
		}

		if (storageData === null) {
			storageData = []
		}

		storageData.push(setDataToStorage)

		await storeObject(KEYS[category!], storageData)

		if (questionNumber === 10) {
			await storeData(`TOKEN_${KEYS[category!]}`, `CATEGORY ${category} - Concluded in ${new Date().toDateString()}`)
		}

		const nextScreen =
			route.name === 'QuestionScreenB' ? 'QuestionScreenA' : 'QuestionScreenB'

		const navigateTo = questionNumber === 10 ? 'ResultScreen' : nextScreen

		navigation.replace(navigateTo, navigationParams)
	}

	return (
		<>
			{loading ? (
				<View style={styles.activityLoaderContainer}>
					<ActivityIndicator size="large" color={colors.sky} />
				</View>
			) : (
				<SafeAreaView style={styles.safeArea}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}
					>
						<View style={styles.mainContainer}>
							<View style={styles.header}>
								<View style={styles.headerCategory}>
									<Text style={styles.headerCategoryTitle}>
										{categorySelected}
									</Text>
								</View>
								<View style={styles.badgeContainer}>
									{getLevelBadge()}
								</View>
							</View>
							<View style={styles.questionCount}>
								<Text style={styles.questionCountTitle}>
									Question {route.params.questionNumber}
									<Text style={{ fontSize: 15 }}>/10</Text>
								</Text>
							</View>
							<View style={styles.wrapperQuestion}>
								<Text style={styles.questionTitle}>{decode(question)}</Text>
								{answers.map((answer) => (
									<View key={answer}>
										<AnswerSelectButton
											onPress={() => handleUserChoise(answer)}
											disabled={userAnswerChoise !== '' && userAnswerChoise !== answer}
											selected={answer === userAnswerChoise}
											label={decode(answer)}
										/>
									</View>
								))}
							</View>
							<View style={styles.wrapperQuestionConfirm}>
								<TouchableOpacity
									style={[
										styles.confirmAnswer,
										userAnswerChoise === '' && styles.confirmAnswerDisabled
									]}
									onPress={checkAnswer}
									activeOpacity={.5}
									disabled={userAnswerChoise === ''}
								>
									<Text style={styles.confirmAnswerLabel}>Confirm Answer</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1
	},
	activityLoaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	mainContainer: {
		flex: 1,
		paddingHorizontal: 30,
		paddingTop: 30
	},
	header: {
		flexDirection: 'row',
		marginBottom: 30,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	headerCategory: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerCategoryTitle: {
		fontFamily: fonts.heading,
		fontSize: 15,
		color: colors.heading,
	},
	badgeContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	badgeStar: {
		width: 15,
		height: 15,
		marginLeft: 3,
		color: colors.sky,
	},
	badgeOpacityStar: {
		color: colors.light_sky,
	},
	questionCount: {
		paddingBottom: 10,
		width: '100%',
		borderBottomColor: colors.light,
		borderBottomWidth: 1,
	},
	questionCountTitle: {
		fontFamily: fonts.heading,
		fontSize: 20,
		color: colors.grey
	},
	wrapperQuestion: {
		marginTop: 15,
		width: '100%',
	},
	questionTitle: {
		fontFamily: fonts.heading,
		color: colors.heading,
		fontSize: 20,
		marginBottom: 37,
	},
	wrapperQuestionConfirm: {
		marginTop: 15,
		paddingBottom: 50
	},
	confirmAnswer: {
		width: '100%',
		height: 55,
		backgroundColor: colors.sky,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	confirmAnswerLabel: {
		fontFamily: fonts.heading,
		fontSize: 15,
		color: colors.white,
		textTransform: 'uppercase',
	},
	confirmAnswerDisabled: {
		backgroundColor: colors.light_sky,
	}
})