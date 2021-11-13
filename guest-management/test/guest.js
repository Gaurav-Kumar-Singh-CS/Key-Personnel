let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
const axios = require('axios')
let server = require("../app");

chai.should();
chai.use(chaiHttp);

function getGuestID() {
var guestDetails= null
    axios.get("http://localhost:4444/guests/name/test").then((response) => {
                console.log(response)
                guestDetails = response.data._id.toString();
                console.log(guestDetails)
             })
             return guestDetails
            }

function deleteGuestID() {
var guestDetails= getGuestID()
    axios.get("http://localhost:4444/guests/" + guestDetails).then((response) => {
                console.log(response)
             })
            }

describe("Guests API", () => {
  it("It should return all guests", () => {
    chai
      .request(server)
      .get("/guests/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
      });
  });

  it("It should return error code", () => {
    chai
      .request(server)
      .get("/guest/")
      .end((err, res) => {
        res.should.have.status(404);
      });
  });
});

describe("POST /guests", () => {
  it("It should POST a new guest", () => {
    const guest = {
      address: { city: "1", state: "1", pin: "1" },
      name: "test",
      gender: "male",
      email: "test@gmail.com",
      phone: "1"
    };
    chai
      .request(server)
      .post("/guests")
      .send(guest)
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a("object")
        response.body.should.have.property("name").eq("test")
      });
  });

  it("It should NOT POST a new guest without the name property", () => {
    const guest = {
        address: { city: "1", state: "1", pin: "1" },
        name: "test",
        gender: "male",
        email: "test@gmail.com",
        phone: "1"
      };
    chai
      .request(server)
      .post("/guest")
      .send(guest)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

describe("Get guest by ID", () => {
    it("It should not return the guest by ID", () => {
      const id = "61790be818b305a17531fa6";
      chai
        .request(server)
        .get("/guests/" + id)
        .end((err, res) => {
          res.should.have.status(404);
        });
    });
  });

describe("PUT /guests/id", () => {
 

  it("It should NOT PUT an existing guest", () => {
    const guestID = getGuestID();
    const guest = {
        gender: "female"
    };
    chai
      .request(server)
      .put("/guest/" + guestID)
      .send(guest)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

describe("DELETE /guests/:id", () => {
  it("It should DELETE an existing guest", () => {
    const guestID = getGuestID();
    chai
      .request(server)
      .delete("/guests/" + guestID)
      .end((err, response) => {
        response.should.have.status(200)
      });
  });

  it("It should NOT DELETE a guest", () => {
    const guestID = "1";
    chai
      .request(server)
      .delete("/guest/" + guestID)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

deleteGuestID()