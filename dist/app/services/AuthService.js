"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const SecurityHelper_1 = __importDefault(require("../helpers/SecurityHelper"));
const AuthValidation_1 = __importDefault(require("../validation/AuthValidation"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const securityHelper = new SecurityHelper_1.default();
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async authentication(req) {
        const data = req.body;
        let returnData;
        const { error } = AuthValidation_1.default.authentication.validate(data, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };
            return returnData;
        }
        const findUserByEmail = await this.userRepository.checkEmailData(data.email);
        if (findUserByEmail) {
            if (findUserByEmail.deletedAt != null) {
                returnData = {
                    status: false,
                    response: "validation",
                    errors: "The email you provided has already been deleted and cannot be used for new data creation",
                };
                return returnData;
            }
            const checkPassword = await securityHelper.checkPassword(data.password, findUserByEmail.password);
            if (!checkPassword) {
                returnData = {
                    status: false,
                    response: "validation",
                    message: "Email or Password doesn't match",
                };
                return returnData;
            }
            const login = await this.login(req, findUserByEmail);
            returnData = login;
        }
        else {
            const register = await this.register(data);
            returnData = register;
        }
        return returnData;
    }
    async login(req, user) {
        let returnData;
        const generateToken = securityHelper.generateToken(user);
        req.session.currentUser = user;
        const dataLogin = {
            authorization: {
                token: generateToken,
                expired: moment_1.default().add(2, 'hours').toISOString()
            },
            data: user,
        };
        returnData = {
            status: true,
            response: "success",
            message: 'Successfully Login',
            data: dataLogin,
        };
        return returnData;
    }
    async register(data) {
        let returnData;
        const password = securityHelper.hashPassword(data.password);
        const dataUser = {
            email: data.email,
            password
        };
        const user = await this.userRepository.createData(dataUser);
        const dataUserHasRole = {
            data: {
                user_id: user.id,
                role_id: 2,
            },
        };
        const userHasRole = await prisma_1.default.userHasRole.create(dataUserHasRole);
        returnData = {
            status: true,
            response: "success-register",
            message: "Successfully Register",
            data: user,
        };
        return returnData;
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map