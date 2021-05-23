<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home_model extends CI_Model{
	
	function home_top_silider_data(){
         $this->db->select("*");
         $this->db->from("home_top_silider");
         $this->db->order_by('id','desc');
         $query=$this->db->get();
         $res=$query->result();
         return $res;
	   } 

	 
function getnew_arrivals_data(){
         $this->db->select("*");
         $this->db->from("tbl_charity");
         $this->db->order_by('id','desc');
         $query=$this->db->get();
         $res=$query->result();
         return $res;
	   } 
 function spacial_note_silider_data(){
         $this->db->select("*");
         $this->db->from("home_notebook_silider");
         $this->db->order_by('id','desc');
         $query=$this->db->get();
         $res=$query->result();
         return $res;
	   }
function wedding_home_banner_data(){
         $this->db->select("*");
         $this->db->from("home_banner_cat_wise");
         $this->db->where('cat_id',12);
         $this->db->order_by('id','desc');
         $query=$this->db->get();
         $res=$query->result();
         return $res;
	   } 	

function notebook_home_banner(){
         $this->db->select("*");
         $this->db->from("home_banner_cat_wise");
         $this->db->where('cat_id',9);
         $this->db->order_by('id','desc');
         $query=$this->db->get();
         $res=$query->result();
         return $res;
	   } 

function personal_home_banner(){
         $this->db->select("*");
         $this->db->from("home_banner_cat_wise");
         $this->db->where('cat_id',10);
         $this->db->order_by('id','desc');
         $query=$this->db->get();
         $res=$query->result();
         return $res;
	   } 
function interest_home_banner(){
         $this->db->select("*");
         $this->db->from("home_banner_cat_wise");
         $this->db->where('cat_id',11);
         $this->db->order_by('id','desc');
         $query=$this->db->get();
         $res=$query->result();
         return $res;
	   } 

function officeuse_home_banner(){
         $this->db->select("*");
         $this->db->from("home_banner_cat_wise");
         $this->db->where('cat_id',13);
         $this->db->order_by('id','desc');
         $query=$this->db->get();
         $res=$query->result();
         return $res;
	   } 


public function wedding_silider_data(){
        $this->db->select("tbl_products.*,product_photo_details.p_id,product_photo_details.photo");
       $this->db->from("tbl_products");
       $this->db->join('product_photo_details','product_photo_details.p_id=tbl_products.id');
       $this->db->group_by('product_photo_details.p_id');
       $this->db->order_by('tbl_products.id','desc');
       $this->db->where('category_id',12);
       $this->db->limit(20);
       //$this->db->like('product_photo_details.photo','_Front.jpg','before');
       $query=$this->db->get();
       $res=$query->result();
       //print_r($res);die;
      return $res;
  }
// public function get_photo_detail_product_wise($pid){
//     $this->db->select("*");
//     $this->db->from('product_photo_details');
//     $this->db->order_by('id','desc');
//     $this->db->where('p_id',$pid);
//     $this->db->limit(1);
//     $query=$this->db->get();
//     $res=$query->result();
//     return $res;

//   }  
public function get_photo_detail_product_wise($pid){
    $this->db->select("tbl_products.product_name,product_photo_details.*");
    $this->db->from('tbl_products');
    $this->db->join('product_photo_details','product_photo_details.p_id=tbl_products.id');
    $this->db->order_by('product_photo_details.id','desc');
    $this->db->where('product_photo_details.p_id',$pid);
    $this->db->limit(1);
    $query=$this->db->get();
    //echo $this->db->last_query();
    $res=$query->result();
    return $res;

  }    
   function charity_we_support(){
      $this->db->select("*");
      $this->db->from("tbl_charity");
      $this->db->where("status",'1');
      $this->db->order_by('id','desc');
      $query=$this->db->get();
      $res=$query->result();    
      return $res;
  } 
public function notebook_silider_data(){
       $this->db->select("tbl_products.*,product_photo_details.p_id,product_photo_details.photo");
       $this->db->where('tbl_products.status','1');
       $this->db->from("tbl_products");
       $this->db->join('product_photo_details','product_photo_details.p_id=tbl_products.id');
      $this->db->group_by('product_photo_details.p_id');
       $this->db->order_by('product_photo_details.id','desc');
       $this->db->where('category_id',9);
        //$this->db->limit(20);
       //$this->db->like('product_photo_details.photo','_1.jpg','before');
       $query=$this->db->get();
       $res=$query->result();
       //print_r($res);die;
      return $res;
      /* $this->db->select("tbl_products.*,product_photo_details.p_id,product_photo_details.photo");
       $this->db->from("tbl_products");
       $this->db->join('product_photo_details','product_photo_details.p_id=tbl_products.id');
       $this->db->group_by('product_photo_details.p_id');
       $this->db->order_by('tbl_products.id','desc');
       $this->db->where('category_id',9);
       $query=$this->db->get();
       $res=$query->result();
       //print_r($res);die;
      return $res;*/
  }
public function personal_silider_data(){
       $this->db->select("tbl_products.*,product_photo_details.p_id,product_photo_details.photo");
       $this->db->from("tbl_products");
       $this->db->join('product_photo_details','product_photo_details.p_id=tbl_products.id');
      $this->db->group_by('product_photo_details.p_id');
       $this->db->order_by('tbl_products.id','desc');
       $this->db->where('category_id',10);
        $this->db->limit(20);
       //$this->db->like('product_photo_details.photo','_1.jpg','before');
       //$this->db->where('sub_category_id',$scat_id);
       $query=$this->db->get();
       $res=$query->result();
      //print_r($res);die;
      return $res;
  }

public function interest_silider_data(){
       $list_ids = array(38, 32, 35,31,39,37,27,36);
       $this->db->select("tbl_products.*,product_photo_details.p_id,product_photo_details.photo");
       $this->db->from("tbl_products");
       $this->db->join('product_photo_details','product_photo_details.p_id=tbl_products.id');
       $this->db->group_by('product_photo_details.p_id');
       $this->db->order_by('tbl_products.id','desc');
       
       $this->db->where('tbl_products.category_id',10);
        $this->db->where_in('tbl_products.sub_category_id',$list_ids);
       $this->db->limit(20);
       $this->db->like('product_photo_details.photo','_1.jpg','before');
       //$this->db->where('sub_category_id',$scat_id);
       $query=$this->db->get();
       //echo $this->db->last_query();die;
       $res=$query->result();
      //print_r($res);die;
      return $res;
  }
public function officeuse_silider_data(){
  $this->db->select("tbl_products.*,product_photo_details.p_id,product_photo_details.photo");
  $this->db->from("tbl_products");
  $this->db->join('product_photo_details','product_photo_details.p_id=tbl_products.id');
  $this->db->group_by('product_photo_details.p_id');
  $this->db->order_by('tbl_products.id','desc');
  
  $this->db->where('category_id',13);
   $this->db->limit(20);
 // $this->db->like('product_photo_details.photo','_Front.jpg','before');
  //$this->db->where('sub_category_id',$scat_id);
  $query=$this->db->get();
  $res=$query->result();
 //print_r($res);die;
 return $res;
  }

//home page product by brand
public function getBrand(){

  $this->db->select("*");
  $this->db->from("brand_details");
  $this->db->group_by('id');
  $this->db->order_by('id','desc');
  $this->db->limit(4);
  $query=$this->db->get();
  //echo $this->db->last_query();die;
  $res=$query->result();
  return $res;

}

//home page product by brand


	public function product_cat_data($cid){
         $this->db->select("tbl_products.*,tbl_product_attribute.id as attr_id");
         $this->db->from("tbl_products");
         $this->db->join("tbl_product_attribute",'tbl_product_attribute.product_id=tbl_products.id');
         $this->db->group_by("tbl_product_attribute.product_id","asc");
         $this->db->where('cat_id',$cid);
         $query=$this->db->get();
         $res=$query->result();
         //echo $this->db->last_query();die;
         return $res;

      }
	public function product_scat_data($scid){
         $this->db->select("tbl_products.*,tbl_product_attribute.id as attr_id");
         $this->db->from("tbl_products");
          $this->db->join("tbl_product_attribute",'tbl_product_attribute.product_id=tbl_products.id');
         $this->db->group_by("tbl_product_attribute.product_id","asc");
         $this->db->where('sub_cat_id',$scid);
         $query=$this->db->get();
         $res=$query->result();
         return $res;

   }  
   
    public function cat_all_product_list(){
         $this->db->select("tbl_products.*,tbl_product_attribute.id as attr_id");
         $this->db->from("tbl_products");
         $this->db->join("tbl_product_attribute",'tbl_product_attribute.product_id=tbl_products.id');
         $this->db->group_by("tbl_product_attribute.product_id","asc");
         //$this->db->order_by("id","desc");
        // $this->db->where('cat_id',$cat_id);
         $query=$this->db->get();
         $res=$query->result();
         return $res;

   }
   //home page product Best Seller
public function getBestSeller(){

$this->db->select("*");
$this->db->from("tbl_bestseller");
$this->db->group_by('id');
$this->db->order_by('id','desc');
$this->db->limit(4);
$query=$this->db->get();
//echo $this->db->last_query();die;
$res=$query->result();
return $res;

}


}