import * as dotenv from "dotenv";
import express = require("express");
import expressGraphQL = require("express-graphql");
import {connect} from "mongoose";
import {Schema} from "../graphql/schema";
const configLoad = dotenv.config();

/**
 * Highest level logic that handles all express operations related to this project
 */
class Application {
  private app = express();
  private port: number = typeof(process.env.PORT) === "string" ? parseInt(process.env.PORT, 10) : 80;
  private graphiql: boolean = process.env.NODE_ENV === "development" || "undefined" ? true : false;
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

    this.app.listen(this.port, () => {
      // tslint:disable-next-line
      console.log(`Express Application Running On Port ${this.port}`);
    });
  }
}

export { Application };
