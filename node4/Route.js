const exp = require('express');
const RouteOne = exp.Router();
const placesFromDb = require("./controller/placeControl");
const restaurantFromDb = require("./controller/restaurantControl");
const meltypeFromDb = require("./controller/mealtypeController");
const signup = require("./controller/logInController");
const menu = require("./controller/menuController");


RouteOne.get('/placesDb', placesFromDb.getLocations);
RouteOne.get('/restaurants', restaurantFromDb.getRestaurant);
RouteOne.get('/byloc/:cityId', restaurantFromDb.getRestaurantDetailsByLocation);
RouteOne.get('/restaurant/:id', restaurantFromDb.getRestaurantDetailsById);
RouteOne.get('/mealType', meltypeFromDb.getmealType);
RouteOne.get('/meal/:mealId', meltypeFromDb.getMealTypeById);
RouteOne.post('/register', signup.getRegister);
RouteOne.get('/login', signup.getLogIn);
RouteOne.get('/menu/:restId', menu.getMenuByRest);
RouteOne.post('/restaurantByCity', restaurantFromDb.getRestaurantByCity);


    


module.exports = RouteOne;