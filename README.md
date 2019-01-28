# react-native-web-swiper

Simple swiper / slider. Works both on React-Native and React-Native-Web.

### Demo

Native: https://snack.expo.io/@oxyii/react-native-web-swiper

Web: https://oxyii.github.io/react-native-web-swiper

### Installation

```bash
$ npm i react-native-web-swiper --save
```

### Basic Usage

```jsx
import React from "react";
import {View,Text,StyleSheet} from "react-native";
import Swiper from "react-native-web-swiper";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    slideContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    slide1: {
        backgroundColor: "rgba(20,20,200,0.3)"
    },
    slide2: {
        backgroundColor: "rgba(20,200,20,0.3)"
    },
    slide3: {
        backgroundColor: "rgba(200,20,20,0.3)"
    },
});

export default class Screen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Swiper>
                    <View style={[styles.slideContainer,styles.slide1]}>
                        <Text>Slide 1</Text>
                    </View>
                    <View style={[styles.slideContainer,styles.slide2]}>
                        <Text>Slide 2</Text>
                    </View>
                    <View style={[styles.slideContainer,styles.slide3]}>
                        <Text>Slide 3</Text>
                    </View>
                </Swiper>
            </View>
        )
    }
}
```

### Loop? AutoPlay?

No. Just per-screen slider / swiper

### Properties

#### Basic

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| direction | `"row"` | `enum("row","column")` | Horizontal ("row") or vertical ("column") mode |
| index | `0` | `number` | Index number of initial slide |
| onIndexChanged | `(newIndex) => null` | `func` | Called when active slide changed |
| actionMinWidth | `0.35` | `number` | Minimal part of screen that must be swiped for index change. Default value 0.35 means 35% of slide width (or height if direction="column") |

#### Custom style

Swiper has the following structure

```jsx
<View style={containerStyle}>
    <View style={swipeAreaStyle}>
        <View style={swipeWrapperStyle}>
            ...
        </View>
        <View style={controlsWrapperStyle}>
            {prevButtonElement || <Text style={prevButtonStyle}>{prevButtonText}</Text>}
            <View style={dotsWrapperStyle}>
                {dotElement || <View style={dotStyle}/>}
                //or
                {activeDotElement || <View style={activeDotStyle}/>}
            </View>
            {nextButtonElement || <Text style={nextButtonStyle}>{nextButtonText}</Text>}
        </View>    
    </View>
</View>
```

You can override any style

| Prop  | Type |
| :------------ | :---------------:|
| prevButtonElement | `element` |
| prevButtonStyle | `style` |
| prevButtonText | `string` |
| nextButtonElement | `element` |
| nextButtonStyle | `style` |
| nextButtonText | `string` |
| containerStyle | `style` |
| swipeAreaStyle | `style` |
| swipeWrapperStyle | `style` |
| controlsWrapperStyle | `style` |
| dotsWrapperStyle | `style` |
| dotElement | `element` |
| dotStyle | `style` |
| activeDotElement | `element` |
| activeDotStyle | `style` |
