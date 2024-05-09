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
            $stmt->bindValue(':password', password_hash(base64_decode($packet_data['password']), PASSWORD_DEFAULT));
            $stmt->execute();

            $username = $packet_data['username'];

            $stmt = $conn->prepare("INSERT INTO measurment (username_measurment, arm_length, body_height, bust_girth, foot_length, head_circumference, hip_measurments, leg_length, neck_size, shoe_size, shoulder_width)
                                    VALUES (:username_measurment, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)");
                                    
            $stmt->bindValue(':username_measurment', $username);
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

            $post_id = $conn->lastInsertId();

            $stmt=$conn->prepare("INSERT INTO be_real_post (post_id) VALUES (:post_id)");
            $stmt->bindValue(':post_id', $post_id);

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
                "SELECT 
                p.post_id as post_id,
                p.photo_link as photo,
                u.bio as bio,
                brp.post_id as be_real_post_id
            FROM 
                post p 
            LEFT JOIN 
                user u ON u.username = p.username
            INNER JOIN 
                be_real_post brp ON brp.post_id = p.post_id
            WHERE 
                p.username = :username");

            $stmt->bindValue(':username', $packet_data['username']);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(array('success' => true, 'profilePost' => $result));
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
        b.size,
        d.size,
        CASE WHEN a.clothes_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS is_accessory,
        bg.size,
        f.size,
        h.size,
        o.size,
        t.size,
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
        b.size,
        d.size,
        CASE WHEN a.clothes_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS is_accessory,
        bg.size,
        f.size,
        h.size,
        o.size,
        t.size,
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
            $stmt=$conn->prepare(
                "INSERT INTO post (photo_link, body_text, username) VALUES (:photo_link, :body_text, :username)");
            $stmt->bindValue(':photo_link', $packet_data['photo_link']);
            $stmt->bindValue(':body_text', $packet_data['body_text']);
            $stmt->bindValue(':username', $packet_data['username']);
            $stmt->execute();

            $post_id = $conn->lastInsertId();

            $stmt=$conn->prepare(
                "INSERT INTO selling_clothes_post (post_id, body_text, title) VALUES (:post_id, :body_text, :title)");
            $stmt->bindValue(':post_id', $post_id);
            $stmt->bindValue(':body_text', $packet_data['body_text']); // Assuming same body text for selling_clothes_post
            $stmt->bindValue(':title', $packet_data['title']);
            $stmt->execute();

            $stmt = $conn->prepare("INSERT INTO clothes (gender, post_id) VALUES (:gender, :post_id)");
            $stmt->bindValue(':gender', $packet_data['gender']);
            $stmt->bindValue(':post_id', $post_id);
            $stmt->execute();

            $stmt = $conn->prepare("SELECT clothes_id FROM clothes WHERE post_id = :post_id");
            $stmt->bindValue(':post_id', $post_id);
            $stmt->execute();
            $clothes_result = $stmt->fetch(PDO::FETCH_ASSOC);
            $clothes_id = $clothes_result['clothes_id'];

            $category = strtolower($packet_data['category']);

            $stmt = $conn->prepare("INSERT INTO $category (clothes_id, size) VALUES (:clothes_id, :size)");
            $stmt->bindValue(':clothes_id', $clothes_id);
            $stmt->bindValue(':size', $packet_data['size']);
            $stmt->execute();

            echo json_encode(array('success' => true));
        } catch (PDOException $e){
            echo json_encode(array('success' => false, 'message' => 'Insertion failed: ' . $e->getMessage()));
            exit();
        }
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
        b.size,
        d.size,
        CASE WHEN a.clothes_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS is_accessory,
        bg.size,
        f.size,
        h.size,
        o.size,
        t.size,
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

function UpdatePicAndBio() {
    $conn = getDB();
    $data = file_get_contents("php://input");
    $packet_data = json_decode($data, true);

    try {
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->beginTransaction();

        $stmt = $conn->prepare("UPDATE user
        SET bio = :bio, prof_pic = :prof_pic
        WHERE username = :username");

        $stmt->bindValue(':bio', $packet_data['bio']);
        $stmt->bindValue(':prof_pic', $packet_data['prof_pic']);
        $stmt->bindValue(':username', $packet_data['username']);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $conn->commit();
            echo json_encode(['success' => true, 'message' => "Account updated successfully"]);
        } else {
            $conn->rollback();
            echo json_encode(['success' => false, 'message' => "No changes made"]);
        }

    } catch (PDOException $e) {
        $conn->rollback();
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}

function UpdateMeasurements() {
    $conn = getDB();
    $data = file_get_contents("php://input");
    $packet_data = json_decode($data, true);

    try {
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->beginTransaction();
    

        $stmt = $conn->prepare("UPDATE measurment
        SET head_circumference = :head_circumference, shoulder_width = :shoulder_width,
        neck_size = :neck_size, hip_measurments = :hip_measurments, arm_length = :arm_length,
        leg_length = :leg_length, foot_length = :foot_length, body_height = :body_height,
        shoe_size = :shoe_size, bust_girth = :bust_girth
        WHERE username_measurment = :username");

        $username = $packet_data['username_measurment'];

        print("Head Circumference: " . $packet_data['head_circumference'] . "\n");
        print("Shoulder Width: " . $packet_data['shoulder_width'] . "\n");
        print("Neck Size: " . $packet_data['neck_size'] . "\n");
        print("Hip Measurements: " . $packet_data['hip_measurments'] . "\n");
        print("Arm Length: " . $packet_data['arm_length'] . "\n");
        print("Leg Length: " . $packet_data['leg_length'] . "\n");
        print("Foot Length: " . $packet_data['foot_length'] . "\n");
        print("Body Height: " . $packet_data['body_height'] . "\n");
        print("Shoe Size: " . $packet_data['shoe_size'] . "\n");
        print("Bust Girth: " . $packet_data['bust_girth'] . "\n");
        print("Username: " . $username . "\n");

        $stmt->bindValue(':head_circumference', $packet_data['head_circumference']);
        $stmt->bindValue(':shoulder_width', $packet_data['shoulder_width']);
        $stmt->bindValue(':neck_size', $packet_data['neck_size']);
        $stmt->bindValue(':hip_measurments', $packet_data['hip_measurments']);
        $stmt->bindValue(':arm_length', $packet_data['arm_length']);
        $stmt->bindValue(':leg_length', $packet_data['leg_length']);
        $stmt->bindValue(':foot_length', $packet_data['foot_length']);
        $stmt->bindValue(':body_height', $packet_data['body_height']);
        $stmt->bindValue(':shoe_size', $packet_data['shoe_size']);
        $stmt->bindValue(':bust_girth', $packet_data['bust_girth']);
        $stmt->bindValue(':username', $username);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $conn->commit();
            echo json_encode(['success' => true, 'message' => "Account updated successfully"]);
        } else {
            $conn->rollback();
            echo json_encode(['success' => false, 'message' => "No changes made"]);
        }

    } catch (PDOException $e) {
        $conn->rollback();
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
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
if (!empty($globalFunctionCall['action']) && $globalFunctionCall['action'] == 'SellPost') {
    SellPost();
}
if (!empty($globalFunctionCall['action']) && $globalFunctionCall['action'] == 'GetClothingDetails') {
    GetClothingDetails();
}
if (!empty($globalFunctionCall['action']) && $globalFunctionCall['action'] == 'GetUsers') {
    GetUsers();
}
if (!empty($globalFunctionCall['action']) && $globalFunctionCall['action'] == 'UpdatePicAndBio') {
    UpdatePicAndBio();
}
if (!empty($globalFunctionCall['action']) && $globalFunctionCall['action'] == 'UpdateMeasurements') {
    UpdateMeasurements();
}
?>