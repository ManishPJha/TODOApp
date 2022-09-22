import './task.css'
import {useState, useEffect} from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import { db } from "./firebase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"

function Task({id, title, description, completed}) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

   /* function to update document in firestore */
   const handleTaskCheckBoxAction = () => {
     try {
      const docRef = doc(db,'tasks',id);
      updateDoc(docRef,{
        completed: checked
       });
      } catch (error) {
       window.alert(error)
     }
   }

   /* function to delete a document from firstore */ 
   const handleDeleteAction = async (id) => {
     try{
      if(id){
        if(window.confirm("do you want to delete this?")){
          const documentRef = doc(db,'tasks',id);
          await deleteDoc(documentRef);
        }
      }
     }catch(err){
       window.alert(err)
     }
   }

   useEffect(() => {
    setChecked(completed)
   }, [completed])

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input 
          id={`checkbox-${id}`} 
          className='checkbox-custom'
          name="checkbox" 
          checked={checked} 
          onChange={ () => handleTaskCheckBoxAction() }
          type="checkbox" />
        <label 
          htmlFor={`checkbox-${id}`} 
          className="checkbox-custom-label" 
          onClick={() => setChecked(!checked)} ></label>
      </div>
      <div className='task__body'>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit: true})}>
              Edit
            </button>
            <button className='task__deleteButton' onClick={() => handleDeleteAction(id)}>Delete</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <TaskItem 
          onClose={handleClose} 
          title={title} 
          description={description} 
          open={open.view} />
      }

      {open.edit &&
        <EditTask 
          onClose={handleClose} 
          toEditTitle={title} 
          toEditDescription={description} 
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Task