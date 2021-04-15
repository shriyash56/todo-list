import React, { useState } from "react";

const Item = ({ todoItem, completedTodo, setTodos, todos }) => {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(todoItem.task);

  const handleEditChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const onDelete = () => {
    const index = todoItem.id;
    console.log(todoItem.id);
    removeFromLocalStorage(index);
    const arr = todos.filter((task) => todos[index] !== task);
    setTodos(arr);
  };

  function getFromLocalStorage() {
    let data;
    if (localStorage.getItem("data") === null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem("data"));
    }
    return data;
  }

  function removeFromLocalStorage(index) {
    let data = getFromLocalStorage();
    const arr = data.filter((task) => data[index] !== task);
    localStorage.setItem("data", JSON.stringify(arr));
  }

  const handleEditSubmit = (id) => {
    const editedList = todos.map((oneTodo) => {
      if (oneTodo.id === id) {
        console.log(id);
        oneTodo.task = todo;
      }
      return oneTodo;
    });
    localStorage.setItem("items", JSON.stringify(editedList));
    setTodos(editedList);
    handleEdit();
    console.log(todo, id);
  };
  return (
    <div className="todo" key={todoItem.id}>
      {!edit ? (
        <>
          <input
            className="editTask"
            type="checkbox"
            checked={todoItem.completed}
            onChange={() => completedTodo(todoItem.id)}
            disabled={todoItem.completed ? true : false}
          />{" "}
          <span className="list">{todoItem.task}</span>{" "}
          <button
            className="edit"
            onClick={handleEdit}
            disabled={todoItem.completed}
          >
            Edit
          </button>
          <button className="delete" onClick={onDelete}>
            Delte
          </button>
        </>
      ) : (
        <>
          {" "}
          <input
            type="text"
            value={todo}
            name="todo"
            onChange={handleEditChange}
          />
          <button onClick={handleEdit}>Cancel</button>
          <button
            className="saveTask"
            type="submit"
            onClick={() => handleEditSubmit(todoItem.id)}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default Item;
