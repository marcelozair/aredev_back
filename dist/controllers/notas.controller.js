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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNota = exports.updateNota = exports.getNotaById = exports.getNotas = exports.createNota = void 0;
var typeorm_1 = require("typeorm");
var Notas_1 = require("../entity/Notas");
var NotasUsers_1 = require("../entity/NotasUsers");
var createNota = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bodyNota, notaCreate, nota, notaByUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.userID) {
                    return [2 /*return*/, res.status(205).json({ message: "Algo a salido mal" })];
                }
                bodyNota = {
                    title: req.body.title ? req.body.title : "Nueva nota",
                    body: req.body.body ? req.body.body : ""
                };
                notaCreate = typeorm_1.getRepository(Notas_1.notas).create(bodyNota);
                return [4 /*yield*/, typeorm_1.getRepository(Notas_1.notas).save(notaCreate)];
            case 1:
                nota = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(NotasUsers_1.notas_users).create({
                        user_id: Number(req.body.userID),
                        nota_id: nota.id
                    })];
            case 2:
                notaByUser = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(NotasUsers_1.notas_users).save(notaByUser)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json(nota)];
        }
    });
}); };
exports.createNota = createNota;
var getNotas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var notasForUser, notaList, notasForUser_1, notasForUser_1_1, nota, _a, _b, e_1_1;
    var e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(NotasUsers_1.notas_users).find({ user_id: req.body.userID })];
            case 1:
                notasForUser = _d.sent();
                notaList = [];
                _d.label = 2;
            case 2:
                _d.trys.push([2, 7, 8, 9]);
                notasForUser_1 = __values(notasForUser), notasForUser_1_1 = notasForUser_1.next();
                _d.label = 3;
            case 3:
                if (!!notasForUser_1_1.done) return [3 /*break*/, 6];
                nota = notasForUser_1_1.value;
                _b = (_a = notaList).push;
                return [4 /*yield*/, typeorm_1.getRepository(Notas_1.notas).findOne({ id: nota.nota_id })];
            case 4:
                _b.apply(_a, [_d.sent()]);
                _d.label = 5;
            case 5:
                notasForUser_1_1 = notasForUser_1.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (notasForUser_1_1 && !notasForUser_1_1.done && (_c = notasForUser_1.return)) _c.call(notasForUser_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/, res.json(notaList)];
        }
    });
}); };
exports.getNotas = getNotas;
var getNotaById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nota, notaUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Notas_1.notas).findOne(req.params.id)];
            case 1:
                nota = _a.sent();
                if (!nota)
                    return [2 /*return*/, res.json({ message: "Esa nota no existe" })];
                return [4 /*yield*/, typeorm_1.getRepository(NotasUsers_1.notas_users)
                        .createQueryBuilder("nu")
                        .where("nu.nota_id = :nota_id", { nota_id: nota.id })
                        .getOne()];
            case 2:
                notaUser = _a.sent();
                if (notaUser) {
                    if (notaUser.user_id !== req.body.userID)
                        return [2 /*return*/, res.json({ message: "No tienes permisos para hacer esto" })];
                }
                else {
                    return [2 /*return*/, res.json({ message: "Algo a salido mal" })];
                }
                return [2 /*return*/, res.json(nota)];
        }
    });
}); };
exports.getNotaById = getNotaById;
var updateNota = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var notaModify, nota, notaUser, newNota;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                notaModify = {
                    title: req.body.title,
                    body: req.body.body
                };
                return [4 /*yield*/, typeorm_1.getRepository(Notas_1.notas).findOne(req.params.id)];
            case 1:
                nota = _a.sent();
                if (!nota)
                    return [2 /*return*/, res.json({ message: "Esa nota no existe" })];
                return [4 /*yield*/, typeorm_1.getRepository(NotasUsers_1.notas_users)
                        .createQueryBuilder("nu")
                        .where("nu.nota_id = :nota_id", { nota_id: nota.id })
                        .getOne()];
            case 2:
                notaUser = _a.sent();
                if (notaUser) {
                    if (notaUser.user_id !== req.body.userID)
                        return [2 /*return*/, res.json({ message: "No tienes permisos para hacer esto" })];
                }
                else {
                    return [2 /*return*/, res.json({ message: "Algo a salido mal" })];
                }
                typeorm_1.getRepository(Notas_1.notas).merge(nota, notaModify);
                return [4 /*yield*/, typeorm_1.getRepository(Notas_1.notas).save(nota)];
            case 3:
                newNota = _a.sent();
                return [2 /*return*/, res.json(newNota)];
        }
    });
}); };
exports.updateNota = updateNota;
var deleteNota = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteNota;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Notas_1.notas).delete(req.params.id)];
            case 1:
                deleteNota = _a.sent();
                if (!deleteNota.affected)
                    res.json({ message: "Está nota ya a sido eliminada" });
                return [2 /*return*/, res.json({ message: "Se elimino correctamente" })];
        }
    });
}); };
exports.deleteNota = deleteNota;
