const mong = require('mongoose');

const schemaMethod = mong.Schema;
const mealSchema = new schemaMethod(
    {
        name: {
            type: String,
            required: true
        },
        _id:{
            type:String
        }
    }
)
module.exports = mong.model('Meal', mealSchema, 'mealType')