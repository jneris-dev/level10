import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors'

import { StarterScreen } from '../pages/starterScreen';
import { WelcomeScreen } from '../pages/welcomeScreen';
import { UserIdentification } from '../pages/userIdentification';
import { HomeScreen } from '../pages/homeScreen';
import { QuestionScreen } from '../pages/questionScreen';
import { ResultScreen } from '../pages/resultScreen';

const { Screen, Navigator } = createStackNavigator();

export const Routes = () => {
	return (
		<NavigationContainer>
			<Navigator
				headerMode="none"
				screenOptions={{
					cardStyle: {
						backgroundColor: colors.white
					},
				}}
			>
				<Screen
					name="StarterScreen"
					component={StarterScreen}
				/>
				<Screen
					name="WelcomeScreen"
					component={WelcomeScreen}
				/>
				<Screen
					name="UserIdentification"
					component={UserIdentification}
				/>
				<Screen
					name="HomeScreen"
					component={HomeScreen}
				/>
				<Screen
					name="QuestionScreenA"
					component={QuestionScreen}
				/>
				<Screen
					name="QuestionScreenB"
					component={QuestionScreen}
				/>
				<Screen
					name="ResultScreen"
					component={ResultScreen}
				/>
			</Navigator>
		</NavigationContainer>
	)
}