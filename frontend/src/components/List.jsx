import { Fragment, useEffect, useState } from "react";
import "../style/list.css";
import { Link } from "react-router-dom";

export default function List() {

  const [tasklist, setTasklist] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch("http://localhost:3200/tasks",{
      credentials: "include"
    });
    list = await list.json();

    if (list.success) {
      setTasklist(list.data);

       }else {
    console.log("Try After Sometime");
    }
  };

  const deleteTask = async (id) => {

    let result = await fetch(`http://localhost:3200/delete-task/${id}`, {
      method: "DELETE"
    });

    result = await result.json();

    if(result.success){
      getListData();

       }else {
    console.log("Try After Sometime");
    }
  }

  const selectAll = (event) => {

    if (event.target.checked) {
      const ids = tasklist.map((item) => item._id);
      setSelectedTask(ids);
    } else {
      setSelectedTask([]);
    }
  }

  const selectTask = (event, id) => {

    if(event.target.checked){
      setSelectedTask([...selectedTask, id])
    } else {
      setSelectedTask(selectedTask.filter((taskId)=>taskId !== id))
    }
  }

  const deleteMultiple = async () => {

    let result = await fetch(`http://localhost:3200/delete-task-multiple`,{
      credentials: "include",
      method:"DELETE",
      body: JSON.stringify(selectedTask),
      headers:{
        "Content-Type":"application/json"
      }
    })

    result = await result.json()

    if(result.success){
      getListData()
      setSelectedTask([])
   }else {
    console.log("Try After Sometime");
  }
  }
  return (
   <div className="list-container">
  <h1>Task List</h1>

  <button
    onClick={deleteMultiple}
    className="delete-item delete-multiple"
  >
    Delete 
  </button>

  <ul className="task-list">

    <li className="list-header">
      <input onChange={selectAll} type="checkbox" />
    </li>

    <li className="list-header">S.No</li>
    <li className="list-header">Title</li>
    <li className="list-header">Description</li>
    <li className="list-header">Action</li>

    {tasklist && tasklist.map((item, index) => (
      <Fragment key={item._id}>
        <li className="list-item">
          <input
            type="checkbox"
            checked={selectedTask.includes(item._id)}
            onChange={(e) => selectTask(e, item._id)}
          />
        </li>

        <li className="list-item">{index + 1}</li>
        <li className="list-item">{item.title}</li>
        <li className="list-item">{item.description}</li>

        <li className="list-item">
          <button
            onClick={() => deleteTask(item._id)}
            className="delete-item"
          >
            Delete
          </button>

          <Link to={`/update/${item._id}`}>
            <button className="update-item">Update</button>
          </Link>
        </li>

      </Fragment>
    ))}

  </ul>
</div>
  );
}