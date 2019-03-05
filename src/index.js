import React from "react";
import {
    StyleSheet,
    View,
    ViewPropTypes,
    Text,
    Animated,
    PanResponder,
    TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    sliderContainer: {
        backgroundColor: "transparent",
        overflow: "hidden",
        position: "relative",
        flex: 1,
    },
    controlsWrapperStyle: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "space-between",
        right: 0,
        bottom: 0,
        padding: 10
    },
    dotsWrapperStyle: {
        alignItems: "center",
        justifyContent: "center"
    },
    activeDotStyle: {
        backgroundColor: '#007aff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    dotStyle: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    prevButtonStyle: {
        color: '#777777'
    },
    nextButtonStyle: {
        color: '#007aff'
    },
});

export default class Swiper extends React.Component {
    state = {
        width: 0,
        height: 0,
        activeIndex: 0,
        pan: new Animated.ValueXY(),
    };

    componentWillMount() {
        this._animatedValueX = 0;
        this._animatedValueY = 0;
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

        this.setState({activeIndex: this.props.index});

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: (e, gestureState) => Math.abs(this.props.direction === "row" ? gestureState.dx : gestureState.dy) > 5,
            onPanResponderGrant: (e, gestureState) => this._fixState(),
            onPanResponderMove: Animated.event([
                null, this.props.direction === "row" ? {dx: this.state.pan.x} : {dy: this.state.pan.y},
            ]),
            onPanResponderRelease: (e, gesture) => {
                const correction = this.props.direction==="row" ? gesture.moveX-gesture.x0 : gesture.moveY-gesture.y0;
                if(Math.abs(correction) < ((this.props.direction==="row" ? this.state.width : this.state.height) * this.props.actionMinWidth))
                    return Animated.spring(this.state.pan,{toValue:{x:0,y:0}}).start();
                this._changeIndex(correction>0);
            }
        });
    }

    componentWillUnmount() {
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
    }

    moveUpDown(down=false) {
        this._fixState();
        this._changeIndex(down);
    }

    _fixState() {
        this._animatedValueX = this.props.direction==="row" ? this.state.width*this.state.activeIndex*-1 : 0;
        this._animatedValueY = this.props.direction==="row" ? 0 : this.state.height*this.state.activeIndex*-1;
        this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
        this.state.pan.setValue({x: 0, y: 0});
    }

    _changeIndex(decrement=false) {
        let move = {x:0,y:0};
        if((this.state.activeIndex<=0 && decrement) || (!decrement && this.state.activeIndex+1>=this.count))
            return Animated.spring(this.state.pan,{toValue:move}).start();
        let index = !decrement ? this.state.activeIndex+1 : this.state.activeIndex-1;
        this.setState({activeIndex: index});
        if(this.props.direction==="row")
            move.x = decrement ? this.state.width : this.state.width*-1;
        else
            move.y = decrement ? this.state.height : this.state.height*-1;
        Animated.spring(this.state.pan,{toValue:move}).start();
        if(!!this.props.onIndexChanged) this.props.onIndexChanged(index);
    }

    _onLayout(event) {
        const {width,height} = event.nativeEvent.layout;
        this.setState({width,height}, () => this._fixState());
    }

    render() {
        const {pan,width,height,activeIndex} = this.state;
        const {
            direction,
            containerStyle,
            swipeAreaStyle,
            swipeWrapperStyle,
            controlsWrapperStyle,
            dotsWrapperStyle,
            dotElement,
            dotStyle,
            activeDotElement,
            activeDotStyle,
            prevButtonElement,
            prevButtonStyle,
            prevButtonText,
            nextButtonElement,
            nextButtonStyle,
            nextButtonText,
        } = this.props;
        let {children} = this.props;
        if(!Array.isArray(children)) children = [children];
        this.count = children.length;
        return (
            <View style={[styles.container,containerStyle]} onLayout={this._onLayout.bind(this)}>
                <View style={[styles.sliderContainer,swipeAreaStyle]}>
                    <Animated.View
                        style={[{
                            position: "relative",
                            top: 0,
                            left: 0,
                        },swipeWrapperStyle,{
                            flexDirection: direction,
                            width: direction==="row" ? width*this.count : width,
                            height: direction==="row" ? height : height*this.count,
                        },{transform:[{translateX:pan.x},{translateY:pan.y}]}]}
                        {...this._panResponder.panHandlers}
                    >
                        {children.map((el,i)=>(<View key={i} style={{width,height}}>{el}</View>))}
                    </Animated.View>
                    <View style={[styles.controlsWrapperStyle,{
                        flexDirection: direction,
                    }, direction==="row" ? {left: 0} : {top: 0}, controlsWrapperStyle]}>
                        <TouchableOpacity disabled={!activeIndex} style={{opacity:!activeIndex ? 0 : 1}} onPress={()=>this.moveUpDown(true)}>
                            {prevButtonElement || <Text style={[styles.prevButtonStyle,prevButtonStyle]}>{prevButtonText}</Text>}
                        </TouchableOpacity>
                        <View style={[{flexDirection:direction},styles.dotsWrapperStyle,dotsWrapperStyle]}>
                            {children.map((el,i)=>(
                                <View key={i}>
                                    {i===activeIndex
                                        ? activeDotElement || <View style={[styles.activeDotStyle,activeDotStyle]} />
                                        : dotElement || <View style={[styles.dotStyle,dotStyle]} />}
                                </View>
                            ))}
                        </View>
                        <TouchableOpacity disabled={activeIndex+1>=this.count} style={{opacity:activeIndex+1>=this.count ? 0 : 1}} onPress={()=>this.moveUpDown()}>
                            {nextButtonElement || <Text style={[styles.nextButtonStyle,nextButtonStyle]}>{nextButtonText}</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

Swiper.propTypes = {
    direction: PropTypes.oneOf(["row","column"]),
    index: PropTypes.number,
    onIndexChanged: PropTypes.func,
    actionMinWidth: PropTypes.number,
    children: PropTypes.node.isRequired,
    containerStyle: ViewPropTypes.style,
    swipeAreaStyle: ViewPropTypes.style,
    swipeWrapperStyle: ViewPropTypes.style,
    controlsWrapperStyle: ViewPropTypes.style,
    dotsWrapperStyle: ViewPropTypes.style,
    dotStyle: ViewPropTypes.style,
    dotElement: PropTypes.element,
    activeDotStyle: ViewPropTypes.style,
    activeDotElement: PropTypes.element,
    prevButtonStyle: Text.propTypes.style,
    prevButtonElement: PropTypes.element,
    prevButtonText: PropTypes.string,
    nextButtonStyle: Text.propTypes.style,
    nextButtonElement: PropTypes.element,
    nextButtonText: PropTypes.string,
};

Swiper.defaultProps = {
    direction: "row",
    index: 0,
    actionMinWidth: 0.35,
    prevButtonText: "prev",
    nextButtonText: "next",
};
