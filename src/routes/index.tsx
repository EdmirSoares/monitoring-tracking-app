import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackNavigator from './StackNavigator';


const Stack = createNativeStackNavigator();

export default function Routes() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="StackNavigator" component={StackNavigator} />
		</Stack.Navigator>
	);
}