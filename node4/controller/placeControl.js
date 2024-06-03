const locationDb = require('../Models/placesDb');
exports.getLocations = (req, res) => {
    locationDb.find()
        .then(response => {
            res.status(200).json({
                message: "data fetched from successfully from DB",
                places: response

            })

        }).catch(err => {
            res.status(500).json({ error: err })
        })
}