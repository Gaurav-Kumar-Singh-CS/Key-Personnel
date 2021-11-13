let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
const axios = require('axios')
let server = require("../app");

chai.should();
chai.use(chaiHttp);

function getEmployeeID() {
var employeeDetails= null
    axios.get("http://localhost:7777/employees/name/test").then((response) => {
                console.log(response)
                employeeDetails = response.data._id.toString();
                console.log(employeeDetails)
             })
             return employeeDetails
            }

function deleteEmployeeID() {
var employeeDetails= getEmployeeID()
    axios.get("http://localhost:7777/employees/" + employeeDetails).then((response) => {
                console.log(response)
             })
            }

describe("Employees API", () => {
  it("It should return all employees", () => {
    chai
      .request(server)
      .get("/employees/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
      });
  });

  it("It should return error code", () => {
    chai
      .request(server)
      .get("/employee/")
      .end((err, res) => {
        res.should.have.status(404);
      });
  });
});

describe("POST /employees", () => {
  it("It should POST a new employee", () => {
    const employee = {
        address: { city: "1", state: "1", pin: "1" },
        name: "test",
        gender: "male",
        email: "test@gmail.com",
        phone: "1",
        jobTitle: "a",
        salary: 6455
    };
    chai
      .request(server)
      .post("/employees")
      .send(employee)
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a("object")
        response.body.should.have.property("name").eq("test")
      });
  });

  it("It should NOT POST a new employee without the name property", () => {
    const employee = {
        address: { city: "1", state: "1", pin: "1" },
        name: "test",
        gender: "male",
        email: "test@gmail.com",
        phone: "1",
        jobTitle: "a",
        salary: 6455
      };
    chai
      .request(server)
      .post("/employee")
      .send(employee)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

describe("Get employee by ID", () => {
    it("It should not return the employee by ID", () => {
      const id = "61790be818b305a17531fa6";
      chai
        .request(server)
        .get("/employees/" + id)
        .end((err, res) => {
          res.should.have.status(404);
        });
    });
  });

describe("PUT /employees/id", () => {
 

  it("It should NOT PUT an existing employee", () => {
    const employeeID = getEmployeeID();
    const employee = {
        employeeType: "female"
    };
    chai
      .request(server)
      .put("/employee/" + employeeID)
      .send(employee)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

describe("DELETE /employees/:id", () => {
  it("It should DELETE an existing employee", () => {
    const employeeID = getEmployeeID();
    chai
      .request(server)
      .delete("/employees/" + employeeID)
      .end((err, response) => {
        response.should.have.status(200)
      });
  });

  it("It should NOT DELETE a employee", () => {
    const employeeID = "1";
    chai
      .request(server)
      .delete("/employee/" + employeeID)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

deleteEmployeeID()