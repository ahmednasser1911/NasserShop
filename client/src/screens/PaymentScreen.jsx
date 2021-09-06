import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress, savePaymentMethod } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";
import FormContainer from "./../components/FormContainer";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form>
        <Form.Group>
          <Form.Label>Select Method</Form.Label>
        </Form.Group>
        <Col>
          <Form.Check
            type="radio"
            label="Paypal or Credit Card"
            id="Paypal"
            name="paymentMethod"
            value="paypal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          {/* <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value="stripe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check> */}
        </Col>
      </Form>
      <Button onClick={submitHandler} varient="primary">
        Continue
      </Button>
    </FormContainer>
  );
};

export default PaymentScreen;
