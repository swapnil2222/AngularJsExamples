<?php
include("config.php");
$data=json_decode(file_get_contents("php://input"));
$name=$data->name;
$value=$name."%";
$arr=array();
$result=mysql_query("SELECT * FROM student WHERE name like'$value'");
$count=mysql_num_rows($result);
if($count!=0){
	while($row=mysql_fetch_assoc($result)){
		$arr[]=$row;
	}
	echo $json_response=json_encode($arr);
}

?>

