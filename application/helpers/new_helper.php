<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('delete_product_single_data'))
{
    function delete_product_single_data($tab_name,$col_name,$cond_name){
           $this->db->where($col_name,50);
           $this->db->delete($tab_name);
           return true;
 
     } 

function getname($id,$table,$colum){

  $CI = &get_instance();
  $CI->db->select($colum);
  $CI->db->from($table);
  $CI->db->order_by("category_name", "DESC");
  $CI->db->where('id',$id);
  $exce=$CI->db->get();
if($exce->num_rows()>0){
     $result=$exce->row();
     return $result->$colum;
  }else{

    return "";
  }

}

function get_cart_product($pid){

                 
                $CI = &get_instance();
                $CI->load->library('cart');
                if($cart =  $CI->cart->contents()){

                   foreach ($cart as $item)
                    {
                      $pids=explode('_',$item['id']);
                      if($pids[0]==$pid){
                        return $item;
                      }

                   } 
                 }  

}
function Get_Productgallery_detailss_price_range($product_id,$price_range)
{
    $CI = &get_instance();
    $CI->load->model('Shopping_model');
    $result = $CI->Shopping_model->get_product_gallery_details_price_range($product_id,$price_range);  
    return $result; 
}	 
function Get_Productgallery_detailss($product_id)
{
    $CI = &get_instance();
    $CI->load->model('Shopping_model');
    $result = $CI->Shopping_model->get_product_gallery_details($product_id);  
    return $result; 
}
function Get_attribute_image_details($attr_id)
{
    $CI = &get_instance();
    $CI->load->model('Shopping_model');
    $result = $CI->Shopping_model->Get_attribute_image_detail($attr_id);  
    return $result; 
  }

function Get_variant_data($p_id)
{
    $CI = &get_instance();
    $CI->load->model('Shopping_model');
    $result = $CI->Shopping_model->Get_variant_data($p_id);  
    return $result; 
  }

function getcatname($table,$colum){

  $CI = &get_instance();
  $CI->db->select($colum);
  $CI->db->from($table);
  $CI->db->order_by('id','asc');
  $exce=$CI->db->get();
   if($exce->result()){
     $result=$exce->result();
	     return $result;
  }else{

    return "";
  }

}
function getsubcatname($table,$colum,$where){
 
  $CI = &get_instance();
  $CI->db->select($colum);
  $CI->db->where('cat_id',$where);
  $CI->db->from($table);
  $CI->db->order_by('id','asc');
  $exce=$CI->db->get();
  if($exce->result()){
   
  $result=$exce->result();
	return $result;
  }else{

    return "";
  }

}
function getchildsubcatname($table,$colum,$where){
 
  $CI = &get_instance();
  $CI->db->select($colum);
  $CI->db->where('sub_cat_id',$where);
  $CI->db->from($table);
  $CI->db->order_by('id','asc');
  $exce=$CI->db->get();
   //echo $CI->db->last_query();
  if($exce->result()){
   
  $result=$exce->result();
  return $result;
  }else{

    return "";
  }

}


function getcatnamebybrand($table,$colum,$where){

  $CI = &get_instance();
  $CI->db->select($colum);
  $CI->db->where('store',$where);
  $CI->db->from($table);
  $CI->db->order_by('created_date','DESC');
  $exce=$CI->db->get();
   if($exce->result()){
     $result=$exce->result();
	     return $result;
  }else{

    return "";
  }

}


//Get Brand name

function getBrandName($table,$colum){

  $CI = &get_instance();
  $CI->db->select($colum);
  $CI->db->from($table);
  //$CI->db->order_by('created_date','ASC');
  $CI->db->order_by("id", "ASC");
  $exce=$CI->db->get();
   if($exce->result()){
     $result=$exce->result();
	     return $result;
  }else{

    return "";
  }

}


}