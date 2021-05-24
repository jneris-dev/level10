import React from 'react'
import { View, Text, StatusBar, SafeAreaView, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SvgFromUri } from 'react-native-svg'

import { CategorieSelectButton } from '../components/categoryButton'

import { categories } from '../constants/categoriesList'
import { Categories } from '../services/types'

import { getData } from '../services/storageService'
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

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<SvgFromUri
					uri={"https://jneris.com.br/api/src/assets/level10/logo.svg"}
					width={127}
					height={70}
				/>
				<View style={styles.title}>
					<Text style={styles.titleLight}>Olá,</Text>
					<Text style={styles.titleBold}>João</Text>
				</View>
				<Text style={styles.desc}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum
				</Text>
			</View>
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
		alignItems: 'center',
		paddingTop: 70,
		paddingHorizontal: 30
	},
	title: {
		marginBottom: 11,
		marginTop: 27,
		flexDirection: 'row'
	},
	titleLight: {
		fontFamily: fonts.text,
		fontSize: 32,
		color: colors.heading,
		marginRight: 5
	},
	titleBold: {
		fontFamily: fonts.heading,
		fontSize: 32,
		color: colors.heading,
	},
	desc: {
		fontFamily: fonts.text,
		fontSize: 15,
		color: colors.text,
		textAlign: 'center',
		marginBottom: 40
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