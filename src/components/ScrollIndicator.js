import {StyleSheet} from 'react-native'
import Animated from 'react-native-reanimated'

export default ({containerStyles, indicatorHeight, translateStyles, color}) => {
    return(
        <Animated.View style={[styles.indicatorContainer, containerStyles]}>
            <Animated.View style={[styles.indicator, {height: indicatorHeight, backgroundColor: color}, translateStyles]}/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    indicatorContainer: {
        height: '100%',
        width: 10,
        position: 'absolute',
        right: 1,
        top: 0,
        backgroundColor: '#dadada',
        alignItems: 'center',
        overflow: 'hidden'
    },
    indicator: {
        width: '60%',
        position: 'absolute',
        borderRadius: 30
    }
})