import { useEffect, useState } from 'react'
import ChatWindow from './components/ChatWindow'
import { io } from 'socket.io-client'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [history, setHistory] = useState([])
  const [me, setMe] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const s = io('ws://localhost:8888')
    s.on('connect', () => {
      setIsLoading(false)
    })
    s.on('$updateUser', (users) => {
      setUsers(users)
    });
    s.on('$name', (name) => {
      setMe(name)
    });

    s.on('$message', (msg) => {
      setHistory([...history, msg])
    });
    s.on('$history', (history) => {
      setHistory(history)
    });
    setSocket(s)
  }, [])



  return (
    <div className='app'>
      <ChatWindow users={users} history={history} setHistory={setHistory} socket={socket} me={me} />
    </div>
  )
}

export default App
