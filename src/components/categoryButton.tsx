import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Categories } from '../services/types'

import Geography from '../assets/categories/Geography.svg';
import History from '../assets/categories/History.svg';
import Mythology from '../assets/categories/Mythology.svg';
import Politics from '../assets/categories/Politics.svg';
import Sports from '../assets/categories/Sports.svg';
import GeneralKnowledge from '../assets/categories/GeneralKnowledge.svg';

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
		switch (categoryName) {
			case 'General Knowledge':
				return <GeneralKnowledge width={42} height={42} />
			case 'Geography':
				return <Geography width={42} height={42} />
			case 'History':
				return <History width={42} height={42} />
			case 'Mythology':
				return <Mythology width={42} height={42} />
			case 'Politics':
				return <Politics width={42} height={42} />
			case 'Sports':
				return <Sports width={42} height={42} />
		}
	}

	return (
		<TouchableOpacity onPress={onPress} style={styles.button}>
			{Icon()}
			<Text style={styles.label}>{categoryName}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 145,
		backgroundColor: colors.light,
		marginBottom: 10,
		borderRadius: 5,
	},
	label: {
		fontFamily: fonts.text,
		color: colors.heading,
		fontSize: 13,
		marginTop: 10,
	},
})