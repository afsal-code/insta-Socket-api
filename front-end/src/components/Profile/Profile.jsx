import React, { useEffect, useState } from 'react';
import axios from 'axios';
import route from '../route';
import './profile.scss';

function Profile() {
    const token = localStorage.getItem("Auth");
    const [profile, setProfile] = useState({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const { status, data } = await axios.get(`${route()}profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (status === 200) {
                setProfile(data.user);
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
        }
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <h1 className="profile-title">Your Profile</h1>
                <img src={profile.profile} alt="Profile" className="profile-img" />

                <div className="profile-details">
                    <p><span className="label">Email:</span> {profile.email}</p>
                    <p><span className="label">Username:</span> {profile.username}</p>
                    <p><span className="label">User ID:</span> {profile._id}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
