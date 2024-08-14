import "./App.css";
import PostsAsyncAwait from "./components/PostsAsyncAwait";
import PostsAxios from "./components/PostsAxios";
import PostsPromise from "./components/PostsPromise";
import TimerAsyncAwait from "./components/TimerAsyncAwait";
import TimerThen from "./components/TimerPromise";

function App() {
  return (
    <>
      <TimerThen />
      <TimerAsyncAwait />
      <PostsPromise />
      <PostsAsyncAwait />
      <PostsAxios />
    </>
  );
}

export default App;
