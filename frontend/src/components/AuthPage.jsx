import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import logo from "@/assets/logo.png"
import { Link, Outlet } from 'react-router-dom';


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page flex flex-col items-center justify-center h-screen">
      <div className=" flex flex-col w-full ">
 <Link to="/">

       <div className="flex flex-row items-center justify-center text-center align-center mb-10">
  <img src={logo} className="max-h-[50px] max-w-[50px] mr-4" />
  <h1 className="text-2xl ">LocalTreasure</h1>
</div>
  </Link>

        <div className="flex items-center justify-center">
            
        {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
          <div className="flex text-center items-center justify-center auth-toggle mt-5">
            {
                isLogin ? 
                <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <span  onClick={() => setIsLogin(false)}  href="#" className="underline underline-offset-4 font-bold">
                Sign up
              </span>
            </div> :
              <div className="text-center text-sm">
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)} href="#" className="underline underline-offset-4 font-bold">
                  Sign in
                </span>
              </div>
            }
          {/* <button
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default AuthPage;