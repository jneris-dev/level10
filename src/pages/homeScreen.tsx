import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { getData } from '../services/storageService'

import { CategorieSelectButton } from '../components/categoryButton'
import { KEYS } from '../constants/keys'

import { categories } from '../constants/categoriesList'
import { Categories } from '../services/types'

import fonts from '../styles/fonts'
import colors from '../styles/colors'

export const HomeScreen = () => {
	const navigation = useNavigation()
	const [userName, setUserName] = useState<string>();

	useEffect(() => {
		async function loadStorageUserName() {
			const user = await getData('@level10:user');
			setUserName(user || '');
		}

		loadStorageUserName();
	}, []);

	const handleNavigation = async (categoryName: Categories) => {
		const result = await getData(`TOKEN_${KEYS[categoryName]}`)
		if (result === null) {
			return navigation.navigate('QuestionScreenA', {
				category: categoryName,
				questionNumber: 1
			})
		}

		return navigation.navigate('ResultScreen', { category: categoryName })
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.hello}>Olá, {userName}</Text>
				<Text style={styles.title}>Welcome to <Text style={styles.nameApp}>level10</Text></Text>
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