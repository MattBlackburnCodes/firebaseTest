import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '@/screens/authScreen';
import WelcomeScreen from '@/screens/welcomeScreen';
import TitleScreen from '@/screens/titleScreen';
import ProfileScreen from '@/screens/profileScreen';
import SavedQuotesScreen from '@/screens/savedQuotesScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="titleScreen">
              <Stack.Screen 
                name="authScreen" 
                component={AuthScreen}
                options={{headerShown: false}}
                
              />
              <Stack.Screen 
                name="welcomeScreen" 
                component={WelcomeScreen} 
                options={{headerShown: false}}
              />
              <Stack.Screen 
                name="titleScreen" 
                component={TitleScreen} 
                options={{headerShown: false}}
                />
              <Stack.Screen 
                name="profileScreen" 
                component={ProfileScreen} 
                options={{headerShown: false}}
              />
              <Stack.Screen 
                name="savedQuotesScreen"
                component={SavedQuotesScreen}
                options={{headerShown: false}}
              />
          </Stack.Navigator>
        </NavigationContainer>
    </NavigationIndependentTree>
  );
}



