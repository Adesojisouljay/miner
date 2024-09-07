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
    const [expandedMessages, setExpandedMessages] = useState({});

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
                setMessages((prevMessages) => [...prevMessages, msg]);
                if (!isAtBottom && msg.sender !== user._id) {
                    setNewMessagesCount((prevCount) => prevCount + 1);
                } else {
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

    const sendMessage = () => {
        if (message.trim() && socket) {
            const [merchantId, userId] = chatId.split('-');
            const msgObject = { userId, merchantId, message, sender: user._id };

            socket.emit('sendMessage', msgObject);

            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const renderMessage = (msg) => {
        const isExpanded = expandedMessages[msg._id || msg.timestamp] || false;

        const toggleShowFullMessage = () => {
            setExpandedMessages((prev) => ({
                ...prev,
                [msg._id || msg.timestamp]: !isExpanded,
            }));
        };

        const showNextChars = (message, startIndex) => {
            const endIndex = startIndex + 300;
            return message.substring(startIndex, endIndex);
        };

        const messageParts = [];
        let startIndex = 0;

        while (startIndex < msg.message.length) {
            const part = showNextChars(msg.message, startIndex);
            messageParts.push(part);
            startIndex += 300;
        }

        return (
            <div className={`message ${msg.sender === user._id ? 'sent' : 'received'}`} key={msg._id || msg.timestamp}>
                {messageParts.map((part, index) => (
                    <span key={index}>
                        {index === 0 ? part : (isExpanded ? part : '')}
                    </span>
                ))}
                {msg.message.length > 300 && !isExpanded && '...'}
                {msg.message.length > 300 && (
                    <button onClick={toggleShowFullMessage} className="read-more">
                        {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                )}
            </div>
        );
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
                        <span>{merchantInfo?.online ? "Online" : "Offline"}</span>
                    </div>
                    {newMessagesCount > 0 && (
                        <div className="new-messages-banner" onClick={scrollToBottom}>
                            {newMessagesCount} new message{newMessagesCount > 1 ? 's' : ''} – Click to view
                        </div>
                    )}

                    <ScrollToBottom className="messages-container">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {messages.map(renderMessage)}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollToBottom>
                    
                    <form onSubmit={(e) => e.preventDefault()} className="chat-form">
                        <div className="input-container">
                            <button type="submit" className="chat-submit" onClick={sendMessage}>Send</button>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                className="chat-input"
                                rows="1"
                                style={{ resize: 'none', overflowY: 'auto' }}
                                maxRows={5}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
