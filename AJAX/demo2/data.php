<?php
	$type = $_GET["type"];
	if($type == "yanzheng")
	{
		$uname = $_GET["uname"];
		if($uname == "kwooshung" || $uname == "w3cfuns")
		{
			echo "1";
		}
	}
	else if($type == "uinfo")
	{
		$uname = $_GET["uname"];
		$email = $_GET["email"];
		$mobile = $_GET["mobile"];
		$pwd = md5($_GET["pwd"]);
		
		echo 
		'
			{
				"uname":"'.$uname.'",
				"email":"'.$email.'",
				"mobile":"'.$mobile.'",
				"pwd":"'.$pwd.'"
			}
		';
	}
?>