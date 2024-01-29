import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center my-7 font-semibold">SignUp</h1>
      <form action="submit" className=" flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className=" border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className=" border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className=" border p-3 rounded-lg"
          id="password"
        />
        <button className=" bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-75 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className=" flex mt-3 gap-2">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className=" text-blue-700"> sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
