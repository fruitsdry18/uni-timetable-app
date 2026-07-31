import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

// 課題データの型
type Task = {
  id: number;
  title: string;
  date: string; // "YYYY-MM-DD"
  period: number; // 1〜5時限
};

const TimeTable = () => {
  const navigate = useNavigate();

  // ログインユーザーの情報を保持するState
  const [userInfo, setUserInfo] = useState<{
    username?: string;
    school?: string;
    grade?: string;
  }>({});

  // 画面が開いたときにログイン中のユーザー情報を取得する
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && user.user_metadata) {
        setUserInfo({
          username: user.user_metadata.username,
          school: user.user_metadata.school,
          grade: user.user_metadata.grade,
        });
      }
    };

    fetchUser();
  }, []);

  // ログアウト処理
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // 今日の週の月曜日を設定
  const getInitialMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);

    if (dayOfWeek === 0) {
      monday.setDate(today.getDate() + 1);
    } else {
      monday.setDate(today.getDate() - (dayOfWeek - 1));
    }
    return monday;
  };

  // 一週間戻る
  const [mondayDate, setMondayDate] = useState(getInitialMonday);
  const handlePrevWeek = () => {
    const prev = new Date(mondayDate);
    prev.setDate(prev.getDate() - 7);
    setMondayDate(prev);
  };

  // 一週間進む
  const handleNextWeek = () => {
    const next = new Date(mondayDate);
    next.setDate(next.getDate() + 7);
    setMondayDate(next);
  };

  // 表示している月曜日の週の日付オブジェクト（月〜金）
  const weekDays = [0, 1, 2, 3, 4].map((offset) => {
    const day = new Date(mondayDate);
    day.setDate(day.getDate() + offset);
    return day;
  });

  const fridayDate = weekDays[4];

  // 年月・日付範囲の表示テキスト
  const yearMonthText = `${mondayDate.getFullYear()}年${mondayDate.getMonth() + 1}月`;
  const rangeText = `${mondayDate.getDate()}日～${fridayDate.getDate()}日`;

  // 日付オブジェクトを "YYYY-MM-DD" 形式の文字列にする関数
  const formatDateStr = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 課題リスト State（period を追加）
  const [taskList, setTaskList] = useState<Task[]>([
    { id: 1, title: "プログラミング課題", date: "2026-07-28", period: 2 },
    { id: 2, title: "フロントエンド", date: "2026-07-29", period: 3 },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  // フォームの入力内容
  const [taskTitle, setTaskTitle] = useState(""); // 課題名
  const [taskDate, setTaskDate] = useState(""); // 期限日
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1); // 時間 (1〜5)

  // 課題を追加
  const handleAddTask = () => {
    if (!taskTitle || !taskDate) return;
    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      date: taskDate,
      period: selectedPeriod,
    };
    setTaskList([...taskList, newTask]);

    setTaskTitle("");
    setTaskDate("");
    setSelectedPeriod(1);
    setIsTaskModalOpen(false);
  };

  const handleDeleteTask = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  // 授業登録
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{
    period: number;
    dayKey: string;
  } | null>(null);
  const [classNameInput, setClassNameInput] = useState("");
  const [classRoomInput, setClassRoomInput] = useState("");

  const handleCellClick = (period: number, dayKey: string) => {
    setSelectedCell({ period, dayKey });
    setClassNameInput("");
    setClassRoomInput("");
    setIsClassModalOpen(true);
  };

  const [timetableData, setTimeTableData] = useState<Array<any>>([
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
  ]);

  const handleSaveClass = () => {
    if (!selectedCell || !classNameInput) return;

    const updatedTimetable = timetableData.map((row) => {
      if (row.period === selectedCell.period) {
        return {
          ...row,
          [selectedCell.dayKey]: {
            name: classNameInput,
            room: classRoomInput,
          },
        };
      }
      return row;
    });

    setTimeTableData(updatedTimetable);
    setIsClassModalOpen(false);
    setClassNameInput("");
    setClassRoomInput("");
  };

  return (
    <div>
      <header className="bg-white border-b border-gray-400 px-4 py-3 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl text-blue-500 font-bold">UNI・KANRI</h1>
            {/* ログインユーザーの学校・学年・名前を表示 */}
            {userInfo.username && (
              <p className="text-[11px] text-gray-600 font-medium mt-0.5">
                {userInfo.school} {userInfo.grade && `${userInfo.grade}年`} |{" "}
                {userInfo.username}さん
              </p>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="text-xs text-gray-700 cursor-pointer hover:underline"
          >
            ログアウト
          </button>
        </div>
      </header>
      <main>
        <div className="flex justify-between items-center bg-white border-b border-gray-400 px-4 py-3">
          <button
            onClick={handlePrevWeek}
            className="cursor-pointer font-bold text-gray-600 p-2"
          >
            ＜
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-gray-500 text-xs">{yearMonthText}</h2>
            <h2 className="font-bold text-2xl">{rangeText}</h2>
          </div>
          <button
            onClick={handleNextWeek}
            className="cursor-pointer font-bold text-gray-600 p-2"
          >
            ＞
          </button>
        </div>

        <div className="bg-white grid grid-cols-6 border-b border-gray-400 mx-3 pt-7">
          <div className="border-gray-400 border-r border-t border-l px-2 text-center text-xs">
            時限
          </div>
          {["(月)", "(火)", "(水)", "(木)", "(金)"].map((dayName, index) => (
            <div
              key={dayName}
              className="border-gray-400 border-r border-t px-2 text-center text-xs"
            >
              {weekDays[index].getDate()}日<br></br>
              {dayName}
            </div>
          ))}
        </div>

        <div className="mx-3 divide-y divide-gray-200 border-b border-gray-300">
          {timetableData.map((row) => (
            <div key={row.period} className="grid grid-cols-6 min-h-20">
              <div className="flex flex-col items-center justify-center bg-slate-50 text-gray-500 text-xs p-1 border-r border-l border-gray-300">
                <span className="font-bold text-xs text-gray-700">
                  {row.period}
                </span>

                <span className="scale-90 items-center">
                  {row.time.split(" - ")[0]}
                </span>

                <span className="scale-90">{row.time.split(" - ")[1]}</span>
              </div>

              {(["Mon", "Tue", "Wed", "Thu", "Fri"] as const).map(
                (dayKey, dayIndex) => {
                  const subject = row[dayKey];
                  const cellDateStr = formatDateStr(weekDays[dayIndex]);

                  const matchingTasks = taskList.filter(
                    (task) =>
                      task.date === cellDateStr && task.period === row.period,
                  );

                  return (
                    <div
                      key={dayKey}
                      onClick={() => handleCellClick(row.period, dayKey)}
                      className="border-r border-gray-300 p-1 flex flex-col items-center justify-between text-center cursor-pointer hover:bg-slate-50 transition relative min-h-[80px]"
                    >
                      {subject ? (
                        <div className="w-full h-full bg-blue-50 border border-blue-200 rounded-lg p-1 flex flex-col justify-between">
                          <p className="text-[10px] font-bold text-blue-900">
                            {subject.name}
                          </p>
                          <p className="text-xs text-blue-600 font-medium">
                            {subject.room}
                          </p>
                        </div>
                      ) : (
                        <div />
                      )}

                      {matchingTasks.length > 0 && (
                        <div className="w-full mt-1 flex flex-col gap-0.5">
                          {matchingTasks.map((t) => (
                            <div
                              key={t.id}
                              className="bg-red-500 text-white text-[9px] font-bold px-1 py-0.5 rounded truncate shadow-xs"
                              title={t.title}
                            >
                              📌 {t.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          ))}
        </div>

        <div className="mx-5 my-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-red-700 font-bold text-sm">課題・予定一覧</h2>

            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="text-xs text-blue-600 border border-blue-600 rounded px-2 py-0.5 cursor-pointer"
            >
              追加
            </button>
          </div>

          <div>
            {taskList.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-12 items-center text-xs border-b border-gray-200 py-2.5"
              >
                <span className="font-bold col-span-5 text-gray-700 truncate">
                  ・{task.title}
                </span>

                <span className="text-red-500 col-span-5 font-bold text-center">
                  期限: {task.date} ({task.period}限)
                </span>
                <div className="col-span-2 text-right">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-gray-100 border border-gray-300 text-gray-600 rounded px-2 py-0.5 text-[11px] cursor-pointer hover:bg-red-50 hover:text-red-600 transition"
                  >
                    完了
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 課題追加モーダル */}
        {isTaskModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-5 rounded-lg w-80 flex flex-col gap-3">
              <h3 className="font-bold text-sm text-red-600">課題の追加</h3>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">
                  課題名
                </label>
                <input
                  type="text"
                  placeholder="例: プログラミング課題"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="border p-2 rounded text-xs w-full"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 block mb-1">
                  期限日
                </label>
                <input
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  className="border p-2 rounded text-xs w-full text-gray-700 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 block mb-1">
                  反映時限
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                  className="border p-2 rounded text-xs w-full bg-white cursor-pointer"
                >
                  <option value={1}>1時限</option>
                  <option value={2}>2時限</option>
                  <option value={3}>3時限</option>
                  <option value={4}>4時限</option>
                  <option value={5}>5時限</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-3 py-1 text-xs border rounded cursor-pointer"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded cursor-pointer"
                >
                  追加
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 授業登録モーダル */}
        {isClassModalOpen && selectedCell && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-5 rounded-lg w-80 flex flex-col gap-3">
              <h3 className="font-bold text-sm text-blue-600">
                授業の登録 ({selectedCell.period}時限 / {selectedCell.dayKey})
              </h3>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">
                  授業名
                </label>
                <input
                  type="text"
                  placeholder="例: プログラミング"
                  value={classNameInput}
                  onChange={(e) => setClassNameInput(e.target.value)}
                  className="border p-2 rounded text-xs w-full"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 block mb-1">
                  教室
                </label>
                <input
                  type="text"
                  placeholder="例: オンライン"
                  value={classRoomInput}
                  onChange={(e) => setClassRoomInput(e.target.value)}
                  className="border p-2 rounded text-xs w-full"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setIsClassModalOpen(false)}
                  className="px-3 py-1 text-xs border rounded cursor-pointer"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSaveClass}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded cursor-pointer"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TimeTable;
