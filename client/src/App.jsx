import "./App.css";

//components
import InputTodo from "./components/inputTodo";
import ListTodos from "./components/listTodos";

function App() {
  return (
    <>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </>
  );
}

export default App;
