const { Router } = require("express");
const router = Router();

const { 
    list,
    search,
    create,
    update,
    dilit
} = require("../controllers/contact");

router.get("/list", list);

router.get("/search/:id", search);

router.post("/create", create);

router.put("/update/:id", update);

router.delete("/delete/:id", dilit);



module.exports = router;