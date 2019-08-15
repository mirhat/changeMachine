import React, { Component } from "react";
import { connect } from "react-redux";
import { addCoinsStock, editCoinsStock } from "../../actions/index";
import {
    Button,
    Modal,
    Form,
} from 'react-bootstrap';

function mapDispatchToProps(dispatch) {
    return {
        addCoinsStock: coinsStock => dispatch(addCoinsStock(coinsStock)),
        editCoinsStock: coinsStock => dispatch(editCoinsStock(coinsStock)),
    };
}

class CoinsStockEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            values: {
                denomination: null,
                numberOfItems: null,
            },
            errors: {}
        }

        if (this.props.values) {
            this.state.values = this.props.values;
            this.state.isEdit = true;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const newValues = Object.assign({}, this.state.values);
        const { name, value } = event.currentTarget;
        newValues[name] = value;
        this.setState({ values: newValues });
    }

    handleSubmit(event) {
        const newErrors = {};
        let hasErrors = false;
        const values = this.state.values;

        if (values.denomination == null || values.denomination < 0) {
            newErrors.denomination = 'Denomination has to be positive number';
            hasErrors = true;
        }

        if (values.numberOfItems == null || values.numberOfItems < 0 || !Number.isInteger(+values.numberOfItems)) {
            newErrors.numberOfItems = 'Number of items has to be positive integer';
            hasErrors = true;
        }
        if (hasErrors) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const checkDuplicate = !this.state.isEdit;
            const result = this.props.handleSubmit(values, checkDuplicate);
            if (result.isOk) {
                this.state.isEdit ? this.props.editCoinsStock(values) : this.props.addCoinsStock(values);
            } else {
                newErrors.global = result.message;
            }
        }

        this.setState({ errors: newErrors });
    };
    render() {
        return (
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Add/Edit coins stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="invalid-text">{this.state.errors.global}</div>
                    <Form.Group controlId="denominationControll">
                        <Form.Label>Denomination</Form.Label>
                        <Form.Control
                            name="denomination"
                            type="number"
                            defaultValue={this.state.values.denomination != null ? Number(this.state.values.denomination) : null}
                            onChange={this.handleChange}
                            isInvalid={!!this.state.errors.denomination}
                            placeholder="Enter denomination" />
                        <Form.Control.Feedback type="invalid">{this.state.errors.denomination}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="numberOfItemsControll">
                        <Form.Label>Number of items</Form.Label>
                        <Form.Control
                            name="numberOfItems"
                            type="number"
                            defaultValue={this.state.values.numberOfItems != null ? Number(this.state.values.numberOfItems) : null}
                            onChange={this.handleChange}
                            isInvalid={!!this.state.errors.numberOfItems}
                            placeholder="Enter number of items" />
                        <Form.Control.Feedback type="invalid">{this.state.errors.numberOfItems}</Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Form>
        );
    }
}

const CoinsStockEditForm = connect(null, mapDispatchToProps)(CoinsStockEdit);
export default CoinsStockEditForm;