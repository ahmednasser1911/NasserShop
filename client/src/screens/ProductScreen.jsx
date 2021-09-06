import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Raiting from "../components/Raiting";
import { Link } from "react-router-dom";
import { Col, Row, Image, ListGroup, Button, Form } from "react-bootstrap";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  let [qty, setQty] = useState(0);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const addToCartHandler = () => {
    if (qty === 0) qty += 1;
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);
  return (
    <React.Fragment>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup varient="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Raiting
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>Price: $ {product.price}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>{product.description}</h3>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup varient="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>$ {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  style={{ width: "100%", fonstSize: "1.2rem" }}
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default ProductScreen;
