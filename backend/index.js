const db = require("./db")
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const app = express()

app.set("trust proxy", 1)

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "https://shiny-broccoli-7r4gg65p9gr2xxr6-5173.app.github.dev/",
    credentials: false,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"]
}))
app.use(session({
    secret: "asdasdasdasdasdasd",
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        // sameSite: "strict", для codespace
        sameSite: "none",
        secure: true,
        domain: undefined // для codespace
    }
}))

app.get("/auth/me", (req, res) => {
    console.log(req.session)
    if (req.session.userId) {
        return res.json({ loggedIn: true })
    }
})

app.post("/auth/signin", (req, res) => {
    const createdUser = db
        .prepare(`SELECT * FROM users WHERE id = ?`)
        .get(newUser.lastInsertRowid);

    req.session.userId = createdUser.id
    req.session.email = createdUser.email

    res.status(201).json(createdUser)
})

app.post("/signup", (req, res) => {
    try {
        const hashed = bcrypt.hashSync(req.body.password, 10)
        const newUser = db
            .prepare(`INSERT INTO users (email, password) VALUES (?, ?)`)
            .run(req.body.email, hashed);
        const createdUser = db
            .prepare(`SELECT * FROM users WHERE id = ?`)
            .get(newUser.lastInsertRowid);


        req.session.userId = createdUser.id
        req.session.email = createdUser.email


        res.status(201).json(createdUser)
    } catch (error) {
        console.error(error)
        res.json(error)
    }
})

app.listen("3000", () => {
    console.log("Порт3000")
})