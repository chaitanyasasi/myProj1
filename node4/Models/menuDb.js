const mong = require("mongoose");
const schemaMethod = mong.Schema;
const instanceSchema = new schemaMethod({

    name: {
        type: String,
        required: true
    }
})
module.exports = mong.model("menu", instanceSchema, "menu");