import './taskManager.css'
import Task from './Task'
import AddTask from './AddTask'
import {useState, useEffect} from 'react'
import { db } from "./firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [ fetchData, setFetchData ] = useState([]);

  /* function to get all tasks from firestore in realtime */ 

  const fetchTasks = async () => {
    try{

      const t = query(collection(db,'tasks'), orderBy('createdDate', 'desc'));

      onSnapshot(t,(querySnapshot) => {
        setFetchData(querySnapshot.docs.map((val, index) => {
          return {
            id: val.id,
            data: val.data()
          }
        }))
      })

    }catch(err){
      window.alert(err);
    }
  }

  useEffect(() => {
    fetchTasks();
  },[])
  

  return (
    <div className='taskManager'>
      <header>Task Manager</header>
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add task +
        </button>
        <div className='taskManager__tasks'>
          {
            fetchData && 
            fetchData.map(( val, index) => {
              return (
                <Task
                key={index}
                id={val.id}
                title={val.data.title}
                description={val.data.description}
                completed={val.data.completed}
                >
                </Task>
              )
            })
          }
        </div>
      </div>

      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default TaskManager
