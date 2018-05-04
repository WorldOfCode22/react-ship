import express = require("express");
import expressGraphQL = require("express-graphql");
import {Schema} from "../graphql/schema";
/**
 * Highest level logic that handles all express operations related to this project
 */
class Application {
  private app = express();
  private port: number = typeof(process.env.PORT) === "string" ? parseInt(process.env.PORT, 10) : 80;
  private graphiql: boolean = process.env.NODE_ENV === "development" || "undefined" ? true : false;
  constructor() {
    this.expressSetup();
  }

  private expressSetup() {
    this.app.use("/graphql", expressGraphQL({
      graphiql: this.graphiql,
      schema: Schema,
    }));

    this.app.listen(this.port, () => {
      // tslint:disable-next-line
      console.log(`Express Application Running On Port ${this.port}`);
    });
  }
}

export { Application };
