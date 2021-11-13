let chai = require("chai");
let chaiHttp = require("chai-http");
const mongoose = require('mongoose')
const { response } = require("express");
const axios = require('axios')
let server = require("../app");

chai.should();
chai.use(chaiHttp);

function getReservationID() {
var reservationDetails= null
    axios.get("http://localhost:1111/reservations/name/9999").then((response) => {
                console.log(response)
                reservationDetails = response.data._id.toString();
                console.log(reservationDetails)
             })
             return reservationDetails
            }

function deleteReservationID() {
var reservationDetails= getReservationID()
    axios.get("http://localhost:1111/reservations/" + reservationDetails).then((response) => {
                console.log(response)
             })
            }

describe("Reservations API", () => {
  it("It should return all reservations", () => {
    chai
      .request(server)
      .get("/reservations/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
      });
  });

  it("It should return error code", () => {
    chai
      .request(server)
      .get("/reservation/")
      .end((err, res) => {
        res.should.have.status(404);
      });
  });
});

describe("POST /reservations", () => {
  it("It should POST a new reservation", () => {
    const reservation = {
        guestID: mongoose.Types.ObjectId("61792c4a5e207cbbf1fd311e"),
        roomID: mongoose.Types.ObjectId("61792c4a5e207cbbf1fd311e"),
        checkIn: "2021-04-10",
        checkOut: "2021-04-10",
        numberOfAdults: 9999,
        numberOfChildren: 4567,
        totalCost: 5
    };
    chai
      .request(server)
      .post("/reservations")
      .send(reservation)
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a("object")
        response.body.should.have.property("reservationType").eq("test")
      });
  });

  it("It should NOT POST a new reservation without the name property", () => {
    const reservation = {
        guestID: mongoose.Types.ObjectId("61792c4a5e207cbbf1fd311e"),
        roomID: mongoose.Types.ObjectId("61792c4a5e207cbbf1fd311e"),
        checkIn: "2021-04-10",
        checkOut: "2021-04-10",
        numberOfAdults: 9999,
        numberOfChildren: 4567,
        totalCost: 5
      };
    chai
      .request(server)
      .post("/reservation")
      .send(reservation)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

describe("Get reservation by ID", () => {
    it("It should not return the reservation by ID", () => {
      const id = "61790be818b305a17531fa6";
      chai
        .request(server)
        .get("/reservations/" + id)
        .end((err, res) => {
          res.should.have.status(404);
        });
    });
  });

describe("PUT /reservations/id", () => {
 

  it("It should NOT PUT an existing reservation", () => {
    const reservationID = getReservationID();
    const reservation = {
        numberOfAdults: 9999
    };
    chai
      .request(server)
      .put("/reservation/" + reservationID)
      .send(reservation)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

describe("DELETE /reservations/:id", () => {
  it("It should DELETE an existing reservation", () => {
    const reservationID = getReservationID();
    chai
      .request(server)
      .delete("/reservations/" + reservationID)
      .end((err, response) => {
        response.should.have.status(200)
      });
  });

  it("It should NOT DELETE a reservation", () => {
    const reservationID = "1";
    chai
      .request(server)
      .delete("/reservation/" + reservationID)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

deleteReservationID()