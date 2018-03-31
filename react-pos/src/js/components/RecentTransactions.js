import React, { Component } from "react";
import "./App.css";

class RecentTransactions extends Component {
  render() {
    const { date, total } = this.props;
    return (
      <tr>
        <td className="col-md-2">
          <a href="#/transaction/{{ transaction._id }}">{date}</a>
        </td>
        <td className="col-md-2"> {total} </td>
      </tr>
    );
  }
}

export default RecentTransactions;
