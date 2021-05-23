<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cart extends CI_Controller {

    public function __construct()
        {
            parent::__construct();
            //load model
            $this->load->model('Cart_model');
            $this->load->library('cart');
            $this->load->helper('url');  
            $this->load->helper('form');  
            $this->load->library('form_validation');
            $this->load->library('session');
            $this->load->database();
            $this->load->library('encryption');
            $this->cart->product_name_rules = '[:print:]';
            $this->load->model('../../Common/Crud_model');
            $this->load->helper(array('form', 'url','new'));
        }
   public function index()
         {
            $data['subview']="cart";
            $this->load->view('layout/default', $data);
         }
        public function login(){
            
            $data['subview']="login";
            $this->load->view('layout/default', $data);  
        }
       public function logout_sess(){

         $this->session->sess_destroy();
         redirect(base_url());

       }
      public function cat_item(){
          $cat_name=$this->input->post('cat_val');
          $_SESSION['cat_name']=$cat_name;
      } 
      
      public function coupon_add(){

           $cop_code=$this->input->post('cop_code');
           $copdata=$this->Cart_model->coupon_add($cop_code);
           $cart = $this->cart->contents();
           
           $cart = $this->cart->contents();
            $grand_total = 0;
            foreach ($cart as $item)
                  {
                 $grand_total = $grand_total + $item['subtotal'];
                }    
           if(@$copdata->user_id==''){
              unset($_SESSION['coupon_code']);
              $status='0';
              echo $status;
           }else{
              $_SESSION['coupon_code']=$copdata->coupon_code;
              $status='1'; 
              echo $status;                          
            }
         }
      public function login_check(){
                $this->form_validation->set_rules('email', 'Email', 'required|valid_email');
                $this->form_validation->set_rules('password', 'Password', 'required');
                if ($this->form_validation->run() == FALSE)
                  {
                    $data['subview']="login";
                    $this->load->view('layout/default',$data);
                  }
                else
                  { 
                    $this->load->library('session');
                    $email = strtolower($this->input->post('email'));
                    $password = strtolower($this->input->post('password'));
                    $result = $this->Cart_model->login($email,$password);
                    if($result -> num_rows() > 0)
                      { 
                       foreach ($result->result() as $row)
                           { 
                            $this->session->userid = $row->id;
                            $this->session->email =  $row->email;
                            redirect(base_url().'Checkout/checkout');
                            }
                    }
                    else
                    {
                        $this->session->set_flashdata('login_error_msg','Email and Password is Wrong!!');
                        redirect(base_url().'Cart/login');
                    }
                }

      } 
    function add_custom(){
        $insert_data = array(
                        'id' =>$_SESSION['custom']['id'],
                        'name' => $_SESSION['custom']['name'],
                        'price' =>$_SESSION['custom']['price'],
                        'image' => $_SESSION['custom']['image'],
                        'cust_image' => $_SESSION['custom_src_url'],
                        'cus_text' => @$_SESSION['cus_text'],
                        'custom' =>'user_custom',
                        'color' => $_SESSION['custom']['book_desgin'],
                        'size' => $_SESSION['custom']['book_size'],
                        'qty' => $_SESSION['custom']['pack_off'],
                        'product_description'=>$_SESSION['custom']['product_description'],
                        'number_of_pages' => $_SESSION['custom']['number_of_pages'],
                        'pack_off' => $_SESSION['custom']['pack_off'],
                        'sku_no' => $_SESSION['custom']['sku_no'],
                         );
                $this->cart->insert($insert_data);
                
                 $data['custom_msg']='Thanks for customization';
                 $data['subview']="cart";
                 $this->load->view('layout/default', $data);

     }  
    function add()
             {
         
                $insert_data = array(
                        'id' => $this->input->post('pid'),
                        'name' => $this->input->post('product_name'),
                        'qty' => $this->input->post('product_qty'),
                        'price' => $this->input->post('product_price'),
                        'image' => $this->input->post('product_image')
                       
                        );
        
         //echo'<pre>';print_r($insert_data);die;
          $this->cart->insert($insert_data);
                 $cart = $this->cart->contents();
                 //echo'<pre>';print_r($cart);
                  if($cart = $this->cart->contents()){
                     $i = 0;
                    foreach($cart as $item){
                     $i++;} }
                    echo $i;
               
               }



    function get_item_count(){
        $cart = $this->cart->contents();
      if($cart = $this->cart->contents()){
         $i = 0;
        foreach($cart as $item){
         $i++;} }
        echo $i; 
         
    
    }    

     function clear_all(){
           $this->cart->destroy();
           redirect(base_url());
          } 
          
    function remove() {
          $rowid=$this->uri->segment(3);          
    if ($rowid==="all"){
                    $this->cart->destroy();
    }else{
                $data = array(
        'rowid'   => $rowid,
        'qty'     => 0
      );
        $this->cart->update($data);
     }
       redirect(base_url().'Cart/');
    }
    
   function remove_to_cart() {
              $pid=$this->input->post('p_id');
              $cart = $this->cart->contents();
                if($cart = $this->cart->contents()){
                     $i = 0;
                  foreach($cart as $item){
                    if($pid==$item['id']){
                      $rowid=$item['rowid'];
                    }
                  $i++;} 
               }    
         $data = array(
        'rowid'   => $rowid,
        'qty'     => 0
         );
       $this->cart->update($data);
       if($cart = $this->cart->contents()){
                     $i = 0;
                    foreach($cart as $item){
                      $cnt=count($cart);
                     if($cnt>0){
                        $i++;

                          }
                     } 
                     echo $i;
       }
    }
    
    function get_cart_info(){?>
   
   
      <div class="modal-header">
         <?php 
             $this->load->library('cart');
             $cart = $this->cart->contents();
            if($cart = $this->cart->contents()){
              $i = 0;
            foreach($cart as $item){
             $i++;} 
           }?>
        <h5 class="modal-title" >My Cart <span id="text_success" class="text-success">(<?php echo @$i;?>)</span></h5>
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
                   $grand_total = $grand_total + $item['subtotal'];
                 ?>
        <div class="media cart-list-product">
          <figure class="thumbnail">
            <img src="<?php echo base_url(); ?>admin/upload/product_bestseller/<?php echo $item['image'];?>" alt="">
          </figure>
          <div class="media-body">
            <h5 class="mt-2 fs-14 mb-1"><?php echo $item['name'];?></h5>
            <p class="price">₹ <?php echo @$item['price'];?> X <?php echo @$item['qty'];?></p>
            
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
          <!--<button type="button" class="btn btn-primary">Check Out</button>-->
      <a href="<?php echo base_url();?>Checkout/checkout"><button class="btn btn-primary" type="button">Check Out ₹ <?= number_format(@$grand_total,2)?></button></a>
      
        </div>
      </div>
    
  
    
   <?php } 
    
    
    
  
  function remove_item(){?>


    
            <?php 
               $rowid=$_POST['row_id'];
      if ($rowid==="all"){
         $this->cart->destroy();
          }else{
                $data = array(
                'rowid'   => $rowid,
                'qty'     => 0
               );
            $this->cart->update($data);
           } ?>
            <div class="modal-header">
          
          <?php 
            $this->load->library('cart');
             $cart = $this->cart->contents();
            if($cart = $this->cart->contents()){
              $i = 0;
            foreach($cart as $item){
             $i++;} 


           }
           ?>
        <h5 class="modal-title">My Cart <span>(<?php echo @$i;?>)</span></h5>
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
                   $grand_total = $grand_total + $item['subtotal'];
                 ?>
        <div class="media cart-list-product">
          <figure class="thumbnail">
            <img src="<?php echo base_url()?>assets/img/t-p-c-img.png" alt="">
          </figure>
          <div class="media-body">
            <h5 class="mt-2 fs-14 mb-1"><?php echo $item['name'];?></h5>
            <p class="price">$<?php echo @$item['price'];?></p>
          </div>
          <i class="far fa-trash-alt product-remove" onclick="delete_item('<?php echo $item['rowid'];?>')"></i>

        </div>
    <?php } }?>
      </div>
      <div class="modal-footer d-block">
        <div class="d-flex justify-content-between subtotal">
          <span class="txt">Subtotal</span>
          <span class="amount">$<?= number_format(@$grand_total,2)?></span>
        </div>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn theme-btn">View Cart</button>
      <a href="<?php echo base_url();?>Checkout/checkout"><button class="btn btn-primary" type="button">Check Out <?= number_format(@$grand_total,2)?></button></a>
        </div>
      </div>

  <?php } 
      function update_cart_ajax(){
                $rowid = $_POST['row_id'];
                $price = $_POST['price'];
                $amount = $price * $_POST['qty'];
                $qty = $_POST['qty'];
                $data = array(
                            'rowid'   => $rowid,
                            'price'   => $price,
                            'amount' =>  $amount,
                            'qty'     => $qty
                    );
                $this->cart->update($data);
                
                if($cart = $this->cart->contents()){
                  $grand_total = 0;
                  $i = 1;
                  foreach ($cart as $item)
                  {
                      $grand_total = $grand_total + $item['price'] * $item['qty'];


                  } 
                 } 
               echo  ' ₹&nbsp; '.number_format(@$grand_total,2);   

         }  
        function update_cart(){

            $cart_info =  $_POST['cart'] ;
            foreach( $cart_info as $id => $cart)
                { 
                $rowid = $cart['rowid'];
                $price = $cart['price'];
                $amount = $price * $cart['qty'];
                $qty = $cart['qty'];

                    $data = array(
                            'rowid'   => $rowid,
                            'price'   => $price,
                            'amount' =>  $amount,
                            'qty'     => $qty
                    );
                $this->cart->update($data);
                }
              redirect(base_url().'Cart');       
            }
       
  
}
