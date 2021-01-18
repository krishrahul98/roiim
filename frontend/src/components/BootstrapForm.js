import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./BootstrapForm.css";
import Checkout from "./util/Checkout";

const BootstrapForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    firstName: "Rahul",
    lastName: "Krishna",
    email: "26rahul09@gmail.com",
    street: "Ashok Nagar",
    city: "Patna",
    state: "Bihar",
    zip: "80002",
    country: "India",
    phone: "7858895623",
    amount: props.amount,
  });

  const handleChange = (event) => {
    let fieldName = event.currentTarget.name;
    let fieldVal = event.currentTarget.value;
    setData({ ...data, [fieldName]: fieldVal });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    console.log(data);
    setValidated(true);
    const billingAddress = {
      nickName: `${data.firstName} ${data.lastName}`,
      city: data.city,
      street: data.street,
      zip: data.zip,
      country: "US",
      state: "VA",
    };

    const customer = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: {
        day: 4,
        month: 5,
        year: 1998,
      },
    };
    Checkout(billingAddress, customer, data.amount);
  };
  return (
    <div className='checkout'>
      <h2>Checkout</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId='firstName'>
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              required
              type='text'
              name='firstName'
              placeholder='Enter First Name'
              defaultValue={data.firstName}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId='lastName'>
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              required
              type='text'
              name='lastName'
              placeholder='Enter Last Name'
              defaultValue={data.lastName}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId='email'>
            <Form.Label>Email *</Form.Label>
            <Form.Control
              required
              type='email'
              name='email'
              placeholder='Enter email'
              defaultValue={data.email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId='phone'>
            <Form.Label>Phone No *</Form.Label>
            <Form.Control
              required
              name='phone'
              type='tel'
              placeholder='Enter Number'
              defaultValue={data.phone}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId='street'>
          <Form.Label>Street *</Form.Label>
          <Form.Control
            required
            name='street'
            placeholder='Enter street name'
            defaultValue={data.street}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId='City'>
            <Form.Label>City *</Form.Label>
            <Form.Control
              required
              name='city'
              defaultValue={data.city}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId='State'>
            <Form.Label>State *</Form.Label>
            <Form.Control
              required
              name='state'
              defaultValue={data.state}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId='zip'>
            <Form.Label>Zip *</Form.Label>
            <Form.Control
              required
              name='zip'
              defaultValue={data.zip}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId='country'>
            <Form.Label>Country *</Form.Label>
            <Form.Control
              required
              name='country'
              defaultValue={data.country}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId='amount'>
          <Form.Label>Amount *</Form.Label>
          <Form.Control
            required
            type='number'
            name='amount'
            defaultValue={data.amount}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Form.Group>

        <Button size='lg' block variant='primary' type='submit'>
          Pay
        </Button>
      </Form>
    </div>
  );
};

export default BootstrapForm;
