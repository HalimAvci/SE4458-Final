import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için
import '../styles/Search.css';

const DoctorSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [doctorList, setDoctorList] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate(); // useNavigate hook'u

    const countryCityMap = {
        Turkey: ['Istanbul', 'Ankara', 'Izmir'],
        USA: ['New York', 'Los Angeles', 'Chicago'],
        UK: ['London', 'Manchester', 'Birmingham'],
        Germany: ['Berlin', 'Munich', 'Hamburg'],
    };


    const handleSearch = async () => {

        if (!searchQuery && !selectedCountry && !selectedCity) {
            setDoctorList([]);
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5001/api/doctors/search?query=${searchQuery}&country=${selectedCountry}&city=${selectedCity}`
            );
            const results = await response.json();
            setDoctorList(results);
            setSuggestions([]);
        } catch (error) {
            console.error('Error searching doctors:', error);
            alert('Failed to search doctors. Please try again.');
        }
    };


    const handleQueryChange = async (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value) {
            try {
                const response = await fetch(
                    `http://localhost:5001/api/doctors/search?query=${value}&country=${selectedCountry}&city=${selectedCity}`
                );
                const results = await response.json();
                setSuggestions(results);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };


    const handleSuggestionClick = (doctor) => {
        setDoctorList([doctor]);
        setSuggestions([]);
        setSearchQuery(doctor.fullname);
        setSelectedCountry(doctor.country);
        setSelectedCity(doctor.city);
    };


    const handleDoctorClick = (doctor) => {
        navigate(`/appointment/${doctor.id}`);
    };

    return (
        <div className="doctor-search-container">
            <h1 className="search-title">Search</h1>
            <div className="search-form">
                <input
                    type="text"
                    placeholder="Specialization, area of interest, or name"
                    value={searchQuery}
                    onChange={handleQueryChange}
                    className="search-input"
                />
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="dropdown"
                >
                    <option value="">Select Country</option>
                    {Object.keys(countryCityMap).map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="dropdown"
                    disabled={!selectedCountry}
                >
                    <option value="">Select City</option>
                    {selectedCountry &&
                        countryCityMap[selectedCountry].map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                </select>
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>


            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <div>
                                <strong>{suggestion.fullname}</strong> ({suggestion.area_of_interest})
                            </div>
                            <div className="suggestion-location">
                                {suggestion.city}, {suggestion.country}
                            </div>
                        </li>
                    ))}
                </ul>
            )}


            <div className="doctor-list">
                {doctorList.length === 0 ? (
                    <p className="no-results">No doctors found matching your criteria.</p>
                ) : (
                    doctorList.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="doctor-item"
                            onClick={() => handleDoctorClick(doctor)}
                            style={{ cursor: 'pointer' }}
                        >
                            <p><strong>{doctor.fullname}</strong> ({doctor.area_of_interest})</p>
                            <p>{doctor.city}, {doctor.country}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DoctorSearch;
