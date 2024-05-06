import { useState } from "react";
import { useNavigate } from "react-router-dom";
import APP_API from "../../utils/api"; 
import { useAuth } from "../../context/AuthContext";

const AuthForm = () => {
  const navigate = useNavigate();
  const emailRegex = /\S+@\S+\.\S+/;
  const [isLoginActive, setIsLoginActive] = useState(true);
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});
  const [loginMsg, setLoginMsg] = useState("");
  const [signupMsg, setSignupMsg] = useState("");

  const handleChange = (event, form) => {
    const { name, value } = event.target;
    if (form === "login") {
      setLoginData({ ...loginData, [name]: value });
    } else if (form === "signup") {
      setSignupData({ ...signupData, [name]: value });
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    let errors = {};

    Object.keys(loginData).forEach((key) => {
      if (!loginData[key].trim()) errors[key] = "Required";
    });
    setLoginErrors(errors);
    if (Object.keys(errors).length) return;

    try {
      const response = await APP_API.login({
        identifier: loginData.usernameOrEmail,
        password: loginData.password,
      });

      if (response.status === 200) {
        login(response.data.token);
        setLoginMsg("Login successful");
        navigate(-1);
      }
    } catch (error) {
      setLoginMsg(error.response.data.message);
      console.error("Failed to log in", error);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    let errors = {};

    Object.keys(signupData).forEach((key) => {
      if (!signupData[key].trim()) errors[key] = "Required";
    });

    if (signupData.email && !emailRegex.test(signupData.email)) {
      errors["email"] = "Invalid email";
    }
    setSignupErrors(errors);
    if (Object.keys(errors).length) return;

    try {
      const response = await APP_API.signup(signupData);

      if (response.status === 200) {
        const loginResponse = await APP_API.login({
          identifier: signupData.username,
          password: signupData.password,
        });
        if (loginResponse.status === 200) {
          localStorage.setItem("token", response.data.token);
          setLoginMsg("Signup successful");
          navigate(-1);
        }
      }
    } catch (error) {
      setSignupMsg(error.response.data.message);
      console.error("Failed to sign up", error);
    }
  };

  return (
    <div className="w-full md:w-[25rem] font-light text-xs md:text-sm flex flex-col gap-4">
      <div className="flex flex-col gap-4 p-4 border border-stone-100 rounded-md shadow-md shadow-stone-400/50 bg-stone-500/10">
        <div className="w-full text-md md:text-lg flex gap-4">
          <button
            className={`w-full py-2 border border-stone-100 rounded-md hover:bg-base-300/80 ${
              isLoginActive ? "bg-base-300/80 font-normal" : ""
            }`}
            onClick={() => setIsLoginActive(true)}
          >
            Login
          </button>
          <button
            className={`w-full py-2 border border-stone-100 rounded-md hover:bg-base-300/80 ${
              isLoginActive ? "" : "bg-base-300/80 font-normal"
            }`}
            onClick={() => setIsLoginActive(false)}
          >
            Signup
          </button>
        </div>

        {isLoginActive ? (
          <form
            className="w-full flex flex-col justify-center gap-4"
            onSubmit={handleLoginSubmit}
          >
            <div className="w-full flex flex-col gap-2">
              <label
                className="w-full whitespace-nowrap"
                htmlFor="usernameOrEmail"
              >
                Username/E-mail :
              </label>
              <input
                className={`w-full h-9 bg-transparent focus:outline-none border border-stone-100 rounded-md p-2 focus:border-transparent focus:ring-1 ${
                  loginErrors.usernameOrEmail
                    ? "border-transparent ring-1 ring-red-500"
                    : "ring-slate-300"
                }`}
                name="usernameOrEmail"
                id="usernameOrEmail"
                value={loginData.usernameOrEmail}
                onChange={(e) => handleChange(e, "login")}
                placeholder="Username or Email"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="w-full whitespace-nowrap" htmlFor="password">
                Password :
              </label>
              <input
                className={`w-full h-9 bg-transparent focus:outline-none border border-stone-100 rounded-md p-2 focus:border-transparent focus:ring-1 ${
                  loginErrors.password
                    ? "border-transparent ring-1 ring-red-500"
                    : "ring-slate-300"
                }`}
                name="password"
                id="password"
                value={loginData.password}
                onChange={(e) => handleChange(e, "login")}
                placeholder="Password"
                type="password"
              />
            </div>

            <button
              className="w-full py-2 border border-stone-100 rounded-md"
              type="submit"
            >
              Login
            </button>
          </form>
        ) : (
          <form
            className="w-full flex flex-col justify-center gap-4"
            onSubmit={handleSignupSubmit}
          >
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <label className="w-full whitespace-nowrap" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className={`w-full h-9 bg-transparent focus:outline-none border border-stone-100 rounded-md p-2 focus:border-transparent focus:ring-1 ${
                    signupErrors.first_name
                      ? "border-transparent ring-1 ring-red-500"
                      : "ring-slate-300"
                  }`}
                  name="first_name"
                  id="firstName"
                  value={signupData.first_name}
                  onChange={(e) => handleChange(e, "signup")}
                  placeholder="First Name"
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <label className="w-full whitespace-nowrap" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className={`w-full h-9 bg-transparent focus:outline-none border border-stone-100 rounded-md p-2 focus:border-transparent focus:ring-1 ${
                    signupErrors.last_name
                      ? "border-transparent ring-1 ring-red-500"
                      : "ring-slate-300"
                  }`}
                  name="last_name"
                  id="lastName"
                  value={signupData.last_name}
                  onChange={(e) => handleChange(e, "signup")}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="w-full whitespace-nowrap" htmlFor="username">
                Username
              </label>
              <input
                className={`w-full h-9 bg-transparent focus:outline-none border border-stone-100 rounded-md p-2 focus:border-transparent focus:ring-1 ${
                  signupErrors.username
                    ? "border-transparent ring-1 ring-red-500"
                    : "ring-slate-300"
                }`}
                name="username"
                id="username"
                value={signupData.username}
                onChange={(e) => handleChange(e, "signup")}
                placeholder="Username"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="w-full whitespace-nowrap" htmlFor="email">
                E-mail
              </label>
              <input
                className={`w-full h-9 bg-transparent focus:outline-none border border-stone-100 rounded-md p-2 focus:border-transparent focus:ring-1 ${
                  signupErrors.email
                    ? "border-transparent ring-1 ring-red-500"
                    : "ring-slate-300"
                }`}
                name="email"
                id="email"
                value={signupData.email}
                onChange={(e) => handleChange(e, "signup")}
                placeholder="Email"
                type="email"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="w-full whitespace-nowrap" htmlFor="password">
                Password
              </label>
              <input
                className={`w-full h-9 bg-transparent focus:outline-none border border-stone-100 rounded-md p-2 focus:border-transparent focus:ring-1 ${
                  signupErrors.password
                    ? "border-transparent ring-1 ring-red-500"
                    : "ring-slate-300"
                }`}
                name="password"
                id="password"
                value={signupData.password}
                onChange={(e) => handleChange(e, "signup")}
                placeholder="Password"
                type="password"
              />
            </div>

            <button
              className="w-full py-2 border border-stone-100 rounded-md"
              type="submit"
            >
              Signup
            </button>
          </form>
        )}
      </div>
      <p className="w-full py-2 flex justify-center">
        {isLoginActive ? loginMsg : signupMsg}
      </p>
    </div>
  );
};

export default AuthForm;
