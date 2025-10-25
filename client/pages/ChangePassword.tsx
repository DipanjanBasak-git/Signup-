import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*)";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user types
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));

    // Validate password as user types
    if (name === "password") {
      const passwordError = validatePassword(value);
      setErrors(prev => ({
        ...prev,
        password: passwordError
      }));
    }

    // Check password match as user types confirm password
    if (name === "confirmPassword") {
      setErrors(prev => ({
        ...prev,
        confirmPassword: value !== formData.password ? "Passwords do not match" : ""
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrors(prev => ({
        ...prev,
        password: passwordError
      }));
      return;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: "Passwords do not match"
      }));
      return;
    }

    // If all validations pass, proceed to success page
    navigate("/reset-password/success");
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
                Create New
              </tspan>
              <tspan x="64" y="202.773">
                Password
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
        </svg>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:flex-1 min-h-screen flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-[400px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-12">
            {/* Title Section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-[32px] font-bold leading-normal text-[#2E3139]">
                New Password
              </h1>
              <p className="text-sm leading-normal text-[#425583]">
                Create a new password for your account
              </p>
            </div>

            {/* Password Fields */}
            <div className="flex flex-col gap-8">
              {/* New Password */}
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className={`w-full h-12 px-4 pr-12 rounded-xl border ${
                      errors.password ? "border-red-500" : "border-[#D3E0FE]"
                    } focus:border-[#4045EF] focus:outline-none transition-colors`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#899CC9] hover:text-[#425583] transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {showPassword ? (
                        <>
                          <path
                            d="M8 3.33325C11.68 3.33325 14.86 5.83992 15.9933 9.33325C14.86 12.8266 11.68 15.3333 8 15.3333C4.32 15.3333 1.14 12.8266 0.00666666 9.33325C1.14 5.83992 4.32 3.33325 8 3.33325ZM8 13.3333C9.32608 13.3333 10.5978 12.8065 11.5355 11.8688C12.4732 10.9311 13 9.65933 13 8.33325C13 7.00717 12.4732 5.73539 11.5355 4.79772C10.5978 3.86004 9.32608 3.33325 8 3.33325C6.67392 3.33325 5.40215 3.86004 4.46447 4.79772C3.52678 5.73539 3 7.00717 3 8.33325C3 9.65933 3.52678 10.9311 4.46447 11.8688C5.40215 12.8065 6.67392 13.3333 8 13.3333ZM8 11.3333C7.20435 11.3333 6.44129 11.0172 5.87868 10.4546C5.31607 9.892 5 9.12894 5 8.33325C5 7.53757 5.31607 6.77451 5.87868 6.2119C6.44129 5.64929 7.20435 5.33325 8 5.33325C8.79565 5.33325 9.55871 5.64929 10.1213 6.2119C10.6839 6.77451 11 7.53757 11 8.33325C11 9.12894 10.6839 9.892 10.1213 10.4546C9.55871 11.0172 8.79565 11.3333 8 11.3333ZM8 9.33325C8.26522 9.33325 8.51957 9.22682 8.70711 9.03928C8.89464 8.85175 9 8.59739 9 8.33325C9 8.06804 8.89464 7.81368 8.70711 7.62615C8.51957 7.43861 8.26522 7.33325 8 7.33325C7.73478 7.33325 7.48043 7.43861 7.29289 7.62615C7.10536 7.81368 7 8.06804 7 8.33325C7 8.59739 7.10536 8.85175 7.29289 9.03928C7.48043 9.22682 7.73478 9.33325 8 9.33325Z"
                            fill="currentColor"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            d="M3.14004 2.19338C3.07788 2.13122 3.00409 2.08191 2.92288 2.04827C2.84166 2.01463 2.75462 1.99731 2.66671 1.99731C2.5788 1.99731 2.49176 2.01463 2.41054 2.04827C2.32933 2.08191 2.25553 2.13122 2.19338 2.19338C2.06784 2.31891 1.99731 2.48917 1.99731 2.66671C1.99731 2.84424 2.06784 3.01451 2.19338 3.14004L5.94671 6.89338C5.70924 7.33512 5.62043 7.84162 5.69343 8.33781C5.76644 8.83399 5.99737 9.29345 6.352 9.64808C6.70663 10.0027 7.16609 10.2336 7.66228 10.3066C8.15846 10.3797 8.66496 10.2908 9.10671 10.0534L12.86 13.8067C12.922 13.8692 12.9958 13.9188 13.077 13.9526C13.1582 13.9865 13.2454 14.0039 13.3334 14.0039C13.4214 14.0039 13.5085 13.9865 13.5898 13.9526C13.671 13.9188 13.7447 13.8692 13.8067 13.8067C13.8692 13.7447 13.9188 13.671 13.9526 13.5898C13.9865 13.5085 14.0039 13.4214 14.0039 13.3334C14.0039 13.2454 13.9865 13.1582 13.9526 13.077C13.9188 12.9958 13.8692 12.922 13.8067 12.86L3.14004 2.19338ZM8.00004 9.00004C7.73483 9.00004 7.48047 8.89469 7.29293 8.70715C7.1054 8.51961 7.00004 8.26526 7.00004 8.00004V7.95338L8.04004 8.99337L8.00004 9.00004Z"
                            fill="currentColor"
                          />
                          <path
                            d="M8.14667 11.3332C5.28001 11.3999 3.4 8.93992 2.81334 7.99992C3.23099 7.33371 3.73291 6.72423 4.30667 6.18658L3.33334 5.24658C2.58089 5.95556 1.93628 6.77087 1.42 7.66658C1.36149 7.76793 1.33069 7.88289 1.33069 7.99992C1.33069 8.11694 1.36149 8.2319 1.42 8.33325C1.84 9.05992 4.08667 12.6666 8.01334 12.6666H8.18001C8.91837 12.6447 9.64718 12.4935 10.3333 12.2199L9.28001 11.1666C8.90958 11.264 8.52946 11.3199 8.14667 11.3332Z"
                            fill="currentColor"
                          />
                          <path
                            d="M14.58 7.66674C14.1533 6.92674 11.8 3.21341 7.81996 3.33341C7.08159 3.35531 6.35278 3.50649 5.66663 3.78008L6.71996 4.83341C7.09038 4.73596 7.4705 4.68006 7.85329 4.66674C10.7133 4.59341 12.5933 7.06008 13.1866 8.00008C12.7587 8.66827 12.2455 9.27785 11.66 9.81341L12.6666 10.7534C13.4285 10.0463 14.0822 9.23089 14.6066 8.33341C14.6611 8.22974 14.6874 8.11354 14.6827 7.9965C14.678 7.87947 14.6426 7.76573 14.58 7.66674Z"
                            fill="currentColor"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                  {errors.password && (
                    <p className="absolute -bottom-6 left-0 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className={`w-full h-12 px-4 pr-12 rounded-xl border ${
                      errors.confirmPassword ? "border-red-500" : "border-[#D3E0FE]"
                    } focus:border-[#4045EF] focus:outline-none transition-colors`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#899CC9] hover:text-[#425583] transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {showConfirmPassword ? (
                        <>
                          <path
                            d="M8 3.33325C11.68 3.33325 14.86 5.83992 15.9933 9.33325C14.86 12.8266 11.68 15.3333 8 15.3333C4.32 15.3333 1.14 12.8266 0.00666666 9.33325C1.14 5.83992 4.32 3.33325 8 3.33325ZM8 13.3333C9.32608 13.3333 10.5978 12.8065 11.5355 11.8688C12.4732 10.9311 13 9.65933 13 8.33325C13 7.00717 12.4732 5.73539 11.5355 4.79772C10.5978 3.86004 9.32608 3.33325 8 3.33325C6.67392 3.33325 5.40215 3.86004 4.46447 4.79772C3.52678 5.73539 3 7.00717 3 8.33325C3 9.65933 3.52678 10.9311 4.46447 11.8688C5.40215 12.8065 6.67392 13.3333 8 13.3333ZM8 11.3333C7.20435 11.3333 6.44129 11.0172 5.87868 10.4546C5.31607 9.892 5 9.12894 5 8.33325C5 7.53757 5.31607 6.77451 5.87868 6.2119C6.44129 5.64929 7.20435 5.33325 8 5.33325C8.79565 5.33325 9.55871 5.64929 10.1213 6.2119C10.6839 6.77451 11 7.53757 11 8.33325C11 9.12894 10.6839 9.892 10.1213 10.4546C9.55871 11.0172 8.79565 11.3333 8 11.3333ZM8 9.33325C8.26522 9.33325 8.51957 9.22682 8.70711 9.03928C8.89464 8.85175 9 8.59739 9 8.33325C9 8.06804 8.89464 7.81368 8.70711 7.62615C8.51957 7.43861 8.26522 7.33325 8 7.33325C7.73478 7.33325 7.48043 7.43861 7.29289 7.62615C7.10536 7.81368 7 8.06804 7 8.33325C7 8.59739 7.10536 8.85175 7.29289 9.03928C7.48043 9.22682 7.73478 9.33325 8 9.33325Z"
                            fill="currentColor"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            d="M3.14004 2.19338C3.07788 2.13122 3.00409 2.08191 2.92288 2.04827C2.84166 2.01463 2.75462 1.99731 2.66671 1.99731C2.5788 1.99731 2.49176 2.01463 2.41054 2.04827C2.32933 2.08191 2.25553 2.13122 2.19338 2.19338C2.06784 2.31891 1.99731 2.48917 1.99731 2.66671C1.99731 2.84424 2.06784 3.01451 2.19338 3.14004L5.94671 6.89338C5.70924 7.33512 5.62043 7.84162 5.69343 8.33781C5.76644 8.83399 5.99737 9.29345 6.352 9.64808C6.70663 10.0027 7.16609 10.2336 7.66228 10.3066C8.15846 10.3797 8.66496 10.2908 9.10671 10.0534L12.86 13.8067C12.922 13.8692 12.9958 13.9188 13.077 13.9526C13.1582 13.9865 13.2454 14.0039 13.3334 14.0039C13.4214 14.0039 13.5085 13.9865 13.5898 13.9526C13.671 13.9188 13.7447 13.8692 13.8067 13.8067C13.8692 13.7447 13.9188 13.671 13.9526 13.5898C13.9865 13.5085 14.0039 13.4214 14.0039 13.3334C14.0039 13.2454 13.9865 13.1582 13.9526 13.077C13.9188 12.9958 13.8692 12.922 13.8067 12.86L3.14004 2.19338ZM8.00004 9.00004C7.73483 9.00004 7.48047 8.89469 7.29293 8.70715C7.1054 8.51961 7.00004 8.26526 7.00004 8.00004V7.95338L8.04004 8.99337L8.00004 9.00004Z"
                            fill="currentColor"
                          />
                          <path
                            d="M8.14667 11.3332C5.28001 11.3999 3.4 8.93992 2.81334 7.99992C3.23099 7.33371 3.73291 6.72423 4.30667 6.18658L3.33334 5.24658C2.58089 5.95556 1.93628 6.77087 1.42 7.66658C1.36149 7.76793 1.33069 7.88289 1.33069 7.99992C1.33069 8.11694 1.36149 8.2319 1.42 8.33325C1.84 9.05992 4.08667 12.6666 8.01334 12.6666H8.18001C8.91837 12.6447 9.64718 12.4935 10.3333 12.2199L9.28001 11.1666C8.90958 11.264 8.52946 11.3199 8.14667 11.3332Z"
                            fill="currentColor"
                          />
                          <path
                            d="M14.58 7.66674C14.1533 6.92674 11.8 3.21341 7.81996 3.33341C7.08159 3.35531 6.35278 3.50649 5.66663 3.78008L6.71996 4.83341C7.09038 4.73596 7.4705 4.68006 7.85329 4.66674C10.7133 4.59341 12.5933 7.06008 13.1866 8.00008C12.7587 8.66827 12.2455 9.27785 11.66 9.81341L12.6666 10.7534C13.4285 10.0463 14.0822 9.23089 14.6066 8.33341C14.6611 8.22974 14.6874 8.11354 14.6827 7.9965C14.678 7.87947 14.6426 7.76573 14.58 7.66674Z"
                            fill="currentColor"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                  {errors.confirmPassword && (
                    <p className="absolute -bottom-6 left-0 text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mt-4">
                <button
                  type="submit"
                  className="h-12 px-10 flex items-center justify-center rounded-full bg-[#4045EF] text-white text-sm font-medium hover:bg-[#3338d4] transition-colors"
                >
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}