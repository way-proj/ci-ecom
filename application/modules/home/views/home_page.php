<div class="container">
  <div class="row no-gutters">
    <div class="col-sm-4 col-md-3 col-lg-2">
      <div class="shop-by-category">
	   <div class="category-caption">Category</div>
        <input type="search" id="input-category" placeholder="Category Search">
			<ul id="category-filter-list" class="livesearch">
			<?php
             $cat_data=getcatname('category_details','id,category_name');
              foreach ($cat_data as $key => $value) {
                $sss=str_replace(' ', '', @$value->category_name);
                $ss=str_replace('&', '', @$sss);
			?>
			<li class="category-items"><a href="<?php echo base_url(); ?>Pages/common_page/<?php echo @$value->id; ?>"><?php echo @$value->category_name;?></a>
            <ul class="sub-category">
			  <?php
			     @$cat_id=@$value->id;
                 $scat_data=getsubcatname('sub_category_details','id,sub_category_name',$cat_id);
			if(is_array($scat_data)): 
            foreach ($scat_data as $key => $value2){  
            ?>
           <!-- <li><a href="<?php echo base_url();?>Home/categorypage/sub_id/<?php echo @$value->id;?>"><?php echo @$value->sub_category_name;?></a></li>-->
           <li><a href="<?php echo base_url(); ?>Pages/common_page/<?php echo @$value->id; ?>/<?php echo @$value2->id; ?>"><?php echo @$value2->sub_category_name;?></a></li>
            <?php }?>
			<?php endif; ?>
            </ul>
          </li>
		  <?php } ?>
        </ul>
		
      </div>
	  
    </div>
    <div class="col-sm-8 col-md-9 col-lg-10">
      <div id="main-slider" class="owl-carousel">
      <?php foreach($home_top_silider_data as $key=>$value){?>
     <div> <img class="slides" src="<?php echo site_url(); ?>admin/upload/cat_images/<?php echo @$value['image_url'];?>" alt=""> </div>
			 <?php }?>
		
      </div>
    </div>
  </div>
</div>

<section class="py-5">
  <div class="container">
    <div class="row no-gutters">
      <div class="col-sm-4 col-md-3 col-lg-2">
        <div class="brand-sidebar">
		<div class="brand-caption">Brand</div>
          <input type="search" id="input-brand" placeholder="Brand Search">
          <ul id="brand-filter-list" class="brandsearch">
            <!--<li><a href="#">Corelle</a></li>
            <li><a href="#">Pyrex</a></li>
            <li><a href="#">Snapware</a></li>
            <li><a href="#">Corningware</a></li>
            <li><a href="#">Instant Brand</a></li>-->
		  <?php
			$brand_data=getBrandName('brand_details','id,brand_name,image_url');
			$i=1;
			foreach ($brand_data as $key => $value) {
			 ?>
			<li><a href="<?php echo base_url();?>Pages/brand_data/<?php echo $value->id;?>"><?php echo $value->brand_name;?></a></li>
		<?php   
		$i++;}?>
		 </ul>
	   </div>
      </div>
     <div class="col-sm-8 col-md-9 col-lg-10 pl-0 pl-sm-3">
        
    <h1 class="common-heading mb-5">Shop by Brands</h1>
      <div id="our-brands-slider" class="owl-carousel">
      <?php
      //$i=1;
      //print_r($prodBrand);die;
      //foreach ($prodBrand as $key => $value) {
      $brand_data=getBrandName('brand_details','id,brand_name,brand_image');
      foreach ($brand_data as $key => $value) {
          //print_r($value);
       ?>
        <div>
        <div class="brand-counter">
          <a class="logo-wrap" href="<?php echo base_url();?>Pages/brand_data/<?php echo $value->id;?>">
          <img src="<?php echo base_url()?>admin/upload/cat_images/<?php echo $value->brand_image;?>" alt="">
          </a>
          <a class="brand-name" href="<?php echo base_url();?>Pages/brand_data/<?php echo $value->id;?>"><?php echo $value->brand_name;?></a>
          <!-- <div class="hover-btns">
          <a class="btn theme-btn mb-2" href="#">Know Your Product</a>
          <a class="btn btn-primary" href="#">Download Catalog</a>
          </div> -->
        </div>
        </div>
         <?php //$i++;
         }?>
        
      
        
      </div>
    
    
      </div>
    </div>
  </div>
</section>

<section class="py-5 bg-light">
  <div class="container">
  <h1 class="common-heading mb-5">New Arrivals</h1>
        <div class="row">
            <?php
            //$i=1;
            //print_r($prodBrand);die;
            //foreach ($prodBrand as $key => $value) {
           // $brand_data=getBrandName('arrivals_details','id,name,logo');
         foreach ($arrivals_data as $key => $value){
          //print_r($value);
          ?>
          <div class="col-sm-3">
             <div class="text-center new-arrivals-box">
              <a href="<?php echo base_url();?>Pages/product_details/new/<?php echo $value->id;?>"><figure class="mb-0 banner-animation">
                <img src="<?php echo base_url()?>admin/upload/charity/<?php echo $value->logo;?>" alt="">
              </figure></a>
              <h5 class="bg-theme-color text-white m-0 fs-18"><a href="<?php echo base_url();?>Pages/product_details/new/<?php echo $value->id;?>"><?php echo $value->name;?></a></h5>
            </div>
          </div>
          
          <?php }?>
          <!--<div class="col-sm-3">-->
          <!--  <div class="text-center new-arrivals-box">-->
          <!--    <figure class="mb-0 banner-animation">-->
          <!--      <img src="<?php echo base_url()?>assets/img/new-arrivals/round-dinnerware.png" alt="">-->
          <!--    </figure>-->
          <!--     <h5 class="bg-theme-color text-white m-0 fs-18"><a href="<?php echo base_url();?>Pages/shape_data/Round">Round Dinnerware</a></h5>-->
              
          <!--  </div>-->
          <!--</div>-->
          <!--<div class="col-sm-3">-->
          <!--  <div class="text-center new-arrivals-box">-->
          <!--    <figure class="mb-0 banner-animation">-->
          <!--      <img src="<?php echo base_url()?>assets/img/new-arrivals/effortless-elegance.png" alt="">-->
          <!--    </figure>-->
          <!--     <h5 class="bg-theme-color text-white m-0 fs-18"><a href="<?php echo base_url();?>Pagess/hape_data/Effortless">Effortless Elegance</a></h5>-->
              
          <!--  </div>-->
          <!--</div>-->
          <!--<div class="col-sm-3">-->
          <!--  <div class="text-center new-arrivals-box">-->
          <!--    <figure class="mb-0 banner-animation">-->
          <!--      <img src="<?php echo base_url()?>assets/img/new-arrivals/bowls.png" alt="">-->
          <!--    </figure>-->
          <!--    <h5 class="bg-theme-color text-white m-0 fs-18"><a href="<?php echo base_url();?>Pages/shape_data/Bowls">Bowls</a></h5>-->
             
          <!--  </div>-->
          <!--</div>-->
        </div>
      
  </div>
</section>


<!-- The Perfect Canvas Section ============================================================================== -->

<section class="per-canvas-sec">
  <div class="container">
    <h3 class="common-heading mb-5">
      Special offer
    </h3>
    <div class="per-canvas-block">
      <div class="row">
       <?php foreach ($prodBestSeller as $key => $value) {
           $product_id = $value->id;
            $product_name = $value->product_name;
            $product_image = $value->product_image;
            $product_price = $value->product_price;
            $discount_percentage = $value->discount_percentage;
            $selling_price = $value->selling_price;
            $selling_price = $value->product_price - ($value->product_price * (5 / 100));
        ?>
        <div class="col-lg-4 col-sm-6">
          <div class="per-canvas-box">
            <a href="<?php echo base_url(); ?>Pages/product_details/offerProduct/<?php echo $value->id; ?>" class="p-c-img-box">
              <img src="<?php echo base_url()?>admin/upload/product_bestseller/<?php echo $value->product_image;?>" alt="">
            </a>
            <a href="<?php echo base_url(); ?>Pages/product_details/offerProduct/<?php echo $value->id; ?>" class="p-c-title">
              <?php echo $value->product_name;?><br>
             
            </a>
            <div class="p-c-price">
              ₹  <?php echo $value->product_price; ?><span class="mrprice">₹ <?php //echo $selling_price; ?>
              <?php echo $value->selling_price; ?></span>
            </div>
            <a href="#" class="p-c-rating">
              <div class="stars-box">
                <span><i class="fa fa-star" aria-hidden="true"></i></span>
                <span><i class="fa fa-star" aria-hidden="true"></i></span>
                <span><i class="fa fa-star" aria-hidden="true"></i></span>
                <span><i class="fa fa-star-half-o" aria-hidden="true"></i></span>
                <span><i class="fa fa-star-o" aria-hidden="true"></i></span>
              </div>
              <div class="p-c-review-t">4.6(215 Reviews)</div>
            </a>
            <div class="p-c-form-block">
              <div class="p-c-f-counter">
                <div class="quantity buttons-added">
                    
                      <?php  
                          $item=get_cart_product(@$product_id);
                            $cart_product_data= @$item['id'];
                            $item_id= "'".@$item['id']."'";
                            $rowid="'".@$item['rowid']."'";
                            if($item['qty']){
                              $qty=$item['qty'];
                            }else{
                               $qty=1;
                            }
  
                         ?>   
           

                  <input type="button" value="-" class="minus">
                  <input type="number" step="1" min="1" max="20" name="qty" id="product_qty_<?php echo @$product_id; ?>" value="<?php echo $qty; ?>" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
                  <input type="button" value="+" class="plus">


                </div>
              </div>
              
           

            <input type="hidden" id="pid_<?php echo $product_id; ?>" value="<?php echo $product_id; ?>">
           <input type="hidden" id="product_name_<?php echo  $product_id; ?>" name="product_name" value="<?php echo $product_name; ?>">
            <input type="hidden" id="product_qty_<?php echo $product_id; ?>" value="1"> 
            <input type="hidden" id="product_image_<?php echo $product_id; ?>" name="product_image" value="<?php echo $product_image; ?>">
           <input type="hidden" id="product_price_<?php echo $product_id; ?>" name="product_price" value="<?php echo $selling_price; ?>">
            <input type="hidden" id="discount_percentage_<?php echo $product_id; ?>" name="discount_percentage" value="<?php echo $discount_percentage;?>">
           <!--  <input type="hidden" id="selling_price_<?php echo $product_id; ?>" name="selling_price" value="<?php echo $selling_price; ?>"> -->
          <button class="add-btn" id="add_cart_<?php echo $product_id; ?>" type="button" onclick="add_to_cart(<?php echo $product_id; ?>);" >Add To Cart</button>
              

            
           
         </div>
          
          </div>
          </div>
          </div>
      <?php } ?>
       
        
      </div>
    </div>
  </div>
</section>

<!-- start blog section -->
<section class="py-5">
  <div class="container">
    <h3 class="common-heading mb-5">
      Recent Blog
    </h3>
    <div class="row">
      <div class="col-sm-6 col-md-3">
        <div class="blog-block">
          <figure>
            <a href="single-page.html">
              <img src="http://purefit.co.in/assets/img/best-sellers/1.png" alt="Digital Marketing Services">
            </a>
          </figure>
          <ul>
              <li><i class="fas fa-calendar-alt"></i> 06 May, 2021</li>
          </ul>
          <a class="p-c-title" href="single-page.html">Winter Frost White 6.75 Appetizer Plates, 6-pack</a>
        </div>
      </div>
      <div class="col-sm-6 col-md-3">
        <div class="blog-block">
          <figure>
            <a href="single-page.html">
              <img  style="height:200px; width:200px;"src="http://purefit.co.in/assets/img/best-sellers/2.jpg" alt="Digital Marketing Services">
            </a>
          </figure>
          <ul>
              <li><i class="fas fa-calendar-alt"></i> 06 May, 2021</li>
          </ul>
          <a class="p-c-title" href="single-page.html">6-piece Glass Bakeware and Storage Container Set with Red Lids</a>
        </div>
      </div>
      <div class="col-sm-6 col-md-3">
        <div class="blog-block">
          <figure>
            <a href="#">
              <img style="height:200px; width:200px;"src="http://purefit.co.in/assets/img/best-sellers/3.jpg" alt="Digital Marketing Services">
            </a>
          </figure>
          <ul>
              <li><i class="fas fa-calendar-alt"></i> 06 May, 2021</li>
          </ul>
          <a class="p-c-title" href="#">Airtight 10-piece Plastic Food Storage Container Set</a>
        </div>
      </div>
      <div class="col-sm-6 col-md-3">
        <div class="blog-block">
          <figure>
            <a href="#">
              <img style="height:200px; width:200px;"src="http://purefit.co.in/assets/img/best-sellers/4.jpg" alt="Digital Marketing Services">
            </a>
          </figure>
          <ul>
              <li><i class="fas fa-calendar-alt"></i> 06 May, 2021</li>
          </ul>
         <a href="#" class="p-c-title">20-ounce Light Blue Meal Mug™ with Lid</a>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- end blog section -->

<!-- The Perfect Canvas Section End ========================================================================== -->


<!-- Newsletter ============================================================================================== -->

<section class="newsletter-sec">
  <div class="container">
    <div class="row">
      <div class="col-sm-7">
          <div class="new-sec-img-box">
            <img src="<?php echo base_url()?>assets/img/newsletter-img.png" alt="">
          </div>
      </div>
      <div class="col-sm-5">
        <div class="news-content">
          <h1 class="norm-heading">
            Subscribe Us
          </h1>
          <div class="news-form">
            <form action="">
              <input type="text" placeholder="Enter Your EMail ID">
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Newsletter End ========================================================================================== -->


<!-- Connect Us ============================================================================================== -->

<section class="connect-us-sec">
  <div class="container">
    <div class="row">
      <div class="col-sm-7">
        <div class="social-sec">
          <span class="s-heading">Connect With Us:</span>
          <ul>
            <li>
              <a href="#"><i class="fab fa-facebook-f"></i></a>
            </li>
            <li>
              <a href="#"><i class="fab fa-twitter"></i></a>
            </li>
            <li>
              <a href="#"><i class="fab fa-pinterest-p"></i></a>
            </li>
            <li>
              <a href="#"><i class="fab fa-instagram"></i></a>
            </li>
            <li>
              <a href="#"><i class="fab fa-youtube"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-sm-5">
        <div class="social-sec payment-sec">
          <span class="s-heading">We Accept:</span>
          <ul>
            <li>
              <img src="<?php echo base_url()?>assets/img/payment.png" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Connect Us End ========================================================================================== -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<script>
$(document).ready(function() {
     $('ul.child').hide();

    $('.parent').click(function() {
        $('ul.child',this.parent).toggle('slow');
    }); 
/*	$('ul.child').hide();
	$("button").click(function () {
    $("ul .child").slideToggle(300);
});
*/
  });
</script>
<script type="text/javascript">
  function add_to_cart(cnt){
        var product_name=$("#product_name_"+cnt).val();
        // var x = document.getElementById("snackbar");
         
                    //x.className = "show";
                   // $("#snackbar").html('<i class="mdi mdi-check"></i> ' + product_name +' added to cart');
                   // setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);  
         var pids=$("#pid_"+cnt).val();
         var product_qty=$("#product_qty_"+cnt).val();
         var product_price=$("#product_price_"+cnt).val();
         var product_image=$("#product_image_"+cnt).val();
         //var discount=$("#discount_percentage_"+cnt).val();
         var selling_price=$("#selling_price_"+cnt).val();
        
         $.ajax({
          url:"<?php echo base_url();?>"+'Cart/add',
          type:'POST',
         data:{pid:pids,product_name:product_name,product_qty:product_qty,product_price:product_price,product_image:product_image,selling_price:selling_price},

          success:function(result){
             alert("product added to cart");
              console.log(result);
              $(".cart-value").html(result);
              $("#remove_cart_"+cnt).css("display", "block");
              $("#cart-data").html(result);

             // $(".cart-sidebar").html(result);
           
              //$("#add_cart_"+cnt).css("display", "none");
             // $("#remove_cart_"+cnt).css("display", "block");
             // $(".a-c-qty-drop_"+cnt).css("display", "flex");
             // $(".a-c-qty-drop_"+cnt).html(result);
             // $itemcnt=get_item_count();
            }
         })
  
       }

  function  get_item_count(){
          $.ajax({
          url:"<?php echo base_url();?>"+'Cart/get_item_count',
          type:'POST',
          data:{},
          success:function(result){
             $(".cart-value").html(result);
             }
         })

      }
      /* function add_to_cart_save(cnt){
        var p_name=$("#p_name_"+cnt).val();
        var x = document.getElementById("snackbar");
        x.className = "show";
        $("#snackbar").html('<i class="mdi mdi-check"></i> ' + p_name +' added to cart');
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000); 
         var p_ids=$("#p_id_"+cnt).val();
         var v_id=$("#save_v_id_"+cnt).val();
         var p_id=p_ids+'_'+v_id;
         var p_qty=$("#save_p_qty_"+cnt).val();
         var p_name=$("#save_p_name_"+cnt).val();
         var p_price=$("#save_p_price_"+cnt).val();
         var mrp_price=$("#save_mrp_price_"+cnt).val();
         var p_image=$("#save_p_image_"+cnt).val();
         var p_weight=$("#save_p_weight_"+cnt).val();
         var gst_per=$("#save_gst_per_"+cnt).val();
         var gst_type=$("#save_gst_type_"+cnt).val();
         var discount=$("#save_p_price_"+cnt).val();
         var margin_price=$("#save_margin_price_"+cnt).val();
         var product_amu=$("#save_product_amu_"+cnt).val();
         var hsn_code=$("#save_hsn_code_"+cnt).val();
         $.ajax({
          url:"<?php echo base_url();?>"+'Cart/add',
          type:'POST',
          data:{hsn_code:hsn_code,p_id:p_id,p_qty:p_qty,p_name:p_name,p_price:p_price,p_image:p_image,p_weight:p_weight,mrp_price:mrp_price,gst_per:gst_per,gst_type:gst_type,discount:discount,margin_price:margin_price,product_amu:product_amu},
          success:function(result){
              $("#add_cart_save_"+cnt).css("display", "none");
              $("#remove_cart_save_"+cnt).css("display", "block");
              $(".a-c-qty-drop_save_"+cnt).css("display", "flex");
              $(".a-c-qty-drop_save_"+cnt).html(result);
            }
         })
     } */
 function remove_to_cart(cnt){
     var pids=$("#pid_"+cnt).val();
     $.ajax({
          url:"<?php echo base_url();?>"+'Cart/remove_to_cart',
          type:'POST',
          data:{pid:pids},
          success:function(result){
             $(".cart-value").html(result);
             $("#text_success").html('('+result+')');
             $("#add_cart_"+cnt).css("display", "block");
             $("#remove_cart_"+cnt).css("display", "none");
            }
        })
  }
function remove_to_cart_save(cnt){
    var p_ids=$("#p_id_"+cnt).val();
     $.ajax({
          url:"<?php echo base_url();?>"+'Cart/remove_to_cart',
          type:'POST',
          data:{p_id:p_id},
          success:function(result){
              $(".cart-value").html(result);
              $("#text_success").html('('+result+')');
              $("#add_cart_save_"+cnt).css("display", "block");
              $("#remove_cart_save_"+cnt).css("display", "none");
              }
        })
  }

</script>