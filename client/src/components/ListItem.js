import React, {useState}from 'react'
import TickIcon from "./TickIcon"
import Modal from './Modal'
import ProgressBar from "./ProgressBar"

function ListItem({tache}) {
const [showModal, setShowModal] = useState(false)

  return (
    <li className="list-item">
      
      <div className="info-container">
        <TickIcon/>
        <p className="task-title">{tache.title}</p>
        <ProgressBar />
        {/* <ProgressBar progress={tache.progress}/> */}
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
        <button className="delete">DELETE</button>
        {/* <button className="delete" onClick={deleteItem}>DELETE</button> */}
      </div>
       {showModal && <Modal mode={'edit'} setShowModal={setShowModal} tache={tache}/>}
       {/*getData={getData} */}
    </li>  
  )
}

export default ListItem