import Router from "../app/router";
import UserController from "../controllers/user-controller";
import { Request as req, Response as res } from "express";
import VerifyAuth from "../auth/verify-token";

const controller = new UserController();
const pathController = "/users";

//test in postman the post => http://localhost:8080/users/v1/signup
Router.post(pathController + "/v1/signup", controller.register);

//test in postman the post => http://localhost:8080/users/v1/login
Router.post(pathController + "/v1/login", controller.login);

//test in postman the post => http://localhost:8080/users/v1/get/{guid} - id of user
Router.get(pathController + "/v1/get/:id", VerifyAuth, controller.getById); //this can be accessed if u are logged in with auth-token in headers.

//test in postman the post => http://localhost:8080/users/v1/get
Router.get(pathController + "/v1/get", VerifyAuth, controller.getAllUsers); //this can be accessed if u are logged in with auth-token in headers.
