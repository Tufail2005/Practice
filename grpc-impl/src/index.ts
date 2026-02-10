// import path from "path";
// import * as grpc from "@grpc/grpc-js";
// import { type ServiceClientConstructor } from "@grpc/grpc-js";
// import * as protoLoader from "@grpc/proto-loader";
// import type { ProtoGrpcType } from "./generated/a";

// const packageDefinition = protoLoader.loadSync(
//   path.join(__dirname, "../src/a.proto")
// );
// const personProto = grpc.loadPackageDefinition(
//   packageDefinition
// ) as unknown as ProtoGrpcType;

// const PERSONS = [
//   {
//     name: "Tufail",
//     age: 99,
//   },
//   {
//     name: "Asu",
//     age: 55,
//   },
// ];

// //  @ts-ignore
// // call here is same as req in express
// // callback here is same as res in express here in 1st arg is error and 2nd is the normal response
// function addPerson(call, callback) {
//   console.log(call);
//   let person = {
//     name: call.request.name,
//     age: call.request.age,
//   };
//   PERSONS.push(person);
//   callback(null, person);
// }

// //@ts-ignore
// function getPersonByName(call, callback) {
//   const nameToFind = call.request.name;

//   const person = PERSONS.find((p) => p.name === nameToFind);

//   if (person) {
//     callback(null, person);
//   } else {
//     callback({
//       code: grpc.status.NOT_FOUND,
//       details: "Person not found",
//     });
//   }
// }

// const server = new grpc.Server();

// // server.addService is same as app.use("/person", routeHandler) in express
// server.addService(
//   (personProto.AddressBookService as ServiceClientConstructor).service,
//   { addPerson: addPerson, getPersonByName: getPersonByName }
// );

// // this will start the server just like app.listen in express
// server.bindAsync(
//   "0.0.0.0:50051",
//   grpc.ServerCredentials.createInsecure(),
//   (err, port) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(`Server running at http://0.0.0.0:${port}`);
//   }
// );

// -------------------------------------------------------------
// with auto genereted type script written in package.json
// -------------------------------------------------------------

import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

// Import generated types
import { type ProtoGrpcType } from "./generated/a";
import { type AddressBookServiceHandlers } from "./generated/AddressBookService";
import { type Person } from "./generated/Person";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../src/a.proto")
);

// Cast the loaded package to our generated type 'ProtoGrpcType'
// This gives us autocomplete for personProto.AddressBookService
const personProto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

// ----------------------------------------------------
//  Database (In-Memory)
// ----------------------------------------------------
const PERSONS: Person[] = [
  { name: "Tufail", age: 99 },
  { name: "Asu", age: 55 },
];

// ----------------------------------------------------
// Define Handlers
// ----------------------------------------------------
const handlers: AddressBookServiceHandlers = {
  AddPerson: (call, callback) => {
    console.log("Received AddPerson request:", call.request);

    let person: Person = {
      name: call.request.name || "Unknown",
      age: call.request.age || 0,
    };

    PERSONS.push(person);
    callback(null, person);
  },

  GetPersonByName: (call, callback) => {
    console.log("Received GetPersonByName request:", call.request);

    const person = PERSONS.find((p) => p.name === call.request.name);

    if (person) {
      callback(null, person);
    } else {
      callback(
        {
          code: grpc.status.NOT_FOUND,
          details: "Person not found",
        },
        null
      );
    }
  },
};

// ----------------------------------------------------
// Start Server
// ----------------------------------------------------
const server = new grpc.Server();

server.addService(personProto.AddressBookService.service, handlers);

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server running at http://0.0.0.0:${port}`);
  }
);
