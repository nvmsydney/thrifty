import { Navigate } from "react-router-dom";
import { ReactNode, useState, useEffect } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const usernameCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="))
      ?.split("=")[1];

    const fetchAdminStatus = async () => {
      try {
        const response = await fetch(
          "https://www.cmsc508.com/~24SP_jacksonja13/API.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "GetAdminStatus",
              username: usernameCookie,
            }),
          }
        );
        const data = await response.json();
        console.log("API response:", data);
        if (data.success && data.is_admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Failed to fetch admin status:", error);
        setIsAdmin(false);
      }
    };

    fetchAdminStatus();
  }, []);

  if (isAdmin === undefined) {
    return <div>Loading... be patient</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/~24SP_jacksonja13/home" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
