<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Shopping_model extends CI_Model{
	
    function product_list($cat_id){
        $this->db->select("*");
        $this->db->where('tbl_products.cat_id',$cat_id);
        $this->db->from("tbl_products");
        $query=$this->db->get();
		//print_r($query);die;
		//echo $this->db->last_query();die;
        $res=$query->result();
       return $res;

  }
  function offer_product_list($pid){
         $this->db->select("tbl_bestseller.*");
         $this->db->from("tbl_bestseller");
         //$this->db->order_by("id","desc");
         $this->db->where('id',$pid);
         $query=$this->db->get();
		 //print_r($query);die;
	 //echo $this->db->last_query();
         $res=$query->result();
         return $res;

   }
 function shape_data($shape){
         $this->db->select("tbl_products.*,brand_details.brand_name");
         $this->db->from("tbl_products");
         $this->db->join("brand_details","brand_details.id=tbl_products.brand_name");
        // $this->db->join("category_details","category_details.id=tbl_products.cat_id");
         $this->db->where('tbl_products.shape',$shape);
         $query=$this->db->get();
       //echo $this->db->last_query();
      // die;
         $res=$query->result();
         return $res;

   } 
  
 function product_scat_data($cid,$sub_cat_id){
         $this->db->select("tbl_products.*,brand_details.brand_name,category_details.category_name,sub_category_details.sub_category_name");
         $this->db->from("tbl_products");
         $this->db->join("brand_details","brand_details.id=tbl_products.brand_name");
         $this->db->join("category_details","category_details.id=tbl_products.cat_id");
         $this->db->join("sub_category_details","sub_category_details.id=tbl_products.sub_cat_id");

         $this->db->where('tbl_products.cat_id',$cid);
         $this->db->where('tbl_products.sub_cat_id',$sub_cat_id);
         $query=$this->db->get();
         //echo $this->db->last_query();
         //print_r($query);die;
         $res=$query->result();
         return $res;

   } 
   function product_scat_child_data($cid,$sub_cat_id,$child_id){
         $this->db->select("tbl_products.*,brand_details.brand_name,category_details.category_name,sub_category_details.sub_category_name,sub_child_category_details.sub_child_category_name");
         $this->db->from("tbl_products");
         $this->db->join("brand_details","brand_details.id=tbl_products.brand_name");
         $this->db->join("category_details","category_details.id=tbl_products.cat_id");
         $this->db->join("sub_category_details","sub_category_details.id=tbl_products.sub_cat_id");
         $this->db->join("sub_child_category_details","sub_child_category_details.id=tbl_products.sub_cat_child_id");
         $this->db->where('tbl_products.cat_id',$cid);
         $this->db->where('tbl_products.sub_cat_id',$sub_cat_id);
         $this->db->where('tbl_products.sub_cat_child_id',$child_id);
         $query=$this->db->get();
         //echo $this->db->last_query();
         //print_r($query);die;
         $res=$query->result();
         return $res;

   } 
 function brand_data($bid){
         $this->db->select("tbl_products.*,brand_details.brand_name");
         $this->db->from("tbl_products");
         $this->db->join("brand_details","brand_details.id=tbl_products.brand_name");
        // $this->db->join("category_details","category_details.id=tbl_products.cat_id");
         $this->db->where('tbl_products.brand_name',$bid);
         $query=$this->db->get();
       //echo $this->db->last_query();
      // die;
         $res=$query->result();
         return $res;

   }    
function product_cat_data($cid){
         $this->db->select("tbl_products.*,brand_details.brand_name,category_details.category_name");
         $this->db->from("tbl_products");
         $this->db->join("brand_details","brand_details.id=tbl_products.brand_name");
         $this->db->join("category_details","category_details.id=tbl_products.cat_id");

         $this->db->where('cat_id',$cid);
         $query=$this->db->get();
		     //print_r($query);die;
         $res=$query->result();
         return $res;

   }   
  
  
  function get_product_gallery_details($p_id){
         $this->db->select("product_attribute_image.image,tbl_product_attribute.price_mrp,tbl_product_attribute.sp_price,tbl_product_attribute.qty,tbl_product_attribute.weight");
         $this->db->from("tbl_product_attribute");
         $this->db->join("product_attribute_image","tbl_product_attribute.id=product_attribute_image.attr_id");
         $this->db->where('tbl_product_attribute.product_id',$p_id);
       // $this->db->group_by("product_attribute_image.attr_id","asc");
         $query=$this->db->get();
       //echo $this->db->last_query();die;
         $res=$query->result();
         return $res;
   }
 function get_product_gallery_details_price_range($p_id,$price_range){

          $combin=explode(' - ',$price_range);
          $min_price=trim(@$combin[0]);
          $max_price=trim(@$combin[1]);

         $this->db->select("product_attribute_image.image,tbl_product_attribute.price_mrp,tbl_product_attribute.sp_price,tbl_product_attribute.qty,tbl_product_attribute.weight");
         $this->db->from("tbl_product_attribute");
         $this->db->join("product_attribute_image","tbl_product_attribute.id=product_attribute_image.attr_id");
          $this->db->where('tbl_product_attribute.product_id',$p_id);
          $this->db->where('price_mrp >=', $min_price);
          $this->db->where('price_mrp <=', $max_price);
         $this->db->group_by("product_attribute_image.attr_id","asc");
         $query=$this->db->get();
       //echo $this->db->last_query();
         $res=$query->result();
         return $res;
   }  
public function  save_carrer_data($insert_data){
//print_r($insert_data);die;
$msg=$this->db->insert('tbl_career',$insert_data);

}
 public function save_contact_data($insert_data){
 //print_r($insert_data);
  $msg=$this->db->insert('tbl_contact',$insert_data);  
        
     } 
function product_list2($pid){
         $this->db->select("*");
         $this->db->from("tbl_products");
         //$this->db->order_by("id","desc");
         $this->db->where('id',$pid);
         $query=$this->db->get();
		 //print_r($query);die;
		// echo $this->db->last_query();
         $res=$query->result();
         return $res;

   }
function product_list3($pid){
         $this->db->select("*");
         $this->db->from("tbl_charity");
         //$this->db->order_by("id","desc");
         $this->db->where('id',$pid);
         $query=$this->db->get();
		 //print_r($query);die;
		// echo $this->db->last_query();
         $res=$query->result();
         return $res;

   }	
public function get_product_details($cart_id){
       $this->db->select("tbl_cart_product.winprice,tbl_cart_product.win_image,tbl_cart_product.custom_image,tbl_cart_product.page_number,tbl_cart_product.p_image,tbl_cart_product.p_type,tbl_cart_product.product_price as p_price,tbl_cart_product.quantity as product_qty,tbl_products.*,category_details.*");
       $this->db->where('product_cart_id',$cart_id);
       $this->db->from("tbl_cart_product");
       $this->db->join('tbl_products','tbl_products.id=tbl_cart_product.product_id');
       $this->db->join('category_details','category_details.id=tbl_products.cat_id');
        $query=$this->db->get();
		 //echo $this->db->last_query();die;
       $res=$query->result();
       return $res;

   }
 
 
public function getSingleCat($cat_id){
        $this->db->select("*");
        $this->db->where('id',$cat_id);
        $this->db->from("category_details");
        $query=$this->db->get();
		//echo $this->db->last_query();die;
        $res=$query->row();
       return $res;

  }
  
	public function getSingleBrand($bid){
        $this->db->select("*");
        $this->db->where('id',$bid);
        $this->db->from("brand_details");
        $query=$this->db->get();
		//echo $this->db->last_query();die;
        $res=$query->row();
       return $res;
  }
	public function getDatabyBrand($bid){
        $this->db->select("*");
        $this->db->from("category_details");
		$this->db->order_by("id","ASC");
        $this->db->where('store',$bid);
        $query=$this->db->get();
		//echo $this->db->last_query();die;
        $res=$query->result();
         return $res;

   }
   
   
   
   public function getSubDatabyBrand($sbid){
        $this->db->select("*");
        $this->db->from("sub_category_details");
		$this->db->order_by("id","ASC");
        $this->db->where('cat_id',$sbid);
        $query=$this->db->get();
		//echo $this->db->last_query();die;
        $res=$query->result();
         return $res;

   }
   






}