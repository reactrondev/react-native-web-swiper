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
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-web-swiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide1: {
    backgroundColor: 'rgba(20,20,200,0.3)',
  },
  slide2: {
    backgroundColor: 'rgba(20,200,20,0.3)',
  },
  slide3: {
    backgroundColor: 'rgba(200,20,20,0.3)',
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
    );
  }
}
```

### Empty white screen on web

See [here](https://github.com/oxyii/react-native-web-swiper/issues/2#issuecomment-475060133)

### Properties

#### Basic

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| direction | `"row"` | `enum("row","column")` | Horizontal ("row") or vertical ("column") mode |
| index | `0` | `number` | Index number of initial slide |
| onIndexChanged | `(newIndex) => null` | `func` | Called when active slide changed |
| onAnimationStart | `() => null` | `func` | Called right before any swiper animation starts |
| onAnimationEnd | `(newIndex) => null` | `func` | Called right after animation end |
| actionMinWidth | `0.25` | `number` | Minimal part of screen that must be swiped for index change. Default value 0.25 means 25% of slide width (or height if direction="column") |
| overRangeButtonsOpacity | `0` | `number` | "Prev" button on first slide and "Next" button on last slide are invisible by default. You can set `opacity` style for these buttons ([#1](https://github.com/oxyii/react-native-web-swiper/issues/1)) |
| loop | `false` | `bool` | Set to `true` to enable continuous loop mode |
| autoplayTimeout | `0` | `number` | Delay between auto play transitions (in second). Set negative value for reverse autoplay :satisfied:. Autoplay disabled by default |
| swipingEnabled | `true` | `bool` | Set to `false` to disable swiping mechanism. Allow to use Prev / Next buttons only ([#8](https://github.com/oxyii/react-native-web-swiper/issues/8)) |
| buttonsEnabled | `true` | `bool` | Set to `false` to skip dots and Prev / Next buttons. Swiping mechanism will still work |

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
| prevButtonStyle | `Text.propTypes.style` |
| prevButtonText | `string` |
| nextButtonElement | `element` |
| nextButtonStyle | `Text.propTypes.style` |
| nextButtonText | `string` |
| containerStyle | `ViewPropTypes.style` |
| swipeAreaStyle | `ViewPropTypes.style` |
| swipeWrapperStyle | `ViewPropTypes.style` |
| controlsWrapperStyle | `ViewPropTypes.style` |
| dotsWrapperStyle | `ViewPropTypes.style` |
| dotStyle | `ViewPropTypes.style` |
| activeDotStyle | `ViewPropTypes.style` |
| dotElement | `element` |
| activeDotElement | `element` |

### Programmatically jump to a particular slide

Swiper instances have a `goto(index)` and `moveUpDown(isDown = false)` methods. Reference can be used to call this methods:

```jsx
...
<Swiper ref={swiper => this.swiper = swiper}>
  ...
</Swiper>
...
<Text onPress={() => this.swiper && this.swiper.goto(1)}>
  Go to slide 2
</Text>
...
<Text onPress={() => this.swiper && this.swiper.moveUpDown(true)}>
  Go to prev slide
</Text>
...
<Text onPress={() => this.swiper && this.swiper.moveUpDown()}>
  Go to next slide
</Text>
```
