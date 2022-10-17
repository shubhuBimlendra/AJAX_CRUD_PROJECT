<?php

include('connection.php');

$data  = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);

$id = $mydata['eid'];

//Deleting Employee
if(!empty($id)){
    $sql = "DELETE FROM employee WHERE id={$id}";
    if($conn->query($sql) == TRUE){
        echo 1;
    } else{
        echo 0;
    }
}


?>