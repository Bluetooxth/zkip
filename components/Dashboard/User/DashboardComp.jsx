"use client";
import React, { useState } from "react";
import { SendHorizontal, Copy, Trash2 } from "lucide-react";

const DashboardComp = ({
  name,
  totalLinks,
  totalClicks,
  totalUsers,
  recentLinks,
  deleteLink,
}) => {
  return (
    <section className="flex justify-start items-start w-full min-h-screen">
      <div className="flex flex-col justify-start items-start w-full h-full">
        <h2 className="text-3xl font-medium text-zinc-100">Dashboard</h2>
        <div className="flex flex-col justify-start items-start w-full mt-4 p-4 rounded-lg hover:opacity-90 bg-gradient-to-br from-green-600 to-green-700">
          <h3 className="text-2xl font-medium text-zinc-100">{`Welcome! ${name}`}</h3>
          <p className="text-lg text-zinc-200 mt-2">
            {`Here's a quick overview of your account.`}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
          <div className="flex justify-center items-center flex-col bg-zinc-800 p-4 rounded-lg w-full">
            <h3 className="text-xl font-medium text-zinc-100">Total Links</h3>
            <p className="text-3xl font-medium text-zinc-300 mt-2">
              {totalLinks}
            </p>
          </div>
          <div className="flex justify-center items-center flex-col bg-zinc-800 p-4 rounded-lg w-full">
            <h3 className="text-xl font-medium text-zinc-100">Total Clicks</h3>
            <p className="text-3xl font-medium text-zinc-300 mt-2">
              {totalClicks}
            </p>
          </div>
          <div className="flex justify-center items-center flex-col bg-zinc-800 p-4 rounded-lg w-full">
            <h3 className="text-xl font-medium text-zinc-100">Total Users</h3>
            <p className="text-3xl font-medium text-zinc-300 mt-2">
              {totalUsers}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full lg:max-w-2xl mt-8 p-4 rounded-lg bg-zinc-800">
          <h3 className="text-2xl font-medium text-zinc-100">
            Create a new link
          </h3>
          <form className="flex justify-between items-center w-full mt-4 gap-2">
            <input
              type="url"
              placeholder="Paste your link here ....."
              className="w-full rounded-md px-3 py-2 text-zinc-300 outline-none border border-zinc-600 focus:border-green-500 bg-zinc-900"
            />
            <button className="px-4 py-2 hover:opacity-90 bg-gradient-to-br from-green-500 to-green-700 text-zinc-100 rounded-md transition duration-300 ease-in-out cursor-pointer border border-green-500 flex items-center justify-center gap-1">
              Shorten <SendHorizontal size={16} className="inline-block" />
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-start items-start w-full mt-8">
          <h2 className="text-3xl font-medium text-zinc-100">Recent Links</h2>
          {recentLinks.length === 0 ? (
            <div className="w-full mt-4 overflow-x-auto rounded-lg">
              <table className="w-full text-left">
                <thead className="bg-zinc-800">
                  <tr>
                    <th className="p-4 text-zinc-100 font-medium text-lg">
                      Original URL
                    </th>
                    <th className="p-4 text-zinc-100 font-medium text-lg">
                      Short URL
                    </th>
                    <th className="p-4 text-zinc-100 font-medium text-lg">
                      Clicks
                    </th>
                    <th className="p-4 text-zinc-100 font-medium text-lg">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentLinks.map((link, index) => (
                    <tr key={index} className=" border-b border-zinc-700">
                      <td className="p-4 text-zinc-300">{link.originalUrl}</td>
                      <td className="p-4 text-zinc-300">{link.shortUrl}</td>
                      <td className="p-4 text-zinc-300">{link.clicks}</td>
                      <td className="p-4 flex justify-start items-center gap-2 md:gap-5">
                        <button className="text-blue-500">
                          <Copy
                            size={20}
                            className="inline-block cursor-pointer"
                          />
                        </button>
                        <button
                          onClick={() => deleteLink(link._id)}
                          className="text-red-500 ml-2"
                        >
                          <Trash2
                            size={20}
                            className="inline-block cursor-pointer"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-lg text-zinc-300 mt-4">No links to display.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardComp;
