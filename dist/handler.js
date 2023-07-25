"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const session_1 = require("./config/session");
const serverless_http_1 = __importDefault(require("serverless-http"));
const express_route_grouping_1 = __importDefault(require("express-route-grouping"));
const UserRepository_1 = __importDefault(require("./app/repository/UserRepository/UserRepository"));
const UserService_1 = __importDefault(require("./app/services/UserService"));
const UserController_1 = __importDefault(require("./app/controllers/UserController"));
const AuthController_1 = __importDefault(require("./app/controllers/AuthController"));
const AuthService_1 = __importDefault(require("./app/services/AuthService"));
const JWTMiddleware_1 = __importDefault(require("./app/middlewares/JWTMiddleware"));
const RoleService_1 = __importDefault(require("./app/services/RoleService"));
const RoleController_1 = __importDefault(require("./app/controllers/RoleController"));
const RoleRepository_1 = __importDefault(require("./app/repository/RoleRepository/RoleRepository"));
const RoleMiddleware_1 = __importDefault(require("./app/middlewares/RoleMiddleware"));
const ProfileRepository_1 = __importDefault(require("./app/repository/ProfileRepository/ProfileRepository"));
const CategoryRepository_1 = __importDefault(require("./app/repository/CategoryRepository/CategoryRepository"));
const CategoryService_1 = __importDefault(require("./app/services/CategoryService"));
const CategoryController_1 = __importDefault(require("./app/controllers/CategoryController"));
const CourseRepository_1 = __importDefault(require("./app/repository/CourseRepository/CourseRepository"));
const CourseService_1 = __importDefault(require("./app/services/CourseService"));
const CourseController_1 = __importDefault(require("./app/controllers/CourseController"));
const PublicService_1 = __importDefault(require("./app/services/PublicService"));
const PublicController_1 = __importDefault(require("./app/controllers/PublicController"));
const PaymentService_1 = __importDefault(require("./app/services/Webhook/PaymentService"));
const PaymentController_1 = __importDefault(require("./app/controllers/Webhook/PaymentController"));
const app = express_1.default();
const route = express_1.default.Router();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(session_1.sessionConfig);
app.get('/', async (req, res) => {
    return res.status(200).send('Hello World!');
});
app.get('/welcome', async (req, res) => {
    return res.status(200).send('Hello Zulkifli!');
});
app.use('/api', route);
app.get('/api/welcome', (req, res) => {
    return res.send('Test - PT.Surya Digital Teknologi!');
});
// START : PROFILE -  CONTROLLER, SERVICE, REPOSITORY
const profileRepository = new ProfileRepository_1.default();
// END : PROFILE -  CONTROLLER, SERVICE, REPOSITORY 
// START : USER -  CONTROLLER, SERVICE, REPOSITORY 
const userRepository = new UserRepository_1.default();
const userService = new UserService_1.default(userRepository, profileRepository);
const userController = new UserController_1.default(userService);
// END : USER -  CONTROLLER, SERVICE, REPOSITORY 
// START : CATEGORY COURSE -  CONTROLLER, SERVICE, REPOSITORY 
const categoryRepository = new CategoryRepository_1.default();
const categoryService = new CategoryService_1.default(categoryRepository);
const categoryController = new CategoryController_1.default(categoryService);
// END : CATEGORY COURSE -  CONTROLLER, SERVICE, REPOSITORY 
// START : Course -  CONTROLLER, SERVICE, REPOSITORY 
const courseRepository = new CourseRepository_1.default();
const courseService = new CourseService_1.default(courseRepository);
const courseController = new CourseController_1.default(courseService);
// END : Course -  CONTROLLER, SERVICE, REPOSITORY 
// START : AUTHENTICATION -  CONTROLLER, SERVICE, REPOSITORY 
const authService = new AuthService_1.default(userRepository);
const authController = new AuthController_1.default(authService);
// END : AUTHENTICATION -  CONTROLLER, SERVICE, REPOSITORY 
// START : PUBLIC -  CONTROLLER, SERVICE, REPOSITORY 
const publicService = new PublicService_1.default(userRepository, courseRepository);
const publicController = new PublicController_1.default(publicService);
// END : PUBLIC -  CONTROLLER, SERVICE, REPOSITORY 
// START : CONFIG -  CONTROLLER, SERVICE, REPOSITORY 
const webhookService = new PaymentService_1.default();
const webhookController = new PaymentController_1.default(webhookService);
// END : CONFIG -  CONTROLLER, SERVICE, REPOSITORY 
const config = new express_route_grouping_1.default('/config', route);
config.group('/', cg => {
    cg.get('test', webhookController.test.bind(webhookController));
    cg.post('webhook/payment', webhookController.main.bind(webhookController));
});
const publicApi = new express_route_grouping_1.default('/public', route);
publicApi.group('/', pbc => {
    pbc.put('update-profile', JWTMiddleware_1.default, RoleMiddleware_1.default('public'), publicController.updateProfile.bind(publicController));
    pbc.group('/course', pbcCourse => {
        pbcCourse.get('/ready', JWTMiddleware_1.default, RoleMiddleware_1.default('public'), publicController.allCourse.bind(publicController));
        pbcCourse.get('/enroll/:courseId', JWTMiddleware_1.default, RoleMiddleware_1.default('public'), publicController.enrollCourse.bind(publicController));
    });
});
const authentication = new express_route_grouping_1.default('/authentication', route);
authentication.group('/', auth => {
    auth.post('/', authController.authentication.bind(authController));
});
const users = new express_route_grouping_1.default('/users', route);
users.group('/', user => {
    user.get('/', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), userController.getData.bind(userController));
    user.post('/', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), userController.createData.bind(userController));
    user.get('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), userController.detailData.bind(userController));
    user.put('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), userController.updateData.bind(userController));
    user.delete('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), userController.deleteData.bind(userController));
});
const categoryCourse = new express_route_grouping_1.default('/category-course', route);
categoryCourse.group('/', user => {
    user.get('/', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), categoryController.getData.bind(categoryController));
    user.post('/', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), categoryController.createData.bind(categoryController));
    user.get('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), categoryController.detailData.bind(categoryController));
    user.put('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), categoryController.updateData.bind(categoryController));
    user.delete('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), categoryController.deleteData.bind(categoryController));
});
const course = new express_route_grouping_1.default('/courses', route);
course.group('/', user => {
    user.get('/', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), courseController.getData.bind(courseController));
    user.post('/', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), courseController.createData.bind(courseController));
    user.get('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), courseController.detailData.bind(courseController));
    user.put('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), courseController.updateData.bind(courseController));
    user.delete('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), courseController.deleteData.bind(courseController));
});
const roles = new express_route_grouping_1.default('/roles', route);
roles.group('/', role => {
    const roleRepository = new RoleRepository_1.default();
    const roleService = new RoleService_1.default(roleRepository);
    const roleController = new RoleController_1.default(roleService);
    role.get('/', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), roleController.getData.bind(roleController));
    role.post('/', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), roleController.createData.bind(roleController));
    role.get('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), roleController.detailData.bind(roleController));
    role.put('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), roleController.updateData.bind(roleController));
    role.delete('/:id', JWTMiddleware_1.default, RoleMiddleware_1.default('admin'), roleController.deleteData.bind(roleController));
});
// app.listen(port, () => {
//     console.log(`\n${ appName } (${appEnv}) listening to http://localhost:${ port }`)
// })
exports.handler = serverless_http_1.default(app);
//# sourceMappingURL=handler.js.map