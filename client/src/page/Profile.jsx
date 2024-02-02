import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" p-3 max-w-lg mx-auto">
      {" "}
      <h1 className=" font-semibold text-center text-3xl my-7">Profile</h1>
      <form className=" flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full cursor-pointer  h-24 w-24 object-cover self-center mt-2"
        />
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id=""
          className="border p-3 rounded-lg"
        />
        <button className=" bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-white p-3">
          {" "}
          update
        </button>
      </form>
      <div className=" mt-4 flex  justify-between">
        <span className=" text-red-700 cursor-pointe font-semibold">
          Delete Account
        </span>
        <span className=" text-red-700 cursor-pointe font-semibold">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
