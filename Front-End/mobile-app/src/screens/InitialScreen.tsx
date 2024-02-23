import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind'
import React from 'react'
import { ImageBackground, Text, View, useColorScheme } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Logo from '../components/Logo';
import Button from '../components/Button';



const StyledTouchable = styled(TouchableOpacity);
const StyledImageBackground = styled(ImageBackground);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledLogo = styled(Logo);


function InitialScreen() {

  const colorScheme = useColorScheme();

  const { navigate }: any = useNavigation();

  return (
    <StyledImageBackground
      source={
        colorScheme === 'light'
          ? require('../img/background.png')
          : require('../img/darkBackground3.png')}

      className='flex-1'
      resizeMode="cover"
    >
      <StyledView className='flex-1 items-center justify-center '>
        <StyledLogo fill={colorScheme === 'light' ? '#04010C' : '#D6D6D6'} width={95} height={80} className='mt-10 ' />
        <StyledView className='flex-row m-6 p-5 dark:bg-[#000000c0]  rounded-3xl shadow-2xl'>
          <StyledText className='font-bold text-6xl  dark:text-white '>Tisser</StyledText>
          <StyledText className='font-bold text-6xl text-red-400 dark:text-sky-900'>IA</StyledText>
        </StyledView>
      </StyledView>

      <StyledView className='flex-1 items-center justify-end mb-12'>
        
        <Button
          title='Creemos Juntos'        
          onPress={() => navigate('LoginScreen')}
        />

    
      </StyledView>
    </StyledImageBackground>
  )
}

export default InitialScreen
