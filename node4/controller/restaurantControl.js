const restSchema = require('../Models/restaurantDb');
exports.getRestaurant = (req, res) => {
    restSchema.find()
        .then(response => {
            res.status(200).json({
                message: "restaurant detailed fetched successfully",
                Restaurant: response
            });
        }).catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getRestaurantDetailsByLocation = (req, res) => {
    const { cityId } = req.params;
    restSchema.find({ city: cityId })
        .then((response) => {
            res.status(200).json({
                message: "restaurant detailed fetched successfully",
                RestaurantByCity: response
            });
        }).catch((err) => {
            res.status(500).json({ error: err })
        });
}

exports.getRestaurantDetailsById = (req, res) => {
    const { id } = req.params
    restSchema.findById(id)
        .then((response) => {
            res.status(200).json(({
                message: "restaurant detailed fetched successfully",
                RestaurantById: response
            }))
        }).catch((err) => {
            res.status(500).json({ error: err })
        })
}

exports.getRestaurantByCity = (req, res) => {
    let { location, mealTypeOfRest, lcost, hcost, cuisineRest, sorting, page } = req.body;

    sorting = sorting ? sorting : 1;
    page = page ? page : 1;

    const itemsPerPage = 2;
    const startIndex = page * itemsPerPage - itemsPerPage;
    const endIndex = page * itemsPerPage

    var locResult = {};
    location && (locResult["city"] = location);
    mealTypeOfRest && (locResult["type.mealtype"] = mealTypeOfRest);
    lcost && hcost && (locResult["cost"] = { $gte: lcost, $lte: hcost });
    cuisineRest && (locResult["Cuisine.cuisine"] = { $in: cuisineRest });

    restSchema.find(locResult).sort({ cost: sorting })
        .then((response) => {
            const pageResult = response.slice(startIndex, endIndex)
            res.status(200).json(({
                message: "restaurant by city detailed fetched successfully",
                RestaurantByFilters: pageResult
            }))
        }).catch((err) => {
            res.status(500).json({ error: err })
        })
}