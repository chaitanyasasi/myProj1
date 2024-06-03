const mong = require('mongoose');
const schemaMethod = mong.Schema;
const schemaData = new schemaMethod(
    {
        name: {
            type: String,
            required: true

        }
    }
)
module.exports = mong.model("location", schemaData, "location");

