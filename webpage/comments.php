<html>
<body>

<?php
$myFile = fopen("commentlog.txt","a");
$txt = $_POST["comment"] . ", " . $_POST["lat"] . ", " . $_POST["lon"] . "<br>\n";
fwrite($myFile, $txt);
fclose($myFile);
header("Location: index.php");
die();
?>

</body>
</html>