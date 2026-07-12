
import  logo from "../../images/logo.png"
export const HeaderComponent = () => {
  return (
    <>
      <header className="w-full flex flex-col bg-blue-900/20">
        <div className="flex w-full items-center justify-center h-10 bg-gray-500 text-white">
          <p>This is the online sopping system</p>
        </div>
        <div className="flex h-30  mx-30 items-center justify-between gap-30">
         
          <nav className="flex  items-center justify-between w-2/3">
           <img src={logo} alt=""  className="w-1/2 h-12"/>
            <ul className="flex gap-5">
              <li>Home</li>
              <li>Category</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </nav>
          <div className="w-1/3 flex gap-10">
            <a
              href=""
              className="text-teal-950 hover:text-teal-900 hover:underline hover:scale-98  font-semibold  hover:cursor-pointer"
            >
              Login
            </a>
            <a
              href=""
              className="text-teal-950 hover:text-teal-900  hover:underline hover:scale-98 font-semibold  hover:cursor-pointer"
            >
              Register
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
