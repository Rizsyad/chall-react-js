// import React from "react";
import { useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  VStack,
  Flex,
  Text,
  Box,
  Spacer,
  useBoolean,
  Checkbox,
} from "@chakra-ui/react";

const Todo = ({
  todo,
  text,
  completed,
  getTodos,
  setTodo,
  getAnimateInsert,
  getIdLast,
  getLengthTask,
  setLengthTask,
}) => {
  const [getAnimateDelete, setAnimateDelete] = useBoolean();

  const removeHandle = () => {
    if (todo.completed === false) setLengthTask(getLengthTask - 1);
    setAnimateDelete.toggle();
    setTimeout(() => {
      setTodo(getTodos.filter((el) => el.id !== todo.id));
    }, 1000);
  };

  useEffect(() => {
    if (getAnimateDelete) setAnimateDelete.toggle();
  }, []);

  const completedHandle = () => {
    setLengthTask(getLengthTask - 1);
    setTodo(
      getTodos.map((item) => {
        if (item.id !== todo.id) return item;
        return {
          ...item,
          completed: !item.completed,
        };
      })
    );
  };

  return (
    <VStack
      mt={3}
      mb={3}
      className={`${
        getAnimateInsert && todo.id === getIdLast
          ? "animate__animated animate__fadeInDown"
          : ""
      } ${getAnimateDelete ? "animate__animated animate__fadeOutRight" : ""}`}
    >
      <Box bg={completed ? "green" : "tomato"} w="100%" p={4} color="white">
        <Flex>
          <Checkbox colorScheme="green" onChange={completedHandle}>
            {completed ? <Text as="del">{text}</Text> : <Text>{text}</Text>}
          </Checkbox>
          <Spacer />
          <DeleteIcon mt={1} onClick={removeHandle} />
        </Flex>
      </Box>
    </VStack>
  );
};

export default Todo;
