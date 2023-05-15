import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUid } from "../../store/slices/user.slice";
import { selectUid } from "../../store/selectors/user.selector";

const ProtectedRoutes = () => {
  const userId = useSelector(selectUid);
  const userTokenStorage = localStorage.getItem("userToken");
  const dispatch = useDispatch();
  if (userId || userTokenStorage) {
    dispatch(setUid({ uid: userId || userTokenStorage || "" }));
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default ProtectedRoutes;
