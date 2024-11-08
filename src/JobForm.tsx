import React from "react";
import { categories } from "./data/criteria";
import { useNavigate } from "react-router-dom";

const JobForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData.entries());

        // フォームデータを state として渡して指定ルートへ移動
        navigate("/", { state: data });
    }

  return (
    <form className="m-20" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold my-8">求人投稿</h1>
      <label>
        <h1 className="text-lg py-2 font-bold self-start">求人カテゴリ選択</h1>
        <select name="category" className="px-4 pr-16 py-2 mb-8 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ">
          <option value={""}>カテゴリを選択</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        <h1 className="text-lg py-2 font-bold self-start">年収</h1>
        <input
          type="text"
          pattern="\d*"
          name="income"
          className="px-4 pr-16 py-2 mb-8 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        />
      </label>
      <label>
        <h1 className="text-lg py-2 font-bold self-start">求人タイトル</h1>
        <input
          type="text"
          name="title"
          className="px-4 pr-16 py-2 w-2/3 mb-8 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        />
      </label>

      <button
        type="submit"
        className="block w-1/5 px-6 py-3 mt-4 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
      >
        投稿
      </button>
    </form>
  );
};

export default JobForm;
