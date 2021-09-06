import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions.js";
import FormContainer from "./../components/FormContainer";
import { USER_UPDATE_RESET } from "../constents/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/userList");
    } else {
      if (!user.name || user._id !== userId) dispatch(getUserDetails(userId));
      else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        console.log(user);
      }
    }
  }, [history, successUpdate, user, userId, dispatch]);

  const submitHandler = () => {
    // e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <React.Fragment>
      <Link to="/userList" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <div className="alert alert-danger">{errorUpdate}</div>}
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button onClick={submitHandler} varient="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default UserEditScreen;
