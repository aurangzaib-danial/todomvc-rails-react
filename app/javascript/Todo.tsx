import { flushSync } from "react-dom";
import { useDispatchContext } from "./contexts";
import { Todo as TodoType } from "./todos_helper";
import { useRef, useState } from "react";

type Status = "readOnly" | "editing";
type InputRef = HTMLInputElement | null;

function getCurrent(ref: React.MutableRefObject<InputRef>) {
  if (!ref.current) throw Error("Ref is not assigned");
  return ref.current;
}

const Todo = ({ id, content, isCompleted } : TodoType) => {
  const dispatch = useDispatchContext();
  const [status, setStatus] = useState<Status>("readOnly");
  const inputRef = useRef<InputRef>(null);

  function handleCheck() {
    dispatch({
      type: "updateStatus",
      id
    });
  }

  function handleDestroy() {
    dispatch({
      type: "destroy",
      id
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
