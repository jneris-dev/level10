import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default StyleSheet.create({
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