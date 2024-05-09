import { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// add the photo in our directory and i have to insert a post into our database
const AppPost = () => {
const [image, setImage] = useState("");
const [bodyText, setBodyText] = useState("");
const navigate = useNavigate();

    const handleIamgeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result! as string); 
        }
        if(file){
            reader.readAsDataURL(file);
        }
    }

    const handleChange = (event: { target: {name: any; value: any; }; }) => {
        const {name, value } = event.target;
      
        if (name ==="bodytext" ) {
            setBodyText(value);
        }

    }

    const handleSubmit = async (event: { preventDefault: () => void; }) =>{
        const username = sessionStorage.getItem('username') || '';

        try {
        event.preventDefault();
        const response = await fetch('https://www.cmsc508.com/~24SP_jacksonja13/API.php', {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                action: 'AddPost',
                username: username,
                photo_link:image,
                body_text:bodyText
            })
        });
        const data = await response.json();

        if(data.success){
            navigate("/~24SP_jacksonja13/community");
        }else{
            
        }
        }catch{
        }
    }
    return (
<div className="PostBox">
    <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Upload your image</Form.Label>
        <Form.Control type='file' accept='image/*' placeholder="wassup" name="image" onChange={handleIamgeChange}/>
        </Form.Group>
        <textarea rows={10} name="bodytext" value={bodyText} onChange={handleChange}></textarea>
        <Button type='submit'>submit</Button>
    </Form> 
</div>
)}
export default AppPost;