import express from 'express';

import RouteGroup from 'express-route-grouping';


import UserRepository from '../app/repository/UserRepository/UserRepository';
import UserService from '../app/services/UserService';
import UserController from '../app/controllers/UserController';
import AuthController from '../app/controllers/AuthController';
import AuthService from '../app/services/AuthService';
import JWTMiddleware from '../app/middlewares/JWTMiddleware';
import RoleService from '../app/services/RoleService';
import RoleController from '../app/controllers/RoleController';
import RoleRepository from '../app/repository/RoleRepository/RoleRepository';
import RoleMiddleware from '../app/middlewares/RoleMiddleware';
import ProfileRepository from '../app/repository/ProfileRepository/ProfileRepository';
import CategoryRepository from '../app/repository/CategoryRepository/CategoryRepository';
import CategoryService from '../app/services/CategoryService';
import CategoryController from '../app/controllers/CategoryController';
import CourseRepository from '../app/repository/CourseRepository/CourseRepository';
import CourseService from '../app/services/CourseService';
import CourseController from '../app/controllers/CourseController';
import PublicService from '../app/services/PublicService';
import PublicController from '../app/controllers/PublicController';
import PaymentService from '../app/services/Webhook/PaymentService';
import PaymentController from '../app/controllers/Webhook/PaymentController';

const route = express.Router()

// START : PROFILE -  CONTROLLER, SERVICE, REPOSITORY
const profileRepository = new ProfileRepository()
// END : PROFILE -  CONTROLLER, SERVICE, REPOSITORY 

// START : USER -  CONTROLLER, SERVICE, REPOSITORY 
const userRepository = new UserRepository()
const userService = new UserService(userRepository, profileRepository)
const userController = new UserController(userService)
// END : USER -  CONTROLLER, SERVICE, REPOSITORY 

// START : CATEGORY COURSE -  CONTROLLER, SERVICE, REPOSITORY 
const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService(categoryRepository)
const categoryController = new CategoryController(categoryService)
// END : CATEGORY COURSE -  CONTROLLER, SERVICE, REPOSITORY 

// START : Course -  CONTROLLER, SERVICE, REPOSITORY 
const courseRepository = new CourseRepository()
const courseService = new CourseService(courseRepository)
const courseController = new CourseController(courseService)
// END : Course -  CONTROLLER, SERVICE, REPOSITORY 

// START : AUTHENTICATION -  CONTROLLER, SERVICE, REPOSITORY 
const authService = new AuthService(userRepository)
const authController = new AuthController(authService)
// END : AUTHENTICATION -  CONTROLLER, SERVICE, REPOSITORY 

// START : PUBLIC -  CONTROLLER, SERVICE, REPOSITORY 
const publicService = new PublicService(userRepository, courseRepository)
const publicController = new PublicController(publicService)
// END : PUBLIC -  CONTROLLER, SERVICE, REPOSITORY 

// START : CONFIG -  CONTROLLER, SERVICE, REPOSITORY 
const webhookService = new PaymentService()
const webhookController = new PaymentController(webhookService)
// END : CONFIG -  CONTROLLER, SERVICE, REPOSITORY 


const config = new RouteGroup('/config', route)
config.group('/', cg => {
    cg.post('webhook/payment', webhookController.main.bind(webhookController))
    
})

const publicApi = new RouteGroup('/public', route)
publicApi.group('/', pbc => {
    pbc.put('update-profile', JWTMiddleware, RoleMiddleware('public'), publicController.updateProfile.bind(publicController))
    
    pbc.group('/course', pbcCourse => {
        pbcCourse.get('/ready', JWTMiddleware, RoleMiddleware('public'), publicController.allCourse.bind(publicController))
        pbcCourse.get('/enroll/:courseId', JWTMiddleware, RoleMiddleware('public'), publicController.enrollCourse.bind(publicController))
    })
})


const authentication = new RouteGroup('/authentication', route)
authentication.group('/', auth => {
    auth.post('/', authController.authentication.bind(authController))
})

const users = new RouteGroup('/users', route)
users.group('/',user => {

    user.get('/', JWTMiddleware, RoleMiddleware('admin'), userController.getData.bind(userController))
    user.post('/', JWTMiddleware, RoleMiddleware('admin'), userController.createData.bind(userController))
    user.get('/:id', JWTMiddleware, RoleMiddleware('admin'), userController.detailData.bind(userController))
    user.put('/:id', JWTMiddleware, RoleMiddleware('admin'), userController.updateData.bind(userController))
    user.delete('/:id', JWTMiddleware, RoleMiddleware('admin'), userController.deleteData.bind(userController))

})

const categoryCourse = new RouteGroup('/category-course', route)
categoryCourse.group('/',user => {

    user.get('/', JWTMiddleware, RoleMiddleware('admin'), categoryController.getData.bind(categoryController))
    user.post('/', JWTMiddleware, RoleMiddleware('admin'), categoryController.createData.bind(categoryController))
    user.get('/:id', JWTMiddleware, RoleMiddleware('admin'), categoryController.detailData.bind(categoryController))
    user.put('/:id', JWTMiddleware, RoleMiddleware('admin'), categoryController.updateData.bind(categoryController))
    user.delete('/:id', JWTMiddleware, RoleMiddleware('admin'), categoryController.deleteData.bind(categoryController))

})

const course = new RouteGroup('/courses', route)
course.group('/',user => {

    user.get('/', JWTMiddleware, RoleMiddleware('admin'), courseController.getData.bind(courseController))
    user.post('/', JWTMiddleware, RoleMiddleware('admin'), courseController.createData.bind(courseController))
    user.get('/:id', JWTMiddleware, RoleMiddleware('admin'), courseController.detailData.bind(courseController))
    user.put('/:id', JWTMiddleware, RoleMiddleware('admin'), courseController.updateData.bind(courseController))
    user.delete('/:id', JWTMiddleware, RoleMiddleware('admin'), courseController.deleteData.bind(courseController))

})

const roles = new RouteGroup('/roles', route)
roles.group('/',role => {
    const roleRepository = new RoleRepository()
    const roleService = new RoleService(roleRepository)
    const roleController = new RoleController(roleService)

    role.get('/', JWTMiddleware, RoleMiddleware('admin'), roleController.getData.bind(roleController))
    role.post('/', JWTMiddleware, RoleMiddleware('admin'), roleController.createData.bind(roleController))
    role.get('/:id', JWTMiddleware, RoleMiddleware('admin'), roleController.detailData.bind(roleController))
    role.put('/:id', JWTMiddleware, RoleMiddleware('admin'), roleController.updateData.bind(roleController))
    role.delete('/:id', JWTMiddleware, RoleMiddleware('admin'), roleController.deleteData.bind(roleController))

})

export default route
