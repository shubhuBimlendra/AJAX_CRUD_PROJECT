<?php

include('connection.php');

//When you click Edit Button below code get executed 
$data = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata['eid'];

//Retrieving Specific Employee Information
$sql = "SELECT * FROM employee where id = {$id}";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

//Returning Json Format Data as Responses to Ajax Call
echo json_encode($row);


?>