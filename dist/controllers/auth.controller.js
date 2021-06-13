"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatioToken = exports.signin = exports.signup = void 0;
var typeorm_1 = require("typeorm");
var Users_1 = require("../entity/Users");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("./../config/config");
var service_1 = require("../service/service");
var ResultToken = /** @class */ (function () {
    function ResultToken(message, expired, user) {
        this.message = message;
        this.expired = expired;
        this.user = user;
    }
    return ResultToken;
}());
var getUserByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.users).findOne({ email: email })];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userDB, userFound, password, userCreate, user, token, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userDB = typeorm_1.getRepository(Users_1.users);
                return [4 /*yield*/, getUserByEmail(req.body.email)];
            case 1:
                userFound = _a.sent();
                if (userFound)
                    return [2 /*return*/, res.status(422).json({ message: "Este usuario ya esta registrado" })];
                return [4 /*yield*/, service_1.passwordEncrypt(req.body.password)];
            case 2:
                password = _a.sent();
                userCreate = userDB.create({
                    name: req.body.name,
                    email: req.body.email,
                    token: "",
                    password: password
                });
                return [4 /*yield*/, userDB.save(userCreate)];
            case 3:
                user = _a.sent();
                return [4 /*yield*/, service_1.createToken(user.id)];
            case 4:
                token = _a.sent();
                user.token = token;
                return [4 /*yield*/, userDB.save(user)];
            case 5:
                newUser = _a.sent();
                return [2 /*return*/, res.status(201).json(newUser)];
        }
    });
}); };
exports.signup = signup;
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, email, user, isPassword, token, AuthenticatedUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, password = _a.password, email = _a.email;
                if (!email)
                    return [2 /*return*/, res.status(400).json({ message: "Algo salio mal" })];
                return [4 /*yield*/, getUserByEmail(email)];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: "Este usuario no esta registrado" })];
                return [4 /*yield*/, service_1.comparePassword(password, user.password)];
            case 2:
                isPassword = _b.sent();
                if (!isPassword)
                    return [2 /*return*/, res.status(400).json({ message: "contraseña incorrecta" })];
                return [4 /*yield*/, service_1.createToken(user.id)];
            case 3:
                token = _b.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.users).save(__assign(__assign({}, user), { token: token }))];
            case 4:
                AuthenticatedUser = _b.sent();
                return [2 /*return*/, res.status(200).json(AuthenticatedUser)];
        }
    });
}); };
exports.signin = signin;
var validatioToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, dataToken, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.headers.token;
                if (!token || token === "null") {
                    return [2 /*return*/, res.status(400).json(new ResultToken("Token expirado", true, {}))];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                dataToken = jsonwebtoken_1.default.verify(token, config_1.config.KEY);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.users).findOne({ id: dataToken.id })];
            case 2:
                user = _a.sent();
                if (user && user.token !== token) {
                    return [2 /*return*/, (res.status(400).json(new ResultToken("Token expirado", true, {})))];
                }
                return [2 /*return*/, res.status(200).json(new ResultToken("Token exitoso", false, user))];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(400).json(new ResultToken("Token invalido", true, {}))];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.validatioToken = validatioToken;
