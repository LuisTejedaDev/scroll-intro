import {useEffect} from 'react'
import {StyleSheet, Text} from 'react-native'
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'

export default ({text, index, isAnimated}) => {

    const opacity = useSharedValue(0)

    useEffect(() => {
        handleAnimated()
    }, [isAnimated])

    const handleAnimated = () => {
        opacity.value = withTiming(isAnimated ? 0 : 1, {duration: isAnimated ? 0 : ((index + 1) * 500)})
    }

    const opacityStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            {
                scale: withTiming(isAnimated ? 0.5 : 1, {duration: isAnimated ? 0 : ((index + 1) * 300)})
            },
            {
                translateX: withTiming(isAnimated ? -300 : 0, {duration: isAnimated ? 0 : ((index + 1) * 300)})
            }
        ]
    }))

    return(
        <Animated.View style={[styles.container, opacityStyle]}>
            <Text style={styles.description}>{text}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        alignSelf: 'stretch',
        opacity: 0,
        marginBottom: 15
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000'
    }
})