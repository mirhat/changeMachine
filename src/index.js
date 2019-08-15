import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import CoinsStockList from './components/CoinsStock/CoinsStockList';
import Checkout from './components/Payment/Checkout';
import { PersistGate } from 'redux-persist/integration/react'
import {persistor, store} from "./store/configureStore";

import './customized-bootstrap.scss';
import './index.scss';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';


class PaymentMachine extends React.Component {    
    render() {
        return (
            <Container>                
                <Row>
                    <Col md={6}>
                        <CoinsStockList />
                    </Col>
                    <Col md={6}>
                        <Checkout />
                    </Col>
                </Row>
            </Container>
        );
    }
}

// ========================================

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <PaymentMachine />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
