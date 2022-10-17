<?php

include('connection.php');

/*striplashes function can be used to clean up data retrived from a database 
or from an HTML form*/

/* php://input -> This is a read-only stream that allows us to read raw data
from the request body. It returns all the raw data after the Http-headers of 
the request, regardless of the content type */

/* json_decode -> It takes JSON string and converts it into a php object or array
if true then associative array */

$data = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata['id'];
$name = $mydata['name'];
$email = $mydata['email'];
$password = $mydata['password'];



//Insert and update data
if(!empty($name) && !empty($email) && !empty($password)){
    $sql = "INSERT INTO employee(id, name, email, password) VALUES ('$id', '$name', '$email', '$password') ON DUPLICATE KEY UPDATE name='$name', email='$email', password='$password'";
    if($conn->query($sql) == TRUE){
        echo "Employee Saved Successfully";
    } else{
        echo "Unable to save employee";
    }
}else{
    echo "All Fields Are Required";
}


?>