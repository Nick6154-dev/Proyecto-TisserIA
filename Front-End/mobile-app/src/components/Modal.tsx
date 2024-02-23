import { styled } from 'nativewind';
import React, { useContext, useState } from 'react'
import { Alert, Modal, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { useForm } from '../hooks/useForm';
import { Entypo } from '@expo/vector-icons';
import loginAPI from '../api/loginAPI';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../screens/LoadingScreen';


interface Props {
    onClose: () => void;
    message: string;
    image_design: any;
    visible: any;
}
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledIcon = styled(Entypo);
const StyledTouchable = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

function ModalComponent({ onClose, visible, image_design, message }: Props) {

    const { user, addDesigns, logOut } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const colorScheme = useColorScheme();

    const { title, description, onChange } = useForm({
        title: '',
        description: ''
    });

    const filename = image_design.split('/').pop();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("message", message);
    formData.append(
        'image_design', {
        uri: image_design,
        name: filename,
        type: 'image/jpeg'

    }
    )
    const handleSubmitDesing = async () => {
        setIsLoading(true);
        try {
            const resp: any = await addDesigns(user?.id, formData);
            if (resp.status === 201) {
                Alert.alert('Diseño guardado!', 'Tendás que iniciar sesión nuevamente', [
                    { text: 'OK', onPress: logOut },
                ]);
            }
        } catch (error: any) {
            Alert.alert('Ocurrió un error', error, [

                { text: 'OK' },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <StyledView className='w-5/6 h-1/2 bg-[#e5e7ebf7] dark:bg-[#101111f2] self-center  items-center rounded-2xl mt-40'>
                <StyledText className='text-red-400 dark:text-gray-200 font-semibold text-xl mt-5'>Guardar Diseño</StyledText>
                <StyledView className='flex-row items-center mx-4 border-b-2 border-red-200 dark:border-sky-900'>

                    <StyledTextInput
                        className='w-60 m-3 p-2 text-2sm mt-11
                     text-gray-500  border-gray-200
                     rounded-lg bg-white focus:ring-red-400
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600
                      dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        inputMode='text'
                        placeholder='Título'
                        value={title}
                        onChangeText={(value) => onChange(value, 'title')}

                        placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
                        contextMenuHidden={true}
                    />
                </StyledView>

                <StyledView className='flex-row items-center mx-4 mt-6 border-b-2 border-red-200 dark:border-sky-900'>

                    <StyledTextInput
                        className='w-60 m-3 p-2 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white focus:ring-red-400
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
                        placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
                        placeholder='Descripción'
                        value={description}
                        onChangeText={(value) => onChange(value, 'description')}

                    />
                </StyledView>
                {!isLoading ?
                    <StyledView className='flex-row items-center mt-8'>
                        <StyledTouchable onPress={onClose} className='mx-6'>
                            <StyledIcon name="cross" size={45} className='color-red-400 dark:color-gray-200' />
                        </StyledTouchable>
                        <StyledTouchable onPress={handleSubmitDesing} className='mx-8'>
                            <StyledIcon name="save" size={45} className='color-red-400 dark:color-gray-200' />
                        </StyledTouchable>
                    </StyledView>
                    : <LoadingScreen isLoading={true} />}
            </StyledView>


        </Modal>
    )
}

export default ModalComponent