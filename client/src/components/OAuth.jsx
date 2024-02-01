import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoUrl,
        }),
      });
      const data = res.json();
      dispatch(signInSuccess(data));
      //   console.log(result);
    } catch (error) {
      console.log("could not sign in with Google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className=" p-3 bg-red-600 rounded-lg text-white uppercase hover:opacity-85"
    >
      {" "}
      Continue with Google
    </button>
  );
};

export default OAuth;
