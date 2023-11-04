const path = require('path');
const Controller = require("../controller");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { CourseModel } = require("../../../models/course.models");
const { addCourseSchema } = require('../../validators/admin/course.schema');

class CourseController extends Controller {
    async addCourse(req, res, next){
        try {
            req.body.teacher = req.user.id;
            const validateData = await addCourseSchema.validateAsync(req.body);
            req.body.image = path.join(validateData.fileUploadPath, validateData.filename).replace(/\\/g, '/');
            const {title, subtitle, description, image, tags, category, price, discount, type, teacher} = req.body;
            const course = await CourseModel.create({
                title, subtitle, description, image, tags, category, price, discount, type, teacher, time: '00:00:00', status: 'NOT_STARTED'
            });
            if(+price > 0 && type === 'FREE') throw createHttpError.BadRequest('دوره رایگان نمیتواند قیمت داشته باشد');
            if(!course) throw createHttpError.InternalServerError('ثبت دوره انجام نشد');
            return res.status(StatusCodes.CREATED).json({
                error: null,
                data: {
                    course,
                    status: StatusCodes.CREATED,
                    message: 'دوره با موفقیت ایجاد شد',
                },
            })
        } catch (error) {
            next(error);
        };
    };

    async updateCourse(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        };
    };
    
    async removeCourse(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        };
    };

    async getAllCourse(req, res, next){
        try {
            const { search } = req.query;
            let courses;
            if(!!search) await CourseModel.find({$text: {$search: search}}).sort({_id: -1})
            else courses = await CourseModel.find({}).sort({_id: -1});
            return res.status(StatusCodes.OK).json({
                error: null,
                data: {
                    courses,
                    status: StatusCodes.OK,
                },
            });
        } catch (error) {
            next(error);
        };
    };

    async getCourseById(req, res, next){
        try {
            const { id } = req.params;
            const course = await CourseModel.findById(id);
            if(!course) throw createHttpError.NotFound('دوره مورد نظر یافت نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                data: {
                    status: StatusCodes.OK,
                    course,
                },
            });
        } catch (error) {
            next(error);
        };
    };

    async addChapterToCourse(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        };
    };

    async addEpisodeToChapter(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        };
    };
};

module.exports ={
    CourseController: new CourseController()
};