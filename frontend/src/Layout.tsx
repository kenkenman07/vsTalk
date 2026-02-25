import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUserStore } from "./modules/auth/current-user.state";

function Layout() {
  const currentUserStore = useCurrentUserStore();

  if (currentUserStore.currentUser == null)
    return <Navigate replace to="/signin" />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
export default Layout;
