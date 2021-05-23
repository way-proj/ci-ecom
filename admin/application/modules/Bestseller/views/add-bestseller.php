       <div class="content-wrapper">
                <div class="container-fluid">
                <h2>Special offer</h2>
                
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a class="active" href="<?php echo base_url()?>Bestseller/manage_bestseller">Special offer</a></li>
                        
                       <div class="pull-right">
                    <!-- <button type="submit" form="form-category" data-toggle="tooltip" title="" class="btn btn-primary" data-original-title="Save"><i class="fa fa-save"></i></button> -->
                    <a href="<?php echo base_url();?>Bestseller/manage_bestseller" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Cancel"><i class="fa fa-reply"></i></a></div>
                </ol>
                
                </div>
                
                <!-- Main content -->
                <section class="content">
                <div class="row">
              
                       
             <div class="col-md-12">

                  <?php
                //print_r($_SESSION);
                  if(@$_SESSION['error_msg']){?>
                    <div class="alert alert-danger alert-dismissible"><i class="fa fa-exclamation-circle"></i> <?php echo $_SESSION['error_msg'];
                      unset($_SESSION['error_msg']);
                    ?>
					<button type="button" class="close" data-dismiss="alert">×</button>
				  </div>
				<?php }?>
                 

				<div style="display: none" id="glob_msg" class="alert alert-block alert-error">
					 <a class="close" data-dismiss="alert" href="#">X</a>
					 <div class="text-center"> 
						<h4 class="alert-heading">Error!</h4>
						<?php //echo $this->session->flashdata('error'); ?>
					 </div>
				</div>
              <!-- Custom Tabs -->
              <div class="nav-tabs-custom">
               
                <div class="tab-content">
                <div class="tab-pane active" id="tab_1">
                  <div class="panel panel-default">
                <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-pencil"></i> Add Special offer</h3>
                 </div>
                <div class="panel-body">
                <form action="<?php echo base_url();?>/Bestseller/save_bestseller_data" method="post" enctype="multipart/form-data" id="form-category" class="form-horizontal">
                
                <input type="hidden" name="bseller_id" value="<?php echo @$single_bestseller_data->id;?>">
                
                <div class="tab-content">
                <div class="tab-pane active" id="tab-general">
                
                <div class="tab-content">
                <div class="tab-pane active" id="language1">
                  <br>
                <div class="form-group required">
                <label class="col-sm-2 control-label" for="input-name1">Product Name <span style="color:red">*</span></label>
                <div class="col-sm-10">
                <input type="text" name="product_name" id="product_name" value="<?php echo set_value('product_name'); ?><?php echo @$single_bestseller_data->product_name;?>" placeholder="Product Name" class="form-control">
                <?php echo form_error('product_name', '<div class="error"><p style="color:red">', '</p></div>'); ?>
                </div>
                </div>
                
                <div class="form-group required">
                <label class="col-sm-2 control-label" for="input-name1">Product price <span style="color:red">*</span></label>
                <div class="col-sm-10">
                <input type="text" name="product_price" id="product_price" value="<?php echo set_value('product_price'); ?><?php echo @$single_bestseller_data->product_price;?>" placeholder="product price" class="form-control">
                <?php echo form_error('product_price', '<div class="error"><p style="color:red">', '</p></div>'); ?>
                </div>
                </div>
                
                <div class="form-group required">
                <label class="col-sm-2 control-label" for="input-name1">Discount (%) <span style="color:red">*</span></label>
                <div class="col-sm-10">
                <input type="text" name="discount_percentage" id="discount_percentage" value="<?php echo set_value('discount_percentage'); ?><?php echo @$single_bestseller_data->discount_percentage;?>" placeholder="Discount percentage" class="form-control discount_percentage">
                <?php echo form_error('discount_percentage', '<div class="error"><p style="color:red">', '</p></div>'); ?>
                </div>
                </div>
                
                <div class="form-group required">
                <label class="col-sm-2 control-label" for="input-name1">Selling Price <span style="color:red">*</span></label>
                <div class="col-sm-10">
                <input type="text" name="selling_price" id="selling_price" value="<?php echo set_value('selling_price'); ?><?php echo @$single_bestseller_data->selling_price;?>" placeholder="selling price" class="form-control" readonly>
                <?php echo form_error('selling_price', '<div class="error"><p style="color:red">', '</p></div>'); ?>
                </div>
                </div>

                <div class="form-group">
                <label class="col-sm-2 control-label" for="input-name1">Product image <span style="color:red">*</span></label>
                <div class="col-sm-10">
                <input type="hidden" name="old_image" value="<?php echo @$single_bestseller_data->product_image;?>">
               <?php
				  if(!empty($single_bestseller_data->product_image)){
					  ?>
				<img src="<?php echo base_url().'upload/product_bestseller/'.$single_bestseller_data->product_image; ?> " width="50">
					  <?php
				  }
               ?>
			    <input type="file" name="product_image"  id="product_image"  onchange="loadFile(event)">
				
                </div>
                </div>
				<div class="list-group-item" style="border: 0px !important;">
                                       <div class="row">
                                           <div class="col-md-3">
                                           </div>
                                           <div class="col-md-9"> 
                                               <img width="60px" id="output"/>
                                           </div>
                                       </div>
                                   </div>
								   
					   
                <div class="form-group">
                <label class="col-sm-2 control-label" for="input-description1">Description</label>
                <div class="col-sm-10">
                <textarea  name="description" id="description" class="tincyeditor"><?php echo @$single_bestseller_data->description;?></textarea>
                </div>
                </div>
				
				
				
                <div class="form-group required">
                <label class="col-sm-2 control-label" for="input-meta-title1">Meta Tag Title</label>
                <div class="col-sm-10">
                <input type="text" id="meta_title" name="meta_title" value="<?php echo set_value('meta_title'); ?><?php echo @$single_bestseller_data->meta_title;?>" placeholder="Meta Tag Title" id="input-meta-title1" class="form-control">
                </div>
                </div>
                <div class="form-group">
                <label class="col-sm-2 control-label" for="input-meta-description1">Meta Tag Description</label>
                <div class="col-sm-10">
                <textarea name="meta_description" rows="5" placeholder="Meta Tag Description" id="input-meta-description1" class="form-control"><?php echo set_value('meta_description'); ?><?php echo @$single_bestseller_data->meta_description;?></textarea>
                </div>
                </div>
                <div class="form-group">
                <label class="col-sm-2 control-label" for="input-meta-keyword1">Meta Tag Keywords</label>
                <div class="col-sm-10">
                <textarea name="meta_keyword" rows="5" placeholder="Meta Tag Keywords" id="input-meta-keyword1" class="form-control"><?php echo set_value('meta_keyword'); ?><?php echo @$single_bestseller_data->meta_keyword;?></textarea>
                </div>
                </div>
                </div>
                </div>
                </div>
               
                <div class="form-group">
                <label class="col-sm-2 control-label" for="input-status">Status</label>
                <div class="col-sm-10">
                <select name="status" id="input-status" class="form-control">
                <option value="1" <?php if(@$single_bestseller_data->status == '1') echo 'selected="selected"'; ?> >Active</option>
                <option value="0" <?php if (@$single_bestseller_data->status == '0') echo 'selected="selected"'; ?>>Inactive</option>
                </select>
                </div>
            
            </div>


     </div>
     <?php
     if($this->uri->segment(3)){?>
       <button style="float: right;" type="submit" class="btn btn-success" style="margin-top: 15px;" id="btnSaveIt">Update</button>
      <?php } else{?>  
     <button style="float: right;" type="submit" class="btn btn-success" style="margin-top: 15px;" id="btnSaveIt">Save</button>
 <?php }?>
</form>
</div>
</div>  


              <script>
                    var loadFile1 = function(event) {
                      var reader = new FileReader();
                      reader.onload = function(){
                        var output = document.getElementById('output1');
                        output.src = reader.result;
                      };
                      reader.readAsDataURL(event.target.files[0]);
                    };
          </script>
       <script>
                    var loadFile = function(event) {
                      var reader = new FileReader();
                      reader.onload = function(){
                        var output = document.getElementById('output');
                        output.src = reader.result;
                      };
                      reader.readAsDataURL(event.target.files[0]);
                    };
          </script>
       
        <script type="text/javascript">
        $(document).ready(function(){
            tinyMCE.triggerSave();
            tinymce.init({
                selector: '.tincyeditor',
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor textcolor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar1: "bold italic underline | alignleft aligncenter alignright alignjustify | styleselect | fontselect | fontsizeselect",
                toolbar2: "cut copy | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime | table ",
                content_css: [
                  '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                  '//www.tiny.cloud/css/codepen.min.css'
                ]
          });
        });
        </script>
 
		<script src="<?php echo base_url(); ?>assets/js/tinymce/js/tinymce/jquery.tinymce.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/tinymce/js/tinymce/tinymce.min.js"></script>
		<script src="<?php echo base_url() . "assets" ?>/plugins/jQuery/jquery-2.2.3.min.js"></script>
        <!-- Bootstrap 3.3.6 -->
        <script src="<?php echo base_url() . "assets" ?>/bootstrap/js/bootstrap.min.js"></script>
        <!-- DataTables -->
        <script src="<?php echo base_url() . "assets" ?>/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="<?php echo base_url() . "assets" ?>/plugins/datatables/dataTables.bootstrap.min.js"></script>
        <!-- SlimScroll -->
        <script src="<?php echo base_url() . "assets" ?>/plugins/slimScroll/jquery.slimscroll.min.js"></script>
        <!-- FastClick -->
        <script src="<?php echo base_url() . "assets" ?>/plugins/fastclick/fastclick.js"></script>
        <!-- AdminLTE App -->
        <script src="<?php echo base_url() . "assets" ?>/dist/js/app.min.js"></script>
        <!-- AdminLTE for demo purposes -->
        <script src="<?php echo base_url() . "assets" ?>/dist/js/demo.js"></script>
        <?php ?>
        
        

<script>
$(document).ready(function(){
$('#product_price, #discount_percentage').on('input',function(){

    var product_price = parseInt($('#product_price').val()) || 0;
    var discount_percentage = parseInt($('#discount_percentage').val()) || 0;
    
    var  selling_price = product_price - (product_price * (discount_percentage / 100));
    
     $('#selling_price').val(selling_price);

});

});

</script>
        
        