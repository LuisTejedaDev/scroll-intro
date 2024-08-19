import {SafeAreaView, StyleSheet, View} from 'react-native'
import {useDimensions} from './hooks';
import {selectDimensions} from './slices/appSlice';
import {useSelector} from 'react-redux';
import {useScroll} from './respaldo/hooks';
import {useEffect, useState} from 'react';
import {separarParrafos} from './js/string';
import {Parrafo} from './components';
import Animated from 'react-native-reanimated';

export default () => {

    /* hook para manejar con redux las dimensiones de los safeareaview y el container general */
    
    const [parrafos, setParrafos] = useState([])

    const cadena = `Majestic Landscapes es más que una simple aplicación; es una puerta abierta a la grandeza del mundo natural.\nEn un momento donde la rutina diaria puede hacernos olvidar la inmensidad y la belleza del planeta, esta app te invita a redescubrir la majestuosidad que nos rodea.\n\nCada imagen en Majestic Landscapes es una obra de arte capturada con un ojo atento a los detalles y una sensibilidad profunda hacia los matices de la naturaleza. Al deslizar tu dedo por la pantalla, te sumerges en una sinfonía de colores y formas que desafían lo cotidiano, ofreciéndote un respiro de la vida moderna y un momento de conexión con lo sublime.\n\nPero la experiencia no se limita a observar; se trata de sentir y reflexionar. Imagina estar en medio de un vasto desierto bajo un cielo estrellado, o en la cima de una montaña contemplando el horizonte infinito.\nCada paisaje te cuenta una historia, te invita a cuestionar tu lugar en el mundo y te recuerda la belleza inherente en la vastedad de la Tierra.\n\nMajestic Landscapes no solo te ofrece una galería de imágenes impresionantes, sino también una forma de planificar tu propia exploración personal.\nCon cada ruta recomendada y cada detalle proporcionado, te brinda las herramientas para que te acerques a esos lugares que siempre has soñado visitar, transformando tus sueños en realidades palpables.\n\nEn el fondo, esta app es un recordatorio constante de que el mundo está lleno de maravillas esperando ser descubiertas.\nMajestic Landscapes te ofrece la oportunidad de hacer una pausa, respirar profundamente y permitirte ser cautivado por la imponente belleza de nuestro planeta.\nEn un mundo que a menudo avanza demasiado rápido, aquí encuentras un refugio para la contemplación y la admiración.\n\nDescubre, sueña y permite que la majestuosidad de los paisajes te inspire a apreciar la grandeza que nos rodea.`

    useEffect(() => {
        setParrafos(separarParrafos(cadena))
    }, [])

    const {onLayout} = useDimensions()
    const dimensions = useSelector(selectDimensions)

    const {width, height} = dimensions

    /* hook para manejar el scroll y estilos animados */
    const {scrollHandler, contentStyle, imageStyle, infoStyle, textInfoStyle, pagingEnabled} = useScroll({height})

    return(
        <>
            <SafeAreaView style={{flex: 0, backgroundColor: '#fff', zIndex: 10}} />
            <View 
                onLayout={onLayout}
                style={styles.container}
            >
                <Animated.View style={[styles.info, infoStyle]}>
                    <Animated.Text style={[{fontSize: 15, fontWeight: '500', color: '#fff', marginBottom: 10}]}>18-Ago-2024</Animated.Text>
                    <Animated.Text style={[{fontSize: 24, fontWeight: 'bold', color: '#fff'}, textInfoStyle]}>Noches de Cumbre Lunar</Animated.Text>
                </Animated.View>

                <Animated.ScrollView
                    bounces={false}
                    onScroll={scrollHandler}
                    style={styles.scroll}
                    pagingEnabled={pagingEnabled}    
                >
                    <Animated.Image
                        style={[{height, width}, imageStyle]}
                        source={{uri: 'https://www.xtrafondos.com/wallpapers/la-luna-a-traves-de-paisaje-9668.jpg'}} 
                    />

                    <Animated.View style={[styles.content, contentStyle]}>
                        {/* Ese paddingTop: 90 es solo para el primer elemento de mi scrollview */}
                        <View style={[{paddingTop: 90}]}>
                            {
                                parrafos.map((x,i,a) => 
                                    <Parrafo
                                        key={i}
                                        text={x}
                                        index={i}
                                        isAnimated={pagingEnabled}
                                    />
                                )
                            }
                        </View>
                    </Animated.View>
                </Animated.ScrollView>
            </View>
            <SafeAreaView style={{flex: 0, backgroundColor: '#fff', zIndex: 10}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    scroll: {
        height: 'auto',
        alignSelf: 'stretch',
    },
    content: {
        height: 'auto',
        width: '100%',
        paddingHorizontal: 22
    },
    info: {
        height: 'auto',
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10
    }
})