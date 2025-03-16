import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";
import { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTasks = async () => {
    const response = await api.get("/tasks");
    setTodoList(response.data.data);
  };

  const handleChangeIsCompleteButton = async (id) => {
    const task = todoList.find((item) => item._id === id);
    try {
      const response = await api.put(`tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (response.status === 200) {
        console.log("Put Task Success");
        getTasks();
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleDeleteButton = async (id) => {
    try {
      const response = await api.delete(`tasks/${id}`);
      if (response.status === 200) {
        console.log("Delete Task Success");
        getTasks();
      } else {
        throw new Error("can not delete Task");
      }
    } catch (e) {}
  };

  const handleAddTaskButton = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        console.log("Add Task Success");
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("Task can not added");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={handleAddTaskButton}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        handleDeleteButton={handleDeleteButton}
        handleChangeIsCompleteButton={handleChangeIsCompleteButton}
      />
    </Container>
  );
}

export default App;
