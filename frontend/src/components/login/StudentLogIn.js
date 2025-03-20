import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BgColorAnimation from "../../animations/BgColorAnimation";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import AnimatedGradientBorderTW from "../../components/common/AnimatedGradientBorderTW";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";

const StudentLogIn = () => {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/studentLogin`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ usn, password })
        });
        const responseData = await response.json();
        if (responseData.status === 'ok') {
            localStorage.setItem('token', responseData.token);
            navigate(`/StudentHome`, { replace: true });
        } else {
            alert(responseData.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <BgColorAnimation
      child={
        <div className="flex items-center justify-center min-h-screen p-4">
          <AnimatedGradientBorderTW>
            <div className="bg-[#131219] p-8 rounded-xl w-full max-w-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* USN Field */}
                <div className="space-y-2">
                  <label className="text-cyan-300 text-sm font-medium">
                    USN
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 text-cyan-200 rounded-lg p-3 border border-slate-700 focus:border-violet-500 outline-none"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
                    placeholder="Enter your USN"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-cyan-300 text-sm font-medium">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-blue-400 text-sm hover:text-indigo-400 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-slate-800 text-cyan-200 rounded-lg p-3 border border-slate-700 focus:border-violet-500 outline-none pr-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-indigo-400"
                    >
                      {showPassword ? (
                        <MdOutlineVisibility size={24} />
                      ) : (
                        <MdOutlineVisibilityOff size={24} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <span>Log In</span>
                  <CiLogin className="text-xl" />
                </button>

                {/* Registration Section */}
                <div className="text-center text-slate-400">
                  New student?{" "}
                  <button
                    onClick={() => navigate("/StudentRegister")}
                    className="text-violet-400 hover:text-indigo-300 font-medium transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </AnimatedGradientBorderTW>

          {/* Forgot Password Modal */}
          <ForgotPasswordModal
            show={showForgotPassword}
            onClose={() => setShowForgotPassword(false)}
            userType="student" // or "company" or "trainigcomp"
          />
        </div>
      }
    />
  );
};

export default StudentLogIn;
