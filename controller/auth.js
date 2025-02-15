const Auth = require("../models/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Request'ten gelen body'den username,email ve password'ü alıyoruz.

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Lütfen tüm alanları doldurunuz !" });
    } // Eğer boş bir alan varsa hata döndürüyoruz.

    const user = await Auth.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "Bu kullanıcı önceden kayıt edilmiş !" });
    } // Eğer kullanıcı önceden oluşturulmuşsa hata döndürüyoruz.

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Şifre en az 6 karakter olmalıdır !" });
    } // Eğer şifre 6 karakterden azsa hata döndürüyoruz.

    const passwordHash = await bcrypt.hash(password, 12); // Şifreyi hash'liyoruz.

    const newUser = await Auth.create({
      username,
      email,
      password: passwordHash,
    }); // newUser adında yeni bir kullanıcı oluşturuyoruz.

    const userToken = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    ); // Token oluşturuyoruz. ID olarak user'ın ID'sini veriyoruz. .env içerisinden JWT_SECRET alıyoruz.

    res.status(201).json({
      status: "success",
      newUser,
      userToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Request'ten gelen body'den email ve password'ü alıyoruz.

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Lütfen tüm alanları doldurunuz !" });
    } // Eğer boş bir alan varsa hata döndürüyoruz.

    const user = await Auth.findOne({ email }); // Email'e göre kullanıcıyı buluyoruz.

    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı !" });
    } // Eğer kullanıcı bulunamazsa hata döndürüyoruz.

    const isMatchPassword = await bcrypt.compare(password, user.password); // Girilen şifreyi hash'li şifre ile karşılaştırıyoruz.

    if (!isMatchPassword) {
      return res.status(400).json({ message: "Hatalı şifre !" });
    } // Eğer şifre hatalıysa hata döndürüyoruz.

    const userToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    ); // Token oluşturuyoruz. ID olarak user'ın ID'sini veriyoruz. .env içerisinden JWT_SECRET alıyoruz.

    res.status(200).json({
      status: "success",
      user,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {register, login};