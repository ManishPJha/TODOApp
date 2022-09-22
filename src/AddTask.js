import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import { db } from "./firebase"
import { addDoc, collection, Timestamp } from "firebase/firestore"


function AddTask({onClose, open}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  /* function to add new task to firestore */
  const handleSubmitAction = async (e) => {
    e.preventDefault();

    try{
      await addDoc((collection(db, 'tasks')), {
        title: title,
        description: description,
        completed: false,
        createdDate: Timestamp.now()
      });
      onClose();
    }catch(err){
      window.alert(err);
    }

  }

  return (
    <Modal modalLable='Add Task' onClose={onClose} open={open}>
      <form className='addTask' name='addTask' onSubmit={handleSubmitAction}>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Enter title'/>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
