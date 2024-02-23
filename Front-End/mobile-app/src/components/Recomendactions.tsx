import { Entypo, FontAwesome } from '@expo/vector-icons';
import { styled } from 'nativewind';
import React from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Image } from 'react-native-svg';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledIconPhoto = styled(FontAwesome);
const StyledIconEmoji = styled(Entypo);

function Recomendactions() {
  return (
    
    <StyledView className='w-full bg-red-100 dark:bg-gray-900 items-center mt-8 '>
    <StyledText className='font-semibold text-base text-gray-800 dark:text-gray-200 mt-4'>Recomendaciones</StyledText>
    <StyledView className='flex-row items-center self-start  mx-6'>
        <StyledIconPhoto name="photo" size={30} className='dark:color-gray-100 bg-indigo-400 dark:bg-violet-900 p-3 rounded-lg' />
        <StyledText className='dark:text-gray-200 m-3'>La foto debe ser legible.</StyledText>
    </StyledView>
    <StyledView className='flex-row items-center mt-5 self-start mx-6 mb-3'>
        <StyledIconEmoji name="emoji-happy" size={30} className='dark:color-gray-100 bg-[#C7F6D4] dark:bg-green-900 p-3 rounded-lg' />
        <StyledText className='dark:text-gray-200 m-3'>La prenda debe ser de lana.</StyledText>
    </StyledView>
   
    

</StyledView>
  )
}

export default Recomendactions