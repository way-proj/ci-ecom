<div class="content-wrapper">
               <div class="content-header">
                <div class="container-fluid">
                <h2>Products</h2>
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                    <li><a class="active" href="<?php echo base_url()?>productmaster/ProductList">Products</a></li>
                        
                       <div class="pull-right"><a href="<?php echo base_url()?>Productmaster/addpromaster" data-toggle="tooltip" title="" class="btn btn-primary" data-original-title="Add New"><i class="fa fa-plus"></i></a> <a href="#" data-toggle="tooltip" title="" class="btn btn-default" data-original-title="Rebuild"><i class="fa fa-refresh"></i></a>
                <!--<button  data-toggle="tooltip" title="" class="btn btn-danger" onclick="confirm('Are you sure?') ? $('#form-category').submit() : false;" data-original-title="Delete"><i class="fa fa-trash-o"></i></button>-->
				<button type="button" data-toggle="tooltip" title="" class="btn btn-danger delete_all"  data-original-title="Delete" data-url="<?php echo base_url();?>/Productmaster/deleteAllProduct"><i class="fa fa-trash-o"></i></button>
               
                </div>
                </ol>
                </div>
                </div>
                <?php //$this->load->view('include/alert-box'); ?>
                <!-- Main content -->
                <section class="content">
                   <div class="row">

		<div class="col-md-12 col-md-pull1-3 col-sm-12">
		<div class="panel panel-default">
		<div class="panel-heading">
		<h3 class="panel-title"><i class="fa fa-list"></i> Product List</h3>
		</div>
		<div class="panel-body">
		<form action="" method="post" enctype="multipart/form-data" id="form-product">
		<div class="table-responsive">
		 <table id="category_view" class="table table-bordered table-striped">
		<thead>
		<tr>
		<!--<td style="width: 1px;" class="text-center"><input type="checkbox" onclick="$('input[name*=\'selected\']').prop('checked', this.checked);"></td>-->
		<td width="50px"><input type="checkbox" id="master"></td>
		<td class="text-center">S.No.</td>

		<td class="text-left"> <a href="https://demo.opencart.com/admin/index.php?route=catalog/product&amp;user_token=cW8i9YfDoyMdNBdc5Crdw2s7fsQBfarg&amp;sort=pd.name&amp;filter_status=1&amp;order=DESC" class="asc">Product Name</a> </td>
		<td class="text-center">Image</td>
		<!-- <td class="text-left"> <a href="#">Brand</a> </td> -->
		<!-- <td class="text-left"> <a href="#">Model</a> </td> -->
		<td class="text-right"> <a href="#">Price</a> </td>
		<td class="text-right"> <a href="#">Quantity</a> </td>
		<td class="text-left"> <a href="#">Status</a> </td>
		<td class="text-right">Action</td>
		</tr>
		</thead>
		<tbody>
		<?php
		//echo'<pre>';print_r($product_list);
		 if(!empty($product_list)){
		foreach($product_list as $key=>$product_lists){
		  //$image=Get_Productgallery_details(@$product_lists->id);
		 // $image_url=@$image[0]->image;
      $url=explode('?',@$product_lists->image1);
                              $comp_url1=$url[0].'?raw=1';
                              // $url2=explode('?',@$product_lists->image2);
                              // $comp_url2=$url2[0].'?raw=1';
                              // $url3=explode('?',@$product_lists->image1);
                              // $comp_url3=$url3[0].'?raw=1';
                              // $url4=explode('?',@$product_lists->image1);
                              // $comp_url4=$url4[0].'?raw=1';
		 ?>
		<tr>
		<td class="text-center"><!--<input type="checkbox" name="selected[]" value="42">-->
		<input type="checkbox" class="sub_chk" data-id="<?php echo $product_lists->id; ?>">
		</td>
		

		<td class="text-left"><?php echo $key+1;?></td>
		<td class="text-left"><?php echo @$product_lists->product_name;?></td>
		<td class="text-center"> <img src="<?php echo @$comp_url1; ?>" alt="Apple Cinema 30&quot;" style="
			height: 100px;
			width: 100px;
		" class="img-thumbnail"> </td>

		<!-- <td class="text-left"><?php echo @$product_lists->brand_name;?></td> -->
		<!-- <td class="text-left"><?php echo @$product_lists->model;?></td> -->
		<td class="text-right"> <!-- <span style="text-decoration: line-through;"><?php echo number_format(@$image[0]->price_mrp,2);?></span><br> -->
		<div class="text-danger"><?php echo number_format(@$product_lists->mrp_price,2);?></div> 
		</td>
		<td class="text-center"> <span class="label label-success"><?php echo @$product_lists->unit;?></span> </td>
		<td class="text-left">1<?php //echo @$product_lists->status;?></td>
		<td class="text-right">

			<a href="<?php echo base_url();?>Productmaster/addpromaster/<?php echo$product_lists->id; ?>" data-toggle="tooltip" title="" class="btn btn-primary" data-original-title="Edit"><i class="fa fa-pencil"></i></a>

		  <a onclick="deletes('tbl_products','id','<?php echo @$product_lists->id;?>','product-list')" data-toggle="tooltip" title="" class="btn btn-danger" aria-hidden="true"><i class="fa fa-trash-o"></i></a>
		  
			
		</td>
		</tr>
		<?php }}else{ echo"No Data Found !"; }?>


</tbody>
</table>
</div>
</form>
<div class="row">
<div class="col-sm-6 text-left"></div>
<div class="col-sm-6 text-right">Showing 1 to 19 of 19 (1 Pages)</div>
</div>
</div>
</div>
</div>
</div>
                    <!-- /.row -->
                </section>
                <!-- /.content -->
            </div>

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
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <?php ?>
      
        <!-- page script -->
        <script>
            $(function () {
                $("#category_view").DataTable({
                    "order": [[1, "desc"]]
                })
            });
       function deletes(table, field, delete_id, section)
            {
               
                    swal({
                         title: "Are you sure?",
                         text: "Do you really want to delete this record?",
                         icon: "warning",
                         buttons: true,
                         dangerMode: true,
                       })
                       .then((willDelete) => {
                         if (willDelete) {
                              swal("Your record has been successfully deleted!", {
                              icon: "success",
                           });
                          window.location.href ='<?php echo base_url();?>/Productmaster/deletes1/' + table + '/' + field + '/' + delete_id + '/' + section;
                         } else {
                             return false;
                         }
                       });
                
            }
</script>
<style type="text/css">
    #category_view_filter{
        float: right !important;
    }
</style>
    </body>
</html>
<script type="text/javascript">
    $(document).ready(function () {
 
        $('#master').on('click', function(e) {
         if($(this).is(':checked',true))  
         {
            $(".sub_chk").prop('checked', true);  
         } else {  
            $(".sub_chk").prop('checked',false);  
         }  
        });
 
        $('.delete_all').on('click', function(e) {
 
            var allVals = [];  
            $(".sub_chk:checked").each(function() {  
                allVals.push($(this).attr('data-id'));
            });  
 
            if(allVals.length <=0)  
            {  
                alert("Please select row.");  
            }  else {  
 
                var check = confirm("Are you sure you want to delete this row?"); 
				
                if(check == true){  
 
                    var join_selected_values = allVals.join(","); 
 
                    $.ajax({
                        url: $(this).data('url'),
                        type: 'POST',
                        data: 'ids='+join_selected_values,
                        success: function (data) {
                          console.log(data);
                          $(".sub_chk:checked").each(function() {  
                              $(this).parents("tr").remove();
                          });
                         // alert("Records Deleted successfully.");
                        },
                        error: function (data) {
                            //alert(data.responseText);
						$(".msg_del").html(data.responseText);
                        }
                    });
 
                  $.each(allVals, function( index, value ) {
                      $('table tr').filter("[data-row-id='" + value + "']").remove();
                  });
                }  
            }  
        });
    });
</script>
	<script type="text/javascript"> 
        $(document).ready(function () { 
            $(".btn-default").click(function () { 
                location.reload(true); 
                //alert('Reloading Page'); 
            }); 
        }); 
    </script>