import { styled } from 'nativewind';
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native';

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledTouchable = styled(TouchableOpacity);

interface Props {
    imageUrl: String;
}

function VerifyGarment({ imageUrl }: Props) {
    return (
        <StyledView>
                                
        </StyledView>
    )
}

export default VerifyGarment