import { create } from "../pages/example/create.example.ts";
import { list } from "../pages/example/list.example.ts";
import { TodoList } from "../pages/example/todo.list.ts";
import { CreateTodo } from "../pages/example/create.todo.ts";
import { phonebook } from "../pages/example/wrapper.example.ts";
import homeIndex from "../pages/home/home.index.ts";
import noPageFoundIndex from "../pages/noPageFound/noPageFound.index.ts";
import { login } from "../pages/user/login.example.ts";
import { logout } from "../pages/user/logout.example.ts";
import { register } from "../pages/user/register.example.ts";

// Define route parameters type
type RouteParams = {
  path: any;
  linkLabel?: string;
  content: any;
  isAuthenticated?: boolean;
};

// Define the routing array
const routes: RouteParams[] = [
  {
    path: "/",
    linkLabel: "Home",
    content: homeIndex,
  },
  {
    path: "/login",
    linkLabel: "Login",
    content: login,
  },
  {
    path: "/register",
    linkLabel: "Signup",
    content: register,
  },
  {
    path: "/logout",
    linkLabel: "Logout",
    content: logout,
  },
  {
    path: "/example",
    linkLabel: "Example",
    content: create,
    isAuthenticated: true,
  },
  {
    path: "/phonebook",
    linkLabel: "Phonebook",
    content: phonebook,
    isAuthenticated: true,
  },
  {
    path: "/example-list",
    linkLabel: "Example List",
    content: list,
    isAuthenticated: true,
  },
  {
    path: "/create-todo",
    linkLabel: "Create To-do",
    content: CreateTodo,
    isAuthenticated: true,
  },
  {
    path: "/todo-list",
    linkLabel: "To-do List",
    content: TodoList,
    isAuthenticated: true,
  },
  {
    path: "/404",
    linkLabel: "404",
    content: noPageFoundIndex,
  },
];

export default routes;
