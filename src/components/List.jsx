import React from "react";

function List(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="list">
      <h1>{props.name}</h1>
      <p>{props.size}</p>
      <p>{props.number}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default List;
