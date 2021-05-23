<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MX_Controller {
         function __construct(){
			parent::__construct();
			$this->load->model('Home_model');
            $this->load->model('../../Common/Crud_model');
			$this->load->helper(array('form', 'new','url','menu_helper'));

		   }

	public function index()
		{ 
		$data['prodBestSeller'] = $this->Home_model->getBestSeller();    
		$data['arrivals_data']=$this->Home_model->getnew_arrivals_data();
	    $data['home_top_silider_data']=$this->Crud_model->getDirectQueryCommonData('SELECT * FROM `top_home_silider` order by id desc');
	    $data['prodBrand'] = $this->Home_model->getBrand();
	    //print_r($data['prodBrand']); die;
        $data['subview']="home_page";
		$this->load->view('layout/default', $data);
		}
		
	public function categorypage(){
          $cat_id=$this->uri->segment(3);
         if($cat_id!='sub_id'){
          $data['product_list']=$this->Home_model->product_cat_data($cat_id);

          }else{
          $sub_cat_id=$this->uri->segment(4);
          $data['product_list']=$this->Home_model->product_scat_data($sub_cat_id);
         }
         $data['cat_product_list']=$this->Home_model->cat_all_product_list(); 
        $data['subview']="category_page";
        $this->load->view('layout/default', $data);
    }
       
      	

}
