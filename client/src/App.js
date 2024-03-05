import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken // si le jeton existe, permet la redirection vrs la page de liste
  const userEmail = cookies.Email;  // const userEmail = "momoboss94@gmail.com";  m.besrour@yahoo.com
  const [tasks, setTasks] = useState(null)

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      )
      const json = await response.json()
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [])
  console.log(tasks);

  //short date par ordre.sort
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <div className="app">
      {/* affiche si utilisateur connecter la to do list sinon retour vers l'authentification */}
      {!authToken && <Auth />} {/* si le jeton existe, permet la redirection vrs la page de liste */}
      {authToken &&

        <>
          <ListHeader listName={'Holiday tick list'} />
           <p className="user-email">Bon retour {userEmail}</p>{/* Affiche le nom de l'utilisateur enregistré*/}
          {sortedTasks?.map((tache) => (<ListItem key={tache.id} tache={tache} getData={getData} />
          ))}
        </>
      }
    <p className="copyright">mon application d'authentification 05/03/2024</p>
    </div>
  );
}

export default App;
