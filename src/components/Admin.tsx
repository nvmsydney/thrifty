import React, { useState, useEffect } from "react";

interface Post {
  username: string;
}

const Admin = () => {
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
          username: usernameArray[0],
        }));
        setUsernameSearch(posts);
      } else {
        setUsernameSearch([]);
      }
    };
    searchUser();
  }, [searchItem]);

  const handleBan = async (userId: string) => {
    console.log("Banning user with ID:", userId);
    const response = await fetch(
      "https://www.cmsc508.com/~24SP_jacksonja13/API.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "BanUser",
          username: userId,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      console.log("User banned successfully.");
      setUsernameSearch((prev) => prev.filter((user) => user.username !== userId));
    } else {
      console.error("Failed to ban user:", data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50">
        <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
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
              key={post.username}
              className="list-group-item d-flex justify-content-between align-items-center hover-highlight"
            >
              <div className="d-flex align-items-center">

                {post.username}
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleBan(post.username)}
              >
                Ban
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
