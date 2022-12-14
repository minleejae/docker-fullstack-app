import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

// test
function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get(`/api/values`).then((response) => {
      console.log("response", response);
      setLists(response.data);
    });
  }, []);

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post(`/api/value`, {
        value: value,
      })
      .then((response) => {
        console.log("to test", response);
        if (response.data.success) {
          console.log("response", response);
          setLists([...lists, response.data]);
          setValue("");
        } else {
          alert("값을 DB에 넣는데 실패했습니다.");
        }
      });
  };

  const clickDeleteButton = (list) => {
    console.log(list);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>TEST</h1>
        <h2>배포추가</h2>
        <div className="container">
          {lists &&
            lists.map((list, index) => (
              <li key={index}>
                {list.value}
                <button
                  onClick={(list) => {
                    clickDeleteButton(list);
                  }}
                >
                  삭제
                </button>
              </li>
            ))}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            ></input>
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
