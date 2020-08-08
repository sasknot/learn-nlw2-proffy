import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'

import Landing from '../pages/landing'
import GiveClasses from '../pages/give-classes'
import StudyTabs from './StudyTabs'

const { Navigator, Screen } = createStackNavigator()

export default function () {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="Study" component={StudyTabs} />
        <Screen name="GiveClasses" component={GiveClasses} />
      </Navigator>
    </NavigationContainer>
  )
}
