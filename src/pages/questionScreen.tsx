import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, SafeAreaView, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { useRoute, useNavigation, ParamListBase } from '@react-navigation/native'
import { decode } from 'html-entities'
import { SvgFromUri } from 'react-native-svg'

import { getQuestions } from '../services/getQuestions'
import { Categories, Dificulty, Response } from '../services/types'

import { AnswerSelectButton } from '../components/answerSelectButton'
import { AnswerConfirmModal } from '../components/answerConfirmModal'
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
			downgradeDificulty,
			correctAnswers,
			wrongAnswers
		} = route.params

		console.log('ACERTOU ===', correctAnswers)
		console.log('ERROU ===', wrongAnswers)

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
						★<Text style={styles.badgeOpacityStar}>★★</Text> <Text style={{ color: colors.heading }}>Easy</Text>
					</Text>
				)
			case 'medium':
				return (
					<Text>
						★★<Text style={styles.badgeOpacityStar}>★</Text> <Text style={{ color: colors.heading }}>Medium</Text>
					</Text >
				)
			case 'hard':
				return <Text>★★★ <Text style={{ color: colors.heading }}>Hard</Text></Text>
			default:
				return (
					<Text>
						★★<Text style={styles.badgeOpacityStar}>★</Text> Medium
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

	const checkAnswer = () => {
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

		const nextScreen =
			route.name === 'QuestionScreenB' ? 'QuestionScreenA' : 'QuestionScreenB'

		navigation.replace(nextScreen, navigationParams)
	}

	return (
		<>
			{loading ? (
				<View style={styles.activityLoaderContainer}>
					<ActivityIndicator size="large" color={colors.sky} />
				</View>
			) : (
				<SafeAreaView style={styles.safeArea}>
					<View style={styles.mainContainer}>
						<View style={styles.header}>
							<SvgFromUri
								uri={`https://jneris.com.br/api/src/assets/level10/categories/${categorySelected}.svg`}
								width={25}
								height={25}
							/>
							<View style={styles.badgeContainer}>
								<Text style={styles.badgeLabel}>{getLevelBadge()}</Text>
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
										selected={correctAnswer === answer}
										label={decode(answer)}
									/>
								</View>
							))}
						</View>
					</View>
				</SafeAreaView>
			)}
			<AnswerConfirmModal
				visible={userAnswerChoise !== ''}
				userAnswerChoise={decode(userAnswerChoise)}
				onBackDropPress={() => handleUserChoise('')}
				onCancel={() => handleUserChoise('')}
				onConfirm={checkAnswer}
			/>
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
	badgeContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	badgeLabel: {
		fontSize: 15,
		fontFamily: fonts.heading,
		color: colors.sky,
	},
	badgeOpacityStar: {
		color: colors.light_sky,
	},
	questionCount: {
		paddingBottom: 15,
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
		marginTop: 20,
		width: '100%',
	},
	questionTitle: {
		fontFamily: fonts.heading,
		color: colors.heading,
		fontSize: 20,
		marginBottom: 37,
	},
})