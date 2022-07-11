import { Navigate, Route, Routes } from "react-router-dom";
import ProtectRoute from "./component/protect_route";
import Login from "./page/auth/login";
import Register from "./page/auth/register";
import Dashboard from "./page/dashboard";
import Detail from "./page/detail";
import Penawaran from "./page/penawaran";
import Profile from "./page/profile";
import Search from "./page/search";
import Today from "./page/today";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={<ProtectRoute children={<Dashboard />} />}
      />
      <Route
        path="/today"
        element={<ProtectRoute children={<Today />} />}
      />
      <Route
        path="/profile"
        element={<ProtectRoute children={<Profile />} />}
      />
      <Route
        path="/detail/:id"
        element={<ProtectRoute children={<Detail />} />}
      />
      <Route
        path="/penawaran/:id"
        element={<ProtectRoute children={<Penawaran />} />}
      />
      <Route
        path="/search"
        element={<ProtectRoute children={<Search />} />}
      />

      <Route path="/" element={<Navigate replace to={"/dashboard"} />} />
    </Routes>
  );
}
