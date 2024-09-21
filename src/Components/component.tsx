import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxLapTimer } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { RiPauseMiniLine } from "react-icons/ri";
import { IoIosPlay } from "react-icons/io";

interface listProps {
  list: string;
  checkTask: boolean;
  time: { minutes: number; seconds: number };
  toggleShowSetTime: boolean,
  togglePlay: boolean
}

function ListRender(): JSX.Element {
  const [lists, setLists] = useState<Array<listProps>>([]);
  const [inputValue, setInputValue] = useState<string>("");

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
            time: { minutes: 0, seconds: 0 },
            toggleShowSetTime: false,
            togglePlay: true
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

  const showSetTime = (index:number) => {
    const updateList = lists.slice();
    updateList[index].toggleShowSetTime = ! updateList[index].toggleShowSetTime;
    setLists(updateList);
  };

  const updateMinutes = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setLists((preList) =>
      preList.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            time: { minutes: parseInt(e.target.value), seconds: task.time.seconds },
          };
        }
        return task;
      })
    );
  };

  const updateSeconds = (e: React.ChangeEvent<HTMLInputElement>,index:number) => {
    setLists((preList) =>
      preList.map((task, i) => {
        if (i === index) {
          return {...task, time: { minutes: task.time.minutes, seconds: parseInt(e.target.value) } };
        }
        return task;
      })
    );
  }

  const setTime = (index: number) => {
    const intervalID = setInterval(() => {
        setLists((prelists) => {
          return prelists.map((task, i) => {
            if (i === index && task.togglePlay) {
              let { minutes, seconds } = task.time;
              if (seconds > 0) {
                seconds--;
              } else if (minutes > 0) {
                minutes--;
                seconds = 59;
              } else {
                clearInterval(intervalID);
              }
              return { ...task, time: { minutes, seconds } };
            }
            return task;
          });
        });   
    }, 1000);
    showSetTime(index)
  };

  const toggleControlPlay = (index: number) => {
    setLists(preList => 
      preList.map((list, i ) => i === index ? {...list , togglePlay: !list.togglePlay} : list)
    )
  }
 

  const editTask = () => {

  };

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
                <span className="span-2">{value.time.minutes < 10 ? `0${value.time.minutes}`: `${value.time.minutes}`}:{value.time.seconds < 10 ? `0${value.time.seconds}`: `${value.time.seconds}`}</span>
                {value.togglePlay 
                ?  
                <button title="Pause" onClick={() => toggleControlPlay(index)} className="button-Pause"><RiPauseMiniLine/></button> 
                : 
                <button title="Play" onClick={() => toggleControlPlay(index)} className="button-Play"><IoIosPlay/></button>}
              </div>
              <button
                onClick={() => deleteTask(index)}
                style={{
                  color: "red",
                  backgroundColor: "pink",
                  borderRadius: "5px",
                }}
                className="buttonDelete"
                title="Xóa"
              >
                <RiDeleteBin6Line />
              </button>
              <button
                onClick={() => showSetTime(index)}
                style={{
                  color: "green",
                  backgroundColor: "#914c4c",
                  borderRadius: "5px",
                }}
                className="buttonTime"
                title="Hẹn giờ"
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
                title="Sửa"
              >
                <FaEdit />
              </button>

              <div
                className="inputTime "
                style={value.toggleShowSetTime ? { display: "flex" } : {}}
              >
                <h1>Nhập thời gian</h1>
                <div>
                  <input type="number" placeholder="minutes" onChange={(e) => updateMinutes(e,index)} className="input-ms" />
                  <span style={{color:"white"}}>:</span>
                  <input type="number" placeholder="seconds" maxLength={2} onChange={(e) => updateSeconds(e,index)} className="input-ms"/>
                </div>
                <button onClick={() => setTime(index)} className="setTime-ms" style={{backgroundColor: "#cf1616",color:"white"}}>Bắt đầu</button>
                <button className="setTime-ms button-reset" style={{backgroundColor:"#7db921"}}>Reset Time</button>
              </div>
              <div className="overlay" style={value.toggleShowSetTime ? {} : {display: "none"}} onClick={() => showSetTime(index)}></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListRender;
