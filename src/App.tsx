import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {ProtectedRoute, PublicRoute, NavigateBasedOnAuth} from "@routes";
import {Register, Login, Dashboard, UserPreferences} from "@pages";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PublicRoute/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Route>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/preferences" element={<UserPreferences/>}/>
                </Route>
                <Route path="/" element={<NavigateBasedOnAuth/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </Router>
    );
}

export default App;
