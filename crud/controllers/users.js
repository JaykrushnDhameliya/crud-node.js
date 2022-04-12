const {User} = require('../model/model');

const getUser = (req, res) => {
    User.find().sort({createdAt: -1})
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(`There is an error in the server while loading projects`);
        });
}

const getUserId = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

const createUser = (req, res) => {

    const user = new User(req.body);
    user.save()
        .then(result => {
            res.status(201).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

const deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

const updateUser = async (req, res) => {
    try {
        const details = await User.findByIdAndUpdate({_id: req.params.id}, req.body);
        console.log(req.body);
        if (details && details._id) {
            res.send(details);
        } else {
            res.send("No Record Found");
        }

    } catch (err) {
        res.send(err);
        console.log("err", err);
    }
};

module.exports = {
    getUser,
    getUserId,
    createUser,
    deleteUser,
    updateUser
};