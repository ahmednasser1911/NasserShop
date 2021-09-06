import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Image, Button, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CheckOutSteps from "../components/CheckOutSteps";
import { createOrder } from "./../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order.order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    console.log("object");
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <React.Fragment>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup varient="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address :</strong>
                {cart.shippingAddress.address} , {cart.shippingAddress.city} ,{" "}
                {cart.shippingAddress.postalCode} ,
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
          </ListGroup>

          {cart.paymentMethod && (
            <ListGroup>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </ListGroup.Item>
            </ListGroup>
          )}

          <ListGroup>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <div className="alert alert-danger" role="alert">
                  Your Cart is Empty!
                </div>
              ) : (
                <ListGroup varient="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup varient="flush">
              <ListGroup.Item>
                <h2>Order Summery</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PlaceOrderScreen;
