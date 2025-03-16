import React from "react";
import { Col, Row } from "react-bootstrap";
import "./TodoItem.style.css";

const TodoItem = ({
  item,
  handleDeleteButton,
  handleChangeIsCompleteButton,
}) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? " complete" : ""}`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button
              className="button-delete"
              onClick={() => handleDeleteButton(item._id)}
            >
              삭제
            </button>
            <button
              className="button-delete"
              onClick={() => handleChangeIsCompleteButton(item._id)}
            >
              {item.isComplete ? "안끝남" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
