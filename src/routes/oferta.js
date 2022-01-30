const { Router } = require("express");
const router = Router();

const { 
    list,
    search,
    create,
    update,
    eliminar
} = require("../controllers/oferta");

router.get("/", list);

router.get("/search/:id", search);

router.post("/create", create);

router.put("/update/:id", update);

router.delete("/delete/:id", eliminar);



module.exports = router;