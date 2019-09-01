import React from 'react';
import ActionButton from 'react-native-action-button';

export default class BotaoFlutuanteAdc extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ActionButton buttonColor="#16164E99" onPress={this.props.onPress} />
        );
    }

}