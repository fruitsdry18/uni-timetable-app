// import { Link } from "react-router-dom";

// const TimeTable = () => {

//   const taskList = [
//     {title: "プログラミング課題" ,date: "7/25(土)"},
//     {title: "フロントエンド" ,date: "7/26(日)"}
//   ];

//   const timetableData = [
//     {
//       period: 1,
//       time: "9:00 - 10:40",
//       Mon: null,
//       Tue: null,
//       Wed: null,
//       Thu: null,
//       Fri: null,
//     },
//     {
//       period: 2,
//       time: "10:50 - 12:30",
//       Mon: null,
//       Tue: { name: "プログラミング", room: "1-1" },
//       Wed: null,
//       Thu: null,
//       Fri: null,
//     },
//     {
//       period: 3,

//       time: "13:30 - 15:10",
//       Mon: null,
//       Tue: null,
//       Wed: { name: "プログラミング", room: "1-1" },
//       Thu: null,
//       Fri: null,
//     },
//     {
//       period: 4,
//       time: "15:20 - 17:00",
//       Mon: null,
//       Tue: null,
//       Wed: { name: "プログラミング", room: "1-1" },
//       Thu: null,
//       Fri: null,
//     },

//     {
//       period: 5,

//       time: "17:00 - 18:40",
//       Mon: null,
//       Tue: null,
//       Wed: null,
//       Thu: null,
//       Fri: null,
//     },
//   ];

//   return (
//     <div>
//       {/* ヘッダー */}
//       <header className="bg-white border-b border-gray-400 px-4 py-5 sticky top-0 z-10">
//         <div className="flex justify-between">
//           <h1 className="text-xl text-blue-500 font-bold">UNI・KANRI</h1>
//           <Link to="/login" className="text-xs text-gray-700 pt-2">
//             ログアウト
//           </Link>
//         </div>
//       </header>

//       <main>
//         {/* 週の移動 */}
//         <div className="flex justify-between items-center bg-white border-b border-gray-400 px-4 py-3">
//           <button className="cursor-pointer font-bold text-gray-600">＜</button>
//           <div className="flex flex-col items-center">
//             <h2 className="text-gray-500 text-xs">2026年7月</h2>
//             <h2 className="font-bold text-2xl">20日～24日</h2>
//           </div>
//           <button className="cursor-pointer font-bold text-gray-600">＞</button>
//         </div>
//         {/* 時間割本体 */}

//         {/* 時間割上部 */}
//         <div className="bg-white grid grid-cols-6 border-b border-gray-400 mx-3 pt-7">
//           <div className="border-gray-400 border-r border-t border-l px-2 text-center  text-xs">
//             時限
//           </div>
//           <div className="border-gray-400 border-r border-t px-2 text-center text-xs">
//             20日(月)
//           </div>
//           <div className="border-gray-400 border-r border-t px-2 text-center text-xs">
//             21日(火)
//           </div>
//           <div className="border-gray-400 border-r border-t px-2 text-center text-xs">
//             22日(水)
//           </div>
//           <div className="border-gray-400 border-r border-t px-2 text-center text-xs">
//             23日(木)
//           </div>
//           <div className="border-gray-400 border-r border-t px-2 text-center text-xs">
//             24日(金)
//           </div>
//         </div>

//         {/* 時間割下部（各時限のデータ） */}
//         <div className="mx-3 divide-y divide-gray-200 border-b border-gray-300">
//           {timetableData.map((row) => (
//             <div key={row.period} className="grid grid-cols-6 min-h-20">
//               {/* 時間表示 */}
//               <div className="flex flex-col items-center justify-center bg-slate-50 text-gray-500 text-xs p-1 border-r border-l border-gray-300">
//                 <span className="font-bold text-xs text-gray-700">
//                   {row.period}
//                 </span>

//                 <span className="scale-90 items-center">
//                   {row.time.split(" - ")[0]}
//                 </span>
//                 <span className="scale-90">{row.time.split(" - ")[1]}</span>
//               </div>
//               {/* 授業コマ */}
//               {(["Mon", "Tue", "Wed", "Thu", "Fri"] as const).map((dayKey) => {
//                 const subject = row[dayKey];
//                 return (
//                   <div
//                     key={dayKey}
//                     className="border-r border-gray-300 p-1 flex items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition"
//                   >
//                     {subject ? (
//                       /* 授業があるマスのカード */
//                       <div className="w-full h-full bg-blue-50 border border-blue-200 rounded-lg p-1 flex flex-col justify-between">
//                         <p className="text-[11px] font-bold text-blue-900 ">
//                           {subject.name}
//                         </p>
//                         <p className="text-xs text-blue-600 font-medium">
//                           {subject.room}
//                         </p>
//                       </div>
//                     ) : null}
//                   </div>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//         <div className="mx-5 ">
//           <div className="flex justify-between mr-5">
//             <h2 className="mt-2 text-red-700">課題・予定一覧</h2>
//             <button className="">追加</button>
//           </div>
//           <div className="">
//             {taskList.map((task, index) => (
//               <div
//                 key={index}
//                 className="grid grid-cols-12 text-xs border-b border-gray-100 pb-1"
//               >
//                 <span className="font-bold col-span-6 text-gray-700">
//                   ・{task.title}
//                 </span>
//                 <span className="text-red-500 col-span-4 font-bold">
//                   期限: {task.date}
//                 </span>
//                 <button className="">完了</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TimeTable;

import { Link } from "react-router-dom";

const TimeTable = () => {
  const taskList = [
    { title: "プログラミング課題", date: "7/25(土)" },
    { title: "フロントエンド", date: "7/26(日)" },
  ];

  const timetableData = [
    {
      period: 1,
      time: "9:00 - 10:40",
      Mon: null,
      Tue: null,
      Wed: null,
      Thu: null,
      Fri: null,
    },
    {
      period: 2,
      time: "10:50 - 12:30",
      Mon: null,
      Tue: { name: "プログラミング", room: "1-1" },
      Wed: null,
      Thu: null,
      Fri: null,
    },
    {
      period: 3,

      time: "13:30 - 15:10",
      Mon: null,
      Tue: null,
      Wed: { name: "プログラミング", room: "1-1" },
      Thu: null,
      Fri: null,
    },
    {
      period: 4,
      time: "15:20 - 17:00",
      Mon: null,
      Tue: null,
      Wed: { name: "プログラミング", room: "1-1" },
      Thu: null,
      Fri: null,
    },

    {
      period: 5,

      time: "17:00 - 18:40",
      Mon: null,
      Tue: null,
      Wed: null,
      Thu: null,
      Fri: null,
    },
  ];

  return (
    <div>
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-400 px-4 py-5 sticky top-0 z-10">
        <div className="flex justify-between">
          <h1 className="text-xl text-blue-500 font-bold">UNI・KANRI</h1>
          <Link to="/login" className="text-xs text-gray-700 pt-2">
            ログアウト
          </Link>
        </div>
      </header>

      <main>
        {/* 週の移動 */}
        <div className="flex justify-between items-center bg-white border-b border-gray-400 px-4 py-3">
          <button className="cursor-pointer font-bold text-gray-600">＜</button>
          <div className="flex flex-col items-center">
            <h2 className="text-gray-500 text-xs">2026年7月</h2>
            <h2 className="font-bold text-2xl">20日～24日</h2>
          </div>
          <button className="cursor-pointer font-bold text-gray-600">＞</button>
        </div>
        {/* 時間割本体 */}

        {/* 時間割上部 */}
        <div className="bg-white grid grid-cols-6 border-b border-gray-400 mx-3 pt-7">
          <div className="border-gray-400 border-r border-t border-l px-2 text-center  text-xs">
            時限
          </div>
          <div className="border-gray-400 border-r border-t px-2 text-center text-xs">
            20日(月)
          </div>
          <div className="border-gray-400 border-r border-t px-2 text-center text-xs">
            21日(火)
          </div>
          <div className="border-gray-400 border-r border-t px-2 text-center text-xs">
            22日(水)
          </div>
          <div className="border-gray-400 border-r border-t px-2 text-center text-xs">
            23日(木)
          </div>
          <div className="border-gray-400 border-r border-t px-2 text-center text-xs">
            24日(金)
          </div>
        </div>

        {/* 時間割下部（各時限のデータ） */}
        <div className="mx-3 divide-y divide-gray-200 border-b border-gray-300">
          {timetableData.map((row) => (
            <div key={row.period} className="grid grid-cols-6 min-h-20">
              {/* 時間表示 */}
              <div className="flex flex-col items-center justify-center bg-slate-50 text-gray-500 text-xs p-1 border-r border-l border-gray-300">
                <span className="font-bold text-xs text-gray-700">
                  {row.period}
                </span>

                <span className="scale-90 items-center">
                  {row.time.split(" - ")[0]}
                </span>
                <span className="scale-90">{row.time.split(" - ")[1]}</span>
              </div>
              {/* 授業コマ */}
              {(["Mon", "Tue", "Wed", "Thu", "Fri"] as const).map((dayKey) => {
                const subject = row[dayKey];
                return (
                  <div
                    key={dayKey}
                    className="border-r border-gray-300 p-1 flex items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition"
                  >
                    {subject ? (
                      /* 授業があるマスのカード */
                      <div className="w-full h-full bg-blue-50 border border-blue-200 rounded-lg p-1 flex flex-col justify-between">
                        <p className="text-[11px] font-bold text-blue-900 ">
                          {subject.name}
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          {subject.room}
                        </p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="mx-5 my-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-red-700 font-bold text-sm">課題・予定一覧</h2>
            <button className="text-xs text-blue-600 border border-blue-600 rounded px-2 py-0.5 cursor-pointer">
              追加
            </button>
          </div>
          <div>
            {taskList.map((task, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center text-xs border-b border-gray-200 py-2.5"
              >
                <span className="font-bold col-span-6 text-gray-700 truncate">
                  ・{task.title}
                </span>
                <span className="text-red-500 col-span-4 font-bold text-center">
                  期限: {task.date}
                </span>
                <div className="col-span-2 text-right">
                  <button className="bg-gray-100 border border-gray-300 text-gray-600 rounded px-2 py-0.5 text-[11px] cursor-pointer">
                    完了
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimeTable;
