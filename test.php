<?php
include "./db_config.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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

                
                $stmt=$conn->prepare(
                    "SELECT p.post_id as post_id, p.gender
                    FROM post p
                    WHERE p.photo_link = :photo_link && p.username = :username 
                    ORDER BY p.post_id DESC"   
                );
                $stmt->bindValue(':photo_link', $packet_data['photo_link']);
                $stmt->bindValue(':username', $packet_data['username']);
                $stmt->execute();
                $temp=$stmt->fetch();

                $stmt=$conn->prepare("INSERT INTO selling_clothes_post(post_id, title, body_text) VALUES (:post_id, :title, :body_text)");
                $stmt->bindValue(':post_id', $temp['post']);
                $stmt->bindValue(':title', $packet_data['title']);
                $stmt->bindValue(':body_text', $packet_data['body_text']);
                $stmt->execute();

                $stmt=$conn->prepare("INSERT INTO clothes(gender, post_id) VALUES (:gender, :post_id) ");
                $stmt->bindValue(':gender', $temp['gender']);
                $stmt->bindValue(':post_id', $temp['post_id']);
                $stmt->execute();
            
            echo json_encode(array('success' => true));
        } catch (PDOException $e){
            // Connection failed
            echo json_encode(array('success' => false, 'message' => 'Connection failed: ' . $e->getMessage()));
            exit();
        }
    }
    SellPost();
}