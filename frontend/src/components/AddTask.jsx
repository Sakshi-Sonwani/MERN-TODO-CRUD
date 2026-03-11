import { useState } from "react";
import "../style/addtask.css";
import { useNavigate } from "react-router-dom";

export default function AddTask() {

    const [taskdata, setTaskdata] = useState({});
    const navigate = useNavigate();
    const handleAddTask = async (e) => {
        e.preventDefault();

        console.log(taskdata);

        let result = await fetch("http://localhost:3200/add-task", {
            method: "POST",
            body: JSON.stringify(taskdata),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        result = await result.json();

        if(result.success){
            navigate("/");
            console.log("Task added successfully");
        } else {
            console.log("Try After Sometime");
        }
    }

    return (
        <div className="container">
            <h1>Add New Task</h1>

            <form onSubmit={handleAddTask}>
                <label>Title:</label>

                <input
                    type="text"
                    placeholder="Enter task title"
                    onChange={(event) =>
                        setTaskdata({ ...taskdata, title: event.target.value })
                    }
                />

                <label>Description:</label>

                <textarea
                    rows="4"
                    placeholder="Enter task description"
                    onChange={(event) =>
                        setTaskdata({ ...taskdata, description: event.target.value })
                    }
                ></textarea>

                <button onClick={handleAddTask} type="submit" className="submit">
                    Add New Task
                </button>
            </form>
        </div>
    );
}