import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Alert, TouchableOpacity, StatusBar } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-eva-icons'
import { getData } from '../services/storageService'

import { CategorieSelectButton } from '../components/categoryButton'

import { categories } from '../constants/categoriesList'
import { Categories } from '../services/types'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

export const HomeScreen = () => {
	const navigation = useNavigation()

	const handleNavigation = async (categoryName: Categories) => {
		const result = await getData(categoryName)
		if (result === null) {
			navigation.navigate('QuestionScreenA', {
				category: categoryName,
				questionNumber: 1
			})
		}
	}

	function aboutAchievs() {
		Alert.alert('Achievements when reaching 7 or more hits.');
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.hello}>Olá, João</Text>
				<Text style={styles.title}>Welcome to <Text style={styles.nameApp}>level10</Text></Text>
				<Text style={styles.desc}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum
				</Text>
			</View>
			{/* <View style={styles.achievsWrap}>
				<Text style={styles.achievsTitle} onPress={aboutAchievs}>
					Your Achievements
					<Icon
						name="question-mark-circle-outline"
						fill={colors.text}
						style={{ width: 12, height: 12, marginLeft: 2 }}
					/>
				</Text>
				<View style={styles.achievsBox}>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={styles.achivScrollView}
					>
						<View style={styles.achievement}>
							<TouchableOpacity onPress={() => navigation.navigate('ResultScreen')}>
								
							</TouchableOpacity>
						</View>
						<View style={styles.achievementNotUnlocked}>
							<Icon
								name="question-mark-outline"
								fill={colors.grey}
								width={35}
								height={35}
							/>
						</View>
						<View style={styles.achievementNotUnlocked}>
							<Icon
								name="question-mark-outline"
								fill={colors.grey}
								width={35}
								height={35}
							/>
						</View>
						<View style={styles.achievementNotUnlocked}>
							<Icon
								name="question-mark-outline"
								fill={colors.grey}
								width={35}
								height={35}
							/>
						</View>
						<View style={styles.achievementNotUnlocked}>
							<Icon
								name="question-mark-outline"
								fill={colors.grey}
								width={35}
								height={35}
							/>
						</View>
						<View style={styles.achievementNotUnlocked}>
							<Icon
								name="question-mark-outline"
								fill={colors.grey}
								width={35}
								height={35}
							/>
						</View>
					</ScrollView>
				</View>
			</View> */}
			<View style={styles.scrollViewWrapper}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					style={styles.scrollViewContainer}
				>
					<View style={styles.scrollView}>
						{categories.map((categoryName) => (
							<View key={categoryName} style={styles.wrapButtonCategory}>
								<CategorieSelectButton
									categoryName={categoryName}
									onPress={() =>
										handleNavigation(categoryName)
									}
								/>
							</View>
						))}
					</View>
				</ScrollView>
			</View>
			<StatusBar barStyle="light-content" />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
	},
	header: {
		width: '100%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingTop: 30,
		paddingHorizontal: 30,
		marginBottom: 40
	},
	hello: {
		fontFamily: fonts.heading,
		fontSize: 15,
		color: colors.text,
		marginBottom: 5,
	},
	title: {
		fontFamily: fonts.heading,
		fontSize: 24,
		color: colors.heading,
		marginBottom: 5,
	},
	nameApp: {
		color: colors.sky,
	},
	desc: {
		fontFamily: fonts.text,
		fontSize: 15,
		color: colors.text,
	},
	achievsWrap: {
		width: '100%',
		position: 'relative',
		paddingLeft: 30,
		marginBottom: 35,
	},
	achievsTitle: {
		color: colors.sky,
		fontFamily: fonts.heading,
		fontSize: 15,
		marginBottom: 10,
	},
	achievsBox: {
		width: '100%',
		backgroundColor: colors.light,
		paddingLeft: 25,
		paddingVertical: 20,
		borderRadius: 5,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},
	achivScrollView: {
		width: '100%',
		flexDirection: 'row',
	},
	achievement: {
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		borderWidth: 3,
		borderColor: colors.gold,
		backgroundColor: colors.light_gold,
		marginRight: 25
	},
	achievementNotUnlocked: {
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		borderWidth: 3,
		borderColor: colors.grey,
		backgroundColor: 'transparent',
		marginRight: 25,
		borderStyle: 'dotted'
	},
	scrollViewWrapper: {
		flex: 1,
		width: '100%',
		position: 'relative',
		paddingBottom: 20
	},
	scrollViewContainer: {
		flex: 1,
		paddingBottom: 20,
	},
	scrollView: {
		width: '100%',
		paddingHorizontal: 30,
		flexGrow: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	wrapButtonCategory: {
		width: '48%',
	}
})