import { flushSync } from "react-dom";
import { useDispatchContext } from "./contexts";
import React, { useRef, useState } from "react";
import { destroy, patch } from "@rails/request.js";

function getCurrent(ref) {
  if (!ref.current) throw Error("Ref is not assigned");
  return ref.current;
}

const Todo = ({ id, content, isCompleted }) => {
  const dispatch = useDispatchContext();
  const [status, setStatus] = useState("readOnly");
  const inputRef = useRef(null);

  function handleCheck() {
    dispatch({
      type: "updateStatus",
      id
    });

    patch(`/todos/${id}`, { body: JSON.stringify({ is_completed: !isCompleted }) });
  }

  function handleDestroy() {
    dispatch({
      type: "destroy",
      id
    });

    destroy(`/todos/${id}`)
  }

  function handleChange(e) {
    dispatch({
      type: "updateContent",
      content: e.target.value,
      id
    });
  }

  return (
    <li
      className={(isCompleted ? "completed" : "") + (status === "editing" ? " editing" : "")}
      onDoubleClick={() => {
        flushSync(() => {
          setStatus("editing");
        });
        
        getCurrent(inputRef).focus();
      }}
      onBlur={() => {
        if (status === "editing") {
          setStatus("readOnly");
          if (content === "") {
            handleDestroy();
          } else {
            patch(`/todos/${id}`, { body: JSON.stringify({ content }) });
          }
        }
      }}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheck} />
        <label>{ content }</label>
        <button className="destroy" onClick={handleDestroy}></button>
      </div>
      {status === "editing" && <input className="edit" ref={inputRef} value={content} onChange={handleChange} />}
    </li>
  );
}

export default Todo;
