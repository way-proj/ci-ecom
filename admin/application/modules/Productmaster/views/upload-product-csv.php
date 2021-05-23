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
            <form action="<?php echo base_url();?>/Productmaster/save_upload_product_data" class="form-horizontal" method="post" enctype="multipart/form-data" id="validate">
              <input type="hidden" name="eid" value="<?php echo @$this->uri->segment(3);?>">
              <input type="hidden" id="attr_ids" value="<?php echo @$attr_id;?>">
    <ul class="nav nav-tabs nav-justified nav-inline">
    <li><a href="#Links" data-toggle="tab">Product upload by csv file</a></li>
    </ul>
		<div class="tab-content tab-validate" style="margin-top:20px;">
		     <div class="tab-pane active" id="Links">
				<!-- <div class="form-group">
                <label class="col-sm-2 control-label" for="input-subtract"> Brand</label>
					<div class="col-sm-10">
					<select name="brandname" id="brandname" onchange="get_brand_id(this.value)" class="form-control">
					  <option value="">--Select Brand--</option>
					  <?php foreach($brand_data as $key=>$value) {?>
					 <option value="<?php echo $value->id; ?>"<?php if(in_array($value->id,$brand_array)){ echo 'selected="selected"';}?>><?php echo $value->brand_name; ?></option>
					  <?php } ?>
					</select>
					</div>
                </div>  -->

			<!--  <div class="form-group">
                <label class="col-sm-2 control-label" for="input-subtract">Category<span style="color:red">*</span></label>
                <div class="col-sm-10">
                <select required=""  onchange="get_cat_id(this.value)" name="cat_id" id="cat_id" class="form-control">
                <option value="<?php echo @$single_pro_data->sub_child_category_name;?>">Select Category</option>
                   <?php 

                   foreach ($cat_data as $value) {?>
                    <option value="<?php echo $value->id;?>"<?php if(in_array($value->id,$cat_array)){ echo 'selected="selected"';}?> ><?php echo @$value->category_name;?></option>
                   <?php } ?>
                 </select>

                </div>
                </div> -->
				
				
               <!--  <div class="form-group" id="load_div">
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
                </div>  -->
             
              <!--  <div class="form-group" id="onchange_div">
                <label class="col-sm-2 control-label" for="input-subtract">Sub Category</label>
                <div class="col-sm-10">
                <select  id="sub_cat_id" onchange="get_cat_child_id(this.value)" name="subcat_id" id="input-store" class="form-control">
                 </select>
                </div>
                </div> -->
                

             <!--  <div class="form-group" id="load_div2">
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
                </div> -->

              <!--  <div class="form-group" id="onchange_div2">
                <label class="col-sm-2 control-label" for="input-subtract">Sub Child Category</label>
                <div class="col-sm-10">
                <select  id="sub_cat_child_ids" name="sub_cat_child_id"  class="form-control">
                 </select>
                </div>
                </div>  -->
			</div>
      
              <div class="form-group">
                <label class="col-sm-2 control-label" for="input-subtract"> Upload Csv File</label>
					<div class="col-sm-10">
					 <input type="file" class="form-control file" name="import_db" id="import_db" required="">
					</div>
                </div> 
 
</td>
</tr>
</tbody>
</table>
</div>    
<div class="form-group col-md-2 pull-right">
 <button type="submit" id="submit" class="btn btn-success btn-block">Upload</button>
  </div>
</form>
</div>
</div>

</div>
<script type="text/javascript">

function remove_variant(attr_id,pid){
    
    if(attr_id!=''){
       var attid=attr_id;
       $.ajax({
            url:"<?php echo base_url();?>"+'Productmaster/delete_variant',
            type:"POST",
            data:{attid:attid},
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
 <script type="text/javascript">
$(document).ready(function () {
   var MaxInputsAudio = 15; //maximum input boxes allowed

    var InputsWrapper = $("#AudioWrapper4 input"); //Input boxes wrapper ID

    var AddButton = "#AddMoreAudio4"; //Add button ID

    var x = InputsWrapper.length; //initlal text box count

    var FieldCount = 1; //to keep track of text box added

     var cntt=2;

    $(AddButton).click(function (e) //on add input button click
     {

        e.preventDefault();

        InputsWrapper = $("#AudioWrapper4 input");

        x = InputsWrapper.length;

        console.log(x + '  ' + MaxInputsAudio);

        if (x < MaxInputsAudio) //max input box allowed
         {

            FieldCount++; //text box added increment
            
            //add input box

            $(InputsWrapper).parents('#AudioWrapper4').append('<div class="AudioRemove4"><input id="audio4" onchange="loadFile'+cntt+'(event)" class="boxdd" type="file" name="photo[]"/><div style="float:right"><a href="#" class="removeclassAudio4 icon-minus dett_n alerts-color">delete</a></div><div class="col-md-9"><img width="30%" style="float:right" id="output'+cntt+'"/></div>');

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
$(document).ready(function () {

   var MaxInputsAudio = 80; //maximum input boxes allowed

    var InputsWrapper = $("#AudioWrapper5 input"); //Input boxes wrapper ID

    var AddButton = "#AddMoreAudio5"; //Add button ID

    var x = InputsWrapper.length; //initlal text box count

    var FieldCount = 1; //to keep track of text box added

     var cnt=1;

    $(AddButton).click(function (e) //on add input button click
     {
        e.preventDefault();
        
        InputsWrapper = $("#AudioWrapper5 input");

        x = InputsWrapper.length;
      
        console.log(x + '  ' + MaxInputsAudio);

        if (x < MaxInputsAudio) //max input box allowed
           {
            // $.ajax({
            //         url:"",
            //         type:"POST",
            //         data:{cat_id:5},

            // })
            FieldCount++; //text box added increment
            //add input box
           $(InputsWrapper).parents('#AudioWrapper5').append('<tr class="AudioRemove4"><td><input style="width: 100%" type="text" onclick="check_duplicate('+cnt+',this.value)" onkeyup="check_duplicate('+cnt+',this.value)" name="barcode[]"><br><span id="dup_error_'+cnt+'"></span></td> <td><input style="width: 100%" type="text" onclick="check_item_duplicate('+cnt+',this.value)" onkeyup="check_item_duplicate('+cnt+',this.value)" name="itemcode[]"><span id="item_dup_error_'+cnt+'"></span></td><td><input style="width: 100%" type="text" name="color[]"></td><td><input style="width: 100%" type="text" name="size[]"></td><td><input style="width: 100%" type="text" name="storage[]"></td><td><input style="width: 100%" type="text" name="memory[]"></td><td><input style="width: 100%" type="text" name="style[]"></td><td><input style="width:100%" placeholder="" type="text" name="style_extra1[]"></td><td><input style="width:80px" placeholder="" type="text" name="style_extra2[]"></td><td><input style="width:100%" placeholder="" type="text" name="style_extra3[]"></td><td><input style="width: 100%" type="text" name="stock[]"></td><td><input style="width: 100%" type="text" name="qty[]"></td><input style="width: 100%" type="text" name="shape[]"></td><input style="width: 100%" type="text" name="material[]"></td><input style="width: 100%" type="text" name="pcs[]"></td><td><table><tbody><tr><td><input style="width:100px" placeholder="MRP" id="mrp_price_'+cnt+'" type="text" onclick="get_margin(0)" onkeyup="get_margin('+cnt+')" name="price_'+cnt+'[]"></td><td><input id="sp_price_'+cnt+'" onclick="get_margin('+cnt+')" onkeyup="get_margin('+cnt+')" style="width:80px" placeholder="SP" type="text" name="price_'+cnt+'[]"></td><td><input id="margin_price_'+cnt+'" style="width:100%" placeholder="Margin%" type="text" name="price_'+cnt+'[]"></td></tr></tbody></table></td><td><table><tr><td><input id="audio4"  class="boxdd" onchange="loadFile1(event)" type="file" name="photo_'+cnt+'[]" placeholder=""></td><td><input id="audio4"  class="boxdd" onchange="loadFile1(event)" type="file" name="photo_'+cnt+'[]" placeholder=""></td><td><input id="audio4"  class="boxdd" onchange="loadFile1(event)" type="file" name="photo_'+cnt+'[]" placeholder=""></td><td><input id="audio4"  class="boxdd" onchange="loadFile1(event)" type="file" name="photo_'+cnt+'[]" placeholder=""></td></tr></table><a style="float:right;color:red" href="#" class="removeclassAudio4 icon-minus dett_n alerts-color">X</a></td></tr><br>');

            x++; //text box increment
           cnt++;
        }

        return false;

    });



    $("body").on("click", ".removeclassAudio4", function (e) { //user click on remove text
            
       console.log(x);

        if (x > 1) {

            $(this).parents('.AudioRemove4').remove(); //remove text box
            cnt--;
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


<script type="text/javascript">
 $(document).ready(function () {
   var MaxInputsAudio = 15; //maximum input boxes allowed

    var InputsWrapper = $("#AudioWrapper4 input"); //Input boxes wrapper ID

    var AddButton = "#AddMoreAudio4"; //Add button ID

    var x = InputsWrapper.length; //initlal text box count

    var FieldCount = 1; //to keep track of text box added

     var cntt=2;

    $(AddButton).click(function (e) //on add input button click
     {

        e.preventDefault();

        InputsWrapper = $("#AudioWrapper4 input");

        x = InputsWrapper.length;

        console.log(x + '  ' + MaxInputsAudio);

        if (x < MaxInputsAudio) //max input box allowed
         {

            FieldCount++; //text box added increment
            
            //add input box

            $(InputsWrapper).parents('#AudioWrapper4').append('<div class="AudioRemove4"><input id="audio4" onchange="loadFile'+cntt+'(event)" class="boxdd" type="file" name="photo[]"/><div style="float:right"><a href="#" class="removeclassAudio4 icon-minus dett_n alerts-color">delete</a></div><div class="col-md-9"><img width="10%" style="float:right" id="output'+cntt+'"/></div>');

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

