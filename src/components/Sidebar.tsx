import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

//年収の検索条件
const incomes = [300, 400, 500, 600, 700, 800, 900, 1000]

type SidebarProps = {
  onCategoryChange: (categories: string[]) => void;
  onIncomeChange: (income: number | null) => void;
};

const Sidebar = ({ onCategoryChange, onIncomeChange }: SidebarProps) => {
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


  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [selectedIncome, setSelectedIncome] = useState<number | null>(null);

  useEffect(() => {
    onCategoryChange(checkedCategories);
    onIncomeChange(selectedIncome);
  }, [checkedCategories, selectedIncome, onCategoryChange, onIncomeChange]);

  const handleCheckboxChange = (label: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedCategories((prevCategories: string[]) => [
        ...prevCategories,
        label,
      ]);
    } else {
      setCheckedCategories((prevCategories: string[]) =>
        prevCategories.filter((category) => category !== label)
      );
    }
  };
  const handleIncomeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIncome(Number(event.target.value)); // 選択された値を状態に保存
  };

  return (
    <div className="container w-1/3 content-start  align-items py-20 px-6 bg-gray-100">
      <h1 className="text-lg pb-4 font-bold">求人カテゴリ</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Checkbox label={category.name} onChange={handleCheckboxChange} />
          </li>
        ))}
      </ul>
      <div>
        <label className="flex flex-col items-center">
          <h1 className="text-lg py-4 font-bold self-start">年収</h1>
          <select
            className="w-2/3 px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
            onChange={handleIncomeChange}
          >
            <option value={""}>
              選択してください
            </option>
            {incomes.map((income) => (
              <option key={income} value={income}>
                {income}万円以上
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
