import NavBar from "../components/NavBar";
import MensCatalog from "../components/MensCatalog";
import SearchBar from "../components/SearchBar";

function SearchPage() {
    
  return (
    
    <div className="d-flex flex-column h-100">
     <NavBar /> 
      <SearchBar />
    </div>
    
    
  );
}

export default SearchPage;