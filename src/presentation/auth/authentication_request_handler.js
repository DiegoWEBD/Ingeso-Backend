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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthenticationRequestHandler = void 0;
var http_response_1 = require("../http/http_response");
var http_error_1 = require("../http/http_error");
var axios_1 = require("axios");
var jsonwebtoken_1 = require("jsonwebtoken");
var UserAdapter_1 = require("../../infrastructure/user/adapter/UserAdapter");
var makeAuthenticationRequestHandler = function (userServices) {
    return function (request) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, jwtSecret, userGoogleAccessToken, googleTokenResponse, userInfoResponse, _b, name_1, email, user, accessToken_1, accessToken;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = request.method;
                    switch (_a) {
                        case 'POST': return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 6];
                case 1:
                    jwtSecret = process.env.JWT_SECRET;
                    if (!jwtSecret) {
                        throw new http_error_1.default(500, 'JWT_SECRET no está definida en las variables de entorno.');
                    }
                    userGoogleAccessToken = request.body.google_access_token;
                    return [4 /*yield*/, axios_1.default.get("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=".concat(userGoogleAccessToken))];
                case 2:
                    googleTokenResponse = _c.sent();
                    if (googleTokenResponse.data.aud !== process.env.GOOGLE_CLIENT_ID) {
                        throw new http_error_1.default(401, 'Token de google inválido.');
                    }
                    return [4 /*yield*/, axios_1.default.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                            headers: {
                                Authorization: "".concat(request.body.token_type, " ").concat(userGoogleAccessToken),
                            },
                        })];
                case 3:
                    userInfoResponse = _c.sent();
                    _b = userInfoResponse.data, name_1 = _b.name, email = _b.email;
                    return [4 /*yield*/, userServices.findUser(email)];
                case 4:
                    user = _c.sent();
                    if (user !== null) {
                        accessToken_1 = jsonwebtoken_1.default.sign({
                            name: user.getName(),
                            email: user.getInstitutionalEmail(),
                        }, jwtSecret, {
                            expiresIn: '24h',
                        });
                        return [2 /*return*/, (0, http_response_1.makeHttpResponse)(200, {
                                message: 'Inicio de sesión exitoso.',
                                access_token: accessToken_1,
                                user: UserAdapter_1.default.ToJSON(user),
                            })];
                    }
                    return [4 /*yield*/, userServices.registerStudent(email, name_1)];
                case 5:
                    user = _c.sent();
                    accessToken = jsonwebtoken_1.default.sign({
                        name: user.getName(),
                        email: user.getInstitutionalEmail(),
                    }, jwtSecret, {
                        expiresIn: '24h',
                    });
                    return [2 /*return*/, (0, http_response_1.makeHttpResponse)(201, {
                            message: 'Estudiante registrado.',
                            access_token: accessToken,
                            user: UserAdapter_1.default.ToJSON(user),
                        })];
                case 6:
                    {
                        throw new http_error_1.default(405, "M\u00E9todo ".concat(request.method, " no permitido."));
                    }
                    _c.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); };
};
exports.makeAuthenticationRequestHandler = makeAuthenticationRequestHandler;
