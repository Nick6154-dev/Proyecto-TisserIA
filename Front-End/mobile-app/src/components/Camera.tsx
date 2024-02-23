import React, { useState, useEffect, useRef, useContext, forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Text, TouchableOpacity, View, Platform, PermissionsAndroid, useWindowDimensions, Image, Button } from 'react-native';
import * as  ImagePicker from 'expo-image-picker';
import * as  MediaLibrary from 'expo-media-library';
import { AntDesign, EvilIcons, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';

const StyledView = styled(View);
const StyleOtherPhoto = styled(Ionicons);
const StyleIcongallery = styled(Ionicons);
const StyledImage = styled(Image);
const StyledTouchable = styled(TouchableOpacity);

interface Props {
  isPhotoUser?: boolean;
  onPress?: () => void;
  onPressGalery?: () => void;
}

const CameraComponent: ForwardRefRenderFunction<Camera, Props> = ({ isPhotoUser = false, onPress, onPressGalery }, ref: Ref<Camera>) => {

  const [image, setImages]: any = useState();
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [showCamera, setShowCamera] = useState(true);
  const cameraRef: any = useRef();
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission]: any = useState(null);
  const { navigate }: any = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setShowCamera(true);
    } else {
      setShowCamera(false)
    }

  }, [isFocused])


  const toggleCameraType = () => {
    setCameraType(current => (current === CameraType.back
      ? CameraType.front
      : CameraType.back));
  };

  const toggleFlashMode = () => {
    setFlashMode(current => (current === FlashMode.torch
      ? FlashMode.off
      : FlashMode.torch));
  };


  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [9, 16],
      quality: 1,
    })

    if (!result.canceled) {
      setImages(result.assets[0].uri);
    }
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        
        setImages(photo.uri)
      } catch (error) {
        console.error('Failed to take picture: ', error);
      }
    } else {
      console.warn('La cámara no está lista para tomar una foto.');
    }
  };

  const changeCamera = () => {
    setImages();
    setShowCamera(true);
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No se ha concedido permiso para usar la cámara.</Text>;
  }

  return (
    <StyledView className='flex-1 bg-white dark:bg-black'>

      <StyledView className='flex-1 mt-3'>
        {image && !isPhotoUser ?
          <>
            {/* header */}
            <Header screen='HomeScreen' image={image} />
            <StyledView className='flex-1 mt-3 items-center justify-center'>
              <StyledImage source={{ uri: image }} className='w-4/5 h-5/6 rounded-3xl' />
              <StyledView className='flex-row mt-6  items-center justify-center '>
                <StyledTouchable onPress={changeCamera} className='items-center'>
                  <StyleOtherPhoto name="repeat-outline" size={32}
                    className='color-red-300 dark:color-gray-300 border border-red-400 rounded-2xl dark:border-gray-200 p-2 mx-3' />
                </StyledTouchable>

                <StyledTouchable onPress={pickImages} className='items-center '>
                  <StyleIcongallery name="grid" size={32}
                    className='color-red-300 dark:color-gray-300 border border-red-400 rounded-2xl dark:border-gray-200 p-2 mx-3' />
                </StyledTouchable>
              </StyledView>
            </StyledView>

          </>
          :
          <>
            <StyledView className='flex-1'>
              {showCamera &&
                <Camera style={{ flex: 1, borderRadius: 20 }}
                  type={cameraType}
                  flashMode={flashMode}
                  ref={isPhotoUser ? ref : cameraRef}
                >
                  <StyledView className='flex-1 items-center justify-center'>

                    <StyledTouchable className='absolute top-0 self-start p-6 mt-8' onPress={toggleCameraType}>
                      <Ionicons name="camera-reverse" size={32} color="white" />
                    </StyledTouchable>

                    <StyledTouchable className='absolute top-0 self-end p-6 mt-8' onPress={toggleFlashMode}>
                      <Ionicons name={flashMode === 'torch' ? 'flash' : 'flash-off'} size={32} color="white" />
                    </StyledTouchable>

                    <StyledTouchable className='absolute bottom-0 self-start mb-11 px-5'
                      onPress={() => navigate(isPhotoUser ? 'SettingsScreen' : 'HomeScreen')}
                    >
                      <EvilIcons name="close" size={45} color="white" />
                    </StyledTouchable>

                    <StyledTouchable className='absolute bottom-0 self-center mb-5' onPress={isPhotoUser ? onPress : takePhoto}>
                      <FontAwesome name="circle-thin" size={80} color="white" />
                    </StyledTouchable>

                    <StyledTouchable className='absolute bottom-0 self-end mb-9 px-5' onPress={isPhotoUser ? onPressGalery : pickImages}>
                      <Ionicons name="grid" size={40} color="white" />
                    </StyledTouchable>
                  </StyledView>
                </Camera>

              }
            </StyledView>

          </>
        }
      </StyledView>
    </StyledView>
  );
};

export default forwardRef(CameraComponent);
