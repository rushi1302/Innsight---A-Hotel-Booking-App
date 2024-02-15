import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="bg-gray-100 py-3 md:py-6 container">
      <div className="container md:mx-auto flex justify-around items-center">
        <span className="text-xl md:text-3xl text-green-700">
          <Link to={"/"}> Innsight</Link>
        </span>
        <span className="text-xl p-1 md:p-2 md:text-xl  text-balck-700 hover:border  hover:bg-gray-50">
          <Link to={"/hotels"}>Hotels</Link>
        </span>
        <span className="text-xl p-1 md:p-2 md:text-xl text-balck-700 hover:border  hover:bg-gray-50">
          <Link to={"/about"}>about</Link>
        </span>
        <span className="text-sm md:text-xl uppercase border border-green-400  md:border-2 p-2 hover:bg-gray-100 cursor-pointer">
          <Link to={"/sign-in"}>Sign In</Link>
        </span>
      </div>
    </div>
  );
}

export default Header;
