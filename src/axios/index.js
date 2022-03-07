import axios from "axios";

export default axios.create({
    baseURL: "http://course-enroll-lb-740281198.us-east-2.elb.amazonaws.com:8000/",  //append courses from service/CourseService
})