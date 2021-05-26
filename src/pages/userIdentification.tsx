import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import Logo from '../assets/logo.svg'

export function UserIdentification() {
    const navegation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    async function handleSubmit() {
        if (!name)
            return Alert.alert('Me diz como chamar você 😢');
        try {
            await AsyncStorage.setItem('@level10:user', name);
            navegation.navigate('HomeScreen');
        } catch {
            return Alert.alert('Não foi possivel salvar seu nome. 😢');
        }

    }

    const disabled = !isFilled ? true : false

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Logo width={185} />
                                <Text style={styles.title}>
                                    How can we {'\n'}
                                    call you?
                                </Text>
                            </View>

                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) &&
                                    { borderColor: colors.sky }
                                ]}
                                placeholder="Please enter a name"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />

                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={[
                                        styles.buttonSubmit,
                                        (!isFilled) &&
                                        { backgroundColor: colors.light_sky }
                                    ]}
                                    activeOpacity={0.7}
                                    onPress={handleSubmit}
                                    disabled={disabled}
                                >
                                    <Text style={styles.buttonSubmitLabel}>
                                        Confirm
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.grey,
        color: colors.heading,
        width: '100%',
        fontSize: 15,
        marginTop: 35,
        padding: 6,
        textAlign: 'center',
    },
    footer: {
        width: '100%',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSubmit: {
        width: 200,
        height: 50,
        backgroundColor: colors.sky,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSubmitLabel: {
        fontFamily: fonts.heading,
        fontSize: 15,
        color: colors.white,
    },
})