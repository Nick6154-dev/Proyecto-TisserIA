import React from 'react'
import SettingsScreen from '../screens/SettingsScreen';
import PhotoScreen from '../screens/PhotoScreen';
import HomeScreen from '../screens/HomeScreen';
import { View, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styled } from 'nativewind';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


const StyledView = styled(View);
const StyledIcon = styled(Ionicons);
const StyledIconPhoto = styled(AntDesign);

function BottomTabNavigation() {
    const colorScheme = useColorScheme();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: (colorScheme === "light" ? 'white' : 'black'),
                    borderRadius: 15,
                    height: 65,
                }
            }}

        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <StyledView className='items-center content-center '>
                            <StyledIcon name="home-outline" size={(focused ? 30 : 26)}
                                className={`text-gray-500 ${focused ? 'text-red-400 dark:text-white ' : ''} `} />
                        </StyledView>
                    )
                }} />
           
                <Tab.Screen
                    name="PhotoScreen"
                    component={PhotoScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <StyledView className='items-center content-center'>
                                <StyledIconPhoto name="pluscircleo" size={(focused ? 50 : 45)}
                                    className={`text-gray-500 ${focused ? 'text-red-400 dark:text-white ' : ''} `} />
                            </StyledView>
                        )
                    }}
                />
           
            <Tab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <StyledView className='items-center content-center'>
                            <StyledIcon name="settings-outline" size={(focused ? 30 : 26)}
                                className={`text-gray-500 ${focused ? 'text-red-400 dark:text-white ' : ''} `} />
                        </StyledView>
                    )
                }}
            />

            

        </Tab.Navigator>
    )
}

export default BottomTabNavigation
