import { Outlet } from "react-router-dom";
import Header from "../components/navbar/Navbar";
const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default RootLayout;
