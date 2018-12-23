import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Checkout extends Component {
  render() {
    const { total, modal } = this.props;
    return (
      <div>
        <button
          className="btn btn-success lead"
          id="checkoutButton"
          ng-click="focusPayment()"
          ng-disabled="cartTotal === 0"
          data-toggle="modal"
          data-target="#checkoutModal"
        >
          <i className="glyphicon glyphicon-shopping-cart" />
          <br />
          <br />
          C<br />
          h<br />
          e<br />
          c<br />
          k<br />
          o<br />
          u<br />
          t
        </button>
        <div className="modal-body">
          <Modal show={total}>
            <Modal.Header closeButton>
              <Modal.Title>Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div ng-hide="transactionComplete" className="lead">
                <h3>
                  Total: <span className="text-danger"> {total} </span>
                </h3>
                <h3>
                  Change Due:
                  <span className="text-success">getChangeDue() | currency </span>
                </h3>

                <form className="form-horizontal" name="checkoutForm">
                  <div
                    className="form-group"
                    ng-className="{ 'has-error': checkoutForm.payment.$error.required }"
                  >
                    <div className="input-group">
                      <div className="input-group-addon">$</div>
                      <input
                        type="number"
                        id="checkoutPaymentAmount"
                        className="form-control input-lg"
                        name="payment"
                        step="any"
                        min="0"
                        ng-model="paymentAmount"
                        required
                      />
                    </div>
                  </div>

                  <p className="text-danger">Enter payment amount.</p>

                  <button type="submit" className="btn btn-primary btn-lg lead">
                    Print Receipt
                  </button>
                </form>
              </div>

              <div
                ng-show="transactionComplete"
                className="lead"
                ng-if="checkoutForm.payment"
              >
                <h3>
                  Total:
                  <span className="text-danger">
                    previousCartInfo.total | currency
                  </span>
                </h3>
                <h3>
                  Change Due:
                  <span className="text-success">
                    previousCartInfo.paymentAmount - previousCartInfo.total |
                    currency
                  </span>
                </h3>
                <button
                  ng-click="closeModal()"
                  className="btn btn-default btn-lg"
                  type="button"
                >
                  Close
                </button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleSubmit}>Add</Button>
              <Button onClick={() => this.setState({ showModal: false })}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Checkout;
