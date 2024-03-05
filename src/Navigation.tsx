import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import Main from "./Main";
import ChooseCurrencyScreen from "./App/ChooseCurrencyScreen";
import CurrenciesList from "./App/CurrenciesList";

const createStack =
    Platform.OS === 'ios' ? createStackNavigator : createNativeStackNavigator
const RootStack = createStack()

const RootStackNavigation = () => {
    return (
        <RootStack.Navigator
            screenOptions={({ }) => ({
                headerShown: true,
                headerShadowVisible: false,
                headerBackTitle: ' ',
                headerTintColor: 'black',
                headerBackVisible: false,
                headerTitleStyle: {
                    color: 'black',
                },
                headerTitleAlign: 'center',
            })}>
            <RootStack.Screen
                name="Main"
                component={Main}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="ChooseCurrencyScreen"
                component={ChooseCurrencyScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="CurrenciesList"
                component={CurrenciesList}
                options={{
                    headerShown: true,
                    headerTitle: 'Currency Select'
                }}
            />
        </RootStack.Navigator>
    )
}


export default function Navigation() {
    return (
        <NavigationContainer>
            <RootStackNavigation />
        </NavigationContainer>
    )
}

