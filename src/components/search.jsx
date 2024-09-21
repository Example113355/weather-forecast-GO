import React, { useState } from 'react';
import { Input, List, Typography } from 'antd';

const Search = () => {
    const { Search } = Input;
    const [showSearchTable, setShowSearchTable] = useState(false);
    const onSearch = (value, _e, info) => console.log(value);

    let searchHistory = ['london', 'new york', 'tokyo', 'paris', 'berlin', 'rome', 'madrid', 'lisbon', 'amsterdam', 'brussels', 'vienna', 'prague', 'budapest', 'warsaw', 'moscow'];

    const handleFocus = () => {
        setShowSearchTable(true);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setShowSearchTable(false);
        }, 200);
    }

    return (
        <div className="search-container">
            <Search 
                placeholder="E.g., New York, London, Tokyo" 
                onSearch={onSearch} 
                enterButton 
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            {showSearchTable && searchHistory.length > 0 && (
                <List
                    bordered
                    dataSource={searchHistory}
                    className="search-table"
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text>{item}</Typography.Text>
                        </List.Item>
                    )}
                />
            )}
        </div>
    )
}

export default Search;
