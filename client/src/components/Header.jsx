import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className=" bg-slate-300 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="flex flex-wrap font-bold text-sm sm:text-xl">
            <span className=" text-slate-500 ">Void</span>
            <span className=" text-slate-700">Estates</span>
          </h1>
        </Link>
        <form className=" bg-slate-200 p-3 rounded-lg flex items-center space-x-2 w-24 sm:w-64">
          <input
            type="text"
            placeholder="Search..."
            className=" bg-transparent focus:outline-none"
          />
          <FaSearch className=" text-slate-500" />
        </form>
        <ul className=" flex space-x-4">
          <Link to="/">
            <li className=" hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className=" hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className=" rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="  sm:inline text-slate-700 hover:underline">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
