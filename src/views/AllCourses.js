// all courses view
import { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import { courseService } from "../services/courseService";
import cookie from "react-cookies";
import { JWT_TOKEN_COOKIE_NAME } from "../constants";
import CourseActionAlert from "../components/alerts/CourseActionAlert";

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAllertMessage] = useState('');
    const [severity, setSeverity] = useState('info');

    const closeAlert = () => {
        setAlertOpen(false);
    }

    const enrollCourse = (courseName) => {
        const accessToken = cookie.load(JWT_TOKEN_COOKIE_NAME);
        courseService.enrollCourse(accessToken, courseName)
        .then(response => {
            setAllertMessage( `successfully enrolled the course ${courseName}`);
            setSeverity('success');
            setAlertOpen(true);
            // alert( `successfully enrolled the course ${courseName}`);
        })
        .catch(error=> {
            setAllertMessage( `failed to enroll the course ${courseName} - ${error.response.data.detail}`);
            setSeverity('error');
            setAlertOpen(true);
            // alert( `failed to enroll the course ${courseName}`);
        });
    };
    // react hooks life cycle componentDidMount
    useEffect(function(){
        courseService.getAllCourses()
        .then(function(response){
            setCourses(response.data);
        })
        .catch(function(error){
            console.log(error)
        });
        
    }, [])
    return (
        <>
            <CourseTable courses = {courses} actionButtonLabel="Enroll" onActionButtonClick={enrollCourse}/>
            <CourseActionAlert alertOpen={alertOpen} alertMessage={alertMessage} severity={severity} closeAlert={closeAlert}></CourseActionAlert>
        </>
    );

}

export default AllCourses;