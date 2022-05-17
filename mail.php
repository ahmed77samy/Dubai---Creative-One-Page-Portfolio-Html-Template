<?php

//Taking all values
$name 		= $_POST['name'];
$email 		= $_POST['email'];
$message 		= $_POST['message'];
$output 	= "Name: ".$name."\n\nEmail: ".$email."\n\nMessage: ".$message;

$to 		= 'ahmed0salma.sa@gmail.com';
$headers	= 'FROM: "'.$email.'"';

$send		= mail($to, $name, $output."\n\n***This message has been sent from Dubai", $headers);
?>