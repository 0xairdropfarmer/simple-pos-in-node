import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Product from "./Product";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const HOST = "http://localhost:80";

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productFormModal: false,
      name: "",
      snackMessage: "",
      quantity: "",
      price: ""
    };
    this.handleNewProduct = this.handleNewProduct.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
  }
  componentWillMount() {
    var url = HOST + `/api/inventory/products`;
    axios.get(url).then(response => {
      this.setState({ products: response.data });
    });
  }
  handleNewProduct = e => {
    e.preventDefault();
    this.setState({ productFormModal: false });
    var newProduct = {
      name: this.state.name,
      quantity: this.state.quantity,
      price: this.state.price
    };

    axios
      .post(HOST + `/api/inventory/product`, newProduct)
      .then(
        response =>
          this.setState({ snackMessage: "Product Added Successfully!" }),
        this.handleSnackbar()
      )
      .catch(err => {
        console.log(err),
          this.setState({ snackMessage: "Product failed to save" }),
          this.handleSnackbar();
      });
  };
  handleEditProduct = editProduct => {
    axios
      .put(HOST + `/api/inventory/product`, editProduct)
      .then(response => {
        this.setState({ snackMessage: "Product Updated Successfully!" });
        this.handleSnackbar();
        return true;
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Product Update Failed!" }),
          this.handleSnackbar();
        return false;
      });
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };
  handlePrice = e => {
    this.setState({ price: e.target.value });
  };
  handleQuantity = e => {
    this.setState({ quantity: e.target.value });
  };
  handleSnackbar = () => {
    var bar = document.getElementById("snackbar");
    bar.className = "show";
    setTimeout(function() {
      bar.className = bar.className.replace("show", "");
    }, 3000);
  };

  render() {
    var { products, snackMessage } = this.state;

    var renderProducts = () => {
      if (products.length === 0) {
        return <p>{products}</p>;
      } else {
        return products.map(product => (
          <Product {...product} onEditProduct={this.handleEditProduct} />
        ));
      }
    };

    return (
      <div>
        <Header />

        <div class="container">
          <a
            class="btn btn-success pull-right"
            onClick={() => this.setState({ productFormModal: true })}
          >
            <i class="glyphicon glyphicon-plus" /> Add New Item
          </a>
          <br />
          <br />

          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity on Hand</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </table>
        </div>

        <Modal show={this.state.productFormModal}>
          <Modal.Header>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form class="form-horizontal" name="newProductForm">
              <div class="form-group">
                <label class="col-md-4 control-label" for="barcode">
                  Barcode
                </label>
                <div class="col-md-4">
                  <input
                    id="barcode"
                    name="barcode"
                    placeholder="Barcode"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label" for="name">
                  Name
                </label>
                <div class="col-md-4">
                  <input
                    name="name"
                    placeholder="Name"
                    class="form-control"
                    onChange={this.handleName}
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label" for="price">
                  Price
                </label>
                <div class="col-md-4">
                  <input
                    name="price"
                    placeholder="Price"
                    class="form-control"
                    onChange={this.handlePrice}
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label" for="quantity_on_hand">
                  Quantity On Hand
                </label>
                <div class="col-md-4">
                  <input
                    name="quantity_on_hand"
                    placeholder="Quantity On Hand"
                    onChange={this.handleQuantity}
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label" for="image">
                  Upload Image
                </label>
                <div class="col-md-4">
                  <input type="file" name="image" />
                </div>
              </div>
              <br /> <br /> <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ productFormModal: false })}>
              Close
            </Button>
            <Button onClick={this.handleNewProduct}>Submit</Button>
          </Modal.Footer>
        </Modal>
        <div id="snackbar">{snackMessage}</div>
      </div>
    );
  }
}

export default Inventory;
