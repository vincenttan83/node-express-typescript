"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const Pool = require('pg').Pool;
const NODE_ENV = process.env.NODE_ENV || 'production';
const pool = new Pool({
    user: 'postgres',
    host: NODE_ENV === 'production' ? 'host.docker.internal' : 'localhost',
    database: 'autolive',
    password: 'helloworld',
    port: 5432,
});
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is running...');
});
app.get('/users', (req, res) => {
    pool.query('SELECT * FROM users ORDER BY name ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});
app.post('/users', (req, res) => {
    const { name } = req.body;
    const uuid = (0, uuid_1.v4)();
    pool.query('INSERT INTO users (uuid, name) VALUES ($1, $2)', [uuid, name], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send({ result: 'User added!' });
    });
});
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM users WHERE uuid = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send({ result: `User deleted with ID: ${id}` });
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
