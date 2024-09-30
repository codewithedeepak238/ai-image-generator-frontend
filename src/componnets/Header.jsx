import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <div className="flex items-center justify-between py-[1%] px-[3%]">
        <h1 className="logo cursor-pointer"><Link to='/'>Kintel Ai</Link></h1>
        <div>
          <form className="w-[20vw] rounded border-[1.5px] border-gray-400 flex items-center px-[5px] py-[5px] gap-[5px]">
            <button type="submit"><span className="material-symbols-outlined text-gray-400 flex">search</span></button>
            <input className=" outline-none text-black-800 bg-transparent" type="text" required placeholder="Search"/>
          </form>
        </div>
        <div><Link to="/create-post">
          <p className="font-[600] bg-sky-500 text-white p-[10px] rounded-[10px] cursor-pointer flex items-center gap-[5px]">Create New Post <span className="material-symbols-outlined text-[22px]">add</span></p></Link>
        </div>
    </div>
  )
}
