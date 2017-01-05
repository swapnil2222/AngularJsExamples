<?php
include("config.php");
$query="SELECT * FROM student";
$result=mysql_query($query);
$arr=array();
$count=mysql_num_rows($result);
if($result!=0){
	while($row=mysql_fetch_assoc($result)){
		$arr[]=$row;
		}
		echo $json_response=json_encode($arr);
}


?>