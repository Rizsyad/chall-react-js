import Todo from "./Todo";
import { Box, Flex, HStack, Center } from "@chakra-ui/react";
import { HiOutlineEmojiSad } from "react-icons/hi";

const TodoList = ({
  setTodo,
  getTodos,
  getFilterTodos,
  getAnimateInsert,
  getIdLast,
  getLengthTask,
  setLengthTask,
}) => {
  return (
    <>
      {getLengthTask > 0 ? (
        `You have ${getLengthTask} pending task`
      ) : (
        <HStack>
          <Box bg="red.600" w="100%" p={4} color="white">
            <Flex>
              <Center mr={1}>
                <HiOutlineEmojiSad />
              </Center>
              Sorry, the to-do list has not been created yet
            </Flex>
          </Box>
        </HStack>
      )}

      {getFilterTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          getTodos={getTodos}
          text={todo.text}
          completed={todo.completed}
          setTodo={setTodo}
          getAnimateInsert={getAnimateInsert}
          getIdLast={getIdLast}
          getLengthTask={getLengthTask}
          setLengthTask={setLengthTask}
        />
      ))}
    </>
  );
};

export default TodoList;
