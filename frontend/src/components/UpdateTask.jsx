import { useEffect, useState } from "react";
import "../style/addtask.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateTask() {

  const [taskdata, setTaskdata] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // fetch task data when page loads
  useEffect(() => {
    const fetchTaskData = async () => {

      let result = await fetch(`http://localhost:3200/task/${id}`);
      result = await result.json();

      if (result.success) {
        setTaskdata(result.data);
      }
    };

    fetchTaskData();
  }, [id]);



  // update task
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    console.log("Updating task with data:", id, taskdata);  

    let result = await fetch(`http://localhost:3200/update-task/${id}`, {
      method: "PUT",
      body: JSON.stringify(taskdata),
      headers: {
        "Content-Type": "application/json"
      }
    });

    result = await result.json();

    if (result.success) {
      console.log("Task updated successfully");
      navigate("/");
    }
  };

  const updateTask = () => {
   console.log("Update task function called",taskdata);
  }



  return (
    <div className="container">

      <h1>Update Task</h1>

      <form onSubmit={handleUpdateTask}>

  <label>Title:</label>

  <input
    type="text"
    value={taskdata.title || ""}
    placeholder="Enter task title"
    onChange={(event) =>
      setTaskdata({ ...taskdata, title: event.target.value })
    }
  />

  <label>Description:</label>

  <textarea
    rows="4"
    value={taskdata.description || ""}
    placeholder="Enter task description"
    onChange={(event) =>
      setTaskdata({ ...taskdata, description: event.target.value })
    }
  ></textarea>

  <button type="submit" className="submit">
    Update Task
  </button>

</form>

    </div>
  );
}