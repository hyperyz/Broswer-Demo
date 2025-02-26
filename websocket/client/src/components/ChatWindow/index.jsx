import React, { useRef, useState, useEffect } from 'react'
import './index.css'
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
moment.locale('zh-cn');

function ChatWindow({ socket, users, history, setHistory, me }) {
    const [text, setText] = useState('')

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            const v = text.trim();
            setText('');
            setHistory([...history, { name: me, content: v, date: Date.now() }]);
            socket.emit('$message', v);
        }

    }
    const handleChange = (e) => {
        setText(e.target.value);
    }

    const formatDate = (date) => {
        date = moment(date);
        console.log(date);

        return date.fromNow().replace(/\s/g, '');
    }

    // 让滚动条显示到底部
    const divRef = useRef(null);
    useEffect(() => {
        if (divRef.current) {
            const div = divRef.current;
            div.scrollTop = div.scrollHeight;
        }
    }, [history]);

    return (
        <div className="container">
            <div className="users">
                <p>聊天室成员</p>
                <ul>
                    {
                        users.map(user => {
                            return (
                                <li key={user}>{user}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="main">
                <div className="content-area" ref={divRef}>
                    {
                        history.map((item, index) => {
                            return (
                                <div className={`item ${item.name === me ? 'mine' : ''}`} key={index} >
                                    <div className="name">{item.name}</div>
                                    <div className="content">{item.content}</div>
                                    <div className={`date-${item.name === me ? 'right' : 'left'}`}>{formatDate(item.date)}</div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="form">
                    <textarea value={text} onChange={handleChange} onKeyDown={handleEnter}></textarea>
                </div>
            </div >
        </div >
    )
}

export default ChatWindow