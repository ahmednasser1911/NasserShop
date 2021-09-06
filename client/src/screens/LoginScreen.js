import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, button, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import Loader from "./../components/Loader";
import { login } from "../actions/userActions.js";
import FormContainer from "./../components/FormContainer";
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = () => {
    // e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && (
        <div className="alert alert-light" role="alert">
          {error}
        </div>
      )}
      {loading && <Loader />}
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>assword</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Row className="py-3">
        <Button onClick={submitHandler} varient="primary">
          Sign In
        </Button>
        <Col className="py-3">
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
