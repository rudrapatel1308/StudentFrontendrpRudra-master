import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import Navigationbar from "./component/Navigationbar";
import Footer from "./component/Footer";
import ViewStudents from "./component/ViewStudents";
import Student from "./component/Student";
import { BrowserRouter , Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigationbar />
      <Footer/>
      <Container>
        <Routes>
        <Route path="/addStudent" element={<Student/>}/>
        <Route path="/updateStudent/:studentId" element={<Student/>}/>
        <Route path="/viewStudent" element={<ViewStudents/>}/>
      </Routes>
      </Container>
      </BrowserRouter>


    </div>
  );
}

export default App;
