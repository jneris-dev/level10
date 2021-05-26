import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons'

import colors from '../../styles/colors';
import OpenSvg from '../../assets/open2.svg';

import styles from './styleWelcome'

export function WelcomeScreenTwo() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <OpenSvg style={styles.image} />
                <Text style={styles.title}>Lorem ipsum</Text>
                <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum sollicitudin enim ac fermentum.</Text>
            </View>
            <View style={styles.nav}>
                <View style={styles.bullets}>
                    <View style={styles.bullet}></View>
                    <View style={[styles.bullet, styles.activeBullet]}></View>
                    <View style={styles.bullet}></View>
                </View>
                <TouchableOpacity
                    style={styles.next}
                    onPress={() => navigation.navigate('WelcomeScreenThree')}
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