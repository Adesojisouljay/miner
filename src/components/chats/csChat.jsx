import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './cs-chat.scss';

export const CustomerSupport = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (isChatOpen) {
            const newSocket = io('/support');

            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to customer support:', newSocket.id);
            });

            newSocket.on('supportMessage', (msg) => {
                setMessages((prevMessages) => [...prevMessages, { text: msg.text, sender: 'support' }]);
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, [isChatOpen]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && socket) {
            const msgObject = { text: message, sender: 'user' };
            socket.emit('supportMessage', msgObject);
            setMessages((prevMessages) => [...prevMessages, msgObject]);
            setMessage('');
        }
    };

    return (
        <div className="customer-support">
            <button onClick={() => setIsChatOpen(true)} className="support-button">
                Contact Support
            </button>

            {isChatOpen && (
                <div className="support-chat-container">
                    <h2>Customer Support</h2>
                    <div className="support-chat-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`support-chat-message ${
                                    msg.sender === 'user' ? 'user' : 'support'
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage} className="support-chat-form">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="support-chat-input"
                        />
                        <button type="submit" className="support-chat-submit">
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
