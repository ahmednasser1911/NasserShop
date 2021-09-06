import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../components/Loader";
import {
  deleteProduct,
  listProducts,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constents/productConstents";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col md={9}>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createHandler}>
            {" "}
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <div className="alert alert-danger">{errorDelete}</div>}
      {loadingCreate && <Loader />}
      {errorCreate && <div className="alert alert-danger">{errorCreate}</div>}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <Table striped responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>{product.category}</td>
                <td>
                  <LinkContainer to={`/product/${product._id}/edit`}>
                    <Button varient="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    varient="red"
                    className="btn-sm btn-danger"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default ProductListScreen;
