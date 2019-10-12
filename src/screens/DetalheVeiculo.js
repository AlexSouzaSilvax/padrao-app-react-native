import React from 'react';
import {
    View,
    Image,
    Button,
    TextInput,
    Alert,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';

import { Card, CardItem, Text, Left, Body, Right } from 'native-base';

import { url } from '../util'

export default class DetalheVeiculo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.navigation.getParam('data', 'null'),
            id: this.props.navigation.getParam('data', 'null').id,
            img: this.props.navigation.getParam('data', 'null').img,
            nome: this.props.navigation.getParam('data', 'null').nome,
            fabricante: this.props.navigation.getParam('data', 'null').fabricante,
            cor: this.props.navigation.getParam('data', 'null').cor,
            ano: this.props.navigation.getParam('data', 'null').ano,
            valor: this.props.navigation.getParam('data', 'null').valor
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('titulo', 'Novo Veículo')
    });

    componentDidMount() {
        if (this.state.img == null || this.state.img == '') {
            this.setState({ img: 'https://turismotupa.com.br/imagens/semimagem.jpg' });
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ margin: 5 }}  behavior="padding" enabled >


                <CardItem cardBody>
                    <Image source={{ uri: this.state.img }} style={styles.carroImagem} />
                </CardItem>
                
                    <CardItem>
                        <Body>
                            <TextInput
                                placeholder={'Nome'}
                                style={styles.inputModal}
                                value={this.state.nome}
                                onChangeText={(nome) => this.setState({ nome })}
                            />
                        </Body>
                    </CardItem>

                    <CardItem>
                        <Left>
                            <TextInput
                                placeholder={'Fabricante'}
                                style={styles.inputModal}
                                value={this.state.fabricante}
                                onChangeText={(fabricante) => this.setState({ fabricante })}
                            />
                        </Left>
                        <Right>
                            <TextInput
                                placeholder={'Ano'}
                                style={styles.inputModal2}
                                value={this.state.ano}
                                onChangeText={(ano) => this.setState({ ano })}
                            />
                        </Right>
                    </CardItem>

                    <CardItem>
                        <Left>
                            <TextInput
                                placeholder={'Cor'}
                                style={styles.inputModal}
                                value={this.state.cor}
                                onChangeText={(cor) => this.setState({ cor })}
                            />
                        </Left>
                        <Right>
                            <TextInput
                                placeholder={'Valor'}
                                style={styles.inputModal2}
                                value={this.state.valor}
                                onChangeText={(valor) => this.setState({ valor })}
                            />
                        </Right>
                    </CardItem>                

                <View style={{ flexDirection: 'row' }}>

                    <View style={{ flex: 1 }}>
                        <Button title='Salvar'
                            color='#16164E'
                            onPress={() => {

                                //console.log('Salvou ' + this.state.nome);

                                fetch(url + 'carros/alterar', {
                                    method: 'PUT',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id: this.state.id,
                                        img: this.state.img,
                                        nome: this.state.nome,
                                        fabricante: this.state.fabricante,
                                        cor: this.state.cor,
                                        ano: this.state.ano,
                                        valor: this.state.valor,
                                    }),
                                })
                                    .then(response => {
                                        ///console.log(JSON.stringify(response, null, 4))
                                        //console.log('STATUS: ' + response.status);

                                        Alert.alert('Salvo com sucesso.');
                                        console.log('Alterado com sucesso.');

                                        //this.props.navigation.goBack();
                                        this.props.navigation.navigate('Carros', { atualizaLista: true })

                                        return response.json();
                                    })
                                    .catch(error => {
                                        //console.error(error);
                                        //Alert.alert(error);
                                    })
                            }}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Button title='Apagar'
                            color='red'
                            onPress={() => {

                                fetch(url + 'carros/deletar/' + this.state.id, {
                                    method: 'DELETE',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then(response => {

                                        Alert.alert('Deletado com sucesso. ID: ' + this.state.id);
                                        console.log('Deletado com sucesso. ID: ' + this.state.id);

                                        return response.json();
                                    })
                                    .catch(error => {
                                        //console.error(error);
                                        //Alert.alert(error);
                                    })
                            }}
                        />
                    </View>

                </View>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    carroImagem: {
        flex: 1,
        margin: 5,
        height: 250,
        borderWidth: 2,
        borderRadius: 10,
    },
    inputModal: {
        padding: 5,
        width: 220,
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#16164E',
    },
    inputModal2: {
        padding: 5,
        width: 120,
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#16164E',
    }
});


/*

                */