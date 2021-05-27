import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-eva-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import OpenSvg from '../assets/open.svg';

export const WelcomeScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <OpenSvg style={styles.image} />
                <Text style={styles.title}>
                    What level is your{'\n'}
                    general knowledge at?
                </Text>
                <Text style={styles.desc}>
                    Test your level of knowledge by answering questions on different topics and find out how much you really know about the world around you.
                </Text>
            </View>
            <View style={styles.nav}>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={styles.next}
                        onPress={() => navigation.navigate('UserIdentification')}
                        activeOpacity={.5}
                    >
                        <Icon
                            name="arrow-ios-forward-outline"
                            fill={colors.white}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        paddingTop: 30,
        paddingHorizontal: 30,
    },
    image: {
        width: '100%',
        marginBottom: 40,
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginBottom: 15,
        textAlign: 'center',
        lineHeight: 30,
    },
    desc: {
        fontFamily: fonts.text,
        fontSize: 15,
        color: colors.text,
        textAlign: 'center',
    },
    nav: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 30,
    },
    buttonArea: {
        width: 'auto',
        borderRadius: 40,
        padding: 3,
        borderWidth: 2,
        borderColor: colors.sky,
    },
    next: {
        backgroundColor: colors.sky,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
    },
    icon: {
        width: 33,
        height: 33,
    },
})
