import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import AllCourses from "./views/AllCourses";
import EnrolledCourses from "./views/EnrolledCourses";
import MenuBar from "./components/MenuBar";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {

  return (
    <Router>
      <div>
        <MenuBar>
        </MenuBar>
        <Routes>
            <Route exact path = "/" element={<AllCourses />} />
            <Route exact path = "/enrolled" element={<EnrolledCourses />} />

          </Routes>    
        

      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
