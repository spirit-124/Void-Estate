import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileupload(file);
    }
  }, [file]);

  const handleFileupload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
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
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full cursor-pointer  h-24 w-24 object-cover self-center mt-2"
        />
        <p className=" text-sm self-center">
          {fileUploadError ? (
            <span className=" text-red-500">
              Error Image Upload( Image must be less than 2 mb)
            </span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className=" text-slate-700">{`Uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span className=" text-green-700"> SuccessFully Uploaded!!</span>
          ) : (
            ""
          )}
        </p>
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
