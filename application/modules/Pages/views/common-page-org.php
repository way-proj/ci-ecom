
        
     <div class="product-item">
         <div class="container product-cont">
             <div style="padding: 50px 0px;"></div>
            <p class="woocommerce-result-count">
                Showing 1–16 of 20 results
                //<?php 
                  //echo'<pre>';print_r($product_list);
                 if(!empty($product_list)){
                print_r($product_list);die;
               foreach($product_list as $key=>$product_lists){
                 $image=Get_Productgallery_detailss(@$product_lists->id);
                 $image_url=@$image[0]->image;
                 $price_mrp=@$image[0]->price_mrp;
                 $sp_price=@$image[0]->sp_price;
                 $weight=@$image[0]->weight;; 
                  ?>  
             <div class="row">
gfhgjg
                 <div class="col-md-3 col-6">
                    <div class="product-box">
                        <a href="##" class="product__link">
                     
                     
                           <span class="onsale">Sale!</span>
                           <img width="300" height="300" src="<?php echo base_url()?>assets/img/biryani_300x300.png  <?php echo  $product_list->id;?> class="size-product-images" alt="">
                           <h2 class="product__title">Chaumin</h2>
                           <span class="price">
                               <del>
                                   <span class="fastfood-Price-amount">
                                       <bdi>
                                           <span class="woocommerce-Price-currencySymbol">$</span>50.00</bdi></span></del>
                                            <ins><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>45.00</bdi></span></ins>
                                        </span>
                                        <?php }?>
                        </a>
                        <a href="##" data-quantity="1" class="product-button btn">Add to cart</a>
                    </div>
                     </div>
                    
                      
                         
                 </div>
				 
				   <?php }}?>
               
                
                        </div>
             </div>
         </div>

     <!-- ========================= Footer =============================== -->
		