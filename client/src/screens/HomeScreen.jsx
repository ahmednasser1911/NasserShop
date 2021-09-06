import React, { useEffect } from "react";
import { Product } from "../components/Product";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <React.Fragment>
      <h2>Latest Products</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((p) => {
            return (
              <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={p} />
              </Col>
            );
          })}
        </Row>
      )}
    </React.Fragment>
  );
};
