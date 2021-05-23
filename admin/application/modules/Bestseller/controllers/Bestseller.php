<?php
ob_start();
defined('BASEPATH') OR exit('No direct script access allowed');

class Bestseller extends MX_Controller {

  function __construct(){
    parent::__construct();
    
        $this->load->library('session');
        $this->load->helper(array('form', 'url','new'));
        $this->load->model('../../Common/Crud_model');
        $this->load->model('Bestseller_model');
        $this->load->library('form_validation');

  }
	  public function index(){
		

	  }
	   
	   
	public function save_bestseller_data(){
		if($_POST){
		$product_name=$this->input->post("product_name");
		$bseller_id=$this->input->post("bseller_id");
		
		$this->load->library('upload');
		$uploadStatus="";
		$file_upload_name="";
			if(isset($_FILES['product_image']) && $_FILES['product_image']['name'] != '')
				{
				    $config=array();
				    $config['upload_path'] = getcwd().'/upload/product_bestseller/';
					$config['allowed_types'] = 'jpg|png|jpeg|gif|webp';
          
					$this->upload->initialize($config);	
				
					if($this->upload->do_upload('product_image'))
					{
    					$upload_data = $this->upload->data();
    					$file_upload_name = $upload_data['file_name'];
			
					}else{
					 $uploadStatus = $this->upload->display_errors('<br /><span class="error">', '</span>');
          
            $this->form_validation->set_rules('product_image', 'product image','required',array('required'=>$uploadStatus));
          
			}
				}
				elseif($this->input->post('old_image') != '')
				{
					$file_upload_name = $this->input->post('old_image');
				}
			
	
			if(!empty($bseller_id)){
		 
			$update_data=array(
			 'product_name'=>$product_name,
			 'product_image'=>$file_upload_name,
			 'description'=>$this->input->post("description"),
			 'product_price'=>$this->input->post("product_price"),
			 'discount_percentage'=>$this->input->post("discount_percentage"),
			 'selling_price'=>$this->input->post("selling_price"),
			 'status'=>$this->input->post("status"),
			 'meta_title'=> $this->input->post("meta_title"),
			 'meta_description'=>$this->input->post("meta_description"),
			 'meta_keyword'=> $this->input->post("meta_keyword"),
			 'created_at'=>date('Y-m-d H:i:s')
			 ); 
			$this->db->where('id',$bseller_id);
		    $this->db->update('tbl_bestseller',$update_data);
			redirect(base_url().'Bestseller/manage_bestseller');
			
			}else{
			
			 $product_name=$this->input->post("product_name");
             $result=$this->Bestseller_model->get_duplicate('tbl_bestseller','product_name',$product_name);
             if($result<=0){    
			$insert_data=array(
			  'product_name'=>$product_name,
			 'product_image'=>$file_upload_name,
			 'description'=>$this->input->post("description"),
			 'product_price'=>$this->input->post("product_price"),
			  'discount_percentage'=>$this->input->post("discount_percentage"),
			 'selling_price'=>$this->input->post("selling_price"),
			  'status'=>$this->input->post("status"),
			 'meta_title'=> $this->input->post("meta_title"),
			 'meta_description'=>$this->input->post("meta_description"),
			 'meta_keyword'=> $this->input->post("meta_keyword"),
			 'created_at'=>date('Y-m-d H:i:s')
			 ); 
			$insert_id =$this->db->insert('tbl_bestseller',$insert_data);
			redirect(base_url().'Bestseller/manage_bestseller');
 			
			}
        else{
         $_SESSION['error_msg'] = 'Product name alredy exist!';
         redirect(base_url().'Bestseller/add_manage_bestseller'); 

        }
			
		}
	
		}
	}

	
	public function manage_bestseller(){
		
	  $data['manage_bestseller']=$this->Bestseller_model->bestseller_list();
	  $data['subview']="manage_bestseller";
	  $this->load->view('layout/default',$data);
	}

	public function add_manage_bestseller(){
		 $sid=$this->uri->segment(3);
		   if($sid){
			 $data['single_bestseller_data']=$this->Bestseller_model->single_bestseller_list($sid);
			
		  }
		   
		   $data['subview']="add-bestseller";
		   $this->load->view('layout/default',$data); 
	}

    	public function do_upload(){
    		if($_FILES['file']['name']){
    		$file_name =time().'_'.$_FILES['file']['name'];  
    		$_FILES['userfile']['name']=time().'_'.$_FILES['file']['name'];
    		$_FILES['userfile']['type']= $_FILES['file']['type'];
            $_FILES['userfile']['tmp_name']= $_FILES['file']['tmp_name'];
            $_FILES['userfile']['error']= $_FILES['file']['error'];
            $_FILES['userfile']['size']= $_FILES['file']['size'];
    		$path=$this->config->item('base_Url').'/upload/product_bestseller/';
    		$config1['upload_path']=$path;
    		$config1['allowed_types']='jpg|png|gif';
    		$config1['min_hieght']='10';
    		$config1['min_width']='10';
    		$this->load->library('upload',$config1);
    		$this->upload->initialize($config1);
    		$this->upload->do_upload('userfile');
    		return $file_name;
    		}
        
    	} 

         public function deletes($table, $field, $delete_id, $section){
            $section = @str_replace('_', '  ', $section);
            $result = $this->Bestseller_model->deletes($table, $field, $delete_id);
            if ($result):
            $_SESSION['success']='Record has been successfully deleted.';
            else:
            $_SESSION['success']='Error in delete record. Please try again.';
            endif;
            redirect($_SERVER["HTTP_REFERER"]);
        }   
        
        public function deleteAll()
        {
            $ids = $this->input->post('ids');
            
            $this->db->where_in('id', explode(",", $ids));
            $this->db->delete('tbl_bestseller');
            
            echo json_encode(['success'=>"Record Deleted successfully."]);
        }

}
