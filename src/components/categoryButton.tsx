import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SvgFromUri } from 'react-native-svg'

import { Categories } from '../services/types'

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
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onPress} style={styles.button}>
				<SvgFromUri
					uri={`https://jneris.com.br/api/src/assets/level10/categories/${categoryName}.svg`}
					width={42}
					height={42}
				/>
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
	}
})