import React, { createContext, useContext, useMemo, useState } from 'react';

/**
 * @typedef {Object} Profile
 * @property {number} id - The unique identifier for the user.
 * @property {number} user_id - The user ID associated with the user.
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {string} birthday - The birthday of the user in ISO format.
 * @property {string} hash - A hash string associated with the user.
 * @property {string} extension - The file extension of the user's profile picture.
 * @property {number} type - The type of user.
 * @property {number} location_id - The location ID associated with the user.
 * @property {number} job_id - The job ID associated with the user.
 * @property {string} country - The country of the user.
 * @property {string} continent - The continent of the user.
 * @property {string} location_string - The location string of the user.
 * @property {string} job - The job of the user.
 * @property {string} created_at - The creation timestamp of the user record in ISO format.
 * @property {boolean} like - The like status of the user.
 */

/** 
 * @type {React.Context<{profiles: Profile[], setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>}>}
 */
const UserProfileContext = createContext();

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);

    if (!context) {
        throw new Error('useUserProfile must be used within a UserProfileProvider');
    }

    return context;
};

export default function UserProfileProvider({ children }) {
    /** 
     * @type {[Profile[], React.Dispatch<React.SetStateAction<Profile[]>>]}
     */
    const [profiles, setProfiles] = useState([]);

    const value = useMemo(() => ({ profiles, setProfiles }), [profiles, setProfiles]);

    return (
        <UserProfileContext.Provider value={value}>
            {children}
        </UserProfileContext.Provider>
    )
}
