<?php

if(true){
	$to = 'ahmed0salma.sa@gmail.com';
	$subject = 'Callback';
	$message = '
			<html>
				<head>
					<title>Call me back</title>
				</head>
				<body>
					<p><b>Name:</b> '.$_POST['name'].'</p>
					<p><b>email:</b> '.$_POST['email'].'</p>                        
					<p><b>message:</b> '.$_POST['message'].'</p>                        
				</body>
			</html>'; 
	$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
	$headers .= "From: Site <info@mail.com>\r\n"; 
	mail($to, $subject, $message, $headers);

	echo json_encode(array('status' => 'success'));
} else {
	echo json_encode(array('status' => 'error'));
}

?>