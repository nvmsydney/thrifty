import React, { useState, useEffect } from "react";
import blazer1 from "../assets/blazer1.avif";
interface Post {
  id: string;
}

const SearchBar = () => {
  const [searchItem, setSearchItem] = useState("");
  const [usernameSearch, setUsernameSearch] = useState<Post[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchItem(value);
  };

  useEffect(() => {
    const searchUser = async () => {
      const response = await fetch(
        "https://www.cmsc508.com/~24SP_jacksonja13/API.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "S",
            username: searchItem,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        const posts = data.usernames.map((usernameArray: any[]) => ({
          id: usernameArray[0],
        }));
        setUsernameSearch(posts);
      } else {
        setUsernameSearch([]);
      }
    };
    searchUser();
  }, [searchItem]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50">
        <input
          type="text"
          className="form-control mb-3 w-100"
          value={searchItem}
          onChange={handleChange}
          placeholder="Search..."
        />
        <ul className="list-group">
          {usernameSearch.map((post) => (
            <li
              key={post.id}
              className="list-group-item d-flex align-items-center hover-highlight"
            >
              <img
                src={blazer1}
                alt=""
                className="rounded-circle me-2 avatar3"
              />
              {post.id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
