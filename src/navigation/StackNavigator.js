import React from "react"
import {createStackNavigator} from '@react-navigation/stack';

import Main from '~/pages/Main'
import FileHandler from '~/pages/FileHandler'

const Stack = createStackNavigator()

export default function StackNavigator({navigation}) {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="FileHandler" component={FileHandler} />
        </Stack.Navigator>
    )
}