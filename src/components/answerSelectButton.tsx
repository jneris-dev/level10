import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-eva-icons'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface AnswerSelectButtonProps {
	onPress: () => void
	disabled: boolean
	label: string
	selected: boolean
}
export const AnswerSelectButton = ({ onPress, disabled, label, selected }: AnswerSelectButtonProps) => {
	const icon = !selected ? 'radio-button-off' : 'radio-button-on';
	const iconColor = !selected ? colors.heading : colors.sky;

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			style={[
				styles.container,
				selected && styles.selected,
				disabled && styles.disabled
			]}>
			<View style={styles.text}>
				<Icon
					name={icon}
					fill={iconColor}
					style={styles.icon}
				/>
				<Text
					style={[
						styles.label,
						selected && styles.selectedText
					]}
				>
					{label}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: colors.light,
		padding: 20,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'transparent',
		marginBottom: 20
	},
	text: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	icon: {
		width: 15,
		height: 15,
	},
	label: {
		fontFamily: fonts.text,
		fontSize: 15,
		color: colors.heading,
		paddingLeft: 10
	},
	selected: {
		backgroundColor: colors.dark,
		borderColor: colors.sky,
	},
	selectedText: {
		color: colors.sky,
	},
	disabled: {
		opacity: .8,
	}
})