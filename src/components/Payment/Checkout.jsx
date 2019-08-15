import React, { Component } from "react";
import { connect } from "react-redux";
import MaterialIcon from 'material-icons-react';
import { updateCoinsStockNumberOfItems } from "../../actions/index";
import { store } from "../../store/configureStore";
import {getChange} from "../../helpers/change-helper";
import {
    Button,
    Card,
    Form,
} from 'react-bootstrap';

function mapDispatchToProps(dispatch) {
    return {
        updateCoinsStockNumberOfItems: coinsStock => dispatch(updateCoinsStockNumberOfItems(coinsStock)),
    };
}

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            values: {
                amount: null
            },
            change: [],
            lastResultFor: null,
            cantReturnChange: false,
            errors: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        const newErrors = {};
        let hasErrors = false;

        const values = this.state.values;

        if (values.amount == null || values.amount < 0) {
            newErrors.amount = 'Amount has to be positive number';
            hasErrors = true;
        }

        if (hasErrors) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            let amount = this.state.values.amount;
            var change = store.getState()
                .coinsStock
                .filter(a => a.numberOfItems > 0)
                .sort((a, b) => b.denomination - a.denomination);

            let result = getChange(amount, change);

            if (result.isOk) {
                this.setState({
                    change: result.change,
                    cantReturnChange: false,
                    lastResultFor: values.amount
                });
            } else {
                this.setState({
                    change: [],
                    cantReturnChange: true,
                    lastResultFor: null,
                });
            }

            this.props.updateCoinsStockNumberOfItems(result.change);
        }
        this.setState({ errors: newErrors });
    };

    handleChange(event) {
        const newValues = Object.assign({}, this.state.values);
        newValues[event.currentTarget.name] = event.currentTarget.value;
        this.setState({ values: newValues });
    }

    render() {
        let changeList = !this.state.cantReturnChange ? this.state.change.map(a => {
            return (
                <li key={a.coin} className="list-group-item">{a.numberOfItems} x <b>${a.coin}</b></li>
            );
        }) : <li className="list-group-item">Could not return change</li>;

        return (
            <Card>
                <Card.Body>
                    <Card.Title >
                        <span className="align-middle">
                            <MaterialIcon icon="attach_money" size='large' />
                            <span>Payment</span>
                        </span>
                    </Card.Title>
                    <Form>
                        <Form.Group controlId="amountControll">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                name="amount"
                                type="number"
                                defaultValue={this.state.values.amount}
                                onChange={this.handleChange}
                                isInvalid={!!this.state.errors.amount}
                                placeholder="Enter amount" />
                            <Form.Control.Feedback type="invalid">{this.state.errors.amount}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" onClick={this.handleSubmit} className="float-right">
                            Proceed
                        </Button>
                    </Form>
                    <div className="checkout-result">
                        <div className="checkout-result-label">{!!this.state.lastResultFor ? '$' + this.state.lastResultFor + ' = ' : ''}</div>
                        <ul className={`list-group mt-8`}>
                            {changeList}
                        </ul>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

const CheckoutConnected = connect(null, mapDispatchToProps)(Checkout);
export default CheckoutConnected;