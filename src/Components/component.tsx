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
  togglePlay: boolean,
  toggleEdit: boolean,
}

function ListRender(): JSX.Element {
  const [lists, setLists] = useState<Array<listProps>>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editingTask, setEditingTask] = useState<string>("")

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
            togglePlay: true,
            toggleEdit: false
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
    setLists(prevLists => prevLists.filter((_, i) => i !== index));
  };

  const showSetTime = (index: number) => {
    setLists(preTask => preTask.map((task, i) => i === index ? {...task , toggleShowSetTime: !task.toggleShowSetTime} : task))
  };

  const showSetEdit = (index: number) => {
    setLists(preList => preList.map((task,i) => i===index ? {...task, toggleEdit: !task.toggleEdit } : task))
  }

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

  const updateSeconds = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setLists((preList) =>
      preList.map((task, i) => {
        if (i === index) {
          return { ...task, time: { minutes: task.time.minutes, seconds: parseInt(e.target.value) } };
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
      preList.map((list, i) => i === index ? { ...list, togglePlay: !list.togglePlay } : list)
    )
  }

  const changeToggleEditTask = (index: number) => {
    setLists(preList => 
      preList.map((task, i) => i === index ? {...task, toggleEdit: !task.toggleEdit} : task)
    )
  }

  const editTask = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTask(e.target.value);
  }

  const buttonEditTask = (index: number) => {
    setLists(preList => preList.map((task, i) => i === index ? { ...task, list : editingTask, toggleEdit: !task.toggleEdit } : task))
  }

  const resetTime = (index: number) => {
    setLists(preTask => preTask.map((task, i) => i === index ? {...task, time: {minutes: 0, seconds: 0}} : task));

  } 

  

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
                <span className="span-2">{value.time.minutes < 10 ? `0${value.time.minutes}` : `${value.time.minutes}`}:{value.time.seconds < 10 ? `0${value.time.seconds}` : `${value.time.seconds}`}</span>
                {value.togglePlay
                  ?
                  <button title="Pause" onClick={() => toggleControlPlay(index)} className="button-Pause"><RiPauseMiniLine /></button>
                  :
                  <button title="Play" onClick={() => toggleControlPlay(index)} className="button-Play"><IoIosPlay /></button>}
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
                onClick={() => changeToggleEditTask(index)}
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

              <div className="inputTime "style={value.toggleShowSetTime ? { display: "flex" } : {}}>
                <h1>Nhập thời gian</h1>
                <div>
                  <input type="number" placeholder="minutes" onChange={(e) => updateMinutes(e, index)} className="input-ms"  value={value.time.minutes}/>
                  <span style={{ color: "white" }}>:</span>
                  <input type="number" placeholder="seconds" maxLength={2} onChange={(e) => updateSeconds(e, index)} className="input-ms" value= {value.time.seconds}/>
                </div>
                <button onClick={() => setTime(index)} className="setTime-ms" style={{ backgroundColor: "#cf1616", color: "white" }}>Bắt đầu</button>
                <button className="setTime-ms button-reset" style={{ backgroundColor: "#7db921" }} onClick={() => resetTime(index)}>Reset Time</button>
              </div>
              <div className="overlay" style={value.toggleShowSetTime ? {} : { display: "none" }} onClick={() => showSetTime(index)}></div>

              <div className="editTask" style={value.toggleEdit ? {} : {display: "none"}}>
                <h1>Sửa công việc</h1>
                <input type="text" style={{width: "90%", height:"50%", backgroundColor:"#171a17",padding:"10px" ,color: "white", outline:"none", borderRadius: "10px",border:"1px"}} onChange={(e) => editTask(index,e)}/>
                <button style={{backgroundColor:"green", borderRadius:"10px", fontSize:"15px", color: "#fff"}} onClick={() => buttonEditTask(index)}>OK</button>
              </div>
              <div className="overlay-2" style={(value.toggleEdit) ? {} : { display: "none" }} onClick={(e) => showSetEdit(index)}></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListRender;
