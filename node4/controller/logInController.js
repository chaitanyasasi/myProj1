const logInData = require('../Models/logIn');

exports.getRegister = (request, response) => {
    const { email, password, name } = request.body;

    const instanceOfLogin = new logInData({
        email, password, name
    })
    instanceOfLogin.save()
        .then(res => {
            response.status(200).json({
                message: 'register successful',
                signUp: res
            })
        }).catch(err => {
            response.status(500).json({ error: err })
        })
}
exports.getLogIn = (req, res) => {
    const { email, password } = req.body;
    logInData.find({ email, password })
        .then(response => {
            if (response.length > 0) {
                res.status(200).json({
                    message: "user Found",
                    output: response
                })
            } else {
                res.status(200).json({
                    message: "user Not Found",
                    output: response

                })
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
}