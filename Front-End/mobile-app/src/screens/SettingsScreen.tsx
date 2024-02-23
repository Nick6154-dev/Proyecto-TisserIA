import { styled } from 'nativewind';
import React, { useContext, useEffect, useState } from 'react'
import { Appearance, Image, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyleIcon = styled(AntDesign);
const StyleIconUser = styled(SimpleLineIcons);
const StyleIconMode = styled(Feather);
const StyleIconLogout = styled(MaterialIcons);
const StyledImage = styled(Image);
const StyledTouchable = styled(TouchableOpacity);

function SettingsScreen() {

  const { navigate }: any = useNavigation();

  const { user, logOut } = useContext(AuthContext);

  const colorScheme = useColorScheme();

  const [isOn, setIsOn] = useState(false);



  useEffect(() => {
    if (colorScheme === 'dark') {
      setIsOn(true)
    } else {
      setIsOn(false);
    }

  }, [colorScheme])

  function changeMode() {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light';
    Appearance.setColorScheme(newColorScheme);
  }

  return (
    <StyledView className='flex-1 bg-white dark:bg-black'>

      {/* header */}
      <Header screen='HomeScreen' userImage={true} />

      <StyledView className='flex-1 mt-10 mx-4'>
        <StyledText className='font-bold text-3xl color-black dark:color-white '>Configuraciones</StyledText>

        <StyledText className='font-bold text-bg color-gray-500 dark:color-gray-600 pt-11'>CUENTA</StyledText>
        <StyledView className='border-b-2 border-gray-200 dark:border-gray-500  pb-8'>
          <StyledTouchable onPress={() => navigate('UserInformationScreen')}>
            <StyledView className='flex-row mt-4 items-center '>
              <StyleIconUser name="user" size={30} className='color-red-400 dark:color-white border border-red-200 dark:border-gray-400 p-2' />
              <StyledText className='font-light text-lg color-gray-500 dark:color-gray-600 px-3'>Infomación Personal</StyledText>
              <StyledView className='flex-1 justify-center items-end'>
                <StyleIcon name="right" size={28} className='color-red-400 dark:color-gray-300' />
              </StyledView>
            </StyledView>
          </StyledTouchable>
        </StyledView>

        <StyledText className='font-bold text-bg color-gray-500 dark:color-gray-600 pt-11'>APARIENCIA</StyledText>
        <StyledView className='border-b-2 border-gray-200 dark:border-gray-500  pb-8'>

          <StyledView className='flex-row mt-4 items-center '>
            {colorScheme === 'light' ?
              <StyleIconMode name="sun" size={35} className='color-red-400' />
              :
              <StyleIconMode name="moon" size={35} className='color-gray-200' />

            }
            <StyledText className='font-light text-lg color-gray-500 dark:color-gray-600 px-3'>Dark Mode</StyledText>
            <StyledView className='flex-1 justify-center items-end'>
              <ToggleSwitch
                isOn={isOn}
                onColor="#0c4a6e"
                offColor="gray"
                size="large"
                onToggle={changeMode}
              />
            </StyledView>
          </StyledView>
        </StyledView>


        <StyledText className='font-bold text-bg color-gray-500 dark:color-gray-600 pt-11'>SESIÓN</StyledText>

        <StyledTouchable onPress={logOut}>
          <StyledView className='flex-row mt-4 items-center'>
            <StyleIconLogout name="logout" size={35} className='color-red-400 dark:color-white' />
            <StyledText className='font-light text-lg color-gray-500 dark:color-gray-600 px-3'>Cerrar Sesión</StyledText>
            <StyledView className='flex-1 justify-center items-end'>
            </StyledView>
          </StyledView>
        </StyledTouchable>

      </StyledView>
    </StyledView>
  )
}

export default SettingsScreen
