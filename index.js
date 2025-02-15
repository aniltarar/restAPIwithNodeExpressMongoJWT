const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const connectDatabase = require('./config/database.js');
const authRoutes = require('./routes/auth.js');
const postRoutes = require("./routes/post.js")

dotenv.config(); // .env dosyasını okuyoruz.
app.use(cors()); // CORS 'u aktifleştiriyoruz.
app.use(express.json()); // JSON veri alışverişini aktifleştiriyoruz.


app.use("/", authRoutes); // /'e gelen istekleri authRoutes'a yönlendiriyoruz.
app.use("/post", postRoutes); // /post'a gelen istekleri postRoutes'a yönlendiriyoruz.



app.get('/', (req, res) => {
    res.json({message:"Hello World"});
});

connectDatabase() // MongoDB bağlantısını yapıyoruz.
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    });