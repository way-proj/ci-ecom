<?php
//session_start();

//Include Google client library 
include_once 'src/Google_Client.php';
include_once 'src/contrib/Google_Oauth2Service.php';

/*
 * Configuration and setup Google API
 */
$clientId = '790140636435-qr46jj63jtpkf22b64b9vj3ne9akqoqv.apps.googleusercontent.com'; //Google client ID
$clientSecret = 'l4iEc5JZai7LWEvxHtbMXX-a'; //Google client secret
$redirectURL = 'http://aptinovamag.com/gapi/'; //Callback URL

//Call Google API
$gClient = new Google_Client();
$gClient->setApplicationName('Login to CodexWorld.com');
$gClient->setClientId($clientId);
$gClient->setClientSecret($clientSecret);
$gClient->setRedirectUri($redirectURL);

$google_oauthV2 = new Google_Oauth2Service($gClient);
?>
