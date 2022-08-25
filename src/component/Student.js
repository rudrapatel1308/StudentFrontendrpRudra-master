import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Student() {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();

  const { studentId } = useParams(); //get the path parameter from the URL
  const navigate = useNavigate();

  const student = {
    id: id,
    name: name,
    address: address,
  };

  useEffect(() => {
    if (studentId !== null) {
      axios
        .get("http://localhost:8080/student/" + studentId)
        .then((response) => {
          setId(response.data.id);
          setName(response.data.name);
          setAddress(response.data.address);
        })
        .catch((error) => alert(error));
    }
  },[]);
  let textchange = (event) => {
    if (event.target.name === "id") {
      setId(event.target.value);
    } else if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "address") {
      setAddress(event.target.value);
    }
  };

  let addstudent = (event) => {
    if (studentId == null) {
      event.preventDefault();
      axios
        .post("http://localhost:8080/student", student)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => alert(error));
    } else {
      axios
        .put("http://localhost:8080/student/" + studentId, student)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
    }
    setId("");
    setName("");
    setAddress("");
  };
  return (
    <div className="my-4">
      <Card>
        <Card.Header>Add Student Information</Card.Header>
        <Form onSubmit={addstudent}>
          <Card.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter ID</Form.Label>
              <Form.Control
                name="id"
                value={id}
                type="text"
                placeholder="Enter id"
                onChange={textchange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                name="name"
                value={name}
                type="text"
                placeholder="Enter Name"
                onChange={textchange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Address</Form.Label>
              <Form.Control
                name="address"
                value={address}
                type="text"
                placeholder="Enter Address"
                onChange={textchange}
              />
            </Form.Group>
          </Card.Body>

          <Card.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}
