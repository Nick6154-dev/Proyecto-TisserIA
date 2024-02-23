import { styled } from 'nativewind'
import React from 'react'
import { Image, ImageBackground, Text, View, useColorScheme, useWindowDimensions } from 'react-native'
import TopTabNavigationInitital from '../navigator/TopTabNavigationInitital';
import Logo from '../components/Logo';


const StyledView = styled(View);
const StyledImageBackground = styled(ImageBackground);
const StyledText = styled(Text);


function LoginScreen() {
  const colorScheme = useColorScheme();

  return (
    <StyledView className='flex-1 '>
      <StyledView className='w-full h-2/3 rounded-b-full overflow-hidden absolute'>
        <StyledImageBackground
          source={
            colorScheme === 'light'
              ? require('../img/tisser1.jpg')
              : require('../img/tisserDark.jpg')}

          className='flex-1'
        />
      </StyledView>

      <StyledView className='items-center p-4 m-12'>
        <Logo fill={colorScheme=== 'light'?'#04010C': '#D6D6D6'} width={95} height={80}/>
        <StyledView className='flex-row p-5 mt-5 dark:bg-[#000000c0]  rounded-3xl'>
          <StyledText className='font-bold text-6xl drop-shadow-2xl dark:text-white '>Tisser</StyledText>
          <StyledText className='font-bold text-6xl text-red-400 dark:text-sky-800 drop-shadow-2xl'>IA</StyledText>
          </StyledView>
      </StyledView>

      <StyledView className='flex-1 justify-end items-center mb-2'>
        <StyledView className=' bg-white  dark:bg-black' style={{ borderRadius: 70, height: 490, width:'90%'}}>
          <TopTabNavigationInitital />
        </StyledView>
      </StyledView>
    </StyledView>
  )
}

export default LoginScreen