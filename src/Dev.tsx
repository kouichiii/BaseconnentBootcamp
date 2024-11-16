import React, { useEffect, useState } from 'react';

const Dev = () => {

    // データを格納する状態変数
    const [jobs, setJobs] = useState([]);

    // 初回レンダリング時にデータを取得
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch("http://localhost:3000/job");
                const data = await response.json(); // JSON形式に変換
                setJobs(data); // 取得したデータを状態変数に設定
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []); // 空の依存配列で初回レンダリング時のみ実行

    const onClickPOST = async () => {
        await fetch("http://localhost:3000/job", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                job: {
                    category_id: 1, // 必要なcategory_idに変更
                    income: 2000,
                    title: "testtitle"
                }
            })
        });
    };

    const onClickDELETE = async () => {
        await fetch("http://localhost:3000/job/2", {
            method: 'DELETE',
            mode:'cors'
        });
    };
    


    return (
            <div className='m-20'>
                <div>
                    <h1 className='text-lg'>job</h1>
                    { jobs.map((job) => (
                        <li key = {job.id}>
                            <p>ID: {job.id}</p>
                            <p>Title: {job.title}</p>
                            <p>Income: {job.income}</p>
                            <p>Category: {job.name}</p>
                        </li>
                    )) }

                    <button className='p-4 m-2 bg-gray-300 border' onClick={onClickPOST}>submit</button>
                    <button className='p-4 m-2 bg-gray-300 border' onClick={onClickDELETE}>delete</button>
                </div>

                <div>
                    <h1 className='text-lg'>category</h1>
                    { jobs.map((job) => (
                        <li key = {job.id}>
                            <p>ID: {job.id}</p>
                            <p>Title: {job.title}</p>
                            <p>Income: {job.income}</p>
                            <p>Category: {job.name}</p>
                        </li>
                    )) }

                    <button className='p-4 m-2 bg-gray-300 border' onClick={onClickPOST}>submit</button>
                    <button className='p-4 m-2 bg-gray-300 border' onClick={onClickDELETE}>delete</button>
                </div>
            </div>
            
    );
};

export default Dev;
