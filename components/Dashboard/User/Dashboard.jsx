"use client";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { userContext } from "../../userContext";
import DashboardComp from "./DashboardComp";
import LinksComp from "./Links";
import Settings from "./Settings";
import Analytics from "./Analytics";
import axios from "axios";
import Bubble from "@/components/ui/Bubble";

const Dashboard = () => {
  const { activeComponent, setUser, user } = useContext(userContext);

  const [bubbleMessage, setBubbleMessage] = useState(null);
  const [bubbleType, setBubbleType] = useState(null);

  const logout = async () => {
    try {
      const response = await axios.get("/api/user/logout");
      if (response.status === 200) {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/api/user/me");
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const recentLinks = user?.links.slice(0, 5);

  const deleteLink = async (id) => {
    try {
      const response = await axios.delete(`/api/link/delete/${id}`);
      if (response.status === 200) {
        setBubbleMessage(response.data.message);
        setBubbleType("success");
        setTimeout(() => {
          setBubbleMessage(null);
          getUser();
        }, 2000);
      }
    } catch (error) {
      setBubbleMessage(error.response?.data?.message || "Something went wrong");
      setBubbleType("error");
      setTimeout(() => setBubbleMessage(null), 2000);
    }
  };

  const createLink = async (originalUrl) => {
    try {
      const response = await axios.post("/api/link/new", { originalUrl });
      if (response.status === 200) {
        setBubbleMessage(response.data.message);
        setBubbleType("success");
        setTimeout(() => {
          setBubbleMessage(null);
          getUser();
        }, 2000);
      }
    } catch (error) {
      setBubbleMessage(error.response?.data?.message || "Something went wrong");
      setBubbleType("error");
      setTimeout(() => setBubbleMessage(null), 2000);
    }
  };

  const handleUpdate = async (name, email, username, password) => {
    try {
      const response = await axios.put("/api/user/update", {
        name,
        email,
        username,
        password,
      });
      if (response.status === 200) {
        setBubbleMessage(response.data.message);
        setBubbleType("success");
        setTimeout(() => {
          setBubbleMessage(null);
          getUser();
        }, 2000);
      }
    } catch (error) {
      setBubbleMessage(error.response?.data?.message || "Something went wrong");
      setBubbleType("error");
      setTimeout(() => setBubbleMessage(null), 2000);
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete("/api/user/delete");
      if (response.status === 200) {
        setUser(null);
        logout();
        setBubbleMessage(response.data.message);
        setBubbleType("success");
        setTimeout(() => {
          setBubbleMessage(null);
        }, 2000);
      }
    } catch (error) {
      setBubbleMessage(error.response?.data?.message || "Something went wrong");
      setBubbleType("error");
      setTimeout(() => setBubbleMessage(null), 2000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row font-[family-name:var(--font-urbanist)]">
      <Sidebar logout={logout} />
      <main className="flex-1 p-4">
        {activeComponent === "dashboard" && (
          <DashboardComp
            name={user?.name}
            totalLinks={user?.totalLinks}
            totalClicks={user?.totalClicks}
            totalUsers={user?.totalUsers}
            recentLinks={recentLinks}
            deleteLink={deleteLink}
            createLink={createLink}
          />
        )}
        {activeComponent === "links" && (
          <LinksComp
            createLink={createLink}
            deleteLink={deleteLink}
            userLinks={user?.links}
          />
        )}
        {/* {activeComponent === "analytics" && <Analytics />} */}
        {activeComponent === "settings" && (
          <Settings
            name={user?.name}
            email={user?.email}
            username={user?.username}
            password={user?.password || ""}
            handleUpdate={handleUpdate}
            deleteAccount={deleteAccount}
          />
        )}

        {bubbleMessage && <Bubble type={bubbleType} message={bubbleMessage} />}
      </main>
    </div>
  );
};

export default Dashboard;
