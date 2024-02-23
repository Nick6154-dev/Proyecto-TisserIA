import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import Login from '../components/Login';
import RegisterUser from '../components/RegisterUser';
import { StyleSheet, useColorScheme } from 'react-native';

const Tab = createMaterialTopTabNavigator();

function TopTabNavigationInitital() {

    const colorScheme = useColorScheme();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    margin: 20,
                    backgroundColor: (colorScheme === 'light' ? '#DFA6A6' : '#5B5B5F'),
                    width: '80%',
                    borderRadius: 15,
                    alignSelf: 'center',
                    justifyContent: 'center'
                },
                tabBarIndicatorStyle: {
                    backgroundColor: 'white',
                    position: 'absolute',
                    zIndex: -1,
                    bottom: '9%',
                    height: '80%',
                    borderRadius: 10,
                },
                tabBarLabelStyle:{
                    fontWeight: '600',
                    fontSize: 15,
                },
                tabBarActiveTintColor: (colorScheme === 'light' ? '#DFA6A6' : '#0C4A6E'),
                tabBarInactiveTintColor: 'white',
                tabBarPressColor: 'transparent',

            }}

            sceneContainerStyle={{
                backgroundColor: 'white',
                borderRadius: (colorScheme === 'light' ? 70 : 0),
                height: '100%',
            }}
        >

            <Tab.Screen
                options={{
                    tabBarIndicatorStyle: [
                        styles.indicator, {
                            width: '45%',
                            marginLeft: 10,

                        }
                    ]
                }}
                name="Iniciar" component={Login} />
                
            <Tab.Screen
                options={{
                    tabBarIndicatorStyle: [
                        styles.indicator, {
                            width: '48%',
                            
                        }
                    ]
                }}

                name="Registrar" component={RegisterUser}  />
        </Tab.Navigator>
    )
}

export default TopTabNavigationInitital

const styles = StyleSheet.create({
    
    indicator: {
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: -1,
        bottom: '9%',
        height: '80%',
        borderRadius: 10,
    },
    
})