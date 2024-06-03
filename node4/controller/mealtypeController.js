const mealData = require('../Models/mealtypeDb');
exports.getmealType = (req, res) => {
    mealData.find()
        .then(response => {
            res.status(200).json({
                message: "fetched  successfully",
                mealType: response
            })

        }).catch(err => { res.status(500).json({ error: err }) });
}

exports.getMealTypeById = (req, res) => {

    const { mealId } = req.params;
    
    mealData.findById(mealId)
        .then(response => {
            res.status(200).json({
                message: "Meal By Id Fetched Successfully",
                mealById: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}