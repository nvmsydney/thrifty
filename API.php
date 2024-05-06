<?php
include "./db_config.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$funcall = file_get_contents("php://input");
$globalFunctionCall = json_decode($funcall, 'true');

function sign_up() {
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
        exit();
    }

    $data = file_get_contents("php://input");
    $packet_data = json_decode($data, true);

    if (isset($packet_data['username'], $packet_data['email'])) {
        $check = $conn->prepare("SELECT COUNT(*) FROM user WHERE username = :username OR email = :email");
        $check->execute([':username' => $packet_data['username'], ':email' => $packet_data['email']]);
        if ($check->fetchColumn() > 0) {
            echo json_encode(['success' => false, 'message' => 'Username or Email already exists.']);
            exit();
        }

        try {
            $stmt = $conn->prepare("INSERT INTO user (username, email, bio, prof_pic, gender, followers, following, password)
                                    VALUES (:username, :email, :bio, '', :gender, NULL, NULL, :password)");
            $stmt->bindValue(':username', $packet_data['username']);
            $stmt->bindValue(':email', $packet_data['email']);
            $stmt->bindValue(':bio', $packet_data['bio']);
            $stmt->bindValue(':gender', $packet_data['gender']);
            $stmt->bindValue(':password', password_hash($packet_data['password'], PASSWORD_DEFAULT));
            $stmt->execute();
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
    }
}

function AddPost () {
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch (PDOException $e) {
        // Connection failed
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
        exit();
    }

    $data = file_get_contents("php://input");
    $packet_data = json_decode($data, true);
    
    if (true) {
        try {
            $stmt = $conn->prepare("INSERT INTO post (photo_link, body_text,username) VALUES (:photo_link, :body_text,:username) "); 
            $stmt->bindValue(':photo_link',$packet_data['photo_link']);
            $stmt->bindValue(':body_text', $packet_data['body_text']);
            $stmt->bindValue(':username', $packet_data['username']);
            $stmt->execute();
            echo json_encode(array('success' => true));
        } catch (PDOException $e) {
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
        }
    }
}

function GetPostInfo(){
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch (PDOException $e) {
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
         exit();
    }
    
    $data = file_get_contents("php://input");
    $packet_data = json_decode($data, true);

    if(isset($packet_data)){
        try {
        $stmt = $conn->prepare("SELECT u.username as username, u.prof_pic as prof_pic, brp.post_id, p.body_text as body_text, p.photo_link as photo_link
        FROM user u join post p ON u.username = p.username JOIN be_real_post brp on p.post_id = brp.post_id;");
        $stmt->execute();
        
        while ($row =$stmt->fetch()) {
         $temp[] = array([$row['post_id'], $row['username'], $row['prof_pic'],$row['photo_link'] ]);
        
        }
        echo json_encode(array('success'=> true, 'post'=> $temp));
        } catch(PDOException $e) {
        }
    }
}

function DirectMessageSend(){
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch (PDOException $e) {
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
        exit();
    }

    $data = file_get_contents("php://input");
    $packet_data = json_decode($data, true);

    if(isset($packet_data)){
        try {
            $message_stmt = $conn->prepare("INSERT INTO message( sender_username, recipient_username, timestamp, message_body) VALUES (:sender_username, :recipient_username, CURRENT_TIMESTAMP,:message_body)");
            $message_stmt->bindValue(":recipient_username", $packet_data['recipient']);
            $message_stmt->bindValue(":message_body", $packet_data['message']);
            $message_stmt->bindValue(":sender_username", $packet_data['username']);
            $message_stmt->execute();
            echo json_encode(array("success" => true,));
        } catch (PDOException $e2) {
                echo "Error: " . $e2->getMessage();
        }
    }
}

function DirectMessageGet(){
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch (PDOException $e) {
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
        exit();
    }
    
    $data = file_get_contents("php://input");
    $packet_data = json_decode($data, true);

    if(isset($packet_data)){
        try {
            $stmt=$conn->prepare(
            "SELECT m.sender_username as username, m.recipient_username as recipient, m.message_id as post_id, m.message_body as message, m.timestamp as time
            FROM message m 
            where ((m.sender_username = :username) && (m.recipient_username = :recipient)) or ((m.sender_username = :recipient) && (m.recipient_username = :username))
            ORDER BY m.timestamp");
            $stmt->bindValue(':username', $packet_data['usernameGet']);
            $stmt->bindValue(':recipient',$packet_data['recipientGet']);
            $stmt->execute();
            
            while ($row =$stmt->fetch()) {
            $temp[] = array([$row['post_id'], $row['username'], $row['message'],$row['recipient'], $row['time'] ]);
            }
            echo json_encode(array('success'=> true, 'messageGot'=> $temp));
        } catch(PDOException $e) {
            echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
            exit();
        }
    }
}

function LoginWithSession(){
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch (PDOException $e) {
        // Connection failed
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
        exit();
    }

    $data = file_get_contents("php://input");
    $packet_data = json_decode($data, true);
    
    if(isset($packet_data)){
        try {
            $stmt = $conn->prepare(
                "SELECT u.eamil as email, u.password as password
                FROM user u 
                WHERE u.email = :email
                    ");
            $stmt->BindValue(':email', $packet_data['email']);
            $row=$stmt->execute();
            echo json_encode(array('success'=> true, 'email'=>$row['email'], 'password'=>$row['passwrod']));
        } catch(PDOExeception $e){
            echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
            exit();
        }
    }
}

function GetUserPost(){
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch (PDOException $e) {
        // Connection failed
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
        exit();
    }
    
    $data = file_get_contents("php://input");
    $packet_data = json_decode($data, true);

    if(isset($packet_data)){
        try {
            $stmt=$conn->prepare(
                "SELECT p.post_id as post_id, p.photo_link as photo, p.body_text as caption
                    FROM post p
                    WHERE p.username = :username");
            $stmt->bindValue(':username', $packet_data['username']);
            $stmt->execute();
            $row=$stmt->execute();
            while ($row =$stmt->fetch()){
                $temp[] = array([$row['post_id'], $row['photo'], $row['caption']]);
            }
            echo json_encode(array('success' => true, 'profilePostObjec' => $temp));
        } catch (PDOException $e){
            // Connection failed
            echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
            exit();
        }
    }
}


function GetMensClothing() {
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT 
        c.clothes_id,
        c.gender,
        p.body_text as original_body_text,  
        s.body_text as selling_body_text,
        s.title as selling_title,
        p.photo_link,
        p.username,
        b.bottom_size,
        d.dress_size,
        CASE WHEN a.clothes_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS is_accessory,
        bg.bag_size,
        f.footwear_size,
        h.headwear_size,
        o.outerwear_size,
        t.top_size,
        CASE 
            WHEN t.clothes_id IS NOT NULL THEN 'Tops'
            WHEN b.clothes_id IS NOT NULL THEN 'Bottoms'
            WHEN d.clothes_id IS NOT NULL THEN 'Dresses'
            WHEN bg.clothes_id IS NOT NULL THEN 'Bags'
            WHEN f.clothes_id IS NOT NULL THEN 'Footwear'
            WHEN h.clothes_id IS NOT NULL THEN 'Headwear'
            WHEN o.clothes_id IS NOT NULL THEN 'Outerwear'
            ELSE 'Unknown'
        END AS category
    FROM 
        clothes c
    JOIN 
        post p ON c.post_id = p.post_id
    LEFT JOIN 
        selling_clothes_post s ON p.post_id = s.post_id
    LEFT JOIN 
        tops t ON c.clothes_id = t.clothes_id
    LEFT JOIN 
        bottoms b ON c.clothes_id = b.clothes_id
    LEFT JOIN 
        dress d ON c.clothes_id = d.clothes_id
    LEFT JOIN 
        accessories a ON c.clothes_id = a.clothes_id
    LEFT JOIN 
        bags bg ON c.clothes_id = bg.clothes_id
    LEFT JOIN 
        footwear f ON c.clothes_id = f.clothes_id
    LEFT JOIN 
        headwear h ON c.clothes_id = h.clothes_id
    LEFT JOIN 
        outerwear o ON c.clothes_id = o.clothes_id
    WHERE
        c.gender = 'male'";

        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array('success' => true, 'products' => $result));
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
    }
}

function S(){
    try {
            // Establish a connection with the MySQL server
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
        } catch (PDOException $e) {
            // Connection failed
            echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
            exit();
        }
    

        $data = file_get_contents("php://input");
        $packet_data = json_decode($data, true);

        if(isset($packet_data)){
            try {
                $stmt=$conn->prepare(
                    "SELECT p.username as username
                     FROM user p
                     WHERE p.username LIKE CONCAT(:username, '%')");
                $stmt->bindValue(':username', $packet_data['username']);
                $stmt->execute();
                
                while ($row =$stmt->fetch()){
                    $temp[] = array($row['username']);
                }
                echo json_encode(array('success' => true, 'usernames' => $temp ));
            } catch (PDOException $e){
                   // Connection failed
            echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
            exit();
            }
    }
}

function GetWomensClothing() {
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT 
        c.clothes_id,
        c.gender,
        p.body_text as original_body_text,
        s.body_text as selling_body_text,
        s.title as selling_title,
        p.photo_link,
        p.username,
        b.bottom_size,
        d.dress_size,
        CASE WHEN a.clothes_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS is_accessory,
        bg.bag_size,
        f.footwear_size,
        h.headwear_size,
        o.outerwear_size,
        t.top_size,
        CASE 
            WHEN t.clothes_id IS NOT NULL THEN 'Tops'
            WHEN b.clothes_id IS NOT NULL THEN 'Bottoms'
            WHEN d.clothes_id IS NOT NULL THEN 'Dresses'
            WHEN bg.clothes_id IS NOT NULL THEN 'Bags'
            WHEN f.clothes_id IS NOT NULL THEN 'Footwear'
            WHEN h.clothes_id IS NOT NULL THEN 'Headwear'
            WHEN o.clothes_id IS NOT NULL THEN 'Outerwear'
            ELSE 'Unknown'
        END AS category
    FROM 
        clothes c
    JOIN 
        post p ON c.post_id = p.post_id
    LEFT JOIN 
        selling_clothes_post s ON p.post_id = s.post_id
    LEFT JOIN 
        tops t ON c.clothes_id = t.clothes_id
    LEFT JOIN 
        bottoms b ON c.clothes_id = b.clothes_id
    LEFT JOIN 
        dress d ON c.clothes_id = d.clothes_id
    LEFT JOIN 
        accessories a ON c.clothes_id = a.clothes_id
    LEFT JOIN 
        bags bg ON c.clothes_id = bg.clothes_id
    LEFT JOIN 
        footwear f ON c.clothes_id = f.clothes_id
    LEFT JOIN 
        headwear h ON c.clothes_id = h.clothes_id
    LEFT JOIN 
        outerwear o ON c.clothes_id = o.clothes_id
    WHERE
        LOWER(c.gender) = 'female'";

        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array('success' => true, 'products' => $result));
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
    }
}


function GetClothingDetails() {
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $data = json_decode(file_get_contents("php://input"), true);
        $clothesID = $data['clothes_id'];

        $query = "SELECT 
        c.clothes_id,
        c.gender,
        p.body_text AS original_body_text,
        p.photo_link,
        p.username,
        b.bottom_size,
        d.dress_size,
        CASE WHEN a.clothes_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS is_accessory,
        bg.bag_size,
        f.footwear_size,
        h.headwear_size,
        o.outerwear_size,
        t.top_size,
        s.title,
        s.body_text as selling_text,
        scpo.price,
        CASE 
            WHEN t.clothes_id IS NOT NULL THEN 'Tops'
            WHEN b.clothes_id IS NOT NULL THEN 'Bottoms'
            WHEN d.clothes_id IS NOT NULL THEN 'Dresses'
            WHEN bg.clothes_id IS NOT NULL THEN 'Bags'
            WHEN f.clothes_id IS NOT NULL THEN 'Footwear'
            WHEN h.clothes_id IS NOT NULL THEN 'Headwear'
            WHEN o.clothes_id IS NOT NULL THEN 'Outerwear'
            ELSE 'Unknown'
        END AS category
    FROM 
        clothes c
    JOIN 
        post p ON c.post_id = p.post_id
    LEFT JOIN 
        selling_clothes_post s ON p.post_id = s.post_id
    LEFT JOIN 
        bottoms b ON c.clothes_id = b.clothes_id
    LEFT JOIN 
        dress d ON c.clothes_id = d.clothes_id
    LEFT JOIN 
        accessories a ON c.clothes_id = a.clothes_id
    LEFT JOIN 
        bags bg ON c.clothes_id = bg.clothes_id
    LEFT JOIN 
        footwear f ON c.clothes_id = f.clothes_id
    LEFT JOIN 
        headwear h ON c.clothes_id = h.clothes_id
    LEFT JOIN 
        outerwear o ON c.clothes_id = o.clothes_id
    LEFT JOIN 
        tops t ON c.clothes_id = t.clothes_id
    LEFT JOIN 
        clothesID_sellingClothes_postOrder_user scpo ON c.clothes_id = scpo.clothes_id
    WHERE
        c.clothes_id = ?";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(1, $clothesID, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array('success' => true, 'products' => $result));
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
}
}

function GetUsers() {
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT * FROM user";

        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(array('success' => true, 'users' => $result));
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
    }
}


function SellPost(){
    try {
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch (PDOException $e) {
        // Connection failed
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
        exit();
    }
    
    $data = file_get_contents("php://input");
    $packet_data = json_decode($data, true);

    if(isset($packet_data)){
        try {
            // Insert into post table
            $stmt=$conn->prepare(
                "INSERT INTO post (photo_link, body_text, username) VALUES (:photo_link, :body_text, :username)");
            $stmt->bindValue(':photo_link', $packet_data['photo_link']);
            $stmt->bindValue(':body_text', $packet_data['body_text']);
            $stmt->bindValue(':username', $packet_data['username']);
            $stmt->execute();

            // Get the post_id of the inserted post
            $post_id = $conn->lastInsertId();

                
            // Insert into selling_clothes_post table
            $stmt=$conn->prepare(
                "INSERT INTO selling_clothes_post (post_id, body_text, title) VALUES (:post_id, :body_text, :title)");
            $stmt->bindValue(':post_id', $post_id);
            $stmt->bindValue(':body_text', $packet_data['body_text']); // Assuming same body text for selling_clothes_post
            $stmt->bindValue(':title', $packet_data['title']);
            $stmt->execute();

            // Insert into clothes table
            $stmt = $conn->prepare("INSERT INTO clothes (gender, post_id) VALUES (:gender, :post_id)");
            $stmt->bindValue(':gender', $packet_data['gender']);
            $stmt->bindValue(':post_id', $post_id);
            $stmt->execute();

            $clothes_id = $conn->lastInsertId();

            $valid_categories = ['tops', 'dresses', 'bottoms', 'outerwear', 'headwear', 'shoes', 'accessories', 'bags'];

            // Fetch the category from packet_data and check if it is valid
            $category = $packet_data['category'];

            if ($category == 'bottoms') {
                $stmt = $conn->prepare("INSERT INTO bottoms (clothes_id, size) VALUES (:clothes_id, :size)");
                $stmt->bindValue(':clothes_id', $clothes_id);
                $stmt->bindValue(':size', $packet_data['size']); // Ensure that 'size' is provided
                $stmt->execute();
            }

            echo json_encode(array('success' => true));
        } catch (PDOException $e){
            echo json_encode(array('success' => false, 'message' => 'Insertion failed: ' . $e->getMessage()));
            exit();
        }
    }
}
function DeletePost($clothesId) {
    $pdo = getDB();

    try {
        $pdo->beginTransaction();

        $queries = [
            "DELETE FROM accessories WHERE clothes_id = :clothes_id",
            "DELETE FROM bottoms WHERE clothes_id = :clothes_id",
            "DELETE FROM dress WHERE clothes_id = :clothes_id",
            "DELETE FROM bags WHERE clothes_id = :clothes_id",
            "DELETE FROM footwear WHERE clothes_id = :clothes_id",
            "DELETE FROM headwear WHERE clothes_id = :clothes_id",
            "DELETE FROM outerwear WHERE clothes_id = :clothes_id",
            "DELETE FROM tops WHERE clothes_id = :clothes_id",
            "DELETE FROM clothes WHERE clothes_id = :clothes_id",
            "DELETE FROM post WHERE post_id IN (SELECT post_id FROM clothes WHERE clothes_id = :clothes_id)"
        ];

        foreach ($queries as $query) {
            $stmt = $pdo->prepare($query);
            $stmt->execute(['clothes_id' => $clothesId]);
        }

        $pdo->commit();
        echo json_encode(['success' => true, 'message' => "The item with ID $clothesId has been successfully deleted."]);
    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(['success' => false, 'message' => "Error deleting item: " . $e->getMessage()]);
    }
}

// API Action Call
if(!empty($globalFunctionCall['action']) && $globalFunctionCall['action']== 'SignUp') {
    sign_up();
}
if(!empty($globalFunctionCall['action']) && $globalFunctionCall['action']== 'AddPost') {
    AddPost();
}
if(!empty($globalFunctionCall['action']) && $globalFunctionCall['action']== 'GetPostInfo') {
    GetPostInfo ();
}
if(!empty($globalFunctionCall['action']) && $globalFunctionCall['action']== 'DirectMessageSend') {
    DirectMessageSend();
}
if(!empty($globalFunctionCall['action']) && $globalFunctionCall['action']== 'DirectMessageGet') {
    DirectMessageGet();
}
if(!empty($globalFunctionCall['action']) && $globalFunctionCall['action']== 'loginWithSession') {
    LoginWithSession();
}
if(!empty($globalFunctionCall['action']) && $globalFunctionCall['action']== 'S') {
    S();
}
if(!empty($globalFunctionCall['action']) && $globalFunctionCall['action']== 'GetUserPost') {
    GetUserPost();
}
if (!empty($globalFunctionCall['action']) && $globalFunctionCall['action'] == 'GetMensClothing') {
    GetMensClothing();
}
if (!empty($globalFunctionCall['action']) && $globalFunctionCall['action'] == 'GetWomensClothing') {
    GetWomensClothing();
}
if (!empty($globalFunctionCall['action']) && $globalFunctionCall['action'] == 'GetClothingDetails') {
    GetClothingDetails();
}
if (!empty($globalFunctionCall['action']) && $globalFunctionCall['action'] == 'GetUsers') {
    GetUsers();
}
if (!empty($globalFunctionCall['action']) && $globalFunctionCall['action'] == 'SellPost') {
    SellPost();
}
if (!empty($globalFunctionCall['action']) && $globalFunctionCall['action'] == 'DeletePost') {
    DeletePost($clothes_id);
}
?>