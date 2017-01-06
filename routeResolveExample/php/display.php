<?php
include("config.php");
$result=mysql_query("SELECT * FROM student") or die(mysql_error());
$arr=array();
$comment_count=mysql_num_rows($result);

if($comment_count!=0)
{
while($row=mysql_fetch_assoc($result))
	{
		$arr[]=$row;
		
	}
	echo $json_response=json_encode($arr);	
}


?>