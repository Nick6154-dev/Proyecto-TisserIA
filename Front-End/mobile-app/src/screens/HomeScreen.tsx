import { styled } from 'nativewind';
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, useColorScheme, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Card from '../components/Card';

const StyledTouchable = styled(TouchableOpacity);
const StyledImageBackground = styled(ImageBackground);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledLogo = styled(Logo);
const StyledImage = styled(Image);
const StyledIcon = styled(FontAwesome);

function HomeScreen() {

    const { top } = useSafeAreaInsets();
    const { user, getDesigns, addDesigns } = useContext(AuthContext);
    const colorScheme = useColorScheme();
    const { navigate }: any = useNavigation()

    const [designs, setDesigns] = useState([]);
    const userName = user?.username;
    useEffect(() => {
        designsObtained();
    }, [])


    const designsObtained = async () => {
        try {
            const respuesta: any = await getDesigns(user?.id);
            setDesigns(respuesta)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <StyledView className='flex-1'>

            <StyledImageBackground
                source={
                    colorScheme === 'light'
                        ? require('../img/background.png')
                        : require('../img/homebackground.jpg')}

                className='flex-1'
                resizeMode="cover"
                blurRadius={5}

            >
                
                    {/* header */}

                    <StyledView className='flex-row m-9 items-center'
                    >
                        <StyledLogo fill={colorScheme === 'light' ? '#04010C' : '#D6D6D6'} width={40} height={40} className='' />
                        <StyledView className='flex-row mx-4 p-2 dark:bg-[#000000c0]  rounded-3xl shadow-2xl'>
                            <StyledText className='font-bold text-2xl  dark:text-white '>Tisser</StyledText>
                            <StyledText className='font-bold text-2xl text-red-400 dark:text-sky-600'>IA</StyledText>
                        </StyledView>
                        <StyledView className='flex-1 justify-center items-end'>
                            <StyledTouchable onPress={() => navigate('SettingsScreen')}>
                                <StyledIcon name="gears" size={32} className='color-black dark:color-gray-200' />
                            </StyledTouchable>
                        </StyledView>

                    </StyledView>


                    {/* welcome */}
                    <StyledView className='flex-row mx-9  items-center justify-between'>
                        <StyledText className='dark:text-gray-200 font-bold text-2xl' style={{ marginTop: top }}>Hola, {userName}</StyledText>

                        <StyledImage source={user && user.image && user.image.image_url ? { uri: user.image.image_url } : require('../img/default-user.jpg')}
                            className='w-28 h-28 rounded-full mx-4'
                        />

                    </StyledView>
                    <StyledView className=' items-start justify-start border-t-2 mt-9 border-black dark:border-gray-200 mx-3'>
                        <StyledText className='text-gray-600  dark:text-sky-600 text-xl mx-5 mt-4 font-medium '>Mis diseños</StyledText>
                    </StyledView>

                {designs &&
                    <FlatList
                        data={designs}
                        renderItem={({ item }) => (
                            <Card data={item} />
                        )}
                        keyExtractor={(item: any) => item._id}
                        showsHorizontalScrollIndicator={false}


                    />

                }
                {designs && designs.length === 0 &&
                    <StyledView className='flex-1 items-center justify-start mb-44'>
                        <StyledText className='text-gray-800 dark:text-gray-200 text-2xl font-semibold m-3'>Aún no tienes ningún diseño guardado.</StyledText>
                    </StyledView>
                }
            </StyledImageBackground>

        </StyledView >


    )
}

export default HomeScreen
