<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/languege');
$mail->IsHTML(true);

//From
$mail->setFrom('fdsafs', 'ANdrey');
// To
$mail->addAddress('AimDragMan2@yandex.ru');
//Theme
$mail->Subject = 'Hello';

$body = '<h1>IT is a letter</h1>';

if (trim(!empty($_POST['name']))) {
	$body .= '<p><strong>Name:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['phone']))) {
	$body .= '<p><strong>Phone:</strong> ' . $_POST['phone'] . '</p>';
}
if (trim(!empty($_POST['comment']))) {
	$body .= '<p><strong>Comment:</strong> ' . $_POST['comment'] . '</p>';
}

$mail->Body = $body;

//send
if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
