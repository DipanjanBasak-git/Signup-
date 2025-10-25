import { Link } from "react-router-dom";

export default function PasswordChangeSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-[400px] px-8">
        <div className="flex flex-col gap-12">
          {/* Success Icon */}
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#4045EF] mx-auto">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.667 26.667L9.16699 19.167L11.667 16.667L16.667 21.667L28.3337 10L30.8337 12.5L16.667 26.667Z"
                fill="white"
              />
            </svg>
          </div>

          {/* Title Section */}
          <div className="flex flex-col gap-2 items-center text-center">
            <h1 className="text-[32px] font-bold leading-normal text-[#2E3139]">
              Password Changed Successfully
            </h1>
            <p className="text-sm leading-normal text-[#425583]">
              Your password has been changed successfully. You can now login with your new password.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <Link
              to="/login"
              className="h-12 px-10 flex items-center justify-center rounded-full bg-[#4045EF] text-white text-sm font-medium hover:bg-[#3338d4] transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}