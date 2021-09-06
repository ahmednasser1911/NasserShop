import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Raiting from "./Raiting";

export const Product = ({ product }) => {
  return (
    <React.Fragment>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} varient="top" />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Raiting
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as="div">
            <h4>$ {product.price}</h4>
          </Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};
