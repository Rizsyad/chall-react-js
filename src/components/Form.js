import { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  SimpleGrid,
  Select,
  useBoolean,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";

const Form = ({
  setTextTodo,
  getTextTodo,
  setTodo,
  getTodos,
  setStatus,
  setAnimateInsert,
  getAnimateInsert,
  insertIdLast,
  getLengthTask,
  setLengthTask,
}) => {
  const [showAlert, closeAlert] = useBoolean();
  const [statusAlert, setStatusAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  const inputTextHandle = (e) => {
    setTextTodo(e.target.value);
  };

  const keyUpHandler = (e) => {
    if (e.key === "Enter") submitHandle(e);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (showAlert !== true) closeAlert.toggle();
    if (getTextTodo === "") {
      setStatusAlert("error");
      setMessageAlert("Inputan tidak boleh kosong!");
    } else {
      const newData = {
        id: Math.random() * 1000,
        text: getTextTodo,
        completed: false,
        date: Date.now(),
      };

      setTodo([...getTodos, newData]);

      insertIdLast(newData.id);
      setAnimateInsert.toggle();
      setTextTodo("");
      setStatusAlert("success");
      setMessageAlert("Todo telah ditambahkan");
      setLengthTask(getLengthTask + 1);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (getAnimateInsert === true) {
        setAnimateInsert.toggle();
        insertIdLast("");
      }
    }, 1000);
  });

  const statusHandle = (e) => {
    setStatus(e.target.value);
  };

  const closeAlertHandle = () => {
    closeAlert.toggle();
    setStatusAlert("");
    setMessageAlert("");
  };

  return (
    <>
      {showAlert && (
        <Alert status={statusAlert} mb={4}>
          <AlertIcon />
          {messageAlert}
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={closeAlertHandle}
          />
        </Alert>
      )}
      <SimpleGrid columns={2} spacing={10} mb={10}>
        <InputGroup size="md">
          <Input
            value={getTextTodo}
            pr="4.5rem"
            placeholder="Enter Todo List"
            onChange={inputTextHandle}
            onKeyUp={keyUpHandler}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={submitHandle}
              bg="teal.400"
              color="white"
            >
              +
            </Button>
          </InputRightElement>
        </InputGroup>
        <Select
          icon={<MdArrowDropDown />}
          placeholder="Filter Todo List"
          onChange={statusHandle}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </Select>
      </SimpleGrid>
    </>
  );
};

export default Form;
