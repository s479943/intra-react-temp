import { useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Task 1', description: "ww", completed: false, tags: ['work', 'important'] },
  { id: 2, title: 'Task 2', description: "ww", completed: true, tags: ['work', 'important'] },
  { id: 3, title: 'Task 3', description: "ww", completed: false, tags: ['work', 'important'] },
]

const initialTask = {
  title: '',
  description: '',
  completed: false,
  tags: [],
}

function App() {
  const [count, setCount] = useState(0)
  const [showTask, setShowTask] = useState(false)
  const [taskList, setTaskList] = useState(initialTasks)
  const [task, setTask] = useState(initialTask)
  const handleShowTask = (id) => {
    setShowTask(!showTask)
    if (id && taskList.find((task) => task.id === id)) {
      setTask(taskList.find((task) => task.id === id))
    } else {
      setTask(initialTask)
    }
  }
  const handleChangeTask = (e) => {
    // 處理tags
    if (e.target.name === 'tags') {
      // 如果tags有值，切分 , 後加入
      setTask({...task, tags: e.target.value.split(',').map((tag) => tag.trim())})
    } else if (e.target.name === 'completed') {
      setTask({...task, completed: e.target.checked})
    } else {
      setTask({...task, [e.target.name]: e.target.value})
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // 確認task有沒有id，有id就更新，沒id就新增
    if (task.id) {
      // 更新
      setShowTask(false)
      setTaskList(taskList.map((t) => t.id === task.id ? task : t))
    } else {
      const newTask = {...task, id: taskList.length + 1}
      setShowTask(false)
      setTaskList([...taskList, newTask])
    }
    setTask(initialTask)
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <h1>待辦事項</h1>
        <button onClick={handleShowTask} disabled={showTask} style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: '#00ffcc', borderRadius: '10px', padding: '0.5rem 1rem', cursor: `${showTask ? 'not-allowed' : 'pointer'}` }}>新增</button>
      </div>
      {/* 總計 */}
      <div style={{ width: '80vw', display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem'}}>
        <div style={{ backgroundColor: '#00ffcc', padding: '0.5rem 1rem', borderRadius: '10px'}}>總計：{taskList.length}</div>
      </div>
      {/* 分隔線 */}
      <div style={{ width: '80vw', height: '3px', backgroundColor: '#00ffcc' }}></div>
      <div style={{ width: '80vw', height: '500px', backgroundColor: '#ffffff', borderRadius: '10px', marginTop: '10px', display: 'flex', flexWrap: 'wrap'}}>
        {taskList && taskList.map((task) => (
          <div onClick={() => handleShowTask(task.id)} key={task.id} style={{ width: 'calc(80vw / 3 - 20px)', height: '200px', border: '1px solid #00ffcc', backgroundColor: `${task.completed ? '#ffcc44' : '#ffffff'}`, borderRadius: '10px', margin: '5px', position: 'relative', cursor: 'pointer' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: `${task.completed ? '#fff' : '#00ddaa'}`, lineHeight: '0.9', textAlign: 'start', padding: '0.5rem 1.4rem 0 1.4rem' }}>{task.title}</h2>
            <div style={{ position: 'absolute', top: '1.2rem', right: '1.1rem' }}>{task.completed ? '已完成' : '未完成'}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', margin: '0.3rem 0.7rem' }}>
              {
                task.tags && task.tags.map((tag) => (
                  <div key={tag} style={{ backgroundColor: '#00ffcc', padding: '0.2rem 0.5rem ', borderRadius: '1rem', fontSize: '0.8rem' }}>{tag}</div>
                ))
              }
            </div>
            <div style={{ padding: '0.5rem 1.4rem 0 1.4rem', textAlign: 'start' }}>
              <p>{task.description}</p>
            </div>
          </div>
        ))}
      </div>
      {
        showTask && (
          <div style={{position: 'absolute', top: '-120px', left: '-125px', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div style={{ position: 'absolute', top: 'calc(50% - 180px)', right: 'calc(50% - 175px)',width: '350px',height: '360px', backgroundColor: '#ffffff', borderRadius: '10px', padding: '0.5rem 1rem', cursor: 'pointer', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', color: '#333333'}}>新增待辦事項</h2>
        <button onClick={handleShowTask} style={{ width: '30px',padding: '0',  height: '30px', backgroundColor: '#00ffcc', marginTop: '0.6rem'}}>X</button>
        </div>
        <form style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <div style={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
            <label>標題</label>
            <input type="text" name='title' placeholder="標題" style={{width: '80%'}} onChange={(e) => handleChangeTask(e)} value={task.title}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
            <label>完成</label>
            <input type="checkbox" name='completed' onChange={(e) => handleChangeTask(e)} checked={task.completed}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', gap: '0.5rem'}}>
            <label>標籤</label>
            <input type="text" name='tags' placeholder="標籤" style={{width: '80%'}} onChange={(e) => handleChangeTask(e)} value={task.tags}/>
          </div>
          <div style={{width: '100%', display: 'flex', flexDirection: 'row', gap: '0.5rem', marginBottom: '1rem'}}>
            <label>描述</label>
            <textarea rows={7} name='description' type="text" style={{width: '80%'}} placeholder="描述" onChange={(e) => handleChangeTask(e)} value={task.description}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem'}}>
            <button onClick={handleShowTask} style={{backgroundColor: '#ffcc44', borderRadius: '10px', padding: '0.5rem 1rem', cursor: 'pointer'}}>取消</button>
            <button type='submit' onClick={handleSubmit} style={{backgroundColor: '#00ffcc', borderRadius: '10px', padding: '0.5rem 1rem', cursor: 'pointer'}}>新增</button>
          </div>
        </form>
      </div>
            </div>
        )
      }
    </div>
  )
}

export default App
