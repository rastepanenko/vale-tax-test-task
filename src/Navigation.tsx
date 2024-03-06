import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
import Main from "./Main";
import Currencies from "./App/CurrencyExchangeRate/Currencies";
import CurrencySelectorScreen from "./App/CurrencyExchangeRate/CurrencySelectorScreen";

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
                name="CurrencySelectorScreen"
                component={CurrencySelectorScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="Currencies"
                component={Currencies}
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

