// owlCarousel js
$(document).ready(function() {
    $('#main-slider').owlCarousel({
        loop:true,
        autoplay: true,
        autoplayTimeout: 8000,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:1,
                nav:false
            },
            1000:{
                items:1,
                nav:true,
                loop:true
            }
        }
    }),
    $('#our-brands-slider').owlCarousel({
        loop:true,
        autoplay: true,
        autoplayTimeout: 8000,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:2,
                nav:false
            },
            1000:{
                items:4,
                nav:true,
                loop:true
            }
        }
    });
});

// to top btn js
var toTopBtn = $('#to-top-btn');
$(window).scroll(function() {
  if ($(window).scrollTop() > 100) {
    toTopBtn.addClass('show');
  } else {
    toTopBtn.removeClass('show');
  }
});
toTopBtn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

// brand toggle js
$(document).ready(function(){
    $(".brand-toggle").click(function(){
        $(".brand-list").slideToggle();
    });
});

// Account tabs js
$(document).ready(function(){
    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $('#'+tab_id).addClass('current');
    });
});

//toggle password js
$(".toggle-password").click(function() {
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

// quantity js
function wcqib_refresh_quantity_increments() {
    jQuery("div.quantity:not(.buttons-added), td.quantity:not(.buttons-added)").each(function(a, b) {
        var c = jQuery(b);
        c.addClass("buttons-added"), c.children().first().before('<input type="button" value="-" class="minus" />'), c.children().last().after('<input type="button" value="+" class="plus" />')
    })
}
String.prototype.getDecimals || (String.prototype.getDecimals = function() {
    var a = this,
        b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0
}), jQuery(document).ready(function() {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("updated_wc_div", function() {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("click", ".plus, .minus", function() {
    var a = jQuery(this).closest(".quantity").find(".qty"),
        b = parseFloat(a.val()),
        c = parseFloat(a.attr("max")),
        d = parseFloat(a.attr("min")),
        e = a.attr("step");
    b && "" !== b && "NaN" !== b || (b = 0), "" !== c && "NaN" !== c || (c = ""), "" !== d && "NaN" !== d || (d = 0), "any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e) || (e = 1), jQuery(this).is(".plus") ? c && b >= c ? a.val(c) : a.val((b + parseFloat(e)).toFixed(e.getDecimals())) : d && b <= d ? a.val(d) : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())), a.trigger("change")
});

// cart list product js
$(document).ready(function(){
    $('.product-remove').click(function(){
        $(this).parent('.cart-list-product').remove();
    });
});

$(document).ready(function(){
    $('.product-block .cart-counter .add-cart').click(function(){
        $(this).hide();
    });
});

// megamenu js
$(document).ready(function(){
    $('.megamenu-toggle').click(function(){
        $('.megamenu').slideToggle();
    });
    $('.megamenu .menu-item.chevron').click(function(){
        $(this).toggleClass('chevron-change');
        $(this).children('.megamenu-inner-wrapper').slideToggle();
    });
    $('.megamenu .menu-child-item.chevron-sub').click(function(){
        $(this).toggleClass('chevron-sub-change');
        $(this).children('.megamenu-subchild-wrapper').slideToggle();
    });
});

// category toggle js
$(window).resize(function(){
    if ($(window).width() <= 767){  
        $(document).ready(function(){
            $('.shop-by-category-toggle').click(function(event){
                event.preventDefault();
                $('.shop-by-category ul').slideToggle();
            });
        });
    }
});

$(document).ready(function(){
    $(document).ready(function(){
      $("#subcribe-popup").modal('show');
    });
});

// category list filter js
const input1 = document.getElementById("input-category");
const elementsList1 = document.getElementById("category-filter-list");
let elementsListItems1 = elementsList1.getElementsByClassName("category-items");
const filter1 = () => {
let filterValue1 = input1.value.toUpperCase();
for (let i = 0; i < elementsListItems1.length; i++) {
  if(elementsListItems1[i].innerHTML.toUpperCase().indexOf(filterValue1) !== -1){
    elementsListItems1[i].style.display = "";
  }else{
    elementsListItems1[i].style.display = "none";
  }
}
};
input1.addEventListener("input", (event) => {
filter1();
});

// $(document).ready(function(){
//     $('.livesearch').on("click", "li", function() {
//         $("#input-category").val($(this).text());
//         $(".livesearch li").css("display", "none");
//       });
// });

$(document).ready(function(){
    $('#category-filter-list .sub-category').parent().addClass('sub-category-toggle');
    $('.sub-category-toggle').click(function(){
        $(this).children('.sub-category').slideToggle();
        $(this).toggleClass('reverse');
    });
});

//brand list filter js
const input = document.getElementById("input-brand");
const elementsList = document.getElementById("brand-filter-list");
let elementsListItems = elementsList.getElementsByTagName("li");
const filter = () => {
let filterValue = input.value.toUpperCase();
for (let i = 0; i < elementsListItems.length; i++) {
  if(elementsListItems[i].innerHTML.toUpperCase().indexOf(filterValue) !== -1){
    elementsListItems[i].style.display = "";
  }else{
    elementsListItems[i].style.display = "none";
  }
}
};
input.addEventListener("input", (event) => {
filter();
});

$(document).ready(function(){
    $('.brandsearch').on("click", "li", function() {
        $("#input-brand").val($(this).text());
        $(".brandsearch li").css("display", "none");
      });
});  