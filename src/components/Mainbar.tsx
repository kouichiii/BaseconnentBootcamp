import { useEffect, useState } from "react";
import Slicebar from "./Slicebar";
import { jobData as tmpData} from "../data/jobData";
import { useLocation } from "react-router-dom";


//一度に表示するデータ数
const displayCount = 5;



type MainbarProps = {
  selectedCategories: string[];
  selectedIncome: number | null;
};

const Mainbar = ({ selectedCategories, selectedIncome }: MainbarProps) => {
  const { state } = useLocation();
  const [jobs, setJobs] = useState(tmpData);

  //仮データと投稿データを結合
  useEffect(() => {
    if (state) {
      const newJob = { ...state, id: tmpData.length + 1 }; 
      const newJobs = [...tmpData, newJob]; 
      setJobs(newJobs); // 結果をsetJobsで更新
    }
  }, [state]); 



  //ページ番号
  const [pageIndex, setPageIndex] = useState(1);
  const handlePageIndex = (newPageIndex:number) => {
    setPageIndex(newPageIndex);
  }
  //検索条件が変化したらページを最初に戻す
  useEffect(() => {
    setPageIndex(1);
  },[selectedCategories, selectedIncome]);
  // selectedCategories と selectedIncome に基づいてデータをフィルタリング
  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = selectedCategories.includes(job.category);
    const matchesIncome =
      selectedIncome === null || job.income >= selectedIncome;
    return matchesCategory && matchesIncome;
  });

  const JobsToShow = filteredJobs.slice((pageIndex-1)*displayCount, pageIndex*displayCount);


  return (
    <div className="w-2/3 h-screen pt-20 px-8 flex flex-col justify-between">
      <div>
        <h1 className="text-xl  font-bold">求人一覧</h1>
        <p className="pb-4">該当件数: {filteredJobs.length}件</p>
        {JobsToShow.map((job) => (
            <div key={job.id} className="bg-white p-4 mb-2 border rounded shadow">
            <h1 className="text-lg font-semibold">{job.title}</h1>
            <p className="text-gray-700">カテゴリ: {job.category}</p>
            <p className="text-gray-700">年収: {job.income}万円</p>
            </div>
        ))}
      </div>
      <div className="w-full flex justify-center mb-2 ">
        <Slicebar
          datanum={filteredJobs.length}
          displaycount={displayCount}
          currentPageIndex={pageIndex}
          handlePageIndex={handlePageIndex}
        />
      </div>
    </div>
  );
};

export default Mainbar;
