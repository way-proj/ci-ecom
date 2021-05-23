
	

	<!-- =============================== Orders Section =================================== -->

    <div class="login">
        <img src="<?php echo base_url()?>assets/img/join1.png" class="login-banner">
        <div class="container">
            <div class="row a-s-ii">
                <div class="col-lg-12">
                    <div class="form-section">
                        <div class="logo-2">
                            <a href="##">
                               <h2>Change Password</h2>
                            </a>
                        </div>
                        <form action="<?php echo base_url()?>user/forgot_save_password" method="post">
						<input type="hidden" name="user_id" value="<?php echo $this->uri->segment(3); ?>">
						 <input type="hidden" name="key" value="<?php echo $this->uri->segment(4); ?>">
                             <div class="form-group form-box">
                                <input type="text" name="newpassword"  placeholder='Newpassword'class="input-text" placeholder="">
                            </div>
                             <div class="form-group form-box">
                                <input type="text" name="confirmpassword" placeholder='confirmpassword' class="input-text" placeholder="">
                            </div>
                            <div class="form-group mb-0">
                                <button type="submit" class="btn-md btn-theme btn-block">Change</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
   <!-- =========================== End of Orders  =============================== -->

