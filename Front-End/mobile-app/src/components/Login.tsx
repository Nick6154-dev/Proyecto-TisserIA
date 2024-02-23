import { AntDesign, Feather, Fontisto } from '@expo/vector-icons';
import { styled } from 'nativewind'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Text, TextInput, View, useColorScheme } from 'react-native';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import GoogleIcon from '../icons/GoogleIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';
import AlertNotification from './AlertNotification';
import LoadingScreen from '../screens/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledIcon = styled(Fontisto);
const StyledIconEye = styled(Feather);
const StyledIconLock = styled(AntDesign);
const StyledTouchable = styled(TouchableOpacity);



function Login() {

    const { singIn, errorMessage, removeError } = useContext(AuthContext);
    
  const [passwordVisible, setPasswordVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (errorMessage.length === 0) return;
        Alert.alert('Ocurrio un error', errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }])
    }, [errorMessage]);

    const onLogin = async () => {
        Keyboard.dismiss();
        await AsyncStorage.removeItem('token');
        setIsLoading(true);
        try {
            await singIn({ email, password });
        }
        finally {
            setIsLoading(false);
        }
    }

    const colorScheme = useColorScheme();
    return (

        <StyledView className='flex-1 justify-center dark:bg-black'>
            
            <StyledText className='text-center font-bold text-2xl dark:text-white m-1'>Iniciar Sesión</StyledText>

            <StyledView className='flex-row items-center mx-4 border-b-2 border-red-200 dark:border-sky-900'>
                <StyledIcon name="email" size={24} className='color-gray-400' />
                <StyledTextInput
                    className='w-60 m-3 p-2 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white focus:ring-red-400
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600
                      dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    inputMode='email'
                    placeholder='E-mail'
                    onChangeText={(value) => onChange(value, 'email')}
                    value={email}
                    onSubmitEditing={onLogin}
                    placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
                    contextMenuHidden={true}
                />
            </StyledView>
            <StyledView className='flex-row items-center mx-4 border-b-2 border-red-200 dark:border-sky-900'>
                <StyledIconLock name="lock" size={24} color="black" className='color-gray-400' />
                <StyledTextInput
                    className='w-60 m-3 p-2 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white focus:ring-red-400
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400'
                    placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
                    secureTextEntry={passwordVisible}
                    placeholder='Contraseña'
                    onSubmitEditing={onLogin}
                    onChangeText={(value) => onChange(value, 'password')}
                    value={password}

                />
                 <StyledTouchable onPress={() => setPasswordVisible(!passwordVisible)}>
            <StyledIconEye name={passwordVisible ? 'eye' : 'eye-off'} size={27} className='color-red-200 dark:color-gray-400 ' />
          </StyledTouchable>
            </StyledView>

            {isLoading ? (
                <LoadingScreen isLoading={true} />
            ) :
                <>
                    <StyledView className='items-center mb-2 mt-9'>
                        <Button
                            title='Ingresar'
                            textSize='text-sm'
                            marginText='m-3 px-10'
                            onPress={onLogin}

                        />
                    </StyledView>
                </>}
        </StyledView>
    )
}

export default Login
