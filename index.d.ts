import * as React from 'react';
import {
    ViewStyle,
    TextStyle,
    StyleProp,
} from 'react-native';

type Falsy = undefined | null | false;
interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}
/** Keep a brand of 'T' so that calls to `StyleSheet.flatten` can take `RegisteredStyle<T>` and return `T`. */
type RegisteredStyle<T> = number & { __registeredStyleBrand: T };

export type SwiperControlsCorners =
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'left'
    | 'center'
    | 'right'
    | 'bottom-left'
    | 'bottom'
    | 'bottom-right';

// TODO: optimize
interface SwiperControlsCellsStyle {
    'top-left'?: StyleProp<ViewStyle>;
    top?: StyleProp<ViewStyle>;
    'top-right'?: StyleProp<ViewStyle>;
    left?: StyleProp<ViewStyle>;
    center?: StyleProp<ViewStyle>;
    right?: StyleProp<ViewStyle>;
    'bottom-left'?: StyleProp<ViewStyle>;
    bottom?: StyleProp<ViewStyle>;
    'bottom-right'?: StyleProp<ViewStyle>;
}
interface SwiperControlsCellsContent {
    'top-left'?: React.ReactElement<{}>;
    top?: React.ReactElement<{}>;
    'top-right'?: React.ReactElement<{}>;
    left?: React.ReactElement<{}>;
    center?: React.ReactElement<{}>;
    right?: React.ReactElement<{}>;
    'bottom-left'?: React.ReactElement<{}>;
    bottom?: React.ReactElement<{}>;
    'bottom-right'?: React.ReactElement<{}>;
}

export interface BadgeProps {
    /**
     * Text value to be displayed by badge
     *
     * @default null
     */
    value?: React.ReactNode;

    /**
     * Additional styling for badge (background) view component
     */
    badgeStyle?: StyleProp<ViewStyle>;

    /**
     * Style for the container
     */
    containerStyle?: StyleProp<ViewStyle>;

    /**
     * Style for the text in the badge
     */
    textStyle?: StyleProp<TextStyle>;

    /**
     * Custom component to replace the badge component
     *
     * @default View (if onPress then TouchableOpacity)
     */
    Component?: React.ComponentClass;

    /**
     * Determines color of the indicator
     *
     * @default primary
     */
    status?: 'primary' | 'success' | 'warning' | 'error';

    /**
     * Function called when pressed on the badge
     */
    onPress?(): void;
}

interface SwiperControlsProps {
    /**
     * Controls corners placeholders styles
     */
    cellsStyle?: SwiperControlsCellsStyle;

    /**
     * Controls corners placeholders additional content
     */
    cellsContent?: SwiperControlsCellsContent;

    /**
     * Dots position
     *
     * @default 'bottom' | 'right' if vertical
     */
    dotsPos?: SwiperControlsCorners | boolean;

    /**
     * Prev button position
     *
     * @default 'bottom-left' | 'top-right' if vertical
     */
    prevPos?: SwiperControlsCorners | boolean;

    /**
     * Next button position
     *
     * @default 'bottom-right'
     */
    nextPos?: SwiperControlsCorners | boolean;

    /**
     * Prev button title
     *
     * @default Prev
     */
    prevTitle?: string;

    /**
     * Next button title
     *
     * @default Next
     */
    nextTitle?: string;

    /**
     * Touches over dots will move swiper to relative slide
     *
     * @default false
     */
    dotsTouchable?: boolean;

    /**
     * Dots wrapper View style
     */
    dotsWrapperStyle?: StyleProp<ViewStyle>;

    /**
     * Customizing dot with Badge props
     */
    dotProps?: BadgeProps;

    /**
     * Additional style to active dot
     */
    dotActiveStyle?: StyleProp<ViewStyle>;

    /**
     * Custom dot component
     */
    DotComponent?: React.ComponentType;

    /**
     * Customize prev button title
     */
    prevTitleStyle?: StyleProp<TextStyle>;

    /**
     * Customize next button title
     */
    nextTitleStyle?: StyleProp<TextStyle>;

    /**
     * Custom prev button component
     */
    PrevComponent?: React.ComponentClass;

    /**
     * Custom next button component
     */
    NextComponent?: React.ComponentClass;

    /**
     * Custom prev element on first slide (if not loop)
     */
    firstPrevElement?: React.ReactElement<{}>;

    /**
     * Custom next element on last slide (if not loop)
     */
    lastNextElement?: React.ReactElement<{}>;
}

// TODO: extends Animated.SpringAnimationConfig but without toValue
interface SwiperSpringAnimationConfig {
    overshootClamping?: boolean;
    restDisplacementThreshold?: number;
    restSpeedThreshold?: number;
    velocity?: number | { x: number; y: number };
    bounciness?: number;
    speed?: number;
    tension?: number;
    friction?: number;
    stiffness?: number;
    mass?: number;
    damping?: number;
}

export interface SwiperProps {
    /**
     * Swiper vertical layout
     *
     * @default false
     */
    vertical?: boolean;

    /**
     * Initial slide index
     *
     * @default 0
     */
    from?: number;

    /**
     * Allow loop
     *
     * @default false
     */
    loop?: boolean;

    /**
     * Autoplay slider timeout in secs. Negative value will play reverse
     *
     * @default 0 (autoplay disabled)
     */
    timeout?: number;

    /**
     * Should the swiper's swiping gesture be enabled?
     *
     * @default true
     */
    gesturesEnabled?: () => boolean;

    /**
     * Tune spring animation on autoplay, touch release or slides changes via buttons
     */
    springConfig?: SwiperSpringAnimationConfig;

    /**
     * Initiate animation after swipe this distance.
     * It fix gesture collisions inside ScrollView
     *
     * @default 5
     */
    minDistanceToCapture?: number;

    /**
     * Minimal part of swiper width (or height for vertical) must be swiped
     * for changing index. Otherwise animation restore current slide.
     * Default value 0.2 means that 20% must be swiped for change index
     *
     * @default 0.2
     */
    minDistanceForAction?: number;

    /**
     * Swiper inner container position 'fixed' instead 'relative'.
     * Fix mobile safari vertical bounces
     *
     * @default false
     */
    positionFixed?: boolean;

    /**
     * Outer (root) container style
     */
    containerStyle?: StyleProp<ViewStyle>;

    /**
     * Inner container style
     */
    innerContainerStyle?: StyleProp<ViewStyle>;

    /**
     * Swipe area style
     */
    swipeAreaStyle?: StyleProp<ViewStyle>;

    /**
     * Each slide wrapper style
     */
    slideWrapperStyle?: StyleProp<ViewStyle>;

    /**
     * Dots and control buttons enabled
     *
     * @default true
     */
    controlsEnabled?: boolean;

    /**
     * Controls Properties
     */
    controlsProps?: SwiperControlsProps;

    /**
     * Custom controls component
     */
    Controls?: React.ComponentClass;

    /**
     * Any swiper animation start
     *
     * @param currentIndex
     */
    onAnimationStart?(currentIndex: number): void;

    /**
     * Any swiper animation end
     *
     * @param index
     */
    onAnimationEnd?(index: number): void;

    /**
     * Called when active index changed
     *
     * @param index
     */
    onIndexChanged?(index: number): void;
}

/**
 * Swiper component
 */
export default class Swiper extends React.Component<SwiperProps, any> {
    /**
     * Go to next slide
     */
    goToNext(): void;

    /**
     * Go to previous slide
     */
    goToPrev(): void;

    /**
     * Go to slide by index
     */
    goTo(index: number): void;

    /**
     * Get current slide index
     */
    getActiveIndex(): number;

    /**
     * Manual start autoplay after manual stop
     */
    startAutoplay(): void;

    /**
     * Manual stop autoplay. Will be automatically restarted after any animation
     */
    stopAutoplay(): void;
}
