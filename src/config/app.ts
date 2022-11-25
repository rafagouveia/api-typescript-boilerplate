import expressapp, { Express, Router } from "express";

export class App {
  private instance: Express;
  constructor() {
    this.instance = expressapp();
  }

  public run(port = 8080) {
    this.instance.listen(port, () => {
      console.log("Server running");
    });
  }
  public routes(): Router{
    return this.instance;
  }
}
