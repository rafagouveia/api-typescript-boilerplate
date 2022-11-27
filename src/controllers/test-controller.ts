import { Request, Response } from "express";

class TestController {
    helloWorld = async (request: Request, response: Response) => {
        response.send({ message: "Hello World!" });
    };

    testHelloController = async (request: Request, response: Response) => {
        response.send({ message: "Hello Controller!" });
    };
}

export default TestController;
