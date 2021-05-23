<script type="text/javascript">
  function add_to_cart(cnt){
          //alert("hi...");
         var p_id=$("#p_id_"+cnt).val();
         var p_qty=$("#p_qty_"+cnt).val();
         var p_name=$("#p_name_"+cnt).val();
         var p_price=$("#p_price_"+cnt).val();
         var mrp_price=$("#mrp_price_"+cnt).val();
         var p_image=$("#p_image_"+cnt).val();
         var p_weight=$("#p_weight_"+cnt).val();
		
         $.ajax({
		 url:"<?php echo base_url();?>"+'Cart/add',
          type:'POST',
          data:{p_id:p_id,p_qty:p_qty,p_name:p_name,p_price:p_price,p_image:p_image,p_weight:p_weight,mrp_price:mrp_price},
          success:function(result){
             $(".cart-value").html(result);
              $("#text_success").html('('+result+')');
              $("#add_cart_"+cnt).css("display", "none");
              $("#remove_cart_"+cnt).css("display", "block");
            }
         })
     }
       function add_to_cart_save(cnt){
          //alert("hi...");
         var p_id=$("#p_id_"+cnt).val();
         var p_qty=$("#p_qty_"+cnt).val();
         var p_name=$("#p_name_"+cnt).val();
         var p_price=$("#p_price_"+cnt).val();
         var mrp_price=$("#mrp_price_"+cnt).val();
         var p_image=$("#p_image_"+cnt).val();
         var p_weight=$("#p_weight_"+cnt).val();
         $.ajax({
          url:"<?php echo base_url();?>"+'Cart/add',
          type:'POST',
          data:{p_id:p_id,p_qty:p_qty,p_name:p_name,p_price:p_price,p_image:p_image,p_weight:p_weight,mrp_price:mrp_price},
          success:function(result){
             $(".cart-value").html(result);
              $("#text_success").html('('+result+')');
              $("#add_cart_save_"+cnt).css("display", "none");
              $("#remove_cart_save_"+cnt).css("display", "block");
            }
         })
     } 
 function remove_to_cart(cnt){
    var p_id=$("#p_id_"+cnt).val();
     $.ajax({
          url:"<?php echo base_url();?>"+'Cart/remove_to_cart',
          type:'POST',
          data:{p_id:p_id},
          success:function(result){
            //alert(result);
             //$("#add_cart").displ
             $(".cart-value").html(result);
              $("#text_success").html('('+result+')');
             $("#add_cart_"+cnt).css("display", "block");
             $("#remove_cart_"+cnt).css("display", "none");

            }
        })
  }
   function remove_to_cart_save(cnt){
    var p_id=$("#p_id_"+cnt).val();
     $.ajax({
          url:"<?php echo base_url();?>"+'Cart/remove_to_cart',
          type:'POST',
          data:{p_id:p_id},
          success:function(result){
             //$("#add_cart").displ
             $(".cart-value").html(result);
             $("#text_success").html('('+result+')');
             $("#add_cart_save_"+cnt).css("display", "block");
             $("#remove_cart_save_"+cnt).css("display", "none");

            }
        })
  }
 </script>


<div class="product-item">
         <div class="container product-cont">
             <div style="padding: 50px 0px;"></div>
            <p class="woocommerce-result-count">
                Showing 1–16 of 20 results
             </p>
			   
			  <div class="row">
                 
                   <?php
			    
               if(!empty($product_list)){
               //print_r($product_list);die;
               foreach($product_list as $key=>$product_lists){
                 $image=Get_Productgallery_detailss(@$product_lists->id);
				// echo'<pre>';print_r($image);
                 $image_url=@$image[0]->image;
                 $price_mrp=@$image[0]->price_mrp;
                 $sp_price=@$image[0]->sp_price;
                 $weight=@$image[0]->weight;
			  
                 ?>
                        
                              <div class="col-md-3 col-6">
                    <div class="product-box">
                        <!--<a href="<?php echo base_url();?>Pages/product_details/<?php echo $product_lists->id;?>" class="product__link">
                           <span class="onsale">Sale!</span>
                           <img width="300" height="300" src="<?php echo site_url(); ?>admin/upload/product_images/<?php echo @$image_url;?>" class="size-product-images" alt="">
                           <h2 class="product__title"><?php echo $product_lists->product_name;?></h2>
                           <span class="price">
                               <del>
                                   <span class="fastfood-Price-amount">
                                       <bdi>
                                           <span class="woocommerce-Price-currencySymbol">$<?php echo @$sp_price ;?></span></bdi></span></del>
                                            <ins><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span><?php echo @$price_mrp;?></bdi></span></ins>
                                        </span>
                        </a>
                       <a href="##" data-quantity="1" class="product-button btn">Add to cart</a>-->
                    
					 <form name="add_cart" method="post" id="add_cart" >
                      <input type="hidden" id="p_id_<?php echo @$product_lists->id;?>" value="<?php echo @$product_lists->id;?>">
                      <input type="hidden" id="p_qty_<?php echo @$product_lists->id;?>" value="1">
                       <input type="hidden" id="p_name_<?php echo @$product_lists->id;?>" name="name" value="<?php echo @$product_lists->product_name;?>">
                        <input type="hidden" id="p_weight_<?php echo @$product_lists->id;?>" name="p_weight" value="<?php echo @$weight;?>">
                       <input type="hidden" id="p_price_<?php echo @$product_lists->id;?>" name="price" value="<?php echo @$sp_price;?>">
                        <input type="hidden" id="mrp_price_<?php echo @$product_lists->id;?>" name="mrp_price" value="<?php echo @$price_mrp;?>">
                        <input type="hidden" id="p_image_<?php echo @$product_lists->id;?>" name="image" value="<?php echo @$image_url; ?>">
                    <div class="product">
                     <a href="<?php echo base_url();?>Pages/product_details/<?php echo @$product_lists->id; ?>">
                        <div class="product-header">
                           <span class="badge badge-success">Sale!</span>
                           <img class="img-fluid prod-listing-img" src="<?php echo site_url(); ?>admin/upload/product_images/<?php echo @$image_url; ?>" alt="">
                           
                        </div>
                        <div class="product-body">
                           <h5><?php echo @$product_lists->product_name;?></h5>
                          
                        </div>
                         </a>
                        <div class="product-footer">
                           

                           <p class="offer-price mb-0">₹ <?php echo number_format(@$price_mrp,2);?><i class="mdi mdi-tag-outline"></i><br><span class="regular-price">₹ <?php echo number_format(@$sp_price,2);?></span></p>
						                              <button style="display: none" id="remove_cart_<?php echo @$product_lists->id;?>" type="button" onclick="remove_to_cart(<?php echo @$product_lists->id;?>);"class="product-button btn"><i class="mdi mdi-cart-outline"></i> Delete Item</button>
                            <!-- <p class="offer-price mb-0">$<?php echo @$product_lists->price_mrp;?>$450.99 <i class="mdi mdi-tag-outline"></i><br><span class="regular-price">$<?php echo @$product_lists->sp_price;?>$800.99</span></p> -->
							<button id="add_cart_<?php echo @$product_lists->id;?>" type="button" onclick="add_to_cart(<?php echo @$product_lists->id;?>);"class="product-button btn"><i class="mdi mdi-cart-outline"></i> Add To Cart</button>
                        </div>
						
						
						
                    
                  </div>
               </form>
			   </div>
                     </div>
					 <?php }}?>
                 </div>
 
                   
             </div>
         </div>