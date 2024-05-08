"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUsers } from "./api";
import Link from "next/link";
import Image from "next/image";

function AllUsers(props) {
  const { data: session, status } = useSession();
  const [usersLoading, setUsersLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await fetchUsers();
        if (usersData !== null) {
          setUsers(usersData);
          setUsersLoading(false);
        } else {
          console.error("Invalid users data:", usersData);
          setUsersLoading(false);
        }
      } catch (e) {
        console.error("Error fetching users:", e);
        setUsersLoading(false);
      }
    }
    fetchData();
  }, []);

  const indexOfLastUsers = currentPage * pageSize;
  const indexOfFirstUsers = indexOfLastUsers - pageSize;
  const currentUsers = users.slice(indexOfFirstUsers, indexOfLastUsers);
  const totalPages = Math.ceil(users.length / pageSize);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (usersLoading) {
    return (
      <div className="min-h-screen justify-between p-24 bg-base">
        <h1 className="text-2xl font-semibold">List of Users</h1>
        <p>Loading users...</p>
        <p className="loading loading-dots loading-lg">Loading...</p>
      </div>
    );
  } else {
    return (
      <main className="min-h-screen justify-between p-24 bg-base">
        <div>
          <h1 className="text-2xl font-semibold">List of Users</h1>
          <div className="mt-4 mb-2">
            <label htmlFor="pageSize">Tournaments per page:</label>
            <select id="pageSize" className="ml-2" value={pageSize} onChange={handlePageSizeChange}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {currentUsers &&
              currentUsers.map((user) => (
                <div
                  key={user._id}
                  className="card bg-base-100 shadow-lg m-4 p-4 px-16 max-w-96 mx-auto "
                >
                  <Image
                    src={user.profilePicture}
                    priority
                    height="150"
                    width="150"
                    alt="userPfp"
                  />
                  <Link
                    className="text-lg font-semibold link link-primary"
                    href={`/users/${user._id}`}
                  >
                    {user.firstName} {user.lastName}
                  </Link>
                  <p>{user.username}</p>
                  <p>{user.hometown ? user.hometown : ""}</p>
                </div>
              ))}
          </div>
          <div className="mt-4">
            <button
              className="btn btn-outline mr-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-center">
            <ul className="pagination flex flex-wrap">
              {Array.from({ length: Math.ceil(users.length / pageSize) }, (_, index) => {
                let pageNumber = index + 1;
                let startPage;
                if (currentPage <= 5) {
                  startPage = 1;
                } else {
                  startPage = Math.max(1, currentPage - 4);
                  if (currentPage + 5 > Math.ceil(users.length / pageSize)) {
                    startPage = Math.max(1, Math.ceil(users.length / pageSize) - 8);
                  }
                }
                let endPage = Math.min(startPage + 8, Math.ceil(users.length / pageSize));

                if (pageNumber < startPage || pageNumber > endPage) {
                  return null;
                }
                return (
                  <li key={index} className="page-item m-2">
                    <a
                      onClick={() => paginate(index + 1)}
                      className={`page-link ${
                        currentPage === pageNumber ? "text-primary" : ""
                      } cursor-pointer`}
                    >
                      {index + 1}
                    </a>
                  </li>
                );
              })}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const pageNumber = parseInt(e.target.pageNumber.value);
                if (!isNaN(pageNumber)) {
                  paginate(Math.min(Math.max(1, pageNumber), Math.ceil(users.length / pageSize)));
                }
              }}
            >
              <div className="mx-4">
                <span className="">Go to page: </span>
                <input
                  type="number"
                  id="pageNumber"
                  name="pageNumber"
                  min="1"
                  max={Math.ceil(users.length / pageSize)}
                />
                <button className="btn btn-outline m-2" type="submit">
                  Go
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default AllUsers;
