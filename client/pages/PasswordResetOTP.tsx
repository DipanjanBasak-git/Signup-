import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PasswordResetOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      // Only allow numeric input
      if (!isNaN(Number(value)) || value === "") {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");
        
        // Auto-focus next input
        if (value && index < 5) {
          const nextInput = document.getElementById(`otp-${index + 1}`);
          nextInput?.focus();
        }
      } else {
        setError("Please enter numbers only");
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all OTP digits are filled
    if (otp.some(digit => !digit)) {
      setError("Please enter the complete verification code");
      return;
    }

    // Check if all digits are numeric
    if (otp.some(digit => isNaN(Number(digit)))) {
      setError("Please enter numbers only");
      return;
    }

    setError("");
    // Navigate to password change page
    navigate("/reset-password/change", { state: { email, otp: otp.join("") } });
  };

  return (
    <div className="min-h-screen flex items-start flex-wrap bg-white relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#F5F7FE] text-[#425583] hover:bg-[#e8ecfd] transition-colors z-10"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_18_1887)">
            <path
              d="M20.7975 23.205L16.5975 19.005L20.7975 14.805L19.3875 13.395L13.7775 19.005L19.3875 24.615L20.7975 23.205Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_18_1887">
              <rect width="36" height="36" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      {/* Left Panel */}
      <div className="flex-1 w-1/2 min-w-[580px] h-screen flex flex-col justify-center items-center p-8 md:p-[34px] bg-white relative overflow-hidden">
        <svg
          className="w-full h-full max-w-[506px] max-h-[664px] absolute"
          viewBox="0 0 606 764"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M0 64.3368C0 28.8046 28.6538 0 64 0H401.243C427.125 0 450.46 15.6712 460.368 39.7076L494.105 121.55C500.748 137.667 513.618 150.381 529.764 156.777L565.465 170.921C589.924 180.61 606 204.35 606 230.777V699.663C606 735.195 577.346 764 542 764H133.947C104.129 764 78.2622 743.301 71.5763 714.089L62.9101 676.227C59.1243 659.686 48.9902 645.32 34.7153 636.257L29.8244 633.151C11.2582 621.364 0 600.83 0 578.755V64.3368Z"
            fill="#16173A"
          />
          <mask
            id="mask0_18_1860"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="606"
            height="764"
          >
            <path
              d="M0 64.3368C0 28.8046 28.6538 0 64 0H401.243C427.125 0 450.46 15.6712 460.368 39.7076L494.105 121.55C500.748 137.667 513.618 150.381 529.764 156.777L565.465 170.921C589.924 180.61 606 204.35 606 230.777V699.663C606 735.195 577.346 764 542 764H133.947C104.129 764 78.2622 743.301 71.5763 714.089L62.9101 676.227C59.1243 659.686 48.9902 645.32 34.7153 636.257L29.8244 633.151C11.2582 621.364 0 600.83 0 578.755V64.3368Z"
              fill="#16173A"
            />
          </mask>
          <g mask="url(#mask0_18_1860)">
            <path
              d="M674.115 675.539C673.298 644.057 670.411 612.923 665.455 582.136C659.52 545.268 650.618 512.386 638.749 483.489C628.858 462.564 617.483 447.119 604.624 437.155C592.755 428.187 576.929 423.703 557.147 423.703C541.321 423.703 526.484 427.191 512.636 434.166C499.778 442.137 489.392 451.603 481.479 462.564C495.327 491.461 506.702 524.343 515.604 561.211C525.495 598.079 530.44 635.943 530.44 674.804C530.44 724.625 521.538 762.988 503.734 789.892C485.93 817.792 458.235 831.742 420.648 831.742L393.942 831.742L373.171 626.975C365.258 546.264 343.497 484.486 307.889 441.639C273.27 399.789 222.825 378.864 156.554 378.864C80.3917 378.864 23.0228 407.262 -15.5529 464.059C-47.7128 513.508 -66.1143 578.276 -70.7574 658.364C-72.8964 641.991 -74 625.29 -74 608.329C-74 398.578 94.7886 228.542 303 228.542C511.211 228.542 680 398.578 680 608.329C680 631.264 677.982 653.724 674.115 675.539Z"
              fill="url(#paint0_linear_18_1860)"
              fillOpacity="0.32"
            />
            <path
              d="M77.9188 779.429C72.9732 755.515 70.5005 729.109 70.5005 700.213C70.5005 652.384 78.4134 617.509 94.2393 595.588C110.065 574.663 132.32 564.2 161.005 564.2C189.689 564.2 210.461 574.663 223.319 595.588C237.167 616.513 246.069 646.904 250.025 686.761L263.379 831.742L98.6903 831.742C90.7774 820.781 83.8536 803.343 77.9188 779.429Z"
              fill="url(#paint1_linear_18_1860)"
              fillOpacity="0.32"
            />
            <g filter="url(#filter0_f_18_1860)">
              <circle
                cx="70"
                cy="101"
                r="418"
                fill="#7573FF"
                fillOpacity="0.32"
              />
            </g>
            <text
              fill="url(#paint2_linear_18_1860)"
              xmlSpace="preserve"
              style={{ whiteSpace: "pre" }}
              fontFamily="Inter"
              fontSize="64"
              fontWeight="bold"
              letterSpacing="0em"
            >
              <tspan x="64" y="125.773">
                Enter Reset
              </tspan>
              <tspan x="64" y="202.773">
                Code
              </tspan>
            </text>
          </g>
          <defs>
            <filter
              id="filter0_f_18_1860"
              x="-748"
              y="-717"
              width="1636"
              height="1636"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="200"
                result="effect1_foregroundBlur_18_1860"
              />
            </filter>
            <linearGradient
              id="paint0_linear_18_1860"
              x1="303"
              y1="228.542"
              x2="303"
              y2="831.742"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7573FF" />
              <stop offset="1" stopColor="#7573FF" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_18_1860"
              x1="303"
              y1="228.542"
              x2="303"
              y2="831.742"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7573FF" />
              <stop offset="1" stopColor="#7573FF" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_18_1860"
              x1="271"
              y1="64"
              x2="271"
              y2="295"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0.48" />
            </linearGradient>
          </defs>
          <text
            fill="url(#paint2_linear_18_1860)"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inter"
            fontSize="64"
            fontWeight="bold"
            letterSpacing="0em"
          >
            <tspan x="64" y="125.773">
              Enter Reset
            </tspan>
            <tspan x="64" y="202.773">
              Code
            </tspan>
          </text>
        </svg>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:flex-1 min-h-screen flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-[400px]">
          <form onSubmit={handleVerify} className="flex flex-col gap-12">
            {/* Title Section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-[32px] font-bold leading-normal text-[#2E3139]">
                Enter Reset Code
              </h1>
              <p className="text-sm leading-normal text-[#425583]">
                Enter the verification code sent to your email
              </p>
            </div>

            {/* OTP Input Fields */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-[52px] h-[52px] text-center text-xl font-semibold rounded-xl border ${
                        error ? "border-red-500" : "border-[#D3E0FE]"
                      } focus:border-[#4045EF] focus:outline-none transition-colors`}
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </div>

              {/* Resend Code */}
              <div className="flex items-center justify-center gap-1 text-sm">
                <span className="text-[#425583]">Didn't receive code?</span>
                <button
                  type="button"
                  className="text-[#4045EF] font-medium hover:underline"
                >
                  Resend
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className="h-12 px-10 flex items-center justify-center rounded-full bg-[#4045EF] text-white text-sm font-medium hover:bg-[#3338d4] transition-colors"
                >
                  Verify Code
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}