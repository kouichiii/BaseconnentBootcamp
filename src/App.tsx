import "./App.css";
import Sidebar from "./components/Sidebar";
import Mainbar from "./components/Mainbar";
import { useState } from "react";

function App() {
  const [selectedCategories, setCheckedCategories] = useState<string[]>([]);
  const [selectedIncome, setSelectedIncome] = useState<number | null>(null);

  const handleCategoryChange = (categories: string[]) => {
    setCheckedCategories(categories);
  };
  const handleIncomeChange = (income: number | null) => {
    setSelectedIncome(income);
  };
  return (
    <>
      <div className=" flex min-h-screen min-w-screen">
        <Sidebar
          onCategoryChange={handleCategoryChange}
          onIncomeChange={handleIncomeChange}
        />
        <Mainbar
          selectedCategories={selectedCategories}
          selectedIncome={selectedIncome}
        />
      </div>
    </>
  );
}

export default App;
