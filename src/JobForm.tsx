import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
  category_id: z.coerce.number().min(1,"カテゴリは必須です"),
  income: z.coerce.number({invalid_type_error:"年収を正しく入力してください"}).min(1,"年収の値を入力してください"),
  title: z.string().min(1,"タイトルは必須です")
})
type FormData = z.infer<typeof schema>

const JobForm = () => {
    // カテゴリ一覧を格納する状態変数
    type Category = { id: number; name: string };
    const [categories, setCategories] = useState<Category[]>([]);

    // 初回レンダリング時にデータを取得
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch("https://mochomocho-back-8cd1b4c47b83.herokuapp.com/category");
                const data = await response.json(); // JSON形式に変換
                setCategories(data); // 取得したデータを状態変数に設定
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []); // 空の依存配列で初回レンダリング時のみ実行


    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
      resolver: zodResolver(schema),
    });
    const navigate = useNavigate();

    const onSubmit = async(data:FormData) => {
      await fetch("https://mochomocho-back-8cd1b4c47b83.herokuapp.com/job", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            job: {
                category_id: data.category_id, 
                income: data.income,
                title: data.title
            }
        })
      });
        // フォームデータを state として渡して指定ルートへ移動
        navigate("/", { state: data });
    };

  return (
    <form className="m-20" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold my-8">求人投稿</h1>
      <label>
        <h1 className="text-lg py-2 font-bold self-start">求人カテゴリ選択</h1>
        <select {...register("category_id")} className="px-4 pr-16 py-2  border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ">
          <option value={""}>カテゴリを選択</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <p
          className={`ml-2 mb-8 text-red-500 transition-opacity 
                ${errors.category_id ? "opacity-100" : "opacity-0"}`
              }
        >{errors.category_id?.message}
        </p>
      </label>
      
      <label>
        <h1 className="text-lg py-2 font-bold self-start">年収</h1>
        <input
          type="text"
          {...register("income")}
          className="px-4 pr-16 py-2  border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        />
        <p
          className={`ml-2 mb-8 text-red-500 transition-opacity 
                ${errors.income ? "opacity-100" : "opacity-0"}`
              }
        >{errors.income?.message}
        </p>
      </label>
      <label>
        <h1 className="text-lg py-2 font-bold self-start">求人タイトル</h1>
        <input
          type="text"
          {...register("title")}
          className="px-4 pr-16 py-2 w-2/3 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
        />
        <p
          className={`ml-2 mb-8 text-red-500 transition-opacity 
                ${errors.title ? "opacity-100" : "opacity-0"}`
              }
        >{errors.title?.message}
        </p>
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
