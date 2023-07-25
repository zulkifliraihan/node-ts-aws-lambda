"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const GeneralHelper_1 = __importDefault(require("../helpers/GeneralHelper"));
const SecurityHelper_1 = __importDefault(require("../helpers/SecurityHelper"));
const PublicValidation_1 = __importDefault(require("../validation/PublicValidation"));
const securityHelper = new SecurityHelper_1.default();
class PublicService {
    constructor(userRepository, courseRepository) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }
    async updateProfile(id, data) {
        var _a, _b, _c;
        const { error } = PublicValidation_1.default.updateProfile.validate(data, { abortEarly: false });
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
        if (data.gender !== 'male' && data.gender !== 'female') {
            returnData = {
                status: false,
                response: "validation",
                errors: "Invalid gender: It must be either male or female.",
            };
            return returnData;
        }
        let password;
        if (data.password) {
            password = new SecurityHelper_1.default().hashPassword(data.password);
        }
        const dataUser = {
            email: data.email,
            password: password,
            profiles: {
                upsert: {
                    create: {
                        firstName: data.first_name,
                        lastName: data.last_name,
                        gender: data.gender
                    },
                    update: {
                        firstName: (_a = data.first_name, (_a !== null && _a !== void 0 ? _a : undefined)),
                        lastName: (_b = data.last_name, (_b !== null && _b !== void 0 ? _b : undefined)),
                        gender: (_c = data.gender, (_c !== null && _c !== void 0 ? _c : undefined)),
                    }
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
    async allCourse() {
        const courses = await this.courseRepository.getDataReady();
        const returnData = {
            status: true,
            response: "get",
            data: courses,
        };
        return returnData;
    }
    async enrollCourse(course_id, currentUser) {
        let returnData = {};
        const checkCourse = await this.courseRepository.detailData(course_id);
        if (!checkCourse) {
            returnData = {
                status: false,
                response: "validation",
                message: "ID Course Not Found",
                errors: null
            };
            return returnData;
        }
        const invoice_number = await GeneralHelper_1.default.generateInvoiceNumber('ECRS');
        const total_payment = checkCourse.price - checkCourse.discount;
        let expiredAt;
        let paidAt;
        console.log(checkCourse.type_course);
        if (checkCourse.type_course == "free") {
            expiredAt = new Date();
            paidAt = new Date();
            const userHasCourse = await prisma_1.default.userHasCourse.create({
                data: {
                    user_id: currentUser.id,
                    course_id: checkCourse.id
                }
            });
            returnData.status = true;
            returnData.response = "success-enroll-course";
            returnData.message = "Successfully Enroll Free Course";
        }
        else {
            expiredAt = new Date(new Date());
            expiredAt.setDate(expiredAt.getDate() + 1);
            paidAt = undefined;
            returnData.status = true;
            returnData.response = "success-purchase-course";
            returnData.message = "Your purchase is successful. Please proceed to payment!";
        }
        const invoice = await prisma_1.default.invoice.create({
            data: {
                user_id: currentUser.id,
                course_id: checkCourse.id,
                invoice_number,
                status: 'unpaid',
                total_payment,
                paidAt,
                expiredAt
            }
        });
        returnData.data = invoice;
        return returnData;
    }
}
exports.default = PublicService;
//# sourceMappingURL=PublicService.js.map