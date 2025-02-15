const express = require('express');
const router = express.Router();
const { register, login } = require("../controller/auth.js"); // Auth controller'dan register ve login fonksiyonlarını alıyoruz

router.post("/register",register); // /register'e post isteği gelince register fonksiyonu çalıştır. (Controller'da tanımlı)
router.post("/login",login); // /login'e post isteği gelince login fonksiyonu çalıştır. (Controller'da tanımlı)

module.exports = router; // router'ı dışarıya aktarıyoruz.