import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Col, Row, Card, Image, ListGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import {
  deleverOrder,
  getOrderDetails,
  payOrder,
} from "./../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELEVER_RESET,
} from "../constents/orderConstants";

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const orderDelever = useSelector((state) => state.orderDelever);
  const { success: successDelever, loading: loadingDelever } = orderDelever;

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDelever) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELEVER_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      addPaypalScript();
      if (window.paypal) {
        setSdkReady(true);
      }
    }
  }, [successDelever, dispatch, successPay, orderId, order]);

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  const deleverHandler = () => {
    dispatch(deleverOrder(order));
  };

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <div className="alert alert-danger">{error}</div>
  ) : (
    <React.Fragment>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup varient="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Name : {order.user.name}</strong>
              <p>
                <strong>Address :</strong>
                {order.shippingAddress.address} , {order.shippingAddress.city} ,{" "}
                {order.shippingAddress.postalCode} ,
                {order.shippingAddress.country}
              </p>

              {order.isDeleverd ? (
                <div className="alert alert-success">
                  Deleverd on :{order.deleverdAt}
                </div>
              ) : (
                <div className="alert alert-danger">Not Deleverd!</div>
              )}
            </ListGroup.Item>
          </ListGroup>

          {order.paymentMethod && (
            <ListGroup>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {order.paymentMethod}

                {order.isPaid ? (
                  <div className="alert alert-success">
                    Paid on :{order.paidAt}
                  </div>
                ) : (
                  <div className="alert alert-danger">Not Paid!</div>
                )}
              </ListGroup.Item>
            </ListGroup>
          )}

          <ListGroup>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <div className="alert alert-danger" role="alert">
                  Order is Empty!
                </div>
              ) : (
                <ListGroup varient="flush">
                  {order.orderItems.map((item, index) => (
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
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      ammount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDelever && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDeleverd && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deleverHandler}
                    >
                      Mark as Dileverd
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OrderScreen;
