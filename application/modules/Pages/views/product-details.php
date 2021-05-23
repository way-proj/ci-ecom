<?php if($this->uri->segment(3)=="offerProduct")
{
?>
<section class="py-5">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-5">
        <div class="exzoom-area">
          <div class="exzoom exzoom-hidden" id="exzoom">
            <div class="exzoom_img_box">
                <ul class='exzoom_img_ul'>
                       <?php
                             if(!empty($offerProduct)){
                             foreach($offerProduct as $key=>$product_lists){
                                  $i=1;
                              $url=explode('?',@$product_lists->product_image);
                              $comp_url1=$url[0].'?raw=1';
                              $url2=explode('?',@$product_lists->product_image);
                              $comp_url2=$url2[0].'?raw=1';
                              $url3=explode('?',@$product_lists->product_image);
                              $comp_url3=$url3[0].'?raw=1';
                              $url4=explode('?',@$product_lists->product_image);
                              $comp_url4=$url4[0].'?raw=1';
                              $url5=explode('?',@$product_lists->product_image);
                              $comp_url5=$url5[0].'?raw=1';
                               $url6=explode('?',@$product_lists->product_image);
                              $comp_url6=$url6[0].'?raw=1';
                           
                            
                             ?>
                       <li><img src="<?php echo base_url();?>/admin/upload/product_bestseller/<?php echo @$comp_url1; ?>" alt="" /></li>
                       <li><img src="<?php echo base_url();?>/admin/upload/product_bestseller/<?php echo @$comp_url2; ?>" alt="" /></li>
                       <li><img src="<?php echo base_url();?>/admin/upload/product_bestseller/<?php echo @$comp_url3; ?>" alt="" /></li>
                       <li><img src="<?php echo base_url();?>/admin/upload/product_bestseller/<?php echo @$comp_url4; ?>" alt="" /></li>
                        <li><img src="<?php echo base_url();?>/admin/upload/product_bestseller/<?php echo @$comp_url5; ?>" alt="" /></li>
                        <li><img src="<?php echo base_url();?>/admin/upload/product_bestseller/<?php echo @$comp_url6; ?>" alt="" /></li>
                     <?php $i++;} }?>
                   
                </ul>
            </div>
            <div class="exzoom_nav"></div>
            <p class="exzoom_btn">
                <a href="javascript:void(0);" class="exzoom_prev_btn"> < </a>
                <a href="javascript:void(0);" class="exzoom_next_btn"> > </a>
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 offset-md-1 align-self-center">
        <h1 class="h3"><?php echo @$product_lists->product_name;?></h1>
        <!-- <div class="d-flex align-items-center mb-2">
          <ul class="star-rating">
            <li><i class="fas fa-star"></i></li>
            <li><i class="fas fa-star"></i></li>
            <li><i class="fas fa-star"></i></li>
            <li><i class="fas fa-star"></i></li>
            <li><i class="fas fa-star-half-alt"></i></li>
          </ul>
          <div class="rating-value-views">
            <span class="rating-value">4.6</span>
            <span class="rating-views">(215 review)</span>
          </div>
        </div> -->
        <div class="product-price-wrap">
          <span class="product-price">₹ <?php echo number_format(@$product_lists->selling_price,2);?></span>
        </div>
        <h2 class="h5 mb-1">Available Options</h2>
        <p class="text-secondary mb-4 avail-option"><i class="fas fa-check"></i> In Stock</p>
        <div class="dropdown-divider"></div>
        <div class="my-3 d-flex justify-content-between">
          <div class="quantity buttons-added">
            <!-- <input type="button" value="-" class="minus">
            <input type="number" step="1" min="1" max="20" name="quantity" value="1" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
            <input type="button" value="+" class="plus"> -->
            <?php  
                          $item=get_cart_product(@$product_lists->id);
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
                  <input type="number" step="1" min="1" max="20" name="qty" id="product_qty_<?php echo @$product_lists->id; ?>" value="<?php echo $qty; ?>" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
                  <input type="button" value="+" class="plus">
          </div>


          <!-- <button class="btn theme-btn">Add  to Cart</button> -->

        <input type="hidden" id="pid_<?php echo $product_lists->id; ?>" value="<?php echo $product_lists->id; ?>">

          <input type="hidden" id="product_name_<?php echo  $product_lists->id; ?>" name="product_name" value="<?php echo $product_lists->product_name; ?>">

            <input type="hidden" id="product_qty_<?php echo $product_lists->id; ?>" value="1">

            <input type="hidden" id="product_image_<?php echo $product_lists->id; ?>" name="product_image" value="<?php echo $product_lists->product_image; ?>"> 

          <input type="hidden" id="product_price_<?php echo $product_lists->id; ?>" name="product_price" value="<?php echo $product_lists->selling_price; ?>"> 
       

           <button class="btn theme-btn" id="add_cart_offer_<?php echo $product_lists->id; ?>" type="button" onclick="add_to_cart_offer(<?php echo $product_lists->id; ?>);" >Add To Cart</button>
        </div>
        <div class="dropdown-divider"></div>
      
      </div>
    </div>
  </div>
</section>

<?php } else {?>

<section class="py-5">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-5">
        <div class="exzoom-area">
          <div class="exzoom exzoom-hidden" id="exzoom">
            <div class="exzoom_img_box">
                <ul class='exzoom_img_ul'>
                           <?php
                             if(!empty($product_list)){
                             foreach($product_list as $key=>$product_lists){
                            
                             if(@$product_lists->logo){?>
                                <li><img src="<?php echo base_url();?>admin/upload/charity/<?php echo @$product_lists->logo; ?>" alt="" /></li> 
                           <?php  }
                              else{
                              $url=explode('?',@$product_lists->image1);
                              $comp_url1=$url[0].'?raw=1';
                              $url2=explode('?',@$product_lists->image2);
                              $comp_url2=$url2[0].'?raw=1';
                              $url3=explode('?',@$product_lists->image1);
                              $comp_url3=$url3[0].'?raw=1';
                              $url4=explode('?',@$product_lists->image1);
                              $comp_url4=$url4[0].'?raw=1';
                              
                             ?>
                       <li><img src="<?php echo @$comp_url1; ?>" alt="" /></li>
                       <li><img src="<?php echo @$comp_url2; ?>" alt="" /></li>
                       <li><img src="<?php echo @$comp_url3; ?>" alt="" /></li>
                       <li><img src="<?php echo @$comp_url4; ?>" alt="" /></li>
                       
                     <?php $i++; } } }?>
                   
                </ul>
            </div>
            <div class="exzoom_nav"></div>
            <p class="exzoom_btn">
                <a href="javascript:void(0);" class="exzoom_prev_btn"> < </a>
                <a href="javascript:void(0);" class="exzoom_next_btn"> > </a>
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 offset-md-1 align-self-center">
          <?php
            if(@$product_lists->logo){?>
            <h1 class="h3"><?php echo @$product_lists->name;?></h1>
            <?php } else{?>
        <h1 class="h3"><?php echo @$product_lists->product_name;?></h1>
        <?php }?>
        <!-- <div class="d-flex align-items-center mb-2">
          <ul class="star-rating">
            <li><i class="fas fa-star"></i></li>
            <li><i class="fas fa-star"></i></li>
            <li><i class="fas fa-star"></i></li>
            <li><i class="fas fa-star"></i></li>
            <li><i class="fas fa-star-half-alt"></i></li>
          </ul>
          <div class="rating-value-views">
            <span class="rating-value">4.6</span>
            <span class="rating-views">(215 review)</span>
          </div>
        </div> -->
        <div class="product-price-wrap">
            <?php
            if(@$product_lists->logo){?>
            <span class="product-price">₹ <?php echo number_format(@$product_lists->price,2);?></span>
            <?php } else{?>
        <span class="product-price">₹ <?php echo number_format(@$product_lists->mrp_price,2);?></span>
        <?php }?>
         
        </div>
        <h2 class="h5 mb-1">Available Options</h2>
        <p class="text-secondary mb-4 avail-option"><i class="fas fa-check"></i> In Stock</p>
         <div class="dropdown-divider"></div>
         <!-- home --brand- prod-- details-->
         <?php
            if(@$product_lists->logo){?>
        <div class="my-3 d-flex justify-content-between">
          <div class="quantity buttons-added">
           <!--  <input type="button" value="-" class="minus">
            <input type="number" step="1" min="1" max="20" name="quantity" value="1" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
            <input type="button" value="+" class="plus"> -->

            <?php  
              $item=get_cart_product(@$product_lists->id);
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
            <input type="number" step="1" min="1" max="20" name="qty" id="product_qty_<?php echo @$product_lists->id; ?>" value="<?php echo $qty; ?>" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
            <input type="button" value="+" class="plus">
          </div>


         <input type="hidden" id="pid_<?php echo $product_lists->id; ?>" value="<?php echo $product_lists->id; ?>">

          <input type="hidden" id="product_name_<?php echo  $product_lists->id; ?>" name="product_name" value="<?php echo $product_lists->name; ?>">

            <input type="hidden" id="product_qty_<?php echo $product_lists->id; ?>" value="1">

            <input type="hidden" id="product_image_<?php echo $product_lists->id; ?>" name="product_image" value="<?php echo $product_lists->logo; ?>"> 

          <input type="hidden" id="product_price_<?php echo $product_lists->id; ?>" name="product_price" value="<?php echo $product_lists->price;?>">  

         <!--  <button class="btn theme-btn">Add  to Cart</button> -->
          <button class="btn theme-btn" id="add_cart_new_<?php echo $product_lists->id; ?>" type="button" onclick="add_to_cart_new(<?php echo $product_lists->id; ?>);" >Add To Cart</button>
        </div>
        <!-- home --brand- prod-- details-->
      <?php } else { ?>

<!-- brand product detail-->
         
  <div class="my-3 d-flex justify-content-between">
          <div class="quantity buttons-added">
           <!--  <input type="button" value="-" class="minus">
            <input type="number" step="1" min="1" max="20" name="quantity" value="1" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
            <input type="button" value="+" class="plus"> -->

            <?php  
              $item=get_cart_product(@$product_lists->id);
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
            <input type="number" step="1" min="1" max="20" name="qty" id="product_qty_<?php echo @$product_lists->id; ?>" value="<?php echo $qty; ?>" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
            <input type="button" value="+" class="plus">
          </div>


         <input type="hidden" id="pid_<?php echo $product_lists->id; ?>" value="<?php echo $product_lists->id; ?>">

          <input type="hidden" id="product_name_<?php echo  $product_lists->id; ?>" name="product_name" value="<?php echo $product_lists->product_name; ?>">

            <input type="hidden" id="product_qty_<?php echo $product_lists->id; ?>" value="1">

           <input type="hidden" id="product_image_<?php echo $product_lists->id; ?>" name="product_image" value="<?php echo @$comp_url1; ?>">

          <input type="hidden" id="product_price_<?php echo $product_lists->id; ?>" name="product_price" value="<?php echo $product_lists->mrp_price;?>">  

          <button class="btn theme-btn" id="add_cart_prod_<?php echo $product_lists->id; ?>" type="button" onclick="add_cart_to_prod(<?php echo $product_lists->id; ?>);">Add To Cart</button>
        </div>


<!-- brand product detail-->


      <?php } ?>
        <div class="dropdown-divider"></div> 
         <?php if(@$product_lists->logo==''){?>
        <ul>
           <li> <?php echo @$product_lists->bullet1;?></li>
           <li> <?php echo @$product_lists->bullet2;?></li>
           <li> <?php echo @$product_lists->bullet3;?></li> 
           <li> <?php echo @$product_lists->bullet4;?></li>
            <li> <?php echo @$product_lists->bullet5;?></li>
        </ul>
        <?php }else{?>
        <?php echo @$product_lists->meta_description;?>
        
        <?php }?>
      </div>
    </div>
  </div>
</section>
<?php }?>

<div class="py-5 bg-light">
  <div class="container">
    <ul class="nav nav-tabs product-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Product Details</a>
      </li>
    
      <li class="nav-item">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">FAQS</a>
      </li>
    </ul>
    <div class="tab-content product-tabinfo" id="myTabContent">
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <h2 class="h5">Product Details</h2>
      
        <p class="text-secondary"><?php echo @$product_lists->description;?></p>
       
      </div>
     
      <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
        <div id="accordion" class="prod-faq-accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Care & Use Information  
                </button>
              </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                <h5>Corelle® Dinnerware - Vitrelle® Glass Use & Care</h5>
                <p>Read these instructions carefully before use. For full Safety and Use <a href="#">Click Here</a></p>
                <p>Corelle® plates and bowls are made of Vitrelle® glass. Mugs are made of porcelain or stoneware as noted on the package. Please review information on bottom of items prior to use.<br>
                Corelle® products can be used for serving and re-heating food in microwaves or pre-heated conventional ovens up to 350° F (176° C). To warm empty dinnerware for serving, use pre-heated conventional ovens only. Porcelain and stoneware mugs are microwavable.<br>
                ALL GLASS, PORCELAIN AND STONEWARE CAN BE BROKEN and care should be taken in handling. A drop or knock against a hard object may cause immediate breakage or enough damage so that the item breaks later for no apparent reason. Such breakage may make a noise and can break into many small pieces. Be careful in handling as pieces may be sharp.<br>
                Wash Corelle® dinnerware items by hand or in an automatic dishwasher. Load items to avoid bumping against other items during cycle. To remove gray or rust marks, clean with non-abrasive cleanser. If scouring is necessary, use only plastic or nylon cleaning pads with non-abrasive cleansers. DO NOT allow stoneware or porcelain mugs to soak/stand in water for an extended period of time. Applied heat after soaking may cause glaze cracking.</p>
                <h5>Warnings</h5>
                <p>Failure to follow the warnings below may cause an item to break or shatter immediately or late, resulting in personal injury or property damage. Corelle® glass dinnerware is intended for normal household use only. It is not intended for camping, industrial, or commercial use.</p>
                <p>DO NOT USE ON STOVETOP, under a broiler/griller, under a microwave browning element, in a toaster oven, or on or near any other direct heating source such as range heat vents, pilot lights, open flames, etc.</p>
                <p>AVOID SUDDEN TEMPERATURE CHANGES. DO NOT add liquid to a hot item, place a hot item on a wet surface, or handle with a wet or cold cloth. These sudden temperature changes may cause the item to break or shatter. Handle hot items with a dry cloth or potholder.</p>
                <ul class="list-with-icons mb-2">
                  <li><strong>DO NOT</strong> use to microwave popcorn or to hold or support popcorn bags, microwave convenience foods with special browning wrappers, etc. Some convenience food packaging is designed to heat rapidly in a microwave oven and may cause breakage.</li>
                  <li><strong>DO NOT</strong> heat an empty vessel in a microwave oven. It may become too hot to handle, crack or break.</li>
                  <li><strong>DO NOT</strong> heat a small amount of food in larger dish in a microwave oven. It may become too hot to handle, crack or break.</li>
                  <li><strong>DO NOT</strong> overheat oil or butter in microwave. Use minimum amount of cooking time.</li>
                  <li><strong>DO NOT</strong> use or repair any item that is chipped, cracked, or severely scratched. Damaged items may break or shatter without warning.</li>
                  <li><strong>DO NOT</strong> abuse by dropping or hitting against a hard object.</li>
                  <li><strong>DO NOT</strong> use abrasive cleanser, scouring pads, or any object that will scratch items.</li>
                  <li>Place stoneware items on dry placemat or tablecloth to avoid scratching surfaces. The bottom of stoneware items may be rough.</li>
                </ul>
                <p>DISCONTINUE USE SHOULD ANY ITEM BE MISUSED IN ANY MANNER AS STATED ABOVE, AS DAMAGED ITEMS MAY BREAK WITHOUT WARNING.</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Warrarnty Info
                </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body">
                <h5>Corelle® Dinnerware - Vitrelle® Glass Warranty</h5>
                <p>Corelle Brands LLC will replace any item of Corelle® Vitrelle® glass dinnerware that should crack, break or chip within THREE YEARS from date of purchase. PORCELAIN AND STONEWARE MUGS ARE NOT INCLUDED. If the exact item is not available, it will be replaced with a comparable item. This warranty only applies to products damaged during normal household use. It does not cover damage resulting from misuse, negligence, accidental breakage or attempted repair.</p>
                <p>For this warranty to apply, the owner must follow the Safety, Use & Care instructions. If you wish to make a warranty claim, contact the <a href="#">Corelle Brands Customer Care Center</a></p>
                <p>KEEP THE PRODUCT, as you may be asked to return it. Incidental and consequential damages are expressly excluded from this warranty. Some jurisdictions do not allow this exclusion or limitation, so the above may not apply to you. This warranty gives you specific legal rights. You also may have other rights, which vary.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<!-- Newsletter ======================================================================== -->

<section class="newsletter-sec">
  <div class="container">
    <div class="row">
      <div class="col-sm-7">
          <div class="new-sec-img-box">
            <img src="./img/newsletter-img.png" alt="">
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
              <img src="./img/payment.png" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Connect Us End =============================================================== -->


<script type="text/javascript">
  function add_to_cart_offer(cnt){
        var product_name=$("#product_name_"+cnt).val();
        var pids=$("#pid_"+cnt).val();
        var product_qty=$("#product_qty_"+cnt).val();
        var product_price=$("#product_price_"+cnt).val();
        var product_image=$("#product_image_"+cnt).val();
        
         $.ajax({
          url:"<?php echo base_url();?>"+'Cart/add',
          type:'POST',
         data:{pid:pids,product_name:product_name,product_qty:product_qty,product_price:product_price,product_image:product_image},
   

          success:function(result){
             alert("product added to cart");
              console.log(result);
              $(".cart-value").html(result);
              $("#remove_cart_"+cnt).css("display", "block");
              $("#cart-data").html(result);

             }
         })
  
       }




function add_to_cart_new(cnt){
        var product_name=$("#product_name_"+cnt).val();
        var pids=$("#pid_"+cnt).val();
        var product_qty=$("#product_qty_"+cnt).val();
        var product_price=$("#product_price_"+cnt).val();
        var product_image=$("#product_image_"+cnt).val();
       
        alert(product_name);
        alert(pids);
        alert(product_qty);
        alert(product_price);
        alert(product_image);
         $.ajax({
          url:"<?php echo base_url();?>"+'Cart/add',
          type:'POST',
        data:{pid:pids,product_name:product_name,product_qty:product_qty,product_price:product_price,product_image:product_image},
     
   

          success:function(result){
             alert("product added to cart");
              console.log(result);
              $(".cart-value").html(result);
              $("#remove_cart_"+cnt).css("display", "block");
              $("#cart-data").html(result);

             }
         })
  
       }




function add_cart_to_prod(cnt){
        var product_name=$("#product_name_"+cnt).val();
        var pids=$("#pid_"+cnt).val();
        var product_qty=$("#product_qty_"+cnt).val();
        var product_price=$("#product_price_"+cnt).val();
        var product_image=$("#product_image_"+cnt).val();
        
         $.ajax({
          url:"<?php echo base_url();?>"+'Cart/add',
          type:'POST',

        data:{pid:pids,product_name:product_name,product_qty:product_qty,product_price:product_price,product_image:product_image},
     
   

          success:function(result){
             alert("product added to cart");
              console.log(result);
              $(".cart-value").html(result);
              $("#remove_cart_"+cnt).css("display", "block");
              $("#cart-data").html(result);

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
    var pids=$("#pid_"+cnt).val();
     $.ajax({
          url:"<?php echo base_url();?>"+'Cart/remove_to_cart',
          type:'POST',
          data:{pid:pids},
          success:function(result){
              $(".cart-value").html(result);
              $("#text_success").html('('+result+')');
              $("#add_cart_save_"+cnt).css("display", "block");
              $("#remove_cart_save_"+cnt).css("display", "none");
              }
        })
  }

</script>