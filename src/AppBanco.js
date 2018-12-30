import React, {Component} from 'react';
import {AppRegistry,  View, ToastAndroid, LayoutAnimation,TouchableOpacity, Picker, Slider, Text, Button, CheckBox, Switch, TextInput, StyleSheet} from 'react-native';

export default class AppBanco extends Component { 
    constructor(props) { 
      super(props); 
      this.state = { 
          moneda:1, 
          capitalInicial:0, 
          capitalFinal:0,
		  dias:10,
		  contacto : 'gisel@mail.com',
		  aceptoTerminos:false,
		  avisar: true,
		  error:false,
		  tvMensaje:''
        }; 
        this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this); 
    } 
 
    hacerPlazoFijo(){ 
	
	if(this.state.dias<=10){
            this.state.error =true;
            this.state.tvMensaje = this.state.tvMensaje + 'La cantidad de días Seleccionados debe ser superior a 10';
        }
        ToastAndroid.show(this.state.tvMensaje,ToastAndroid.LONG); 
    } 
	
	
       
    render() { 
      return ( 
        <View style={styles.container}>
		<Text>Correo Electronico</Text>
		<TextInput 
			 style={{height: 40}}
			 multiline = {false}
			 numberOfLines = {1}
			 value={this.state.contacto}
			 onChangeText={(valor) => this.setState({contacto:valor})}
			 textContentType={'emailAddress'}/>
			 <Text>CUIT</Text>        
            <TextInput 
			 style={{height: 40}}
			 multiline = {false}
			 numberOfLines = {1}
			 value={this.state.cuit}
			 onValueChange={(valor) => this.setState({cuit:valor})}
			 keyboardType={'numeric'}/>
			 <Text>Moneda</Text>
			 <Picker 
                style={{width: 200}}  
                selectedValue={this.state.moneda} 
                onValueChange={(valor) => this.setState({moneda:valor})}> 
                <Picker.Item label="Dolar" value="1" /> 
                <Picker.Item label="Pesos ARS" value="2" /> 
            </Picker>
			<Text>Monto</Text>
			<TextInput
			 style={{height: 40}}
			 multiline = {false}
			 numberOfLines = {1}
			 value={this.state.capitalInicial}
			 onValueChange={(valor) => this.setState({capitalInicial:valor})}
			 keyboardType={'numeric'}/>
			 <Text>Dias</Text> 
            <Slider 
			style={{width: 150, height: 50}}
			step={1}
			minimumValue={10}
            maximumValue={360}
			onValueChange={(valor) => this.setState({dias:valor})}/> 
            <Text>{this.state.dias} dias</Text>
			<Text>Avisar por mail</Text>
			<Switch
			value={this.state.avisar}
			onValueChange={()=>{this.setState({avisar:!this.state.avisar})}}/>
			<View style={{ flexDirection: 'row' }}>
			<CheckBox
			 value={this.state.aceptoTerminos}
			 onValueChange={()=>{this.setState({aceptoTerminos:!this.state.aceptoTerminos})}}
			 aceptoTerminos={this.state.aceptoTerminos}/>
			 <Text style={{marginTop: 5}}>Acepto Terminos y Condiciones</Text>
			 </View> 
            <Button title="Hacer Plazo Fijo" 
                color="#FF0000" 
                onPress={this.hacerPlazoFijo}> 
            </Button> 
            <Text>{this.state.capitalFinal}</Text> 
        </View> 
      ); 
    }  
} 
const styles = StyleSheet.create({ 
    container: { 
      flex: 1, 
      flexDirection: 'column', 
      justifyContent: 'flex-start', 
      alignItems: 'flex-start', 
      backgroundColor: '#F5FCFF', 
    }, 
    welcome: { 
      fontSize: 20, 
      textAlign: 'center', 
      margin: 10, 
    }, 
    instructions: { 
      textAlign: 'center', 
      color: '#333333', 
      marginBottom: 5, 
    }, 
  }); 
  
  
AppRegistry.registerComponent('lab07', () => AppBanco);