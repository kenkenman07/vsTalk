import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Meeting from "./pages/Meeting";
import Signin from "./pages/Signin";
import Join from "./pages/Join";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import { authService } from "./services/auth/auth.service";
import { useCurrentUserStore } from "./modules/auth/current-user.state";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = useCurrentUserStore();

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    await authService.checkUserSignin(currentUserStore.set);

    setIsLoading(false);
  };

  if (isLoading) return <div />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="join" element={<Join />} />
          <Route path="/meeting/:roomId" element={<Meeting />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
