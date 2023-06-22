import { useRouter } from "next/router";
import Link from "next/link";

function Nav() {
  const router = useRouter();
  const mainurl = router.asPath;
  //console.log(mainurl);
  return (
    <nav className="py-2 bg-white md:py-4">
      <div className="container px-4 mx-auto md:flex md:items-center">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="self-center text-2xl font-extrabold whitespace-nowrap "
          >
            Travel Company
          </Link>
          <button
            className="px-3 py-1 text-gray-600 border border-gray-600 border-solid rounded opacity-50 hover:opacity-75 md:hidden"
            id="navbar-toggle"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div
          className="flex-col hidden mt-3 md:flex md:flex-row md:ml-auto md:mt-0"
          id="navbar-collapse"
        >
          <Link
            href="/"
            className={`p-2  rounded lg:px-4 md:mx-2 ${
              mainurl === "/" ? "bg-black text-white" : "bg-amber-700-950 "
            } `}
          >
            Home
          </Link>
          <Link
            href="/about-us"
            className={`p-2 text-gray-600 transition-colors duration-300 rounded lg:px-4 md:mx-2 hover:bg-gray-200 hover:text-gray-700 ${
              mainurl === "/about-us"
                ? "bg-black text-white"
                : "bg-amber-700-950 "
            }`}
          >
            About
          </Link>
          <Link
            href="/features"
            className={`p-2 text-gray-600 transition-colors duration-300 rounded lg:px-4 md:mx-2 hover:bg-gray-200 hover:text-gray-700 ${
              mainurl === "/features"
                ? "bg-black text-white"
                : "bg-amber-700-950 "
            }`}
          >
            Features
          </Link>
          <Link
            href="/contact"
            className={`p-2 text-gray-600 transition-colors duration-300 rounded lg:px-4 md:mx-2 hover:bg-gray-200 hover:text-gray-700 ${
              mainurl === "/contact"
                ? "bg-black text-white"
                : "bg-amber-700-950 "
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Nav;
