import { styled } from 'nativewind';
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { designs_user } from '../interfaces/ILogin';


const StyledTouchable = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

interface Props {
    data: designs_user
}

function Card({ data }: Props) {
    console.log(data)
    return (

        <StyledView className='flex-1 justify-center  bg-transparent mt-3'>
            <StyledView className='flex-row justify-center bg-white dark:bg-gray-950 items-start dark:border dark:border-gray-400 rounded-3xl mt-2 mx-3 mb-2 shadow-2xl'>
                <StyledImage source={{ uri: data.image_design.image_url }} className='w-32 h-32 mt-6 mx-4 mb-4 rounded-xl ' />
                <StyledView className='flex-1 '>
                    <StyledText className='text-red-400 dark:text-sky-800 mt-6 font-semibold text-xl mx-1'>{data.title}</StyledText>
                    <StyledText className='text-gray-900 dark:text-gray-200 mt-6 mx-1'>{data.description}</StyledText>
                </StyledView>
            </StyledView>
        </StyledView>
    )
}

export default Card