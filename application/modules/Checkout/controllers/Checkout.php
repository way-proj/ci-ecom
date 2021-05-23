<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Checkout extends CI_Controller {

  function __construct()
    {
      parent::__construct();
           
            //$this->load->model('Dashboard_Model');
           // $this->load->model('Category_Model');
           // $this->load->model('Subcategory_Model');
            $this->load->library('cart');
            $this->load->helper('url');  
            $this->load->helper('form');  
            $this->load->library('session');
            $this->load->database();
            //$this->load->library('encrypt');
            $this->load->helper('crypto_helper');
            $this->load->library('form_validation');
            $this->load->library('encryption');
            $this->load->model('Checkout_model');
            $this->load->model('../../Common/Crud_model');
           $this->load->helper(array('form', 'url','new'));
            
           
        }
        public function index()
        {    //echo'<pre>'; print_r($_SESSION);die;
            $data['category_data']=$this->Crud_model->getDirectQueryCommonData('SELECT id,category_name,image_url  FROM `category_details` ORDER BY `id` ASC');
            $userid=@$_SESSION['userid'];  
            if(@$userid){
              $data['cust_data']=$this->Checkout_model->get_checkout_data($userid);

            }
            $data['state'] = $this->Checkout_model->get_state();
            $data['count_order'] = $this->Checkout_model->count_order();

            $data['subview']="checkout";
            $this->load->view('layout/default',$data);
           // $this->load->view('Checkout/checkout',$data);
            $this->step_1();
        }
      public function get_city(){
                 $st_id=$_POST['st_id'];
                 $city_details= $this->Checkout_model->get_city_data($st_id);
                // echo'<pre>';print_r($city_details);

                 foreach ($city_details as $value) {?>
                    <option value="<?php echo $value->id;?>"><?php echo $value->name;?></option>
                <?php }
           
        }
        public function Signup_user(){
               $name=$this->input->post('name');
               $email=$this->input->post('email');
               $phone=$this->input->post('phone');
               $this->load->library('session');
               $check_reg_user = $this->Checkout_model->check_reg_user($email);
               //print_r($check_reg_user);die;
               if(@$check_reg_user->customer_id!=''){
                $this->session->set_flashdata('alredy_reg_error','You already register by this email id!');
                unset($_SESSION['reg_error']);
                unset($_SESSION['reg_msg']);
                unset($_SESSION['login_succ_show']);
                unset($_SESSION['login_error_show']);
                redirect(base_url().'Checkout/checkout');
               }else{
               $password= md5($this->input->post('password'));
               $created_date=date('Y-m-d H:i:s');
               $insert_data=array(
                    'first_name'=>$name,
                    'email'=>$email,
                    'password'=>$password,
                    'phone'=>$phone,
                    'created_date'=>$created_date
                   );
              $user_id=$this->Checkout_model->save_customer_data($insert_data);
              //$this->session->userid = $user_id;
              //$this->session->email =  $email;
              //$this->session->user_name = $name;
              $this->session->set_flashdata('reg_msg','You are successfully register.');
              unset($_SESSION['reg_error']);
              unset($_SESSION['login_succ_show']);
              unset($_SESSION['alredy_reg_error']);
              unset($_SESSION['login_error_show']);
              redirect(base_url().'Checkout/checkout');
              }

        }
    public function front_login(){
       $data['subview']="front_login";
       $this->load->view('layout/default',$data);

     } 
         public function login_front_check(){

                $this->form_validation->set_rules('email', 'Email', 'required|valid_email');
                $this->form_validation->set_rules('password', 'Password', 'required');
                
                if ($this->form_validation->run() == FALSE)
                   {
                   // $this->load->view('admin/login');
                    //$data['subview']="login";
                    //$this->load->view('layout/default',$data);
                     redirect(base_url().'Checkout/front_login');
                   }
                else
                   { 
                    $this->load->library('session');
                    $email = strtolower($this->input->post('email'));
                    $password = strtolower($this->input->post('password'));
                    $check_reg_user = $this->Checkout_model->check_reg_user($email);
                    if($check_reg_user->email!=''){
                    $result = $this->Checkout_model->login($email,$password);
                    if($result -> num_rows() > 0)
                      { 
                        foreach ($result->result() as $row)
                         { 
                            $this->session->userid = $row->customer_id;
                            //$this->session->admin = $row->is_Admin;
                             $this->session->email =  $row->email;
                             $this->session->user_name =  $row->first_name;
                             $this->session->set_flashdata('login_succ_show','Successfully login');
                             unset($_SESSION['login_error_show']);
                             unset($_SESSION['login_msg']);
                             unset($_SESSION['reg_error']);
                             unset($_SESSION['reg_msg']);
                             unset($_SESSION['ship_msg']);
                             unset($_SESSION['alredy_reg_error']);
                             redirect(base_url().'Pages/general_notebook');
                            
                            //$data['subview']="user_dashboard";
                            //$this->load->view('layout/default',$data);
                            
                        }
                     }
                    else
                     {
                        //echo"3"; die;
                        $this->session->set_flashdata('login_error_show','Email and Password is Wrong!!');
                         unset($_SESSION['reg_error']);
                         unset($_SESSION['login_succ_show']);
                         unset($_SESSION['reg_msg']);
                         redirect(base_url().'Checkout/front_login');
                       }

                    }else{

                    $this->session->set_flashdata('reg_error','Your email id does not exist please register now!');
                    unset($_SESSION['login_error_show']);
                    unset($_SESSION['login_msg']);
                    unset($_SESSION['login_succ_show']);

                    redirect(base_url().'Checkout/front_login');

                   }




                  }



      }
          public function Signup_user_front(){
               $name=$this->input->post('name');
               $email=$this->input->post('email');
               $phone=$this->input->post('phone');
               $check_reg_user = $this->Checkout_model->check_reg_user($email);
              // print_r($check_reg_user);die;
               if(@$check_reg_user->customer_id!=''){
                $this->session->set_flashdata('alredy_reg_error','You already register by this email id!');
                unset($_SESSION['reg_error']);
                unset($_SESSION['reg_msg']);
                unset($_SESSION['login_succ_show']);
                unset($_SESSION['login_error_show']);
                redirect(base_url().'Checkout/front_login');
               }else{

               $password= md5($this->input->post('password'));
               $created_date=date('Y-m-d H:i:s');
               $insert_data=array(
                    'first_name'=>$name,
                    'email'=>$email,
                    'password'=>$password,
                    'phone'=>$phone,
                    'created_date'=>$created_date
                   );
              // print_r($insert_data);die;
              $this->Checkout_model->save_customer_data($insert_data);
              $this->session->set_flashdata('reg_msg','You are successfully register.');
              unset($_SESSION['reg_error']);
              unset($_SESSION['login_succ_show']);
              redirect(base_url().'Checkout/front_login');
              }

        }

         public function login_check(){
           //echo'<pre>'; print_r($_POST);die;
            if ($this->session->userdata('userid')== "")
               {
                $this->session->set_flashdata('login_msg','You are  not login user!');
                redirect(base_url().'Checkout/checkout');
               }else{
                     if(!empty($_POST))
                                      {
                                      if($_POST['payment_mode']=='online'){
                                        $_SESSION['mode']='online';
                                        // echo'<pre>'; print_r($_POST);die;
                                        $order_date=date('Y-m-d :H:i:s');
                                        $uid=$this->session->userdata('userid');
                                        $country = $this->input->post('billing_country');
                                        $city = $this->input->post('billing_city');
                                        $province = $this->input->post('order_id');
                                        //$postcode = 0111;
                                        $billing_zip = $this->input->post('billing_zip');
                                        $add1 = $this->input->post('billing_address');
                                        $billing_state = $this->input->post('billing_state');
                                        $add2 = $this->input->post('add2');
                                        $fname = $this->input->post('billing_name');
                                        //$lname= $this->input->post('order_id');
                                        $phone = $this->input->post('billing_tel');
                                        $email = $this->input->post('billing_email');
                                        $optradio=$this->input->post('optradio');
                                        $insert_id = $this->Checkout_model->addcheckout($country,$city,$province,$billing_zip,$add1,$fname,$phone,$email,$uid,$billing_state);
                                       $in=$this->db->insert_id();
                                      
                                        $checkout_id=$this->session->userdata('checkout_id');
                                        $checkout_id=$this->session->userdata('checkout_id');
                                        $this->session->set_userdata('checkout_id',$in);
                                        $payment='Online Payment';
                                        $checkout_id=$this->session->userdata('checkout_id');
                                        $this->Checkout_model->addpayment($payment,$checkout_id,$uid);
                                        $uid=$this->session->userdata('userid');
                                        $total=0;
                                        $qu=0;
                                        //add to cart in database
                                        $cart=$this->cart->contents();
                                        //echo'<pre>';print_r($cart);die;
                                        if(!empty($this->cart->contents()))
                                        {
                                                    $total = 0;
                                                    $total_cart=$this->cart->total_items();
                                                    $this->Checkout_model->insertcart($total_cart);
                                                    $insert_id=$this->db->insert_id();
                                                    $checkout_id=$this->session->userdata('checkout_id');
                                                    $this->Checkout_model->addcheckoutcart($insert_id,$checkout_id,$uid);
                                                    foreach ($this->cart->contents() as $items){
                                                           $file_name=$items['image'];
                                                               $total = $total + (($items['qty']) * ($items['price']));
                                                               $price=(($items['qty']) * ($items['price']));
                                                               $qu = $qu + $items['qty'];
                                                               $this->Checkout_model->insertcartproductdetail($insert_id,$items['id'],$price,$items['qty'],@$items['color'],@$items['size'],$items['image'],@$items['color'],@$items['number_of_pages'],$file_name);
                                                           }
                                        }
                                        
                                        //add sales detail to database
                                        $byname=$this->session->userdata('firstname');
                                        //$createby=$this->session->userdata('mem_id');
                                        $createby= '0';
                                        $this->Checkout_model->addsale($byname,$total,$createby,$qu);
                                        $insert=$this->db->insert_id();
                                       //$this->Checkout_model->addcheckoutcart($insert,$checkout_id,$uid);
                                        $output['cartdetail'] = $this->Checkout_model->getcartdata($uid);
                                        foreach ($output['cartdetail'] as $select4):
                                                        $this->Checkout_model->addsaledetail($insert,$select4);
                                        endforeach;   
                                        //$this->cart->destroy();
                                        $this->db->set('is_shipped',1);
                                        $this->db->where('userid',$uid);
                                        $this->db->update('tbl_cart');
                                        $this->session->set_userdata('checkout_id',$in);
                              
                                     
                //$merchant_data='238214';
                $merchant_data='';                        
                $working_key='4171EB653FF82BB5F311A66E9B92303D';//Shared by CCAVENUES
                $access_code='AVDW88GK75AW19WDWA';//Shared by CCAVENUES
                foreach ($_POST as $key => $value){
                  $merchant_data.=$key.'='.urlencode($value).'&';
                 }

                 $encrypted_data=encrypt($merchant_data,$working_key); // Method for encrypting the data.

               // echo '<pre>';print_r($merchant_data);die;

                 ?>
              <form method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"> 
              <?php
              echo "<input type=hidden name=encRequest value=$encrypted_data>";
              echo "<input type=hidden name=access_code value=$access_code>";
              ?>
              </form>
              </center>
              <script language='javascript'>document.redirect.submit();</script>
              <?php
             
                 }else{


                  
                      //echo"Cash on Delivery";
                     //echo'<pre>'; print_r($_POST);die;
                                      $_SESSION['mode']='COD';
                                        // echo'<pre>'; print_r($_POST);die;
                                        $order_date=date('Y-m-d :H:i:s');
                                        $uid=$this->session->userdata('userid');
                                        $country = $this->input->post('billing_country');
                                        $city = $this->input->post('billing_city');
                                        $province = $this->input->post('order_id');
                                        //$postcode = 0111;
                                        $billing_zip = $this->input->post('billing_zip');
                                        $add1 = $this->input->post('billing_address');
                                        $billing_state = $this->input->post('billing_state');
                                        $add2 = $this->input->post('add2');
                                        $fname = $this->input->post('billing_name');
                                        //$lname= $this->input->post('order_id');
                                        $phone = $this->input->post('billing_tel');
                                        $email = $this->input->post('billing_email');
                                        $optradio=$this->input->post('optradio');
                                        $insert_id = $this->Checkout_model->addcheckout($country,$city,$province,$billing_zip,$add1,$fname,$phone,$email,$uid,$billing_state);
                                       $in=$this->db->insert_id();
                                      
                                        $checkout_id=$this->session->userdata('checkout_id');
                                        $checkout_id=$this->session->userdata('checkout_id');
                                        $this->session->set_userdata('checkout_id',$in);
                                        $payment='COD';
                                        $checkout_id=$this->session->userdata('checkout_id');
                                        $this->Checkout_model->addpayment($payment,$checkout_id,$uid);
                                        $uid=$this->session->userdata('userid');
                                        $total=0;
                                        $qu=0;
                                        //add to cart in database
                                        $cart=$this->cart->contents();
                                        //echo'<pre>';print_r($cart);die;
                                        if(!empty($this->cart->contents()))
                                        {
                                                    $total = 0;
                                                    $total_cart=$this->cart->total_items();
                                                    $this->Checkout_model->insertcart($total_cart);
                                                    $insert_id=$this->db->insert_id();
                                                    $_SESSION['cart_id']=$insert_id;
                                                    $checkout_id=$this->session->userdata('checkout_id');
                                                    $this->Checkout_model->addcheckoutcart($insert_id,$checkout_id,$uid);
                                                    foreach ($this->cart->contents() as $items){
                                                           $file_name=$items['image'];
                                                               $total = $total + (($items['qty']) * ($items['price']));
                                                               $price=(($items['qty']) * ($items['price']));
                                                               $qu = $qu + $items['qty'];
                                                               $this->Checkout_model->insertcartproductdetail(@$items['gst_per'],@$items['gst_type'],$insert_id,$items['id'],$price,$items['qty'],@$items['color'],@$items['size'],$items['image'],@$items['color'],@$items['number_of_pages'],$file_name);
                                                           }
                                        }
                                        
                                        //add sales detail to database
                                        $byname=$this->session->userdata('firstname');
                                        //$createby=$this->session->userdata('mem_id');
                                        $createby= '0';
                                        $this->Checkout_model->addsale($byname,$total,$createby,$qu);
                                        $insert=$this->db->insert_id();
                                       //$this->Checkout_model->addcheckoutcart($insert,$checkout_id,$uid);
                                        $output['cartdetail'] = $this->Checkout_model->getcartdata($uid);
                                        foreach ($output['cartdetail'] as $select4):
                                                        $this->Checkout_model->addsaledetail($insert,$select4);
                                        endforeach;   
                                        //$this->cart->destroy();
                                        $this->db->set('is_shipped',1);
                                        $this->db->where('userid',$uid);
                                        $this->db->update('tbl_cart');
                                        $this->session->set_userdata('checkout_id',$in);
                     

                                      //send mail

    
   $subject='New Order-COD';
   $to=$email;
   $order_date=date('Y-m-d :H:i:s');
   $order_date2=explode(' ',$order_date);
   $order_date_format3=explode('-',$order_date2[0]);
   $order_date_format=$order_date_format3[2].'-'.$order_date_format3[1].'-'.$order_date_format3[0];
    //send mail
   $message = "
      <html>
      <body>
      <table width='750' border='0' align='center' cellpadding='0' cellspacing='0'>
        <tbody>
            <tr>
                <td align='left' valign='middle' style='padding: 15px 0px'><a href='http://stage.wayinfotechsolutions.co/buyorbye' target='_blank' rel='noreferrer'></a></td>
            </tr>
            <tr>
                <td align='left' valign='top' class='maincontainer' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #373737; background-color: #fff; padding: 20px; border: solid 1px #bcc2cf'>
                    <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                        <tbody>
                            <tr><td>Dear <strong>".@$fname."</strong>,</td><td align='right'><strong>GST: 09AADCB0282B2Z5</strong></td></tr>
                            <tr><td colspan='2' align='center'><h2 style='font-size:36px; margin-top:0; color:#000'>Invoice</h2></td></tr>
                            <tr><td colspan='2'><img src='http://stage.wayinfotechsolutions.co/restaurants/images/logo.png' style='width:150px'><br><br>
                            Thank you for your order from <a href='http://stage.wayinfotechsolutions.co/restaurants/' class='hylink2' style='font-size: 12px; color: #e85f04' target='_blank' rel='noreferrer'>http://stage.wayinfotechsolutions.co/restaurants/</a><br><br>
                            For your convenience, we have included a copy of your order below.</td></tr>
                            <tr><td><br></td></tr>
                        </tbody>
                    </table>
                    <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                        <tbody>
                            <tr>
                                <td align='left' valign='top' class='innercontainer' style='background-color: #fff; padding:9px; border: solid 1px #dbdfe6'>
                                    <table width='100%' border='0' cellspacing='0' cellpadding='6' class='innerborder' style='border: solid 1px #E4E6EB; font-size: 11px; color: #373737;'>
                                        <tbody>
                                            <tr class='tableinner'>
                                                <td width='50%' height='18' align='left' valign='middle' style='background-color: #f7f7f7'><strong>Order id</strong></td>
                                                
                                                <td width='25%' height='18' align='left' valign='middle' style='background-color: #f7f7f7; border-left: solid 1px #E4E6EB'><strong>Order Date</strong></td>
                                                <td width='25%' height='18' align='left' valign='middle' style='background-color: #f7f7f7; border-left: solid 1px #E4E6EB'><strong>Order Time</strong></td>
                                            </tr>
                                            <tr>
                                                <td colspan='3' align='left' valign='middle' class='divider' height='1' style='background-color: #E4E6EB; padding:0px'></td>
                                            </tr>
                                            <tr>
                                                <td width='47%' height='18' align='left' valign='middle'>".@$province."</td>
                                                <td width='18%' height='18' align='left' valign='middle' style='border-left: solid 1px #E4E6EB'>".@$order_date_format."</td>
                                                <td width='18%' height='18' align='left' valign='middle' style='border-left: solid 1px #E4E6EB'>".@$order_date2[1]."</td>
                                            </tr>
                                        </tbody>
                                    </table><br>
                                    <table width='100%' border='0' cellspacing='0' cellpadding='6' style='border: solid 1px #E4E6EB'>
                                        <tbody>
                                            <tr>
                                                <td width='50%' height='25' align='left' valign='middle' class='title' style='font-size: 15px; color: #0072c6; border-bottom: solid 1px #dbdfe6'>Billing Details</td>
                                                <td width='50%' height='25' align='left' valign='middle' class='title' style='font-size: 15px; color: #0072c6; border-bottom: solid 1px #dbdfe6; border-left: solid 1px #E4E6EB'>Delivery Details</td>
                                            </tr>
                                            <tr>
                                                <td width='50%' align='left' valign='top'>
                                                    <table width='100%' style='font-size: 11px; color: #373737' border='0' cellspacing='0' cellpadding='4'>
                                                        <tbody>
                                                            <tr>
                                                                <td valign='top'><strong>Name:</strong> ".@$fname."</td>
                                                            </tr>
                                                            <tr>
                                                                <td valign='top' style='font-size: 11px; color: #373737'><strong>Mobile:</strong> ".@$phone."</td>
                                                            </tr>
                                                            <tr>
                                                                <td valign='top'><strong>Email:</strong> ".@$email."</td>
                                                            </tr>
                                                            <tr>
                                                                <td valign='top'><strong>Address:</strong> ".@$add1.','.@$city.','.@$billing_state.','.@$country.','.$billing_zip."</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td valign='top'><strong>Payment Mode:</strong>COD</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td width='50%' style='border-left: solid 1px #E4E6EB;' align='left' valign='top'>
                                                    <table width='100%' style='font-size: 11px; color: #373737' border='0' cellspacing='0' cellpadding='4'>
                                                        <tbody>
                                                            <tr>
                                                                <td valign='top'><strong>Name: </strong> ".@$fname."</td>
                                                            </tr>
                                                            <tr>
                                                                <td valign='top' style='font-size: 11px; color: #373737'><strong>Mobile:</strong> ".@$phone."</td>
                                                            </tr>
                                                            <tr>
                                                                <td valign='top'><strong>Email: </strong> ".@$email."</td>
                                                            </tr>
                                                            <tr>
                                                               <td valign='top'><strong>Address:</strong> ".@$add1.','.@$city.','.@$billing_state.','.@$country.','.$billing_zip."</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td valign='top'><strong>Payment Mode:</strong> COD</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                              </tr>
                                        </tbody>
                                    </table><br>
                                    <table width='100%' border='0' cellspacing='0' cellpadding='6' class='innerborder' style='border: solid 1px #E4E6EB'>
                                        <tbody>
                                            <tr>
                                                <td height='25' colspan='4' align='left' valign='middle' class='title' style='font-size: 15px; color: #0072c6; border-bottom: solid 1px #dbdfe6'>Product Details</td>
                                            </tr>
                                            <tr class='tableinner' style='font-size: 12px; color: #373737;'>
                                                <td width='50%' height='18' align='left' valign='middle' style='background-color: #f7f7f7'><strong>Product images with Win image</strong></td>
                                                <td width='60%' height='18' align='left' valign='middle' style='font-size: 15px; color: #0072c6; border-bottom: solid 1px #dbdfe6'>Product Information</td>
                                            </tr>
                                            <tr>
                                                <td colspan='2' align='left' valign='middle' class='divider' height='1' style='background-color: #E4E6EB; padding: 0px'></td>
                                            </tr>";
                                             $total=0;
                                             $qu=0;  
                                             foreach ($this->cart->contents() as $items){
                                              //print_r($items);
                                                             $total = $total + (($items['qty']) * ($items['price']));
                                                            //echo $qu = $qu + $items['qty'];
                                                            
                                       $message.=
                                            "<tr style='font-size: 11px; color: #373737;'>
                                                <td align='left' valign='middle'><img src='https://stage.wayinfotechsolutions.co/restaurants/admin/upload/product_images/".@$items['image']."' style='height:120px'></td>
                                                <td align='left' valign='middle' style='border-left: solid 1px #E4E6EB; line-height:20px'>
                                                    <h3 style='margin:5px 0 0; font-size:13px'>".@$items['name']." <span style=font-weight: normal;'></span></h3>
                                                   <strong>Qty:</strong> ".@$items['qty']."<br>
                                                    <strong>Weight:</strong> ".@$items['weight']." gram<br>
                                                    <strong>Price:</strong> INR ".((@$items['qty']) * (@$items['price'])).".00<br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan='4' align='left' valign='middle' class='divider' height='1' style='background-color: #E4E6EB; padding: 0px'></td>
                                            </tr>";
                                            //$gst_per=@$items['gst_per'];
                                            //$gst_type=@$items['gst_type'];
                                            $gst_per=18;
                                            $gst_type='Enclusive';
                                            }
                                          //if(@$items['gst_type']=='Enclusive'){
                                            if(@$gst_type=='Enclusive'){
                                            $cgst=$gst_per/2;
                                            $cgst_val=($total*$cgst)/100; 
                                            $sgst=$gst_per/2;
                                            $sgst_val=($total*$sgst)/100; 
                                            $total_gst=$gst_per;
                                            $total_gst_val=($total*$gst_per)/100; 
                                            $grand_total=$total+$total_gst_val;
                                           }
                                           if(@$items['gst_type']=='Exclusive'){
                                             $cgst=$gst_per/2;
                                             $dd=100/(100+$cgst);
                                             $ss=$total*$dd;
                                             $cgst_val=number_format($total-$ss,2); 
                                             $sgst=$gst_per/2;
                                             $kk=100/(100+$cgst);
                                             $hh=$total*$dd;
                                             $sgst_val=number_format($total-$hh,2);; 
                                             $total_gst=$gst_per;
                                             $mm=100/(100+$total_gst);
                                             $zz=$total*$mm;
                                             $total_gst_val=number_format($total-$zz,2); 
                                             $grand_total=$total-$total_gst_val;
                                           }
                                           
                                           $message.="<tr class='tableinner'>
                                                <td width='27%' height='22' align='left' valign='middle' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #373737; background-color: #f7f7f7'><strong>GST type</strong></td>
                                                <td width='18%' height='22' align='left' valign='middle' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #373737; background-color: #f7f7f7; border-left: solid 1px #E4E6EB'><strong> ".@$gst_type."</strong></td>
                                            </tr><tr class='tableinner'>
                                                <td width='27%' height='22' align='left' valign='middle' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #373737; background-color: #f7f7f7'><strong>CGST ".@$cgst."% </strong></td>
                                                <td width='18%' height='22' align='left' valign='middle' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #373737; background-color: #f7f7f7; border-left: solid 1px #E4E6EB'><strong>INR ".number_format(@$cgst_val, 2)."</strong></td>
                                            </tr>
                                            <tr class='tableinner'>
                                                <td width='27%' height='22' align='left' valign='middle' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #373737; background-color: #f7f7f7'><strong>SGST ".@$sgst."% </strong></td>
                                                <td width='18%' height='22' align='left' valign='middle' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #373737; background-color: #f7f7f7; border-left: solid 1px #E4E6EB'><strong>INR ".number_format(@$sgst_val, 2)."</strong></td>
                                            </tr>
                                            <tr class='tableinner'>
                                                <td width='27%' height='22' align='left' valign='middle' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #373737; background-color: #f7f7f7'><strong>Total GST ".@$total_gst." % </strong></td>
                                                <td width='18%' height='22' align='left' valign='middle' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #373737; background-color: #f7f7f7; border-left: solid 1px #E4E6EB'><strong>INR ".number_format(@$total_gst_val, 2)."</strong></td>
                                            </tr>
                                            <tr class='tableinner'>
                                                <td width='27%' height='22' align='left' valign='middle' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #373737; background-color: #f7f7f7'><strong>Grand Total </strong></td>
                                                <td width='18%' height='22' align='left' valign='middle' style='font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #373737; background-color: #f7f7f7; border-left: solid 1px #E4E6EB'><strong> INR ".number_format(@$grand_total, 2)."</strong></td>
                                            </tr>
                                        </tbody>
                                    </table><br>
                                    <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                                        <tbody>
                                            <tr>
                                                <td height='25' align='left' valign='top' class='title' style='font-size: 15px; color: #0072c6; border-bottom: solid 1px #dbdfe6'>Support Details</td>
                                            </tr>
                                            <tr>
                                                <td align='left' valign='top'>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td width='412' align='left' valign='top'>
                                                    <table width='100%' border='0' cellspacing='0' cellpadding='4' style='font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #373737'>
                                                        <tbody>
                                                            <tr>
                                                                <td width='16%' valign='middle'><strong>Contact email:</strong></td>
                                                                <td width='84%' valign='middle'> <a href='mailto:jamairaja.ethnic@gmail.com'>amrit@wayinfotechsolutions.com</a></td>
                                                            </tr>
                                                            <tr>
                                                                <td valign='top'><strong>Contact Address:</strong></td>
                                                                <td valign='middle' style='line-height:18px'>1221, iThum Tower-B, A 40, Industrial Area, Sector 62 Noida, Uttar Pradesh 201301, India</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
  </body>
      </html>
      ";
//echo $message;
//die;
      // Always set content-type when sending HTML email
      $headers = "MIME-Version: 1.0" . "\r\n";
      $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

      // More headers
      $headers .= 'From: <restaurants@example.com>' . "\r\n";
     // $headers .= 'Cc: yash@mematdigi.com' . "\r\n";
      //$headers .= 'Cc: dinesh@mematdigi.com' . "\r\n";

      //$headers .= 'Cc: ypriyanka741@gmail.com' . "\r\n";

      mail($to,$subject,$message,$headers);

                                     
     redirect(base_url().'Pages/payment_success_cod');

                                        
                                        

                      }
                   }

               }
            
        }

        
      public function login(){

                $this->form_validation->set_rules('email', 'Email', 'required|valid_email');
                $this->form_validation->set_rules('password', 'Password', 'required');
                
                if ($this->form_validation->run() == FALSE)
                   {
                   // $this->load->view('admin/login');
                    //$data['subview']="login";
                    //$this->load->view('layout/default',$data);
                     redirect(base_url().'Checkout/checkout');
                   }
                else
                   { 
                    $this->load->library('session');
                    $email = $this->input->post('email');
                    $password = $this->input->post('password');
                    $check_reg_user = $this->Checkout_model->check_reg_user($email);
                    if($check_reg_user->email!=''){
                    $result = $this->Checkout_model->login($email,$password);
                    if($result -> num_rows() > 0)
                      { 
                        foreach ($result->result() as $row)
                        { 
                            $this->session->userid = $row->customer_id;
                            //$this->session->admin = $row->is_Admin;
                            $this->session->email =  $row->email;
                            $this->session->user_name =  $row->first_name;
                            
                            $this->session->set_flashdata('login_succ_show','Successfully login');
                            unset($_SESSION['login_error_show']);
                            unset($_SESSION['login_msg']);
                            unset($_SESSION['reg_error']);
                            unset($_SESSION['reg_msg']);
                            unset($_SESSION['ship_msg']);
                            unset($_SESSION['alredy_reg_error']);
                            
                            
                            redirect(base_url().'Checkout/checkout');
                            
                            //$data['subview']="user_dashboard";
                            //$this->load->view('layout/default',$data);
                            
                        }
                     }
                    else
                     {
                        //echo"3"; die;
                        $this->session->set_flashdata('login_error_show','Email and Password is Wrong!!');
                         unset($_SESSION['reg_error']);
                         unset($_SESSION['login_succ_show']);
                          unset($_SESSION['reg_msg']);

                        redirect(base_url().'Checkout/checkout');
                      }

                   }else{

                    $this->session->set_flashdata('reg_error','Your email id does not exist please register now!');
                    unset($_SESSION['login_error_show']);
                    unset($_SESSION['login_msg']);
                    unset($_SESSION['login_succ_show']);

                    redirect(base_url().'Checkout/checkout');

                   }




                  }



      }
       public function step_1()
       {
             // print_r($_POST);die;
      if($this->input->post('cdetail'))
       {
                                    if(!empty($_POST))
                                      {
                                        $uid=$this->session->userdata('userid');
                                        $country = $this->input->post('country');
                                        $city = $this->input->post('city');
                                        $province = $this->input->post('province');
                                        $postcode = $this->input->post('postcode');
                                        $add1 = $this->input->post('add1');
                                        $add2 = $this->input->post('add2');
                                        $fname = $this->input->post('fname');
                                        $lname= $this->input->post('lname');
                                        $phone = $this->input->post('phone');
                                        $email = $this->input->post('email');
                                        $insert_id = $this->Checkout_Model->addcheckout($country,$city,$postcode,$add1,$fname,$phone,$email,$uid);
                                        $in=$this->db->insert_id();
                                        $checkout_id=$this->session->userdata('checkout_id');
                                        $this->session->set_userdata('checkout_id',$in);
                                        $payment='Cash';
                                        $checkout_id=$this->session->userdata('checkout_id');
                                        $this->Checkout_model->addpayment($payment,$checkout_id,$uid);
                                        $uid=$this->session->userdata('userid');
                                        $total=0;
                                        $qu=0;
                                        //add to cart in database
                                        if(!empty($this->cart->contents()))
                                        {
                                                    $total = 0;
                                                    $total_cart=$this->cart->total_items();
                                                    $this->Checkout_model->insertcart($total_cart);
                                                    $insert_id=$this->db->insert_id();

                                                    $checkout_id=$this->session->userdata('checkout_id');
                                                    $this->Checkout_model->addcheckoutcart($insert_id,$checkout_id,$uid);
                                                    foreach ($this->cart->contents() as $items):
                                                            $ip = $_SERVER['REMOTE_ADDR'];
                                                            $total = $total + (($items['qty']) * ($items['price']));
                                                            $qu = $qu + $items['qty'];
                                                            $this->Checkout_model->insertcartproductdetail($insert_id,$items['id'],$items['price'],$items['qty'],$ip,$items['color'],$items['size']);
                                                    endforeach;
                                        }
                                        //add sales detail to database
                                        $byname=$this->session->userdata('firstname');
                                        //$createby=$this->session->userdata('mem_id');
                                        $createby= '0';
                                        $this->Checkout_model->addsale($byname,$total,$createby,$qu);
                                        $insert=$this->db->insert_id();
                                        $this->Checkout_model->addcheckoutcart($insert,$checkout_id,$uid);
                                        $output['cartdetail'] = $this->Checkout_model->getcartdata($uid);
                                        foreach ($output['cartdetail'] as $select4):
                                                        $this->Checkout_model->addsaledetail($insert,$select4);
                                        endforeach;   
                                        $this->cart->destroy();
                                        $this->db->set('is_shipped',1);
                                        $this->db->where('userid',$uid);
                                        $this->db->update('tbl_cart');
                                        $this->session->set_flashdata('SUCCESSMSG','Your Order Successfully Placed!!');
                                       // redirect('index.php/cart/add');
                                        redirect(base_url().'Cart/add');
                //redirect(base_url().'Checkout/step_3');
              
              
          }
      }
                    
  }
  public function step_2()
        {
            $category =  $this->subcategory_model->getCategoryList();
            foreach($category as $cat)
            {
                $cat_list['cat'] = $cat->category_name;
                $cat_list['cat_id'] = $cat->id;
                $subcategory = $this->subcategory_model->getSubCategoryList($cat->id);

                $cat_list['sub'] = $subcategory;
                $result[] = $cat_list;
            }
            $data['result'] = $result;
            $footer['footer'] = $this->page_model->getPagedata();
            $this->load->view($this->config->item('fronttemplate').'/front_header',$data);
            $this->load->view($this->config->item('fronttemplate').'/step-2');
            $this->load->view($this->config->item('fronttemplate').'/front_footer',$footer);
       

             //redirect('front/checkout/step_3');       
  }
        
  public function step_3()
        {
            //print_r($_POST);die;
            //$data['category_list'] = $this->Category_Model->get_list();
           // $data['subcate'] = $this->Subcategory_Model->viewSubCategoryList();
            //$this->load->view('step_3');
            //$data['subview']="step_3";
            //$this->load->view('layout/default', $data);

            if($this->input->post('paymentdetail'))
            {
                      if(!empty($_POST))
                      {
                                    $uid=$this->session->userdata('userid');

                                    $payment = $this->input->post('payment');
                                    $checkout_id=$this->session->userdata('checkout_id');
                                    $this->Checkout_Model->addpayment($payment,$checkout_id,$uid);
                                    redirect(base_url().'Checkout/step_4');
                    }
            }
           
  }

public function payment_submit(){
         //check whether stripe token is not empty
if(!empty($_POST['stripeToken'])){
    $this->load->library('cart');
    $cart = $this->cart->contents();
     $grand_total = 0;
     foreach ($cart as $item)
      { 
      $grand_total = $grand_total + $item['subtotal'];
      }                                               
    //get token, card and user info from the form
    //echo phpinfo();
   //echo dirname(__FILE__);
    //die;
    $token  = $_POST['stripeToken'];
    $name = $_POST['name'];
    //$email = $_POST['email'];
    $card_num = $_POST['card_num'];
    $card_cvc = $_POST['cvc'];
    $card_exp_month = $_POST['exp_month'];
    $card_exp_year = $_POST['exp_year'];
    
    //include Stripe PHP library
    
    //echo dirname(__FILE__); die;
    require_once APPPATH."third_party/stripe/init.php";
    //require_once APPPATH."init.php";
    //$this->load->view('init');
   
    //set api key
    $stripe = array(
      "secret_key"      => "sk_test_Pjt8AevAKduckYXXfcou4Wjl",
      "publishable_key" => "pk_test_co0LX3t2EXYP6a1YIFMkt5ev"
    );
    
    \Stripe\Stripe::setApiKey($stripe['secret_key']);
    
    //add customer to stripe
    $customer = \Stripe\Customer::create(array(
        'email' => 'test@gmail.com',
        'source'  => $token
    ));
    
    //item information
    $itemName = "Product Item";
    $itemNumber = "PS123456";
    $itemPrice = $grand_total;
    $currency = "usd";
    $orderID = "SKA92712382139";
    
    //charge a credit or a debit card
    $charge = \Stripe\Charge::create(array(
        'customer' => $customer->id,
        'amount'   => $itemPrice,
        'currency' => $currency,
        'description' => $itemName,
        'metadata' => array(
            'order_id' => $orderID
        )
    ));
    
    //retrieve charge details
    $chargeJson = $charge->jsonSerialize();

    //check whether the charge is successful
    if($chargeJson['amount_refunded'] == 0 && empty($chargeJson['failure_code']) && $chargeJson['paid'] == 1 && $chargeJson['captured'] == 1){

        //order details 
        $amount = $chargeJson['amount'];
        $balance_transaction = $chargeJson['balance_transaction'];
        $currency = $chargeJson['currency'];
        $status = $chargeJson['status'];
        $date = date("Y-m-d H:i:s");
        
        //include database config file
        //include_once 'dbConfig.php';
        
        //insert tansaction data into the database
       // $sql = "INSERT INTO orders(name,email,card_num,card_cvc,card_exp_month,card_exp_year,item_name,item_number,item_price,item_price_currency,paid_amount,paid_amount_currency,txn_id,payment_status,created,modified) VALUES('".$name."','".$email."','".$card_num."','".$card_cvc."','".$card_exp_month."','".$card_exp_year."','".$itemName."','".$itemNumber."','".$itemPrice."','".$currency."','".$amount."','".$currency."','".$balance_transaction."','".$status."','".$date."','".$date."')";
        //$insert = $db->query($sql);
        $insert_data=array(
                  'name'=>$name,
                  'email'=>'est@gmail.com',
                  'card_num'=>$card_num,
                  'card_cvc'=>$card_cvc,
                  'card_exp_month'=>$card_exp_month,
                  'card_exp_year'=>$card_exp_year,
                  'item_name'=>$itemName,
                  'item_number'=>$itemNumber,
                  'item_price'=>$itemPrice,
                  'item_price_currency'=>$currency,
                  'paid_amount'=>$amount,
                  'paid_amount_currency'=>$currency,
                  'txn_id'=>$balance_transaction,
                  'payment_status'=>$status,
                  'created'=>$date,
                  'modified'=>$date
              );
        $last_insert_id=$this->Checkout_Model->insert_payment_details($insert_data);
        //$last_insert_id = $db->insert_id;
        
        //if order inserted successfully





        //if($last_insert_id && $status == 'succeeded'){
           $data['statusMsg']= "<h2>The transaction was successful.</h2><h4>Order ID: {$last_insert_id}</h4>";
        //}else{
           // $statusMsg = "Transaction has been failed";
       // }
    }else{
        $data['statusMsg'] = "Transaction has been failed";
    }
}else{
    $data['statusMsg'] = "Form submission error.......";
}

//show success or error message
$data['subview']="statusmsg";
$this->load->view('layout/default', $data);


    }
  public function step_4()
        {
                              if($this->input->post('confirm'))
                                {
                                        $uid=$this->session->userdata('userid');
                                        $total=0;
                                        $qu=0;
                                        //add to cart in database
                                        if(!empty($this->cart->contents()))
                                        {
                                                    $total = 0;
                                                    $total_cart=$this->cart->total_items();
                                                    $this->Checkout_Model->insertcart($total_cart);
                                                    $insert_id=$this->db->insert_id();
                                                    $checkout_id=$this->session->userdata('checkout_id');
                                                    $this->Checkout_Model->addcheckoutcart($insert_id,$checkout_id,$uid);
                                                    foreach ($this->cart->contents() as $items):
                                                             $ip = $_SERVER['REMOTE_ADDR'];
                                                            $total = $total + (($items['qty']) * ($items['price']));
                                                            $qu = $qu + $items['qty'];
                                                            $this->Checkout_Model->insertcartproductdetail($insert_id,$items['id'],$items['price'],$items['qty'],$ip,$items['color'],$items['size']);
                                                    endforeach;
                                        }
                                        //add sales detail to database
                                        $byname=$this->session->userdata('firstname');
                                        //$createby=$this->session->userdata('mem_id');
                                        $createby= '0';
                                        $this->Checkout_Model->addsale($byname,$total,$createby,$qu);
                                        $insert=$this->db->insert_id();
                                        $this->Checkout_Model->addcheckoutcart($insert,$checkout_id,$uid);
                                        $output['cartdetail'] = $this->Checkout_Model->getcartdata($uid);
                                        foreach ($output['cartdetail'] as $select4):
                                                        $this->Checkout_Model->addsaledetail($insert,$select4);
                                        endforeach;   
                                        $this->cart->destroy();
                                        $this->db->set('is_shipped',1);
                                        $this->db->where('userid',$uid);
                                        $this->db->update('tbl_cart');
                                        $this->session->set_flashdata('SUCCESSMSG','Your Order Successfully Placed!!');
                                       // redirect('index.php/cart/add');
                                        redirect(base_url().'Cart/add');
        }     
            //$data['category_list'] = $this->Category_Model->get_list();
            //$data['subcate'] = $this->Subcategory_Model->viewSubCategoryList();
            $this->load->view('step_4');    
       }
  
  
}
