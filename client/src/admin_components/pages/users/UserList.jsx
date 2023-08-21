import React, { useEffect, useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../../../services/services";
import AuthAdmin from "../../auth/AuthAdmin";
import Pagination from "../../../global/Pagination";
import { NavLink, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "../../../global/Modal";

const UserList = () => {
  const [getQuery] = useSearchParams();
  const [ar, setAr] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    doApi();
  }, [getQuery]);

  const doApi = async () => {
    let perPage = getQuery.get("perPage") || 5;
    let page = getQuery.get("page") || 1;

    // let url = API_URL+"/users/allUsers";
    let url = `${API_URL}/users/allUsers?page=${page}&perPage=${perPage}`;
    try {
      let data = await doApiGet(url);
      console.log(data);
      setAr(data);
    } catch (err) {
      console.log(err);
      alert("There problem , come back late");
    }
  };

  const onChangeRole = async (_id, _role) => {
    let newRole = _role == "admin" ? "user" : "admin";
    let url = `${API_URL}/users/role?user_id=${_id}&role=${newRole}`;

    try {
      let data = await doApiMethod(url, "PATCH");
      console.log(data);
      if (data.modifiedCount == 1) {
        doApi();
      }
    } catch (err) {
      console.log(err);
      alert("You cant change yourself or the admin");
    }
  };

  const onDelete = async (_delId) => {
    // if (!window.confirm("Delete app?")) {
    //   return;
    // }

    let url = API_URL + "/users/" + _delId;
    try {
      let data = await doApiMethod(url, "DELETE");
      if (data.deletedCount) {
        toast.info("User Deleted");
        doApi();
      }
    } catch (err) {
      console.log(err);
      alert("There problem , come back late");
    }
  };

  return (
    <div className="overflow-hidden w-screen rounded-lg border border-gray-200 shadow-md m-5">
      <div className="bg-gray-800 flex p-4">
        <div>
          <NavLink
            className="bg-blue-400 rounded-md py-2 px-2 font-medium"
            to="/admin/users/add"
          >
            {" "}
            Add User{" "}
          </NavLink>
        </div>

        <div className="ml-96">
          <Pagination
            apiPages={API_URL + "/users/count?perPage=5"}
            linkTo={"/admin/users?page="}
            linkCss={"font-medium mx-1 bg-blue-400 p-2 rounded-md"}
          />
        </div>
      </div>

      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              email
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Role
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              del
            </th>
          </tr>
        </thead>
        <AuthAdmin />
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {ar.map((item, i) => {
            return (
              <tr className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  {/* name-img */}
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                  </div>

                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{item.name}</div>
                  </div>
                </th>

                {/* email */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    {item.email}
                  </span>
                </td>

                {/* role */}
                <td className="px-6 py-4">
                  <button
                    className="text-black font-medium rounded-full p-1 w-[70px] bg-green-500"
                    onClick={() => {
                      onChangeRole(item._id, item.role);
                    }}
                  >
                    {item.role}
                  </button>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-start gap-4">
                    <button
                      onClick={() => {
                        setModalOpen(true);
                      }}
                      x-data="{ tooltip: 'Delete' }"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col items-center justify-center">
                      {modalOpen && (
                        <Modal
                          title={<div className="text-3xl">Delete</div>}
                          onClose={() => setModalOpen(false)}
                          footer={
                            <div>
                              <button
                                className="bg-green-600 rounded-full py-2 px-3  font-bold"
                                onClick={() => {
                                  onDelete(item._id)
                                  setModalOpen(false)
                                }}
                              >
                                Delete
                              </button>

                              <button
                                className="bg-red-700 rounded-full py-2 px-3 mt-2 mb-2 ml-2 font-bold"
                                onClick={() => setModalOpen(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          }
                        >
                          Are you sure ?
                        </Modal>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
