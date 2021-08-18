let express = require('express');
let router = express.Router(); 
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

router.get('/test', (req, res) => {
    res.send('Log controller is working')
});

router.get('/test2', validateSession, (req, res) => {
    res.send('Log controller is working')
});

/* **************************
*** LOG CREATE ***
*************************** */
router.post('/create', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
})

/* **************************
*** GET ALL ENTRIES ***
*************************** */
router.get('/', (req, res) => {
    Log.findAll()
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});
/* **************************
*** Removing based on feedback from Rob ***
*************************** */
// router.get('/mine', validateSession, (req, res) => {
//     let userid = req.user.id
//     Log.findAll({
//         where: { owner_id: userid }
//     })
//     .then(logs => res.status(200).json(logs))
//     .catch(err => res.status(500).json({ error: err }))
// });

/* **************************************
*** GET ENTRIES BY USER AND ENTRY ID ***
************************************** */
router.get('/:id', validateSession, (req, res) => {
    Log.findOne({
        where: { id: req.params.id }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

/* **************************
*** UPDATE ENTRIES ***
*************************** */
router.put('/:id', validateSession, (req, res) => {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
    };

    const query = { where: { id: req.params.id }}

    Log.update(updateLogEntry, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

/* **************************
*** DELETE ENTRIES ***
*************************** */
router.delete('/:id', validateSession, (req, res) => {
    const query = { where: { id: req.params.id, owner_id: req.user.id } }

    Log.destroy(query)
        .then(() => res.status(200).json({ message: 'Log has been deleted.' }))
        .catch((err) => res.status(500).json({ error: err }));
}); 

module.exports = router;