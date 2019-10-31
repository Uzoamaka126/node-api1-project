const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = require('./data/db');

app.put('/api/users/:id', editSelectedUser)
app.delete('/api/users/:id', deleteSelectedUser)
app.post('/api/users', createNewUser)
app.get('/api/users/:id', getUserById)
app.get('/api/users', getAllUsers);
app.use('*', (req, res) => res.status(404).json({
    status: 'Not Found',
    message: 'This route does not exist',
  }));


function editSelectedUser(req, res) {
    const { id  } = req.params;
    const updates = req.body;
    // const foundUser = db.find(user => user.id === id);

    db.update(id, updates)
        .then(user=> {
            if(user) {
                res.status(200).json({
                    success: 'true',
                    message: 'User has been sucessfully found',
                    user,
                });
            } else {
                return res.status(404).send({
                    success: 'false',
                    message: 'This user does not exist'
                })
            }
        })
        .error(err => {
            res.status(500).json(err);
        })
}

function deleteSelectedUser(req, res) {
    const { id } = req.params;
    db.remove(id)
        .then(deletedUser => {
            if(deletedUser) {
                res.status(204).end();
            } else {
                res.status(404).json({
                    message: 'User not found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
function createNewUser(req, res) {
    const newUser = {
        name: req.body.name,
        bio: req.body.bio,
        created_at: 'now',
    }
    db.insert(newUser)
        .then(res => {
            // console.log(data);
            db.find(data).then(newlyCreatedUser => {
                res.status(201).json(data); 
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: "There was an error while saving the user to the db"
            })
        })
}
function getUserById(req, res) {
    const { id } = req.params;
    db.findById(id)
        .then(data => {
            res.status(200).json(data);
        })
        .error(err => {
            console.log(err);
            res.status(404).json(err);
        })
}

function getAllUsers(req, res) {
    db.find()
        .then(data => {
            // console.log(data);
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err: "There was an error while saving the user to the database"})
        })
};

module.exports = app;