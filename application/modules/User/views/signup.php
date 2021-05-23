	<!-- =============================== Orders Section =================================== -->

<style>
  .error_ad{
    color:red;
  }  

</style>
    <div class="login">
        <img src="<?php echo base_url()?>assets/img/join1.png" class="login-banner">
        <div class="container">
            <div class="row a-s-ii">
                <div class="col-lg-12">
                    <div class="form-section regi-form">
                        <div class="logo-2">
                            <a href="##">
                                <h2> Register</h2>
                            </a>
                        </div>
                        <h3>Create an account</h3>
						
                        <form action="<?php echo base_url()?>User/signup" method="post">
                            <div class="form-group form-box">
                                <input type="text" name="firstname" class="input-text" placeholder="First Name">
								<div style="margin-top: 0px; color: red;" class="error_ad"><?php echo form_error('firstname'); ?> </div> 
								      	</div>

                             <div class="form-group form-box">
                                <input type="text" name="lastname" class="input-text" placeholder="Last Name">
                                <div style="margin-top: 0px; color: red;" class="error_ad"><?php echo form_error('lastname'); ?> </div> 
                                        </div>                                        
							
                            <div class="form-group form-box">
                                <input type="email" name="email"  class="input-text" placeholder="Email Address">
								<div style="margin-top: 0px; color: red;" class="error_ad"><?php echo form_error('email'); ?> </div> 
                            </div>
                             <div class="form-group form-box">
                                <input type="phone" name="phone"  class="input-text" placeholder="Phone">
                                <div style="margin-top: 0px; color: red;" class="error_ad"><?php echo form_error('phone'); ?> </div> 
                            </div>
							
                            <div class="form-group form-box">
                                <input type="password" name="password"  class="input-text" placeholder="Password">
								<div style="margin-top: 0px; color: red;" class="error_ad"><?php echo form_error('Password'); ?> </div>
                            </div>
                            <div class="form-group mb-0 clearfix">
                                <!-- <button type="submit" class="btn-md btn-theme float-left">Register</button>-->

                                <input type="submit" id="submit" name="submit" value="Register" class="btn-md btn-theme float-left">

                            </div>
                            <div class="extra-login clearfix">
                                <span>Or Login With</span>
                            </div>
                            <div class="clearfix"></div>
                            <ul class="social-list">
                                <li><a href="#" class="facebook-color"><i class="mdi mdi-facebook facebook-i"></i><span>Facebook</span></a></li>
                                <li><a href="#" class="twitter-color"><i class="mdi mdi-twitter twitter-i"></i><span>Twitter</span></a></li>
                                <li><a href="#" class="google-color"><i class="mdi mdi-google google-i"></i><span>Google</span></a></li>
                            </ul>
                        </form>
                        <p>Already a member? <a href="<?php echo base_url()?>user/signin" class="thembo"> Login here</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
   <!-- =========================== End of Orders  =============================== -->

		<!-- ========================= Footer =============================== -->
		