const express = require("express");
const dataController = require("../controller/data-controller");

const router = express.Router();


router.get('/hello', dataController.hello);
router.get('/skills', dataController.skills);
router.post('/updateSkills', dataController.updateSkills);



module.exports = router;