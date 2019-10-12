import React from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    AsyncStorage,
    Alert,
    Image,
    Text,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView
} from 'react-native';

import { url } from '../util';
import axios from 'axios';

import logo from '../../assets/logo.png';

export default class Login extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTransparent: true
    });

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            login: 'alex',
            senha: '123',
            loading: false
        };

    }

    render() {

        if (this.state.loading) {
            return (
                <View style={[styles.container, styles.loading]}>
                    <Image
                        source={require('../../assets/loading.gif')}
                        style={[styles.loading, { width: 300, height: 300 }]}
                    />
                </View>
            );
        } return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled >

                <Image source={logo} style={styles.logo} />
                <Text style={[{ fontSize: 50, height: 60 }]}>driver now</Text>

                <View style={styles.form}>
                    <Text style={styles.label}>LOGIN *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Seu login"
                        placeholderTextColor="#999"
                        keyboardType="email-address" // especifica que é um input de e-mail, teclado de e-mail com @ incluso.
                        autoCapitalize="none" // não permitir que já se inicie texto com caixa alta.
                        autoCorrect={false} //não permitir fazer correção do texto      
                        value={this.state.login}
                        onChangeText={(login) => this.setState({ login })}
                    />

                    <Text style={styles.label}>SENHA *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Sua senha"
                        placeholderTextColor="#999"
                        autoCorrect={false} //não permitir fazer correção do texto
                        secureTextEntry={true}
                        value={this.state.senha}
                        onChangeText={(senha) => this.setState({ senha })}
                    />

                    <TouchableOpacity style={styles.button} onPress={this.validacaoLogin.bind(this)}>
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>

                </View>

                {/*
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
                    <Text />*/}

            </KeyboardAvoidingView>
        );
    }

    async validacaoLogin() {

        if (this.state.login == null || this.state.senha == null || this.state.login == '' || this.state.senha == '') {
            //Alert.alert('Login/Senha é obrigatório.');
            //console.log('Login/Senha é obrigatório.');

            ToastAndroid.showWithGravityAndOffset(
                'Login/Senha é obrigatório.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );

        } else {
            this.setState({ loading: true });

            await axios.get(url + 'usuarios/' + this.state.login + '/' + this.state.senha)
                .then((response) => {
                    this.setState({ data: response.data, loading: false });
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

                            if (this.state.login == this.state.data[i].login && this.state.senha == this.state.data[i].senha) {

                                AsyncStorage.setItem('userToken', 'abc');
                                this.props.navigation.navigate('Home');
                                //this.props.navigation.navigate('VeiculoComponent');

                                //Alert.alert('Usuário válido!\nLogin: ' + this.state.login);
                                console.log('Usuário válido. Login: ' + this.state.login);

                                ToastAndroid.showWithGravityAndOffset(
                                    //'Usuário válido.',
                                    'Seja bem-vindo: ' + this.state.login,
                                    ToastAndroid.LONG,
                                    ToastAndroid.BOTTOM,
                                    25,
                                    50,
                                );

                                this.setState({ loading: false });

                            }

                        }
                    }

                    console.log('Acabou o método.');
                })
                .catch((error) => {
                    console.error(error);
                    Alert.alert(`Base Offline.`);
                });
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
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 20,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#16164E', //'#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    logo: {
        width: 300,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    }
    /*
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
    */
});