<?php
// Start or resume session variables
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');


session_start();

// Parameters of the MySQL connection 
$servername = "cmsc508.com";
$username = "24SP_jacksonja13";
$password = "V00962619";
$database = "24SP_jacksonja13_pr";

try {
    // Establish a connection with the MySQL server
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
} catch (PDOException $e) {
    // Connection failed
    echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
    exit();
}
$data = file_get_contents("php://input");
$packet_data = json_decode($data, true);

// If the email and password are received from the login form
if (isset($packet_data['email']) && isset($packet_data['password'])) {

    $email = $packet_data['email'];
    $password = password_hash($packet_data['password'], PASSWORD_DEFAULT);

    try {
        // Prepare SQL statement to fetch user's credentials
        $stmt = $conn->prepare("SELECT username, password, email, bio, gender FROM user WHERE email=:email");
        $stmt->bindValue(':email', $email);
        $stmt->execute();
        
        $user = $stmt->fetch();
        $username = $user['username'];
        $userpass = $user['password'];

        // Verify password submitted by the user with the hash stored in the database
        if ( !empty($user) && password_verify($packet_data['password'], $user['password'])) {
            // Login successful
           
            $_SESSION['username'] = $user['username'];
            $_SESSION['bio'] = $user['bio'];
            $_SESSION['email'] = $user['email'];

            echo json_encode(array('success' => true, 'username' => $_SESSION['username'], 'email' => $_SESSION['email'], 'bio' => $_SESSION['bio']));
            exit();
        } else {
            // Invalid email or password
            
            echo json_encode(array('success' => false, 'message' => $_SESSION['username']));
            exit();
        }       
    } catch (PDOException $e) {
        // Database error
        echo json_encode(array('success' => false, 'message' => 'Database error: ' . $e->getMessage()));
        exit();
    }
} else {
    // Email or password not received
    echo json_encode(array('success' => false, 'message' => 'Email or password not received'));
    exit();
}
function sign_up(){

    try {
        // Establish a connection with the MySQL server
        $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch (PDOException $e) {
        // Connection failed
        echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
        exit();
    }
    $data = file_get_content("php://input");
    $packet_data =  json_decode($data, 'true');

    if (isset($packet_data['username']) && isset($packet_data['password']) && isset($packet_data['email'])) {
 try {
    $stmt = $conn->prepare("INSERT INTO user (username, email, bio, prof_pic, gender, followers, following, password)
                            VALUES (:username, :email, :bio, :prof_pic, :gender, :followers, :following, :password )");

    $stmt->bindValue(':username', $packet_data['username']);
    $stmt->bindValue(':email', $packet_data['email']);
    $stmt->bindValue(':bio', $packet_data['bio']);
    $stmt->bindValue(':prof_pic', " ");
    $stmt->bindValue(':gender', $packet_data['gender']);
    $stmt->bindValue(':followers', NULL);
    $stmt->bindValue(':following', NULL);
    $stmt->bindValue(':password', password_hash($packet_data['password'], PASSWORD_DEFAULT ));
    
    
    $stmt->execute();
    

    exit();
} catch(PDOExeception $e){
    echo 'something wrong';
}
    }
}
?>

