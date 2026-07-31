import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Registration = () => {
  const navigate = useNavigate();

  // 各入力欄の値を保持するState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");

  // 登録処理
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // 簡易チェック：パスワードの再入力確認
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。");
      return;
    }

    // 1. SupabaseのAuthにメールとパスワードでユーザー作成
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // ユーザーの追加情報（ユーザーネームや学校など）をメタデータとして保存できるよ！
      options: {
        data: {
          username: username,
          school: school,
          grade: grade,
        },
      },
    });

    if (error) {
      alert("登録に失敗しました: " + error.message);
    } else {
      alert("会員登録が完了しました！");
      // 時間割画面（/timetable）へ移動
      navigate("/timetable");
    }
  };

  return (
    <div className="w-full">
      <h1 className="mt-30 text-center text-3xl text-blue-500 font-bold">
        UNI・KANRI
      </h1>
      <div className="mt-7 bg-blue-100 rounded-2xl h-auto max-w-sm py-10 px-5 mx-auto mb-30">
        <h2 className="font-bold text-center text-black text-2xl">
          新規会員登録
        </h2>
        <div className="text-right pb-5 mr-5 mt-2">
          <Link to="/login" className="text-xs text-gray-700">
            ログインはこちら
          </Link>
        </div>

        <form onSubmit={handleRegister}>
          <h3 className="mt-5 ml-5">使用するメールアドレス：</h3>
          <div className="my-2 mx-5">
            <input
              type="email"
              inputMode="email"
              placeholder="example@univ.ac.jp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">パスワードの設定：</h3>
          <div className="my-2 mx-5">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">パスワードを再度入力：</h3>
          <div className="my-2 mx-5">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">ユーザーネーム：</h3>
          <div className="my-2 mx-5">
            <input
              type="text"
              placeholder="山田太郎"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">学校名：</h3>
          <div className="my-2 mx-5">
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">学年：</h3>
          <div className="my-2 mx-5">
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            >
              <option value="">選択してください</option>
              <option value="1">1年</option>
              <option value="2">2年</option>
              <option value="3">3年</option>
              <option value="4">4年</option>
            </select>
          </div>

          <div className="bg-blue-500 hover:bg-blue-600 transition-colors mx-20 rounded-xl py-1 mt-6">
            <button
              type="submit"
              className="text-3xl font-bold w-full text-white cursor-pointer"
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
