import { Container, Center, Heading, useBoolean } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";

const App = () => {
  const [getTextTodo, setTextTodo] = useState("");
  const [getIdLast, insertIdLast] = useState("");
  const [getTodos, setTodo] = useState([]);
  const [getStatus, setStatus] = useState("all");
  const [getFilterTodos, setFilterTodos] = useState([]);
  const [getAnimateInsert, setAnimateInsert] = useBoolean();
  const [getLengthTask, setLengthTask] = useState(0);

  // useEffect
  useEffect(() => {
    getLocal();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocal();
    saveNotFinishTodo();
  }, [getTodos.sort((a, b) => b.date - a.date), getStatus]);

  const setFilterTodosFunction = (completed) => {
    setFilterTodos(getTodos.filter((item) => item.completed === completed));
  };

  const filterHandler = () => {
    switch (getStatus) {
      case "completed":
        setFilterTodosFunction(true);
        break;
      case "uncompleted":
        setFilterTodosFunction(false);
        break;
      default:
        setFilterTodos(getTodos);
        break;
    }
  };

  const saveLocal = () => {
    localStorage.setItem("getTodos", JSON.stringify(getTodos));
  };

  const getLocal = () => {
    if (localStorage.getItem("getTodos") !== null) {
      let todoLocal = JSON.parse(localStorage.getItem("getTodos"));
      setTodo(todoLocal);
    }
  };

  const saveNotFinishTodo = () => {
    const notFinishedYet = getTodos.filter((el) => el.completed === false);
    setLengthTask(notFinishedYet.length);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Center mb={8} mt={10}>
          <Heading as="h2" size="2xl">
            Project Todo List
          </Heading>
        </Center>
        <Form
          getTextTodo={getTextTodo}
          setTextTodo={setTextTodo}
          getTodos={getTodos}
          setTodo={setTodo}
          setStatus={setStatus}
          filterHandler={filterHandler}
          getAnimateInsert={getAnimateInsert}
          setAnimateInsert={setAnimateInsert}
          insertIdLast={insertIdLast}
          getLengthTask={getLengthTask}
          setLengthTask={setLengthTask}
        />
        <TodoList
          getFilterTodos={getFilterTodos}
          setTodo={setTodo}
          getTodos={getTodos}
          getAnimateInsert={getAnimateInsert}
          getIdLast={getIdLast}
          getLengthTask={getLengthTask}
          setLengthTask={setLengthTask}
        />
      </Container>
    </>
  );
};

export default App;
