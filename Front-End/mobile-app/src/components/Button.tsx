import { styled } from 'nativewind'
import React from 'react'
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'

const StyledTouchable = styled(TouchableOpacity);
const StyledText = styled(Text);

interface Props {
    title: string;
    color?: string;
    textSize?: string;
    width?: string;
    marginText?: string;
    onPress: () => any;
}

function Button({ title, color = 'bg-red-300', onPress, textSize = 'text-xl', width='w-3/4', marginText='m-5'}: Props) {

    const classNameButton = `${color} rounded-full dark:bg-sky-900 ${width}`
    const classNameText = `font-bold ${textSize} text-white text-center ${marginText}`
    return (
        <StyledTouchable
            className={classNameButton}
            onPress={onPress}
        >
            <StyledText className={classNameText} >{title}</StyledText>

        </StyledTouchable>
    )
}

export default Button
