import React from 'react';
import  { useState } from 'react';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import './Search.styles.scss';

const Search = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState('');
  
    const handleInputFocus = () => {
      setIsInputFocused(true);
    };
  
    const handleInputBlur = () => {
      setIsInputFocused(false);
      setSearchText('');
    };
  
    const handleInputChange = (event) => {
      setSearchText(event.target.value);
    };
  
    return (
        <div className='search'>
      <div className={`searchContainer ${isInputFocused ? 'expanded' : ''}`}>
        {!isInputFocused ? (
          <div className='searchIcon'>
            <FiSearch />
          </div>
        ) : (
          <div className='toggleIcon' onClick={handleInputBlur}>
            <FiArrowRight />
          </div>
        )}
        <input
          type='text'
          placeholder='Search'
          className='searchInput'
          value={searchText}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </div>
      <div className='userChats'>
        <img src="https://www.pexels.com/photo/samoyed-puppy-walking-on-wooden-flooring-4453061/" alt="friends" />
        <div className='userChatDisplay'>
            <span>Jane</span>
        </div>
      </div>
      </div>

    );
  };
  
  export default Search;