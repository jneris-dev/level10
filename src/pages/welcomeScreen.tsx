import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-eva-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import OpenSvgOne from '../assets/open1.svg';
import OpenSvgTwo from '../assets/open2.svg';
import OpenSvgThree from '../assets/open3.svg';

export function WelcomeScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.scrollViewContainer}
            >
                <View style={styles.scrollView}>
                    <View style={styles.content}>
                        <OpenSvgOne style={styles.image} />
                        <Text style={styles.title}>Lorem ipsum</Text>
                        <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum sollicitudin enim ac fermentum.</Text>
                    </View>
                    <View style={styles.content}>
                        <OpenSvgTwo style={styles.image} />
                        <Text style={styles.title}>Lorem ipsum</Text>
                        <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum sollicitudin enim ac fermentum.</Text>
                    </View>
                    <View style={styles.content}>
                        <OpenSvgThree style={styles.image} />
                        <Text style={styles.title}>Lorem ipsum</Text>
                        <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum sollicitudin enim ac fermentum.</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.nav}>
                <View style={styles.bullets}>
                    <View style={[styles.bullet, styles.activeBullet]}></View>
                    <View style={styles.bullet}></View>
                    <View style={styles.bullet}></View>
                </View>
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
    scrollViewContainer: {
        flex: 1,
        width: '100%',
        position: 'relative',
    },
    scrollView: {
        flexDirection: 'row',
    },
    content: {
        alignItems: 'center',
        width: Dimensions.get('window').width * 1,
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
        paddingHorizontal: 30,
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 30
    },
    skip: {
        fontFamily: fonts.heading,
        fontSize: 15,
        color: colors.grey,
        textTransform: 'uppercase',
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
    bullets: {
        flexDirection: 'row',
    },
    bullet: {
        width: 10,
        height: 10,
        backgroundColor: colors.grey,
        paddingHorizontal: 3,
        borderRadius: 5,
        marginRight: 10,
    },
    activeBullet: {
        backgroundColor: colors.sky,
        width: 30,
    }
})
