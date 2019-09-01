import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    AsyncStorage,
    Alert,
    Image,
    Text,
    ImageBackground,
    ToastAndroid,
    KeyboardAvoidingView
} from 'react-native';

import { url } from '../util'
import colors from '../styles/colors';

export default class Login extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTransparent: true
    });

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            login: 'alex.silva',
            senha: 'alex.silva',
            loading: false
        };

    }

    render() {

        if (this.state.loading) {
            return (
                <View style={[styles.container, styles.loading]}>
                    <ImageBackground source={{ uri: this.state.imgBack }} style={{
                        width: '100%', height: '100%', alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <Image
                            source={require('../../assets/loading.gif')}
                            style={[styles.loading, { width: 300, height: 300 }]}
                        />

                    </ImageBackground>
                </View>

            );
        } return (
            <View style={[styles.container, { backgroundColor: colors.backgroundGradient }]}>

                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                    <Image
                        source={require('../../assets/logo.png')}
                        style={{
                            width: 300,
                            height: 200,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />

                    <Text style={[{ fontSize: 50, height: 100 }]}>driver now</Text>


                    <TextInput
                        value={this.state.login}
                        onChangeText={(login) => this.setState({ login })}
                        placeholder={'Login'}
                        style={styles.input}
                    />

                    <TextInput
                        value={this.state.senha}
                        onChangeText={(senha) => this.setState({ senha })}
                        placeholder={'Senha'}
                        secureTextEntry={true}
                        style={styles.input}
                    />


                    <Text />
                    <Button
                        title='Entrar'
                        color='#16164E'
                        style={styles.btnEntrar}
                        onPress={this.validacaoLogin.bind(this)}
                    />
                    <Text />

                </KeyboardAvoidingView>

            </View>
        );
    }

    validacaoLogin() {

        if (this.state.login == null || this.state.senha == null || this.state.login == '' || this.state.senha == '') {
            Alert.alert('Login/Senha é obrigatório.');
            //console.log('Login/Senha é obrigatório.');
        } else {
            this.setState({ loading: true });

            /* fetch(url + 'usuarios/' + this.state.login + '/' + this.state.senha)
                 .then((response) => response.json())
                 .then((responseJson) => {
                     this.setState({ data: responseJson, loading: false });
                     console.log('Json login Carregado.');
 
                     console.log('Tamanho da resposta: ' + this.state.data.length);
 
                     if (this.state.data.length == 0) {
                         console.log('A base retornou vazio/null.');
                         //Alert.alert('Usuário inválido.', 'Tente novamente.');
 
                         ToastAndroid.showWithGravityAndOffset(
                             'Usuário inválido.\nTente novamente',
                             ToastAndroid.LONG,
                             ToastAndroid.BOTTOM,
                             25,
                             50,
                         );
 
                     } else {
 
                         for (let i = 0; i < this.state.data.length; i++) {
 */
            //if (this.state.login == this.state.data[i].login && this.state.senha == this.state.data[i].senha) {

            AsyncStorage.setItem('userToken', 'abc');
            this.props.navigation.navigate('Home');
            //this.props.navigation.navigate('VeiculoComponent');

            //Alert.alert('Usuário válido!\nLogin: ' + this.state.login);
            //console.log('Usuário válido. Login: ' + this.state.login);

            ToastAndroid.showWithGravityAndOffset(
                //'Usuário válido.',
                'Seja bem-vindo: ' + this.state.login,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );

            this.setState({ loading: false });

            //}

            /*  }
          }
      
          console.log('Acabou o método.');
      })
                      .catch ((error) => {
          console.error(error);
          Alert.alert(`Base Offline.`);
      });*/
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#16164E',
        color: 'black',
        marginBottom: 10,
        fontSize: 20
    },
    btnEntrar: {
        backgroundColor: 'white'
    }
});