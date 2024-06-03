const mong = require('mongoose');

const restSchema = mong.Schema;
const schemaData = new restSchema(
    {
        name: {
            type: String,
            required: true,
        },
        city: {
            type: Number,
            required: true,

        }
    }
)
module.exports = mong.model('restaurants', schemaData, "restaurants")

