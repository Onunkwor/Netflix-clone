import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const signUpPromise = toast.promise(signUp(email, password),{
      loading : "Signing up...",
      success:"SignUp successful!",
      error: (error) =>{
         return error.message
      }
    })
    try {
      await signUpPromise;
      navigate('/')
    } catch (error) {
      console.log(error.message);
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
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <form
                className="w-full flex flex-col py-4 "
                onSubmit={handleSubmit}
              >
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="p-3 my-2 bg-gray-700"
                  type="email"
                  placeholder="Email"
                  autoComplete="on"
                />
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="p-3 my-2 bg-gray-700"
                  type="password"
                  placeholder="Password"
                  autoComplete="on"
                />
                <button className="bg-red-600 rounded py-3 my-6 font-bold">
                  Sign Up
                </button>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>
                    <input className="mr-1" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-4">
                  <span className="text-gray-600">
                    Already subscribed to Netflix?
                  </span>
                  <Link to="/Sign In"> Sign In</Link>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
