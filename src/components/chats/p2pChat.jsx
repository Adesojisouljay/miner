import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import './p2p-chat.scss';

export const P2pChat = () => {
    const { chatId } = useParams();
    const user = useSelector((state) => state.ekzaUser.user);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (chatId) {
            const [merchantId, userId] = chatId.split('-');


            ///WE SHOULD UNCOMMENT THIS BEFORE DEPLOYMENT
            const newSocket = io(`${process.env.REACT_APP_EKZA_URL}/chat` || 'http://localhost:2000/api/chat', {
            // const newSocket = io('http://localhost:2000/api/chat', {
                query: { merchantId, userId },
                transports: ['websocket'],
            });

            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to chat:', newSocket.id);
            });

            newSocket.on('loadHistory', (history) => {
                console.log('Chat history loaded:', history);
                setMessages(history);
            });

            newSocket.on('receiveMessage', (msg) => {
                console.log('Message received:', msg);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: msg.message, sender: msg.sender },
                ]);
            });

            return () => {
                newSocket.disconnect();
                console.log('Socket disconnected');
            };
        }
    }, [chatId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && socket) {
            const [merchantId, userId] = chatId.split('-');
            const msgObject = { userId, merchantId, message, sender: user._id };

            socket.emit('sendMessage', msgObject);

            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <h2>Chat</h2>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${
                            msg.sender === user._id ? 'user' : 'merchant'
                        }`}
                    >
                        {msg.message || msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="chat-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="chat-input"
                />
                <button type="submit" className="chat-submit">
                    Send
                </button>
            </form>
        </div>
    );
};
