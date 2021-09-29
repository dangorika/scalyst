<?php
$date = date("d.m.y");
$time = date("H:i");
//Script Foreach
$c = true;
$project_name = trim($_POST["project_name"]);
$admin_email  = trim($_POST["admin_email"]);
$form_subject = trim($_POST["form_subject"]);
foreach ( $_POST as $key => $value ) {
  if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
    $message .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>";
    $form_data = "$key: $value";
  };
};
$message = "<table style='width: 100%;'>
<tr><td colspan='2' style='padding: 10px; border: #e9e9e9 1px solid;'>
<b>$date $time</b></td></tr>$message</table>";
function adopt($text) {
  return '=?UTF-8?B?'.Base64_encode($text).'?=';
}
$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers );

$fp = fopen("data.txt", "a+");
fwrite($fp, "\r\n -----------------");
fwrite($fp, "\r\n $date $time");
foreach ($_POST as $key => $value) {
  if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
    fwrite($fp,"\r\n $key: $value");
  };
};
fwrite($fp, "\r\n -----------------");
fclose($fp);
