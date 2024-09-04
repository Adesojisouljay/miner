import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllMerchants } from '../../api/ekzat';
import io from 'socket.io-client';
import { FaCommentDots } from 'react-icons/fa';
import './merchant-list.scss';

export const MerchantList = () => {
    const [merchants, setMerchants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const user = useSelector(state => state.ekzaUser.user)

    useEffect(() => {
        const fetchMerchants = async () => {
            try {
                const response = await getAllMerchants();
                setMerchants(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching merchants:', error);
                setError('Failed to load merchants.');
                setLoading(false);
            }
        };

        fetchMerchants();

        const socket = io('http://localhost:2000/merchants');

        socket.on('merchantStatusUpdate', ({ merchantId, online }) => {
            console.log("Merchant status update:", merchantId, online);
            setMerchants((prevMerchants) =>
                prevMerchants.map((merchant) =>
                    merchant._id === merchantId ? { ...merchant, online } : merchant
                )
            );
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    if (loading) {
        return <div className="merchant-list__loading">Loading merchants...</div>;
    }

    if (error) {
        return <div className="merchant-list__error">{error}</div>;
    }

    return (
        <div className="merchant-list">
            <h2 className="merchant-list__title">Select a Merchant for Withdrawal</h2>
            <ul className="merchant-list__items">
                {merchants.map((merchant) => (
                    <li
                        key={merchant._id}
                        className={`merchant-item ${merchant.online ? 'online' : 'offline'}`}
                    >
                        <div className="merchant-item__image">
                            <img src={merchant.selfiePhotograph} alt={`${merchant.username}'s Selfie`} />
                        </div>
                        <div className="merchant-item__details">
                            <h3 className="merchant-item__username">{merchant.username}</h3>
                            <p className="merchant-item__status">Status: {merchant.status}</p>
                            <p className="merchant-item__transactions">Transactions: {merchant.transactionCount}</p>
                            <p className="merchant-item__online-status">
                                {merchant.online ? 'Online' : 'Offline'}
                            </p>
                            <Link to={`/merchant-chat/${merchant._id}-${user._id}`} className="merchant-item__chat-link">
                                <FaCommentDots size={20} />
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
