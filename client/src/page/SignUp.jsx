import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // handler function to manipulate the data
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
      console.log(data);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center my-7 font-semibold">SignUp</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className=" border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
          autoComplete="true"
        />
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
          {loading ? "Loading..." : "Sign Up"}
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
