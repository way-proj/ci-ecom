
    <div class="login">
        <img src="<?php echo base_url()?>assets/img/join1.png" class="login-banner">
        <div class="container">
            <div class="row a-s-ii">
                <div class="col-lg-12">
                    <div class="form-section">
                        <div class="logo-2">
                            <a href="#">
                                <h2> Login</h2>
                            </a>
                        </div>
                        <h3>Sign into your account</h3>
						
						 <form action="<?php echo base_url()?>User/signin" method="post">
						
                            <div class="form-group form-box">
							<div style="margin-top: 0px; color: red;" class="error_ad"><?php echo form_error('email'); ?></div>
                                <input type="email" name="email" class="input-text" placeholder="Email Address">
								
                            </div>
                            <div class="form-group form-box">
                                <input type="password" name="password" class="input-text" placeholder="Password">
								<div style="margin-top: 0px; color: red;" class="error_ad"><?php echo form_error('password'); ?> </div> 
                            </div>
                            <div class="form-group mb-0 clearfix">
                                <button type="submit" class="btn-md btn-theme float-left">Login</button>
                                <a href="http://localhost:8080/restaurants/user/forgot_password" class="forgot-password">Forgot Password</a>
                            </div>
                            <div class="extra-login clearfix">
                                <span>Or Login With</span>
                            </div>
                            <div class="clearfix"></div>
                            <ul class="social-list">
                                <li><a href="#" class="facebook-color"><i class="mdi mdi-facebook facebook-i"></i><span>Facebook</span></a></li>
                                <li><a href="#" class="twitter-color"><i class="mdi mdi-twitter twitter-i"></i><span>Twitter</span></a></li>
                               <?php //echo $GLoginUrl; 
                               if(isset($_SESSION['access_token']))
                               {

                               ?>
                                 <header id="info">
<a target="_blank" class="user_name" href="<?php echo $userData->link; ?>" /><img class="user_img" src="<?php echo $userData->picture; ?>" width="15%" />
<?php echo '<p class="welcome"><i>Welcome ! </i>' . $userData->name . "</p>"; ?></a><a class='logout' href='<?php base_url();?>/User/glogout'>Logout</a>
</header>
<?php
echo "<p class='profile'>Profile :-</p>";
echo "<p><b> First Name : </b>" . $userData->given_name . "</p>";
echo "<p><b> Last Name : </b>" . $userData->family_name . "</p>";
echo "<p><b> Gender : </b>" . $userData->gender . "</p>";
echo "<p><b>Email : </b>" . $userData->email . "</p>";
?>
<?php } else {?>
                                <li><a href="<?php echo filter_var($GLoginUrl, FILTER_SANITIZE_URL); ?>" class="google-color"><i class="mdi mdi-google google-i"></i><span>Google</span></a></li>
   <?php } ?>                           
                                  


                            </ul>
                        </form>
                        <p>Don't have an account? <a href="<?php echo base_url()?>User/signup" class="thembo"> Register here</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
   <!-- =========================== End of Orders  =============================== -->