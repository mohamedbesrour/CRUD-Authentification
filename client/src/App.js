import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";

function App() {
  const userEmail = "momoboss94@gmail.com";
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/auth/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => getData, []);
  console.log(tasks);


//short date par ordre.sort
const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))
  return (
    <div className="app">
      <ListHeader listName={"Holiday tick list"} />
      {sortedTasks?.map((tache) => <ListItem key={tache.id} tache={tache}/>)};
    </div>
  );
}

export default App;
