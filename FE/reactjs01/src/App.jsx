import { Outlet } from "react-router-dom";
import Header from "./components/layouts/header";
import axios from "./until/axios.customize";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth";
import { Spin } from "antd";

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      try {
        const res = await axios.get(`/v1/api/account`);
        if (res && !res.message) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.email,
              name: res.name
            }
          });
        }
      } finally {
        setAppLoading(false);
      }
    }

    fetchAccount()
  }, [setAppLoading, setAuth])

  return (
    <div className="app-shell">
      {appLoading === true ?
        <div className="app-loading">
          <Spin />
          <span>Dang tai du lieu...</span>
        </div>
        :
        <>
          <Header />
          <main className="app-main">
            <Outlet />
          </main>
        </>
      }
    </div>
  )
}

export default App
