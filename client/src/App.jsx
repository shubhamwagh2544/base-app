import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {Signup} from "./Signup.jsx";
import {Profile} from "./Profile.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
