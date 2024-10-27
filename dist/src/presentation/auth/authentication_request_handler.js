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
exports.makeAuthenticationRequestHandler = void 0;
const http_response_1 = require("../http/http_response");
const http_error_1 = __importDefault(require("../http/http_error"));
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserAdapter_1 = __importDefault(require("../../infrastructure/user/adapter/UserAdapter"));
const makeAuthenticationRequestHandler = (userServices) => {
    return (request) => __awaiter(void 0, void 0, void 0, function* () {
        switch (request.method) {
            case 'POST': {
                const jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new http_error_1.default(500, 'JWT_SECRET no está definida en las variables de entorno.');
                }
                const userGoogleAccessToken = request.body.google_access_token;
                const googleTokenResponse = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${userGoogleAccessToken}`);
                if (googleTokenResponse.data.aud !== process.env.GOOGLE_CLIENT_ID) {
                    throw new http_error_1.default(401, 'Token de google inválido.');
                }
                const userInfoResponse = yield axios_1.default.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `${request.body.token_type} ${userGoogleAccessToken}`,
                    },
                });
                const { name, email } = userInfoResponse.data;
                let user = yield userServices.findUser(email);
                if (user !== null) {
                    const accessToken = jsonwebtoken_1.default.sign({
                        name: user.getName(),
                        email: user.getInstitutionalEmail(),
                    }, jwtSecret, {
                        expiresIn: '24h',
                    });
                    return (0, http_response_1.makeHttpResponse)(200, {
                        message: 'Inicio de sesión exitoso.',
                        access_token: accessToken,
                        user: UserAdapter_1.default.ToJSON(user),
                    });
                }
                user = yield userServices.registerStudent(email, name);
                const accessToken = jsonwebtoken_1.default.sign({
                    name: user.getName(),
                    email: user.getInstitutionalEmail(),
                }, jwtSecret, {
                    expiresIn: '24h',
                });
                return (0, http_response_1.makeHttpResponse)(201, {
                    message: 'Estudiante registrado.',
                    access_token: accessToken,
                    user: UserAdapter_1.default.ToJSON(user),
                });
            }
            default: {
                throw new http_error_1.default(405, `Método ${request.method} no permitido.`);
            }
        }
    });
};
exports.makeAuthenticationRequestHandler = makeAuthenticationRequestHandler;
