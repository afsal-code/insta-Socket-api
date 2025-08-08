import React, { useState, useEffect } from 'react';
import axios from 'axios';
import route from '../route';
import './listPeople.scss';

function ListPeople() {
    const value = localStorage.getItem("Auth");
    const [people, setPeople] = useState([]);

    useEffect(() => {
        getDetails();
    }, []);

    const getDetails = async () => {
        try {
            const { status, data } = await axios.get(`${route()}listPeople`, {
                headers: { "Authorization": `Bearer ${value}` }
            });

            if (status === 200) {
                setPeople(data.people);
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error("Failed to fetch people", error);
        }
    };

    return (
        <div className="chat-list">
            {people.map((person, index) => (
                <div key={index} className="chat-item">
                    <img src={person.profile} alt="profile" />
                    <div>
                        <strong>{person.username}</strong>
                        <div>{person.email}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListPeople;
