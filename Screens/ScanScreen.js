import React from 'react'
import {Text,View,TouchableOpacity, StyleSheet, Image} from 'react-native'
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }
    getCameraPermissions=async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status==='granted',
        })
       }
       handleBarCodeScanned=async({type,data}) => {
        this.setState({
            scanned: true,
            scannedData:data,
            buttonState:this.state.buttonState,
        })
        }
        render() {
            const hasCameraPermissions = this.state.hasCameraPermissions
            const scanned = this.state.scanned
            const buttonState = this.state.buttonState
            if(buttonState === 'clicked'&& hasCameraPermissions){
                return(
                    <BarCodeScanner 
                    onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                    style = {Stylesheet.absoluteFillObject}
                    />
                )
            }
            else if (buttonState==='normal'){
    
            return (
                <View style = {{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style = {styles.displayText}>
                        {hasCameraPermissions === true ? this.state.scannedData: 'Please provide the access to the camera!'}
                    </Text>
                    <TouchableOpacity style= {styles.scanButton} 
                    onPress={this.getCameraPermissions}>
                        <Text style = {styles.buttonText}>
                           Please put the food item under here!
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
      }
}
const styles = StyleSheet.create({
    scanButton:{
        backgroundColor: 'red',
        padding:10,
        margin:10,
    },
    buttonText:{
        fontSize:15,
        fontWeight:'bold'
    },
    displayText:{
        fontSize:10,
        textDecorationLine: 'underline',
        color: "blue"
    }
})