import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { courseService } from '../services/courseService';
import { getThemeProps } from '@mui/system';
import cookie from "react-cookies";
import { JWT_TOKEN_COOKIE_NAME } from "../constants";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// mock courses data
// const rows = [
//     {
//         courseName: 'Name1',
//         courseLocation: 'location1',
//         courseContent: 'content1',
//         teacherId: 123,
//     },
//     {
//         courseName: 'Name2',
//         courseLocation: 'location2',
//         courseContent: 'content2',
//         teacherId: 13,
//     },
// ];

export default function CourseTable(props) {
    const accessToken = cookie.load(JWT_TOKEN_COOKIE_NAME);

    function renderTableCells() {
        return props.courses.map((row, index) => (
                <TableRow
                key={`course-${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell align="right">{row.course_name}</TableCell>
                <TableCell align="right">{row.course_location}</TableCell>
                <TableCell align="right">{row.course_content}</TableCell>
                <TableCell align="right">{row.teacher_id}</TableCell>
                {
                    accessToken && (
                        <TableCell align="right">
                            <Button onClick={() => {props.onActionButtonClick(row.course_name)}}> {props.actionButtonLabel} </Button>                            
                        </TableCell>
                    )
                }
                
                </TableRow>
            ))

    } 

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Course id</TableCell>
                    <TableCell align="right">Course Name</TableCell>
                    <TableCell align="right">Course Location</TableCell>
                    <TableCell align="right">Course Content</TableCell>
                    <TableCell align="right">Teacher ID</TableCell>
                    {
                        accessToken && (
                            <TableCell align="right">Action</TableCell>
                        )
                    }
                    
                </TableRow>
                </TableHead>
                <TableBody>
                {renderTableCells()}

                </TableBody>
            </Table>
            </TableContainer>
    );
}


