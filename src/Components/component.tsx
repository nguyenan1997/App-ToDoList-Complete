import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxLapTimer } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";

interface listProps {
  list: string;
  checkTask: boolean;
  time: { minutes: number; seconds: number };
}

function ListRender(): JSX.Element {
  const [lists, setLists] = useState<Array<listProps>>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [countDownTime, setCountDownTime] = useState<{minutes: number; seconds: number}>({ minutes: 0, seconds: 0 });
  const [showTime, setShowTime] = useState<boolean>(false);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addListTask = (e: any) => {
    if (e.key === "Enter") {
      if (inputValue.trim()) {
        setLists([
          ...lists,
          {
            list: inputValue,
            checkTask: false,
            time: { minutes: 0, seconds: 0 }
          },
        ]);
        setInputValue("");
      }
    }
  };

  const toggleCheckTask = (index: number) => {
    setLists((preList) =>
      preList.map((task, i) =>
        i === index ? { ...task, checkTask: !task.checkTask } : task
      )
    );
  };

  const deleteTask = (index: number) => {
    const updateTask = lists.slice();
    updateTask.splice(index, 1);
    setLists(updateTask);
  };

  const showSetTime = () => {
    setShowTime((pre) => !pre);
  };

  const updateMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountDownTime({...countDownTime, minutes: parseInt(e.target.value) || 0})
  }

  const updateSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountDownTime({...countDownTime, seconds:  parseInt(e.target.value) || 0})
  }

  const setTime = (index: number) => {

    setShowTime(pre => !pre)
  };

  useEffect(() => {
    
  },[])

  const editTask = () => {};

  return (
    <div className="container">
      <div className="header">
        <h1>To Do List</h1>
        <input
          type="text"
          placeholder="Nhập công việc tại đây"
          onChange={changeInput}
          value={inputValue}
          onKeyDown={addListTask}
          className="inputTask"
        />
      </div>
      <ul className="listTask">
        {lists?.map((value, index) => {
          return (
            <li key={index}>
              <div
                className="propsTask"
                style={
                  value.checkTask
                    ? {
                        backgroundColor: "rgb(31,80,123)",
                        textDecoration: "line-through",
                      }
                    : {}
                }
              >
                <input
                  type="checkbox"
                  checked={value.checkTask}
                  onChange={() => toggleCheckTask(index)}
                />
                <span className="span-1">{value.list}</span>
                <span className="span-2">{`${value.time.minutes}:${value.time.seconds}`}</span>
              </div>
              <button
                onClick={() => deleteTask(index)}
                style={{
                  color: "red",
                  backgroundColor: "pink",
                  borderRadius: "5px",
                }}
                className="buttonDelete"
                title="Delete"
              >
                <RiDeleteBin6Line />
              </button>
              <button
                onClick={showSetTime}
                style={{
                  color: "green",
                  backgroundColor: "#914c4c",
                  borderRadius: "5px",
                }}
                className="buttonTime"
                title="SetTime"
              >
                <RxLapTimer />
              </button>
              <button
                onClick={editTask}
                style={{
                  color: "#34b575",
                  backgroundColor: "#364345",
                  borderRadius: "5px",
                }}
                className="buttonEdit"
                title="Edit"
              >
                <FaEdit />
              </button>

              <div
                className="inputTime"
                style={showTime ? { display: "flex" } : {}}
              >
                <h1>Nhập thời gian</h1>
                <div>
                  <input type="number" placeholder="minutes" onChange={updateMinutes} className="input-ms"/>
                  <span style={{color:"white"}}>:</span>
                  <input type="number" placeholder="seconds" maxLength={2} onChange={updateSeconds} className="input-ms"/>
                </div>
                <button onClick={() => setTime(index)} className="setTime-ms" style={{backgroundColor: "#cf1616",color:"white"}}>Đặt</button>
                <button className="setTime-ms button-reset" style={{backgroundColor:"#7db921"}}>Reset Time</button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="overlay" style={showTime ? {} : {display: "none"}} onClick={() => setShowTime(pre => !pre)}></div>
    </div>
  );
}

export default ListRender;
