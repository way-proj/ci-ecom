<?php

class Checkout_model extends CI_Model

{

	function __construct() {

        // Call the Model constructor

        parent::__construct();



		

        }
    
       
  function get_state(){
   	        $this -> db -> select(' * ');
            $this -> db -> from('states');
            $this -> db -> where('country_id', 101);
            $query = $this -> db -> get();
		    $res=$query->result();
		    return $res;  		   
	      }  
function count_order(){
            $query = $this->db->query('SELECT * FROM tbl_checkout');
            $row=$query->num_rows();
            return $row;           
          } 


function get_city_data($st_id){
   	        $this -> db -> select(' * ');
            $this -> db -> from('cities');
            $this -> db -> where('state_id', $st_id);
            $query = $this -> db -> get();
		    $res=$query->result();
		    return $res;  		   
	      }
        
     function save_customer_data($insert_data){
     	//print_r($insert_data);die;
     	$res=$this->db->insert('tbl_customers',$insert_data);
        $insert_id = $this->db->insert_id();
     	return $insert_id;
     	//echo $this->db->last_query();
     }
      function login($email,$password){
		    $this -> db -> select(' * ');
            $this -> db -> from('tbl_customers');
            $this -> db -> where('email', $email);
            $this -> db -> where('password', md5($password));
            $this -> db -> limit(1);
			$query = $this -> db -> get();
			return $query;  		   
		 }
   function check_reg_user($email){
   	        $this -> db -> select(' * ');
            $this -> db -> from('tbl_customers');
            $this -> db -> where('email', $email);
            $this -> db -> limit(1);
            $query = $this -> db -> get();
            //echo $this->db->last_query();
		    $res=$query->row();
		   return $res;  		   
	    }
     function get_customer_data($cust_id){
   	        $this -> db -> select(' * ');
            $this -> db -> from('tbl_customers');
            $this -> db -> where('customer_id', $cust_id);
            $this -> db -> limit(1);
            $query = $this -> db -> get();
            //echo $this->db->last_query();
		    $res=$query->row();
		   return $res;  		   
	    }	    
	  function get_checkout_data($cust_id){
            $this -> db -> select(' * ');
            $this -> db -> from('tbl_checkout');
            $this -> db -> where('customer_id', $cust_id);
            $this->db->order_by('checkout_id','desc');
            $this -> db -> limit(1);
            $query = $this -> db -> get();
            //echo $this->db->last_query();
        $res=$query->row();
       return $res;        
      }     
   

       function insert_payment_details($insert_data){

        $this->db->insert('orders',$insert_data);
        $last_insert_id= $this->db->insert_id();
        return $last_insert_id;
       }

       function addcheckout($country,$city,$province,$billing_zip,$add1,$fname,$phone,$email,$uid,$billing_state)
       {
          $this->db->set('country',$country);

			$this->db->set('city',$city);

			//$this->db->set('province','test');

		   $this->db->set('postcode',$billing_zip);
           $this->db->set('province',$province);
           

		    $this->db->set('address1',$add1);
            $this->db->set('state',$billing_state);

			 $this->db->set('address2','noida');

			  $this->db->set('firstname',$fname);

		    $this->db->set('lastname','singh');

			 $this->db->set('phone',$phone);
             $this->db->set('payment_option','cash');
			  $this->db->set('email',$email);

			   $this->db->set('customer_id',$uid);

			    $this->db->set('order_date',date('Y-m-d H:i:s'));

            //$this->db->set('buyer_name','test');

          $this->db->set('sale_id','0');

				 //$this->db->where('customer_id',$uid);

          		 $this->db->insert('tbl_checkout');              

        

        }
       function addpayment($payment,$in,$uid)

        {

            

           

                   $this->db->set('payment_option',$payment);
                   //$this->db->set('order_status',$order_status);

                   $this->db->where('checkout_id',$in);

                   //$this->db->where('customer_id',$uid);

                   $this->db->update('tbl_checkout');              

        

        }
		function addpayment_cod($payment,$in,$uid,$order_status)

        {

            

           

				   $this->db->set('payment_option',$payment);
                   $this->db->set('order_status',$order_status);

				   $this->db->where('checkout_id',$in);

				   //$this->db->where('customer_id',$uid);

          		   $this->db->update('tbl_checkout');              

        

        }
       
		function addcheckoutcart($cid,$in,$uid)

        {

            

            

                                $this->db->set('sale_id',$cid);
                                
                                $this->db->where('checkout_id',$in);

                                //$this->db->where('customer_id',$uid);

                                $this->db->update('tbl_checkout');              

        

        }

		public function get_countries()

		{

			$this->db->from("tbl_countries");

			$query = $this->db->get();

			return $query->result();

		}

		public function get_city()

		{

			$this->db->from("tbl_cities");

			$query = $this->db->get();

			return $query->result();

		}

		function getcartdata($uid)

		{

			//$query = $this->db->select('tbl_cart.*,tbl_cart_product.*,tbl_products.product_code');
			$query = $this->db->select('tbl_cart.*,tbl_cart_product.*');

			$query = $this->db->from('tbl_cart');

			$query= $this->db->join('tbl_cart_product','tbl_cart.cart_id = tbl_cart_product.product_cart_id');

			//$query= $this->db->join('product_details','product_details.id = tbl_cart_product.product_id');

			$query = $this->db->where('tbl_cart.userid',$uid);

			$query = $this->db->where('tbl_cart.is_shipped',0);

			$query = $this->db->get();

			

			return $query->result();

		}

		

		function addsale($byname,$total1,$createby,$qu)

        {

            

            

            $this->db->set('buyer_name','test');

			$this->db->set('grand_amount',$total1);

			$this->db->set('created_by',$createby);

			$this->db->set('issue_date',date('Y-m-d'));

			$this->db->set('total_quantity',$qu);

		   	$this->db->set('status','active');

		   	$this->db->set('cash_discount','0');
            $this->db->set('description','test');
            $date=date('Y-m-d H:i:s');
             $this->db->set('shipped_status',1);
           $this->db->set('due_date',$date);
            

			$this->db->insert('tbl_sales');              

        

        }

        function addsaledetail($insert,$select4)

        {

                $this->db->set('sale_id',$insert);

                $this->db->set('product_code','123');
                $this->db->set('selling_rate','123');
                $this->db->set('discount','123');
                

                $this->db->set('quantity',$select4->quantity);

                $this->db->set('color_id',$select4->color_id);

                $this->db->set('size_id',$select4->size_id);

                $this->db->set('product_price',$select4->product_price);

                $this->db->insert('tbl_sales_detail');   

        }

		function insertcart($total_cart)

        {

            

            	$userid	= $this->session->userdata('userid');

				 $this->db->set('created_date',date('Y-m-d'));

				$this->db->set('userid',$userid);

				$this->db->set('total_cart',$total_cart);

				$this->db->insert('tbl_cart');     

			

			

        

        }
		function insertcartproductdetail($gst_per,$gst_type,$insert_id,$pid,$price,$qty,$color,$size,$p_image,$type,$page_number,$file_name)

        {

                                $this->db->set('product_cart_id',$insert_id);

                                $this->db->set('product_id',$pid);
                                $this->db->set('page_number',$page_number);
                                $this->db->set('custom_image',$file_name);

                                $this->db->set('product_price',$price);
                                $this->db->set('gst_per',$gst_per);

                                $this->db->set('quantity',$qty);

                                //$this->db->set('ip',$ip);

                                $this->db->set('color_id',$color);

                                $this->db->set('size_id',$size);
                                $this->db->set('p_image',$p_image);
                                $this->db->set('gst_type',$gst_type);
                               // $this->db->set('p_type',$type);
                                $this->db->insert('tbl_cart_product');  
            }

}