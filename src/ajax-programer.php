<?php
    $subject = 'Заявка с сайта';
    $mess = '';
    $mess .= '<hr>';
    if(isset($_POST['info'])) {
        $subject = $_POST['info'];
    }
    if(isset($_POST['name'])) {
        $name = substr(htmlspecialchars(trim($_POST['name'])), 0, 100);
        $mess .= '<b>Имя:</b>' . $name . '<br>';
    }
    if(isset($_POST['tel'])) {
        $tel = substr(htmlspecialchars(trim($_POST['tel'])), 0, 100);
        $mess .= '<b>Телефон:</b>' . $tel . '<br>';
    }
    if(isset($_POST['email'])) {
        $mail = substr(htmlspecialchars(trim($_POST['email'])), 0, 100);
        $mess .= '<b>Почта:</b>' . $mail . '<br>';
    }
    if(isset($_POST['social'])) {
        $social = substr(htmlspecialchars(trim($_POST['social'])), 0, 100);
        $mess .= '<b>Прифиль в социальной сети:</b>' . $social . '<br>';
    }
    if(isset($_POST['skype'])) {
        $skype = substr(htmlspecialchars(trim($_POST['skype'])), 0, 100);
        $mess .= '<b>Skype:</b>' . $skype . '<br>';
    }
    if(isset($_POST['passport'])) {
        $passport = substr(htmlspecialchars(trim($_POST['passport'])), 0, 100);
        $mess .= '<b>Серия и номер паспорта:</b>' . $passport . '<br>';
    }
    if(isset($_POST['bday'])) {
        $bday = substr(htmlspecialchars(trim($_POST['bday'])), 0, 100);
        $mess .= '<b>Дата рождения:</b>' . $bday . '<br>';
    }
    if(isset($_POST['post'])) {
        $post = substr(htmlspecialchars(trim($_POST['post'])), 0, 100);
        $mess .= '<b>Почтовый индекс:</b>' . $post . '<br>';
    }
    if(isset($_POST['city'])) {
        $city = substr(htmlspecialchars(trim($_POST['city'])), 0, 100);
        $mess .= '<b>Населенный пункт:</b>' . $city . '<br>';
    }
    if(isset($_POST['home'])) {
        $home = substr(htmlspecialchars(trim($_POST['home'])), 0, 100);
        $mess .= '<b>Улица, дом, квартира:</b>' . $home . '<br>';
    }
    $mess .= '<hr>';
    // подключаем файл класса для отправки почты
    require 'class.phpmailer.php';

    $mail = new PHPMailer();
    $mail->AddAddress('mail@mail.ru','');   // кому - адрес, Имя
    $mail->IsHTML(true);                        // выставляем формат письма HTML
    $mail->Subject = $subject; // тема письма
    $mail->CharSet = "UTF-8";                   // кодировка
    $mail->Body = $mess;
    if(isset($_FILES['file'])) {
            if($_FILES['file']['error'] == 0){
            $mail->AddAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
        }
    }
    // отправляем наше письмо
    if (!$mail->Send()){
        die ('Mailer Error: ' . $mail->ErrorInfo);
    }else{
        echo 'true';
    }?>