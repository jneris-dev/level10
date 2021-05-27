import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
} from 'react-native'

import Logo from '../assets/logo.svg'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export const StarterScreen = () => {
    const navigation = useNavigation()
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@level10:user');
            setUserName(user || '');
        }

        loadStorageUserName();
    }, []);

    const handleNavigation = async () => {
        if (userName) {
            navigation.navigate('HomeScreen')
        } else {
            navigation.navigate('WelcomeScreen')
        }
    }

    // const clearAsyncStorage = async () => {
    //     AsyncStorage.clear();
    //     console.log('Async Storage Limpo')
    // }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/background.jpg')} style={styles.image}>
                <View style={styles.overlay}></View>
                <View style={styles.logoWrap}>
                    <Logo width={200} />
                </View>
                <View style={styles.goStarter}>
                    <Text style={styles.welcome}>Welcome to <Text style={styles.name}>Level10!</Text></Text>
                    <TouchableOpacity
                        style={styles.buttonStart}
                        activeOpacity={0.7}
                        onPress={handleNavigation}
                    >
                        <Text style={styles.buttonStartLabel}>
                            Let's go
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <StatusBar barStyle='default' />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        position: 'relative',
    },
    logoWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontFamily: fonts.heading,
        fontSize: 18,
        color: colors.white,
        letterSpacing: 2,
        marginBottom: 15,
    },
    name: {
        color: colors.sky
    },
    goStarter: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 30,
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.7,
        backgroundColor: colors.dark,
        height: '100%',
        width: '100%',
    },
    buttonStart: {
        width: 200,
        height: 50,
        backgroundColor: colors.sky,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStartLabel: {
        fontFamily: fonts.heading,
        fontSize: 15,
        color: colors.white,
    },
})

