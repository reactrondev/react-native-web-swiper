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
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
            activeIndex: props.index,
            pan: new Animated.ValueXY(),
        };

        this._animatedValueX = 0;
        this._animatedValueY = 0;

        this._panResponder = PanResponder.create({
            onPanResponderTerminationRequest: () => false,
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: (e, gestureState) => {
                if(this.props.onAnimationStart)
                    this.props.onAnimationStart();
                const allow = Math.abs(this.props.direction === "row" ? gestureState.dx : gestureState.dy) > 5;
                if(allow) this.stopAutoplay();
                return allow;
            },
            onPanResponderGrant: (e, gestureState) => this._fixState(),
            onPanResponderMove: Animated.event([
                null, this.props.direction === "row" ? {dx: this.state.pan.x} : {dy: this.state.pan.y},
            ]),
            onPanResponderRelease: (e, gesture) => {
                const correction = this.props.direction==="row" ? gesture.moveX-gesture.x0 : gesture.moveY-gesture.y0;
                this.startAutoplay();
                if(Math.abs(correction) < ((this.props.direction==="row" ? this.state.width : this.state.height) * this.props.actionMinWidth))
                    return Animated.spring(this.state.pan,{toValue:{x:0,y:0}}).start(() => {
                        if(this.props.onAnimationEnd)
                            this.props.onAnimationEnd(this.state.activeIndex);
                    });
                this._changeIndex(correction>0 ? -1 : 1);
            }
        });
    }

    componentDidMount() {
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);
        this.startAutoplay();
    }

    componentWillUnmount() {
        this.stopAutoplay();
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
    }

    startAutoplay() {
        this.stopAutoplay();
        if(!!this.props.autoplayTimeout) {
            this.autoplay = setTimeout(() => {
                this.moveUpDown(this.props.autoplayTimeout<0)
            }, Math.abs(this.props.autoplayTimeout)*1000);
        }
    }

    stopAutoplay() {
        if(!!this.autoplay)
            clearTimeout(this.autoplay);
    }

    moveUpDown(down=false) {
        this._fixState();
        if(this.props.onAnimationStart)
            this.props.onAnimationStart();
        this._changeIndex(down ? -1 : 1);
    }

    _fixState() {
        this._animatedValueX = this.props.direction==="row" ? this.state.width*this.state.activeIndex*-1 : 0;
        this._animatedValueY = this.props.direction==="row" ? 0 : this.state.height*this.state.activeIndex*-1;
        this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
        this.state.pan.setValue({x: 0, y: 0});
    }

    _changeIndex(delta=1) {
        let move = {x:0,y:0};
        let skipChanges = (!delta);
        let calcDelta = delta;
        if(this.state.activeIndex<=0 && delta<0) {
            skipChanges = (!this.props.loop);
            calcDelta = this.count+delta;
        } else if(this.state.activeIndex+1>=this.count && delta>0) {
            skipChanges = (!this.props.loop);
            calcDelta = -1*this.state.activeIndex+delta-1;
        }
        if(skipChanges)
            return Animated.spring(this.state.pan,{toValue:move}).start(() => {
                if(this.props.onAnimationEnd)
                    this.props.onAnimationEnd(this.state.activeIndex);
            });
        this.stopAutoplay();
        let index = this.state.activeIndex+calcDelta;
        this.setState({activeIndex: index});
        if(this.props.direction==="row")
            move.x = this.state.width*-1*calcDelta;
        else
            move.y = this.state.height*-1*calcDelta;
        Animated.spring(this.state.pan,{toValue:move}).start(() => {
            if(this.props.onAnimationEnd)
                this.props.onAnimationEnd(index);
        });
        this.startAutoplay();
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
            loop,
        } = this.props;
        if(!width) return (<View style={[styles.container,containerStyle]} onLayout={this._onLayout.bind(this)}/>);
        const overRangeButtonsOpacity = !loop ? this.props.overRangeButtonsOpacity : this.props.overRangeButtonsOpacity || 1;
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
                        <View style={{opacity:!activeIndex ? overRangeButtonsOpacity : 1}}>
                            <TouchableOpacity disabled={!activeIndex && !loop} onPress={()=>this.moveUpDown(true)}>
                                {prevButtonElement || <Text style={[styles.prevButtonStyle,prevButtonStyle]}>{prevButtonText}</Text>}
                            </TouchableOpacity>
                        </View>
                        <View style={[{flexDirection:direction},styles.dotsWrapperStyle,dotsWrapperStyle]}>
                            {children.map((el,i)=>(
                                <View key={i}>
                                    {i===activeIndex
                                        ? activeDotElement || <View style={[styles.activeDotStyle,activeDotStyle]} />
                                        : dotElement || <View style={[styles.dotStyle,dotStyle]} />}
                                </View>
                            ))}
                        </View>
                        <View style={{opacity:activeIndex+1>=this.count ? overRangeButtonsOpacity : 1}}>
                            <TouchableOpacity disabled={activeIndex+1>=this.count && !loop} onPress={()=>this.moveUpDown()}>
                                {nextButtonElement || <Text style={[styles.nextButtonStyle,nextButtonStyle]}>{nextButtonText}</Text>}
                            </TouchableOpacity>
                        </View>
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
    onAnimationStart: PropTypes.func,
    onAnimationEnd: PropTypes.func,
    actionMinWidth: PropTypes.number,
    children: PropTypes.node.isRequired,
    overRangeButtonsOpacity: PropTypes.number,
    loop: PropTypes.bool,
    autoplayTimeout: PropTypes.number,
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
    actionMinWidth: 0.25,
    overRangeButtonsOpacity: 0,
    loop: false,
    autoplayTimeout: 0,
    prevButtonText: "prev",
    nextButtonText: "next",
};
