import React from "react";
import {View,Text} from "react-native";
import Swiper from "./swiper";

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Swiper index={1}>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(20,20,200,0.3)"}}>
                            <Text>Slider 1</Text>
                        </View>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(20,200,20,0.3)"}}>
                            <Text>Slider 2</Text>
                        </View>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(200,20,20,0.3)"}}>
                            <Text>Slider 3</Text>
                        </View>
                    </Swiper>
                </View>
                <View style={{flex:1}}>
                    <Swiper direction={"column"}>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(20,20,200,0.3)"}}>
                            <Text>Slider 1</Text>
                        </View>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(20,200,20,0.3)"}}>
                            <Text>Slider 2</Text>
                        </View>
                        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"rgba(200,20,20,0.3)"}}>
                            <Text>Slider 3</Text>
                        </View>
                    </Swiper>
                </View>
            </View>
        )
    }
}