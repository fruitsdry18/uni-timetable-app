import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full">
      <h1 className="mt-30 text-center text-3xl text-blue-500 font-bold">
        UNI・KANRI
      </h1>
      <div className="mt-7 bg-blue-100 rounded-2xl h-auto max-w-sm pt-10 px-5 pb-5 mx-auto">
        <h2 className="font-bold text-center text-black text-2xl">ログイン</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <h3 className="mt-10 ml-5">メールアドレス：</h3>
          <div className="my-2 mx-5">
            <input
              type="email"
              inputMode="email"
              placeholder="example@univ.ac.jp"
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">パスワード：</h3>
          <div className="my-2 mx-5">
            <input
              type="password"
              placeholder="パスワードを入力"
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <div className="text-right pb-5 mr-5">
            <Link to="/registration" className="text-xs text-gray-700">
              登録がお済みでない方へ
            </Link>
          </div>

          <div className="bg-blue-500 hover:bg-blue-600 transition-colors mx-20 rounded-xl py-1 mb-10">
            <button
              type="submit"
              className="text-3xl font-bold w-full text-white cursor-pointer"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
