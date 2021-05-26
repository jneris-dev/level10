import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Categories } from '../services/types'

import Geography from '../assets/categories/Geography.svg';
import History from '../assets/categories/History.svg';
import Mythology from '../assets/categories/Mythology.svg';
import Politics from '../assets/categories/Politics.svg';
import Sports from '../assets/categories/Sports.svg';
import General_Knowledge from '../assets/categories/General Knowledge.svg';

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface CategorieSelectButtonProps {
	categoryName: Categories
	onPress: () => void
}

export const CategorieSelectButton = ({
	categoryName,
	onPress
}: CategorieSelectButtonProps) => {
	const Icon = () => {
		if (categoryName === 'General Knowledge')
			return <General_Knowledge style={styles.icon} />
		else if (categoryName === 'Geography')
			return <Geography style={styles.icon} />
		else if (categoryName === 'History')
			return <History style={styles.icon} />
		else if (categoryName === 'Mythology')
			return <Mythology style={styles.icon} />
		else if (categoryName === 'Politics')
			return <Politics style={styles.icon} />
		else if (categoryName === 'Sports')
			return <Sports style={styles.icon} />
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onPress} style={styles.button}>
				<Text style={styles.label}>{categoryName}</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 145,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.light,
		marginBottom: 10,
		borderRadius: 5,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		fontFamily: fonts.text,
		color: colors.heading,
		fontSize: 13,
		marginTop: 10,
	},
	icon: {
		width: 30,
		height: 30
	}
})