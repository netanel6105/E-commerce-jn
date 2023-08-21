import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthAdmin from "../../auth/AuthAdmin";

const ToDolist = () => {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmit1 = (e) => {
    e.preventDefault();
    console.log(handleSubmit1);
  };

  const handleAdd = () => {
    setTodos([...todos, { id:Date.now(), text: inputVal, completed: false }]);
  };

  return (
    <div className="w-screen flex  justify-center">
       <AuthAdmin />
      <form onSubmit={handleSubmit1} id="id_form" className="p-5 flex">
        <div className="bg-white rounded shadow  p-6 m-4 w-[900px]">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>

            <div className="flex mt-4">
              <input
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
              />
              <button
                onClick={handleAdd}
                className="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            {todos.map((item) => {
              <div key={item.id} className="flex mb-4 items-center">
                <p className="w-full text-grey-darkest">
                  {item.text}
                </p>
                <button
                  type="button"
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-400"
                >
                  Done
                </button>
                <button
                  type="button"
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-500"
                >
                  Remove
                </button>
              </div>;
            })}

            {/* <div className="flex mb-4 items-center">
              <p className="w-full line-through text-green">
                Submit Todo App Component to Tailwind Components
              </p>
              <button
                type="button"
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-gray-500 hover:bg-gray-500"
              >
                Not Done
              </button>
              <button
                type="button"
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-500"
              >
                Remove
              </button>
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ToDolist;
