import React, { useState, useEffect } from "react";
import axios from "./Axios";

const FetchData = () => {
  let [state, setState] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  let [asc, setAsc] = useState([]);
  let [des, setDes] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      let fetch = await axios.get("/posts");
      let { data } = fetch;
      setState(data);
    };
    fetchData();
  }, []);

  let sortAscending = e => {
    e.preventDefault();
    let asc = state.sort((a, b) => {
      return a.id - b.id;
    });
    setAsc(asc);
  };
  let sortDescending = e => {
    e.preventDefault();
    let des = state.sort((a, b) => {
      return b.id - a.id;
    });
    setDes(des);
  };
  let displayData = state
    .filter(val => {
      if (searchTerm === "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map(data => (
      <div key={data.id}>
        <h1>{data.id}</h1>
        <h1>Title:{data.title}</h1>
      </div>
    ));

  return (
    <section id="mainBlock">
      <article>
        <div className="display">
          <button onClick={sortAscending} className="ascBtn">
            Ascending
          </button>
          <div>
            <input
              type="text"
              name="search"
              className="inputField"
              placeholder="Search Here"
              onChange={e => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div>
           
            <button onClick={sortDescending} className="dscBtn">
              Descending
            </button>
          </div>
        </div>

        <div>{displayData}</div>
      </article>
    </section>
  );
};

export default FetchData;
