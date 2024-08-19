import ScrollIndicator from './ScrollIndicator'
import Animated from 'react-native-reanimated'
import {useScrollIndicator} from '../hooks'

export default ({children, pagingEnabled, indicator = true, color = '#2874a6'}) => {

    const {handleLayout, handleContentSizeChange, scrollHandler, containerStyles, indicatorHeight,  translateStyles} = useScrollIndicator()

    return(
        <>
            {
                indicator
                &&
                    <ScrollIndicator
                        containerStyles={containerStyles}
                        indicatorHeight={indicatorHeight}
                        translateStyles={translateStyles}
                        color={color}
                    />
            }
            <Animated.ScrollView
                pagingEnabled={pagingEnabled}
                bounces={false}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                style={{height: 'auto', alignSelf: 'stretch'}}
                onContentSizeChange={handleContentSizeChange}
                onLayout={handleLayout}
            >
                {children}
            </Animated.ScrollView>
        </>
    )
}