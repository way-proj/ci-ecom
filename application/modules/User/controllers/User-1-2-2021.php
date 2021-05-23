<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MX_Controller {
    function __construct(){
    parent::__construct();
    
    $this->load->model('Shopping_model');
	$this->load->library('form_validation');
    $this->load->library('session');
     //$this->load->model('../../Common/Crud_model');
    $this->load->helper(array('form', 'url','menu_helper','new'));

	}
   
   public function signin(){

	 include_once APPPATH. 'libraries/vendor/autoload.php';
	 $google_client = new Google_client();
	 
	 $google_client->setApplicationName('Glogin Demo');
	 $google_client->setClientId("560107265073-k8l26usk6llbl9v3ia3esps6pkmf9mu3.apps.googleusercontent.com");
   	 $google_client->setClientSecret("HOin0FnLCZKAge05NIWXoGel");
	 $google_client->setScopes(array(
            'https://www.googleapis.com/auth/plus.me',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ));

	$google_client->setDeveloperKey("AIzaSyCFQ4g_j3Jm-gwqFkpSR3ocQDlnr0vP30E");
	$google_client->setRedirectUri(base_url()."User/signin");

	
	//$google_client->setRedirectUri(base_url()."User/signin");
	//$google_client->setRedirectUri('https://' . $_SERVER['HTTP_HOST'] . '/User/signin');
	
	//print_r($google_client); die;
	//$google_client->setAccessType('offline');

    	// Add Access Token to Session
        if (isset($_GET['code'])) {
        $google_client->authenticate($_GET['code']);
        $_SESSION['access_token'] = $google_client->getAccessToken();
        header('Location: ' . filter_var(@$redirect_uri, FILTER_SANITIZE_URL));
        }
        
        // Set Access Token to make Request
        if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
        $google_client->setAccessToken($_SESSION['access_token']);
        }
        
        // Get User Data from Google and store them in $data
        if ($google_client->getAccessToken()) {
        	$objOAuthService = new \Google_Service_Oauth2($google_client);
        $userData = $objOAuthService->userinfo->get();
        //print_r($userData); die;
        $data['userData'] = $userData;
        $_SESSION['access_token'] = $google_client->getAccessToken();
        //redirect(base_url().'User/signin');
        } else {
        $authUrl = $google_client->createAuthUrl();
        $data['GLoginUrl'] = $authUrl; 
        }
        
    	 $this->form_validation->set_rules('password', 'Password', 'required');
	     $this->form_validation->set_rules('email', 'Email', 'required');
	    if ($this->form_validation->run() == FALSE)
	        {
        	 $data['subview']="sign-in";
             $this->load->view('layout/default',$data);
	        } 
	       else
	        {
	        $email=$this->input->post('email');
            $password=$this->input->post('password');
            $result=$this->Shopping_model->sign_in($email,$password);

        if($result){	
			
		    $_SESSION['email'] = $result->email;
		    $_SESSION['user_id'] = $result->customer_id;
		    $_SESSION['first_name'] = $result->first_name; 
		    $_SESSION['last_name'] = $result->last_name;
		/* $user_id = $_SESSION['user_id'];
			$data['user_data']=$this->Shopping_model->get_customer_data($user_id); */
			redirect(base_url().'User/profile');
		}
        	 else{
		/* $google_client->setClientSecret("560107265073-k8l26usk6llbl9v3ia3esps6pkmf9mu3.apps.googleusercontent.com");

	     $google_client->setClientKey("HOin0FnLCZKAge05NIWXoGel");
	     $google_client->setRedirectUri("http://localhost:8080/prestaurants/User/signin");
	     $google_client->addScope("email");
	     $google_client->addScope("profile");
	            if(isset($_GET['code']))
	        {
	 	 $token = $google_client->fetchAccessTokenWithAuthCode($_GET['code']); 
	 	
		 	if(isset($token['code']))
				 {
				 	$token = $google_client->setAccessToken($token['access_token']);
				 	$this->session->userdata('access_token',$token['access_token']);

				 	$google_service = new Google_Service_Oauth2($google_client);
					$data = $google_service->userinfo->get();

					$current_datetime = data("Y-m-d H:i:s");
					if($this->Shopping_model->Is_already_register($data['id']))
					{
							//update
					}
					else
					{
						//insert
					}
				 }
				 if($this->session->userdata('access_token'))

	}

	 } 	


*/

	 $data['subview']="sign-in";
     $this->load->view('layout/default',$data);
	  
	  }
   }
	    
   }
  
   
  public function signup(){
	$this->form_validation->set_rules('firstname', 'firstname', 'required');
	$this->form_validation->set_rules('lastname', 'lastname', 'required');
	$this->form_validation->set_rules('email', 'Email', 'required');
	$this->form_validation->set_rules('phone', 'Phone	', 'required');
	$this->form_validation->set_rules('password', 'Password', 'required');
	
	 if ($this->form_validation->run() == FALSE)
	 {
         $data['subview']="signup";
          $this->load->view('layout/default',$data);
	 }
	 else {
	  $insert_data=array(
	 'first_name'=>$this->input->post('firstname'),
	 'last_name'=>$this->input->post('lastname'),
	 'email'=>$this->input->post('email'),
	 'phone'=>$this->input->post('phone'),
	 'password'=>md5($this->input->post('password')),
	 );
	 $this->Shopping_model->save_user_data($insert_data);
	 redirect(base_url().'User/signin'); 
		}
	   
	}

     
public function change_password(){

	    $data['subview']="change-password";
        $this->load->view('layout/default',$data);	
}

public function forgot_save_password(){
	    $active_code=$this->input->post('key');
        $user_id=$this->input->post('user_id');
 		$data['subview']="regenrate_pass";
        $this->load->view('layout/default',$data);
}
	 
public function forgot_password(){

	    $data['subview']="forgot-password";
        $this->load->view('layout/default',$data);	
}
public function send_mail(){
        if($_POST['email']){
           $email  =   $this->input->post('email');
           $res= $this->User_model->check_user_email_exist($email);
            
		if($res->customer_id){
        $active_code=md5(uniqid(rand(5, 15), true));
        $link = 'base_url().User/regenrate_pass/'.$res->customer_id.'/'.$active_code;
        $fetch=$this->db->query("UPDATE `tbl_customers` SET `active_code` = '$active_code' 
        WHERE `email`='$email' ");
        $message = 'Password Recovery Link :'.$link;  
        
		//$to='ypriyanka741@gmail.com';
		$to=$email;
		$subject="Password Recovery Link";
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

      // More headers
		$headers .= 'From: <restaurant@example.com>' . "\r\n";
     // $headers .= 'Cc: yash@mematdigi.com' . "\r\n";
      //$headers .= 'Cc: dinesh@mematdigi.com' . "\r\n";

		$headers .= 'Cc: projects@wayinfotechsolutions.com' . "\r\n";

		$mail= mail($to,$subject,$message,$headers);
      if($mail){
          $this->session->set_flashdata('msg','Please check your inbox we have send password recovery link');
                     redirect(base_url().'User/forget_pass');
      }else{
          
         $this->session->set_flashdata('msg','Sorry mail send issue!');
        //redirect(base_url().'User/profile');
        redirect(base_url('/')); 
      }
      

         }        
          
   }
}	

public function profile(){

		   /*if($_SESSION['email']){
            $user_id=$_SESSION['email'];
            $data['user_data']=$this->Shopping_model->get_customer_data($user_id);
			print_r($data['user_data']); die;
			
           }	*/
		  $user_id = $_SESSION['user_id'];
		  $data['user_data']=$this->Shopping_model->get_customer_data($user_id);
		  $data['subview']="profile";
          $this->load->view('layout/default', $data);
		}

public function updateCustomer(){


    $user_id=$this->input->post('user_id');
	if($user_id){
			
	$update_data=array(
	 'first_name'=>$this->input->post('first_name'),
	 'last_name'=>$this->input->post('last_name'),
	 'email'=>$this->input->post('email'),
	 'phone'=>$this->input->post('phone'),
	 'gender'=>$this->input->post('GenderRadios'),
	 
	 );
       //print_r($update_data);die;  
          $result=  $data['user_data']=$this->Shopping_model->update_customer_data($update_data,$user_id);
		   
		   if($result){
				
				 redirect(base_url().'User/profile',$arr); 
				
				
			}else{
				 redirect(base_url().'User/profile',$arr); 
			}
			
           }
		 
		}
		






public function checkRedirectCode(){

		if(isset($_GET['code'])) {

			$this->google_client->authenticate($_GET['code']);
			$this->access_token = $this->google_client->getAccessToken();
			return true;
		}

		return false;
	}

/*public function oauth2callback(){
		$google_data=$this->google_client->validate();
		$session_data=array(
				'name'=>$google_data['name'],
				'email'=>$google_data['email'],
				'source'=>'google',
				'profile_pic'=>$google_data['profile_pic'],
				'link'=>$google_data['link'],
				'sess_logged_in'=>1
				);
			$this->session->set_userdata($session_data);
			redirect(base_url());
	}
	public function glogout(){
		session_destroy();
		unset($_SESSION['access_token']);
		$session_data=array(
				'sess_logged_in'=>0);
		$this->session->set_userdata($session_data);
		redirect(base_url());
	}*/

public function logout(){
			$this->session->sess_destroy();
			redirect(base_url('User/signin'));
            
		}

public function glogout() {
unset($_SESSION['access_token']);
redirect(base_url());
}

}


?>	 
  