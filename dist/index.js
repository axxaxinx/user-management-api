"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("./routes/user"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123*",
    database: "user_management",
    entities: ["src/entities/*.ts"],
    synchronize: true,
    logging: true,
    migrationsRun: true
});
const app = (0, express_1.default)();
const APP_PORT = 3000;
app.use(express_1.default.json());
app.use("/users", user_1.default);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Initialize database connection
            yield exports.AppDataSource.initialize();
            console.log("Connected to MySQL");
            // Start Express server and store the instance
            const server = app.listen(APP_PORT, () => {
                console.log(`Server running on http://localhost:${APP_PORT}`);
            });
        }
        catch (error) {
            console.error("Database connection failed:", error);
            process.exit(1);
        }
    });
}
startServer();
