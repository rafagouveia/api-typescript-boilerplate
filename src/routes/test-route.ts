import Router from "../app/router";
import TestController from "../controllers/test-controller";

const controller = new TestController();
const pathController = "/test";

//test in postman the get => http://localhost:8080/test/v1/helloworld
Router.get(pathController + "/v1/helloworld", controller.helloWorld);

//test in postman the get => http://localhost:8080/test/v1/testhellocontroller
Router.get(
    pathController + "/v1/testhellocontroller",
    controller.testHelloController
);
