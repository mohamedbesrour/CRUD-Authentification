import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

const App = () => {
  // Utilisation du hook useCookies pour accéder aux cookies
  const [cookies, setCookie, removeCookie] = useCookies(null)
  // Extraction des valeurs authToken et userEmail à partir des cookies
  const authToken = cookies.AuthToken // si le jeton existe, permet la redirection vrs la page de liste
  const userEmail = cookies.Email;  // const userEmail = "momoboss94@gmail.com";  m.besrour@yahoo.com
  const [tasks, setTasks] = useState(null)

  // Fonction pour récupérer les données des tâches depuis le serveur
  const getData = async () => {
    try {
// Envoi d'une requête au serveur pour récupérer les données des tâches de l'utilisateur
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      )
      // Conversion de la réponse en format JSON
      const json = await response.json()
      // Mise à jour de l'état tasks avec les données récupérées
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  // Utilisation du hook useEffect pour exécuter getData lors du rendu initial du composant
  useEffect(() => {
    // Vérification si l'utilisateur est connecté (authToken existe)
    if (authToken) {
      getData();
    }
  }, [])
  console.log(tasks);

  // Tri des tâches par date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <div className="app">
      {/* Affichage conditionnel : si l'utilisateur n'est pas connecté, afficher le composant d'authentification */}
      {!authToken && <Auth />} {/* si le jeton existe, permet la redirection vrs la page de liste */}
      {/* Affichage de la liste des tâches si l'utilisateur est connecté */}
       {authToken &&

        <>
          <ListHeader listName={'Holiday tick list'} />
          {/* Affichage du nom de l'utilisateur enregistré */}
           <p className="user-email">Bon retour {userEmail}</p>{/* Affiche le nom de l'utilisateur enregistré*/}
          {/* Affichage des tâches sous forme de ListItem */}
          {sortedTasks?.map((tache) => (<ListItem key={tache.id} tache={tache} getData={getData} />
          ))}
        </>
      }
    <p className="copyright">mon application d'authentification 05/03/2024</p>
    </div>
  );
}

export default App;
