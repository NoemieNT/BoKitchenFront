import React, { Component } from "react";

export class Cart extends Component {
  render() {
    return (
      <div>
        <h1>i'm cart</h1>
        {!this.props.products.length && <p>no product selected yet...</p>}
        {Boolean(this.props.products.length) &&
          this.props.products.map((p, i) => (
            <p key={i}>
              {p.id} : {p.quantity}
            </p>
          ))}
      </div>
    );
  }
}

export default Cart;
