import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../pages/homeScreen'
import { QuestionScreen } from '../pages/questionScreen'
import { WelcomeScreenOne } from '../pages/welcomeScreenOne'
import colors from '../styles/colors'
import { WelcomeScreenTwo } from '../pages/welcomeScreenTwo';
import { WelcomeScreenTree } from '../pages/welcomeScreenTree';

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
          name="WelcomeScreenOne"
          component={WelcomeScreenOne}
        />
        <Screen
          name="WelcomeScreenTwo"
          component={WelcomeScreenTwo}
        />
        <Screen
          name="WelcomeScreenTree"
          component={WelcomeScreenTree}
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
      </Navigator>
    </NavigationContainer>
  )
}