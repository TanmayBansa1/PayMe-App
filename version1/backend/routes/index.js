
const express = require("express");
const userRouter = require("./user");
const accountsRouter = require("./accounts");
const router = express.Router();

// const app = express();
router.use("/user",userRouter);
router.use("/accounts",accountsRouter);





module.exports = router;