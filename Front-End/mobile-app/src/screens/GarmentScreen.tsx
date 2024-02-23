import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigator/StackNavigationInitial';
import { styled } from 'nativewind';
import Header from '../components/Header';
import garmentAPI from '../api/garmentAPI';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import LoadingScreen from './LoadingScreen';
import { Entypo, FontAwesome, Foundation } from '@expo/vector-icons';
import Recomendactions from '../components/Recomendactions';
import ModalComponent from '../components/Modal';
import { User } from '../interfaces/ILogin';

interface Props extends StackScreenProps<RootStackParams, "GarmentScreen"> { }

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledIcon = styled(Foundation);

function GarmentScreen({ route, navigation }: Props) {

    const colorScheme = useColorScheme();
    const garmentImage = route.params.image;

    const [isloading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isCrochet, setIsCrochet]: any = useState();
    const [message, setMessage]: any = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleVerify = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', {
            uri: garmentImage,
            name: garmentImage,
            type: 'image/jpeg',
        });
        try {
            const resp = await garmentAPI.post("/processImage", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            setIsCrochet(resp.data.is_crochet);
            setMessage(resp.data.message);

        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false);
            setShowAlert(true);
        }
    }
    const newPhoto = () => {
        navigation.navigate('PhotoScreen');
        setIsCrochet();
        setShowAlert(false);
    }

    return (

        <ScrollView >
            <StyledView className='flex-1 items-center'>

                <Header screen='PhotoScreen' userImage={true} onPress={newPhoto} />

                <StyledText className='color-red-400 dark:color-gray-200 text-xl font-bold mt-4'>Análisis de patrón</StyledText>

                <StyledImage source={{ uri: garmentImage }} className='w-4/6 h-72 rounded-3xl mt-8 ' />

                <StyledText className='color-gray-500 text-base font-normal mt-2'>Imagen Subida</StyledText>

                <StyledView className='justify-center items-center'>
                    <ModalComponent onClose={() => setModalVisible(!modalVisible)}
                        visible={modalVisible}
                        message={message}
                        image_design={garmentImage}
                       
                    />
                </StyledView>


                {!isCrochet && showAlert &&
                    <StyledView className='border border-red-500 rounded-lg mt-8 bg-red-200 dark:bg-red-900'>
                        <StyledText className='text-red-900 p-3 dark:text-gray-300'>No es una prenda de crochet</StyledText>
                    </StyledView>
                }
                {isCrochet && showAlert &&
                    <>
                        <StyledView className='border border-red-600 dark:border-sky-700 rounded-lg mt-8 bg-red-100 dark:bg-sky-900'>
                            <StyledText className='text-green-900 p-3 dark:text-gray-300'>{message}</StyledText>
                        </StyledView>

                        <StyledView className='flex-row mt-6  items-center justify-center '>
                            <StyledTouchable onPress={newPhoto} className='items-center'>
                                <StyledIcon name="camera" size={40}
                                    className='color-red-300 dark:color-gray-300  p-2 mx-3' />
                            </StyledTouchable>

                            <StyledTouchable onPress={() => setModalVisible(true)} className='items-center '>
                                <StyledIcon name="heart" size={40}
                                    className='color-red-300 dark:color-gray-300  p-2 mx-3' />
                            </StyledTouchable>
                        </StyledView>
                    </>
                }

                {isloading ?
                    <ProgressBar progress={progress} indeterminate={true} color={colorScheme === 'light' ? '#DFA6A6' : '#075985'}
                        style={{ width: 300, height: 30, borderRadius: 10, marginTop: 25 }} />
                    : !isCrochet ? (
                        <StyledTouchable
                            className="bg-red-400 dark:bg-sky-700 mt-8 rounded-xl"
                            onPress={isCrochet === undefined ? handleVerify : newPhoto}
                        >
                            <StyledText className='text-white p-3 font-semibold text-base'>
                                {isCrochet === undefined ? "Analizar" : "Nueva Foto"}
                            </StyledText>
                        </StyledTouchable>
                    ) : null}

                {!isCrochet &&

                    <Recomendactions />}

            </ StyledView >
        </ScrollView>

    )
}

export default GarmentScreen