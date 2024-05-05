import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { nullable } from "zod";

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
      const response = await fetch("https://www.cmsc508.com/~24SP_jacksonja13/API.php", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "S",
          username: searchItem
        })
      });
      const data = await response.json();
      if (data.success) {
        const posts = data.usernames.map((usernameArray: any[]) => ({
          id: usernameArray[0], 
        }));
        setUsernameSearch(posts);
      }
      else {
        setUsernameSearch([]);
      }
    };
    searchUser();
  }, [searchItem]);

  return (
    <div>
      <input name="search" value={searchItem} onChange={handleChange} />
      <Table>
        <tbody>
          {usernameSearch.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SearchBar;
