import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../../../services/services";
import Loading from "../../../global/Loading";
import Pagination from "../../../global/Pagination";
import { toast } from "react-toastify";
import { Modal } from "../../../global/Modal";
import AuthAdmin from "../../auth/AuthAdmin";

const ProductList = () => {
  const [getQuery] = useSearchParams();
  const [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    doApi();
  }, [getQuery]);

  const doApi = async () => {
    let perPage = getQuery.get("perPage") || 5;
    let page = getQuery.get("page") || 1;

    
    let url = `${API_URL}/products?page=${page}&perPage=${perPage}`;
    try {
      let data = await doApiGet(url);
      console.log(data);
      setAr(data);
    } catch (err) {
      console.log(err);
      alert("There problem , come back late");
    }
  };

  const onDelete = async (_delId) => {
    // if (!window.confirm("Delete app?")) {
    //   return;
    // }

    let url = API_URL + "/products/" + _delId;
    try {
      let data = await doApiMethod(url, "DELETE");
      if (data.deletedCount) {
        toast.info("Product Deleted");
        doApi();
      }
    } catch (err) {
      console.log(err);
      alert("There problem , come back late");
    }
  };

  return (
    <div className="overflow-hidden w-full rounded-lg border border-gray-200 shadow-md m-5">
      <div className="bg-gray-800 flex p-4">
        <div>
          <NavLink
            className="bg-blue-400 rounded-md py-2 px-2 font-medium"
            to="/admin/product/new"
          >
            {" "}
            Add New Product{" "}
          </NavLink>
        </div>

        <div className="ml-96">
          <Pagination
            apiPages={API_URL + "/products/count?perPage=5"}
            linkTo={"/admin/product?page="}
            linkCss={"font-medium mx-1 bg-blue-400 p-2 rounded-md"}
          />
        </div>
      </div>

      {loading && <Loading />}
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Img_url
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Price
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Description
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Gender
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Category_name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Del/Edit
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
                      className="h-full w-full  object-cover object-center"
                      src={item.img_url}
                      alt={item.name}
                    />
                  </div>
                </th>

                {/* name */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    {item.name}
                  </span>
                </td>

                {/* price */}
                <td className="px-6 py-4">{item.price}</td>
                {/* description */}
                <td
                  className="px-6 py-4 cursor-pointer"
                  title={item.description}
                >
                  {item.description.substring(0, 15)}
                </td>
                {/*gender  */}
                <td className="px-6 py-4">{item.gender}</td>
                {/* category */}
                <td className="px-6 py-4">{item.category}</td>

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
                                  onDelete(item._id);
                                  setModalOpen(false);
                                  
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

                    <button
                      onClick={() => {
                        nav("/admin/product/edit/" + item._id);
                      }}
                      x-data="{ tooltip: 'Edite' }"
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
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



export default ProductList;
