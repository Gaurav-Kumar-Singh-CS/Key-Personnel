let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
const axios = require('axios')
let server = require("../app");

chai.should();
chai.use(chaiHttp);

function getRoomID() {
var roomDetails= null
    axios.get("http://localhost:5555/rooms/name/test").then((response) => {
                console.log(response)
                roomDetails = response.data._id.toString();
                console.log(roomDetails)
             })
             return roomDetails
            }

function deleteRoomID() {
var roomDetails= getRoomID()
    axios.get("http://localhost:5555/rooms/" + roomDetails).then((response) => {
                console.log(response)
             })
            }

describe("Rooms API", () => {
  it("It should return all rooms", () => {
    chai
      .request(server)
      .get("/rooms/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
      });
  });

  it("It should return error code", () => {
    chai
      .request(server)
      .get("/room/")
      .end((err, res) => {
        res.should.have.status(404);
      });
  });
});

describe("POST /rooms", () => {
  it("It should POST a new room", () => {
    const room = {
      roomType: "test",
      cost: 4646,
      totalRooms: 546
    };
    chai
      .request(server)
      .post("/rooms")
      .send(room)
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a("object")
        response.body.should.have.property("roomType").eq("test")
      });
  });

  it("It should NOT POST a new room without the name property", () => {
    const room = {
        roomType: "test",
        cost: 4646,
        totalRooms: 546
      };
    chai
      .request(server)
      .post("/room")
      .send(room)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

describe("Get room by ID", () => {
    it("It should not return the room by ID", () => {
      const id = "61790be818b305a17531fa6";
      chai
        .request(server)
        .get("/rooms/" + id)
        .end((err, res) => {
          res.should.have.status(404);
        });
    });
  });

describe("PUT /rooms/id", () => {
 

  it("It should NOT PUT an existing room", () => {
    const roomID = getRoomID();
    const room = {
        roomType: "female"
    };
    chai
      .request(server)
      .put("/room/" + roomID)
      .send(room)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

describe("DELETE /rooms/:id", () => {
  it("It should DELETE an existing room", () => {
    const roomID = getRoomID();
    chai
      .request(server)
      .delete("/rooms/" + roomID)
      .end((err, response) => {
        response.should.have.status(200)
      });
  });

  it("It should NOT DELETE a room", () => {
    const roomID = "1";
    chai
      .request(server)
      .delete("/room/" + roomID)
      .end((err, response) => {
        response.should.have.status(404)
      });
  });
});

deleteRoomID()