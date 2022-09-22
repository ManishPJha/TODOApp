import Modal from "./Modal"
import {useState} from 'react'
import { db } from "./firebase"
import { doc, updateDoc, Timestamp } from "firebase/firestore"
import './editTask.css'

function EditTask({open, onClose, toEditTitle, toEditDescription, id}) {

  const [title, setTitle] = useState(toEditTitle)
  const [description, setDescription] = useState(toEditDescription)

  /* function to update document in firestore */
  const handleSubmitAction = async(e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, 'tasks', id);
      await updateDoc(docRef, {
        title: title,
        description: description,
        modifiedDate: Timestamp.now()
      });
      onClose();
    } catch (error) {
      window.alert(error);
    }

  }

  return (
    <Modal modalLable='Edit Task' onClose={onClose} open={open}>
      <form className='editTask' name='updateTask' onSubmit={(e) => handleSubmitAction(e)}>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}/>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
