import * as dotenv from "dotenv";
import express = require("express");
import expressGraphQL = require("express-graphql");
import {createServer} from "http";
import {connect} from "mongoose";
import socketIo from "socket.io";
import {Schema} from "../graphql/schema";
import SocketManager from "./socket-manager";
const configLoad = dotenv.config();

/**
 * Highest level logic that handles all express operations related to this project
 */
class Application {
  private app = express();
  private http = createServer(this.app);
  private port: number = typeof(process.env.PORT) === "string" ? parseInt(process.env.PORT, 10) : 80;
  private graphiql: boolean = process.env.NODE_ENV === "development" || "undefined" ? true : false;
  private io: SocketManager = new SocketManager(this.http);
  private mongoURI: string = typeof(process.env.MONGO_URI) === "string" ? process.env.MONGO_URI : "";
  constructor() {
    this.expressSetup();
  }

  private expressSetup() {
    this.app.use("/graphql", expressGraphQL({
      graphiql: this.graphiql,
      schema: Schema,
    }));

    connect(this.mongoURI)
      .then(
        // tslint:disable-next-line
        () => {console.log("Database Connected")},
        // tslint:disable-next-line
        (err) => { console.warn("Database Connection Error!" + err) }
      );

    this.http.listen(this.port, () => {
      // tslint:disable-next-line
      console.log(`Express Application Running On Port ${this.port}`);
    });
  }
}

export default Application;
