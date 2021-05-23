
<div>
  <div class="container">
    <div class="text-center">
      <a class="brands-logo" href="<?php echo base_url();?>Pages/common_page/<?php echo @$brand->id;?>"><img src="<?php echo base_url()?>admin/upload/cat_images/<?php echo @$product_list[0]->image_url;?>" alt="<?php echo @$product_list[0]->image_url;?>"></a>
    </div>
    <div class="megamenu-container">
      <div class="megamenu-toggle-wrapper">
        <span class="fas fa-bars megamenu-toggle"></span>
      </div>
      <ul class="megamenu">
        <?php
            $cat_data=getcatname('category_details','id,category_name,image_url');
              foreach ($cat_data as $key => $value) {

                $sss=str_replace(' ', '', @$value->category_name);
                $ss=str_replace('&', '', @$sss);
              
      ?>
        
        <li class="menu-item chevron"><a href="<?php echo base_url(); ?>Pages/common_page/<?php echo @$value->id; ?>"><?php echo @$value->category_name;?></a>
           <?php
             @$cat_id=@$value->id;
                $scat_data=getsubcatname('sub_category_details','id,sub_category_name',$cat_id);
                 if(is_array($scat_data)){ 
                $cnt= count($scat_data);
                  }
                  else{
                   $cnt=0; 
                  }

            if($cnt>0){
                 ?>       
                
          <div class="megamenu-inner-wrapper">
            <ul class="megamenu-child-wrapper">
              <?php
               
              if(is_array($scat_data)){ 
               foreach ($scat_data as $key => $value2){  
               ?>
                <li class="menu-child-item"><a href="<?php echo base_url(); ?>Pages/common_page/<?php echo @$value->id; ?>/<?php echo @$value2->id; ?>"><?php echo @$value2->sub_category_name;?></a>
           
                 <ul class="megamenu-subchild-wrapper">
                  <?php
                  @$sub_cat_id=@$value2->id;
                  $child_scat_data=getchildsubcatname('sub_child_category_details','id,sub_child_category_name',$sub_cat_id);
                  if(is_array($child_scat_data)){ 
                  foreach ($child_scat_data as $key => $value3){  
                 ?>
                  <li><a href="<?php echo base_url(); ?>Pages/common_page/<?php echo @$value->id; ?>/<?php echo @$value2->id; ?>/<?php echo @$value3->id; ?>"><?php echo @$value3->sub_child_category_name;?></a></li>
                <?php }}?>
                
                </ul>
              </li>
              <?php } }?>  
            </ul>
            <figure class="flyout">
              <img src="<?php echo site_url(); ?>admin/upload/cat_images/<?php echo @$value->image_url;?>" alt="">
            </figure>
          </div>
          <?php }?>
        </li>
      <?php }?>
      
      </ul>
    </div>
  </div>
</div>
<?php
$text=$this->uri->segment(2);
            if($text=='brand_data'){
              $id='b_'.$this->uri->segment(3);
            }else{
              $id='c_'.$this->uri->segment(3);
            }
     ?> 
 <script type="text/javascript">
                           $(document).ready(function () {
                             $('input').on('click', function(){
                              $(".price_rang ").removeClass('active');
                              var no_pieces = [];
                              var price = [];
                              var id=$("#cat_id").val();
                              $('input:checked').each(function() {
                                   no_pieces.push($(this).val());
                               });
                              var cat_idsobj=Object.assign({}, no_pieces);
                            $.ajax({
                                    url: "<?php echo base_url();?>" + 'Pages/common_search',
                                    type: 'POST',
                                    data: {nopieces:cat_idsobj,id:id},
                                    success: function(result) {
                                       $("#res_data").html(result);
                                    }
                                })
                              });
                          });
                   

                         </script>   
                         <script type="text/javascript">
                           $(document).ready(function () {
                             $('.price_rang').on('click', function(){
                              $('.active').removeClass('active')
                              $(this).addClass("active");
                              var no_pieces = [];
                              var price=$(this).text();
                              var id=$("#cat_id").val();
                              $('input:checked').each(function() {
                                   no_pieces.push($(this).val());
                               });
                              var cat_idsobj=Object.assign({}, no_pieces);
                            $.ajax({
                                    url: "<?php echo base_url();?>" + 'Pages/common_search',
                                    type: 'POST',
                                    data: {nopieces:cat_idsobj,id:id,price:price},
                                    success: function(result) {
                                       $("#res_data").html(result);
                                    }
                                })
                              });
                          });
                    </script> 
                    <script type="text/javascript">
                           $(document).ready(function () {
                             $('.material_filter').on('click', function(){
                              var no_pieces = [];
                              var price = [];
                              var id=$("#cat_id").val();
                              $('input:checked').each(function() {
                                   no_pieces.push($(this).val());
                               });
                              var cat_idsobj=Object.assign({}, no_pieces);
                            $.ajax({
                                    url: "<?php echo base_url();?>" + 'Pages/common_search',
                                    type: 'POST',
                                    data: {nopieces:cat_idsobj,id:id},
                                    success: function(result) {
                                       $("#res_data").html(result);
                                    }
                                })
                              });
                          });
                   

                         </script>                                       
<div class="container">
  <div class="row">
    <div class="col-sm-3">
      <div class="sidebar-container">
        <!-- start number of pieces -->
        <div class="sidebar-wrap">
          <h5>Number of Pieces</h5>
          <ul>
            <li>
              <a href="#">
                <label>
                  <input  id="kurta_kids" name="attribute_kids[]" type="checkbox" value="30" />
                  <input type="hidden" id="cat_id" name="cat_id" value="<?php echo $id; ?>">
                </label>
                <span>30</span>
              </a>
            </li>
            <li>
              <a href="#">
                <label>
                  <input  id="kurta_kids" name="attribute_kids[]" type="checkbox" value="57" />
                   <input type="hidden" id="cat_id" name="cat_id" value="<?php echo $id; ?>">
                </label>
                <span>57</span>

              </a>
            </li>
            <li>
              <a href="#">
                <label>
                  <input  id="kurta_kids" name="attribute_kids[]" type="checkbox" value="70" />
                 <input type="hidden" id="cat_id" name="cat_id" value="<?php echo $id; ?>">
                </label>
                <span>70</span>
              </a>
            </li>
            <li>
              <a href="#">
                <label>
                  <input  id="kurta_kids" name="attribute_kids[]" type="checkbox" value="100" />
                   <input type="hidden" id="cat_id" name="cat_id" value="<?php echo $id; ?>">
                </label>
                <span>100</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- end number of pieces -->
        <!-- start prices -->
        <div class="sidebar-wrap">
          <h5>Price(₹)</h5>
          <ul class="pb-1">
            <li>
              <a class="price_rang">
                
               100 - 5000
              </a>
            </li>
            <li>
              <a class="price_rang">
                
                5000 - 10000
              </a>
            </li>
            <li>
              <a class="price_rang">
                
                10000 - 20000
              </a>
            </li>
            <li>
              <a class="price_rang">
                
                20000 - 30000
              </a>
            </li>
            <li>
              <a class="price_rang">
                
                30000 - 40000
              </a>
            </li>
             <li>
              <a class="price_rang">
                
                40000 - 50000
              </a>
            </li>
          
          </ul>
        </div>
        <!-- end prices -->
        <!-- start Material -->
        <div class="sidebar-wrap">
          <h5>Material</h5>
          <ul>
            <li>
              <a href="#">
                <label>
                  <input class="material_filter" value="m_6"  type="checkbox" name="">
                </label>
                <span>Ceramic</span>
              </a>
            </li>
            <li>
              <a href="#">
                <label>
                  <input class="material_filter" value="m_7"  type="checkbox" name="">
                </label>
                <span>Copper</span>
              </a>
            </li>
            <li>
              <a href="#">
                <label>
                  <input class="material_filter" value="m_8"  type="checkbox" name="">
                </label>
                <span>Plastic</span>
              </a>
            </li>
            <li>
              <a href="#">
                <label>
                  <input class="material_filter"  value="m_9" type="checkbox" name="">
                </label>
                <span>Stainless Steel</span>
              </a>
            </li>
            <li>
              <a href="#">
                <label>
                  <input class="material_filter" value="m_10" type="checkbox" name="">
                </label>
                <span>Wood</span>
              </a>
            </li>
             <li>
              <a href="#">
                <label>
                  <input class="material_filter" value="m_11" type="checkbox" name="">
                </label>
                <span>Glass</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- end Material -->
      </div>
    </div>
    <div class="col-sm-9">
      <section class="py-5">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 offset-sm-3 mb-4">
              <h1 class="category-heading">
                  <?php
                  if(@$product_list[0]->category_name){
                  echo @$product_list[0]->category_name;
                    }
                   if(@$product_list[0]->sub_category_name){
                  echo '> '.@$product_list[0]->sub_category_name;
                    }
                if(@$product_list[0]->sub_child_category_name){
                  echo '> '.@$product_list[0]->sub_child_category_name;
                    }?>
                  
                  </h1>
            </div>
          </div>
          <div class="row" id="res_data">
            <?php
           if(!empty($product_list) && is_array($product_list)){
               foreach($product_list as $product_lists){
                   
                $url=explode('?',@$product_lists->image1);
                $comp_url=$url[0].'?raw=1';

                ?>
            
            <div class="col-sm-4">
              <div class="product-block">
                <a class="product-img-block" href="<?php echo base_url();?>Pages/product_details/<?php echo @$product_lists->id; ?>">
                  <img src="<?php echo @$comp_url; ?>" alt="">
                </a>
                <div class="cart-counter">
            <!-- <button class="add-cart">Add to Cart</button> -->


            <input type="hidden" id="pid_<?php echo $product_lists->id; ?>" value="<?php echo $product_lists->id; ?>">

          <input type="hidden" id="product_name_<?php echo  $product_lists->id; ?>" name="product_name" value="<?php echo $product_lists->product_name; ?>">

            <input type="hidden" id="product_qty_<?php echo $product_lists->id; ?>" value="1">

           <input type="hidden" id="product_image_<?php echo $product_lists->id; ?>" name="product_image" value="<?php echo @$comp_url1; ?>">

          <input type="hidden" id="product_price_<?php echo $product_lists->id; ?>" name="product_price" value="<?php echo $product_lists->mrp_price;?>">  

          <button class="add-cart" id="add_cart_prod_<?php echo $product_lists->id; ?>" type="button" onclick="add_cart_to_cmn(<?php echo $product_lists->id; ?>);">Add To Cart</button>




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
          </div>
                <h4 class="product-title">
                  <a href="<?php echo base_url();?>Pages/product_details/<?php echo @$product_lists->id; ?>"><?php echo @$product_lists->product_name;?></a>
                </h4>
                <div class="product-price">
                  <span class="price-current">₹ <?php echo number_format((float)@$product_lists->mrp_price, 2, '.', '');?></span>
                </div>
              </div>
            </div>
          <?php } }?>
            
          </div>
        </div>
      </section>
    </div>
  </div>
</div>

<!-- Newsletter ============================================================================================== -->
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

<!-- Connect Us End ========================================================================================== -->


<!-- Footer  ================================================================================================= -->


<script>
  
function add_cart_to_cmn(cnt){
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


</script>