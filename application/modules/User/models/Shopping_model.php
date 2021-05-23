<?php
/*defined('BASEPATH') OR exit('No direct script access allowed');
class Shopping_model extends CI_Model{
public function save_contact_data($insert_data){
 $msg=$this->db->insert('user_detail',$insert_data);  
     }
public function sign_in($email,$password){
            $this -> db -> select(' * ');
            $this -> db -> from('user_detail');
            $this -> db -> where('email', $email);
            $this -> db -> or_where('password', $password);
             $query = $this -> db -> get();
           //echo $this->db->last_query();
        $res=$query->row();
       return $res;     	 
}


 

}*/


defined('BASEPATH') OR exit('No direct script access allowed');
class Shopping_model extends CI_Model{
/*public function save_contact_data($insert_data){
 $msg=$this->db->insert('user_detail',$insert_data);  
     }*/
  
 //Facebook login and save method 
public function save_social_user_data($insert_data){
    	  $this->db->insert('fp_customer',$insert_data);
    	  return true;
    }
    
    public function check_alredy_regi($uid){
    	  $this->db->select('*');
    	  $this->db->from('fp_customer');
    	  $this->db->where('fp_customer.fb_user_id',$uid);
    	  $query=$this->db->get();
    	  $row=$query->num_rows();
    	  return $row;
    }    

//Facebook login and save method    
     
public function sign_in($email,$password){
            $this -> db -> select(' * ');
            $this -> db -> from('tbl_customers');
            $this -> db -> where('email', $email);
            $this -> db -> or_where('password', $password);
             $query = $this -> db -> get();
           //echo $this->db->last_query();
        $res=$query->row();
       return $res;     	 
}

public function save_user_data($insert_data){
 //echo $this->db->last_query(); die;
 $msg=$this->db->insert('tbl_customers',$insert_data);

     }
     
     
public function get_customer_data($cust_id){
            $this -> db -> select(' * ');
            $this -> db -> from('tbl_customers');
            $this -> db -> where('customer_id', $cust_id);
            $this -> db -> limit(1);
            $query = $this -> db -> get();
            $res=$query->row();
           return $res;            
        }   
        
        
function update_customer_data($insert_data,$user_id){
      $this -> db -> where('customer_id', $user_id);
	  $res=$this->db->update('tbl_customers',$insert_data);
      //echo $this->db->last_query();die;
      return $res;
 }            

}