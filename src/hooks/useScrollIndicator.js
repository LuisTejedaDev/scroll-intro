import {useEffect, useState} from 'react'
import {Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

export default () => {

    /* Variables Animadas */
    const isScrolling = useSharedValue(false);
    const translationY = useSharedValue(0);

    /* Variables para detección de cambios en el estado */
    const [contentHeight, setContentHeight] = useState(0)
    const [displayHeight, setDisplayHeight] = useState(0)
    const [indicatorHeight, setIndicatorHeight] = useState(0)

    /* Metodo para devolver la altura que tiene el scrollview con el contenido */
    const handleContentSizeChange = (contentWidth, contentHeight) => {
        setContentHeight(contentHeight);
    };

    /* Altura que tiene ocupando en la pantalla, no considera el contenido */
    const handleLayout = (event) => {
        const {height} = event.nativeEvent.layout;
        setDisplayHeight(height);
    };

    /* Metodo para la detección de acciones en el scroll */
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            isScrolling.value = true
            translationY.value = event.contentOffset.y;
        },
        onMomentumEnd: () => {
            isScrolling.value = false
        },
        onEndDrag: () => {
            isScrolling.value = false
        }
    });

    /* Estará al pendiente de cualquier cambio tanto a la hora de obtener dimensiones cuando cargue así como al hacerse más grande el contenido del scroll, por ende hará que la altura del scrollIndicator también cambié */
    useEffect(() => {
        if(displayHeight > 0 && contentHeight > 0) setIndicatorHeight(displayHeight * (displayHeight / contentHeight))
    }, [displayHeight, contentHeight])

    const containerStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withTiming(isScrolling.value ? 0 : 20, {duration: isScrolling.value ? 200 : 500})
            }
        ]
    }))

    const translateStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: interpolate(
                    translationY.value,
                    [0, contentHeight - displayHeight],
                    [0, displayHeight - indicatorHeight],
                    Extrapolation.CLAMP
                )
            }
        ],
    }))

    return {
        handleContentSizeChange,
        handleLayout,
        scrollHandler,
        indicatorHeight,
        containerStyles,
        translateStyles,
        translationY
    }
}