import React, { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getTodoList,
  addTodoData,
  deleteTodoData,
  updateTodoData,
} from "../todoList";

const TodoList = () => {
  const title_input = useRef("");
  const content_input = useRef("");
  const contentRevised_input = useRef("");

  const queryClient = useQueryClient();

  //데이터 Read
  const Todos = useQuery("todo_list", getTodoList, {
    onSuccess: (data) => {
      console.log(data);
    },
    // staleTime: 10000,
  });
  console.log(Todos.data.data);

  //데이터 Post
  const { mutate: addTodo } = useMutation(addTodoData, {
    onSuccess: () => {
      queryClient.invalidateQueries("todo_list");
      title_input.current.value = "";
      content_input.current.value = "";
    },
  });
  //데이터 delete
  const { mutate: deleteTodo } = useMutation(deleteTodoData, {
    onSuccess: () => {
      queryClient.invalidateQueries("todo_list");
    },
  });

  //데이터 update
  const { mutate: updateTodo } = useMutation(updateTodoData, {
    onSuccess: () => {
      queryClient.invalidateQueries("todo_list");
      contentRevised_input.current.value = "";
    },
  });

  if (Todos.isLoading) {
    return null;
  }

  return (
    <div>
      <input ref={title_input} />
      <input ref={content_input} />
      <button
        onClick={() => {
          const data = {
            title: title_input.current.value,
            content: content_input.current.value,
          };
          addTodo(data);
        }}
      >
        추가하기
      </button>

      {Todos.data.data.map((todo) => {
        return (
          <div key={todo.id}>
            <div>
              {todo.title}:{todo.content}
            </div>
            <button
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              삭제하기
            </button>
            <input ref={contentRevised_input} />
            <button
              onClick={() => {
                const data = {
                  id: todo.id,
                  content: contentRevised_input.current.value,
                };
                updateTodo(data);
              }}
            >
              수정하기
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
