<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pages extends MX_Controller {
    function __construct(){
    parent::__construct();
    
    $this->load->model('Shopping_model');
    $this->load->model('../../Common/Crud_model');
    $this->load->library('form_validation');
    $this->load->helper('crypto_helper');
    $this->load->library('session');
    $this->load->helper(array('form', 'url','new','menu'));
    $this->load->library('cart');
	}
   public function common_product(){
       $cat_id=$this->uri->segment(3);
	   $data['product_list']=$this->Shopping_model->product_list($cat_id);
	   $data['subview']="product";
       $this->load->view('layout/default', $data); 
  
  }

   public function common_product1(){
       $data['subview']="contact-us";
       $this->load->view('layout/default', $data);    
   
   }
  public function shape_data(){
            $shape=$this->uri->segment(3);
            $data['product_list']=$this->Shopping_model->shape_data($shape);
            $data['subview']="common-page";
            $this->load->view('layout/default', $data);

         } 
   
   public function contactus(){
	  // print_r($_POST);
		$this->form_validation->set_rules('name', 'Username', 'required');
		$this->form_validation->set_rules('email', 'Email', 'required'); 
		$this->form_validation->set_rules('number', 'phone_number', 'required');
		$this->form_validation->set_rules('event', 'event', 'required');
		$this->form_validation->set_rules('vanue', 'vanue', 'required');
		$this->form_validation->set_rules('date', 'date', 'required');
		$this->form_validation->set_rules('message', 'message', 'required');
		if ($this->form_validation->run() == FALSE)
                {
        $data['subview']="contact-us";
			
                }
                else
					{
				$_SESSION['succ_msg']='Successfully submit';	
				
                               	  
		$insert_data=array(
		'name'=>$this->input->post('name'),
		'email'=>$this->input->post('email'),
		'number'=>$this->input->post('number'),
		'event'=>$this->input->post('event'),
		'vanue'=>$this->input->post('vanue'),
		'date'=>$this->input->post('date'),
		'message'=>$this->input->post('message')
		);
		
		$this->Shopping_model->save_contact_data($insert_data);
	 }
        $data['subview']="contact-us";
       $this->load->view('layout/default', $data);
		
        }
		public function about_us(){
		$data['subview']="about_us";
       $this->load->view('layout/default', $data);
	
		}


		public function carrer(){

			if($this->input->post('submit')=="Submit"){
			$this->form_validation->set_rules('name','Name','required');
			$this->form_validation->set_rules('email','Email','required');
			$this->form_validation->set_rules('number','Number','required');
			if($this->form_validation->run()==FALSE){
			$this->session->set_flashdata('error','* fields are mandatory');

			}else{
			
			$name =$this->input->post('name');
			$email =$this->input->post('email');
			$number =$this->input->post('number');

			$config['upload_path'] = 'admin/assets/img/';
			$config['allowed_types']='gif|jpg|png|chm|doc|dcom|docx|dot|dotx|hwp|odt|pdf|pub|rtf|xps|key|odp|pps|ppsx|ppt|pptm|pptx|PDF|DOC|XML|DOCX';
			
			$config['max_size'] = '80000';
			$config['file_name'] = 'pr_'.date('Hdiysm').'_'.rand(9,100);
			$this->load->library('upload', $config);
			$this->upload->initialize($config);

			if($this->upload->do_upload('ffile')){
			$ffile = $this->upload->data();
			$dpath = "assets/img/".$ffile['file_name'];

			$insert_data = array('name'=>$name,'email'=>$email,'number'=>$number,'image'=>$ffile['file_name']);

			if($this->Shopping_model->save_carrer_data($insert_data)){
			$this->session->set_flashdata('success','images is uploaded');
			redirect(site_url('catalog'));

			}else{
			$this->session->set_flashdata('error','images not uploaded.');

			}

			}else{
			$this->session->set_flashdata('error','images not uploaded');

			}

			}
			}


			 $data['subview']="carrer";
			 $this->load->view('layout/default', $data);
	  	    }
		
    public function product_details(){
		 $pid=$this->uri->segment(4); 
		 if($this->uri->segment(3)=="offerProduct")
    		{
    		$offer_pid=$this->uri->segment(4); 
    		$data['offerProduct']=$this->Shopping_model->offer_product_list($offer_pid);
    		}
		 if($pid){
		 $pid=$this->uri->segment(4);
		 $data['product_list']=$this->Shopping_model->product_list3($pid);
		 }else{
		 $pid=$this->uri->segment(3);
		 $data['product_list']=$this->Shopping_model->product_list2($pid);
		 }
     $data['subview']="product-details";
      $this->load->view('layout/default', $data);
		}

  		public function cart(){
        $data['subview']="cart";
        $this->load->view('layout/default', $data);
  		  }
    		public function payment_success_cod(){
    			$this->load->library('cart');
    			@$this->cart->destroy();
    			 
    			$cart_id=$_SESSION['cart_id'];
    			$data['product_details']=$this->Shopping_model->get_product_details($cart_id);  
    			$data['subview']="payment-success-cod";
    			$this->load->view('layout/default', $data);  
    			}

         public function brand_data(){
            $b_id=$this->uri->segment(3);
            $data['product_list']=$this->Shopping_model->brand_data($b_id);
            $data['subview']="common-page";
            $this->load->view('layout/default', $data);

         }
        public function arrayHasOnlyInts($array){
            $test = implode('',$array);
            return is_numeric($test);
           }
      public function common_search(){
        	$no_pieces=@$this->input->post('nopieces');

        	$id=explode('_',@$this->input->post('id'));
        	$price_range=@$this->input->post('price');
        	if($id[0]=='b'){
        	 $bid=$id[1];
        	}else{
        	 $cid=$id[1];	
        	}

          if(is_array($no_pieces) && !empty($no_pieces)){
            $flag= $this->arrayHasOnlyInts($no_pieces);
           
          if($flag){

            if($no_pieces){
              $data=implode(',',$no_pieces);
              if(@$bid){
	                @$where='where tp.number_pieces IN ('.$data.') and brand_name='.$bid.'';
                  $price_range=@$this->input->post('price');
                   $combin=explode(' - ',$price_range);
                   $min_price=@$combin[0];
                   $max_price=@$combin[1];
                 if($min_price){
                   $where .=' and mrp_price>='.$min_price.' and  mrp_price<='.$max_price;
                   }else{
                     @$where.='';
                   }
	               }else{
	                @$where='where tp.number_pieces IN ('.$data.') and cat_id='.$cid.'';
                  $price_range=@$this->input->post('price');
                   $combin=explode(' - ',$price_range);
                   $min_price=@$combin[0];
                   $max_price=@$combin[1];
                 if($min_price){
                   $where .=' and mrp_price>='.$min_price.' and  mrp_price<='.$max_price;
                   }else{
                     @$where.='';
                   }
	               }
                 }else{
                   @$where='';
                  }
              
              }
              else{
               $intarr=array();
               $nonintarr=array();
               foreach($no_pieces as $value) {
                 if(is_numeric($value)){
               	  	array_push($intarr, $value);
               	   }else{
               	   	$datae= explode('m_',$value);
               	  	array_push($nonintarr, $datae[1]);
               	   }
               	 }

               	if(is_array($intarr)  && is_array($nonintarr)){
                 $data1=implode(',',$intarr);
                 $data2=implode(',',$nonintarr);
                 if(@$bid){
	                @$where='where tp.number_pieces IN ('.$data1.') and  tp.material_id IN ('.$data2.') and brand_name='.$bid.'';
                   $price_range=@$this->input->post('price');
                   $combin=explode(' - ',$price_range);
                   $min_price=@$combin[0];
                   $max_price=@$combin[1];
                 if($min_price){
                   $where .=' and mrp_price>='.$min_price.' and  mrp_price<='.$max_price;
                   }else{
                     @$where.='';
                   }


	               }else{
	                @$where='where tp.number_pieces IN ('.$data1.') and cat_id='.$cid.'';
                  $price_range=@$this->input->post('price');
                   $combin=explode(' - ',$price_range);
                   $min_price=@$combin[0];
                   $max_price=@$combin[1];
                 if($min_price){
                   $where .=' and mrp_price>='.$min_price.' and  mrp_price<='.$max_price;
                   }else{
                     @$where.='';
                   }
                }

                }


               }
            
             
           }
           else{
             if(@$bid){
                  @$where='where brand_name='.$bid.'';
                  $price_range=@$this->input->post('price');
                   $combin=explode(' - ',$price_range);
                   $min_price=@$combin[0];
                   $max_price=@$combin[1];
                 if($min_price){
                   $where .=' and mrp_price>='.$min_price.' and  mrp_price<='.$max_price;
                   }else{
                     @$where.='';
                   }
                 }else{
                  @$where='where cat_id='.$cid.'';
                  $price_range=@$this->input->post('price');
                   $combin=explode(' - ',$price_range);
                   $min_price=@$combin[0];
                   $max_price=@$combin[1];
                 if($min_price){
                   $where .=' and mrp_price>='.$min_price.' and  mrp_price<='.$max_price;
                   }else{
                     @$where.='';
                   }
                 }


           } 
        	
          
           $search_products= $this->Crud_model->getDirectQueryCommonData("SELECT 
            tp.*
           FROM
            `tbl_products` AS tp 
             $where
             ");
         $home_buy_products_data=$search_products;  
  
     

   if(!empty($home_buy_products_data) && is_array($home_buy_products_data)){

      foreach ($home_buy_products_data as $product_lists) {
                  
                     $url=explode('?',@$product_lists['image1']);
                     $comp_url=$url[0].'?raw=1';
                   
                ?>
               <div class="col-sm-4">
              <div class="product-block">
                <a class="product-img-block" href="<?php echo base_url();?>Pages/product_details/<?php echo @$product_lists['id']; ?>">
                  <img src="<?php echo @$comp_url; ?>" alt="">
                </a>
                
                <h4 class="product-title">
                  <a href="<?php echo base_url();?>Pages/product_details/<?php echo @$product_lists->id; ?>"><?php echo @$product_lists['product_name'];?></a>
                </h4>
                <div class="product-price">
                  <span class="price-current">₹ <?php echo number_format((float)@$product_lists['mrp_price'], 2, '.', '');?></span>
                </div>
              </div>
            </div>

                  <?php } } 
  }  
		public function common_page(){
            $cat_id=$this->uri->segment(3);
            $sub_cat_id=$this->uri->segment(4);
            $sub_cat_child_id=$this->uri->segment(5);
         if($sub_cat_id==''){
          $cat_id=$this->uri->segment(3);
          $data['product_list']=$this->Shopping_model->product_cat_data($cat_id);
          }else{

          $cat_id=$this->uri->segment(3);
          $sub_cat_id=$this->uri->segment(4);
          if($sub_cat_child_id!='' &&  $sub_cat_id!='' && $sub_cat_child_id!=''){
          $data['product_list']=$this->Shopping_model->product_scat_child_data($cat_id,$sub_cat_id,$sub_cat_child_id);
           }else{
              $data['product_list']=$this->Shopping_model->product_scat_data($cat_id,$sub_cat_id); 
               
           }
           
          }
           $data['subview']="common-page";
           $this->load->view('layout/default', $data);
        }
	
	public function cat_page(){
        $cat_id=$this->uri->segment(3);
        if($cat_id){
           $data['category_data']=$this->Crud_model->getDirectQueryCommonData('SELECT id,category_name,image_url  FROM `category_details` ORDER BY `id` ASC');
           
       $data['home_buy_products']=$this->Crud_model->getDirectQueryCommonData("SELECT tp.*,
          pg.`image` 
         
        FROM
          `tbl_products` AS tp 
          INNER JOIN `product_gallery` AS pg 
            ON tp.id = pg.`pdt_id` 
          where tp.cat_id=$cat_id
          GROUP BY pg.`pdt_id` 
        ORDER BY pg.`id` DESC 
         ");
   
        $data['subview']="common-page";
        $this->load->view('layout/default', $data);

          }
        }
	
		
	public function brand(){

          $data['subview']="brand";
          $this->load->view('layout/default',$data);

     } 

	 
}
?>