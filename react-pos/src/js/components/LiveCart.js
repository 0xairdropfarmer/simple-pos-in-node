import React, { Component } from "react";
import "./App.css";
import io from "socket.io-client";
import Header from "./Header";
import axios from "axios";
import RecentTransactions from "./RecentTransactions";
import LiveTransactions from "./LiveTransactions";
import moment from "moment";

const HOST = "http://localhost:80";
var url = HOST + `/api/all`;
var socket = io.connect(HOST);
class LiveCart extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [], liveTransactions: [] };
  }
  componentWillMount() {
    // console.dir(socket);
    axios
      .get(url)
      .then(response => this.setState({ transactions: response.data }))
      .catch(err => {
        console.log(err);
      });

    socket.on("update-live-cart-display", liveCart => {
      this.setState({ liveTransactions: liveCart });
    });
  }
  componentWillUnmount() {
    //socket.disconnect();
    // alert("Disconnecting Socket as component will unmount");
  }
  render() {
    var { transactions, liveTransactions } = this.state;
    var renderRecentTransactions = () => {
      if (transactions.length === 0) {
        return <p>No recent transactions available</p>;
      } else {
        return transactions.map(transaction => (
          <RecentTransactions {...transaction} />
        ));
      }
    };
    var renderDate = () => {
      return moment().format("DD-MMM-YYYY HH:mm:ss");
    };
    var renderLiveTransactions = () => {
      if (liveTransactions.length === 0) {
        return (
          <div>
            <div className="col-md-5 pull-right">
              <div>
                <div className="alert alert-warning text-center" role="alert">
                  <strong>Not Active:</strong> No items added at the moment.
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return liveTransactions.map(liveTransaction => (
          <LiveTransactions {...liveTransaction} />
        ));
      }
    };
    return (
      <div>
        <Header />
        <div className="livecart">
          <div className="col-md-5 pull-right">
            <div className="panel panel-primary">
              <div className="panel-heading text-center lead">
                {renderDate()}
              </div>

              <table className="receipt table table-hover">
                <thead>
                  <tr className="small">
                    <th> Quantity </th>
                    <th> Product </th>
                    <th> Price </th>
                  </tr>
                </thead>
                <tbody>{renderLiveTransactions()}</tbody>
              </table>
            </div>
          </div>
          <div className="col-md-5 pull-left">
            <div className="panel panel-default">
              <div className="panel-heading lead text-center">
                Recent Transactions
              </div>

              <div className="panel-body">
                <div className="text-center">
                  <span>Today's Sales</span>
                  <br />
                  <span className="text-success checkout-total-price">
                    $0<span />
                  </span>
                </div>

                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>{renderRecentTransactions()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveCart;
