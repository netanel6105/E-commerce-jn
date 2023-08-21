import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../../services/services";
import { Modal } from "../../global/Modal";
import AuthAdmin from "../auth/AuthAdmin";
import GraphProduct from "./GraphProduct";

const Dashboard = () => {
  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const onExit = () => {
    localStorage.removeItem(TOKEN_KEY);
    nav("/admin/login");
  };

  return (
    <div className="overflow-hidden w-screen rounded-lg border border-gray-200 shadow-md m-5">
      <AuthAdmin/>
      <div className="bg-gray-800 flex p-4">

        <div className="">
          <button
            className="bg-red-600 rounded-full py-2 px-4"
            onClick={() => setModalOpen(true)}
          >
            Logout
          </button>

          <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col items-center justify-center">
            {modalOpen && (

              <Modal
                title={<div className="text-3xl">Logout</div>}
                onClose={() => setModalOpen(false)}
                footer={
                  <div className="flex gap-2 justify-end py-2">
                    <button
                      className="bg-green-600 rounded-full py-1 px-3 font-bold"
                      onClick={() => {
                        onExit();
                      }}
                    >
                      OK
                    </button>

                    <button
                      className="bg-red-700 rounded-full py-1 px-2 font-bold"
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
      </div>


        <div className="p-5">
          <GraphProduct/>
        </div>


    </div>

  );
};

export default Dashboard;
