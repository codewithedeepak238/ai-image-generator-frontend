import { Route, Routes } from "react-router-dom"
import {Homepage} from "../pages/Homepage"
import {CreatePost} from "../pages/CreatePost"

export const AllRoutes = ()=>{
    return(
        <>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/create-post" element={<CreatePost/>}/>
            </Routes>
        </>
    )
}