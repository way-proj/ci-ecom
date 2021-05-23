	<?php
	//print_r(@$single_pro_data);
	$cat_array[]= @$single_pro_data->cat_id;
	$sub_cat_array[]= @$single_pro_data->sub_cat_id;
	$sub_chid_cat_array[]= @$single_pro_data->sub_cat_child_id;
	$material_data_array[]= @$single_pro_data->material_id;
    $brand_array[]= @$single_pro_data->brand_name;
	
	$attr_id=@$single_pro_data->product_attribute;
	$image=Get_Productgallery_details(@$single_pro_data->id);
	
	
	?>
	<script>
    $(document).ready(function() {
    $("#onchange_div").hide();
    $("#onchange_div2").hide();
    });
  function get_cat_id(val){
    //alert(val);
    $("#load_div").hide();
    $("#load_div2").hide();
    $("#onchange_div").show();
    $.ajax({
          url:"<?php echo base_url();?>"+'Productmaster/get_sub_cat',
          type:'POST',
          data:{cat_id:val},
          success:function(result){
            $("#sub_cat_id").html(result);
            $("#sub_cat_child_id").html('');
          }
      })
  }
 function get_brand_id(val){
    //alert(val);
    $("#load_div").hide();
    $("#load_div2").hide();
    $("#onchange_div").show();
    $.ajax({
          url:"<?php echo base_url();?>"+'Productmaster/get_brand_cat',
          type:'POST',
          data:{brand_id:val},
          success:function(result){
            $("#cat_id").html(result);
            $("#sub_cat_child_id").html('');
          }
      })
  } 
function get_attr_data(){
    var cat_id=$("#cat_id").val();
    $.ajax({
          url:"<?php echo base_url();?>"+'Productmaster/get_attr_data',
          type:'POST',
          data:{cat_id:cat_id},
          success:function(results){
           $("#thead_data").html(results);
            alert(result);
          }
      })
  }
function get_cat_child_id(val){
    //alert(val);
    $("#load_div").hide();
    //alert(val);
    $("#load_div2").hide();
    $("#onchange_div2").show();
    $.ajax({
          url:"<?php echo base_url();?>"+'Productmaster/get_sub_child_cat',
          type:'POST',
          data:{cat_id:val},
          success:function(result){
          	//alert(result);
            $("#sub_cat_child_ids").html(result);
          }
      })
  }
 function get_id(id){
   $("#photo_"+id).val(id);
  } 
  </script>
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
               <div class="container-fluid">
                <h2>Products</h2>
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a class="active" href="<?php echo base_url()?>productmaster/addpromaster">Products</a></li>
                        
                       <div class="pull-right">
                    <button type="submit" form="form-category" data-toggle="tooltip" title="" class="btn btn-primary" data-original-title="Save"><i class="fa fa-save"></i></button>
                    <a href="<?php echo base_url();?>Productmaster/ProductList" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Cancel"><i class="fa fa-reply"></i></a></div>
                </ol>
                
                </div>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<style>
input.error {
    border-color: #f00 !important;
}

small.required {
    color:#f00;
}
</style>
<?php 
//echo'<pre>';print_r($fields_data); ?>
<div class="container" style="margin-top: 20px; width:100%;">
     <div class="panel panel-primary">
      <div class="panel-body">
            <form action="<?php echo base_url();?>/Productmaster/save_product_data" class="form-horizontal" method="post" enctype="multipart/form-data" id="validate">
              <input type="hidden" name="eid" value="<?php echo @$this->uri->segment(3);?>">
              <input type="hidden" id="attr_ids" value="<?php echo @$attr_id;?>">
    <ul class="nav nav-tabs nav-justified nav-inline">
                    <li class="active"><a href="#General" data-toggle="tab">General</a></li>
                   <!--  <li><a href="#Data" data-toggle="tab">Data</a></li> -->
                    <li><a href="#Links" data-toggle="tab">Links</a></li>
                    <!-- <li><a onclick="get_attr_data()" href="#Poduct-attribute" data-toggle="tab">Poduct Attribute</a></li> -->
                   
             <li><a href="#Poduct-attribute" data-toggle="tab">Poduct Attribute</a></li>
             <li><a href="#Poduct-image" data-toggle="tab">Poduct Photo</a></li>
               
                
                   <!--  <li><a href="#Image" data-toggle="tab">Image</a></li> -->
                </ul>
			<div class="tab-content tab-validate" style="margin-top:20px;">
			<div class="tab-pane active" id="General">
			<div class="tab-content"> <div class="tab-pane active" id="language1">
			<div class="form-group required">
			<label class="col-sm-2 control-label" for="input-name1">Product Name</label>
			<div class="col-sm-10">
			<input type="text" name="product_name" value="<?php echo @$single_pro_data->product_name;?>" placeholder="Product Name" id="input-name1" class="form-control">
			</div>
			</div>
			<div class="form-group required">
			<label class="col-sm-2 control-label" for="input-name1">Product Material<?php //print_r($material_data);?></label>
			<div class="col-sm-10">
			<select required=""  name="product_material" id="product_material" class="form-control valid" aria-required="true" aria-invalid="false">
			<option value="">Select Material</option>
			<?php foreach($material_data as $value) {?>
			<option value="<?php echo $value->id?>" <?php if(in_array($value->id,$material_data_array)){ echo 'selected="selected"';}?>><?php echo $value->name?></option>
			

			<?php } ?>
			</select>
			</div>
			</div>
			<div class="form-group required">
			<label class="col-sm-2 control-label" for="input-name1">Number of Pieces</label>
			<div class="col-sm-10">
			<input type="text" name="number_pieces" value="<?php echo @$single_pro_data->number_pieces;?>" placeholder="Number of Pieces" id="input-name1" class="form-control">
			</div>
			</div>

		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-description1">Product Description</label>
		<div class="col-sm-10">
		<textarea name="description" id="description" class="tincyeditor"><?php echo @$single_pro_data->description;?></textarea>
		</div>
		</div>
		<?php
		if(@$fields_data[26]->status==1){?>
		<div class="form-group required">
		<label class="col-sm-2 control-label" for="input-meta-title1">Meta Tag Title</label>
		<div class="col-sm-10">
		<input type="text" name="product_title" value="<?php echo @$single_pro_data->product_title;?>" placeholder="Meta Tag Title" id="input-meta-title1" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[25]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-meta-description1">Meta Tag Description</label>
		<div class="col-sm-10">
		<textarea name="meta_description" rows="5" placeholder="Meta Tag Description" id="input-meta-description1" class="form-control"><?php echo @$single_pro_data->meta_description;?></textarea>
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[24]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-meta-keyword1">Meta Tag Keywords</label>
		<div class="col-sm-10">
		<textarea name="tag_keyword" rows="5" placeholder="Meta Tag Keywords" id="input-meta-keyword1" class="form-control"><?php echo @$single_pro_data->tag_keyword;?></textarea>
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[23]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-tag1"><span data-toggle="tooltip" title="" data-original-title="Comma separated">Product Tags</span></label>
		<div class="col-sm-10">
		<input type="text" name="product_tag" value="<?php echo @$single_pro_data->product_tag;?>" placeholder="Product Tags" id="input-tag1" class="form-control">
		</div>
		</div>
		<?php }?>
		</div>
		</div>
		</div>
		<div class="tab-pane" id="Data">
		<div class="tab-pane" id="tab-data">
		<?php
		if(@$fields_data[22]->status==1){?>                    
		<div class="form-group required">
		<label class="col-sm-2 control-label" for="input-model">Model</label>
		<div class="col-sm-10">
		<input type="text" name="model" value="<?php echo @$single_pro_data->model;?>" placeholder="Model" id="input-model" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[21]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-sku"><span data-toggle="tooltip" title="" data-original-title="Stock Keeping Unit">SKU</span></label>
		<div class="col-sm-10">
		<input type="text" name="sku" value="<?php echo @$single_pro_data->sku;?>" placeholder="SKU" id="input-sku" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[20]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-upc"><span data-toggle="tooltip" title="" data-original-title="Universal Product Code">UPC</span></label>
		<div class="col-sm-10">
		<input type="text" name="upc" value="<?php echo @$single_pro_data->upc;?>" placeholder="UPC" id="input-upc" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[19]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-ean"><span data-toggle="tooltip" title="" data-original-title="European Article Number">EAN</span></label>
		<div class="col-sm-10">
		<input type="text" name="ean" value="<?php echo @$single_pro_data->ean;?>" placeholder="EAN" id="input-ean" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[18]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-jan"><span data-toggle="tooltip" title="" data-original-title="Japanese Article Number">JAN</span></label>
		<div class="col-sm-10">
		<input type="text" name="jan" value="<?php echo @$single_pro_data->jan;?>" placeholder="JAN" id="input-jan" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[17]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-isbn"><span data-toggle="tooltip" title="" data-original-title="International Standard Book Number">ISBN</span></label>
		<div class="col-sm-10">
		<input type="text" name="isbn" value="<?php echo @$single_pro_data->isbn;?>" placeholder="ISBN" id="input-isbn" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[16]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-mpn"><span data-toggle="tooltip" title="" data-original-title="Manufacturer Part Number">MPN</span></label>
		<div class="col-sm-10">
		<input type="text" name="mpn" value="<?php echo @$single_pro_data->mpn;?>" placeholder="MPN" id="input-mpn" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[15]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-location">Location</label>
		<div class="col-sm-10">
		<input type="text" name="location" value="<?php echo @$single_pro_data->location;?>" placeholder="Location" id="input-location" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[14]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-price">MRP</label>
		<div class="col-sm-10">
		<input type="text" name="mrp_price" value="<?php echo @$single_pro_data->mrp_price;?>" placeholder="MRP" id="input-price" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[13]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-purchase">Purchase Price</label>
		<div class="col-sm-10">
		<input type="text" name="purchase_price" value="<?php echo @$single_pro_data->purchase_price;?>" placeholder="Purchase Pric" id="input-price" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[12]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-price">Margin %</label>
		<div class="col-sm-10">
		<input type="text" name="margin_price" value="<?php echo @$single_pro_data->margin_price;?>" placeholder="Margin %" id="input-price" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[11]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-price">Sale Price</label>
		<div class="col-sm-10">
		<input type="text" name="sale_price" value="<?php echo @$single_pro_data->sale_price;?>" placeholder="Sale Price" id="input-price" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[10]->status==1){?>

		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-length">GST %</label>
		<div class="col-sm-10">
		<div class="row">
		<div class="col-sm-4">
		<input type="text" name="gst_per" value="<?php echo @$single_pro_data->gst_per;?>" placeholder="GST %" id="input-price" class="form-control">
		</div>
		<div class="col-sm-1">
		<label class="col-sm-2 control-label" for="input-length">Type</label>
		</div>

		<div class="col-sm-7">
		<select name="gst_type" id="input-tax-class" class="form-control">
		<option value="0">--Select type---</option>

		<option value="Exclusive"<?php if(@$single_pro_data->gst_type=='Exclusive'){ echo'selected="selected"';};?>>Exclusive</option>
		<option value="Inclusive"<?php if(@$single_pro_data->gst_type=='Inclusive'){ echo'selected="selected"';};?>>Inclusive</option>
		</select>


		</div>
		</div>
		</div>
		</div>


		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-length">HSN Code</label>
		<div class="col-sm-10">
		<div class="row">
		<div class="col-sm-4">
		<input type="text" name="hsn_code" value="<?php echo @$single_pro_data->hsn_code;?>"  id="input-price" class="form-control">
		</div>
		<div class="col-sm-1">
		<label class="col-sm-2 control-label" for="input-length">Status</label>
		</div>

		<div class="col-sm-7">
		<select name="status" id="input-status" class="form-control">
		<option value="Enabled" <?php if (@$single_cat_data->status == 'Enabled') echo ' selected="selected"'; ?>>Enabled</option>
		<option value="Disabled" <?php if (@$single_cat_data->status == 'Disabled') echo ' selected="selected"'; ?>>Disabled</option>
		</select>


		</div>
		</div>
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[9]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-quantity">Max quantity</label>
		<div class="col-sm-10">
		<input type="text" name="max_quantity" value="<?php echo @$single_pro_data->margin_price;?>" placeholder="Max Quantity" id="input-quantity" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[8]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-minimum"><span data-toggle="tooltip" title="" data-original-title="Force a minimum ordered amount">Min quantity</span></label>
		<div class="col-sm-10">
		<input type="text" name="min_quantity" value="<?php echo @$single_pro_data->margin_price;?>" placeholder="Minimum Quantity" id="input-minimum" class="form-control">
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[7]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-subtract">Stock</label>
		<div class="col-sm-10">
		<select name="subtract" id="input-subtract" class="form-control">
		<option value="1"<?php if (@$single_cat_data->store == '1') echo ' selected="selected"'; ?>>Yes</option>
		<option value="0" <?php if (@$single_cat_data->store == '0') echo ' selected="selected"'; ?>>No</option>
		</select>
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[6]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-stock-status"><span data-toggle="tooltip" title="" data-original-title="Status shown when a product is out of stock">Out Of Stock Status</span></label>
		<div class="col-sm-10">
		<select name="stock_status_id" id="input-stock-status" class="form-control">
		<option value="6" <?php if (@$single_cat_data->stock_status_id == '6') echo ' selected="selected"'; ?>>2-3 Days</option>
		<option value="7" <?php if (@$single_cat_data->stock_status_id == '7') echo ' selected="selected"'; ?>>In Stock</option>
		<option value="5" <?php if (@$single_cat_data->stock_status_id == '5') echo ' selected="selected"'; ?>>Out Of Stock</option>
		<option value="8" <?php if (@$single_cat_data->stock_status_id == '8') echo ' selected="selected"'; ?>>Pre-Order</option>
		</select>
		</div>
		</div>
		<?php }?>

		<?php
		if(@$fields_data[5]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-length">Dimensions (L x W x H)</label>
		<div class="col-sm-10">
		<div class="row">
		<div class="col-sm-2">
		<input type="text" name="length" value="<?php echo @$single_pro_data->length;?>" placeholder="Length" id="input-length" class="form-control">
		</div>
		<div class="col-sm-2">
		<input type="text" name="width" value="<?php echo @$single_pro_data->width;?>" placeholder="Width" id="input-width" class="form-control">
		</div>
		<div class="col-sm-2">
		<input type="text" name="height" value="<?php echo @$single_pro_data->height;?>" placeholder="Height" id="input-height" class="form-control">
		</div>

		<div class="col-sm-3">
		<label class="col-sm-12 control-label" for="input-length">Length class</label>
		</div>
		<div class="col-sm-3">
		<select name="weight_class_id" id="input-weight-class" class="form-control">
		<option value="1" selected="selected">Meter</option>
		<option value="2" <?php if (@$single_cat_data->stock_status_id == '2') echo ' selected="selected"'; ?>>Millimeter</option>
		<option value="5" <?php if (@$single_cat_data->stock_status_id == '5') echo ' selected="selected"'; ?>>Centimeter</option>

		</select>
		</div>


		</div>
		</div>
		</div>
		<?php }?>
		<?php
		if(@$fields_data[4]->status==1){?>

		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-length">Weight</label>
		<div class="col-sm-10">
		<div class="row">
		<div class="col-sm-4">
		<input type="text" name="weight" value="<?php //echo @$single_pro_data->purchase_price;?>" placeholder="Weight" id="input-price" class="form-control">
		</div>
		<div class="col-sm-3">
		<label class="col-sm-12 control-label" for="input-length">Weight Class</label>
		</div>

		<div class="col-sm-5">
		<select name="weight_class_id" id="input-weight-class" class="form-control">
		<option value="1" selected="selected">Kilogram</option>
		<option value="2" <?php if (@$single_cat_data->stock_status_id == '2') echo ' selected="selected"'; ?>>Gram</option>
		<option value="5" <?php if (@$single_cat_data->stock_status_id == '5') echo ' selected="selected"'; ?>>Pound </option>
		<option value="6" <?php if (@$single_cat_data->stock_status_id == '6') echo ' selected="selected"'; ?>>Ounce</option>
		</select>


</div>
</div>
</div>
</div>
<?php }?>




<!-- 
<div class="form-group">
<label class="col-sm-2 control-label" for="input-status">Product Status</label>
<div class="col-sm-4">
<select name="status" id="input-status" class="form-control">
<option value="Enabled" <?php if (@$single_cat_data->status == 'Enabled') echo ' selected="selected"'; ?>>Enabled</option>
<option value="Disabled" <?php if (@$single_cat_data->status == 'Disabled') echo ' selected="selected"'; ?>>Disabled</option>
</select>
</div>
</div> -->
		<?php
		if(@$fields_data[3]->status==1){?>
		<div class="form-group">
		<label class="col-sm-2 control-label" for="input-sort-order">Sort Order</label>
		<div class="col-sm-10">
		<input type="text" name="sort_order" value="<?php echo @$single_pro_data->sort_order;?>" placeholder="Sort Order" id="input-sort-order" class="form-control">
		</div>
		</div>
		<?php }?>
		</div>
		</div>
					<div class="tab-pane" id="Links">
				<div class="form-group">
                <label class="col-sm-2 control-label" for="input-subtract"> Brand</label>
					<div class="col-sm-10">
					<select name="brandname" id="brandname" onchange="get_brand_id(this.value)" class="form-control">
					  <option value="">--Select Brand--</option>
					  <?php foreach($brand_data as $key=>$value) {?>
					 <option value="<?php echo $value->id; ?>"<?php if(in_array($value->id,$brand_array)){ echo 'selected="selected"';}?>><?php echo $value->brand_name; ?></option>
					  <?php } ?>
					</select>
					</div>
                </div> 

			 <div class="form-group">
                <label class="col-sm-2 control-label" for="input-subtract">Category<span style="color:red"></span></label>
                <div class="col-sm-10">
                <select   onchange="get_cat_id(this.value)" name="cat_id" id="cat_id" class="form-control">
                <option value="<?php echo @$single_pro_data->sub_child_category_name;?>">Select Category</option>
                   <?php 

                   foreach ($cat_data as $value) {?>
                    <option value="<?php echo $value->id;?>"<?php if(in_array($value->id,$cat_array)){ echo 'selected="selected"';}?> ><?php echo @$value->category_name;?></option>
                   <?php } ?>
                 </select>

                </div>
                </div>
				
				
                <div class="form-group" id="load_div">
                <label class="col-sm-2 control-label" for="input-subtract">Sub Category</label>
                <div class="col-sm-10">
                <select  onchange="get_cat_child_id(this.value)" name="subcat_id" id="subcat_id" class="form-control">
                <option value="">Select Sub Category</option>
                   <?php 
                  foreach ($sub_cat_data as $value) {?>
                    <option value="<?php echo $value->id;?>"<?php if(in_array($value->id,$sub_cat_array)){ echo 'selected="selected"';}?> ><?php echo @$value->sub_category_name;?></option>
                   <?php } ?>
                 </select>
                </div>
                </div> 
             
               <div class="form-group" id="onchange_div">
                <label class="col-sm-2 control-label" for="input-subtract">Sub Category</label>
                <div class="col-sm-10">
                <select  id="sub_cat_id" onchange="get_cat_child_id(this.value)" name="subcat_id" id="input-store" class="form-control">
                 </select>
                </div>
                </div>
                

              <div class="form-group" id="load_div2">
                <label class="col-sm-2 control-label" for="input-subtract">Sub Child Category</label>
                <div class="col-sm-10">
                <select  name="sub_cat_child_id" id="sub_cat_child_id" class="form-control">
                <option value="">Select Sub Category</option>
                   <?php 
                  foreach ($sub_child_cat_data as $value) {?>
                    <option value="<?php echo $value->id;?>"<?php if(in_array($value->id,$sub_chid_cat_array)){ echo 'selected="selected"';}?> ><?php echo @$value->sub_child_category_name;?></option>
                   <?php } ?>
                 </select>
                </div>
                </div>

               <div class="form-group" id="onchange_div2">
                <label class="col-sm-2 control-label" for="input-subtract">Sub Child Category</label>
                <div class="col-sm-10">
                <select  id="sub_cat_child_ids" name="sub_cat_child_id"  class="form-control">
                 </select>
                </div>
                </div> 
			</div>
				
                                                  
<div class="tab-pane" id="Poduct-attribute">
     <div class="form-group">
		<label class="col-sm-2 control-label" for="input-length">Length(CM)</label>
		<div class="col-sm-10">
		<div class="row">
		<div class="col-sm-3">
		<input type="text" name="length" value="<?php echo @$single_pro_data->length;?>" placeholder="Length(CM)" id="input-price" class="form-control">
		</div>
		<div class="col-sm-2">
		<label class="col-sm-2 control-label" for="input-length">Width(CM)</label>
		</div>
        <div class="col-sm-3">
	    <input type="text" name="width" value="<?php echo @$single_pro_data->width;?>" placeholder="Width(CM)" id="input-price" class="form-control">
		</div>
         </div>
		</div>
       <label class="col-sm-2 control-label" for="input-length">Height(CM)</label>
		<div class="col-sm-10">
		<div class="row">
		<div class="col-sm-3">
		<input type="text" name="height" value="<?php echo @$single_pro_data->height;?>" placeholder="Height(CM)" id="input-price" class="form-control">
		</div>
		<div class="col-sm-2">
		<label class="col-sm-2 control-label" for="input-length">Weight(KG)</label>
		</div>
        <div class="col-sm-3">
	    <input type="text" name="weight" value="<?php echo @$single_pro_data->item_weight;?>" placeholder="Weight(KG)" id="input-price" class="form-control">
		</div>
         </div>
		</div>
      <label class="col-sm-2 control-label" for="input-length">Item Code</label>
		<div class="col-sm-10">
		<div class="row">
		<div class="col-sm-3">
		<input type="text" name="item_code" value="<?php echo @$single_pro_data->item_code;?>" placeholder="Item Code" id="input-price" class="form-control">
		</div>
		<div class="col-sm-2">
		<label class="col-sm-2 control-label" for="input-length">Shape</label>
		</div>
        <div class="col-sm-3">
	    <input type="text" name="shape" value="<?php echo @$single_pro_data->shape;?>" placeholder="Shape" id="input-price" class="form-control">
		</div>
         </div>
		</div>
        <label class="col-sm-2 control-label" for="input-length">Range/ Collection</label>
		<div class="col-sm-10">
		<div class="row">
		<div class="col-sm-3">
		<input type="text" name="range_collection" value="<?php echo @$single_pro_data->range_collection;?>" placeholder="Range/ Collection" id="input-price" class="form-control">
		</div>
		<div class="col-sm-2">
		<label class=" control-label" for="input-length">Pattern Name</label>
		</div>
        <div class="col-sm-3 control-label">
	    <input type="text" name="pattern_name" value="<?php echo @$single_pro_data->pattern_name;?>" placeholder="Pattern Name" id="input-price" class="form-control">
		</div>
        </div>
		</div>

		 <label class="col-sm-2 control-label" for="input-length">Item Group</label>
		<div class="col-sm-10">
		<div class="row">
		<div class="col-sm-3">
		<input type="text" name="item_group" value="<?php echo @$single_pro_data->item_group;?>" placeholder="Item Group" id="input-price" class="form-control">
		</div>
		<div class="col-sm-2">
		<label class="col-sm-2 control-label" for="input-length">Unit</label>
		</div>
        <div class="col-sm-3 control-label">
	    <input type="text" name="unit" value="<?php echo @$single_pro_data->unit;?>" placeholder="Unit" id="input-price" class="form-control">
		</div>
        </div>
		</div>


      <label class="col-sm-2 control-label" for="input-length">MRP</label>
		<div class="col-sm-10">
		<div class="row">
		<div class="col-sm-3">
		<input type="text" name="mrp_price" value="<?php echo @$single_pro_data->mrp_price;?>" placeholder="MRP" id="input-price" class="form-control">
		</div>
		<div class="col-sm-2">
		<label class=" control-label" for="input-length">Sales price</label>
		</div>
        <div class="col-sm-3 control-label">
	    <input type="text" name="sale_price" value="<?php echo @$single_pro_data->sale_price;?>" placeholder="Sales price" id="input-price" class="form-control">
		</div>
        </div>
		</div>



</div>
</div>
<div class="tab-pane" id="Poduct-image">
<div class="form-group">

<table class="table table-striped table-bordered table-hover">
<thead>
<tr>
<td class="text-left">Image</td>
</tr>
</thead>
<tbody>
<tr>
<td class="text-left">
  <?php
     $pid=$this->uri->segment(3);
     if(@$single_pro_data->image1){
      $i=1;
      }
     if(@$single_pro_data->image2){
      $i=2;
     }
     if(@$single_pro_data->image3){
      $i=3;
     }
     if(@$single_pro_data->image4){
      $i=4;
     }
    //print_r($image);
     if(@$i>0){
     	 ?>
     <div id="AudioWrapper4">
           <!--  <label class="col-lg-3 control-label">Product Photo:</label> -->
          <?php
           //for ($j=1; $j <=$i ; $j++) {
                $url1=explode('?',@$single_pro_data->image1);
                $comp_url1=$url1[0].'?raw=1';
                $url2=explode('?',@$single_pro_data->image2);
                $comp_url2=$url2[0].'?raw=1';
                $url3=explode('?',@$single_pro_data->image3);
                $comp_url3=$url3[0].'?raw=1';
                $url4=explode('?',@$single_pro_data->image4);
                $comp_url4=$url4[0].'?raw=1';
                $url5=explode('?',@$single_pro_data->image5);
                $comp_url5=$url5[0].'?raw=1';
             if(@$single_pro_data->image1){
           	?> 
             <div class="col-lg-7">
             <input class="form-control" type="text" value="<?php echo @$single_pro_data->image1;?>" name="image[]"> <a style="float:right;color:red" href="javascript:void(0)" onclick="remove_variant1(<?php echo $pid;?>)" class="removeclassAudio4 icon-minus dett_n alerts-color">X</a>
              <img style="height: 150px;width: 180px; float: left;" src="<?php echo $comp_url1;?>"/>
             </div>

             <?php }

           if(@$single_pro_data->image2){
           	?> 
             <div class="col-lg-7">
             <input class="form-control" type="text" value="<?php echo @$single_pro_data->image2;?>" name="image[]">
             <a style="float:right;color:red" href="javascript:void(0)" onclick="remove_variant2(<?php echo $pid;?>)" class="removeclassAudio4 icon-minus dett_n alerts-color">X</a>
              <img style="height: 150px;width: 180px; float: left;" src="<?php echo $comp_url2;?>"/>
             </div>
             <?php }
             if(@$single_pro_data->image3){
           	?> 
             <div class="col-lg-7">
             <input class="form-control" type="text" value="<?php echo @$single_pro_data->image3;?>" name="image[]">
             <a style="float:right;color:red" href="javascript:void(0)" onclick="remove_variant3(<?php echo $pid;?>)" class="removeclassAudio4 icon-minus dett_n alerts-color">X</a>
              <img style="height: 150px;width: 180px; float: left;" src="<?php echo $comp_url3;?>"/>
             </div>
             <?php }
             if(@$single_pro_data->image4){
           	?> 
             <div class="col-lg-7">
             <input class="form-control" type="text" value="<?php echo @$single_pro_data->image4;?>" name="image[]">
             <a style="float:right;color:red" href="javascript:void(0)" onclick="remove_variant4(<?php echo $pid;?>)" class="removeclassAudio4 icon-minus dett_n alerts-color">X</a>
              <img style="height: 150px;width: 180px; float: left;" src="<?php echo $comp_url4;?>"/>
             </div>
             <?php }
            if(@$single_pro_data->image5){
           	?> 
             <div class="col-lg-7">
             <input class="form-control" type="text" value="<?php echo @$single_pro_data->image5;?>" name="image[]">
             <a style="float:right;color:red" href="javascript:void(0)" onclick="remove_variant5(<?php echo $pid;?>)" class="removeclassAudio4 icon-minus dett_n alerts-color">X</a>
              <img style="height: 150px;width: 180px; float: left;" src="<?php echo $comp_url5;?>"/>
             </div>
             <?php }?>

            <a style="float:right; margin-top: -8px;margin-bottom: 5px; margin-right: 168px;" href="#" id="AddMoreAudio4" class="icon-plus icon-2x margin-top-8">Add More</a>
            </div>
          
         

        <?php  } else{?>
         <div id="AudioWrapper4">
          <!--  <label class="col-lg-3 control-label">Product Photo:</label> -->
            <div class="col-lg-7">
              <input class="form-control" type="text" value="<?php echo @$single_pro_data->image5;?>" name="image[]">
            </div>
            <a style="float:right; margin-top: -8px;margin-bottom: 5px; margin-right: 168px;" href="#" id="AddMoreAudio4" class="icon-plus icon-2x margin-top-8">Add More</a>

</div>
<?php }?>
 </td>
</tr>
</tbody>
</table>
 </div>
</div>      

 
</td>
</tr>
</tbody>
</table>
</div>    
<?php if($this->uri->segment(3)){?> 
<div class="form-group col-md-2 pull-right">
                    <button type="submit" id="submit" class="btn btn-success btn-block">Update</button>
                </div>

<?php } else{?>
        <div class="form-group col-md-2 pull-right">
                    <button type="submit" id="submit" class="btn btn-success btn-block">Save</button>
                </div>
              <?php }?>
            </form>
        </div>
    </div>

</div>
<script type="text/javascript">

function remove_variant1(pid){
    if(pid!=''){
       var pid=pid;
       $.ajax({
            url:"<?php echo base_url();?>"+'Productmaster/delete_variant',
            type:"POST",
            data:{pid:pid,image:'image1'},
            success:function(res){
              window.location.href="<?php echo base_url();?>"+'Productmaster/addpromaster/'+pid;
             }
           })
      }
  }
function remove_variant2(pid){
    if(pid!=''){
       var pid=pid;
       $.ajax({
            url:"<?php echo base_url();?>"+'Productmaster/delete_variant',
            type:"POST",
            data:{pid:pid,image:'image2'},
            success:function(res){
              window.location.href="<?php echo base_url();?>"+'Productmaster/addpromaster/'+pid;
            }
           })
      }
  }
  function remove_variant3(pid){
    if(pid!=''){
       var pid=pid;
       $.ajax({
            url:"<?php echo base_url();?>"+'Productmaster/delete_variant',
            type:"POST",
            data:{pid:pid,image:'image3'},
            success:function(res){
              window.location.href="<?php echo base_url();?>"+'Productmaster/addpromaster/'+pid;
            }
           })
      }
  }
  function remove_variant4(pid){
    if(pid!=''){
       var pid=pid;
       $.ajax({
            url:"<?php echo base_url();?>"+'Productmaster/delete_variant',
            type:"POST",
            data:{pid:pid,image:'image4'},
            success:function(res){
              window.location.href="<?php echo base_url();?>"+'Productmaster/addpromaster/'+pid;
            }
           })
      }
  }
  function remove_variant5(pid){
    if(pid!=''){
       var pid=pid;
       $.ajax({
            url:"<?php echo base_url();?>"+'Productmaster/delete_variant',
            type:"POST",
            data:{pid:pid,image:'image5'},
            success:function(res){
              window.location.href="<?php echo base_url();?>"+'Productmaster/addpromaster/'+pid;
            }
           })
      }
  }



function gen_item_code(cnt){
       var item_code=Math.floor(100000 + Math.random() * 900000);
       $("#itemcode_"+cnt).val(item_code); 

}
function check_duplicate(cnt,barcode){
        var bcode=barcode;
        var item_code=Math.floor(100000 + Math.random() * 900000);
 // alert(item_code);
      // $("#itemcode_"+cnt).val(item_code);

       $("#dup_error_"+cnt).html('');
        $.ajax({
          url:"<?php echo base_url();?>"+'Productmaster/chek_duplicate',
          type:'POST',
          data:{bar_code:bcode},
          success:function(result){
             //alert(result);
             if(result>=1){
              $("#dup_error_"+cnt).html('<p style="color:red">Barcode duplicate! </p>');
             }

            if(result==0){
               $("#dup_error_"+cnt).html('');
             }
             if(result=='bk'){
               $("#dup_error_"+cnt).html('');
             }
          }
      })
   var inps = document.getElementsByName('barcode[]');
          for (var i = 0; i <inps.length; i++) {
               var inp=inps[i];
               var inp2=inps[i+1];
              if(inp.value!='' && inp2.value!=''){   
              if(inp.value==inp2.value){
                //alert("Barcode duplicate");
                $("#dup_error_"+i).html('<p style="color:red">Barcode duplicate');
                return false;
                } 
                else{
                  $("#dup_error_"+i).html('');
                }
              }
              //alert("pname["+i+"].value="+inp.value);
          }


       
     }
 function check_item_duplicate1(cnt,itemcode){
  var item_code=Math.floor(100000 + Math.random() * 900000);
 // alert(item_code);
  $("#itemcode_"+cnt).val(item_code);



 }

 function check_item_duplicate_old(cnt,itemcode){
       

       var itemcode=itemcode;
       $("#item_dup_error_"+cnt).html('');
        $.ajax({
          url:"<?php echo base_url();?>"+'Productmaster/chek_item_duplicate',
          type:'POST',
          data:{itemcode:itemcode},
          success:function(result){
             //alert(result);
             if(result>=1){
              $("#item_dup_error_"+cnt).html('<p style="color:red">Item code duplicate! </p>');
             }

            if(result==0){
               $("#item_dup_error_"+cnt).html('');
             }
             if(result=='bk'){
               $("#item_dup_error_"+cnt).html('');
             }
          }
      })
      var inps = document.getElementsByName('itemcode[]');
          for (var i = 0; i <inps.length; i++) {
              var inp=inps[i];
               var inp2=inps[i+1];
              if(inp.value){   
              if(inp.value==inp2.value){
                //alert("Barcode duplicate");
                $("#item_dup_error_"+i).html('<p style="color:red">Item code duplicate');
                return false;
                } 
                else{
                  $("#item_dup_error_"+i).html('');
                }
              }
              //alert("pname["+i+"].value="+inp.value);
          }

       
     }
  function get_margin(cnt){
      //alert(cnt);
     var mrp=$("#mrp_price_"+cnt).val();
     var margin_price=$("#margin_price_"+cnt).val();
     if(margin_price && mrp){
     // alert("gkhgk");
       // var profit=sp-mrp;
        var marginp= mrp*margin_price;
        var sp_val=marginp/100;
        var sp_price=mrp-sp_val;
       // alert(sp_price);
       var margin_per_sp=sp_price.toFixed();
        //alert(margin_per_sp);
       $("#sp_price_"+cnt).val(margin_per_sp);
      }else{
         $("#sp_price_"+cnt).val('');
      }
     //alert();
  }
</script>
            <script>
                    var loadFile1 = function(event) {
                      var reader = new FileReader();
                      reader.onload = function(){
                        var output1 = document.getElementById('output11');

                        output.src = reader.result;
                        
                      };
                      reader.readAsDataURL(event.target.files[0]);
                    };
                    var loadFile2 = function(event) {
                      var reader = new FileReader();
                      reader.onload = function(){
                        var output = document.getElementById('output2');
                        output.src = reader.result;
                        alert(reader.result);
                      };
                      reader.readAsDataURL(event.target.files[0]);
                    };
                    var loadFile3 = function(event) {
                      var reader = new FileReader();
                      reader.onload = function(){
                        var output = document.getElementById('output3');
                        output.src = reader.result;
                      };
                      reader.readAsDataURL(event.target.files[0]);
                    };
                    var loadFile4 = function(event) {
                      var reader = new FileReader();
                      reader.onload = function(){
                        var output = document.getElementById('output4');
                        output.src = reader.result;
                      };
                      reader.readAsDataURL(event.target.files[0]);
                    };
                    var loadFile5 = function(event) {
                      var reader = new FileReader();
                      reader.onload = function(){
                        var output = document.getElementById('output5');
                        output.src = reader.result;
                      };
                      reader.readAsDataURL(event.target.files[0]);
                    };

          </script>
        <script src="<?php echo base_url(); ?>assets/js/tinymce/js/tinymce/jquery.tinymce.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/tinymce/js/tinymce/tinymce.min.js"></script>
        <script type="text/javascript">
        $(document).ready(function(){
            tinyMCE.triggerSave();
            tinymce.init({
                selector: '.tincyeditor',
                height: 150,
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
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.1/jquery.validate.min.js"></script>
<script>
$(function() {
     $('#validate').validate({
       ignore: [],
        errorPlacement: function() {},
       submitHandler: function (form) {
       $('#submit').attr('disabled','disabled');
        form.submit();

       },
        invalidHandler: function() {
            setTimeout(function() {
                $('.nav-tabs a small.required').remove();
                var validatePane = $('.tab-content.tab-validate .tab-pane:has(input.error)').each(function() {
                    var id = $(this).attr('id');
                    $('.nav-tabs').find('a[href^="#' + id + '"]').append(' <small class="required">***</small>');
                });
                var validatePane = $('.tab-content.tab-validate .tab-pane:has(select.error)').each(function() {
                    var id = $(this).attr('id');
                    $('.nav-tabs').find('a[href^="#' + id + '"]').append(' <small class="required">***</small>');
                });
            });            
        },
        rules: {
            product_name: 'required',
            email: {
                required: true,
                email: true
            },  

   brand_name: 'required',
           
        }
    });
    
});
</script>

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
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</div>

<style type="text/css">
  .table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th{
            border: 2px solid #ddd;
            padding: 0px!important;
            text-align: center;
            color: #337ab7!important;
  }
 select.error{
  border-color:#f00 !important;
 }  
</style>


<script type="text/javascript">
 $(document).ready(function () {
   var MaxInputsAudio = 15; //maximum input boxes allowed

    var InputsWrapper = $("#AudioWrapper4 input"); //Input boxes wrapper ID

    var AddButton = "#AddMoreAudio4"; //Add button ID

    var x = InputsWrapper.length; //initlal text box count
    var img_cnt=x+1;
    var FieldCount = 1; //to keep track of text box added

     var cntt=2;

    $(AddButton).click(function (e) //on add input button click
     {

        e.preventDefault();

        InputsWrapper = $("#AudioWrapper4 input");

        x = InputsWrapper.length;

        console.log(x + '  ' + MaxInputsAudio);

        if(x < MaxInputsAudio) //max input box allowed
         {

            FieldCount++; //text box added increment
            
            //add input box

            $(InputsWrapper).parents('#AudioWrapper4').append('<div class="AudioRemove4"><input class="form-control" style="width:700px;" type="text" value="" name="image[]"><div style="float:right"><a href="#" class="removeclassAudio4 icon-minus dett_n alerts-color">delete</a></div><div class="col-md-9"><img width="10%" style="float:right" id="output'+cntt+'"/></div>');

            x++; //text box increment
           cntt++;
        }

        return false;

    });



    $("body").on("click", ".removeclassAudio4", function (e) { //user click on remove text
            
       console.log(x);

        if (x > 1) {

            $(this).parents('.AudioRemove4').remove(); //remove text box
            cntt--
            x--; //decrement textbox

        }

        return false;

    })



});
</script>

<style type="text/css">
  .table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th{
        border: 2px solid #ddd;
            padding: 0px!important;
            text-align: center;
            color: #337ab7!important;
  }
 select.error{
  border-color:#f00 !important;
 }  
</style>

