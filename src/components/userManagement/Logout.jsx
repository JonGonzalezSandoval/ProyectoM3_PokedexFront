import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { loginUser, setLoginUser } = useContext(UserContext);

  let navigate = useNavigate();

  function handleLogout() {
    setLoginUser(null);
    localStorage.removeItem("SavedToken");
    navigate("/");
  }

  return (
      <button className="logout" onClick={handleLogout}>
        Logout{" "}
      </button>
  );
}
