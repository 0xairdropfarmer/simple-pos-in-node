import React, { Component } from "react";
import "./App.css";

class LivePos extends Component {
  handleChange = (id, itemNumber) => {
    this.props.onChange(id, itemNumber);
  };
  render() {
    const { id, name, price, quantity } = this.props;
    var itemNumber = quantity;
    return (
      <tr>
        <td className="col-md-2"> {name}</td>
        <td className="col-md-1"> ${price}</td>
        <td className="col-md-2">
          <button
            className="btn btn-sm pull-left"
            onClick={() => this.handleChange(id, --itemNumber)}
          >
            <i className="glyphicon glyphicon-minus" />
          </button>

          <div className="col-md-6">
            <input type="number" value={itemNumber} />
          </div>

          <button
            className="btn btn-sm pull-right"
            onClick={() => this.handleChange(id, ++itemNumber)}
          >
            <i className="glyphicon glyphicon-plus" />
          </button>
        </td>
        <td className="col-md-2">$0.00</td>
        <td className="col-md-2">{price}</td>
        <td className="col-md-2">
          <button
            className="btn btn-danger"
            onClick={() => this.handleChange(id, "delete")}
          >
            <i className="glyphicon glyphicon-trash" />
          </button>
        </td>
      </tr>
    );
  }
}

export default LivePos;
