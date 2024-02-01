import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { OAuth } from "../components";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  // eslint-disable-next-line no-unused-vars

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handler function to manipulate the data
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`/api/auth/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (e) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center my-7 font-semibold">SignIn</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        {/* <input
          type="text"
          placeholder="username"
          className=" border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
          autoComplete="true"
        /> */}
        <input
          type="email"
          placeholder="email"
          className=" border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className=" border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className=" bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-75 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className=" flex mt-3 gap-2">
        <p>dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className=" text-blue-700"> sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
