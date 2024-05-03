import { Button, Card} from "react-bootstrap";
import './css/directmessage.css';
import { Key, useEffect, useState } from "react";
import { post } from "jquery";

interface item
{
    id:number;
    messageGet:String;
}
const userCookie = document.cookie.split('; ').find((row) => row.startsWith('username='))?.split('=')[1];
const DirectMessage =() => {
    const [recipient, setRecipient] = useState("");
    const [message, setMessage] = useState("");

    const handleChange =(event: { target: { name: any; value: any; }; })=> {
        const {name,value} = event.target;
        if ('message' === name){
            setMessage(value);
        }
        if('recipient' === name){
            setRecipient(value);
        }
    }
const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try{
        const response = await fetch("https://www.cmsc508.com/~24SP_jacksonja13/API.php", {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                action: 'DirectMessageSend',
                username:userCookie,
                recipient: recipient,
                message: message,
            })

    });
    const data = await response.json();
    if(data.success) {
        console.log("True");
    }
    else{

    }
    }catch {

    }
}
    const [messagePost, setMessagePost] = useState<item[]>([]);
    useEffect(()=> {
        const getMessage = async () =>{
            try{
                const response = await fetch ("https://www.cmsc508.com/~24SP_jacksonja13/API.php",{ 
                    method:'POST',
                    headers:{'Content-Type':'application/json'}, 
                    body: JSON.stringify({
                        action:'DirectMessageGet',
                        usernameGet:userCookie,
                        recipientGet:'nvmsydney',
                    })
                });
                const data = await response.json()
                if (data.success){
                    const messageInfo = data.messageGot.map((messageInfoArray: any[][]) => ({
                    id: messageInfoArray[0][0],
                    usernameGet: messageInfoArray[0][1],
                    messageGet: messageInfoArray[0][2],
                    recipientGet:messageInfoArray[0][3],
                    timestamp: messageInfoArray[0][4]
                }));
                setMessagePost(messageInfo);
            }   else{

                }
            }catch{

                }
            }
            getMessage();
    },  []);

return(
    <div className="messageOutlay">
        <Card className="flex-grow-1" >
        <Card.Body>
            <label>Who do you want to send this to ?</label>
            <input name="recipient" required value={recipient} onChange={handleChange}></input>
            <div className="boxForMessage">
                {messagePost.map((item) => (
                <Card className="messageInBox" key={item.id}>
                <Card.Body>
                    <Card.Text>
                        {item.messageGet}<b></b>
                    </Card.Text>
                </Card.Body>
                </Card> 
                ))}
                
            </div>
        </Card.Body>
            
        
       
        <div className="messageSender">
            <textarea className = "input" name="message" required value={message} placeholder="Try out our messagenger" onChange={handleChange}></textarea>
        <Button className="mb-3" onClick={handleSubmit}>Send</Button>
        </div>
    </Card>
    </div>
);
}
export default DirectMessage