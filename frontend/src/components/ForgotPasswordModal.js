import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ForgotPasswordModal = ({ show, onClose, userType }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [resetStep, setResetStep] = useState('request'); // 'request' | 'verify' | 'reset'
  const [otpToken, setOtpToken] = useState(null); // Store OTP token for verification

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Call backend API to send OTP
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userType }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      const data = await response.json();
      setOtpToken(data.otpToken); // Save OTP token for verification

      setMessage({
        type: 'success',
        text: 'OTP has been sent to your email.',
      });

      // Move to OTP verification step
      setResetStep('verify');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to send OTP. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Call backend API to verify OTP
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, otpToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      const data = await response.json();
      setOtpToken(data.resetToken); // Save reset token for password reset

      setMessage({
        type: 'success',
        text: 'OTP verified successfully.',
      });

      // Move to password reset step
      setResetStep('reset');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to verify OTP. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Passwords do not match.',
      });
      setIsLoading(false);
      return;
    }

    try {
      // Call backend API to reset password
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken: otpToken, newPassword, confirmPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      setMessage({
        type: 'success',
        text: 'Your password has been successfully reset.',
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setResetStep('request');
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to reset password. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            className="bg-[#131219] rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-violet-400 mb-4">
              {resetStep === 'request'
                ? 'Reset Password'
                : resetStep === 'verify'
                ? 'Verify OTP'
                : 'Set New Password'}
            </h2>

            {message && (
              <div className={`mb-4 p-3 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-red-900 text-red-300'
              }`}>
                {message.text}
              </div>
            )}

            {resetStep === 'request' ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-cyan-300 text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-slate-800 text-cyan-200 rounded-lg p-3 border border-slate-700 focus:border-violet-500 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-slate-700 text-slate-300 py-3 rounded-lg hover:bg-slate-600 transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                </div>
              </form>
            ) : resetStep === 'verify' ? (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-cyan-300 text-sm font-medium">OTP</label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 text-cyan-200 rounded-lg p-3 border border-slate-700 focus:border-violet-500 outline-none"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setResetStep('request')}
                    className="flex-1 bg-slate-700 text-slate-300 py-3 rounded-lg hover:bg-slate-600 transition-colors"
                    disabled={isLoading}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    ) : (
                      'Verify OTP'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-cyan-300 text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    className="w-full bg-slate-800 text-cyan-200 rounded-lg p-3 border border-slate-700 focus:border-violet-500 outline-none"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-cyan-300 text-sm font-medium">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full bg-slate-800 text-cyan-200 rounded-lg p-3 border border-slate-700 focus:border-violet-500 outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setResetStep('verify')}
                    className="flex-1 bg-slate-700 text-slate-300 py-3 rounded-lg hover:bg-slate-600 transition-colors"
                    disabled={isLoading}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;