import React, { useEffect, useState } from 'react';
import { Input, List, Typography } from 'antd';
import axios from 'axios';
import debounce from 'lodash/debounce';

const Search = ({ setLocation }) => {
    const { Search } = Input;
    const [showSearchTable, setShowSearchTable] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    const saveToLocalStorage = (value) => {
        searchHistory.push(value);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    };

    const onSearch = (value, _e, info) => {
        setLocation(value)
        saveToLocalStorage(value);
    };

    const handleFocus = () => {
        setShowSearchTable(true);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setShowSearchTable(false);
        }, 200);
    }

    const handleItemClick = (value) => {
        setLocation(value);
        setShowSearchTable(false);

        if(!searchHistory.includes(value)) {
            saveToLocalStorage(value);
        }
    };

    const fetchSearchResults = async (value) => {
        try {
            const res = await axios.get(`https://weather-forecast-go-be.vercel.app/api/weather/search/${value}`);
            const names = res.data.map((item) => item.name);
            setSearchResults(names);
        } catch (error) {
            console.error(error);
        }
    }

    const debouncedFetchSearchResults = debounce(fetchSearchResults, 500);

    useEffect(() => {
        if (searchInput) {
            debouncedFetchSearchResults(searchInput);
        }
    }, [searchInput]);

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    }

    return (
        <div className="search-container">
            <Search 
                placeholder="E.g., New York, London, Tokyo" 
                onSearch={onSearch} 
                enterButton 
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            />

            {showSearchTable && (
                <List
                    bordered
                    dataSource={searchInput? searchResults : searchHistory}
                    className='search-table'
                    renderItem={(item) => (
                        <List.Item onClick={() => handleItemClick(item)}>
                            <Typography.Text>{item}</Typography.Text>
                        </List.Item>
                    )}
                />
            )}
        </div>
    )
}

export default Search;
