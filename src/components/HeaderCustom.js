import '../css/HeaderCustom.css';
import SearchBar from "./SearchBar";

const HeaderCustom = ({ getUserSearch, bgProperties }) => {

  return (
    <header className={ bgProperties.secondary_color }>
      <SearchBar getUserSearch={ getUserSearch } bgProperties={ bgProperties }/>
    </header>
  )
}

export default HeaderCustom;
