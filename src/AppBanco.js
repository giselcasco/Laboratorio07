import React, {Component} from 'react';
import {AppRegistry,  View, ToastAndroid, LayoutAnimation,TouchableOpacity, Picker, Slider, Text, Button, CheckBox, Switch, TextInput, StyleSheet} from 'react-native';

export default class AppBanco extends Component { 
    constructor(props) { 
      super(props); 
      this.state = { 
          moneda:1, 
          capitalInicial:0, 
          interesResult:0,
		  dias:10,
		  contacto : 'gisel@mail.com',
		  aceptoTerminos:false,
		  avisar: true,
		  error:false,
		  tvMensaje:'',
		  info:'',
		  cuit:0,
		  valorTasa:0
        }; 
        this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this); 		
		this.intereses = this.intereses.bind(this); 
    } 
	
	
	intereses(){
		if(this.state.dias< 30 && this.state.capitalInicial <=5000) this.setState({valorTasa:25});
        if(this.state.dias>= 30 && this.state.capitalInicial <=5000) this.setState({valorTasa:27.5});
        if(this.state.dias< 30 && this.state.capitalInicial >5000 && this.state.capitalInicial<=99999) this.setState({valorTasa:30});
        if(this.state.dias>= 30 && this.state.capitalInicial >5000 && this.state.capitalInicial<=99999) this.setState({valorTasa:32.3});
        if(this.state.dias< 30 && this.state.capitalInicial >99999) this.setState({valorTasa:35});
        if(this.state.dias>= 30 && this.state.capitalInicial >99999) this.setState({valorTasa:38.5});
		var mat = this.state.capitalInicial*(Math.pow(parseFloat((this.state.valorTasa*0.01)+ 1),parseFloat(this.state.dias/360))-1);
        this.setState({interesResult:mat});
	}
	
    hacerPlazoFijo(){ 
	if(this.state.aceptoTerminos){
		var infoAux='';
		this.state.info='';
		this.state.tvMensaje = '';
		this.state.error =false;
		if(this.state.dias<=10){
				this.state.error =true;
				this.state.tvMensaje = this.state.tvMensaje + 'La cantidad de días Seleccionados debe ser superior a 10';
			}
		if(this.state.capitalInicial <=0){
				this.state.error =true;
				this.state.tvMensaje = this.state.tvMensaje + ' - El Monto a Invertir no puede ser nulo' + this.state.capitalInicial;
			}
		if(this.state.contacto.length<=0){
				 this.state.error =true;
				this.state.tvMensaje = this.state.tvMensaje + ' - Debe ingresar un Email';
			}
		if(this.state.cuit<=0 ){
				this.state.error =true;
				this.state.tvMensaje = this.state.tvMensaje + ' - Debe ingresar un CUIT/CUIL' + this.state.cuit;
			}
		if(!this.state.error){
			this.state.tvMensaje =  'El Plazo Fijo se Realizo Exitosamente'
            infoAux='Plazo Fijo { Días: '+ this.state.dias + ', Monto: '+ this.state.capitalInicial + ', Moneda: ';
		    if(this.state.moneda==1){
			     infoAux = infoAux + 'Dolar';
		    }
			else{
				 infoAux = infoAux +'Pesos ARS';
			}
			if(this.state.avisar){
				 infoAux = infoAux + ' - Avisar Por Email';
			}
			this.setState({info:infoAux});
		}
		}
		else{
			this.setState({tvMensaje:'Debe Aceptar los Terminos y Condiciones para Acceder a un Plazo Fijo'});
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
			 onChangeText={(valor) => this.setState({cuit:valor})}
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
			 onChangeText={(valor) => this.setState({capitalInicial:valor})}
			 keyboardType={'numeric'}/>
		<Text>Dias</Text> 
        <Slider 
			style={{width: 250, height: 50}}
			step={1}
			minimumValue={10}
            maximumValue={90}
			onValueChange={(valor) => this.setState({dias:valor})}
			onSlidingComplete={this.intereses}/> 
        <Text>{this.state.dias} dias</Text>
		<Text>$ {this.state.interesResult}</Text>
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
        <Text>[[{this.state.info}]]</Text> 
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