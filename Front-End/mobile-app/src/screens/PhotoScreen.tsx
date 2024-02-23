import { styled } from 'nativewind'
import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native'
import CameraComponent from '../components/Camera';

const StyledView = styled(View);



function PhotoScreen() {
    return (
        <StyledView className='flex-1 '>
       
            <CameraComponent />
        </StyledView>
    )
}

export default PhotoScreen
