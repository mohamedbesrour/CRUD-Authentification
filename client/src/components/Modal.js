import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, tache }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === 'edit' ? true : false; //booleen

  const [data, setData] = useState({
    user_email: editMode ? tache.user_email : cookies.Email, // user_email: editMode ? tache.user_email : "momoboss94@gmail.com",
    title: editMode ? tache.title : null,
    progress: editMode ? tache.progress : 50,
    date: editMode ? tache.date : new Date()
  });

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        console.log("WORKED");
        setShowModal(false);
        getData()
      }

    } catch (err) {
      console.error(err);
    }
  }

  const editData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${tache.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      );
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value
    }))

    console.log(data)
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="la tâche ici"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">
            sélectionner votre progression actuelle
          </label>{" "}
          {/*etiquette Bar de Progression*/}
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  )
}

export default Modal
