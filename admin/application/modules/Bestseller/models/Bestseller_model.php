<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bestseller_model extends CI_Model{
	
       function save_slider_data($insert_data){
         $res=$this->db->insert('top_home_silider',$insert_data);
         return $res;
     }

     public function inactive_user($table, $field, $delete_id) {
        if($field=='Active'){
          $status='Inactive';
        }else{
          $status='Active';
        }
        $update_data=array(
                'status'=>$status
        );
         $this->db->where('id',$delete_id);
         $res=$this->db->update('users',$update_data);
         return $res;
    }  

    public function bestseller_list(){
        $this->db->select("*");
        $this->db->from("tbl_bestseller");
        $this->db->order_by("id","desc");
        $query=$this->db->get();
        //echo $this->db->last_query();
        $res=$query->result();
        return $res;
        }

	public function deletes1($table, $field, $delete_id) {
        $this->db->trans_start();
        $this->db->delete($table, array($field => $delete_id));
        $this->db->trans_complete();
        return ($this->db->trans_status() === FALSE) ? FALSE : TRUE;
    }  

 
    function single_bestseller_list($id){
        $this->db->select("*");
        $this->db->from("tbl_bestseller");
        $this->db->where('id',$id);
        $query=$this->db->get();
        //echo $this->db->last_query();
        $res=$query->row();
        return $res;
    }
      
    function get_duplicate($tab,$col,$value){
        $this->db->select("*");
        $this->db->from("$tab");
        $this->db->where($col,$value);
        $query=$this->db->get();
        //echo $this->db->last_query();
        $res=$query->num_rows();
        return $res;
    }


  	//Delete method
	public function deletes($table, $field, $delete_id) {
        $this->db->trans_start();
        $this->db->delete($table, array($field => $delete_id));
        $this->db->trans_complete();
        return ($this->db->trans_status() === FALSE) ? FALSE : TRUE;
    }       



}