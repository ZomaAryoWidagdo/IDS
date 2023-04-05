"use strict";
const Test = require("../controllers");
const router = require("express").Router();

router.get("/", Test.getAll);
router.get("/:id", Test.getById);

router.post("/", Test.add);

router.patch("/:id", Test.edit);

module.exports = router;
