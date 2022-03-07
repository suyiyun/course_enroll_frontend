//Enrolled Courses View
import React from "react";
import CourseTable from "../components/CourseTable";
import { courseService } from "../services/courseService";
import cookie from "react-cookies";
import { JWT_TOKEN_COOKIE_NAME } from "../constants";
import CourseActionAlert from "../components/alerts/CourseActionAlert";

class EnrolledCourses extends React.Component {
    state = {
      enrolledCourses: [],  
      alertOpen: false,
      alertMessage: '',
      severity: 'info',
    };

    closeAlert = () => {
        this.setState({
            alertOpen: false,
        });
    }

    componentDidMount() {
        // get access token
        this.getEnrolledCourses();
    }
    withdrawCourse = (courseName) => {
        const accessToken = cookie.load(JWT_TOKEN_COOKIE_NAME);
        courseService.withdrawCourse(accessToken, courseName)
        .then(response => {
            this.getEnrolledCourses();
            this.setState({
                alertOpen: true,
                alertMessage: `successfully withdraw the course ${courseName}`,
                severity: 'success',

            })
            // alert( `successfully withdraw the course ${courseName}`);
        })
        .catch(error => {
            this.setState({
                alertOpen: true,
                alertMessage: `failed to withdraw the course ${courseName} - ${error.response.data.detail}`,
                severity: 'error',
            // alert( `failed to withdraw the course ${courseName}`);
            });
        });
    }

    getEnrolledCourses = () => {
        const accessToken = cookie.load(JWT_TOKEN_COOKIE_NAME);
        courseService.getEnrolledCourses(accessToken)
        .then((response) => {
            this.setState({
                enrolledCourses: response.data,
            });

        })
        .catch((error) => {
            console.log(error);

        });
    }

    render() {
        return (
        <>
            <CourseTable courses={this.state.enrolledCourses} actionButtonLabel="Withdraw" onActionButtonClick={this.withdrawCourse}/>
            <CourseActionAlert alertOpen={this.state.alertOpen} alertMessage={this.state.alertMessage} severity={this.state.severity} closeAlert={this.closeAlert}/>
        </>
        );
    }

}
export default EnrolledCourses;