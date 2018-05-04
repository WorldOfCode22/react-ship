import express = require("express");
/**
 * Highest level logic that handles all express operations related to this project
 */
class Application {
  private app = express();
  private port: number = typeof(process.env.PORT) === "string" ? parseInt(process.env.PORT, 10) : 80;
  constructor() {
    this.expressSetup();
  }

  private expressSetup() {
    this.app.listen(this.port, () => {
      // tslint:disable-next-line
      console.log(`Express Application Running On Port ${this.port}`);
    });
  }
}

export { Application };
