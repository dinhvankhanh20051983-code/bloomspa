import { useState } from 'react';

function LoginOwner({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = "@Hung05201983"; // Bạn có thể đổi mật khẩu chủ tiệm ở đây

  const handleLogin = () => {
    if (password === correctPassword) {
      onLogin({
        id: "owner",
        name: "Chủ Tiệm",
        role: "owner",
        phone: "0933251983"
      });
    } else {
      setError("Mật khẩu không đúng!");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7c5cbf] to-[#5a3d9e] flex items-center justify-center p-6">
      <div className="max-w-[420px] w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👑</div>
          <h1 className="text-3xl font-bold text-gray-800">Đăng nhập Chủ Tiệm</h1>
          <p className="text-gray-500 mt-2">BloomSpa & Wellness</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Mật khẩu chủ tiệm</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Nhập mật khẩu"
              className="w-full p-5 border border-gray-300 rounded-3xl text-lg focus:outline-none focus:border-[#7c5cbf]"
            />
          </div>

          {error && (
            <div className="text-red-500 text-center font-medium">{error}</div>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-5 bg-[#7c5cbf] text-white rounded-3xl font-semibold text-xl hover:bg-[#5a3d9e] transition"
          >
            Đăng nhập
          </button>

          <div className="text-center text-xs text-gray-400">
            Mật khẩu mặc định: hoichutiem<br />
            (Bạn có thể thay đổi trong code)
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginOwner;