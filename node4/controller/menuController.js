const menu = require('../Models/menuDb');
exports.getMenuByRest = (req, res) => {
    const { restId } = req.params;
    menu.find({ restaurantId: restId }).then((response) => {
        res.status(200).json({
            message: "menu details fetched",
            menu: response
        })
    }).catch((err) => {
        res.status(500).json({ error: err })
    });
}