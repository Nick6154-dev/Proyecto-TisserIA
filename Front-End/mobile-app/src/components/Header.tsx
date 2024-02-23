import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import React, { useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';


interface Props {
    screen: string;
    image?: string;
    userImage?: boolean;
    photoUser?: string;
    onPress?: () => any;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyleIcon = styled(AntDesign);
const StyledImage = styled(Image);
const StyledTouchable = styled(TouchableOpacity);


function Header({ screen, image = "", userImage = false, onPress}: Props) {

    const { navigate }: any = useNavigation();
    const { user } = useContext(AuthContext);


    return (
        <StyledView className='flex-row mt-8 mx-2 justify-start items-center'>
            <StyledTouchable onPress={() => navigate(screen)}>
                <StyleIcon name="left" size={28} className='color-red-400 dark:color-white' />
            </StyledTouchable>
            <StyledView className='flex-1 items-center content-center'>
                <StyledView className='flex-row justify-center items-center text-center'>
                    <StyledText className='font-bold text-xl  dark:text-white text-center'>Tisser</StyledText>
                    <StyledText className='font-bold text-xl text-red-400 dark:text-sky-600'>IA</StyledText>

                </StyledView>
            </StyledView>
            {image !== "" &&
                <>
                    <StyledTouchable
                        onPress={() => navigate('GarmentScreen',
                            {
                                image
                            }
                        )}>
                        <StyledText className='font-bold text-xl text-red-400 dark:text-sky-600'>Subir</StyledText>
                    </StyledTouchable>
                </>

            }
            {userImage &&
                <StyledImage source={user && user.image && user.image.image_url ? { uri: user.image.image_url } : require('../img/default-user.jpg')}
                    className='w-11 h-11 rounded-full mx-4'
                />

            }
        </StyledView>

    )
}

export default Header
