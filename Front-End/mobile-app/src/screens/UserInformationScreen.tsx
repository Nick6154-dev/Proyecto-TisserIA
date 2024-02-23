import { AntDesign, Feather, Fontisto } from '@expo/vector-icons';
import { styled } from 'nativewind';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, useColorScheme, Modal, Keyboard, Alert } from 'react-native';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import CameraComponent from '../components/Camera';
import * as  ImagePicker from 'expo-image-picker';
import { useForm } from '../hooks/useForm';
import LoadingScreen from './LoadingScreen';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyleIcon = styled(Feather);
const StyledImage = styled(Image);
const StyledTouchable = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledIcon = styled(Fontisto);
const StyledIconLock = styled(AntDesign);

function UserInformationScreen() {

  const { user, updateUser, errorMessage, removeError } = useContext(AuthContext);
  const colorScheme = useColorScheme();


  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [imageUser, setImageUser]: any = useState();
  const cameraRef: any = useRef();

  const { navigate }: any = useNavigation();

  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert('Ocurrio un error', errorMessage, [{
      text: 'Ok',
      onPress: removeError
    }])
  }, [errorMessage]);


  const { email, password, repeatPassword, username, onChange } = useForm({
    email: user?.email,
    password: user?.password,
    repeatPassword: user?.password,
    username: user?.username,

  });

  const dataUpdateUser = {

    email,
    password,
    username,
    image_user: {
      "image_url": (imageUser === undefined ? user?.image.image_url : imageUser)
    }
  }

  const userId = user?.id;

  const onUpdateUser = async () => {
    if (password === repeatPassword) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        await updateUser(userId, dataUpdateUser);
      }
      finally {
        setIsLoading(false);
        navigate("HomeScreen")
      }

    } else {
      Alert.alert('Ocurrió un error', 'Las contraseñas no son iguales', [
        
        { text: 'OK' },
      ]);
    }

  }

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [9, 16],
      quality: 1,
    })

    if (!result.canceled) {
      setImageUser(result.assets[0].uri);
      setModalVisible(!modalVisible)
    }
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImageUser(photo.uri)
        setModalVisible(!modalVisible)

      } catch (error) {
        console.error('Failed to take picture: ', error);
      }
    } else {
      console.warn('La cámara no está lista para tomar una foto.');
    }
  };

  return (
    <StyledView className='flex-1 bg-white dark:bg-black'>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <StyledView className='flex-1 bg-white dark:bg-black'>

          <CameraComponent isPhotoUser={true} onPress={takePhoto} ref={cameraRef} onPressGalery={pickImages} />

        </StyledView>
      </Modal>

      <Header screen='SettingsScreen' />

      <StyledView className='items-center m-8 justify-center'>
        <StyledImage source={
          (user && user.image && user.image.image_url && !imageUser) ?
            { uri: user.image.image_url } :
            (imageUser ? { uri: imageUser } : require('../img/default-user.jpg'))
        }
          className='w-28 h-28 rounded-full '
        />
        <StyledTouchable className='bg-red-400 dark:bg-sky-800  absolute bottom-0 left-1/2 rounded-full border-2 
       border-gray-300 dark:border-gray-100 p-3' onPress={() => setModalVisible(true)}>
          <StyleIcon name="camera" size={23} className='color-gray-100 dark:color-gray-200' />
        </StyledTouchable>
      </StyledView>



      <StyledView className='flex-1 items-center'>
        <StyledView className='self-start mx-11'>
          <StyledText className='text-gray-600 dark:text-gray-300 font-semibold text-lg'>Username</StyledText>
        </StyledView>
        <StyledView className='flex-row items-center  border-b-2 border-red-200 dark:border-sky-900'>
          <StyledIconLock name="user" size={24} className='color-gray-400' />
          <StyledTextInput
            className='w-3/4 h-12 m-3 p-3 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white 
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600
                      dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            inputMode='text'
            value={username}
            onChangeText={(value) => onChange(value, 'username')}
            placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
            contextMenuHidden={true}
          />
        </StyledView>

        <StyledView className='self-start mx-11 mt-4'>
          <StyledText className='text-gray-600 dark:text-gray-300  font-semibold text-lg'>Correo</StyledText>
        </StyledView>
        <StyledView className='flex-row items-center  border-b-2 border-red-200 dark:border-sky-900'>
          <StyledIcon name="email" size={24} className='color-gray-400' />
          <StyledTextInput
            className='w-3/4 h-12 m-3 p-3 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white 
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600
                      dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            inputMode='text'
            value={email}
            onChangeText={(value) => onChange(value, 'email')}
            placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
            contextMenuHidden={true}
          />
        </StyledView>

        <StyledView className='self-start mx-11 mt-4'>
          <StyledText className='text-gray-600 dark:text-gray-300 font-semibold text-lg'>Contraseña</StyledText>
        </StyledView>
        <StyledView className='flex-row items-center  border-b-2 border-red-200 dark:border-sky-900'>
          <StyledIconLock name="lock" size={24} className='color-gray-400' />
          <StyledTextInput
            className='w-3/4 h-12 m-3 p-3 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white 
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600
                      dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            inputMode='text'
            value={password}
            onChangeText={(value) => onChange(value, 'password')}
            placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
            secureTextEntry={passwordVisible}
            contextMenuHidden={true}

          />
          <StyledTouchable onPress={() => setPasswordVisible(!passwordVisible)}>
            <StyleIcon name={passwordVisible ? 'eye' : 'eye-off'} size={27} className='color-red-200 dark:color-gray-400 ' />
          </StyledTouchable>

        </StyledView>

        <StyledView className='self-start mx-11 mt-4'>
          <StyledText className='text-gray-600 dark:text-gray-300 font-semibold text-lg'>Repetir Contraseña</StyledText>
        </StyledView>

        <StyledView className='flex-row items-center  border-b-2 border-red-200 dark:border-sky-900'>
          <StyledIconLock name="lock" size={24} className='color-gray-400' />
          <StyledTextInput
            className='w-3/4 h-12 m-3 p-3 text-2sm 
                     text-gray-500  border-gray-200
                     rounded-lg bg-white 
                      focus:border-red-300 dark:bg-gray-800 dark:border-gray-600
                      dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
            inputMode='text'
            value={repeatPassword}
            onChangeText={(value) => onChange(value, 'repeatPassword')}
            placeholderTextColor={(colorScheme === 'dark' ? '#E5E7EB' : '#4B5563')}
            secureTextEntry={passwordVisible}
            contextMenuHidden={true}

          />
          <StyledTouchable onPress={() => setPasswordVisible(!passwordVisible)}>
            <StyleIcon name={passwordVisible ? 'eye' : 'eye-off'} size={27} className='color-red-200 dark:color-gray-400 ' />
          </StyledTouchable>

        </StyledView>

        {isLoading ? (
          <LoadingScreen isLoading={true} />
        ) :

          <StyledView className='self-center mt-9'>
            <Button onPress={onUpdateUser} title='Actualizar' width='w-40' textSize='text-lg' />
          </StyledView>

        }
      </StyledView>

    </StyledView>
  )
}

export default UserInformationScreen
