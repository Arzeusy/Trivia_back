const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("api generals");
});

module.exports = router