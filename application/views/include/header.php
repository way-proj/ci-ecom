<!DOCTYPE html>
<html lang="en">
<head>
  <title>Agarwal Marketing</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="<?php echo base_url()?>assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="<?php echo base_url()?>assets/css/all.min.css">
  <link rel="stylesheet" href="<?php echo base_url()?>assets/css/owl.carousel.min.css">
  <link rel="stylesheet" href="<?php echo base_url()?>assets/css/owl.theme.default.min.css">
  <link rel="stylesheet" href="<?php echo base_url()?>assets/css/stylesheet.css">
  <link rel="stylesheet" href="<?php echo base_url()?>assets/css/responsive.css">
    <link rel="stylesheet" href="<?php echo base_url()?>assets/css/jquery.exzoom.css">
</head>
<body>
<div class="bg-theme-color">
  <div class="container">
    <div class="text-white d-flex flex-wrap justify-content-between py-1 fs-14">
      <p class="m-0">Welcome to AMarking</p>
      <p class="m-0"><span class="fs-16">Get 15%</span> off when you sign up for emails.</p>
    </div>
  </div>
</div>

<header class="py-3">
  <div class="container">
    <div class="d-flex justify-content-end align-items-center flex-wrap header-container">
      <a class="h2 theme-text-color main-logo" href="<?php echo base_url(); ?>">AMarking</a>
      <form class="form-inline search-form">
        <input class="form-control mr-sm-2" type="search" placeholder="What are you looking for ?" aria-label="Search">
        <button class="btn my-2 my-sm-0" type="submit"><img src="<?php echo base_url()?>assets/img/icons/search.png" alt="Search"></button>
      </form>
      <ul class="account-list-info unstyled">
           <?php 
                      $this->load->library('cart');
                     $cart = $this->cart->contents();
                    if($cart = $this->cart->contents()){
                      $i = 0;
                    foreach($cart as $item){
                     $i++;} 
                       }
                       ?>
      
        <li>
          <a href="" data-toggle="modal" data-target="#cart-modal" onclick="get_cart_data()" >
                
            <span class="cart-value"><?php if(@$i){ echo @$i; }else{ echo '0'; }
            ?>
            
            </span>
            <img src="<?php echo base_url()?>assets/img/icons/my-cart.png" alt="Cart">
            <span>Cart</span>
          </a>
        </li> 
        <li>
          <a href="#" data-toggle="modal" data-target="#account-modal">
            <img src="<?php echo base_url()?>assets/img/icons/my-account.png" alt="Login">
            <span>Login</span>
          </a>
        </li>
		<li>
     
        <?php
        if(@$_SESSION['photo']){?>
          <img alt="logo" src="<?php echo base_url();?>admin/upload/profile/<?php echo @$_SESSION['photo']; ?>">
        <?php } else{?>
         
        <?php } ?>
            
              
          </a>
        </li>
        <li>
          <a href="#">
            <img src="<?php echo base_url()?>assets/img/icons/help.png" alt="Help">
            <span>Help</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</header>


<!-- Account Modal -->
<div class="modal fade" id="account-modal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
       </button>
      <div id="tab-1" class="tab-content current"> <!-- strat login tab -->
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Login</h5>
          <div id="login_error_db_exist"></div>
        </div>
        <div class="modal-body">
           <form name="login_form" id="login_form" method="post">
            <div class="form-group">
              <i class="fas fa-envelope"></i>
              <input onchange="get_user_login_info()" type="email" class="form-control" name="lemail" id="lemail" />
                                           <div id="error_lemail"></div>
            </div>
            <div class="form-group">
              <i class="fas fa-key"></i>
             
			  <input onchange="get_user_login_info()" class="form-control" type="password" name="lpassword" id="lpassword"/>
               <div id="error_lpassword"></div>
              <span class="fas fa-eye field-icon toggle-password" toggle="#password-field"></span>
            </div>
           
			<a onclick="get_user_login_info('submit');" class="btn btn-primary">Submit</a>
          </form>
        </div>
      </div> <!-- end login tab -->
      <div id="tab-2" class="tab-content"> <!-- strat create account tab -->
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create Account</h5>
        </div>
        <div class="modal-body">
            <div id="reg_msg_success"></div>
         <form id="user_registration" name="user_registration" method="post">
            <div class="form-group">
              <i class="fas fa-user"></i>
             
              <input class="form-control" onkeypress="return /[a-z]/i.test(event.key)" placeholder="Name" type="text" onchange="get_user_info()"   name="first_name" id="first_name" >

              <div id="error_name"></div>
            </div>
            <div class="form-group">
              <i class="fas fa-phone-alt"></i>
		    <input class="form-control" onkeypress='return event.charCode >= 48 && event.charCode <= 57'  placeholder="Mobile number" type="text" pattern="^\d{10}$" maxlength="10" onchange="get_user_info()" name="phone" id="phone" >
             <div id="error_phone"></div>
			  
			  
            </div>
            <div class="form-group">
              <i class="fas fa-envelope"></i>
               <input class="form-control" type="text" onchange="get_user_info()" placeholder="Enter email"  name="email" id="email">
              <div id="error_email"></div>
            </div>
            <div class="form-group">
              <i class="fas fa-key"></i>
           
			   <input class="form-control" onchange="get_user_info()" placeholder="Enter Password" title="" type="password" name="password" id="password" >
                <div id="error_password"></div>
            </div>
         
			<a onclick="get_user_info('submit');" class="btn btn-primary" >Submit</a>
          </form>
        </div>
      </div> <!-- end create account tab -->
      <div id="tab-3" class="tab-content"> <!-- strat forget password account tab -->
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Forget Password?</h5>
        </div>
        <div class="modal-body">
            <form name="login_form" id="login_form" method="post">
            <div class="form-group">
              <i class="fas fa-envelope"></i>
			  <input  type="email" class="form-control" name="lemail" id="flemail" placeholder="Enter email" />
              <div id="error_flemail"></div>
            </div>
            <button type="submit" class="btn btn-primary" onclick="get_user_email('submit');" >Submit</button>
		  </form>
        </div>
      </div> <!-- end forget password tab -->
      <div class="modal-footer">
        <ul class="tabs">
          <li class="tab-link current" data-tab="tab-1"><i class="fas fa-sign-in-alt"></i> <span class="d-none d-sm-inline-block">Login</span></li>
          <li class="tab-link" data-tab="tab-2"><i class="fas fa-edit"></i> <span class="d-none d-sm-inline-block">Create Account</span></li>
          <li class="tab-link" data-tab="tab-3"><i class="fas fa-key"></i> <span class="d-none d-sm-inline-block">Forget Password?</span></li>
        </ul>
      </div>
    </div>
  </div>
</div>



<!-- Cart Modal -->
<div id="cart-modal" class="modal fixed-right fade" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-dialog-aside" role="document">
    <div class="modal-content" id="cartData">
      <div class="modal-header">
         
         <?php 
             $this->load->library('cart');
             $cart = $this->cart->contents();
            if($cart = $this->cart->contents()){
              $i = 0;
            foreach($cart as $item){
             $i++;} 
           }?>
        <h5 class="modal-title" >My Cart <span class="cart-value">(<?php 
                          if(@$i){
                          echo @$i;
                           }else{
                            echo '0';
                           }?>)</span></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    
      <div class="modal-body">
                 <?php
                 $this->load->library('cart');
                 if($cart = $this->cart->contents()){
                  $grand_total = 0;
                  $i = 1;
                  foreach ($cart as $item)
                  {
                  // print_r($item);
                   $grand_total = $grand_total + $item['subtotal'];
                 ?>
        <div class="media cart-list-product">
          <figure class="thumbnail">
            <img src="<?php echo base_url(); ?>admin/upload/product_bestseller/<?php echo $item['image'] ?>" alt="">
          </figure>
          <div class="media-body">
            <h5 class="mt-2 fs-14 mb-1"><?php echo $item['name'];?></h5>
            <p class="price">₹ <?php echo @$item['selling_price'];?> X <?php echo @$item['qty'];?></p>
          </div>
          <i class="far fa-trash-alt product-remove" onclick="delete_item('<?php echo $item['rowid'];?>')"></i>
        </div>
        
  	<?php } } ?>
  	
  	
  	
  
      </div>
      <div class="modal-footer d-block">
        <div class="d-flex justify-content-between subtotal">
          <span class="txt">Subtotal</span>
          <span class="amount">₹ <?= number_format(@$grand_total,2)?></span>
        </div>
        <div class="d-flex justify-content-between">
          <a href="<?php echo base_url();?>Cart/"><button type="button" class="btn theme-btn">View Cart</button></a>
      <a href="<?php echo base_url();?>Checkout/checkout"><button class="btn btn-primary" type="button">Check Out ₹ <?= number_format(@$grand_total,2)?></button></a>
        </div>
      </div>
    
    
    </div>
  </div>
</div>
<nav class="bg-light">
  <div class="container">
    <div class="brand-nav">
      <span class="fas fa-bars brand-toggle"></span>
       <ul class="brand-list">
			<?php
				 $brand_data=getBrandName('brand_details','id,brand_name,image_url');
				$i=1;
				foreach ($brand_data as $key => $value) {
				
			 ?>
			<li><a href="<?php echo base_url();?>Pages/brand_data/<?php echo $value->id;?>">
				<img src="<?php echo base_url()?>admin/upload/cat_images/<?php echo $value->image_url;?>" alt="<?php echo $value->brand_name;?>">
				</a>
			</li>
      
       <?php   
	   $i++;}?>
       </ul>
	    
	 
    </div>
  </div>
</nav>

<script
  src="https://code.jquery.com/jquery-3.5.1.js"
  integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
  crossorigin="anonymous"></script>
 <script>
	document.onkeydown=function(evt){
      var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
		if(keyCode == 13)
	 	{
			//your function call here
	    	document.test.submit();
										
					}
		}
</script>

<script>

  
  
  function get_user_info(submit=''){
                              var name=$("#first_name").val();
                              var phone=$("#phone").val();
                              var email=$("#email").val();
                              var password= $("input[name=password]").val();
							
							  
                              if(name==''){
                                $("#error_name").html('<span style="color:red">Please enter name </span>');
                               // alert(name);
                               }else{
                                 $("#error_name").html('');
                                 var nflag=1;
                               }
                               if(phone==''){
                                $("#error_phone").html('<span style="color:red">Please enter phone </span>');
                                 
                               }else{
                                 $("#error_phone").html('');
                                   var pflag=1;
                               }
                               if(email==''){
                                $("#error_email").html('<span style="color:red">Please enter email </span>');
                                }else{
                                 $("#error_email").html('');
                                 var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                                  if(regex.test(email)){
                                      $("#error_email").html('');
                                      var eflag=1;
                                  }else{
                                    $("#error_email").html('<span style="color:red">Please enter valid email </span>');
                                     
                                  }
                               }
                               if(password==''){
                                $("#error_password").html('<span style="color:red">Please enter password </span>');
                                
                               }else{
                                 $("#error_password").html('');
                                   var ppflag=1;
                                 }
                           if(nflag==1 && eflag==1 && pflag==1 && ppflag==1 && submit=='submit'){
                                   $.ajax({
                                          url:"<?php echo base_url();?>User/Signup_user_front",
                                          type:"post",
                                          data:{first_name:name,phone:phone,email:email,password:password},
                                          success:function(res){
                                             var objJSON = JSON.parse(res);
                                             if(objJSON.email_error){
                                                $("#error_email").html('<span style="color:red">'+objJSON.email_error+'</span>');
                                             }
                                             if(objJSON.mobile_error){
                                                $("#error_phone").html('<span style="color:red">'+objJSON.mobile_error+'</span>');
                                             }
                                             if(objJSON.reg_msg_success){
                                                $("#reg_msg_success").html('<span style="color:green">'+objJSON.reg_msg_success+'</span>');
                                                $("#first_name").val('');
                                                $("#phone").val('');
                                                $("#email").val('');
                                                $("#password").val('');
                                                
                                             }

                                          }
                                     })
                              } 
                           }
	
	
//Login module section 
	
	function get_user_login_info(submit=''){
                              var email=$("#lemail").val();
                               var password= $("input[name=lpassword]").val();
                              if(email==''){
                                $("#error_lemail").html('<span style="color:red">Please enter email </span>');
                                 
                               }else{
                                 $("#error_lemail").html('');
                                var eflag=1;
                               }
                               if(password==''){
                                $("#error_lpassword").html('<span style="color:red">Please enter password </span>');
                                
                               }else{
                                 $("#error_lpassword").html('');
                                var ppflag=1;
                               }
                           if(eflag==1 &&  ppflag==1 && submit=='submit'){
                                   $.ajax({
                                          url:"<?php echo base_url();?>User/login_front_check",
                                          type:"post",
                                          data:{email:email,password:password},
                                          success:function(res){
                                             var objJSON = JSON.parse(res);
                                                
                                             if(objJSON.login_success){
                                               window.location.href="<?php echo base_url();?>";
                                             }
                                             if(objJSON.login_error_show){
                                                $("#login_error_show").html('<span style="color:red">'+objJSON.login_error_show+'</span>');
                                             }
                                             if(objJSON.login_error_db_exist){
                                                $("#login_error_db_exist").html('<span style="color:red">'+objJSON.login_error_db_exist+'</span>');
                                             }
                                             

                                          }
                                     })
                              } 
                           }
	
	
	//login module section 
			
	
/* forgot password */
	
	
	function get_user_email(){
                            var email=$("#flemail").val();
                            if(email==''){
                                $("#error_flemail").html('<span style="color:red">Please enter email </span>');
                                 
                               }else{
                                  $.ajax({
                                         url:"<?php echo base_url();?>User/send_mail",
                                         type:"post",
                                         data:{email:email},
                                         success:function(res){
                                            $("#forget_pass_msg").html(res);
                                             $("#error_flemail").html(' ');
                                           }
                                       });
                                       
                                      }   
                                  }
	

	/* forgot password */	


</script>
<script>
//Delete cart item 
  function delete_item(rowid) {
  $.ajax({
      url: "<?php echo base_url();?>" + 'Cart/remove_item',
      type: 'POST',
      data: {
          row_id: rowid
      },
      success: function(result) {
          $("#cartData").html(result);
      }
  })
}

//Get cart item 
function get_cart_data()
{
$.ajax({
        type: "POST",
        url: "<?php echo site_url('Cart/get_cart_info');?>",
        data: "",
        success: function (response) {
        $("#cartData").html(response);
        }
    });
}
</script>
