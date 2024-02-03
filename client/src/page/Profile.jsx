import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getStorage } from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);

  useEffect(() => {
    if (file) {
      handleFileupload(file);
    }
  }, [file]);

  const handleFileupload = (file) => {
    const storage = getStorage(app);
  };
  return (
    <div className=" p-3 max-w-lg mx-auto">
      {" "}
      <h1 className=" font-semibold text-center text-3xl my-7">Profile</h1>
      <form className=" flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => {
            fileRef.current.click();
          }}
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
