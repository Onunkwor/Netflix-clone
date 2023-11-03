import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signIn } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const signInPromise = toast.promise(signIn(email, password), {
      loading: "Signing in...",
      success: "SignIn successful!",
      error: (error) => {
        if (
          error.message === "Firebase: Error (auth/invalid-login-credentials)."
        ) {
          return "Invalid login credentials";
        } else {
          return error.message;
        }
      },
    });

    try {
      await signInPromise;
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <img
          className="hidden sm:block absolute w-full h-full object-cover "
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/8ab8459d-e63e-43e3-b217-00afb27a4d58/NG-en-20231023-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="/"
        />
        <div className="bg-black/60 absolute top-0 left-0 w-full h-screen"></div>
        <div className=" fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <form
                onSubmit={handleSignIn}
                className="w-full flex flex-col py-4 "
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button className="bg-red-600 rounded py-3 my-6 font-bold">
                  Sign In
                </button>

                <div className="flex justify-between text-sm text-gray-600">
                  <p>
                    <input className="mr-1" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-4">
                  <span className="text-gray-600">New to Netflix?</span>
                  <Link to="/Sign Up"> Sign Up</Link>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
