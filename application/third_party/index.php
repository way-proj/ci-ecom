<?php  require_once('Connections/dbConn.php');
//Include GP config file && User class
include_once 'gpConfig.php';
include_once 'User.php';

if(isset($_GET['code'])){
	$gClient->authenticate($_GET['code']);
	$_SESSION['token'] = $gClient->getAccessToken();
	header('Location: ' . filter_var($redirectURL, FILTER_SANITIZE_URL));
}

if (isset($_SESSION['token'])) {
	$gClient->setAccessToken($_SESSION['token']);
}

if ($gClient->getAccessToken()) {
	//Get user profile data from google
	$gpUserProfile = $google_oauthV2->userinfo->get();
	
	//Initialize User class
	$user = new User();
	
	//Insert or update user data to the database
    $gpUserData = array(
	
        'oauth_provider'=> 'google',
        'oauth_uid'     => $gpUserProfile['id'],
        'first_name'    => $gpUserProfile['given_name'],
        'last_name'     => $gpUserProfile['family_name'],
        'email'         => $gpUserProfile['email'],
        'gender'        => $gpUserProfile['gender'],
        'locale'        => $gpUserProfile['locale'],
        'picture'       => $gpUserProfile['picture'],
        'link'          => $gpUserProfile['link']
    );
    $userData = $user->checkUser($gpUserData);
	
	//Storing user data into session
	$_SESSION['userData'] = $userData;
	
	//Render facebook profile data
    if(!empty($userData)){
		function getUserIP()
				{
					$client  = @$_SERVER['HTTP_CLIENT_IP'];
					$forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
					$remote  = $_SERVER['REMOTE_ADDR'];

					if(filter_var($client, FILTER_VALIDATE_IP))
					{
						$ip = $client;
					}
					elseif(filter_var($forward, FILTER_VALIDATE_IP))
					{
						$ip = $forward;
					}
					else
					{
						$ip = $remote;
					}

					return $ip;
				}
        if(($userData['status'] == '1') || ($userData['status'] == '2')){
            $role_id = $userData['role_id'];
            $pid = $userData['user_id'];
            $date = date('Y-m-d');
            if($userData['status'] == '2'){
                $query_UpStatus = "UPDATE `users` SET `status` = '1' where user_id = '$pid'";
                $UpStatus = mysqli_query($dbConn, $query_UpStatus) or die(mysql_error());
            }
            if($role_id == 5){
                        $query_getSubscription = "SELECT * FROM `subscription` WHERE status = '1' AND user_id = '$pid' AND subscription_from_month <= '$date' AND subscription_to_month>= '$date'";
                        $getSubscription = mysqli_query($dbConn, $query_getSubscription) or die(mysqli_error($dbConn));
                        if($getSubscription){
                            $totalRows_getSubscription = mysqli_num_rows($getSubscription);
                            if($totalRows_getSubscription > 0){
                                $role_id = 5;
                            }
                            else{
                                $query_updUser = "UPDATE `users` SET `role_id` = '6' where user_id = '$pid'";
                                $updUser = mysqli_query($dbConn, $query_updUser) or die(mysqli_error($dbConn));
                                
                                $query_updAUth = "UPDATE `authors` SET `status` = '3', suspention_reason = 'Subscription Expired' where user_id = '$user_id'";
                                $updAUth = mysqli_query($dbConn, $query_updAUth) or die(mysqli_error($dbConn));
                                $role_id = 6;
                            }
                            /*$row_getSubscription = mysqli_fetch_assoc($getSubscription);*/
                        }
                    }
           
				$user_ip = getUserIP();
				$suid = $userData['user_id'];
				$query_getLogin = "SELECT * FROM `login` WHERE user_id = '$suid'";
			$getLogin = mysqli_query($dbConn, $query_getLogin) or die(mysqli_error($dbConn));
			$row_getLogin = mysqli_fetch_assoc($getLogin);
			$totalRows_getLogin = mysqli_num_rows($getLogin);
			if($totalRows_getLogin > 0){
				session_id($row_getLogin['session_id']);
				session_start();
				session_destroy();
				session_start();
				$sid = session_id();
				$_SESSION['uid'] = $userData['user_id'];
				$_SESSION['urole'] = $role_id;
				$_SESSION['ufname'] = $userData['user_f_name'];
				$_SESSION['ulname'] = $userData['user_l_name'];
				$lgid=$row_getLogin['login_id'];
				$query_updLog = "UPDATE `login` SET `session_id` = '$sid', login_ip='$user_ip' where login_id = '$lgid'";
				$updLog = mysqli_query($dbConn, $query_updLog) or die(mysql_error());
				header("Location: ../home");
			}
			else{
				session_start();
				$sid = session_id();
				$_SESSION['uid'] = $userData['user_id'];
				$_SESSION['urole'] = $role_id;
                $_SESSION['uid'] = $userData['user_id'];
				$_SESSION['urole'] = $role_id;
				$_SESSION['ufname'] = $userData['user_f_name'];
				$_SESSION['ulname'] = $userData['user_l_name'];
				$query_entrLog = "INSERT INTO `login` (`user_id`, `session_id`, `login_ip`) VALUES ('$suid','$sid','$user_ip');";
				$entrLog = mysqli_query($dbConn, $query_entrLog) or die(mysql_error());
				header("Location: ../home");
			}
             
        }else{
            header("Location: ../signin/gerr");
        }
		/*session_start();
		$_SESSION['uid'] = $userData['user_id'];
		header("Location: ../index.php");
        $output = '<h1>Google+ Profile Details </h1>';
        $output .= '<img src="'.$userData['user_profile_pick'].'" width="300" height="220">';
        $output .= '<br/>Google ID : ' . $userData['user_id'];
        $output .= '<br/>Name : ' . $userData['user_f_name'].' '.$userData['user_l_name'];
        $output .= '<br/>Email : ' . $userData['user_email'];
        $output .= '<br/>Gender : ' . $userData['gender'];
        $output .= '<br/>Locale : ' . $userData['status'];
        $output .= '<br/>Logged in with : Google';
        $output .= '<br/><a href="'.$userData['link'].'" target="_blank">Click to Visit Google+ Page</a>';
        $output .= '<br/>Logout from <a href="logout.php">Google</a>'; */
    }else{
       /* $output = '<h3 style="color:red">Some problem occurred, please try again.</h3>';*/
	   header("Location: ../signin/gerr");
    }
} else {
	/*$authUrl = $gClient->createAuthUrl();
	$output = '<a href="'.filter_var($authUrl, FILTER_SANITIZE_URL).'"><img src="images/glogin.png" alt=""/></a>';*/
	header("Location: ../signin");
}
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login with Google using PHP by CodexWorld</title>
<style type="text/css">
h1{font-family:Arial, Helvetica, sans-serif;color:#999999;}
</style>
</head>
<body>
<div><?php echo $output; ?></div>
</body>
</html>
