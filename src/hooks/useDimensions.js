
import {useDispatch} from "react-redux";
import {setBottomDimensions, setDimensions, setTopDimensions} from "../slices/appSlice";

export default () => {
  
    const dispatch = useDispatch()

    const onLayout = ({nativeEvent: {layout: {width, height}}}) => dispatch(setDimensions({width, height}));
    const onLayoutSafeAreaTop = ({nativeEvent: {layout: {width, height}}}) => dispatch(setTopDimensions({topWidth: width, topHeight: height}));
    const onLayoutSafeAreaBottom = ({nativeEvent: {layout: {width, height}}}) => dispatch(setBottomDimensions({bottomWidth: width, bottomHeight: height}));
    
    return {
        onLayout,
        onLayoutSafeAreaTop,
        onLayoutSafeAreaBottom,
    }
}