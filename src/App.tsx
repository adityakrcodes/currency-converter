import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Thanks from './pages/thanks';
import All from './pages/all';
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/thanks' element={<Thanks/>}/>
                <Route path='/akc-all' element={<All/>}/>
                <Route path='*' element={<h1>Not Found</h1>}/>
            </Routes>
        </>
    )
}

export default App;