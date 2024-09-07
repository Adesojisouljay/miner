import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { getMerchantById } from '../../api/ekzat';
import './p2p-chat.scss';

export const P2pChat = () => {
    const { chatId } = useParams();
    const user = useSelector((state) => state.ekzaUser.user);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [merchantInfo, setMerchantInfo] = useState(null);
    
    const queryParams = new URLSearchParams(window.location.search);
    const amount = queryParams.get('amount'); 

    useEffect(() => {
        if (chatId) {
            const [merchantId, userId] = chatId.split('-');

            const newSocket = io(`${process.env.REACT_APP_EKZA_URL}/chat` || 'http://localhost:2000/api/chat', {
                query: { merchantId, userId },
                transports: ['websocket'],
            });

            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Connected to chat:', newSocket.id);
            });

            newSocket.on('loadHistory', (history) => {
                setMessages(history);
                scrollToBottom();
            });

            newSocket.on('receiveMessage', (msg) => {
                if (msg.sender !== user._id) {
                    setMessages((prevMessages) => [...prevMessages, msg]);

                    if (!isAtBottom) {
                        setNewMessagesCount((prevCount) => prevCount + 1);
                    } else {
                        scrollToBottom();
                    }
                } else {
                    setMessages((prevMessages) => [...prevMessages, msg]);
                    scrollToBottom();
                }
            });

            return () => {
                newSocket.disconnect();
                console.log('Socket disconnected');
            };
        }
    }, [chatId]);

    useEffect(() => {
        const fetchMerchantInfo = async () => {
            try {
                const merchantId = chatId.split('-')[0];
                const merchantData = await getMerchantById(merchantId);
                console.log(merchantData)
                setMerchantInfo(merchantData.data);
            } catch (error) {
                console.error('Error fetching merchant info:', error);
            }
        };

        fetchMerchantInfo();
    }, [chatId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        setNewMessagesCount(0);
        setIsAtBottom(true);
    };

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
        <div className='p2p-page'>
            <div className='p2p-page-wrapper'>
                <div className="merchant-info-container">
                    {merchantInfo ? (
                        <>
                            <h3>Merchant Information</h3>
                            <p><strong>Username:</strong> {merchantInfo.username}</p>
                            <p><strong>Account Name:</strong> {merchantInfo.accountName}</p>
                            <p><strong>Account Number:</strong> {merchantInfo.accountNumber}</p>
                            <p><strong>Bank:</strong> {merchantInfo.bankName}</p>
                            <p><strong>Amount:</strong> ₦{amount}</p>
                        </>
                    ) : (
                        <p>Loading merchant info...</p>
                    )}
                </div>
                <div className="chat-container">
                    <div className='chat-header'>
                        <h2>Chat with {merchantInfo?.username}</h2>
                        <span>{merchantInfo?.online ? "Online" : "offline" }</span>
                    </div>
                    {newMessagesCount > 0 && (
                        <div className="new-messages-banner" onClick={scrollToBottom}>
                            {newMessagesCount} new message{newMessagesCount > 1 ? 's' : ''} – Click to view
                        </div>
                    )}

                    <ScrollToBottom className="messages-container">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.sender === user._id ? 'sent' : 'received'}`}
                                >
                                    {msg.message}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollToBottom>
                    
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
            </div>
        </div>
    );
};
