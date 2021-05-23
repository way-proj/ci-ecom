 $(document).ready(function(){
           $(".popupEyeClosePassword p").click(function(){
             if($(this).hasClass('fa-eye-slash')){
               $(this).removeClass("fa-eye-slash");
               $("#user_password").attr("type", "password"); 
             }else{
               $(this).addClass("fa-eye-slash");
               $("#user_password").attr("type", "text"); 
             }
           })
           $(".popupEyeClosePasswordConfirmation p").click(function(){
             if($(this).hasClass('fa-eye-slash')){
               $(this).removeClass("fa-eye-slash");
               $("#user_password_confirmation").attr("type", "password"); 
             }else{
               $(this).addClass("fa-eye-slash");
               $("#user_password_confirmation").attr("type", "text"); 
             }
           })
           $("#user_email").focusout(function(){
             $(".message").html("");
             $(".email_err_login").hide();
             allowemail = allowpassword = false;
             var email = $(this).val();
             var password = $("#user_password").val();
             var password_confirmation = $("#user_password_confirmation").val();
             var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
             if(regex.test(email)){
               $(".email_err_msg").html('');
               allowemail = true;
             }else{
               allowemail = false;
               $(".email_err_msg").html('Email ID should be in "abc@xyz.com" format')
             }
             if(email.length>0){
               $.getScript('/validate_email?email='+email);
             }
             if(password.length >=8){
               allowpassword = true;
             }else{
               allowpassword = false;
             };
         
             if(allowemail && allowpassword){
               $(".signup-btn").removeClass("inactive");
             }else{
               $(".signup-btn").addClass("inactive");
             };
         
             // $.getScript('/validate_email?email='+email);
           })
           $("#user_password").focusout(function(){
             $(".email_err_login").hide();
             $(".message").html("");
             allowemail = allowpassword = false;
             var email = $("#user_email").val();
             var password = $(this).val();
             var password_confirmation = $("#user_password_confirmation").val();
             var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
             if(regex.test(email)){
               allowemail = true;
             }else{
               allowemail = false;
             }
             if(email.length>0){
               $.getScript('/validate_email?email='+email);
             }
             if(password.length >=8){
               $(".password_err_msg").html('');
             }else{
               $(".password_err_msg").html('The password must have atleast 8 characters'); 
             } 
             if(password.length >=8){
               allowpassword = true;
             }else{
               allowpassword = false;
             };
         
             if(allowemail && allowpassword){
               $(".signup-btn").removeClass("inactive");
             }else{
               $(".signup-btn").addClass("inactive");
             }
           })
         })