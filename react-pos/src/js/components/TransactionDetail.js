import React, { Component } from "react";
import "./App.css";

class TransactionDetail extends Component {
  render() {
    var { quantity, name, price } = this.props;
    var productTotal = parseInt(quantity, 10) * parseInt(price, 10);
    return (
      <tbody>
        <tr>
          <td> {quantity} </td>
          <td>
            <a>{name}</a>
          </td>
          <td>
            <span>{productTotal}</span>
            <br />
            <small className="small-text">
              <em>${price} each</em>
            </small>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default TransactionDetail;
