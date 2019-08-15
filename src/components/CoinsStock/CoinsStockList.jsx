import React, { Component } from "react";
import { connect } from "react-redux";
import CoinsStockEdit from './CoinsStockEdit';
import CoinsStockRows from './CoinsStockRows';
import MaterialIcon from 'material-icons-react';
import { deleteCoinsStock } from "../../actions/index";
import { store } from "../../store/configureStore";
import {
    Button,
    Card,
    Modal,
} from 'react-bootstrap';

function mapDispatchToProps(dispatch) {
    return {
        deleteCoinsStock: coinsStock => dispatch(deleteCoinsStock(coinsStock)),
    };
}

function ShowCoinsStockEditModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <CoinsStockEdit values={props.values} handleSubmit={props.handleSubmit} handleClose={props.handleClose} />
        </Modal>
    );
}

class CoinsStockList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            currentModalData: null,
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditIconClick = this.handleEditIconClick.bind(this);
        this.handleDeleteIconClick = this.handleDeleteIconClick.bind(this);
    }
    handleClose() {
        this.setState({
            showModal: false,
        });
    }
    handleSubmit(values, checkDuplicate) {
        if (checkDuplicate) {
            const coinsStock = store.getState().coinsStock.some(a => Number(a.denomination) === Number(values.denomination));
            if (coinsStock) {
                return {
                    isOk: false,
                    message: 'Duplicate denomination'
                }
            }
        }

        this.setState({
            showModal: false,
        });

        return {
            isOk: true
        }
    }

    handleEditIconClick(stock) {
        this.setState({ showModal: true, currentModalData: Object.assign({}, stock) });
    }

    handleDeleteIconClick(id) {
        this.props.deleteCoinsStock({
            id: id,
        });
    }

    render() {
        const mapStateToProps = state => {
            return { coinsStock: state.coinsStock };
        };

        const CoinsStockRowsConnected = ({ coinsStock }) => (
            <CoinsStockRows data={coinsStock} handleEditIconClick={this.handleEditIconClick} handleDeleteIconClick={this.handleDeleteIconClick} />
        );

        const CoinsStockRowsMapped = connect(mapStateToProps)(CoinsStockRowsConnected);

        return (
            <Card>
                {ShowCoinsStockEditModal({ show: this.state.showModal, values: this.state.currentModalData, handleClose: this.handleClose, handleSubmit: this.handleSubmit })}
                <Card.Body>
                    <Card.Title >
                        <span className="align-middle">
                            <MaterialIcon icon="monetization_on" size='large' />
                            <span>Coins</span>
                            <Button variant="primary" className="float-right" onClick={() => this.setState({ showModal: true, currentModalData: null })}>
                                Add
                            </Button>
                        </span>
                    </Card.Title>
                    <CoinsStockRowsMapped />
                </Card.Body>
            </Card>
        );
    }
}

const CoinsStockListConnected = connect(null, mapDispatchToProps)(CoinsStockList);
export default CoinsStockListConnected;