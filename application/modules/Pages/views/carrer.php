		<!-- ========================= Main Sec =============================== -->
		<div class="container-fluid main-banner-sec career-us-banner">
			<div class="container">
                <div class="page-title-item">
                    <h2>Career</h2>
                    <ul>
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li>
                            <i class="mdi mdi-chevron-right"></i>
                        </li>
                        <li>Career</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!--contact us pages start-->
        <div class="contact-us">
            <!--Contact bottom section-->
            <div class="contact-bottom-section ptb-100">
                <div class="container-fluid container">
                    <div class="row">
                        <div class="col-lg-12 contact-form-div">
                            <div class="contact-form career-form">
                                <div class="contact-form-title">
                                    <h3>Career</h3>
                                </div>
                                <div class="contact-form-box">
                                    <p class="form-messege" id="cnt-input"></p>
                                   <form id="contact-form" action="<?php base_url();?>" method="post"
									enctype="multipart/form-data">
                                        <input name="name" type="name" placeholder="Name" class="cnt-input">
										<div style="margin-top: 0px; color: red;" class="error_ad">
										<?php echo form_error('name'); ?></div>
                                        <input name="email" type="email" placeholder="Email">
										<div style="margin-top: 0px; color: red;" class="error_ad">
										<?php echo form_error('email'); ?></div>
                                        <input name="number" type="number" placeholder="Contact Number">
										<div style="margin-top: 0px; color: red;" class="error_ad">
										<?php echo form_error('number'); ?></div>
                                        <input  type="file" name="ffile">
										<!--<button name="upload" type="submit">Submit</button>-->
										<input type="submit" id="submit" name="submit" value="Submit" class="btn btn-warning">
                                    </form>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </div>
                <div class="career-bg-img">
                   <img src="<?php echo base_url()?>assets/img/ezgif.com-gif-maker.png">
                </div>
            </div>
            <!--Contact bottom section end-->
            
        </div>
       