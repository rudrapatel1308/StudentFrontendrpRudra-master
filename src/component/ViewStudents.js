import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
export default function ViewStudents() {
    const [students, setstudents]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/listofstudents")
        .then(response=>setstudents(response.data))
        .catch(error=>alert(error));
    })

    let deletestudent=(id,event)=>{
      event.preventDefault();
      axios.delete("http://localhost:8080/student/"+id)
      .then(response=>{alert(response.data)})
      .catch(error=>alert(error));
    }
  return (
    <Card className="my-4">
      <Card.Header>List Of Student Information</Card.Header>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Student Address</th>
              <th>Edit/Delete Student</th>
            </tr>
          </thead>
          <tbody>
            {
                students.map((student)=>
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.address}</td>
              <td>
               <Link to={"/updateStudent/"+student.id}>
              <Button variant="primary">Edit</Button></Link> {' '}
              <Button variant="danger" onClick={deletestudent.bind(this,student.id)}>Delete</Button>{' '}
              </td>
            </tr>
            )
            }
          </tbody>
        </Table>
      </div>
      <Card.Footer>This is the Student Information Page</Card.Footer>
    </Card>
  );
}
