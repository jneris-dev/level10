import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function WelcomeScreenTwo() {
    const navegation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <SvgFromUri
                    uri={"https://jneris.com.br/api/src/assets/level10/open2.svg"}
                    style={styles.image}
                />
                <Text style={styles.title}>Lorem ipsum</Text>
                <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum sollicitudin enim ac fermentum.</Text>
            </View>
            <View style={styles.nav}>
                <Text style={styles.skip} onPress={() => navegation.navigate('HomeScreen')}>Skip</Text>
                <View style={styles.bullets}>
                    <Text style={styles.bullet}>●</Text>
                    <Text style={[styles.bullet, styles.activeBullet]}>●</Text>
                    <Text style={styles.bullet}>●</Text>
                </View>
                <Text style={styles.next} onPress={() => navegation.navigate('WelcomeScreenTree')}>Next</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        marginBottom: 45,
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        textAlign: 'center',
        marginBottom: 10
    },
    desc: {
        fontFamily: fonts.text,
        fontSize: 15,
        color: colors.text,
        textAlign: 'center',
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 30
    },
    skip: {
        fontFamily: fonts.heading,
        fontSize: 15,
        color: colors.grey,
        textTransform: 'uppercase',
    },
    next: {
        fontFamily: fonts.heading,
        fontSize: 15,
        color: colors.sky,
        textTransform: 'uppercase',
    },
    bullets: {
        flexDirection: 'row',
    },
    bullet: {
        fontSize: 20,
        color: colors.grey,
        paddingHorizontal: 3
    },
    activeBullet: {
        color: colors.sky
    }
})