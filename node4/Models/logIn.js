const mong = require('mongoose');
const schemaMethod = mong.Schema;
const instanceOfSchema = new schemaMethod(
    {
        email: String,
        password: String,
        name: String
    }

)
module.exports = mong.model('login', instanceOfSchema, "LogInRegister");
