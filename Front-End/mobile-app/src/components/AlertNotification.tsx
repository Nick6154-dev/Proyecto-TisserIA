import React, { useEffect, useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'



function AlertNotification({ errorMessage }: any, {state}: any) {
    const [modalVisible, setModalVisible] = useState(false);

     
    useEffect (() => {
        if (errorMessage.length > 0) {
            setModalVisible(true);
        }
    }, [errorMessage]);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View >
                    <View >
                        <Text>{errorMessage} </Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text>Hide Modal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AlertNotification
