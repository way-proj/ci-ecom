		<!-- ========================= Main Sec =============================== -->
		<div class="container-fluid main-banner-sec about-us-banner">
			<div class="container">
                <div class="page-title-item">
                    <h2>Contact-us</h2>
                    <ul>
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li>
                            <i class="mdi mdi-chevron-right"></i>
                        </li>
                        <li>Contact-us</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!--contact us pages start-->
        <div class="contact-us">
            <div class="contact-information text-center ptb-100">
                <div class="container">
                    <div class="row a-s-ii">
                        <div class="col-md-4">
                            <div class="single-contact-information">
                                <div class="contact-icon">
                                    <a href="#"><i class="mdi mdi-phone"></i></a>
                                </div>
                                <p> +65 98566798</p>
                                <p> +65 9101 1164</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="single-contact-information">
                                <div class="contact-icon">
                                    <a href="#"><i class="mdi mdi-dribbble"></i></a>
                                </div>
                                <p> admin@carnivalmunchies.com </p>
                                <p>abc@carnivalmunchies.com</p>
                                
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="single-contact-information">
                                <div class="contact-icon">
                                    <a href="#"><i class="mdi mdi-map-marker"></i></a>
                                </div>
                                <p>8B

                                    Admiralty Street ,</p>
                                <p> #08-09
                                    
                                    Singapore 757440</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <!--Contact bottom section-->
			
            <div class="contact-bottom-section ptb-100">
                <div class="bg-img"></div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-6 contact-form-div">
                            <div class="contact-form">
                                <div class="contact-form-title">
                                    <h3>Contact Us</h3>
                                </div>
								 <?php if(@$_SESSION['succ_msg']){?> 
                  <div style="margin-top: 0px; color: green;  font-size: 30px;" class="error_ad"><?php echo $_SESSION['succ_msg']; unset($_SESSION['succ_msg']);?></div>
                  <?php } ?>
                                <div class="contact-form-box">
                                    <p class="form-messege" id="cnt-input"></p>
								        <form id="contact-form" action="<?php echo base_url()?>Pages/contactus" method="post">
                                        <input name="name" type="text" placeholder="Name" class="cnt-input">
										<div style="margin-top: 0px; color: red;" class="error_ad">
										<?php echo form_error('name'); ?></div>
                                        <input name="email" type="text" placeholder="Email">
										<div style="margin-top: 0px; color: red;" class="error_ad">
										<?php echo form_error('email'); ?></div>
                                        <input name="number" type="text" placeholder="Contact Number">
                                     <div style="margin-top: 0px; color: red;" class="error_ad">
										<?php echo form_error('number'); ?></div>
                                        <input name="event" type="text" placeholder="Event type">
										 <div style="margin-top: 0px; color: red;" class="error_ad">
										<?php echo form_error('event'); ?></div>
                                        <input name="vanue" type="text" placeholder="Vanue">
										 <div style="margin-top: 0px; color: red;" class="error_ad">
										<?php echo form_error('vanue'); ?></div>
                                        <input name="date" type="date" placeholder="mm/dd/yyyy">
										<div style="margin-top: 0px; color: red;" class="error_ad">
										<?php echo form_error('date'); ?></div>
                                        <textarea name="message" placeholder="Message"></textarea>
                                        <button type="submit">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 map-div">
                            <div id="contact-map" class="map-area">
                                <div id="googleMap">
                                    <iframe class="c-map" src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3988.519415290704!2d103.81214736823715!3d1.4620477478678426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s8b+Admiralty+St%2C+%2308-09!5e0!3m2!1sen!2ssg!4v1564510056314!5m2!1sen!2ssg"  frameborder="0" style="border:0" allowfullscreen=""></iframe>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
            <!--Contact bottom section end-->
            
        </div>
       


		
		