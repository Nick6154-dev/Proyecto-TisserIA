import { styled } from 'nativewind'
import React from 'react'
import { ActivityIndicator, View, useColorScheme } from 'react-native'


interface Props {
    isLoading?: boolean;
}

const StyledView = styled(View);
function LoadingScreen({ isLoading = false }: Props) {

    const colorScheme = useColorScheme();
    return (
        <StyledView className='flex-1 bg-transparent justify-center items-center'>
            {isLoading ? (
                <ActivityIndicator size={70} color={colorScheme === 'light' ? 'rgb(248 113 113)' : 'rgb(59 130 246)'} />
            ) : null}
        </StyledView>
    )
}

export default LoadingScreen
