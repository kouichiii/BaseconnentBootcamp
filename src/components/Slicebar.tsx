
type SlicebarProps = {
  datanum: number;
  displaycount: number;
  currentPageIndex: number;
  handlePageIndex: (newPageIndex: number) => void;
};

const Slicebar = ({
  datanum,
  displaycount,
  currentPageIndex,
  handlePageIndex,
}: SlicebarProps) => {
  const maxPagenum = Math.trunc((datanum - 1) / displaycount + 1);
  const numbers = Array.from({ length: 5 }, (_, i) => {
    const start = Math.max(
      Math.min(currentPageIndex - 2, maxPagenum - 4),
      1
    );
    return start + i;
  });
  // 重複した数を除く
  const numbersToShow = Array.from(new Set(numbers));

  return (
    <div className="flex justify-between object-bottom p-0 w-1/6 max-w-sm ">
      <button
        onClick={() => handlePageIndex(Math.max(currentPageIndex - 1, 1))} // 最小ページに制限
        disabled={currentPageIndex <= 1} // 最初のページでは無効化
        className="px-1 py-2"
      >
        ◀
      </button>
      {numbersToShow.map((num) => (
        <button
          key={num}
          onClick={() => handlePageIndex(num)}
          className={` py-2 ${currentPageIndex === num ? 'font-extrabold' : ''}`}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() =>
          handlePageIndex(Math.min(currentPageIndex + 1, maxPagenum))
        }
        disabled={currentPageIndex >= maxPagenum}
        className="px-1 py-2"
      >
        ▶
      </button>
    </div>
  );
};

export default Slicebar;
