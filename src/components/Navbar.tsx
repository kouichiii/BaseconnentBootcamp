import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 w-full p-3 absolute top-0 left-0 z-10">
      <div className="flex justify-between ">
        <div className="text-white text-2xl font-bold mx-8">
          <Link to="/">求人検索アプリ</Link>
        </div>

        <div className="flex gap-4 items-center mx-8">
          <div className="text-white text-sm font-bold">
            <Link to="/">求人検索</Link>
          </div>
          <div className="text-white text-sm font-bold">
            <Link to="/JobForm">求人投稿</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
