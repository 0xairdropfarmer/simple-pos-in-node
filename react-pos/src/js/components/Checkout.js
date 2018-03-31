import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Checkout extends Component {
  render() {
    const { total, modal } = this.props;
    return (
      <div>
        <button
          class="btn btn-success lead"
          id="checkoutButton"
          ng-click="focusPayment()"
          ng-disabled="cartTotal === 0"
          data-toggle="modal"
          data-target="#checkoutModal"
        >
          <i class="glyphicon glyphicon-shopping-cart" />
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
              <div ng-hide="transactionComplete" class="lead">
                <h3>
                  Total: <span class="text-danger"> {total} </span>
                </h3>
                <h3>
                  Change Due:
                  <span class="text-success">getChangeDue() | currency </span>
                </h3>

                <form class="form-horizontal" name="checkoutForm">
                  <div
                    class="form-group"
                    ng-class="{ 'has-error': checkoutForm.payment.$error.required }"
                  >
                    <div class="input-group">
                      <div class="input-group-addon">$</div>
                      <input
                        type="number"
                        id="checkoutPaymentAmount"
                        class="form-control input-lg"
                        name="payment"
                        step="any"
                        min="0"
                        ng-model="paymentAmount"
                        required
                      />
                    </div>
                  </div>

                  <p class="text-danger">Enter payment amount.</p>

                  <button type="submit" class="btn btn-primary btn-lg lead">
                    Print Receipt
                  </button>
                </form>
              </div>

              <div
                ng-show="transactionComplete"
                class="lead"
                ng-if="checkoutForm.payment"
              >
                <h3>
                  Total:
                  <span class="text-danger">
                    previousCartInfo.total | currency
                  </span>
                </h3>
                <h3>
                  Change Due:
                  <span class="text-success">
                    previousCartInfo.paymentAmount - previousCartInfo.total |
                    currency
                  </span>
                </h3>
                <button
                  ng-click="closeModal()"
                  class="btn btn-default btn-lg"
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
