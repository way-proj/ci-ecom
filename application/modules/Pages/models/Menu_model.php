<?php
class Menu_model extends CI_Model {

	/* public function all()
	{
		return $this->db->get("menus")
					->result_array();
	} */
	
	
	
	
	public function all()
{
    $this->db->select('*');
    $this->db->from('category_details cd'); 
    $this->db->join('sub_category_details sd', 'cd.cat_id=cd.id', 'left');
    $this->db->join('sub_child_category_details sbc', 'sbc.cat_id=cd.id', 'left');
          
    $query = $this->db->get(); 
    if($query->num_rows() != 0)
    {
        return $query->result_array();
    }
    else
    {
        return false;
    }
}

}