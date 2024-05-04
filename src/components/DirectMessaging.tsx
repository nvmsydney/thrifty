import { Button, Card } from "react-bootstrap";
import "./css/directmessage.css";
import { Key, useEffect, useState } from "react";
import { post } from "jquery";

interface item {
  id: number;
  messageGet: String;
}
const userCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("username="))
  ?.split("=")[1];
const DirectMessage = () => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    if ("message" === name) {
      setMessage(value);
    }
    if ("recipient" === name) {
      setRecipient(value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://www.cmsc508.com/~24SP_jacksonja13/API.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "DirectMessageSend",
            username: userCookie,
            recipient: recipient,
            message: message,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log("Message sent");
        const newMessage = {
          id: Date.now(), 
          usernameGet: userCookie,
          messageGet: message,
          recipientGet: recipient,
        };
        setMessagePost([...messagePost, newMessage]);
        setMessage("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  };
  const [messagePost, setMessagePost] = useState<item[]>([]);
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await fetch(
          "https://www.cmsc508.com/~24SP_jacksonja13/API.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "DirectMessageGet",
              usernameGet: userCookie,
              recipientGet: "nvmsydney",
            }),
          }
        );
        const data = await response.json();
        if (data.success) {
          const messageInfo = data.messageGot.map(
            (messageInfoArray: any[][]) => ({
              id: messageInfoArray[0][0],
              usernameGet: messageInfoArray[0][1],
              messageGet: messageInfoArray[0][2],
              recipientGet: messageInfoArray[0][3],
              timestamp: messageInfoArray[0][4],
            })
          );
          setMessagePost(messageInfo);
        } else {
        }
      } catch {}
    };
    getMessage();
  }, []);

  return (
    <div className="messageOutlay">
      <Card>
        <Card.Body>
          <label className="prompt">Who do you want to send this to?</label>
          <input
            name="recipient"
            className="inputs"
            required
            value={recipient}
            onChange={handleChange}
            placeholder="Recipient Username"
          ></input>
          <div className="boxForMessage">
            {messagePost.map((item) => (
              <Card className="messageInBox" key={item.id}>
                <Card.Body>
                  <Card.Text>{item.messageGet}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Card.Body>
        <div className="messageSender">
          <textarea
            className="input2"
            name="message"
            required
            value={message}
            placeholder="Type your message"
            onChange={handleChange}
          ></textarea>
          <Button variant="btn btn-dark" className="buttons2" onClick={handleSubmit}>Send</Button>
        </div>
      </Card>
    </div>
  );
};
export default DirectMessage;
