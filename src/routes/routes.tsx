import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors'

import { StarterScreen } from '../pages/starterScreen';
import { WelcomeScreenOne } from '../pages/welcome/welcomeScreenOne';
import { WelcomeScreenTwo } from '../pages/welcome/welcomeScreenTwo';
import { WelcomeScreenThree } from '../pages/welcome/welcomeScreenThree';
import { UserIdentification } from '../pages/userIdentification';
import { HomeScreen } from '../pages/homeScreen';
import { QuestionScreen } from '../pages/questionScreen';
import { ResultScreen } from '../pages/resultScreen';
import { FeedbackScreen } from '../pages/feedbackScreen';

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
					name="WelcomeScreenOne"
					component={WelcomeScreenOne}
				/>
				<Screen
					name="WelcomeScreenTwo"
					component={WelcomeScreenTwo}
				/>
				<Screen
					name="WelcomeScreenThree"
					component={WelcomeScreenThree}
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
				<Screen
					name="FeedbackScreen"
					component={FeedbackScreen}
				/>
			</Navigator>
		</NavigationContainer>
	)
}