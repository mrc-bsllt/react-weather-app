import '../css/SearchBar.css';
import { RiSearch2Line } from 'react-icons/ri';
import { useState } from "react";

const SearchBar = ({ getUserSearch, bgProperties }) => {
  const [searchValue, setSearchValue] = useState("")

  const preventDefault = (e) => {
    e.preventDefault();
    getUserSearch(searchValue);
    setSearchValue('');
  }

  return (
    <div className="search_bar">
      <form onSubmit={ preventDefault }>
        <input type="text" value={ searchValue } className={ `${bgProperties.primary_color} ${bgProperties.font}` } onChange={ (e) => setSearchValue( e.target.value ) }/>
        <button className={`${bgProperties.primary_color} ${bgProperties.font}`}><RiSearch2Line className="search_icon"/></button>
      </form>
    </div>
  )
}

export default SearchBar;
