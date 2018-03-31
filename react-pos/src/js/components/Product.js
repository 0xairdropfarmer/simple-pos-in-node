import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      quantity: 0,
      productModal: false
    };
  }
  componentDidMount() {
    this.setState({ name: this.props.name });
    this.setState({ newName: this.props.name });
    this.setState({ price: this.props.price });
    this.setState({ newPrice: this.props.price });
    this.setState({ quantity: this.props.quantity });
    this.setState({ newQuantity: this.props.quantity });
  }
  handleName = e => {
    this.setState({ newName: e.target.value });
  };
  handlePrice = e => {
    this.setState({ newPrice: e.target.value });
  };
  handleQuantity = e => {
    this.setState({ newQuantity: e.target.value });
  };
  handleProduct = e => {
    e.preventDefault();
    this.setState({ productModal: false });
    console.log("id", this.props._id);
    var editProduct = {
      name: this.state.newName,
      quantity: this.state.newQuantity,
      price: this.state.newPrice,
      _id: this.props._id
    };

    this.props.onEditProduct(editProduct);
    this.setState({ name: this.state.newName });
    this.setState({ quantity: this.state.newQuantity });
    this.setState({ price: this.state.newPrice });
  };
  render() {
    const {
      newName,
      newPrice,
      newQuantity,
      name,
      price,
      quantity
    } = this.state;
    return (
      <tr>
        <td>
          <a href=""> {name} </a>
        </td>
        <td> ${price} </td> <td> {quantity} </td>
        <td>
          <a
            className="btn btn-info"
            onClick={() => this.setState({ productModal: true })}
          >
            <i className="glyphicon glyphicon-pencil" />
          </a>
        </td>
        <Modal show={this.state.productModal}>
          <Modal.Header>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newProductForm">
              <div className="form-group">
                <label className="col-md-4 control-label" for="name">
                  Name
                </label>
                <div className="col-md-4">
                  <input
                    name="name"
                    placeholder="Name"
                    onChange={this.handleName}
                    className="form-control"
                    value={newName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="price">
                  Price
                </label>
                <div className="col-md-4">
                  <input
                    name="price"
                    placeholder="Price"
                    className="form-control"
                    onChange={this.handlePrice}
                    value={newPrice}
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-md-4 control-label"
                  for="quantity_on_hand"
                >
                  Quantity On Hand
                </label>
                <div className="col-md-4">
                  <input
                    name="quantity_on_hand"
                    placeholder="Quantity On Hand"
                    onChange={this.handleQuantity}
                    value={newQuantity}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="image">
                  Upload Image
                </label>
                <div className="col-md-4">
                  <input type="file" name="image" />
                </div>
              </div>
              <br /> <br /> <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ productModal: false })}>
              Close
            </Button>
            <Button onClick={this.handleProduct}>Update</Button>
          </Modal.Footer>
        </Modal>
      </tr>
    );
  }
}

export default Product;
