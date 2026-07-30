import { Link } from "react-router-dom";

const Registration = () => {
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

        <form onSubmit={(e) => e.preventDefault()}>
          <h3 className="mt-5 ml-5">使用するメールアドレス：</h3>
          <div className="my-2 mx-5">
            <input
              type="email"
              inputMode="email"
              placeholder="example@univ.ac.jp"
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">パスワードの設定：</h3>
          <div className="my-2 mx-5">
            <input
              type="password"
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">パスワードを再度入力：</h3>
          <div className="my-2 mx-5">
            <input
              type="password"
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">フルネーム：</h3>
          <div className="my-2 mx-5">
            <input
              type="text"
              placeholder="山田太郎"
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">ニックネーム：</h3>
          <div className="my-2 mx-5">
            <input
              type="text"
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">学校名：</h3>
          <div className="my-2 mx-5">
            <input
              type="text"
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">学年：</h3>
          <div className="my-2 mx-5">
            <select className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none">
              <option value="">選択してください</option>
              <option value="1">1年</option>
              <option value="2">2年</option>
              <option value="3">3年</option>
              <option value="4">4年</option>
            </select>
          </div>

          <h3 className="ml-5">学部：</h3>
          <div className="my-2 mx-5">
            <input
              type="text"
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
          </div>

          <h3 className="ml-5">学科：</h3>
          <div className="my-2 mx-5">
            <input
              type="text"
              className="w-full px-2 py-2 bg-white border border-gray-200 rounded-xl text-base appearance-none"
            />
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
