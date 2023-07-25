"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserValidation_1 = __importDefault(require("../validation/UserValidation"));
class UserService {
    constructor(userRepository, profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }
    async getData() {
        const users = await this.userRepository.getData();
        const returnData = {
            status: true,
            response: "get",
            data: users,
        };
        return returnData;
    }
    async createData(data) {
        let returnData;
        const { error } = UserValidation_1.default.createUser.validate(data, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };
            return returnData;
        }
        if (data.gender !== 'male' && data.gender !== 'female') {
            returnData = {
                status: false,
                response: "validation",
                errors: "Invalid gender: It must be either male or female.",
            };
            return returnData;
        }
        const findUserByEmail = await this.userRepository.checkEmailData(data.email);
        if (findUserByEmail) {
            if (findUserByEmail.deletedAt === null) {
                returnData = {
                    status: false,
                    response: "validation",
                    message: "Email is already in use",
                };
            }
            else {
                returnData = {
                    status: false,
                    response: "server",
                    message: "The email you provided has already been deleted and cannot be used for new data creation",
                };
            }
            return returnData;
        }
        const password = bcrypt_1.default.hashSync(data.password, 10);
        const birthdayDate = new Date(data.birthday_date);
        const dataUser = {
            email: data.email,
            password,
            profiles: {
                create: {
                    firstName: data.first_name,
                    lastName: data.last_name,
                    gender: data.gender
                }
            }
        };
        const user = await this.userRepository.createData(dataUser);
        returnData = {
            status: true,
            response: "created",
            data: user,
        };
        return returnData;
    }
    async detailData(id) {
        const users = await this.userRepository.detailData(id);
        let returnData;
        if (users) {
            returnData = {
                status: true,
                response: "get",
                data: users,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID User Not Found",
            };
        }
        return returnData;
    }
    async updateData(id, data) {
        var _a, _b, _c, _d;
        const { error } = UserValidation_1.default.updateUser.validate(data, { abortEarly: false });
        let returnData;
        if (error) {
            const errors = error.details.map((err) => err.message);
            returnData = {
                status: false,
                response: "validation",
                errors: errors,
            };
            return returnData;
        }
        if (data.gender !== 'male' && data.gender !== 'female') {
            returnData = {
                status: false,
                response: "validation",
                errors: "Invalid gender: It must be either male or female.",
            };
            return returnData;
        }
        const checkUser = await this.userRepository.detailData(id);
        if (!checkUser) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID User Not Found",
                errors: null
            };
            return returnData;
        }
        if (data.email) {
            const findUserByEmail = await this.userRepository.checkEmailData(data.email);
            if (findUserByEmail && findUserByEmail.id !== id) {
                if (findUserByEmail.deletedAt === null) {
                    returnData = {
                        status: false,
                        response: "validation",
                        message: "Email is already in use",
                    };
                }
                else {
                    returnData = {
                        status: false,
                        response: "server",
                        message: "The email you provided has already been deleted and cannot be used for new data creation",
                    };
                }
                return returnData;
            }
        }
        let password;
        if (data.password) {
            password = bcrypt_1.default.hashSync(data.password, 10);
        }
        const dataUser = {
            email: (_a = data.email, (_a !== null && _a !== void 0 ? _a : undefined)),
            password: (password !== null && password !== void 0 ? password : undefined),
            profiles: {
                update: {
                    firstName: (_b = data.first_name, (_b !== null && _b !== void 0 ? _b : undefined)),
                    lastName: (_c = data.last_name, (_c !== null && _c !== void 0 ? _c : undefined)),
                    gender: (_d = data.gender, (_d !== null && _d !== void 0 ? _d : undefined)),
                }
            }
        };
        const user = await this.userRepository.updateData(id, dataUser);
        returnData = {
            status: true,
            response: "updated",
            data: user,
        };
        return returnData;
    }
    async deleteData(id) {
        const checkUser = await this.userRepository.detailData(id);
        let returnData;
        if (!checkUser) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID User Not Found",
                errors: null
            };
            return returnData;
        }
        const users = await this.userRepository.deleteData(id);
        if (users) {
            returnData = {
                status: true,
                response: "deleted",
                data: users,
            };
        }
        else {
            returnData = {
                status: false,
                response: "validation",
                message: "ID User Not Found",
            };
        }
        return returnData;
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map