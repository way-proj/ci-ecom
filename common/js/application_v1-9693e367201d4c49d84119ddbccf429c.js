function generateSecurityCoupon() {
    $(".generate_security_coupon").click(function() {
        $.getScript("/generate_security_coupon")
    })
}

function selectaddressCheckout() {
    $(".select-address-checkout").click(function() {
        var t = $(".selected_addr:checked").val();
        t.length > 0 ? ($(".addrerror").text(""), OpenLoader(), $.getScript("/continue-payment/" + t)) : $(".addrerror").text("Select Address")
    })
}

function stateCityFromPincode() {
    $("#order_address_s_pincode").focusout(function() {
        6 == $(this).val().length ? $(".pincode.message").hide() : $(".pincode.message").show()
    }), $("#order_address_s_pincode").keyup(function() {
        var t = $(this).val();
        6 == t.length ? ($(".pincode.message").hide(), $(".state.message").show(), $.getScript("/state-city-from-pincode/" + t + "?addr=shippping")) : $(".state.message").hide()
    }), $("#order_address_b_pincode").focusout(function() {
        6 == $(this).val().length ? $(".b_pincode.message").hide() : $(".b_pincode.message").show()
    }), $("#order_address_b_pincode").keyup(function() {
        var t = $(this).val();
        6 == t.length ? ($(".b_pincode.message").hide(), $(".b_state.message").show(), $.getScript("/state-city-from-pincode/" + t + "?addr=billing")) : $(".b_state.message").hide()
    })
}

function OpenLoader() {
    $(".sucess-loader-overlay, #loader, .overlay").show()
}

function SETshippingcharge() {
    $('.payment-option-list input[type="radio"]').click(function() {
        var t = $(this).val();
        $(".sucess-loader-overlay, #loader, .overlay").show(), $.getScript("/v1/set-shipping-charge?paymentoption=" + t)
    })
}

function OTPJs() {
    $('input[type="radio"]').on("click", function() {
        if ("cod" == $(this).val()) {
            $(".otp-varifed-cod").hasClass("active") ? $(".make_payment").show() : $(".make_payment").hide(), $(".make_payment").text("Place Order");
            var t = $(".ord_add_s_mobile").val();
            $(".confirm-box").show(), $(".promo-code-box.confirm-box .show-popup").click(), $(".cod-mobile-num").text(t), $(".order-review-step").attr("style", "padding-bottom: 150px;")
        } else $(".make_payment").show(), $(".make_payment").text("Make Payment"), $(".order-review-step").attr("style", "padding-bottom: 0px;"), $(".confirm-box").hide()
    }), $(".cod-otp-send").click(function() {
        var t = $(".confirm-para").attr("for");
        t.length > 0 ? ($(".sucess-loader-overlay, .sucess-loader").show(), $.getScript("/send-otp-pincode?mobile=" + t)) : $(".code-error.mob").text("enter mobile number.")
    }), $(".opt-input.cod-otp-val").focusout(function() {
        var t = $(".opt-input.cod-otp-val").val();
        t.length < 4 || t.length > 4 ? ($(".code-error.mob").text("Enter correct OTP."), $(".cod-otp-varify").attr("style", "cursor: not-allowed;")) : ($(".code-error.mob").text(""), $(".cod-otp-varify").attr("style", "cursor: ;"))
    }), $(".opt-input.cod-otp-val").keyup(function() {
        var t = $(".opt-input.cod-otp-val").val();
        t.length < 4 || t.length > 4 ? ($(".code-error.mob").text("Enter correct OTP."), $(".cod-otp-varify").attr("style", "cursor: not-allowed;")) : ($(".code-error.mob").text(""), $(".cod-otp-varify").attr("style", "cursor: ;"))
    }), $(".cod-otp-varify").click(function() {
        var t = $(".opt-input.cod-otp-val").val(),
            e = $(".confirm-para").attr("for");
        $("#set_otp_val").val(t), t.length > 0 && e > 0 ? ($(".sucess-loader-overlay, .sucess-loader").show(), $.getScript("/varify-otp?otp=" + t + "&mobile=" + e)) : $(".code-error.mob").text("Enter OTP.")
    })
}

function mainWrapPadding() {
    $("#main-wrapper").css("padding-top", headerH - 2), winW < 786 && $("#main-wrapper").css("padding-top", mHeaderH - 1), $(".free-ship-oi.desk-hide").css("top", mHeaderH)
}

function bannerSlider() {
    banner = $(".banner-slider"), banner.owlCarousel({
        items: 1,
        dots: !0,
        smartSpeed: 1e3,
        loop: !0,
        autoplay: !0,
        nav: !0
    })
}

function innerBannerSlider() {
    $(".inner-banner-slider, .accolade-slider,.lb-slider").owlCarousel({
        items: 1,
        smartSpeed: 1e3,
        loop: !0,
        responsive: {
            0: {
                dots: !1,
                nav: !0
            },
            768: {
                dots: !1,
                nav: !0
            }
        }
    })
}

function celebrationSider() {
    $(".celebration-slider").owlCarousel({
        items: 1,
        dots: !0,
        smartSpeed: 1e3,
        loop: !0
    })
}

function productSider() {
    $(".product-slider").owlCarousel({
        dots: !1,
        nav: !0,
        smartSpeed: 1e3,
        loop: !0,
        margin: 10,
        responsive: {
            0: {
                items: 3
            },
            768: {
                items: 4
            },
            1024: {
                items: 5
            }
        }
    })
}

function tabList() {
    $(document).on("click", ".tab-list li", function() {
        var t = $(this).attr("data-tab");
        $("#" + t).siblings().removeClass("active"), $(this).parent().find("li").removeClass("active"), $("#" + t).addClass("active"), $(this).addClass("active")
    })
}

function searchLogic() {
    function t(t) {
        return t.split(/,\s*/)
    }

    function e(e) {
        return t(e).pop()
    }
    $(".header_search_new").on("keydown", function(t) {
        t.keyCode === $.ui.keyCode.TAB && $(this).autocomplete("instance").menu.active && t.preventDefault()
    }).on("keydown", function(t) {
        t.keyCode !== $.ui.keyCode.ENTER || $(this).autocomplete("instance").menu.active || (t.preventDefault(), $(".search_me_submit").trigger("click"))
    }).autocomplete({
        minLength: 1,
        source: function(t, i) {
            $.getJSON("/search_parent_cat", {
                term: e(t.term),
                q: $(".search_parent_cat option:selected").val()
            }, i)
        },
        search: function() {
            var t = e(this.value);
            if (console.log(t.length + " Length"), console.log(t), t.length < 2) return !1
        },
        focus: function() {
            return !1
        },
        select: function(e, i) {
            var n = t(this.value);
            return n.pop(), n.push(i.item.value), n.push(""), this.value = n.join(", "), !1
        }
    }), $(".search_parent_cat").next().hasClass("select2") && $(".search_parent_cat").select2("destroy")
}

function diariesSider() {
    $(".blog-slider").owlCarousel({
        items: 3,
        dots: !1,
        nav: !0,
        smartSpeed: 1e3,
        loop: !0,
        margin: 24
    })
}

function familySider() {
    $(".family-collection-slider").owlCarousel({
        items: 1,
        dots: !1,
        nav: !1,
        smartSpeed: 1e3,
        mouseDrag: !1,
        touchDrag: !1,
        responsive: {
            0: {
                stagePadding: 30,
                margin: 30
            },
            1024: {
                stagePadding: 100,
                margin: 70
            },
            1280: {
                stagePadding: 130,
                margin: 100
            }
        }
    }), $(".family-slider-tab li").click(function() {
        $(".family-slider-tab li").removeClass("active"), $(this).addClass("active")
    }), $(".indo-western").on("click", function() {
        $(".family-collection-slider").trigger("to.owl.carousel", [0, 1e3, !0])
    }), $(".couple").on("click", function() {
        $(".family-collection-slider").trigger("to.owl.carousel", [1, 1e3, !0])
    }), $(".taiyaarhokaraaiye").on("click", function() {
        $(".family-collection-slider").trigger("to.owl.carousel", [1, 1e3, !0])
    }), $(".father-son").on("click", function() {
        $(".family-collection-slider").trigger("to.owl.carousel", [2, 1e3, !0])
    }), $(".mother-son").on("click", function() {
        $(".family-collection-slider").trigger("to.owl.carousel", [3, 1e3, !0])
    }), $(".family-collection-slider .owl-next").click(function() {
        $(".family-slider-tab li.active").next().addClass("active"), $(".family-slider-tab li.active").prev().removeClass("active")
    }), $(".family-collection-slider .owl-prev").click(function() {
        $(".family-slider-tab li.active").prev().addClass("active"), $(".family-slider-tab li.active").next().removeClass("active")
    })
}

function storySider() {
    $(".story-slider").owlCarousel({
        autoplay: !0,
        dots: !0,
        nav: !1,
        smartSpeed: 1e3,
        loop: !0,
        margin: 10,
        mouseDrag: !1,
        touchDrag: !1,
        responsive: {
            0: {
                items: 1,
                center: !1,
                stagePadding: 0
            },
            980: {
                items: 2,
                center: !0,
                stagePadding: 10
            }
        }
    })
}

function instaSider() {
    $(".insta-slider").owlCarousel({
        items: 5,
        dots: !0,
        nav: !1,
        smartSpeed: 1e3,
        loop: !0
    })
}

function mCustomScroll() {
    $(".vertical-scroll, .year-list").mCustomScrollbar()
}

function showPopup() {
    $(document).on("click", ".show-popup", function() {
        var t = $(this).attr("data-show");
        $("#" + t).show(), $(".overlay").toggle()
    }), $(".search-icon").click(function() {
        var t = $(this).attr("data-show");
        $("#" + t).toggle(), $(".overlay").toggle()
    }), $(document).on("click", ".overlay", function() {
        $(".mob-search-box").hide()
    })
}

function closePopup() {
    $(document).on("click", ".close-popup, .close-cart", function() {
        $(this).parent().hide(), $(".hidden-overlay, .overlay").hide(), $("body, html").css({
            overflow: "auto"
        })
    })
}

function hiddenOverlay() {
    $(document).on("click", ".hidden-overlay", function() {
        $(".popup-box").hide(), $(this).hide()
    })
}

function headerScroll() {
    $(window).scroll(function() {
        $(this).scrollTop() > 100 ? ($("#header").addClass("active"), $(".m-logo-icon, .mohey-logo-icon, .show-add-cart, .manyaver-logo").addClass("active"), $(".sub-menu").addClass("active")) : ($("#header").removeClass("active"), $(".m-logo-icon, .mohey-logo-icon, .show-add-cart, .manyaver-logo").removeClass("active"), $(".sub-menu").removeClass("active"))
    })
}

function halfSider() {
    $(".half-slider").owlCarousel({
        items: 1,
        dots: !1,
        nav: !1,
        smartSpeed: 1e3,
        loop: !0,
        margin: 10,
        stagePadding: 50
    })
}

function menSider() {
    $(".mob-men-slider").owlCarousel({
        items: 1,
        dots: !0,
        nav: !1,
        smartSpeed: 1e3,
        loop: !0
    })
}

function oneThirdSider() {
    $(".kids-mob-slider, .mob-family-slider").owlCarousel({
        items: 1,
        dots: !1,
        nav: !1,
        smartSpeed: 1e3,
        loop: !0,
        stagePadding: 30,
        responsive: {
            0: {
                margin: 15
            },
            480: {
                margin: 30
            }
        }
    })
}

function trendySider() {
    $(".mob-trendy-slider").owlCarousel({
        items: 2,
        dots: !1,
        nav: !1,
        smartSpeed: 1e3,
        loop: !0,
        margin: 10,
        stagePadding: 10
    })
}

function accessSider() {
    $(".mob-access-slider").owlCarousel({
        items: 3,
        dots: !1,
        nav: !1,
        smartSpeed: 1e3,
        loop: !0,
        responsive: {
            0: {
                margin: 10
            },
            480: {
                margin: 15
            }
        }
    })
}

function showList() {
    $(".show-list").click(function() {
        $(this).toggleClass("hide-list"), $(this).prev().find(".sort-product-list").toggle()
    }), $(".open-filter").click(function() {
        $(this).toggleClass("active"), $(this).next().toggle()
    })
}

function sortProduct() {
    $(".sort-product-list li").click(function() {
        var t = $(this).text();
        $(".sorted-cat").html(t), $(this).parent().hide(), $(".show-list").removeClass("hide-list")
    })
}

function openFilterBox() {
    $(".filter-box .heading03").click(function() {
        $(".filter-list").slideUp(), $(".filter-box .heading03").find(".show-filter").removeClass("hide-filter"), $(this).next(".filter-list").is(":hidden") && ($(this).next(".filter-list").slideDown(), $(this).find(".show-filter").addClass("hide-filter"))
    })
}

function openMobileFilter() {
    $(".show-mob-sort").click(function() {
        $(".mobile-sort-box").addClass("active"), $(".overlay").fadeIn()
    }), $(".overlay").click(function() {
        $(".mobile-sort-box").removeClass("active"), $(this).fadeOut()
    }), $(".show-mob-filter").click(function() {
        $(".listing-filter, #product-listing-wrapper").addClass("active")
    }), $(".close-filter").click(function() {
        $(".listing-filter").removeClass("active"), setTimeout(function() {
            $("#product-listing-wrapper").removeClass("active")
        }, 500)
    }), $(".mobile-sort-box .mob-product-list li").click(function() {
        $(".mobile-sort-box .mob-product-list li").removeClass("active"), $(this).addClass("active"), $(".mobile-sort-box").removeClass("active"), $(".overlay").fadeOut()
    })
}

function priceRangeSlider() {
    $(".price-range-slider").slider({
        range: !0,
        min: 999,
        max: 1e5,
        values: [999, 1e5],
        slide: function(t, e) {
            $("#price-range").html("<span class='price-range-text fl'> <i class='fa fa-inr'></i>" + e.values[0] + " </span><span class='price-range-text fr'> <i class='fa fa-inr'></i>" + e.values[1] + "</span>")
        }
    }), $("#price-range").html("<span class='price-range-text fl'><i class='fa fa-inr'></i>" + $(".price-range-slider").slider("values", 0) + "</span><span class='price-range-text fr'> <i class='fa fa-inr'></i>" + $(".price-range-slider").slider("values", 1) + "</span>")
}

function detailThumb() {
    $(".thumb-img-box").click(function() {
        $(".thumb-img-box").removeClass("active");
        var t = $(this).children(".thumb-img").attr("src");
        $(".product-big-img .big-img").attr("src", t), $(this).addClass("active")
    })
}

function colorImgslider() {
    $(".color-img-slider").owlCarousel({
        items: 3,
        dots: !1,
        nav: !0,
        smartSpeed: 1e3,
        loop: !0,
        margin: 10,
        singleItem: !0
    })
}

function showToggleBox() {
    $(".show-toggle-box").click(function() {
        $(".show-toggle").html("+"), $(".toggle-show").slideUp(), $(this).next(".toggle-show").slideDown(), $(this).find(".show-toggle").html("-")
    })
}

function fancyBox() {
    $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    })
}

function inputFocus() {
    $(".input-box input, .input-box textarea").blur(function() {
        "" == $(this).val() ? ($(this).parent(".input-box").removeClass("active"), $(this).parent().next("label").removeClass("active")) : ($(this).parent(".input-box").addClass("active"), $(this).parent().next("label").addClass("active"))
    }), $("input, textarea").focusin(function() {
        $(this).parent(".input-box").addClass("active"), $(this).parent().next("label").addClass("active")
    }), $("input, textarea").focusout(function() {
        $(this).parent(".input-box").removeClass("active"), $(this).parent().next("label").removeClass("active")
    }), $(".input-box select").on("change", function() {
        "" == $(this).val() ? ($(this).parent().parent(".input-box").removeClass("active"), $(this).parent().parent().next("label").removeClass("active")) : ($(this).parent().parent(".input-box").addClass("active"), $(this).parent().parent().next("label").addClass("active"))
    })
}

function selectAddress() {
    $(".address-heading .custom-radio input[type='radio']").click(function() {
        $(".address-box-wrapper .address-box").removeClass("active"), $(this).parent().parent().parent(".address-box").addClass("active")
    })
}

function orderAccordian() {
    $(".my-order-header").click(function() {
        $(".myorder-detail-box").slideUp(), $(".wish-arrow").removeClass("active"), $(this).next(".my-order-detail").find(".myorder-detail-box").is(":hidden") && ($(this).next(".my-order-detail").find(".myorder-detail-box").slideDown(), $(this).find(".wish-arrow").addClass("active"))
    })
}

function optGenerate() {
    $(".generate-opt").click(function() {
        $(".otp-hide-box").show()
    })
}

function checkoutProcess() {
    $(document).on("click", ".checkout-header", function() {
        $(".close-address").click(), $(".process-box").slideUp(), $(this).next(".process-box").slideDown()
    })
}

function mobOrderSummary() {
    $(".mob-order-summary").click(function() {
        $(this).hasClass("active") ? ($(".order-summary-right").removeClass("active"), $("#mob-header").css("z-index", "99999"), $(this).removeClass("active")) : ($(".order-summary-right").addClass("active"), $("#mob-header").css("z-index", "9"), $(this).addClass("active"))
    })
}

function showAddressBox() {
    $(".show-address-box").click(function() {
        $(".add-addres-box").addClass("active"), $(".mob-order-summary").addClass("hide"), $("#mob-header").css("z-index", "9")
    }), $(".close-address").click(function() {
        $(".add-addres-box").removeClass("active"), $(".mob-order-summary").removeClass("hide"), $("#mob-header").css("z-index", "99999")
    })
}

function orderSummarySticky() {
    SummaryTopPos = $(".checkout-wrapper").offset().top, $(window).scroll(function() {
        $(window).scrollTop() > SummaryTopPos - 50 ? $(".cart-right").addClass("active") : $(".cart-right").removeClass("active")
    })
}

function faqAccordian() {
    $(document).on("click", ".faq-box .faq-question", function() {
        $(this).toggleClass("active"), $(this).next(".faq-answer").slideToggle(), $(this).parent(".faq-box").siblings(".faq-box").find(".faq-question").removeClass("active"), $(this).parent(".faq-box").siblings(".faq-box").find(".faq-answer").slideUp()
    })
}

function lookSlider() {
    $(".complete-look-slider").owlCarousel({
        dots: !1,
        nav: !1,
        smartSpeed: 1e3,
        responsive: {
            0: {
                items: 1,
                stagePadding: 50,
                mouseDrag: !0,
                touchDrag: !0,
                center: !0
            },
            480: {
                items: 2,
                stagePadding: 30,
                mouseDrag: !0,
                touchDrag: !0
            },
            768: {
                items: 4,
                mouseDrag: !1,
                touchDrag: !1
            }
        }
    })
}

function similarProductSider() {
    $(".similar-product-slider").owlCarousel({
        dots: !1,
        nav: !0,
        smartSpeed: 1e3,
        margin: 10,
        responsive: {
            0: {
                items: 2,
                stagePadding: 10,
                dots: !1,
                nav: !1,
                margin: 0
            },
            980: {
                items: 5
            }
        }
    })
}

function productDltSider() {
    $(".prod-dlt-slider").owlCarousel({
        thumbs: !0,
        thumbsPrerendered: !0,
        dots: !1,
        mouseDrag: !1,
        TouchDrag: !1,
        responsive: {
            0: {
                items: 1,
                nav: !0,
                loop: !0
            },
            980: {
                items: 1,
                nav: !1
            }
        }
    })
}

function curatedSlider() {
    $(".curated-slider").owlCarousel({
        dots: !1,
        nav: !1,
        smartSpeed: 1e3,
        loop: !1,
        mouseDrag: !1,
        touchDrag: !1,
        responsive: {
            0: {
                items: 1,
                stagePadding: 50,
                mouseDrag: !0,
                touchDrag: !0,
                margin: 10
            },
            640: {
                items: 1,
                stagePadding: 100,
                margin: 10,
                mouseDrag: !0,
                touchDrag: !0
            },
            768: {
                items: 4,
                margin: 10
            },
            1024: {
                items: 4,
                margin: 30
            },
            1280: {
                items: 4,
                margin: 50
            }
        }
    })
}

function moheyBridalSlider() {
    $(".mohey-bridal-slider").owlCarousel({
        dots: !1,
        nav: !0,
        smartSpeed: 1e3,
        loop: !0,
        responsive: {
            0: {
                items: 1,
                margin: 0
            },
            768: {
                items: 2,
                margin: 100,
                mouseDrag: !1,
                touchDrag: !1,
                nav: !1
            }
        }
    })
}

function moheyVideoSlider() {
    $(".mohey-video-slider").owlCarousel({
        dots: !1,
        nav: !0,
        smartSpeed: 1e3,
        loop: !0,
        center: !0,
        margin: 1,
        responsive: {
            0: {
                items: 1.2
            },
            480: {
                items: 1.8
            }
        }
    })
}

function fancyVideoPopup() {
    $(".video-popup").fancybox({
        openEffect: "none",
        closeEffect: "none",
        helpers: {
            media: {}
        }
    })
}

function uploadBtn() {
    $(".custom-upload").change(function() {
        var t = $(this).find("input")[0].files[0].name;
        $(this).find(".selct-file").text(t)
    })
}

function blouseSlider() {
    $(".blouse-desing-slider").owlCarousel({
        items: 4,
        dots: !1,
        nav: !0,
        smartSpeed: 1e3,
        loop: !0,
        margin: 20,
        mouseDrag: !1,
        responsive: {
            0: {
                items: 2,
                stagePadding: 20,
                nav: !1,
                margin: 10
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            },
            1280: {
                items: 4
            }
        }
    })
}

function bPopup() {
    $(".info-icon-box").hover(function() {
        $(this).find(".b-popup").fadeIn()
    }, function() {
        $(this).find(".b-popup").fadeOut()
    }), $(".close-b-popup").click(function() {
        $(this).parent(".b-popup").fadeOut()
    })
}

function alterFormRageSlider() {
    $("#sleeve-length").slider({
        range: "min",
        value: 0,
        min: 0,
        max: 25.5,
        step: .5,
        slide: function(t, e) {
            $("#s-lenght-cnt").val(e.value)
        }
    }), $("#s-lenght-cnt").text($("#sleeve-length").slider("value")), $("#sleeve-length1").slider({
        range: "min",
        value: 0,
        min: 0,
        max: 25.5,
        step: .5,
        slide: function(t, e) {
            $("#s-lenght-cnt1").val(e.value)
        }
    }), $("#s-lenght-cnt1").text($("#sleeve-length1").slider("value")), $("#sleeve-length2").slider({
        range: "min",
        value: 0,
        min: 0,
        max: 25.5,
        step: .5,
        slide: function(t, e) {
            $("#s-lenght-cnt2").val(e.value)
        }
    }), $("#s-lenght-cnt2").text($("#sleeve-length2").slider("value")), $("#sleeve-length3").slider({
        range: "min",
        value: 0,
        min: 0,
        max: 25.5,
        step: .5,
        slide: function(t, e) {
            $("#s-lenght-cnt3").val(e.value)
        }
    }), $("#s-lenght-cnt3").text($("#sleeve-length3").slider("value")), $("#sleeve-length4").slider({
        range: "min",
        value: 0,
        min: 0,
        max: 25.5,
        step: .5,
        slide: function(t, e) {
            $("#s-lenght-cnt4").val(e.value)
        }
    }), $("#s-lenght-cnt4").text($("#sleeve-length4").slider("value")), $("#sleeve-length5").slider({
        range: "min",
        value: 0,
        min: 0,
        max: 25.5,
        step: .5,
        slide: function(t, e) {
            $("#s-lenght-cnt5").val(e.value)
        }
    }), $("#s-lenght-cnt5").text($("#sleeve-length5").slider("value")), $("#sleeve-length6").slider({
        range: "min",
        value: 0,
        min: 0,
        max: 25.5,
        step: .5,
        slide: function(t, e) {
            $("#s-lenght-cnt6").val(e.value)
        }
    }), $("#s-lenght-cnt6").text($("#sleeve-length6").slider("value")), $("#sleeve-length7").slider({
        range: "min",
        value: 0,
        min: 0,
        max: 25.5,
        step: .5,
        slide: function(t, e) {
            $("#s-lenght-cnt7").val(e.value)
        }
    }), $("#s-lenght-cnt7").text($("#sleeve-length7").slider("value"))
}

function scrollSet() {
    $(".year-list li").click(function() {
        $(".year-list li").removeClass("active");
        var t = $(this).attr("data-scroll"),
            e = parseInt($("#" + t).attr("for")),
            i = $(".journey-detail").offset().top,
            n = e - i;
        $(window).width() < 768 ? $(".vertical-scroll").mCustomScrollbar("scrollTo", n - 150) : $(".vertical-scroll").mCustomScrollbar("scrollTo", n - 50), $(this).addClass("active")
    })
}

function yearFor() {
    $(".year-box").each(function() {
        $(this).attr("for", $(this).offset().top)
    }), $(".faq-right-box .faq-grid").each(function() {
        $(this).attr("for", $(this).offset().top)
    })
}

function insertB() {
    $(".about-menu-tab").insertBefore(".about-text-box"), winW <= 767 && ($(".career-img-box").insertAfter(".cr-fst-para"), $(".about-menu-tab a.active").insertBefore(".about-menu-tab a:first-child"))
}

function openVideoText() {
    $(".camp-km-btn").click(function() {
        170 == $(this).prev().height() ? ($(this).prev().css("height", "auto"), $(this).text("Know Less")) : ($(this).prev().css("height", "170px"), $(this).text("Know More"))
    })
}

function sherwaniSlider() {
    $(".v-swn-slider").owlCarousel({
        dots: !1,
        nav: !1,
        smartSpeed: 1e3,
        responsive: {
            0: {
                items: 1,
                stagePadding: 50,
                margin: 10,
                loop: !0,
                touchDrag: !0,
                mouseDrag: !0
            },
            480: {
                items: 1,
                stagePadding: 100,
                margin: 10,
                loop: !0,
                touchDrag: !0,
                mouseDrag: !0
            },
            768: {
                items: 3,
                margin: 20,
                loop: !1,
                touchDrag: !1,
                mouseDrag: !1
            }
        }
    })
}

function guestEmailPopup() {
    winW < 768 && ($(".guest-popup").click(function() {
        $(".guest-form, .overlay").fadeIn()
    }), $(".overlay").click(function() {
        $(".guest-form, .overlay").fadeOut()
    }))
}

function mobMenu() {
    $(".menu-icon").click(function() {
        $(".mob-menu-wrap, .mob-emnu-overlay").addClass("active")
    }), $(".wel-back-menu").click(function() {
        $(".mob-menu-wrap, .mob-emnu-overlay").removeClass("active")
    }), $(".mob-main-menu li a[data-tab]").click(function() {
        var t = $(this).attr("data-tab");
        $(".mob-submenu-box").hide(), $("#" + t).show(), $(".mob-inner-menu-wrap").addClass("active")
    }), $(".mob-submenu-box .back-arrow").click(function() {
        $(".mob-inner-menu-wrap").removeClass("active")
    })
}

function relUnder640() {
    if ($(window).width() <= 767) {
        $(".compelet-look-dlt .heading02").insertBefore(".bridal-look-slider");
        $(".bridal-coll-slider").owlCarousel({
            items: 1,
            dots: !1,
            nav: !1,
            smartSpeed: 1e3,
            loop: !0,
            responsive: {
                0: {
                    margin: 10,
                    stagePadding: 50
                },
                480: {
                    margin: 15,
                    stagePadding: 100
                },
                640: {
                    margin: 20,
                    stagePadding: 125
                }
            }
        }), $(".collection-title").insertBefore(""), $(".bridal-coll-slider .owl-item").each(function() {
            $(this).find(".collection-title").insertBefore($(this).find(".collection-box"))
        })
    }
}

function measurePopup() {
    $(".how-measure").click(function() {
        $(".overlay, .ht-measure-popup").fadeIn(), $("body,html").scrollTop(0)
    }), $(".close-measure-popup, .overlay").click(function() {
        $(".overlay, .ht-measure-popup").fadeOut()
    }), $(".alter-popup").click(function() {
        $(".overlay, .sub-measure-popup").fadeIn()
    }), $(".close-sub-popup, .overlay").click(function() {
        $(".overlay, .sub-measure-popup").fadeOut()
    }), $(".scnd-span, .close-sub-popup").click(function() {
        $('input[value="Ready to Wear"]').click(), $(".sub-measure-popup").hide(), $(".alteration-popup").hide(), $(".alteration-popup-overlay").css("display", "none"), $(".overlay, .sub-measure-popup").fadeOut()
    })
}

function listPopup() {
    $(".list-read-more").click(function() {
        $(".list-desc-popup, .overlay").fadeIn()
    }), $(".close-desc-popup, .overlay").click(function() {
        $(".list-desc-popup, .overlay").fadeOut()
    })
}

function blogBannerSlider() {
    $(".blog-banner-slider").owlCarousel({
        items: 1,
        smartSpeed: 1e3,
        loop: !0,
        nav: !0,
        dots: !1
    })
}

function diariesSider() {
    $(".blog-slider").owlCarousel({
        items: 3,
        dots: !1,
        nav: !0,
        smartSpeed: 1e3,
        loop: !0,
        margin: 24
    })
}

function storeLocatorJs() {
    $(".store-btn").click(function() {
        $(".sucess-loader-overlay, #loader").show(), $(".submit_form").click()
    }), $("#store_selected").change(function() {
        var t = $(this).val();
        $("#store_selected_country").val(t), $(".sucess-loader-overlay, #loader").show(), $(".submit_country_form").click()
    }), $("#select-country").change(function() {
        var t = $(this).val(),
            e = $("#store_selected").val();
        $("#store_selected_city").val(e), $("#country_select_city").val(t), $(".sucess-loader-overlay, #loader").show(), $(".submit_city_form").click()
    })
}

function checkoutJs() {
    $("#order_address_s_country, #order_address_b_country").change(function() {
        var t = $(this).find(":selected").text();
        $(".sucess-loader-overlay, #loader").show(), $.getScript("/update_state?country=" + t)
    }), $(".b-state-new-version, .s-state-new-version").change(function() {
        var t = $(this).find(":selected").text();
        cName = $(this).attr("for"), country = $("#" + cName).find(":selected").text(), 0 == country.length && (country = "India"), $(".sucess-loader-overlay, #loader").show(), $.getScript("/update_state?state=" + t + "&country=" + country)
    }), $(document).on("change", ".billing-box", function() {
        $(this).is(":checked") ? $(".ship_address").slideDown() : $(".ship_address").slideUp()
    })
}

function quantityCount() {
    $(".add-bnt").click(function() {
        var t = $(this).parent().find(".count-input").attr("value");
        t = ++t, $(this).parent().find(".count-input").attr("value", t)
    }), $(".less-btn").click(function(t) {
        var e = $(this).parent().find(".count-input").attr("value");
        e = --e, $(this).parent().find(".count-input").attr("value") <= 1 ? t.preventDefault() : $(this).parent().find(".count-input").attr("value", e)
    })
}! function(t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    function i(t) {
        var e = t.length,
            i = ot.type(t);
        return "function" !== i && !ot.isWindow(t) && (!(1 !== t.nodeType || !e) || ("array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t))
    }

    function n(t, e, i) {
        if (ot.isFunction(e)) return ot.grep(t, function(t, n) {
            return !!e.call(t, n, t) !== i
        });
        if (e.nodeType) return ot.grep(t, function(t) {
            return t === e !== i
        });
        if ("string" == typeof e) {
            if (dt.test(e)) return ot.filter(e, t, i);
            e = ot.filter(e, t)
        }
        return ot.grep(t, function(t) {
            return ot.inArray(t, e) >= 0 !== i
        })
    }

    function o(t, e) {
        do {
            t = t[e]
        } while (t && 1 !== t.nodeType);
        return t
    }

    function s(t) {
        var e = wt[t] = {};
        return ot.each(t.match(yt) || [], function(t, i) {
            e[i] = !0
        }), e
    }

    function a() {
        ft.addEventListener ? (ft.removeEventListener("DOMContentLoaded", r, !1), t.removeEventListener("load", r, !1)) : (ft.detachEvent("onreadystatechange", r), t.detachEvent("onload", r))
    }

    function r() {
        (ft.addEventListener || "load" === event.type || "complete" === ft.readyState) && (a(), ot.ready())
    }

    function l(t, e, i) {
        if (i === undefined && 1 === t.nodeType) {
            var n = "data-" + e.replace(kt, "-$1").toLowerCase();
            if ("string" == typeof(i = t.getAttribute(n))) {
                try {
                    i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : Ct.test(i) ? ot.parseJSON(i) : i)
                } catch (t) {}
                ot.data(t, e, i)
            } else i = undefined
        }
        return i
    }

    function h(t) {
        var e;
        for (e in t)
            if (("data" !== e || !ot.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
        return !0
    }

    function c(t, e, i, n) {
        if (ot.acceptData(t)) {
            var o, s, a = ot.expando,
                r = t.nodeType,
                l = r ? ot.cache : t,
                h = r ? t[a] : t[a] && a;
            if (h && l[h] && (n || l[h].data) || i !== undefined || "string" != typeof e) return h || (h = r ? t[a] = V.pop() || ot.guid++ : a), l[h] || (l[h] = r ? {} : {
                toJSON: ot.noop
            }), "object" != typeof e && "function" != typeof e || (n ? l[h] = ot.extend(l[h], e) : l[h].data = ot.extend(l[h].data, e)), s = l[h], n || (s.data || (s.data = {}), s = s.data), i !== undefined && (s[ot.camelCase(e)] = i), "string" == typeof e ? null == (o = s[e]) && (o = s[ot.camelCase(e)]) : o = s, o
        }
    }

    function u(t, e, i) {
        if (ot.acceptData(t)) {
            var n, o, s = t.nodeType,
                a = s ? ot.cache : t,
                r = s ? t[ot.expando] : ot.expando;
            if (a[r]) {
                if (e && (n = i ? a[r] : a[r].data)) {
                    ot.isArray(e) ? e = e.concat(ot.map(e, ot.camelCase)) : e in n ? e = [e] : (e = ot.camelCase(e), e = e in n ? [e] : e.split(" ")), o = e.length;
                    for (; o--;) delete n[e[o]];
                    if (i ? !h(n) : !ot.isEmptyObject(n)) return
                }(i || (delete a[r].data, h(a[r]))) && (s ? ot.cleanData([t], !0) : it.deleteExpando || a != a.window ? delete a[r] : a[r] = null)
            }
        }
    }

    function d() {
        return !0
    }

    function p() {
        return !1
    }

    function f() {
        try {
            return ft.activeElement
        } catch (t) {}
    }

    function m(t) {
        var e = At.split("|"),
            i = t.createDocumentFragment();
        if (i.createElement)
            for (; e.length;) i.createElement(e.pop());
        return i
    }

    function g(t, e) {
        var i, n, o = 0,
            s = typeof t.getElementsByTagName !== xt ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== xt ? t.querySelectorAll(e || "*") : undefined;
        if (!s)
            for (s = [], i = t.childNodes || t; null != (n = i[o]); o++) !e || ot.nodeName(n, e) ? s.push(n) : ot.merge(s, g(n, e));
        return e === undefined || e && ot.nodeName(t, e) ? ot.merge([t], s) : s
    }

    function v(t) {
        Wt.test(t.type) && (t.defaultChecked = t.checked)
    }

    function y(t, e) {
        return ot.nodeName(t, "table") && ot.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function w(t) {
        return t.type = (null !== ot.find.attr(t, "type")) + "/" + t.type, t
    }

    function b(t) {
        var e = Xt.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function _(t, e) {
        for (var i, n = 0; null != (i = t[n]); n++) ot._data(i, "globalEval", !e || ot._data(e[n], "globalEval"))
    }

    function x(t, e) {
        if (1 === e.nodeType && ot.hasData(t)) {
            var i, n, o, s = ot._data(t),
                a = ot._data(e, s),
                r = s.events;
            if (r) {
                delete a.handle, a.events = {};
                for (i in r)
                    for (n = 0, o = r[i].length; n < o; n++) ot.event.add(e, i, r[i][n])
            }
            a.data && (a.data = ot.extend({}, a.data))
        }
    }

    function C(t, e) {
        var i, n, o;
        if (1 === e.nodeType) {
            if (i = e.nodeName.toLowerCase(), !it.noCloneEvent && e[ot.expando]) {
                o = ot._data(e);
                for (n in o.events) ot.removeEvent(e, n, o.handle);
                e.removeAttribute(ot.expando)
            }
            "script" === i && e.text !== t.text ? (w(e).text = t.text, b(e)) : "object" === i ? (e.parentNode && (e.outerHTML = t.outerHTML), it.html5Clone && t.innerHTML && !ot.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === i && Wt.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === i ? e.defaultSelected = e.selected = t.defaultSelected : "input" !== i && "textarea" !== i || (e.defaultValue = t.defaultValue)
        }
    }

    function k(e, i) {
        var n, o = ot(i.createElement(e)).appendTo(i.body),
            s = t.getDefaultComputedStyle && (n = t.getDefaultComputedStyle(o[0])) ? n.display : ot.css(o[0], "display");
        return o.detach(), s
    }

    function S(t) {
        var e = ft,
            i = Gt[t];
        return i || (i = k(t, e), "none" !== i && i || (Zt = (Zt || ot("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (Zt[0].contentWindow || Zt[0].contentDocument).document, e.write(), e.close(), i = k(t, e), Zt.detach()), Gt[t] = i), i
    }

    function T(t, e) {
        return {
            get: function() {
                var i = t();
                if (null != i) return i ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }

    function z(t, e) {
        if (e in t) return e;
        for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, o = ue.length; o--;)
            if ((e = ue[o] + i) in t) return e;
        return n
    }

    function D(t, e) {
        for (var i, n, o, s = [], a = 0, r = t.length; a < r; a++) n = t[a], n.style && (s[a] = ot._data(n, "olddisplay"), i = n.style.display, e ? (s[a] || "none" !== i || (n.style.display = ""), "" === n.style.display && zt(n) && (s[a] = ot._data(n, "olddisplay", S(n.nodeName)))) : (o = zt(n), (i && "none" !== i || !o) && ot._data(n, "olddisplay", o ? i : ot.css(n, "display"))));
        for (a = 0; a < r; a++) n = t[a], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? s[a] || "" : "none"));
        return t
    }

    function W(t, e, i) {
        var n = re.exec(e);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
    }

    function P(t, e, i, n, o) {
        for (var s = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; s < 4; s += 2) "margin" === i && (a += ot.css(t, i + Tt[s], !0, o)), n ? ("content" === i && (a -= ot.css(t, "padding" + Tt[s], !0, o)), "margin" !== i && (a -= ot.css(t, "border" + Tt[s] + "Width", !0, o))) : (a += ot.css(t, "padding" + Tt[s], !0, o), "padding" !== i && (a += ot.css(t, "border" + Tt[s] + "Width", !0, o)));
        return a
    }

    function E(t, e, i) {
        var n = !0,
            o = "width" === e ? t.offsetWidth : t.offsetHeight,
            s = Jt(t),
            a = it.boxSizing && "border-box" === ot.css(t, "boxSizing", !1, s);
        if (o <= 0 || null == o) {
            if (o = te(t, e, s), (o < 0 || null == o) && (o = t.style[e]), ie.test(o)) return o;
            n = a && (it.boxSizingReliable() || o === t.style[e]), o = parseFloat(o) || 0
        }
        return o + P(t, e, i || (a ? "border" : "content"), n, s) + "px"
    }

    function $(t, e, i, n, o) {
        return new $.prototype.init(t, e, i, n, o)
    }

    function I() {
        return setTimeout(function() {
            de = undefined
        }), de = ot.now()
    }

    function M(t, e) {
        var i, n = {
                height: t
            },
            o = 0;
        for (e = e ? 1 : 0; o < 4; o += 2 - e) i = Tt[o], n["margin" + i] = n["padding" + i] = t;
        return e && (n.opacity = n.width = t), n
    }

    function A(t, e, i) {
        for (var n, o = (ye[e] || []).concat(ye["*"]), s = 0, a = o.length; s < a; s++)
            if (n = o[s].call(i, e, t)) return n
    }

    function H(t, e, i) {
        var n, o, s, a, r, l, h, c = this,
            u = {},
            d = t.style,
            p = t.nodeType && zt(t),
            f = ot._data(t, "fxshow");
        i.queue || (r = ot._queueHooks(t, "fx"), null == r.unqueued && (r.unqueued = 0, l = r.empty.fire, r.empty.fire = function() {
            r.unqueued || l()
        }), r.unqueued++, c.always(function() {
            c.always(function() {
                r.unqueued--, ot.queue(t, "fx").length || r.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [d.overflow, d.overflowX, d.overflowY], h = ot.css(t, "display"), "inline" === ("none" === h ? ot._data(t, "olddisplay") || S(t.nodeName) : h) && "none" === ot.css(t, "float") && (it.inlineBlockNeedsLayout && "inline" !== S(t.nodeName) ? d.zoom = 1 : d.display = "inline-block")), i.overflow && (d.overflow = "hidden", it.shrinkWrapBlocks() || c.always(function() {
            d.overflow = i.overflow[0], d.overflowX = i.overflow[1], d.overflowY = i.overflow[2]
        }));
        for (n in e)
            if (o = e[n], fe.exec(o)) {
                if (delete e[n], s = s || "toggle" === o, o === (p ? "hide" : "show")) {
                    if ("show" !== o || !f || f[n] === undefined) continue;
                    p = !0
                }
                u[n] = f && f[n] || ot.style(t, n)
            } else h = undefined;
        if (ot.isEmptyObject(u)) "inline" === ("none" === h ? S(t.nodeName) : h) && (d.display = h);
        else {
            f ? "hidden" in f && (p = f.hidden) : f = ot._data(t, "fxshow", {}), s && (f.hidden = !p), p ? ot(t).show() : c.done(function() {
                ot(t).hide()
            }), c.done(function() {
                var e;
                ot._removeData(t, "fxshow");
                for (e in u) ot.style(t, e, u[e])
            });
            for (n in u) a = A(p ? f[n] : 0, n, c), n in f || (f[n] = a.start, p && (a.end = a.start, a.start = "width" === n || "height" === n ? 1 : 0))
        }
    }

    function O(t, e) {
        var i, n, o, s, a;
        for (i in t)
            if (n = ot.camelCase(i), o = e[n], s = t[i], ot.isArray(s) && (o = s[1], s = t[i] = s[0]), i !== n && (t[n] = s, delete t[i]), (a = ot.cssHooks[n]) && "expand" in a) {
                s = a.expand(s), delete t[n];
                for (i in s) i in t || (t[i] = s[i], e[i] = o)
            } else e[n] = o
    }

    function L(t, e, i) {
        var n, o, s = 0,
            a = ve.length,
            r = ot.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (o) return !1;
                for (var e = de || I(), i = Math.max(0, h.startTime + h.duration - e), n = i / h.duration || 0, s = 1 - n, a = 0, l = h.tweens.length; a < l; a++) h.tweens[a].run(s);
                return r.notifyWith(t, [h, s, i]), s < 1 && l ? i : (r.resolveWith(t, [h]), !1)
            },
            h = r.promise({
                elem: t,
                props: ot.extend({}, e),
                opts: ot.extend(!0, {
                    specialEasing: {}
                }, i),
                originalProperties: e,
                originalOptions: i,
                startTime: de || I(),
                duration: i.duration,
                tweens: [],
                createTween: function(e, i) {
                    var n = ot.Tween(t, h.opts, e, i, h.opts.specialEasing[e] || h.opts.easing);
                    return h.tweens.push(n), n
                },
                stop: function(e) {
                    var i = 0,
                        n = e ? h.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; i < n; i++) h.tweens[i].run(1);
                    return e ? r.resolveWith(t, [h, e]) : r.rejectWith(t, [h, e]), this
                }
            }),
            c = h.props;
        for (O(c, h.opts.specialEasing); s < a; s++)
            if (n = ve[s].call(h, t, c, h.opts)) return n;
        return ot.map(c, A, h), ot.isFunction(h.opts.start) && h.opts.start.call(t, h), ot.fx.timer(ot.extend(l, {
            elem: t,
            anim: h,
            queue: h.opts.queue
        })), h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always)
    }

    function N(t) {
        return function(e, i) {
            "string" != typeof e && (i = e, e = "*");
            var n, o = 0,
                s = e.toLowerCase().match(yt) || [];
            if (ot.isFunction(i))
                for (; n = s[o++];) "+" === n.charAt(0) ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
        }
    }

    function R(t, e, i, n) {
        function o(r) {
            var l;
            return s[r] = !0, ot.each(t[r] || [], function(t, r) {
                var h = r(e, i, n);
                return "string" != typeof h || a || s[h] ? a ? !(l = h) : void 0 : (e.dataTypes.unshift(h), o(h), !1)
            }), l
        }
        var s = {},
            a = t === je;
        return o(e.dataTypes[0]) || !s["*"] && o("*")
    }

    function B(t, e) {
        var i, n, o = ot.ajaxSettings.flatOptions || {};
        for (n in e) e[n] !== undefined && ((o[n] ? t : i || (i = {}))[n] = e[n]);
        return i && ot.extend(!0, t, i), t
    }

    function j(t, e, i) {
        for (var n, o, s, a, r = t.contents, l = t.dataTypes;
            "*" === l[0];) l.shift(), o === undefined && (o = t.mimeType || e.getResponseHeader("Content-Type"));
        if (o)
            for (a in r)
                if (r[a] && r[a].test(o)) {
                    l.unshift(a);
                    break
                } if (l[0] in i) s = l[0];
        else {
            for (a in i) {
                if (!l[0] || t.converters[a + " " + l[0]]) {
                    s = a;
                    break
                }
                n || (n = a)
            }
            s = s || n
        }
        if (s) return s !== l[0] && l.unshift(s), i[s]
    }

    function F(t, e, i, n) {
        var o, s, a, r, l, h = {},
            c = t.dataTypes.slice();
        if (c[1])
            for (a in t.converters) h[a.toLowerCase()] = t.converters[a];
        for (s = c.shift(); s;)
            if (t.responseFields[s] && (i[t.responseFields[s]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = s, s = c.shift())
                if ("*" === s) s = l;
                else if ("*" !== l && l !== s) {
            if (!(a = h[l + " " + s] || h["* " + s]))
                for (o in h)
                    if (r = o.split(" "), r[1] === s && (a = h[l + " " + r[0]] || h["* " + r[0]])) {
                        !0 === a ? a = h[o] : !0 !== h[o] && (s = r[0], c.unshift(r[1]));
                        break
                    } if (!0 !== a)
                if (a && t["throws"]) e = a(e);
                else try {
                    e = a(e)
                } catch (t) {
                    return {
                        state: "parsererror",
                        error: a ? t : "No conversion from " + l + " to " + s
                    }
                }
        }
        return {
            state: "success",
            data: e
        }
    }

    function q(t, e, i, n) {
        var o;
        if (ot.isArray(e)) ot.each(e, function(e, o) {
            i || Ye.test(t) ? n(t, o) : q(t + "[" + ("object" == typeof o ? e : "") + "]", o, i, n)
        });
        else if (i || "object" !== ot.type(e)) n(t, e);
        else
            for (o in e) q(t + "[" + o + "]", e[o], i, n)
    }

    function Y() {
        try {
            return new t.XMLHttpRequest
        } catch (t) {}
    }

    function X() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function U(t) {
        return ot.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
    }
    var V = [],
        K = V.slice,
        Q = V.concat,
        Z = V.push,
        G = V.indexOf,
        J = {},
        tt = J.toString,
        et = J.hasOwnProperty,
        it = {},
        nt = "1.11.1",
        ot = function(t, e) {
            return new ot.fn.init(t, e)
        },
        st = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        at = /^-ms-/,
        rt = /-([\da-z])/gi,
        lt = function(t, e) {
            return e.toUpperCase()
        };
    ot.fn = ot.prototype = {
        jquery: nt,
        constructor: ot,
        selector: "",
        length: 0,
        toArray: function() {
            return K.call(this)
        },
        get: function(t) {
            return null != t ? t < 0 ? this[t + this.length] : this[t] : K.call(this)
        },
        pushStack: function(t) {
            var e = ot.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        },
        each: function(t, e) {
            return ot.each(this, t, e)
        },
        map: function(t) {
            return this.pushStack(ot.map(this, function(e, i) {
                return t.call(e, i, e)
            }))
        },
        slice: function() {
            return this.pushStack(K.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length,
                i = +t + (t < 0 ? e : 0);
            return this.pushStack(i >= 0 && i < e ? [this[i]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Z,
        sort: V.sort,
        splice: V.splice
    }, ot.extend = ot.fn.extend = function() {
        var t, e, i, n, o, s, a = arguments[0] || {},
            r = 1,
            l = arguments.length,
            h = !1;
        for ("boolean" == typeof a && (h = a, a = arguments[r] || {}, r++), "object" == typeof a || ot.isFunction(a) || (a = {}), r === l && (a = this, r--); r < l; r++)
            if (null != (o = arguments[r]))
                for (n in o) t = a[n], i = o[n], a !== i && (h && i && (ot.isPlainObject(i) || (e = ot.isArray(i))) ? (e ? (e = !1, s = t && ot.isArray(t) ? t : []) : s = t && ot.isPlainObject(t) ? t : {}, a[n] = ot.extend(h, s, i)) : i !== undefined && (a[n] = i));
        return a
    }, ot.extend({
        expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isFunction: function(t) {
            return "function" === ot.type(t)
        },
        isArray: Array.isArray || function(t) {
            return "array" === ot.type(t)
        },
        isWindow: function(t) {
            return null != t && t == t.window
        },
        isNumeric: function(t) {
            return !ot.isArray(t) && t - parseFloat(t) >= 0
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        isPlainObject: function(t) {
            var e;
            if (!t || "object" !== ot.type(t) || t.nodeType || ot.isWindow(t)) return !1;
            try {
                if (t.constructor && !et.call(t, "constructor") && !et.call(t.constructor.prototype, "isPrototypeOf")) return !1
            } catch (t) {
                return !1
            }
            if (it.ownLast)
                for (e in t) return et.call(t, e);
            for (e in t);
            return e === undefined || et.call(t, e)
        },
        type: function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? J[tt.call(t)] || "object" : typeof t
        },
        globalEval: function(e) {
            e && ot.trim(e) && (t.execScript || function(e) {
                t.eval.call(t, e)
            })(e)
        },
        camelCase: function(t) {
            return t.replace(at, "ms-").replace(rt, lt)
        },
        nodeName: function(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function(t, e, n) {
            var o = 0,
                s = t.length,
                a = i(t);
            if (n) {
                if (a)
                    for (; o < s && !1 !== e.apply(t[o], n); o++);
                else
                    for (o in t)
                        if (!1 === e.apply(t[o], n)) break
            } else if (a)
                for (; o < s && !1 !== e.call(t[o], o, t[o]); o++);
            else
                for (o in t)
                    if (!1 === e.call(t[o], o, t[o])) break;
            return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(st, "")
        },
        makeArray: function(t, e) {
            var n = e || [];
            return null != t && (i(Object(t)) ? ot.merge(n, "string" == typeof t ? [t] : t) : Z.call(n, t)), n
        },
        inArray: function(t, e, i) {
            var n;
            if (e) {
                if (G) return G.call(e, t, i);
                for (n = e.length, i = i ? i < 0 ? Math.max(0, n + i) : i : 0; i < n; i++)
                    if (i in e && e[i] === t) return i
            }
            return -1
        },
        merge: function(t, e) {
            for (var i = +e.length, n = 0, o = t.length; n < i;) t[o++] = e[n++];
            if (i !== i)
                for (; e[n] !== undefined;) t[o++] = e[n++];
            return t.length = o, t
        },
        grep: function(t, e, i) {
            for (var n = [], o = 0, s = t.length, a = !i; o < s; o++) !e(t[o], o) !== a && n.push(t[o]);
            return n
        },
        map: function(t, e, n) {
            var o, s = 0,
                a = t.length,
                r = i(t),
                l = [];
            if (r)
                for (; s < a; s++) null != (o = e(t[s], s, n)) && l.push(o);
            else
                for (s in t) null != (o = e(t[s], s, n)) && l.push(o);
            return Q.apply([], l)
        },
        guid: 1,
        proxy: function(t, e) {
            var i, n, o;
            return "string" == typeof e && (o = t[e], e = t, t = o), ot.isFunction(t) ? (i = K.call(arguments, 2), n = function() {
                return t.apply(e || this, i.concat(K.call(arguments)))
            }, n.guid = t.guid = t.guid || ot.guid++, n) : undefined
        },
        now: function() {
            return +new Date
        },
        support: it
    }), ot.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        J["[object " + e + "]"] = e.toLowerCase()
    });
    var ht = function(t) {
        function e(t, e, i, n) {
            var o, s, a, r, l, h, u, p, f, m;
            if ((e ? e.ownerDocument || e : R) !== $ && E(e), e = e || $, i = i || [], !t || "string" != typeof t) return i;
            if (1 !== (r = e.nodeType) && 9 !== r) return [];
            if (M && !n) {
                if (o = yt.exec(t))
                    if (a = o[1]) {
                        if (9 === r) {
                            if (!(s = e.getElementById(a)) || !s.parentNode) return i;
                            if (s.id === a) return i.push(s), i
                        } else if (e.ownerDocument && (s = e.ownerDocument.getElementById(a)) && L(e, s) && s.id === a) return i.push(s), i
                    } else {
                        if (o[2]) return J.apply(i, e.getElementsByTagName(t)), i;
                        if ((a = o[3]) && _.getElementsByClassName && e.getElementsByClassName) return J.apply(i, e.getElementsByClassName(a)), i
                    } if (_.qsa && (!A || !A.test(t))) {
                    if (p = u = N, f = e, m = 9 === r && t, 1 === r && "object" !== e.nodeName.toLowerCase()) {
                        for (h = S(t), (u = e.getAttribute("id")) ? p = u.replace(bt, "\\$&") : e.setAttribute("id", p), p = "[id='" + p + "'] ", l = h.length; l--;) h[l] = p + d(h[l]);
                        f = wt.test(t) && c(e.parentNode) || e, m = h.join(",")
                    }
                    if (m) try {
                        return J.apply(i, f.querySelectorAll(m)), i
                    } catch (t) {} finally {
                        u || e.removeAttribute("id")
                    }
                }
            }
            return z(t.replace(lt, "$1"), e, i, n)
        }

        function i() {
            function t(i, n) {
                return e.push(i + " ") > x.cacheLength && delete t[e.shift()], t[i + " "] = n
            }
            var e = [];
            return t
        }

        function n(t) {
            return t[N] = !0, t
        }

        function o(t) {
            var e = $.createElement("div");
            try {
                return !!t(e)
            } catch (t) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }
        }

        function s(t, e) {
            for (var i = t.split("|"), n = t.length; n--;) x.attrHandle[i[n]] = e
        }

        function a(t, e) {
            var i = e && t,
                n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || V) - (~t.sourceIndex || V);
            if (n) return n;
            if (i)
                for (; i = i.nextSibling;)
                    if (i === e) return -1;
            return t ? 1 : -1
        }

        function r(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }

        function l(t) {
            return function(e) {
                var i = e.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && e.type === t
            }
        }

        function h(t) {
            return n(function(e) {
                return e = +e, n(function(i, n) {
                    for (var o, s = t([], i.length, e), a = s.length; a--;) i[o = s[a]] && (i[o] = !(n[o] = i[o]))
                })
            })
        }

        function c(t) {
            return t && typeof t.getElementsByTagName !== U && t
        }

        function u() {}

        function d(t) {
            for (var e = 0, i = t.length, n = ""; e < i; e++) n += t[e].value;
            return n
        }

        function p(t, e, i) {
            var n = e.dir,
                o = i && "parentNode" === n,
                s = j++;
            return e.first ? function(e, i, s) {
                for (; e = e[n];)
                    if (1 === e.nodeType || o) return t(e, i, s)
            } : function(e, i, a) {
                var r, l, h = [B, s];
                if (a) {
                    for (; e = e[n];)
                        if ((1 === e.nodeType || o) && t(e, i, a)) return !0
                } else
                    for (; e = e[n];)
                        if (1 === e.nodeType || o) {
                            if (l = e[N] || (e[N] = {}), (r = l[n]) && r[0] === B && r[1] === s) return h[2] = r[2];
                            if (l[n] = h, h[2] = t(e, i, a)) return !0
                        }
            }
        }

        function f(t) {
            return t.length > 1 ? function(e, i, n) {
                for (var o = t.length; o--;)
                    if (!t[o](e, i, n)) return !1;
                return !0
            } : t[0]
        }

        function m(t, i, n) {
            for (var o = 0, s = i.length; o < s; o++) e(t, i[o], n);
            return n
        }

        function g(t, e, i, n, o) {
            for (var s, a = [], r = 0, l = t.length, h = null != e; r < l; r++)(s = t[r]) && (i && !i(s, n, o) || (a.push(s), h && e.push(r)));
            return a
        }

        function v(t, e, i, o, s, a) {
            return o && !o[N] && (o = v(o)), s && !s[N] && (s = v(s, a)), n(function(n, a, r, l) {
                var h, c, u, d = [],
                    p = [],
                    f = a.length,
                    v = n || m(e || "*", r.nodeType ? [r] : r, []),
                    y = !t || !n && e ? v : g(v, d, t, r, l),
                    w = i ? s || (n ? t : f || o) ? [] : a : y;
                if (i && i(y, w, r, l), o)
                    for (h = g(w, p), o(h, [], r, l), c = h.length; c--;)(u = h[c]) && (w[p[c]] = !(y[p[c]] = u));
                if (n) {
                    if (s || t) {
                        if (s) {
                            for (h = [], c = w.length; c--;)(u = w[c]) && h.push(y[c] = u);
                            s(null, w = [], h, l)
                        }
                        for (c = w.length; c--;)(u = w[c]) && (h = s ? et.call(n, u) : d[c]) > -1 && (n[h] = !(a[h] = u))
                    }
                } else w = g(w === a ? w.splice(f, w.length) : w), s ? s(null, a, w, l) : J.apply(a, w)
            })
        }

        function y(t) {
            for (var e, i, n, o = t.length, s = x.relative[t[0].type], a = s || x.relative[" "], r = s ? 1 : 0, l = p(function(t) {
                    return t === e
                }, a, !0), h = p(function(t) {
                    return et.call(e, t) > -1
                }, a, !0), c = [function(t, i, n) {
                    return !s && (n || i !== D) || ((e = i).nodeType ? l(t, i, n) : h(t, i, n))
                }]; r < o; r++)
                if (i = x.relative[t[r].type]) c = [p(f(c), i)];
                else {
                    if (i = x.filter[t[r].type].apply(null, t[r].matches), i[N]) {
                        for (n = ++r; n < o && !x.relative[t[n].type]; n++);
                        return v(r > 1 && f(c), r > 1 && d(t.slice(0, r - 1).concat({
                            value: " " === t[r - 2].type ? "*" : ""
                        })).replace(lt, "$1"), i, r < n && y(t.slice(r, n)), n < o && y(t = t.slice(n)), n < o && d(t))
                    }
                    c.push(i)
                } return f(c)
        }

        function w(t, i) {
            var o = i.length > 0,
                s = t.length > 0,
                a = function(n, a, r, l, h) {
                    var c, u, d, p = 0,
                        f = "0",
                        m = n && [],
                        v = [],
                        y = D,
                        w = n || s && x.find.TAG("*", h),
                        b = B += null == y ? 1 : Math.random() || .1,
                        _ = w.length;
                    for (h && (D = a !== $ && a); f !== _ && null != (c = w[f]); f++) {
                        if (s && c) {
                            for (u = 0; d = t[u++];)
                                if (d(c, a, r)) {
                                    l.push(c);
                                    break
                                } h && (B = b)
                        }
                        o && ((c = !d && c) && p--, n && m.push(c))
                    }
                    if (p += f, o && f !== p) {
                        for (u = 0; d = i[u++];) d(m, v, a, r);
                        if (n) {
                            if (p > 0)
                                for (; f--;) m[f] || v[f] || (v[f] = Z.call(l));
                            v = g(v)
                        }
                        J.apply(l, v), h && !n && v.length > 0 && p + i.length > 1 && e.uniqueSort(l)
                    }
                    return h && (B = b, D = y), m
                };
            return o ? n(a) : a
        }
        var b, _, x, C, k, S, T, z, D, W, P, E, $, I, M, A, H, O, L, N = "sizzle" + -new Date,
            R = t.document,
            B = 0,
            j = 0,
            F = i(),
            q = i(),
            Y = i(),
            X = function(t, e) {
                return t === e && (P = !0), 0
            },
            U = typeof undefined,
            V = 1 << 31,
            K = {}.hasOwnProperty,
            Q = [],
            Z = Q.pop,
            G = Q.push,
            J = Q.push,
            tt = Q.slice,
            et = Q.indexOf || function(t) {
                for (var e = 0, i = this.length; e < i; e++)
                    if (this[e] === t) return e;
                return -1
            },
            it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            nt = "[\\x20\\t\\r\\n\\f]",
            ot = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            st = ot.replace("w", "w#"),
            at = "\\[" + nt + "*(" + ot + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + st + "))|)" + nt + "*\\]",
            rt = ":(" + ot + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + at + ")*)|.*)\\)|)",
            lt = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
            ht = new RegExp("^" + nt + "*," + nt + "*"),
            ct = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
            ut = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
            dt = new RegExp(rt),
            pt = new RegExp("^" + st + "$"),
            ft = {
                ID: new RegExp("^#(" + ot + ")"),
                CLASS: new RegExp("^\\.(" + ot + ")"),
                TAG: new RegExp("^(" + ot.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + at),
                PSEUDO: new RegExp("^" + rt),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + it + ")$", "i"),
                needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
            },
            mt = /^(?:input|select|textarea|button)$/i,
            gt = /^h\d$/i,
            vt = /^[^{]+\{\s*\[native \w/,
            yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            wt = /[+~]/,
            bt = /'|\\/g,
            _t = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
            xt = function(t, e, i) {
                var n = "0x" + e - 65536;
                return n !== n || i ? e : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
            };
        try {
            J.apply(Q = tt.call(R.childNodes), R.childNodes), Q[R.childNodes.length].nodeType
        } catch (t) {
            J = {
                apply: Q.length ? function(t, e) {
                    G.apply(t, tt.call(e))
                } : function(t, e) {
                    for (var i = t.length, n = 0; t[i++] = e[n++];);
                    t.length = i - 1
                }
            }
        }
        _ = e.support = {}, k = e.isXML = function(t) {
            var e = t && (t.ownerDocument || t).documentElement;
            return !!e && "HTML" !== e.nodeName
        }, E = e.setDocument = function(t) {
            var e, i = t ? t.ownerDocument || t : R,
                n = i.defaultView;
            return i !== $ && 9 === i.nodeType && i.documentElement ? ($ = i, I = i.documentElement, M = !k(i), n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", function() {
                E()
            }, !1) : n.attachEvent && n.attachEvent("onunload", function() {
                E()
            })), _.attributes = o(function(t) {
                return t.className = "i", !t.getAttribute("className")
            }), _.getElementsByTagName = o(function(t) {
                return t.appendChild(i.createComment("")), !t.getElementsByTagName("*").length
            }), _.getElementsByClassName = vt.test(i.getElementsByClassName) && o(function(t) {
                return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
            }), _.getById = o(function(t) {
                return I.appendChild(t).id = N, !i.getElementsByName || !i.getElementsByName(N).length
            }), _.getById ? (x.find.ID = function(t, e) {
                if (typeof e.getElementById !== U && M) {
                    var i = e.getElementById(t);
                    return i && i.parentNode ? [i] : []
                }
            }, x.filter.ID = function(t) {
                var e = t.replace(_t, xt);
                return function(t) {
                    return t.getAttribute("id") === e
                }
            }) : (delete x.find.ID, x.filter.ID = function(t) {
                var e = t.replace(_t, xt);
                return function(t) {
                    var i = typeof t.getAttributeNode !== U && t.getAttributeNode("id");
                    return i && i.value === e
                }
            }), x.find.TAG = _.getElementsByTagName ? function(t, e) {
                if (typeof e.getElementsByTagName !== U) return e.getElementsByTagName(t)
            } : function(t, e) {
                var i, n = [],
                    o = 0,
                    s = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; i = s[o++];) 1 === i.nodeType && n.push(i);
                    return n
                }
                return s
            }, x.find.CLASS = _.getElementsByClassName && function(t, e) {
                if (typeof e.getElementsByClassName !== U && M) return e.getElementsByClassName(t)
            }, H = [], A = [], (_.qsa = vt.test(i.querySelectorAll)) && (o(function(t) {
                t.innerHTML = "<select msallowclip=''><option selected=''></option></select>", t.querySelectorAll("[msallowclip^='']").length && A.push("[*^$]=" + nt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || A.push("\\[" + nt + "*(?:value|" + it + ")"), t.querySelectorAll(":checked").length || A.push(":checked")
            }), o(function(t) {
                var e = i.createElement("input");
                e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && A.push("name" + nt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || A.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), A.push(",.*:")
            })), (_.matchesSelector = vt.test(O = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && o(function(t) {
                _.disconnectedMatch = O.call(t, "div"), O.call(t, "[s!='']:x"), H.push("!=", rt)
            }), A = A.length && new RegExp(A.join("|")), H = H.length && new RegExp(H.join("|")), e = vt.test(I.compareDocumentPosition), L = e || vt.test(I.contains) ? function(t, e) {
                var i = 9 === t.nodeType ? t.documentElement : t,
                    n = e && e.parentNode;
                return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
            } : function(t, e) {
                if (e)
                    for (; e = e.parentNode;)
                        if (e === t) return !0;
                return !1
            }, X = e ? function(t, e) {
                if (t === e) return P = !0, 0;
                var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return n || (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !_.sortDetached && e.compareDocumentPosition(t) === n ? t === i || t.ownerDocument === R && L(R, t) ? -1 : e === i || e.ownerDocument === R && L(R, e) ? 1 : W ? et.call(W, t) - et.call(W, e) : 0 : 4 & n ? -1 : 1)
            } : function(t, e) {
                if (t === e) return P = !0, 0;
                var n, o = 0,
                    s = t.parentNode,
                    r = e.parentNode,
                    l = [t],
                    h = [e];
                if (!s || !r) return t === i ? -1 : e === i ? 1 : s ? -1 : r ? 1 : W ? et.call(W, t) - et.call(W, e) : 0;
                if (s === r) return a(t, e);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (n = e; n = n.parentNode;) h.unshift(n);
                for (; l[o] === h[o];) o++;
                return o ? a(l[o], h[o]) : l[o] === R ? -1 : h[o] === R ? 1 : 0
            }, i) : $
        }, e.matches = function(t, i) {
            return e(t, null, null, i)
        }, e.matchesSelector = function(t, i) {
            if ((t.ownerDocument || t) !== $ && E(t), i = i.replace(ut, "='$1']"), _.matchesSelector && M && (!H || !H.test(i)) && (!A || !A.test(i))) try {
                var n = O.call(t, i);
                if (n || _.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
            } catch (t) {}
            return e(i, $, null, [t]).length > 0
        }, e.contains = function(t, e) {
            return (t.ownerDocument || t) !== $ && E(t), L(t, e)
        }, e.attr = function(t, e) {
            (t.ownerDocument || t) !== $ && E(t);
            var i = x.attrHandle[e.toLowerCase()],
                n = i && K.call(x.attrHandle, e.toLowerCase()) ? i(t, e, !M) : undefined;
            return n !== undefined ? n : _.attributes || !M ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }, e.error = function(t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, e.uniqueSort = function(t) {
            var e, i = [],
                n = 0,
                o = 0;
            if (P = !_.detectDuplicates, W = !_.sortStable && t.slice(0), t.sort(X), P) {
                for (; e = t[o++];) e === t[o] && (n = i.push(o));
                for (; n--;) t.splice(i[n], 1)
            }
            return W = null, t
        }, C = e.getText = function(t) {
            var e, i = "",
                n = 0,
                o = t.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof t.textContent) return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling) i += C(t)
                } else if (3 === o || 4 === o) return t.nodeValue
            } else
                for (; e = t[n++];) i += C(e);
            return i
        }, x = e.selectors = {
            cacheLength: 50,
            createPseudo: n,
            match: ft,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(t) {
                    return t[1] = t[1].replace(_t, xt), t[3] = (t[3] || t[4] || t[5] || "").replace(_t, xt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                },
                CHILD: function(t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                },
                PSEUDO: function(t) {
                    var e, i = !t[6] && t[2];
                    return ft.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && dt.test(i) && (e = S(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                }
            },
            filter: {
                TAG: function(t) {
                    var e = t.replace(_t, xt).toLowerCase();
                    return "*" === t ? function() {
                        return !0
                    } : function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function(t) {
                    var e = F[t + " "];
                    return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && F(t, function(t) {
                        return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== U && t.getAttribute("class") || "")
                    })
                },
                ATTR: function(t, i, n) {
                    return function(o) {
                        var s = e.attr(o, t);
                        return null == s ? "!=" === i : !i || (s += "", "=" === i ? s === n : "!=" === i ? s !== n : "^=" === i ? n && 0 === s.indexOf(n) : "*=" === i ? n && s.indexOf(n) > -1 : "$=" === i ? n && s.slice(-n.length) === n : "~=" === i ? (" " + s + " ").indexOf(n) > -1 : "|=" === i && (s === n || s.slice(0, n.length + 1) === n + "-"))
                    }
                },
                CHILD: function(t, e, i, n, o) {
                    var s = "nth" !== t.slice(0, 3),
                        a = "last" !== t.slice(-4),
                        r = "of-type" === e;
                    return 1 === n && 0 === o ? function(t) {
                        return !!t.parentNode
                    } : function(e, i, l) {
                        var h, c, u, d, p, f, m = s !== a ? "nextSibling" : "previousSibling",
                            g = e.parentNode,
                            v = r && e.nodeName.toLowerCase(),
                            y = !l && !r;
                        if (g) {
                            if (s) {
                                for (; m;) {
                                    for (u = e; u = u[m];)
                                        if (r ? u.nodeName.toLowerCase() === v : 1 === u.nodeType) return !1;
                                    f = m = "only" === t && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [a ? g.firstChild : g.lastChild], a && y) {
                                for (c = g[N] || (g[N] = {}), h = c[t] || [], p = h[0] === B && h[1], d = h[0] === B && h[2], u = p && g.childNodes[p]; u = ++p && u && u[m] || (d = p = 0) || f.pop();)
                                    if (1 === u.nodeType && ++d && u === e) {
                                        c[t] = [B, p, d];
                                        break
                                    }
                            } else if (y && (h = (e[N] || (e[N] = {}))[t]) && h[0] === B) d = h[1];
                            else
                                for (;
                                    (u = ++p && u && u[m] || (d = p = 0) || f.pop()) && ((r ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++d || (y && ((u[N] || (u[N] = {}))[t] = [B, d]), u !== e)););
                            return (d -= o) === n || d % n == 0 && d / n >= 0
                        }
                    }
                },
                PSEUDO: function(t, i) {
                    var o, s = x.pseudos[t] || x.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                    return s[N] ? s(i) : s.length > 1 ? (o = [t, t, "", i], x.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                        for (var n, o = s(t, i), a = o.length; a--;) n = et.call(t, o[a]), t[n] = !(e[n] = o[a])
                    }) : function(t) {
                        return s(t, 0, o)
                    }) : s
                }
            },
            pseudos: {
                not: n(function(t) {
                    var e = [],
                        i = [],
                        o = T(t.replace(lt, "$1"));
                    return o[N] ? n(function(t, e, i, n) {
                        for (var s, a = o(t, null, n, []), r = t.length; r--;)(s = a[r]) && (t[r] = !(e[r] = s))
                    }) : function(t, n, s) {
                        return e[0] = t, o(e, null, s, i), !i.pop()
                    }
                }),
                has: n(function(t) {
                    return function(i) {
                        return e(t, i).length > 0
                    }
                }),
                contains: n(function(t) {
                    return function(e) {
                        return (e.textContent || e.innerText || C(e)).indexOf(t) > -1
                    }
                }),
                lang: n(function(t) {
                    return pt.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(_t, xt).toLowerCase(),
                        function(e) {
                            var i;
                            do {
                                if (i = M ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (i = i.toLowerCase()) === t || 0 === i.indexOf(t + "-")
                            } while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                }),
                target: function(e) {
                    var i = t.location && t.location.hash;
                    return i && i.slice(1) === e.id
                },
                root: function(t) {
                    return t === I
                },
                focus: function(t) {
                    return t === $.activeElement && (!$.hasFocus || $.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                },
                enabled: function(t) {
                    return !1 === t.disabled
                },
                disabled: function(t) {
                    return !0 === t.disabled
                },
                checked: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                },
                selected: function(t) {
                    return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                },
                empty: function(t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                        if (t.nodeType < 6) return !1;
                    return !0
                },
                parent: function(t) {
                    return !x.pseudos.empty(t)
                },
                header: function(t) {
                    return gt.test(t.nodeName)
                },
                input: function(t) {
                    return mt.test(t.nodeName)
                },
                button: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                },
                text: function(t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: h(function() {
                    return [0]
                }),
                last: h(function(t, e) {
                    return [e - 1]
                }),
                eq: h(function(t, e, i) {
                    return [i < 0 ? i + e : i]
                }),
                even: h(function(t, e) {
                    for (var i = 0; i < e; i += 2) t.push(i);
                    return t
                }),
                odd: h(function(t, e) {
                    for (var i = 1; i < e; i += 2) t.push(i);
                    return t
                }),
                lt: h(function(t, e, i) {
                    for (var n = i < 0 ? i + e : i; --n >= 0;) t.push(n);
                    return t
                }),
                gt: h(function(t, e, i) {
                    for (var n = i < 0 ? i + e : i; ++n < e;) t.push(n);
                    return t
                })
            }
        }, x.pseudos.nth = x.pseudos.eq;
        for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) x.pseudos[b] = r(b);
        for (b in {
                submit: !0,
                reset: !0
            }) x.pseudos[b] = l(b);
        return u.prototype = x.filters = x.pseudos, x.setFilters = new u, S = e.tokenize = function(t, i) {
            var n, o, s, a, r, l, h, c = q[t + " "];
            if (c) return i ? 0 : c.slice(0);
            for (r = t, l = [], h = x.preFilter; r;) {
                n && !(o = ht.exec(r)) || (o && (r = r.slice(o[0].length) || r), l.push(s = [])), n = !1, (o = ct.exec(r)) && (n = o.shift(), s.push({
                    value: n,
                    type: o[0].replace(lt, " ")
                }), r = r.slice(n.length));
                for (a in x.filter) !(o = ft[a].exec(r)) || h[a] && !(o = h[a](o)) || (n = o.shift(), s.push({
                    value: n,
                    type: a,
                    matches: o
                }), r = r.slice(n.length));
                if (!n) break
            }
            return i ? r.length : r ? e.error(t) : q(t, l).slice(0)
        }, T = e.compile = function(t, e) {
            var i, n = [],
                o = [],
                s = Y[t + " "];
            if (!s) {
                for (e || (e = S(t)), i = e.length; i--;) s = y(e[i]), s[N] ? n.push(s) : o.push(s);
                s = Y(t, w(o, n)), s.selector = t
            }
            return s
        }, z = e.select = function(t, e, i, n) {
            var o, s, a, r, l, h = "function" == typeof t && t,
                u = !n && S(t = h.selector || t);
            if (i = i || [], 1 === u.length) {
                if (s = u[0] = u[0].slice(0), s.length > 2 && "ID" === (a = s[0]).type && _.getById && 9 === e.nodeType && M && x.relative[s[1].type]) {
                    if (!(e = (x.find.ID(a.matches[0].replace(_t, xt), e) || [])[0])) return i;
                    h && (e = e.parentNode), t = t.slice(s.shift().value.length)
                }
                for (o = ft.needsContext.test(t) ? 0 : s.length; o-- && (a = s[o], !x.relative[r = a.type]);)
                    if ((l = x.find[r]) && (n = l(a.matches[0].replace(_t, xt), wt.test(s[0].type) && c(e.parentNode) || e))) {
                        if (s.splice(o, 1), !(t = n.length && d(s))) return J.apply(i, n), i;
                        break
                    }
            }
            return (h || T(t, u))(n, e, !M, i, wt.test(t) && c(e.parentNode) || e), i
        }, _.sortStable = N.split("").sort(X).join("") === N, _.detectDuplicates = !!P, E(), _.sortDetached = o(function(t) {
            return 1 & t.compareDocumentPosition($.createElement("div"))
        }), o(function(t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
        }) || s("type|href|height|width", function(t, e, i) {
            if (!i) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }), _.attributes && o(function(t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
        }) || s("value", function(t, e, i) {
            if (!i && "input" === t.nodeName.toLowerCase()) return t.defaultValue
        }), o(function(t) {
            return null == t.getAttribute("disabled")
        }) || s(it, function(t, e, i) {
            var n;
            if (!i) return !0 === t[e] ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }), e
    }(t);
    ot.find = ht, ot.expr = ht.selectors, ot.expr[":"] = ot.expr.pseudos, ot.unique = ht.uniqueSort, ot.text = ht.getText, ot.isXMLDoc = ht.isXML, ot.contains = ht.contains;
    var ct = ot.expr.match.needsContext,
        ut = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        dt = /^.[^:#\[\.,]*$/;
    ot.filter = function(t, e, i) {
        var n = e[0];
        return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? ot.find.matchesSelector(n, t) ? [n] : [] : ot.find.matches(t, ot.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, ot.fn.extend({
        find: function(t) {
            var e, i = [],
                n = this,
                o = n.length;
            if ("string" != typeof t) return this.pushStack(ot(t).filter(function() {
                for (e = 0; e < o; e++)
                    if (ot.contains(n[e], this)) return !0
            }));
            for (e = 0; e < o; e++) ot.find(t, n[e], i);
            return i = this.pushStack(o > 1 ? ot.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
        },
        filter: function(t) {
            return this.pushStack(n(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(n(this, t || [], !0))
        },
        is: function(t) {
            return !!n(this, "string" == typeof t && ct.test(t) ? ot(t) : t || [], !1).length
        }
    });
    var pt, ft = t.document,
        mt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (ot.fn.init = function(t, e) {
        var i, n;
        if (!t) return this;
        if ("string" == typeof t) {
            if (!(i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : mt.exec(t)) || !i[1] && e) return !e || e.jquery ? (e || pt).find(t) : this.constructor(e).find(t);
            if (i[1]) {
                if (e = e instanceof ot ? e[0] : e, ot.merge(this, ot.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : ft, !0)), ut.test(i[1]) && ot.isPlainObject(e))
                    for (i in e) ot.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                return this
            }
            if ((n = ft.getElementById(i[2])) && n.parentNode) {
                if (n.id !== i[2]) return pt.find(t);
                this.length = 1, this[0] = n
            }
            return this.context = ft, this.selector = t, this
        }
        return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ot.isFunction(t) ? "undefined" != typeof pt.ready ? pt.ready(t) : t(ot) : (t.selector !== undefined && (this.selector = t.selector, this.context = t.context), ot.makeArray(t, this))
    }).prototype = ot.fn, pt = ot(ft);
    var gt = /^(?:parents|prev(?:Until|All))/,
        vt = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    ot.extend({
        dir: function(t, e, i) {
            for (var n = [], o = t[e]; o && 9 !== o.nodeType && (i === undefined || 1 !== o.nodeType || !ot(o).is(i));) 1 === o.nodeType && n.push(o), o = o[e];
            return n
        },
        sibling: function(t, e) {
            for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
            return i
        }
    }), ot.fn.extend({
        has: function(t) {
            var e, i = ot(t, this),
                n = i.length;
            return this.filter(function() {
                for (e = 0; e < n; e++)
                    if (ot.contains(this, i[e])) return !0
            })
        },
        closest: function(t, e) {
            for (var i, n = 0, o = this.length, s = [], a = ct.test(t) || "string" != typeof t ? ot(t, e || this.context) : 0; n < o; n++)
                for (i = this[n]; i && i !== e; i = i.parentNode)
                    if (i.nodeType < 11 && (a ? a.index(i) > -1 : 1 === i.nodeType && ot.find.matchesSelector(i, t))) {
                        s.push(i);
                        break
                    } return this.pushStack(s.length > 1 ? ot.unique(s) : s)
        },
        index: function(t) {
            return t ? "string" == typeof t ? ot.inArray(this[0], ot(t)) : ot.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(ot.unique(ot.merge(this.get(), ot(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), ot.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return ot.dir(t, "parentNode")
        },
        parentsUntil: function(t, e, i) {
            return ot.dir(t, "parentNode", i)
        },
        next: function(t) {
            return o(t, "nextSibling")
        },
        prev: function(t) {
            return o(t, "previousSibling")
        },
        nextAll: function(t) {
            return ot.dir(t, "nextSibling")
        },
        prevAll: function(t) {
            return ot.dir(t, "previousSibling")
        },
        nextUntil: function(t, e, i) {
            return ot.dir(t, "nextSibling", i)
        },
        prevUntil: function(t, e, i) {
            return ot.dir(t, "previousSibling", i)
        },
        siblings: function(t) {
            return ot.sibling((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return ot.sibling(t.firstChild)
        },
        contents: function(t) {
            return ot.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : ot.merge([], t.childNodes)
        }
    }, function(t, e) {
        ot.fn[t] = function(i, n) {
            var o = ot.map(this, e, i);
            return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (o = ot.filter(n, o)), this.length > 1 && (vt[t] || (o = ot.unique(o)), gt.test(t) && (o = o.reverse())), this.pushStack(o)
        }
    });
    var yt = /\S+/g,
        wt = {};
    ot.Callbacks = function(t) {
        t = "string" == typeof t ? wt[t] || s(t) : ot.extend({}, t);
        var e, i, n, o, a, r, l = [],
            h = !t.once && [],
            c = function(s) {
                for (i = t.memory && s, n = !0, a = r || 0, r = 0, o = l.length, e = !0; l && a < o; a++)
                    if (!1 === l[a].apply(s[0], s[1]) && t.stopOnFalse) {
                        i = !1;
                        break
                    } e = !1, l && (h ? h.length && c(h.shift()) : i ? l = [] : u.disable())
            },
            u = {
                add: function() {
                    if (l) {
                        var n = l.length;
                        ! function e(i) {
                            ot.each(i, function(i, n) {
                                var o = ot.type(n);
                                "function" === o ? t.unique && u.has(n) || l.push(n) : n && n.length && "string" !== o && e(n)
                            })
                        }(arguments), e ? o = l.length : i && (r = n, c(i))
                    }
                    return this
                },
                remove: function() {
                    return l && ot.each(arguments, function(t, i) {
                        for (var n;
                            (n = ot.inArray(i, l, n)) > -1;) l.splice(n, 1), e && (n <= o && o--, n <= a && a--)
                    }), this
                },
                has: function(t) {
                    return t ? ot.inArray(t, l) > -1 : !(!l || !l.length)
                },
                empty: function() {
                    return l = [], o = 0, this
                },
                disable: function() {
                    return l = h = i = undefined, this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return h = undefined, i || u.disable(), this
                },
                locked: function() {
                    return !h
                },
                fireWith: function(t, i) {
                    return !l || n && !h || (i = i || [], i = [t, i.slice ? i.slice() : i], e ? h.push(i) : c(i)), this
                },
                fire: function() {
                    return u.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return u
    }, ot.extend({
        Deferred: function(t) {
            var e = [
                    ["resolve", "done", ot.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", ot.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", ot.Callbacks("memory")]
                ],
                i = "pending",
                n = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var t = arguments;
                        return ot.Deferred(function(i) {
                            ot.each(e, function(e, s) {
                                var a = ot.isFunction(t[e]) && t[e];
                                o[s[1]](function() {
                                    var t = a && a.apply(this, arguments);
                                    t && ot.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[s[0] + "With"](this === n ? i.promise() : this, a ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? ot.extend(t, n) : n
                    }
                },
                o = {};
            return n.pipe = n.then, ot.each(e, function(t, s) {
                var a = s[2],
                    r = s[3];
                n[s[1]] = a.add, r && a.add(function() {
                    i = r
                }, e[1 ^ t][2].disable, e[2][2].lock), o[s[0]] = function() {
                    return o[s[0] + "With"](this === o ? n : this, arguments), this
                }, o[s[0] + "With"] = a.fireWith
            }), n.promise(o), t && t.call(o, o), o
        },
        when: function(t) {
            var e, i, n, o = 0,
                s = K.call(arguments),
                a = s.length,
                r = 1 !== a || t && ot.isFunction(t.promise) ? a : 0,
                l = 1 === r ? t : ot.Deferred(),
                h = function(t, i, n) {
                    return function(o) {
                        i[t] = this, n[t] = arguments.length > 1 ? K.call(arguments) : o, n === e ? l.notifyWith(i, n) : --r || l.resolveWith(i, n)
                    }
                };
            if (a > 1)
                for (e = new Array(a), i = new Array(a), n = new Array(a); o < a; o++) s[o] && ot.isFunction(s[o].promise) ? s[o].promise().done(h(o, n, s)).fail(l.reject).progress(h(o, i, e)) : --r;
            return r || l.resolveWith(n, s), l.promise()
        }
    });
    var bt;
    ot.fn.ready = function(t) {
        return ot.ready.promise().done(t), this
    }, ot.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(t) {
            t ? ot.readyWait++ : ot.ready(!0)
        },
        ready: function(t) {
            if (!0 === t ? !--ot.readyWait : !ot.isReady) {
                if (!ft.body) return setTimeout(ot.ready);
                ot.isReady = !0, !0 !== t && --ot.readyWait > 0 || (bt.resolveWith(ft, [ot]), ot.fn.triggerHandler && (ot(ft).triggerHandler("ready"), ot(ft).off("ready")))
            }
        }
    }), ot.ready.promise = function(e) {
        if (!bt)
            if (bt = ot.Deferred(), "complete" === ft.readyState) setTimeout(ot.ready);
            else if (ft.addEventListener) ft.addEventListener("DOMContentLoaded", r, !1), t.addEventListener("load", r, !1);
        else {
            ft.attachEvent("onreadystatechange", r), t.attachEvent("onload", r);
            var i = !1;
            try {
                i = null == t.frameElement && ft.documentElement
            } catch (t) {}
            i && i.doScroll && function t() {
                if (!ot.isReady) {
                    try {
                        i.doScroll("left")
                    } catch (e) {
                        return setTimeout(t, 50)
                    }
                    a(), ot.ready()
                }
            }()
        }
        return bt.promise(e)
    };
    var _t, xt = typeof undefined;
    for (_t in ot(it)) break;
    it.ownLast = "0" !== _t, it.inlineBlockNeedsLayout = !1, ot(function() {
            var t, e, i, n;
            (i = ft.getElementsByTagName("body")[0]) && i.style && (e = ft.createElement("div"), n = ft.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== xt && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", it.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (i.style.zoom = 1)), i.removeChild(n))
        }),
        function() {
            var t = ft.createElement("div");
            if (null == it.deleteExpando) {
                it.deleteExpando = !0;
                try {
                    delete t.test
                } catch (t) {
                    it.deleteExpando = !1
                }
            }
            t = null
        }(), ot.acceptData = function(t) {
            var e = ot.noData[(t.nodeName + " ").toLowerCase()],
                i = +t.nodeType || 1;
            return (1 === i || 9 === i) && (!e || !0 !== e && t.getAttribute("classid") === e)
        };
    var Ct = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        kt = /([A-Z])/g;
    ot.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(t) {
            return !!(t = t.nodeType ? ot.cache[t[ot.expando]] : t[ot.expando]) && !h(t)
        },
        data: function(t, e, i) {
            return c(t, e, i)
        },
        removeData: function(t, e) {
            return u(t, e)
        },
        _data: function(t, e, i) {
            return c(t, e, i, !0)
        },
        _removeData: function(t, e) {
            return u(t, e, !0)
        }
    }), ot.fn.extend({
        data: function(t, e) {
            var i, n, o, s = this[0],
                a = s && s.attributes;
            if (t === undefined) {
                if (this.length && (o = ot.data(s), 1 === s.nodeType && !ot._data(s, "parsedAttrs"))) {
                    for (i = a.length; i--;) a[i] && (n = a[i].name, 0 === n.indexOf("data-") && (n = ot.camelCase(n.slice(5)), l(s, n, o[n])));
                    ot._data(s, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof t ? this.each(function() {
                ot.data(this, t)
            }) : arguments.length > 1 ? this.each(function() {
                ot.data(this, t, e)
            }) : s ? l(s, t, ot.data(s, t)) : undefined
        },
        removeData: function(t) {
            return this.each(function() {
                ot.removeData(this, t)
            })
        }
    }), ot.extend({
        queue: function(t, e, i) {
            var n;
            if (t) return e = (e || "fx") + "queue", n = ot._data(t, e), i && (!n || ot.isArray(i) ? n = ot._data(t, e, ot.makeArray(i)) : n.push(i)), n || []
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var i = ot.queue(t, e),
                n = i.length,
                o = i.shift(),
                s = ot._queueHooks(t, e),
                a = function() {
                    ot.dequeue(t, e)
                };
            "inprogress" === o && (o = i.shift(), n--), o && ("fx" === e && i.unshift("inprogress"), delete s.stop, o.call(t, a, s)), !n && s && s.empty.fire()
        },
        _queueHooks: function(t, e) {
            var i = e + "queueHooks";
            return ot._data(t, i) || ot._data(t, i, {
                empty: ot.Callbacks("once memory").add(function() {
                    ot._removeData(t, e + "queue"), ot._removeData(t, i)
                })
            })
        }
    }), ot.fn.extend({
        queue: function(t, e) {
            var i = 2;
            return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? ot.queue(this[0], t) : e === undefined ? this : this.each(function() {
                var i = ot.queue(this, t, e);
                ot._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && ot.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                ot.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var i, n = 1,
                o = ot.Deferred(),
                s = this,
                a = this.length,
                r = function() {
                    --n || o.resolveWith(s, [s])
                };
            for ("string" != typeof t && (e = t, t = undefined), t = t || "fx"; a--;)(i = ot._data(s[a], t + "queueHooks")) && i.empty && (n++, i.empty.add(r));
            return r(), o.promise(e)
        }
    });
    var St = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Tt = ["Top", "Right", "Bottom", "Left"],
        zt = function(t, e) {
            return t = e || t, "none" === ot.css(t, "display") || !ot.contains(t.ownerDocument, t)
        },
        Dt = ot.access = function(t, e, i, n, o, s, a) {
            var r = 0,
                l = t.length,
                h = null == i;
            if ("object" === ot.type(i)) {
                o = !0;
                for (r in i) ot.access(t, e, r, i[r], !0, s, a)
            } else if (n !== undefined && (o = !0, ot.isFunction(n) || (a = !0), h && (a ? (e.call(t, n), e = null) : (h = e, e = function(t, e, i) {
                    return h.call(ot(t), i)
                })), e))
                for (; r < l; r++) e(t[r], i, a ? n : n.call(t[r], r, e(t[r], i)));
            return o ? t : h ? e.call(t) : l ? e(t[0], i) : s
        },
        Wt = /^(?:checkbox|radio)$/i;
    ! function() {
        var t = ft.createElement("input"),
            e = ft.createElement("div"),
            i = ft.createDocumentFragment();
        if (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", it.leadingWhitespace = 3 === e.firstChild.nodeType, it.tbody = !e.getElementsByTagName("tbody").length, it.htmlSerialize = !!e.getElementsByTagName("link").length, it.html5Clone = "<:nav></:nav>" !== ft.createElement("nav").cloneNode(!0).outerHTML, t.type = "checkbox", t.checked = !0, i.appendChild(t), it.appendChecked = t.checked, e.innerHTML = "<textarea>x</textarea>", it.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, i.appendChild(e), e.innerHTML = "<input type='radio' checked='checked' name='t'/>", it.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, it.noCloneEvent = !0, e.attachEvent && (e.attachEvent("onclick", function() {
                it.noCloneEvent = !1
            }), e.cloneNode(!0).click()), null == it.deleteExpando) {
            it.deleteExpando = !0;
            try {
                delete e.test
            } catch (t) {
                it.deleteExpando = !1
            }
        }
    }(),
    function() {
        var e, i, n = ft.createElement("div");
        for (e in {
                submit: !0,
                change: !0,
                focusin: !0
            }) i = "on" + e, (it[e + "Bubbles"] = i in t) || (n.setAttribute(i, "t"), it[e + "Bubbles"] = !1 === n.attributes[i].expando);
        n = null
    }();
    var Pt = /^(?:input|select|textarea)$/i,
        Et = /^key/,
        $t = /^(?:mouse|pointer|contextmenu)|click/,
        It = /^(?:focusinfocus|focusoutblur)$/,
        Mt = /^([^.]*)(?:\.(.+)|)$/;
    ot.event = {
        global: {},
        add: function(t, e, i, n, o) {
            var s, a, r, l, h, c, u, d, p, f, m, g = ot._data(t);
            if (g) {
                for (i.handler && (l = i, i = l.handler, o = l.selector), i.guid || (i.guid = ot.guid++), (a = g.events) || (a = g.events = {}), (c = g.handle) || (c = g.handle = function(t) {
                        return typeof ot === xt || t && ot.event.triggered === t.type ? undefined : ot.event.dispatch.apply(c.elem, arguments)
                    }, c.elem = t), e = (e || "").match(yt) || [""], r = e.length; r--;) s = Mt.exec(e[r]) || [], p = m = s[1], f = (s[2] || "").split(".").sort(), p && (h = ot.event.special[p] || {}, p = (o ? h.delegateType : h.bindType) || p, h = ot.event.special[p] || {}, u = ot.extend({
                    type: p,
                    origType: m,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: o,
                    needsContext: o && ot.expr.match.needsContext.test(o),
                    namespace: f.join(".")
                }, l), (d = a[p]) || (d = a[p] = [], d.delegateCount = 0, h.setup && !1 !== h.setup.call(t, n, f, c) || (t.addEventListener ? t.addEventListener(p, c, !1) : t.attachEvent && t.attachEvent("on" + p, c))), h.add && (h.add.call(t, u), u.handler.guid || (u.handler.guid = i.guid)), o ? d.splice(d.delegateCount++, 0, u) : d.push(u), ot.event.global[p] = !0);
                t = null
            }
        },
        remove: function(t, e, i, n, o) {
            var s, a, r, l, h, c, u, d, p, f, m, g = ot.hasData(t) && ot._data(t);
            if (g && (c = g.events)) {
                for (e = (e || "").match(yt) || [""], h = e.length; h--;)
                    if (r = Mt.exec(e[h]) || [], p = m = r[1], f = (r[2] || "").split(".").sort(), p) {
                        for (u = ot.event.special[p] || {}, p = (n ? u.delegateType : u.bindType) || p, d = c[p] || [], r = r[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = s = d.length; s--;) a = d[s], !o && m !== a.origType || i && i.guid !== a.guid || r && !r.test(a.namespace) || n && n !== a.selector && ("**" !== n || !a.selector) || (d.splice(s, 1), a.selector && d.delegateCount--, u.remove && u.remove.call(t, a));
                        l && !d.length && (u.teardown && !1 !== u.teardown.call(t, f, g.handle) || ot.removeEvent(t, p, g.handle), delete c[p])
                    } else
                        for (p in c) ot.event.remove(t, p + e[h], i, n, !0);
                ot.isEmptyObject(c) && (delete g.handle, ot._removeData(t, "events"))
            }
        },
        trigger: function(e, i, n, o) {
            var s, a, r, l, h, c, u, d = [n || ft],
                p = et.call(e, "type") ? e.type : e,
                f = et.call(e, "namespace") ? e.namespace.split(".") : [];
            if (r = c = n = n || ft, 3 !== n.nodeType && 8 !== n.nodeType && !It.test(p + ot.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), a = p.indexOf(":") < 0 && "on" + p, e = e[ot.expando] ? e : new ot.Event(p, "object" == typeof e && e), e.isTrigger = o ? 2 : 3, e.namespace = f.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), i = null == i ? [e] : ot.makeArray(i, [e]), h = ot.event.special[p] || {}, o || !h.trigger || !1 !== h.trigger.apply(n, i))) {
                if (!o && !h.noBubble && !ot.isWindow(n)) {
                    for (l = h.delegateType || p, It.test(l + p) || (r = r.parentNode); r; r = r.parentNode) d.push(r), c = r;
                    c === (n.ownerDocument || ft) && d.push(c.defaultView || c.parentWindow || t)
                }
                for (u = 0;
                    (r = d[u++]) && !e.isPropagationStopped();) e.type = u > 1 ? l : h.bindType || p, s = (ot._data(r, "events") || {})[e.type] && ot._data(r, "handle"), s && s.apply(r, i), (s = a && r[a]) && s.apply && ot.acceptData(r) && (e.result = s.apply(r, i), !1 === e.result && e.preventDefault());
                if (e.type = p, !o && !e.isDefaultPrevented() && (!h._default || !1 === h._default.apply(d.pop(), i)) && ot.acceptData(n) && a && n[p] && !ot.isWindow(n)) {
                    c = n[a], c && (n[a] = null), ot.event.triggered = p;
                    try {
                        n[p]()
                    } catch (t) {}
                    ot.event.triggered = undefined, c && (n[a] = c)
                }
                return e.result
            }
        },
        dispatch: function(t) {
            t = ot.event.fix(t);
            var e, i, n, o, s, a = [],
                r = K.call(arguments),
                l = (ot._data(this, "events") || {})[t.type] || [],
                h = ot.event.special[t.type] || {};
            if (r[0] = t, t.delegateTarget = this, !h.preDispatch || !1 !== h.preDispatch.call(this, t)) {
                for (a = ot.event.handlers.call(this, t, l), e = 0;
                    (o = a[e++]) && !t.isPropagationStopped();)
                    for (t.currentTarget = o.elem, s = 0;
                        (n = o.handlers[s++]) && !t.isImmediatePropagationStopped();) t.namespace_re && !t.namespace_re.test(n.namespace) || (t.handleObj = n, t.data = n.data, (i = ((ot.event.special[n.origType] || {}).handle || n.handler).apply(o.elem, r)) !== undefined && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()));
                return h.postDispatch && h.postDispatch.call(this, t), t.result
            }
        },
        handlers: function(t, e) {
            var i, n, o, s, a = [],
                r = e.delegateCount,
                l = t.target;
            if (r && l.nodeType && (!t.button || "click" !== t.type))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (!0 !== l.disabled || "click" !== t.type)) {
                        for (o = [], s = 0; s < r; s++) n = e[s], i = n.selector + " ", o[i] === undefined && (o[i] = n.needsContext ? ot(i, this).index(l) >= 0 : ot.find(i, this, null, [l]).length), o[i] && o.push(n);
                        o.length && a.push({
                            elem: l,
                            handlers: o
                        })
                    } return r < e.length && a.push({
                elem: this,
                handlers: e.slice(r)
            }), a
        },
        fix: function(t) {
            if (t[ot.expando]) return t;
            var e, i, n, o = t.type,
                s = t,
                a = this.fixHooks[o];
            for (a || (this.fixHooks[o] = a = $t.test(o) ? this.mouseHooks : Et.test(o) ? this.keyHooks : {}), n = a.props ? this.props.concat(a.props) : this.props, t = new ot.Event(s), e = n.length; e--;) i = n[e], t[i] = s[i];
            return t.target || (t.target = s.srcElement || ft), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, a.filter ? a.filter(t, s) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(t, e) {
                var i, n, o, s = e.button,
                    a = e.fromElement;
                return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || ft, o = n.documentElement, i = n.body, t.pageX = e.clientX + (o && o.scrollLeft || i && i.scrollLeft || 0) - (o && o.clientLeft || i && i.clientLeft || 0), t.pageY = e.clientY + (o && o.scrollTop || i && i.scrollTop || 0) - (o && o.clientTop || i && i.clientTop || 0)), !t.relatedTarget && a && (t.relatedTarget = a === t.target ? e.toElement : a), t.which || s === undefined || (t.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), t
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== f() && this.focus) try {
                        return this.focus(), !1
                    } catch (t) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === f() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (ot.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                },
                _default: function(t) {
                    return ot.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    t.result !== undefined && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function(t, e, i, n) {
            var o = ot.extend(new ot.Event, i, {
                type: t,
                isSimulated: !0,
                originalEvent: {}
            });
            n ? ot.event.trigger(o, null, e) : ot.event.dispatch.call(e, o), o.isDefaultPrevented() && i.preventDefault()
        }
    }, ot.removeEvent = ft.removeEventListener ? function(t, e, i) {
        t.removeEventListener && t.removeEventListener(e, i, !1)
    } : function(t, e, i) {
        var n = "on" + e;
        t.detachEvent && (typeof t[n] === xt && (t[n] = null), t.detachEvent(n, i))
    }, ot.Event = function(t, e) {
        if (!(this instanceof ot.Event)) return new ot.Event(t, e);
        t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.defaultPrevented === undefined && !1 === t.returnValue ? d : p) : this.type = t, e && ot.extend(this, e), this.timeStamp = t && t.timeStamp || ot.now(), this[ot.expando] = !0
    }, ot.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = d, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = d, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = d, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, ot.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        ot.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var i, n = this,
                    o = t.relatedTarget,
                    s = t.handleObj;
                return o && (o === n || ot.contains(n, o)) || (t.type = s.origType, i = s.handler.apply(this, arguments), t.type = e), i
            }
        }
    }), it.submitBubbles || (ot.event.special.submit = {
        setup: function() {
            if (ot.nodeName(this, "form")) return !1;
            ot.event.add(this, "click._submit keypress._submit", function(t) {
                var e = t.target,
                    i = ot.nodeName(e, "input") || ot.nodeName(e, "button") ? e.form : undefined;
                i && !ot._data(i, "submitBubbles") && (ot.event.add(i, "submit._submit", function(t) {
                    t._submit_bubble = !0
                }), ot._data(i, "submitBubbles", !0))
            })
        },
        postDispatch: function(t) {
            t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && ot.event.simulate("submit", this.parentNode, t, !0))
        },
        teardown: function() {
            if (ot.nodeName(this, "form")) return !1;
            ot.event.remove(this, "._submit")
        }
    }), it.changeBubbles || (ot.event.special.change = {
        setup: function() {
            if (Pt.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (ot.event.add(this, "propertychange._change", function(t) {
                "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
            }), ot.event.add(this, "click._change", function(t) {
                this._just_changed && !t.isTrigger && (this._just_changed = !1), ot.event.simulate("change", this, t, !0)
            })), !1;
            ot.event.add(this, "beforeactivate._change", function(t) {
                var e = t.target;
                Pt.test(e.nodeName) && !ot._data(e, "changeBubbles") && (ot.event.add(e, "change._change", function(t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || ot.event.simulate("change", this.parentNode, t, !0)
                }), ot._data(e, "changeBubbles", !0))
            })
        },
        handle: function(t) {
            var e = t.target;
            if (this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type) return t.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return ot.event.remove(this, "._change"), !Pt.test(this.nodeName)
        }
    }), it.focusinBubbles || ot.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var i = function(t) {
            ot.event.simulate(e, t.target, ot.event.fix(t), !0)
        };
        ot.event.special[e] = {
            setup: function() {
                var n = this.ownerDocument || this,
                    o = ot._data(n, e);
                o || n.addEventListener(t, i, !0), ot._data(n, e, (o || 0) + 1)
            },
            teardown: function() {
                var n = this.ownerDocument || this,
                    o = ot._data(n, e) - 1;
                o ? ot._data(n, e, o) : (n.removeEventListener(t, i, !0), ot._removeData(n, e))
            }
        }
    }), ot.fn.extend({
        on: function(t, e, i, n, o) {
            var s, a;
            if ("object" == typeof t) {
                "string" != typeof e && (i = i || e, e = undefined);
                for (s in t) this.on(s, e, i, t[s], o);
                return this
            }
            if (null == i && null == n ? (n = e, i = e = undefined) : null == n && ("string" == typeof e ? (n = i, i = undefined) : (n = i, i = e, e = undefined)), !1 === n) n = p;
            else if (!n) return this;
            return 1 === o && (a = n, n = function(t) {
                return ot().off(t), a.apply(this, arguments)
            }, n.guid = a.guid || (a.guid = ot.guid++)), this.each(function() {
                ot.event.add(this, t, n, i, e)
            })
        },
        one: function(t, e, i, n) {
            return this.on(t, e, i, n, 1)
        },
        off: function(t, e, i) {
            var n, o;
            if (t && t.preventDefault && t.handleObj) return n = t.handleObj, ot(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
            if ("object" == typeof t) {
                for (o in t) this.off(o, e, t[o]);
                return this
            }
            return !1 !== e && "function" != typeof e || (i = e, e = undefined), !1 === i && (i = p), this.each(function() {
                ot.event.remove(this, t, i, e)
            })
        },
        trigger: function(t, e) {
            return this.each(function() {
                ot.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var i = this[0];
            if (i) return ot.event.trigger(t, e, i, !0)
        }
    });
    var At = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Ht = / jQuery\d+="(?:null|\d+)"/g,
        Ot = new RegExp("<(?:" + At + ")[\\s/>]", "i"),
        Lt = /^\s+/,
        Nt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Rt = /<([\w:]+)/,
        Bt = /<tbody/i,
        jt = /<|&#?\w+;/,
        Ft = /<(?:script|style|link)/i,
        qt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Yt = /^$|\/(?:java|ecma)script/i,
        Xt = /^true\/(.*)/,
        Ut = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Vt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: it.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        Kt = m(ft),
        Qt = Kt.appendChild(ft.createElement("div"));
    Vt.optgroup = Vt.option, Vt.tbody = Vt.tfoot = Vt.colgroup = Vt.caption = Vt.thead, Vt.th = Vt.td, ot.extend({
        clone: function(t, e, i) {
            var n, o, s, a, r, l = ot.contains(t.ownerDocument, t);
            if (it.html5Clone || ot.isXMLDoc(t) || !Ot.test("<" + t.nodeName + ">") ? s = t.cloneNode(!0) : (Qt.innerHTML = t.outerHTML, Qt.removeChild(s = Qt.firstChild)), !(it.noCloneEvent && it.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ot.isXMLDoc(t)))
                for (n = g(s), r = g(t), a = 0; null != (o = r[a]); ++a) n[a] && C(o, n[a]);
            if (e)
                if (i)
                    for (r = r || g(t), n = n || g(s), a = 0; null != (o = r[a]); a++) x(o, n[a]);
                else x(t, s);
            return n = g(s, "script"), n.length > 0 && _(n, !l && g(t, "script")), n = r = o = null, s
        },
        buildFragment: function(t, e, i, n) {
            for (var o, s, a, r, l, h, c, u = t.length, d = m(e), p = [], f = 0; f < u; f++)
                if ((s = t[f]) || 0 === s)
                    if ("object" === ot.type(s)) ot.merge(p, s.nodeType ? [s] : s);
                    else if (jt.test(s)) {
                for (r = r || d.appendChild(e.createElement("div")), l = (Rt.exec(s) || ["", ""])[1].toLowerCase(), c = Vt[l] || Vt._default, r.innerHTML = c[1] + s.replace(Nt, "<$1></$2>") + c[2], o = c[0]; o--;) r = r.lastChild;
                if (!it.leadingWhitespace && Lt.test(s) && p.push(e.createTextNode(Lt.exec(s)[0])), !it.tbody)
                    for (s = "table" !== l || Bt.test(s) ? "<table>" !== c[1] || Bt.test(s) ? 0 : r : r.firstChild, o = s && s.childNodes.length; o--;) ot.nodeName(h = s.childNodes[o], "tbody") && !h.childNodes.length && s.removeChild(h);
                for (ot.merge(p, r.childNodes), r.textContent = ""; r.firstChild;) r.removeChild(r.firstChild);
                r = d.lastChild
            } else p.push(e.createTextNode(s));
            for (r && d.removeChild(r), it.appendChecked || ot.grep(g(p, "input"), v), f = 0; s = p[f++];)
                if ((!n || -1 === ot.inArray(s, n)) && (a = ot.contains(s.ownerDocument, s), r = g(d.appendChild(s), "script"), a && _(r), i))
                    for (o = 0; s = r[o++];) Yt.test(s.type || "") && i.push(s);
            return r = null, d
        },
        cleanData: function(t, e) {
            for (var i, n, o, s, a = 0, r = ot.expando, l = ot.cache, h = it.deleteExpando, c = ot.event.special; null != (i = t[a]); a++)
                if ((e || ot.acceptData(i)) && (o = i[r], s = o && l[o])) {
                    if (s.events)
                        for (n in s.events) c[n] ? ot.event.remove(i, n) : ot.removeEvent(i, n, s.handle);
                    l[o] && (delete l[o], h ? delete i[r] : typeof i.removeAttribute !== xt ? i.removeAttribute(r) : i[r] = null, V.push(o))
                }
        }
    }), ot.fn.extend({
        text: function(t) {
            return Dt(this, function(t) {
                return t === undefined ? ot.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ft).createTextNode(t))
            }, null, t, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    y(this, t).appendChild(t)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        remove: function(t, e) {
            for (var i, n = t ? ot.filter(t, this) : this, o = 0; null != (i = n[o]); o++) e || 1 !== i.nodeType || ot.cleanData(g(i)), i.parentNode && (e && ot.contains(i.ownerDocument, i) && _(g(i, "script")), i.parentNode.removeChild(i));
            return this
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && ot.cleanData(g(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                t.options && ot.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        },
        clone: function(t, e) {
            return t = null != t && t, e = null == e ? t : e, this.map(function() {
                return ot.clone(this, t, e)
            })
        },
        html: function(t) {
            return Dt(this, function(t) {
                var e = this[0] || {},
                    i = 0,
                    n = this.length;
                if (t === undefined) return 1 === e.nodeType ? e.innerHTML.replace(Ht, "") : undefined;
                if ("string" == typeof t && !Ft.test(t) && (it.htmlSerialize || !Ot.test(t)) && (it.leadingWhitespace || !Lt.test(t)) && !Vt[(Rt.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = t.replace(Nt, "<$1></$2>");
                    try {
                        for (; i < n; i++) e = this[i] || {}, 1 === e.nodeType && (ot.cleanData(g(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (t) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = arguments[0];
            return this.domManip(arguments, function(e) {
                t = this.parentNode, ot.cleanData(g(this)), t && t.replaceChild(e, this)
            }), t && (t.length || t.nodeType) ? this : this.remove()
        },
        detach: function(t) {
            return this.remove(t, !0)
        },
        domManip: function(t, e) {
            t = Q.apply([], t);
            var i, n, o, s, a, r, l = 0,
                h = this.length,
                c = this,
                u = h - 1,
                d = t[0],
                p = ot.isFunction(d);
            if (p || h > 1 && "string" == typeof d && !it.checkClone && qt.test(d)) return this.each(function(i) {
                var n = c.eq(i);
                p && (t[0] = d.call(this, i, n.html())), n.domManip(t, e)
            });
            if (h && (r = ot.buildFragment(t, this[0].ownerDocument, !1, this), i = r.firstChild, 1 === r.childNodes.length && (r = i), i)) {
                for (s = ot.map(g(r, "script"), w), o = s.length; l < h; l++) n = r, l !== u && (n = ot.clone(n, !0, !0), o && ot.merge(s, g(n, "script"))), e.call(this[l], n, l);
                if (o)
                    for (a = s[s.length - 1].ownerDocument, ot.map(s, b), l = 0; l < o; l++) n = s[l], Yt.test(n.type || "") && !ot._data(n, "globalEval") && ot.contains(a, n) && (n.src ? ot._evalUrl && ot._evalUrl(n.src) : ot.globalEval((n.text || n.textContent || n.innerHTML || "").replace(Ut, "")));
                r = i = null
            }
            return this
        }
    }), ot.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        ot.fn[t] = function(t) {
            for (var i, n = 0, o = [], s = ot(t), a = s.length - 1; n <= a; n++) i = n === a ? this : this.clone(!0), ot(s[n])[e](i), Z.apply(o, i.get());
            return this.pushStack(o)
        }
    });
    var Zt, Gt = {};
    ! function() {
        var t;
        it.shrinkWrapBlocks = function() {
            if (null != t) return t;
            t = !1;
            var e, i, n;
            return (i = ft.getElementsByTagName("body")[0]) && i.style ? (e = ft.createElement("div"), n = ft.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== xt && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(ft.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), i.removeChild(n), t) : void 0
        }
    }();
    var Jt, te, ee = /^margin/,
        ie = new RegExp("^(" + St + ")(?!px)[a-z%]+$", "i"),
        ne = /^(top|right|bottom|left)$/;
    t.getComputedStyle ? (Jt = function(t) {
            return t.ownerDocument.defaultView.getComputedStyle(t, null)
        }, te = function(t, e, i) {
            var n, o, s, a, r = t.style;
            return i = i || Jt(t), a = i ? i.getPropertyValue(e) || i[e] : undefined, i && ("" !== a || ot.contains(t.ownerDocument, t) || (a = ot.style(t, e)), ie.test(a) && ee.test(e) && (n = r.width, o = r.minWidth, s = r.maxWidth, r.minWidth = r.maxWidth = r.width = a, a = i.width, r.width = n, r.minWidth = o, r.maxWidth = s)), a === undefined ? a : a + ""
        }) : ft.documentElement.currentStyle && (Jt = function(t) {
            return t.currentStyle
        }, te = function(t, e, i) {
            var n, o, s, a, r = t.style;
            return i = i || Jt(t), a = i ? i[e] : undefined, null == a && r && r[e] && (a = r[e]), ie.test(a) && !ne.test(e) && (n = r.left, o = t.runtimeStyle, s = o && o.left, s && (o.left = t.currentStyle.left), r.left = "fontSize" === e ? "1em" : a, a = r.pixelLeft + "px", r.left = n, s && (o.left = s)), a === undefined ? a : a + "" || "auto"
        }),
        function() {
            function e() {
                var e, i, n, o;
                (i = ft.getElementsByTagName("body")[0]) && i.style && (e = ft.createElement("div"), n = ft.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", s = a = !1, l = !0, t.getComputedStyle && (s = "1%" !== (t.getComputedStyle(e, null) || {}).top, a = "4px" === (t.getComputedStyle(e, null) || {
                    width: "4px"
                }).width, o = e.appendChild(ft.createElement("div")), o.style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", o.style.marginRight = o.style.width = "0", e.style.width = "1px", l = !parseFloat((t.getComputedStyle(o, null) || {}).marginRight)), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = e.getElementsByTagName("td"), o[0].style.cssText = "margin:0;border:0;padding:0;display:none", r = 0 === o[0].offsetHeight, r && (o[0].style.display = "", o[1].style.display = "none", r = 0 === o[0].offsetHeight), i.removeChild(n))
            }
            var i, n, o, s, a, r, l;
            i = ft.createElement("div"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", o = i.getElementsByTagName("a")[0], (n = o && o.style) && (n.cssText = "float:left;opacity:.5", it.opacity = "0.5" === n.opacity, it.cssFloat = !!n.cssFloat, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", it.clearCloneStyle = "content-box" === i.style.backgroundClip, it.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing, ot.extend(it, {
                reliableHiddenOffsets: function() {
                    return null == r && e(), r
                },
                boxSizingReliable: function() {
                    return null == a && e(), a
                },
                pixelPosition: function() {
                    return null == s && e(), s
                },
                reliableMarginRight: function() {
                    return null == l && e(), l
                }
            }))
        }(), ot.swap = function(t, e, i, n) {
            var o, s, a = {};
            for (s in e) a[s] = t.style[s], t.style[s] = e[s];
            o = i.apply(t, n || []);
            for (s in e) t.style[s] = a[s];
            return o
        };
    var oe = /alpha\([^)]*\)/i,
        se = /opacity\s*=\s*([^)]*)/,
        ae = /^(none|table(?!-c[ea]).+)/,
        re = new RegExp("^(" + St + ")(.*)$", "i"),
        le = new RegExp("^([+-])=(" + St + ")", "i"),
        he = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ce = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        ue = ["Webkit", "O", "Moz", "ms"];
    ot.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var i = te(t, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": it.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var o, s, a, r = ot.camelCase(e),
                    l = t.style;
                if (e = ot.cssProps[r] || (ot.cssProps[r] = z(l, r)), a = ot.cssHooks[e] || ot.cssHooks[r], i === undefined) return a && "get" in a && (o = a.get(t, !1, n)) !== undefined ? o : l[e];
                if (s = typeof i, "string" === s && (o = le.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(ot.css(t, e)), s = "number"), null != i && i === i && ("number" !== s || ot.cssNumber[r] || (i += "px"), it.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(a && "set" in a && (i = a.set(t, i, n)) === undefined))) try {
                    l[e] = i
                } catch (t) {}
            }
        },
        css: function(t, e, i, n) {
            var o, s, a, r = ot.camelCase(e);
            return e = ot.cssProps[r] || (ot.cssProps[r] = z(t.style, r)), a = ot.cssHooks[e] || ot.cssHooks[r], a && "get" in a && (s = a.get(t, !0, i)), s === undefined && (s = te(t, e, n)), "normal" === s && e in ce && (s = ce[e]), "" === i || i ? (o = parseFloat(s), !0 === i || ot.isNumeric(o) ? o || 0 : s) : s
        }
    }), ot.each(["height", "width"], function(t, e) {
        ot.cssHooks[e] = {
            get: function(t, i, n) {
                if (i) return ae.test(ot.css(t, "display")) && 0 === t.offsetWidth ? ot.swap(t, he, function() {
                    return E(t, e, n)
                }) : E(t, e, n)
            },
            set: function(t, i, n) {
                var o = n && Jt(t);
                return W(t, i, n ? P(t, e, n, it.boxSizing && "border-box" === ot.css(t, "boxSizing", !1, o), o) : 0)
            }
        }
    }), it.opacity || (ot.cssHooks.opacity = {
        get: function(t, e) {
            return se.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        },
        set: function(t, e) {
            var i = t.style,
                n = t.currentStyle,
                o = ot.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                s = n && n.filter || i.filter || "";
            i.zoom = 1, (e >= 1 || "" === e) && "" === ot.trim(s.replace(oe, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === e || n && !n.filter) || (i.filter = oe.test(s) ? s.replace(oe, o) : s + " " + o)
        }
    }), ot.cssHooks.marginRight = T(it.reliableMarginRight, function(t, e) {
        if (e) return ot.swap(t, {
            display: "inline-block"
        }, te, [t, "marginRight"])
    }), ot.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        ot.cssHooks[t + e] = {
            expand: function(i) {
                for (var n = 0, o = {}, s = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++) o[t + Tt[n] + e] = s[n] || s[n - 2] || s[0];
                return o
            }
        }, ee.test(t) || (ot.cssHooks[t + e].set = W)
    }), ot.fn.extend({
        css: function(t, e) {
            return Dt(this, function(t, e, i) {
                var n, o, s = {},
                    a = 0;
                if (ot.isArray(e)) {
                    for (n = Jt(t), o = e.length; a < o; a++) s[e[a]] = ot.css(t, e[a], !1, n);
                    return s
                }
                return i !== undefined ? ot.style(t, e, i) : ot.css(t, e)
            }, t, e, arguments.length > 1)
        },
        show: function() {
            return D(this, !0)
        },
        hide: function() {
            return D(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                zt(this) ? ot(this).show() : ot(this).hide()
            })
        }
    }), ot.Tween = $, $.prototype = {
        constructor: $,
        init: function(t, e, i, n, o, s) {
            this.elem = t, this.prop = i, this.easing = o || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = s || (ot.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var t = $.propHooks[this.prop];
            return t && t.get ? t.get(this) : $.propHooks._default.get(this)
        },
        run: function(t) {
            var e, i = $.propHooks[this.prop];
            return this.options.duration ? this.pos = e = ot.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : $.propHooks._default.set(this), this
        }
    }, $.prototype.init.prototype = $.prototype, $.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = ot.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            },
            set: function(t) {
                ot.fx.step[t.prop] ? ot.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[ot.cssProps[t.prop]] || ot.cssHooks[t.prop]) ? ot.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, $.propHooks.scrollTop = $.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, ot.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, ot.fx = $.prototype.init, ot.fx.step = {};
    var de, pe, fe = /^(?:toggle|show|hide)$/,
        me = new RegExp("^(?:([+-])=|)(" + St + ")([a-z%]*)$", "i"),
        ge = /queueHooks$/,
        ve = [H],
        ye = {
            "*": [function(t, e) {
                var i = this.createTween(t, e),
                    n = i.cur(),
                    o = me.exec(e),
                    s = o && o[3] || (ot.cssNumber[t] ? "" : "px"),
                    a = (ot.cssNumber[t] || "px" !== s && +n) && me.exec(ot.css(i.elem, t)),
                    r = 1,
                    l = 20;
                if (a && a[3] !== s) {
                    s = s || a[3], o = o || [], a = +n || 1;
                    do {
                        r = r || ".5", a /= r, ot.style(i.elem, t, a + s)
                    } while (r !== (r = i.cur() / n) && 1 !== r && --l)
                }
                return o && (a = i.start = +a || +n || 0, i.unit = s, i.end = o[1] ? a + (o[1] + 1) * o[2] : +o[2]), i
            }]
        };
    ot.Animation = ot.extend(L, {
            tweener: function(t, e) {
                ot.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                for (var i, n = 0, o = t.length; n < o; n++) i = t[n], ye[i] = ye[i] || [], ye[i].unshift(e)
            },
            prefilter: function(t, e) {
                e ? ve.unshift(t) : ve.push(t)
            }
        }), ot.speed = function(t, e, i) {
            var n = t && "object" == typeof t ? ot.extend({}, t) : {
                complete: i || !i && e || ot.isFunction(t) && t,
                duration: t,
                easing: i && e || e && !ot.isFunction(e) && e
            };
            return n.duration = ot.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in ot.fx.speeds ? ot.fx.speeds[n.duration] : ot.fx.speeds._default, null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                ot.isFunction(n.old) && n.old.call(this), n.queue && ot.dequeue(this, n.queue)
            }, n
        }, ot.fn.extend({
            fadeTo: function(t, e, i, n) {
                return this.filter(zt).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, i, n)
            },
            animate: function(t, e, i, n) {
                var o = ot.isEmptyObject(t),
                    s = ot.speed(e, i, n),
                    a = function() {
                        var e = L(this, ot.extend({}, t), s);
                        (o || ot._data(this, "finish")) && e.stop(!0)
                    };
                return a.finish = a, o || !1 === s.queue ? this.each(a) : this.queue(s.queue, a)
            },
            stop: function(t, e, i) {
                var n = function(t) {
                    var e = t.stop;
                    delete t.stop, e(i)
                };
                return "string" != typeof t && (i = e, e = t, t = undefined), e && !1 !== t && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        o = null != t && t + "queueHooks",
                        s = ot.timers,
                        a = ot._data(this);
                    if (o) a[o] && a[o].stop && n(a[o]);
                    else
                        for (o in a) a[o] && a[o].stop && ge.test(o) && n(a[o]);
                    for (o = s.length; o--;) s[o].elem !== this || null != t && s[o].queue !== t || (s[o].anim.stop(i), e = !1, s.splice(o, 1));
                    !e && i || ot.dequeue(this, t)
                })
            },
            finish: function(t) {
                return !1 !== t && (t = t || "fx"), this.each(function() {
                    var e, i = ot._data(this),
                        n = i[t + "queue"],
                        o = i[t + "queueHooks"],
                        s = ot.timers,
                        a = n ? n.length : 0;
                    for (i.finish = !0, ot.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = s.length; e--;) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                    for (e = 0; e < a; e++) n[e] && n[e].finish && n[e].finish.call(this);
                    delete i.finish
                })
            }
        }), ot.each(["toggle", "show", "hide"], function(t, e) {
            var i = ot.fn[e];
            ot.fn[e] = function(t, n, o) {
                return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(M(e, !0), t, n, o)
            }
        }), ot.each({
            slideDown: M("show"),
            slideUp: M("hide"),
            slideToggle: M("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            ot.fn[t] = function(t, i, n) {
                return this.animate(e, t, i, n)
            }
        }), ot.timers = [], ot.fx.tick = function() {
            var t, e = ot.timers,
                i = 0;
            for (de = ot.now(); i < e.length; i++)(t = e[i])() || e[i] !== t || e.splice(i--, 1);
            e.length || ot.fx.stop(), de = undefined
        }, ot.fx.timer = function(t) {
            ot.timers.push(t), t() ? ot.fx.start() : ot.timers.pop()
        }, ot.fx.interval = 13, ot.fx.start = function() {
            pe || (pe = setInterval(ot.fx.tick, ot.fx.interval))
        }, ot.fx.stop = function() {
            clearInterval(pe), pe = null
        }, ot.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ot.fn.delay = function(t, e) {
            return t = ot.fx ? ot.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
                var n = setTimeout(e, t);
                i.stop = function() {
                    clearTimeout(n)
                }
            })
        },
        function() {
            var t, e, i, n, o;
            e = ft.createElement("div"), e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = e.getElementsByTagName("a")[0], i = ft.createElement("select"), o = i.appendChild(ft.createElement("option")), t = e.getElementsByTagName("input")[0], n.style.cssText = "top:1px", it.getSetAttribute = "t" !== e.className, it.style = /top/.test(n.getAttribute("style")), it.hrefNormalized = "/a" === n.getAttribute("href"), it.checkOn = !!t.value, it.optSelected = o.selected, it.enctype = !!ft.createElement("form").enctype, i.disabled = !0, it.optDisabled = !o.disabled, t = ft.createElement("input"), t.setAttribute("value", ""), it.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), it.radioValue = "t" === t.value
        }();
    var we = /\r/g;
    ot.fn.extend({
        val: function(t) {
            var e, i, n, o = this[0]; {
                if (arguments.length) return n = ot.isFunction(t), this.each(function(i) {
                    var o;
                    1 === this.nodeType && (o = n ? t.call(this, i, ot(this).val()) : t, null == o ? o = "" : "number" == typeof o ? o += "" : ot.isArray(o) && (o = ot.map(o, function(t) {
                            return null == t ? "" : t + ""
                        })),
                        (e = ot.valHooks[this.type] || ot.valHooks[this.nodeName.toLowerCase()]) && "set" in e && e.set(this, o, "value") !== undefined || (this.value = o))
                });
                if (o) return (e = ot.valHooks[o.type] || ot.valHooks[o.nodeName.toLowerCase()]) && "get" in e && (i = e.get(o, "value")) !== undefined ? i : (i = o.value, "string" == typeof i ? i.replace(we, "") : null == i ? "" : i)
            }
        }
    }), ot.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = ot.find.attr(t, "value");
                    return null != e ? e : ot.trim(ot.text(t))
                }
            },
            select: {
                get: function(t) {
                    for (var e, i, n = t.options, o = t.selectedIndex, s = "select-one" === t.type || o < 0, a = s ? null : [], r = s ? o + 1 : n.length, l = o < 0 ? r : s ? o : 0; l < r; l++)
                        if (i = n[l], (i.selected || l === o) && (it.optDisabled ? !i.disabled : null === i.getAttribute("disabled")) && (!i.parentNode.disabled || !ot.nodeName(i.parentNode, "optgroup"))) {
                            if (e = ot(i).val(), s) return e;
                            a.push(e)
                        } return a
                },
                set: function(t, e) {
                    for (var i, n, o = t.options, s = ot.makeArray(e), a = o.length; a--;)
                        if (n = o[a], ot.inArray(ot.valHooks.option.get(n), s) >= 0) try {
                            n.selected = i = !0
                        } catch (t) {
                            n.scrollHeight
                        } else n.selected = !1;
                    return i || (t.selectedIndex = -1), o
                }
            }
        }
    }), ot.each(["radio", "checkbox"], function() {
        ot.valHooks[this] = {
            set: function(t, e) {
                if (ot.isArray(e)) return t.checked = ot.inArray(ot(t).val(), e) >= 0
            }
        }, it.checkOn || (ot.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var be, _e, xe = ot.expr.attrHandle,
        Ce = /^(?:checked|selected)$/i,
        ke = it.getSetAttribute,
        Se = it.input;
    ot.fn.extend({
        attr: function(t, e) {
            return Dt(this, ot.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                ot.removeAttr(this, t)
            })
        }
    }), ot.extend({
        attr: function(t, e, i) {
            var n, o, s = t.nodeType;
            if (t && 3 !== s && 8 !== s && 2 !== s) return typeof t.getAttribute === xt ? ot.prop(t, e, i) : (1 === s && ot.isXMLDoc(t) || (e = e.toLowerCase(), n = ot.attrHooks[e] || (ot.expr.match.bool.test(e) ? _e : be)), i === undefined ? n && "get" in n && null !== (o = n.get(t, e)) ? o : (o = ot.find.attr(t, e), null == o ? undefined : o) : null !== i ? n && "set" in n && (o = n.set(t, i, e)) !== undefined ? o : (t.setAttribute(e, i + ""), i) : void ot.removeAttr(t, e))
        },
        removeAttr: function(t, e) {
            var i, n, o = 0,
                s = e && e.match(yt);
            if (s && 1 === t.nodeType)
                for (; i = s[o++];) n = ot.propFix[i] || i, ot.expr.match.bool.test(i) ? Se && ke || !Ce.test(i) ? t[n] = !1 : t[ot.camelCase("default-" + i)] = t[n] = !1 : ot.attr(t, i, ""), t.removeAttribute(ke ? i : n)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!it.radioValue && "radio" === e && ot.nodeName(t, "input")) {
                        var i = t.value;
                        return t.setAttribute("type", e), i && (t.value = i), e
                    }
                }
            }
        }
    }), _e = {
        set: function(t, e, i) {
            return !1 === e ? ot.removeAttr(t, i) : Se && ke || !Ce.test(i) ? t.setAttribute(!ke && ot.propFix[i] || i, i) : t[ot.camelCase("default-" + i)] = t[i] = !0, i
        }
    }, ot.each(ot.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var i = xe[e] || ot.find.attr;
        xe[e] = Se && ke || !Ce.test(e) ? function(t, e, n) {
            var o, s;
            return n || (s = xe[e], xe[e] = o, o = null != i(t, e, n) ? e.toLowerCase() : null, xe[e] = s), o
        } : function(t, e, i) {
            if (!i) return t[ot.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }), Se && ke || (ot.attrHooks.value = {
        set: function(t, e, i) {
            if (!ot.nodeName(t, "input")) return be && be.set(t, e, i);
            t.defaultValue = e
        }
    }), ke || (be = {
        set: function(t, e, i) {
            var n = t.getAttributeNode(i);
            if (n || t.setAttributeNode(n = t.ownerDocument.createAttribute(i)), n.value = e += "", "value" === i || e === t.getAttribute(i)) return e
        }
    }, xe.id = xe.name = xe.coords = function(t, e, i) {
        var n;
        if (!i) return (n = t.getAttributeNode(e)) && "" !== n.value ? n.value : null
    }, ot.valHooks.button = {
        get: function(t, e) {
            var i = t.getAttributeNode(e);
            if (i && i.specified) return i.value
        },
        set: be.set
    }, ot.attrHooks.contenteditable = {
        set: function(t, e, i) {
            be.set(t, "" !== e && e, i)
        }
    }, ot.each(["width", "height"], function(t, e) {
        ot.attrHooks[e] = {
            set: function(t, i) {
                if ("" === i) return t.setAttribute(e, "auto"), i
            }
        }
    })), it.style || (ot.attrHooks.style = {
        get: function(t) {
            return t.style.cssText || undefined
        },
        set: function(t, e) {
            return t.style.cssText = e + ""
        }
    });
    var Te = /^(?:input|select|textarea|button|object)$/i,
        ze = /^(?:a|area)$/i;
    ot.fn.extend({
        prop: function(t, e) {
            return Dt(this, ot.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return t = ot.propFix[t] || t, this.each(function() {
                try {
                    this[t] = undefined, delete this[t]
                } catch (t) {}
            })
        }
    }), ot.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(t, e, i) {
            var n, o, s, a = t.nodeType;
            if (t && 3 !== a && 8 !== a && 2 !== a) return s = 1 !== a || !ot.isXMLDoc(t), s && (e = ot.propFix[e] || e, o = ot.propHooks[e]), i !== undefined ? o && "set" in o && (n = o.set(t, i, e)) !== undefined ? n : t[e] = i : o && "get" in o && null !== (n = o.get(t, e)) ? n : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = ot.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : Te.test(t.nodeName) || ze.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        }
    }), it.hrefNormalized || ot.each(["href", "src"], function(t, e) {
        ot.propHooks[e] = {
            get: function(t) {
                return t.getAttribute(e, 4)
            }
        }
    }), it.optSelected || (ot.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    }), ot.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ot.propFix[this.toLowerCase()] = this
    }), it.enctype || (ot.propFix.enctype = "encoding");
    var De = /[\t\r\n\f]/g;
    ot.fn.extend({
        addClass: function(t) {
            var e, i, n, o, s, a, r = 0,
                l = this.length,
                h = "string" == typeof t && t;
            if (ot.isFunction(t)) return this.each(function(e) {
                ot(this).addClass(t.call(this, e, this.className))
            });
            if (h)
                for (e = (t || "").match(yt) || []; r < l; r++)
                    if (i = this[r], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(De, " ") : " ")) {
                        for (s = 0; o = e[s++];) n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                        a = ot.trim(n), i.className !== a && (i.className = a)
                    } return this
        },
        removeClass: function(t) {
            var e, i, n, o, s, a, r = 0,
                l = this.length,
                h = 0 === arguments.length || "string" == typeof t && t;
            if (ot.isFunction(t)) return this.each(function(e) {
                ot(this).removeClass(t.call(this, e, this.className))
            });
            if (h)
                for (e = (t || "").match(yt) || []; r < l; r++)
                    if (i = this[r], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(De, " ") : "")) {
                        for (s = 0; o = e[s++];)
                            for (; n.indexOf(" " + o + " ") >= 0;) n = n.replace(" " + o + " ", " ");
                        a = t ? ot.trim(n) : "", i.className !== a && (i.className = a)
                    } return this
        },
        toggleClass: function(t, e) {
            var i = typeof t;
            return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : ot.isFunction(t) ? this.each(function(i) {
                ot(this).toggleClass(t.call(this, i, this.className, e), e)
            }) : this.each(function() {
                if ("string" === i)
                    for (var e, n = 0, o = ot(this), s = t.match(yt) || []; e = s[n++];) o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                else i !== xt && "boolean" !== i || (this.className && ot._data(this, "__className__", this.className), this.className = this.className || !1 === t ? "" : ot._data(this, "__className__") || "")
            })
        },
        hasClass: function(t) {
            for (var e = " " + t + " ", i = 0, n = this.length; i < n; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(De, " ").indexOf(e) >= 0) return !0;
            return !1
        }
    }), ot.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
        ot.fn[e] = function(t, i) {
            return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
        }
    }), ot.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        },
        bind: function(t, e, i) {
            return this.on(t, null, e, i)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, i, n) {
            return this.on(e, t, i, n)
        },
        undelegate: function(t, e, i) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
        }
    });
    var We = ot.now(),
        Pe = /\?/,
        Ee = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ot.parseJSON = function(e) {
        if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
        var i, n = null,
            o = ot.trim(e + "");
        return o && !ot.trim(o.replace(Ee, function(t, e, o, s) {
            return i && e && (n = 0), 0 === n ? t : (i = o || e, n += !s - !o, "")
        })) ? Function("return " + o)() : ot.error("Invalid JSON: " + e)
    }, ot.parseXML = function(e) {
        var i, n;
        if (!e || "string" != typeof e) return null;
        try {
            t.DOMParser ? (n = new DOMParser, i = n.parseFromString(e, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(e))
        } catch (t) {
            i = undefined
        }
        return i && i.documentElement && !i.getElementsByTagName("parsererror").length || ot.error("Invalid XML: " + e), i
    };
    var $e, Ie, Me = /#.*$/,
        Ae = /([?&])_=[^&]*/,
        He = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Oe = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Le = /^(?:GET|HEAD)$/,
        Ne = /^\/\//,
        Re = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Be = {},
        je = {},
        Fe = "*/".concat("*");
    try {
        Ie = location.href
    } catch (t) {
        Ie = ft.createElement("a"), Ie.href = "", Ie = Ie.href
    }
    $e = Re.exec(Ie.toLowerCase()) || [], ot.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ie,
            type: "GET",
            isLocal: Oe.test($e[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Fe,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": ot.parseJSON,
                "text xml": ot.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? B(B(t, ot.ajaxSettings), e) : B(ot.ajaxSettings, t)
        },
        ajaxPrefilter: N(Be),
        ajaxTransport: N(je),
        ajax: function(t, e) {
            function i(t, e, i, n) {
                var o, c, v, y, b, x = e;
                2 !== w && (w = 2, r && clearTimeout(r), h = undefined, a = n || "", _.readyState = t > 0 ? 4 : 0, o = t >= 200 && t < 300 || 304 === t, i && (y = j(u, _, i)), y = F(u, y, _, o), o ? (u.ifModified && (b = _.getResponseHeader("Last-Modified"), b && (ot.lastModified[s] = b), (b = _.getResponseHeader("etag")) && (ot.etag[s] = b)), 204 === t || "HEAD" === u.type ? x = "nocontent" : 304 === t ? x = "notmodified" : (x = y.state, c = y.data, v = y.error, o = !v)) : (v = x, !t && x || (x = "error", t < 0 && (t = 0))), _.status = t, _.statusText = (e || x) + "", o ? f.resolveWith(d, [c, x, _]) : f.rejectWith(d, [_, x, v]), _.statusCode(g), g = undefined, l && p.trigger(o ? "ajaxSuccess" : "ajaxError", [_, u, o ? c : v]), m.fireWith(d, [_, x]), l && (p.trigger("ajaxComplete", [_, u]), --ot.active || ot.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (e = t, t = undefined), e = e || {};
            var n, o, s, a, r, l, h, c, u = ot.ajaxSetup({}, e),
                d = u.context || u,
                p = u.context && (d.nodeType || d.jquery) ? ot(d) : ot.event,
                f = ot.Deferred(),
                m = ot.Callbacks("once memory"),
                g = u.statusCode || {},
                v = {},
                y = {},
                w = 0,
                b = "canceled",
                _ = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (2 === w) {
                            if (!c)
                                for (c = {}; e = He.exec(a);) c[e[1].toLowerCase()] = e[2];
                            e = c[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? a : null
                    },
                    setRequestHeader: function(t, e) {
                        var i = t.toLowerCase();
                        return w || (t = y[i] = y[i] || t, v[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return w || (u.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (w < 2)
                                for (e in t) g[e] = [g[e], t[e]];
                            else _.always(t[_.status]);
                        return this
                    },
                    abort: function(t) {
                        var e = t || b;
                        return h && h.abort(e), i(0, e), this
                    }
                };
            if (f.promise(_).complete = m.add, _.success = _.done, _.error = _.fail, u.url = ((t || u.url || Ie) + "").replace(Me, "").replace(Ne, $e[1] + "//"), u.type = e.method || e.type || u.method || u.type, u.dataTypes = ot.trim(u.dataType || "*").toLowerCase().match(yt) || [""], null == u.crossDomain && (n = Re.exec(u.url.toLowerCase()), u.crossDomain = !(!n || n[1] === $e[1] && n[2] === $e[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === ($e[3] || ("http:" === $e[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = ot.param(u.data, u.traditional)), R(Be, u, e, _), 2 === w) return _;
            l = u.global, l && 0 == ot.active++ && ot.event.trigger("ajaxStart"), u.type = u.type.toUpperCase(), u.hasContent = !Le.test(u.type), s = u.url, u.hasContent || (u.data && (s = u.url += (Pe.test(s) ? "&" : "?") + u.data, delete u.data), !1 === u.cache && (u.url = Ae.test(s) ? s.replace(Ae, "$1_=" + We++) : s + (Pe.test(s) ? "&" : "?") + "_=" + We++)), u.ifModified && (ot.lastModified[s] && _.setRequestHeader("If-Modified-Since", ot.lastModified[s]), ot.etag[s] && _.setRequestHeader("If-None-Match", ot.etag[s])), (u.data && u.hasContent && !1 !== u.contentType || e.contentType) && _.setRequestHeader("Content-Type", u.contentType), _.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + Fe + "; q=0.01" : "") : u.accepts["*"]);
            for (o in u.headers) _.setRequestHeader(o, u.headers[o]);
            if (u.beforeSend && (!1 === u.beforeSend.call(d, _, u) || 2 === w)) return _.abort();
            b = "abort";
            for (o in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) _[o](u[o]);
            if (h = R(je, u, e, _)) {
                _.readyState = 1, l && p.trigger("ajaxSend", [_, u]), u.async && u.timeout > 0 && (r = setTimeout(function() {
                    _.abort("timeout")
                }, u.timeout));
                try {
                    w = 1, h.send(v, i)
                } catch (t) {
                    if (!(w < 2)) throw t;
                    i(-1, t)
                }
            } else i(-1, "No Transport");
            return _
        },
        getJSON: function(t, e, i) {
            return ot.get(t, e, i, "json")
        },
        getScript: function(t, e) {
            return ot.get(t, undefined, e, "script")
        }
    }), ot.each(["get", "post"], function(t, e) {
        ot[e] = function(t, i, n, o) {
            return ot.isFunction(i) && (o = o || n, n = i, i = undefined), ot.ajax({
                url: t,
                type: e,
                dataType: o,
                data: i,
                success: n
            })
        }
    }), ot.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        ot.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), ot._evalUrl = function(t) {
        return ot.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, ot.fn.extend({
        wrapAll: function(t) {
            if (ot.isFunction(t)) return this.each(function(e) {
                ot(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = ot(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            return ot.isFunction(t) ? this.each(function(e) {
                ot(this).wrapInner(t.call(this, e))
            }) : this.each(function() {
                var e = ot(this),
                    i = e.contents();
                i.length ? i.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = ot.isFunction(t);
            return this.each(function(i) {
                ot(this).wrapAll(e ? t.call(this, i) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                ot.nodeName(this, "body") || ot(this).replaceWith(this.childNodes)
            }).end()
        }
    }), ot.expr.filters.hidden = function(t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !it.reliableHiddenOffsets() && "none" === (t.style && t.style.display || ot.css(t, "display"))
    }, ot.expr.filters.visible = function(t) {
        return !ot.expr.filters.hidden(t)
    };
    var qe = /%20/g,
        Ye = /\[\]$/,
        Xe = /\r?\n/g,
        Ue = /^(?:submit|button|image|reset|file)$/i,
        Ve = /^(?:input|select|textarea|keygen)/i;
    ot.param = function(t, e) {
        var i, n = [],
            o = function(t, e) {
                e = ot.isFunction(e) ? e() : null == e ? "" : e, n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
        if (e === undefined && (e = ot.ajaxSettings && ot.ajaxSettings.traditional), ot.isArray(t) || t.jquery && !ot.isPlainObject(t)) ot.each(t, function() {
            o(this.name, this.value)
        });
        else
            for (i in t) q(i, t[i], e, o);
        return n.join("&").replace(qe, "+")
    }, ot.fn.extend({
        serialize: function() {
            return ot.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = ot.prop(this, "elements");
                return t ? ot.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !ot(this).is(":disabled") && Ve.test(this.nodeName) && !Ue.test(t) && (this.checked || !Wt.test(t))
            }).map(function(t, e) {
                var i = ot(this).val();
                return null == i ? null : ot.isArray(i) ? ot.map(i, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Xe, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: i.replace(Xe, "\r\n")
                }
            }).get()
        }
    }), ot.ajaxSettings.xhr = t.ActiveXObject !== undefined ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Y() || X()
    } : Y;
    var Ke = 0,
        Qe = {},
        Ze = ot.ajaxSettings.xhr();
    t.ActiveXObject && ot(t).on("unload", function() {
        for (var t in Qe) Qe[t](undefined, !0)
    }), it.cors = !!Ze && "withCredentials" in Ze, Ze = it.ajax = !!Ze, Ze && ot.ajaxTransport(function(t) {
        if (!t.crossDomain || it.cors) {
            var e;
            return {
                send: function(i, n) {
                    var o, s = t.xhr(),
                        a = ++Ke;
                    if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (o in t.xhrFields) s[o] = t.xhrFields[o];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (o in i) i[o] !== undefined && s.setRequestHeader(o, i[o] + "");
                    s.send(t.hasContent && t.data || null), e = function(i, o) {
                        var r, l, h;
                        if (e && (o || 4 === s.readyState))
                            if (delete Qe[a], e = undefined, s.onreadystatechange = ot.noop, o) 4 !== s.readyState && s.abort();
                            else {
                                h = {}, r = s.status, "string" == typeof s.responseText && (h.text = s.responseText);
                                try {
                                    l = s.statusText
                                } catch (t) {
                                    l = ""
                                }
                                r || !t.isLocal || t.crossDomain ? 1223 === r && (r = 204) : r = h.text ? 200 : 404
                            } h && n(r, l, h, s.getAllResponseHeaders())
                    }, t.async ? 4 === s.readyState ? setTimeout(e) : s.onreadystatechange = Qe[a] = e : e()
                },
                abort: function() {
                    e && e(undefined, !0)
                }
            }
        }
    }), ot.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(t) {
                return ot.globalEval(t), t
            }
        }
    }), ot.ajaxPrefilter("script", function(t) {
        t.cache === undefined && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), ot.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var e, i = ft.head || ot("head")[0] || ft.documentElement;
            return {
                send: function(n, o) {
                    e = ft.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function(t, i) {
                        (i || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, i || o(200, "success"))
                    }, i.insertBefore(e, i.firstChild)
                },
                abort: function() {
                    e && e.onload(undefined, !0)
                }
            }
        }
    });
    var Ge = [],
        Je = /(=)\?(?=&|$)|\?\?/;
    ot.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = Ge.pop() || ot.expando + "_" + We++;
            return this[t] = !0, t
        }
    }), ot.ajaxPrefilter("json jsonp", function(e, i, n) {
        var o, s, a, r = !1 !== e.jsonp && (Je.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Je.test(e.data) && "data");
        if (r || "jsonp" === e.dataTypes[0]) return o = e.jsonpCallback = ot.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, r ? e[r] = e[r].replace(Je, "$1" + o) : !1 !== e.jsonp && (e.url += (Pe.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function() {
            return a || ot.error(o + " was not called"), a[0]
        }, e.dataTypes[0] = "json", s = t[o], t[o] = function() {
            a = arguments
        }, n.always(function() {
            t[o] = s, e[o] && (e.jsonpCallback = i.jsonpCallback, Ge.push(o)), a && ot.isFunction(s) && s(a[0]), a = s = undefined
        }), "script"
    }), ot.parseHTML = function(t, e, i) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && (i = e, e = !1), e = e || ft;
        var n = ut.exec(t),
            o = !i && [];
        return n ? [e.createElement(n[1])] : (n = ot.buildFragment([t], e, o), o && o.length && ot(o).remove(), ot.merge([], n.childNodes))
    };
    var ti = ot.fn.load;
    ot.fn.load = function(t, e, i) {
        if ("string" != typeof t && ti) return ti.apply(this, arguments);
        var n, o, s, a = this,
            r = t.indexOf(" ");
        return r >= 0 && (n = ot.trim(t.slice(r, t.length)), t = t.slice(0, r)), ot.isFunction(e) ? (i = e, e = undefined) : e && "object" == typeof e && (s = "POST"), a.length > 0 && ot.ajax({
            url: t,
            type: s,
            dataType: "html",
            data: e
        }).done(function(t) {
            o = arguments, a.html(n ? ot("<div>").append(ot.parseHTML(t)).find(n) : t)
        }).complete(i && function(t, e) {
            a.each(i, o || [t.responseText, e, t])
        }), this
    }, ot.expr.filters.animated = function(t) {
        return ot.grep(ot.timers, function(e) {
            return t === e.elem
        }).length
    };
    var ei = t.document.documentElement;
    ot.offset = {
        setOffset: function(t, e, i) {
            var n, o, s, a, r, l, h, c = ot.css(t, "position"),
                u = ot(t),
                d = {};
            "static" === c && (t.style.position = "relative"), r = u.offset(), s = ot.css(t, "top"), l = ot.css(t, "left"), h = ("absolute" === c || "fixed" === c) && ot.inArray("auto", [s, l]) > -1, h ? (n = u.position(), a = n.top, o = n.left) : (a = parseFloat(s) || 0, o = parseFloat(l) || 0), ot.isFunction(e) && (e = e.call(t, i, r)), null != e.top && (d.top = e.top - r.top + a), null != e.left && (d.left = e.left - r.left + o), "using" in e ? e.using.call(t, d) : u.css(d)
        }
    }, ot.fn.extend({
        offset: function(t) {
            if (arguments.length) return t === undefined ? this : this.each(function(e) {
                ot.offset.setOffset(this, t, e)
            });
            var e, i, n = {
                    top: 0,
                    left: 0
                },
                o = this[0],
                s = o && o.ownerDocument;
            if (s) return e = s.documentElement, ot.contains(e, o) ? (typeof o.getBoundingClientRect !== xt && (n = o.getBoundingClientRect()), i = U(s), {
                top: n.top + (i.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: n.left + (i.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : n
        },
        position: function() {
            if (this[0]) {
                var t, e, i = {
                        top: 0,
                        left: 0
                    },
                    n = this[0];
                return "fixed" === ot.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ot.nodeName(t[0], "html") || (i = t.offset()), i.top += ot.css(t[0], "borderTopWidth", !0), i.left += ot.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - i.top - ot.css(n, "marginTop", !0),
                    left: e.left - i.left - ot.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || ei; t && !ot.nodeName(t, "html") && "static" === ot.css(t, "position");) t = t.offsetParent;
                return t || ei
            })
        }
    }), ot.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, e) {
        var i = /Y/.test(e);
        ot.fn[t] = function(n) {
            return Dt(this, function(t, n, o) {
                var s = U(t);
                if (o === undefined) return s ? e in s ? s[e] : s.document.documentElement[n] : t[n];
                s ? s.scrollTo(i ? ot(s).scrollLeft() : o, i ? o : ot(s).scrollTop()) : t[n] = o
            }, t, n, arguments.length, null)
        }
    }), ot.each(["top", "left"], function(t, e) {
        ot.cssHooks[e] = T(it.pixelPosition, function(t, i) {
            if (i) return i = te(t, e), ie.test(i) ? ot(t).position()[e] + "px" : i
        })
    }), ot.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        ot.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(i, n) {
            ot.fn[n] = function(n, o) {
                var s = arguments.length && (i || "boolean" != typeof n),
                    a = i || (!0 === n || !0 === o ? "margin" : "border");
                return Dt(this, function(e, i, n) {
                    var o;
                    return ot.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (o = e.documentElement, Math.max(e.body["scroll" + t], o["scroll" + t], e.body["offset" + t], o["offset" + t], o["client" + t])) : n === undefined ? ot.css(e, i, a) : ot.style(e, i, n, a)
                }, e, s ? n : undefined, s, null)
            }
        })
    }), ot.fn.size = function() {
        return this.length
    }, ot.fn.andSelf = ot.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ot
    });
    var ii = t.jQuery,
        ni = t.$;
    return ot.noConflict = function(e) {
        return t.$ === ot && (t.$ = ni), e && t.jQuery === ot && (t.jQuery = ii), ot
    }, typeof e === xt && (t.jQuery = t.$ = ot), ot
}),
function(t, e) {
    var i;
    t.rails = i = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not(button[type])",
        disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input:file",
        linkDisableSelector: "a[data-disable-with]",
        CSRFProtection: function(e) {
            var i = t('meta[name="csrf-token"]').attr("content");
            i && e.setRequestHeader("X-CSRF-Token", i)
        },
        fire: function(e, i, n) {
            var o = t.Event(i);
            return e.trigger(o, n), !1 !== o.result
        },
        confirm: function(t) {
            return confirm(t)
        },
        ajax: function(e) {
            return t.ajax(e)
        },
        handleRemote: function(n) {
            var o, s, a, r, l = n.data("cross-domain") || null,
                h = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType;
            if (i.fire(n, "ajax:before")) {
                if (n.is("form")) {
                    o = n.attr("method"), s = n.attr("action"), a = n.serializeArray();
                    var c = n.data("ujs:submit-button");
                    c && (a.push(c), n.data("ujs:submit-button", null))
                } else n.is(i.inputChangeSelector) ? (o = n.data("method"), s = n.data("url"), a = n.serialize(), n.data("params") && (a = a + "&" + n.data("params"))) : (o = n.data("method"), s = n.attr("href"), a = n.data("params") || null);
                return r = {
                    type: o || "GET",
                    data: a,
                    dataType: h,
                    crossDomain: l,
                    beforeSend: function(t, o) {
                        return o.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), i.fire(n, "ajax:beforeSend", [t, o])
                    },
                    success: function(t, e, i) {
                        n.trigger("ajax:success", [t, e, i])
                    },
                    complete: function(t, e) {
                        n.trigger("ajax:complete", [t, e])
                    },
                    error: function(t, e, i) {
                        n.trigger("ajax:error", [t, e, i])
                    }
                }, s && (r.url = s), i.ajax(r)
            }
            return !1
        },
        handleMethod: function(i) {
            var n = i.attr("href"),
                o = i.data("method"),
                s = i.attr("target"),
                a = t("meta[name=csrf-token]").attr("content"),
                r = t("meta[name=csrf-param]").attr("content"),
                l = t('<form method="post" action="' + n + '"></form>'),
                h = '<input name="_method" value="' + o + '" type="hidden" />';
            r !== e && a !== e && (h += '<input name="' + r + '" value="' + a + '" type="hidden" />'), s && l.attr("target", s), l.hide().append(h).appendTo("body"), l.submit()
        },
        disableFormElements: function(e) {
            e.find(i.disableSelector).each(function() {
                var e = t(this),
                    i = e.is("button") ? "html" : "val";
                e.data("ujs:enable-with", e[i]()), e[i](e.data("disable-with")), e.prop("disabled", !0)
            })
        },
        enableFormElements: function(e) {
            e.find(i.enableSelector).each(function() {
                var e = t(this),
                    i = e.is("button") ? "html" : "val";
                e.data("ujs:enable-with") && e[i](e.data("ujs:enable-with")), e.prop("disabled", !1)
            })
        },
        allowAction: function(t) {
            var e, n = t.data("confirm"),
                o = !1;
            return !n || (i.fire(t, "confirm") && (o = i.confirm(n), e = i.fire(t, "confirm:complete", [o])), o && e)
        },
        blankInputs: function(e, i, n) {
            var o, s = t(),
                a = i || "input,textarea";
            return e.find(a).each(function() {
                o = t(this), (n ? o.val() : !o.val()) && (s = s.add(o))
            }), !!s.length && s
        },
        nonBlankInputs: function(t, e) {
            return i.blankInputs(t, e, !0)
        },
        stopEverything: function(e) {
            return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        callFormSubmitBindings: function(i, n) {
            var o = i.data("events"),
                s = !0;
            return o !== e && o.submit !== e && t.each(o.submit, function(t, e) {
                if ("function" == typeof e.handler) return s = e.handler(n)
            }), s
        },
        disableElement: function(t) {
            t.data("ujs:enable-with", t.html()), t.html(t.data("disable-with")), t.bind("click.railsDisable", function(t) {
                return i.stopEverything(t)
            })
        },
        enableElement: function(t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.data("ujs:enable-with", !1)), t.unbind("click.railsDisable")
        }
    }, t.ajaxPrefilter(function(t, e, n) {
        t.crossDomain || i.CSRFProtection(n)
    }), t(document).delegate(i.linkDisableSelector, "ajax:complete", function() {
        i.enableElement(t(this))
    }), t(document).delegate(i.linkClickSelector, "click.rails", function(n) {
        var o = t(this),
            s = o.data("method"),
            a = o.data("params");
        return i.allowAction(o) ? (o.is(i.linkDisableSelector) && i.disableElement(o), o.data("remote") !== e ? !(!n.metaKey && !n.ctrlKey || s && "GET" !== s || a) || (!1 === i.handleRemote(o) && i.enableElement(o), !1) : o.data("method") ? (i.handleMethod(o), !1) : void 0) : i.stopEverything(n)
    }), t(document).delegate(i.inputChangeSelector, "change.rails", function(e) {
        var n = t(this);
        return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
    }), t(document).delegate(i.formSubmitSelector, "submit.rails", function(n) {
        var o = t(this),
            s = o.data("remote") !== e,
            a = i.blankInputs(o, i.requiredInputSelector),
            r = i.nonBlankInputs(o, i.fileInputSelector);
        return i.allowAction(o) ? a && o.attr("novalidate") == e && i.fire(o, "ajax:aborted:required", [a]) ? i.stopEverything(n) : s ? r ? i.fire(o, "ajax:aborted:file", [r]) : !t.support.submitBubbles && t().jquery < "1.7" && !1 === i.callFormSubmitBindings(o, n) ? i.stopEverything(n) : (i.handleRemote(o), !1) : void setTimeout(function() {
            i.disableFormElements(o)
        }, 13) : i.stopEverything(n)
    }), t(document).delegate(i.formInputClickSelector, "click.rails", function(e) {
        var n = t(this);
        if (!i.allowAction(n)) return i.stopEverything(e);
        var o = n.attr("name"),
            s = o ? {
                name: o,
                value: n.val()
            } : null;
        n.closest("form").data("ujs:submit-button", s)
    }), t(document).delegate(i.formSubmitSelector, "ajax:beforeSend.rails", function(e) {
        this == e.target && i.disableFormElements(t(this))
    }), t(document).delegate(i.formSubmitSelector, "ajax:complete.rails", function(e) {
        this == e.target && i.enableFormElements(t(this))
    })
}(jQuery),
function(t, e, i, n) {
    function o(e, i) {
        this.settings = null, this.options = t.extend({}, o.Defaults, i), this.$element = t(e), this.drag = t.extend({}, d), this.state = t.extend({}, p), this.e = t.extend({}, f), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], t.each(o.Plugins, t.proxy(function(t, e) {
            this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(this)
        }, this)), t.each(o.Pipe, t.proxy(function(e, i) {
            this._pipe.push({
                filter: i.filter,
                run: t.proxy(i.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }

    function s(t) {
        if (t.touches !== n) return {
            x: t.touches[0].pageX,
            y: t.touches[0].pageY
        };
        if (t.touches === n) {
            if (t.pageX !== n) return {
                x: t.pageX,
                y: t.pageY
            };
            if (t.pageX === n) return {
                x: t.clientX,
                y: t.clientY
            }
        }
    }

    function a(t) {
        var e, n, o = i.createElement("div"),
            s = t;
        for (e in s)
            if (n = s[e], "undefined" != typeof o.style[n]) return o = null, [n, e];
        return [!1]
    }

    function r() {
        return a(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }

    function l() {
        return a(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }

    function h() {
        return a(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }

    function c() {
        return "ontouchstart" in e || !!navigator.msMaxTouchPoints
    }

    function u() {
        return e.navigator.msPointerEnabled
    }
    var d, p, f;
    d = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    }, p = {
        isTouch: !1,
        isScrolling: !1,
        isSwiping: !1,
        direction: !1,
        inMotion: !1
    }, f = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    }, o.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    }, o.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, o.Plugins = {}, o.Pipe = [{
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var t = this._clones;
            (this.$stage.children(".cloned").length !== t.length || !this.settings.loop && t.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var t, e, i = this._clones,
                n = this._items,
                o = this.settings.loop ? i.length - Math.max(2 * this.settings.items, 4) : 0;
            for (t = 0, e = Math.abs(o / 2); e > t; t++) o > 0 ? (this.$stage.children().eq(n.length + i.length - 1).remove(), i.pop(), this.$stage.children().eq(0).remove(), i.pop()) : (i.push(i.length / 2), this.$stage.append(n[i[i.length - 1]].clone().addClass("cloned")), i.push(n.length - 1 - (i.length - 1) / 2), this.$stage.prepend(n[i[i.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var t, e, i, n = this.settings.rtl ? 1 : -1,
                o = (this.width() / this.settings.items).toFixed(3),
                s = 0;
            for (this._coordinates = [], e = 0, i = this._clones.length + this._items.length; i > e; e++) t = this._mergers[this.relative(e)], t = this.settings.mergeFit && Math.min(t, this.settings.items) || t, s += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : o * t) * n, this._coordinates.push(s)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var e, i, n = (this.width() / this.settings.items).toFixed(3),
                o = {
                    width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                    "padding-left": this.settings.stagePadding || "",
                    "padding-right": this.settings.stagePadding || ""
                };
            if (this.$stage.css(o), o = {
                    width: this.settings.autoWidth ? "auto" : n - this.settings.margin
                }, o[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && t.grep(this._mergers, function(t) {
                    return t > 1
                }).length > 0)
                for (e = 0, i = this._coordinates.length; i > e; e++) o.width = Math.abs(this._coordinates[e]) - Math.abs(this._coordinates[e - 1] || 0) - this.settings.margin, this.$stage.children().eq(e).css(o);
            else this.$stage.children().css(o)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current && this.reset(this.$stage.children().index(t.current))
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var t, e, i, n, o = this.settings.rtl ? 1 : -1,
                s = 2 * this.settings.stagePadding,
                a = this.coordinates(this.current()) + s,
                r = a + this.width() * o,
                l = [];
            for (i = 0, n = this._coordinates.length; n > i; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + s * o, (this.op(t, "<=", a) && this.op(t, ">", r) || this.op(e, "<", a) && this.op(e, ">", r)) && l.push(i);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }], o.prototype.initialize = function() {
        if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && !0 !== this.state.imagesLoaded) {
            var e, i, o;
            if (e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n, o = this.$element.children(i).width(), e.length && 0 >= o) return this.preloadAutoWidthImages(e), !1
        }
        this.$element.addClass("owl-loading"), this.$stage = t("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()),
            this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, o.prototype.setup = function() {
        var e = this.viewport(),
            i = this.options.responsive,
            n = -1,
            o = null;
        i ? (t.each(i, function(t) {
            e >= t && t > n && (n = Number(t))
        }), o = t.extend({}, this.options, i[n]), delete o.responsive, o.responsiveClass && this.$element.attr("class", function(t, e) {
            return e.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + n)) : o = t.extend({}, this.options), (null === this.settings || this._breakpoint !== n) && (this.trigger("change", {
            property: {
                name: "settings",
                value: o
            }
        }), this._breakpoint = n, this.settings = o, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, o.prototype.optionsLogic = function() {
        this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, o.prototype.prepare = function(e) {
        var i = this.trigger("prepare", {
            content: e
        });
        return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(e)), this.trigger("prepared", {
            content: i.data
        }), i.data
    }, o.prototype.update = function() {
        for (var e = 0, i = this._pipe.length, n = t.proxy(function(t) {
                return this[t]
            }, this._invalidated), o = {}; i > e;)(this._invalidated.all || t.grep(this._pipe[e].filter, n).length > 0) && this._pipe[e].run(o), e++;
        this._invalidated = {}
    }, o.prototype.width = function(t) {
        switch (t = t || o.Width.Default) {
            case o.Width.Inner:
            case o.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, o.prototype.refresh = function() {
        if (0 === this._items.length) return !1;
        (new Date).getTime(), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = e.orientation, this.watchVisibility(), this.trigger("refreshed")
    }, o.prototype.eventsCall = function() {
        this.e._onDragStart = t.proxy(function(t) {
            this.onDragStart(t)
        }, this), this.e._onDragMove = t.proxy(function(t) {
            this.onDragMove(t)
        }, this), this.e._onDragEnd = t.proxy(function(t) {
            this.onDragEnd(t)
        }, this), this.e._onResize = t.proxy(function(t) {
            this.onResize(t)
        }, this), this.e._transitionEnd = t.proxy(function(t) {
            this.transitionEnd(t)
        }, this), this.e._preventClick = t.proxy(function(t) {
            this.preventClick(t)
        }, this)
    }, o.prototype.onThrottledResize = function() {
        e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }, o.prototype.onResize = function() {
        return !!this._items.length && (this._width !== this.$element.width() && (!this.trigger("resize").isDefaultPrevented() && (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized"))))
    }, o.prototype.eventsRouter = function(t) {
        var e = t.type;
        "mousedown" === e || "touchstart" === e ? this.onDragStart(t) : "mousemove" === e || "touchmove" === e ? this.onDragMove(t) : "mouseup" === e || "touchend" === e ? this.onDragEnd(t) : "touchcancel" === e && this.onDragEnd(t)
    }, o.prototype.internalEvents = function() {
        var i = (c(), u());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", t.proxy(function(t) {
            this.eventsRouter(t)
        }, this)), this.$stage.on("dragstart", function() {
            return !1
        }), this.$stage.get(0).onselectstart = function() {
            return !1
        }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !i && this.$stage.on("touchstart touchcancel", t.proxy(function(t) {
            this.eventsRouter(t)
        }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), !1 !== this.settings.responsive && this.on(e, "resize", t.proxy(this.onThrottledResize, this))
    }, o.prototype.onDragStart = function(n) {
        var o, a, r, l;
        if (o = n.originalEvent || n || e.event, 3 === o.which || this.state.isTouch) return !1;
        if ("mousedown" === o.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, a = s(o).x, r = s(o).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) l = this.getTransformProperty(), this.drag.offsetX = l, this.animate(l), this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
        this.drag.startX = a - this.drag.offsetX, this.drag.startY = r - this.drag.offsetY, this.drag.start = a - this.drag.startX, this.drag.targetEl = o.target || o.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), t(i).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", t.proxy(function(t) {
            this.eventsRouter(t)
        }, this))
    }, o.prototype.onDragMove = function(t) {
        var i, o, a, r, l, h;
        this.state.isTouch && (this.state.isScrolling || (i = t.originalEvent || t || e.event, o = s(i).x, a = s(i).y, this.drag.currentX = o - this.drag.startX, this.drag.currentY = a - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (r = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), l = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), h = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, r + h), l + h)), (this.drag.distance > 8 || this.drag.distance < -8) && (i.preventDefault !== n ? i.preventDefault() : i.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && !1 === this.state.isSwiping && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, o.prototype.onDragEnd = function(e) {
        var n, o, s;
        if (this.state.isTouch) {
            if ("mouseup" === e.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && !0 !== this.state.inMotion) return this.state.inMotion = !1, !1;
            this.drag.endTime = (new Date).getTime(), n = this.drag.endTime - this.drag.startTime, o = Math.abs(this.drag.distance), (o > 3 || n > 300) && this.removeClick(this.drag.targetEl), s = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(s), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(s) || this.transitionEnd(), this.drag.distance = 0, t(i).off(".owl.dragEvents")
        }
    }, o.prototype.removeClick = function(i) {
        this.drag.targetEl = i, t(i).on("click.preventClick", this.e._preventClick), e.setTimeout(function() {
            t(i).off("click.preventClick")
        }, 300)
    }, o.prototype.preventClick = function(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), t(e.target).off("click.preventClick")
    }, o.prototype.getTransformProperty = function() {
        var t, i;
        return t = e.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), t = t.replace(/matrix(3d)?\(|\)/g, "").split(","), i = 16 === t.length, !0 !== i ? t[4] : t[12]
    }, o.prototype.closest = function(e) {
        var i = -1,
            n = 30,
            o = this.width(),
            s = this.coordinates();
        return this.settings.freeDrag || t.each(s, t.proxy(function(t, a) {
            return e > a - n && a + n > e ? i = t : this.op(e, "<", a) && this.op(e, ">", s[t + 1] || a - o) && (i = "left" === this.state.direction ? t + 1 : t), -1 === i
        }, this)), this.settings.loop || (this.op(e, ">", s[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", s[this.maximum()]) && (i = e = this.maximum())), i
    }, o.prototype.animate = function(e) {
        this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
            transform: "translate3d(" + e + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
            left: e + "px"
        }) : this.$stage.animate({
            left: e
        }, this.speed() / 1e3, this.settings.fallbackEasing, t.proxy(function() {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }, o.prototype.current = function(t) {
        if (t === n) return this._current;
        if (0 === this._items.length) return n;
        if (t = this.normalize(t), this._current !== t) {
            var e = this.trigger("change", {
                property: {
                    name: "position",
                    value: t
                }
            });
            e.data !== n && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, o.prototype.invalidate = function(t) {
        this._invalidated[t] = !0
    }, o.prototype.reset = function(t) {
        (t = this.normalize(t)) !== n && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, o.prototype.normalize = function(e, i) {
        var o = i ? this._items.length : this._items.length + this._clones.length;
        return !t.isNumeric(e) || 1 > o ? n : e = this._clones.length ? (e % o + o) % o : Math.max(this.minimum(i), Math.min(this.maximum(i), e))
    }, o.prototype.relative = function(t) {
        return t = this.normalize(t), t -= this._clones.length / 2, this.normalize(t, !0)
    }, o.prototype.maximum = function(t) {
        var e, i, n, o = 0,
            s = this.settings;
        if (t) return this._items.length - 1;
        if (!s.loop && s.center) e = this._items.length - 1;
        else if (s.loop || s.center)
            if (s.loop || s.center) e = this._items.length + s.items;
            else {
                if (!s.autoWidth && !s.merge) throw "Can not detect maximum absolute position.";
                for (revert = s.rtl ? 1 : -1, i = this.$stage.width() - this.$element.width();
                    (n = this.coordinates(o)) && !(n * revert >= i);) e = ++o
            }
        else e = this._items.length - s.items;
        return e
    }, o.prototype.minimum = function(t) {
        return t ? 0 : this._clones.length / 2
    }, o.prototype.items = function(t) {
        return t === n ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, o.prototype.mergers = function(t) {
        return t === n ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, o.prototype.clones = function(e) {
        var i = this._clones.length / 2,
            o = i + this._items.length,
            s = function(t) {
                return t % 2 == 0 ? o + t / 2 : i - (t + 1) / 2
            };
        return e === n ? t.map(this._clones, function(t, e) {
            return s(e)
        }) : t.map(this._clones, function(t, i) {
            return t === e ? s(i) : null
        })
    }, o.prototype.speed = function(t) {
        return t !== n && (this._speed = t), this._speed
    }, o.prototype.coordinates = function(e) {
        var i = null;
        return e === n ? t.map(this._coordinates, t.proxy(function(t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (i = this._coordinates[e], i += (this.width() - i + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[e - 1] || 0, i)
    }, o.prototype.duration = function(t, e, i) {
        return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }, o.prototype.to = function(i, n) {
        if (this.settings.loop) {
            var o = i - this.relative(this.current()),
                s = this.current(),
                a = this.current(),
                r = this.current() + o,
                l = 0 > a - r,
                h = this._clones.length + this._items.length;
            r < this.settings.items && !1 === l ? (s = a + this._items.length, this.reset(s)) : r >= h - this.settings.items && !0 === l && (s = a - this._items.length, this.reset(s)), e.clearTimeout(this.e._goToLoop), this.e._goToLoop = e.setTimeout(t.proxy(function() {
                this.speed(this.duration(this.current(), s + o, n)), this.current(s + o), this.update()
            }, this), 30)
        } else this.speed(this.duration(this.current(), i, n)), this.current(i), this.update()
    }, o.prototype.next = function(t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, o.prototype.prev = function(t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, o.prototype.transitionEnd = function(t) {
        return (t === n || (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) === this.$stage.get(0))) && (this.state.inMotion = !1, void this.trigger("translated"))
    }, o.prototype.viewport = function() {
        var n;
        if (this.options.responsiveBaseElement !== e) n = t(this.options.responsiveBaseElement).width();
        else if (e.innerWidth) n = e.innerWidth;
        else {
            if (!i.documentElement || !i.documentElement.clientWidth) throw "Can not detect viewport width.";
            n = i.documentElement.clientWidth
        }
        return n
    }, o.prototype.replace = function(e) {
        this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function() {
            return 1 === this.nodeType
        }).each(t.proxy(function(t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(t.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, o.prototype.add = function(t, e) {
        e = e === n ? this._items.length : this.normalize(e, !0), this.trigger("add", {
            content: t,
            position: e
        }), 0 === this._items.length || e === this._items.length ? (this.$stage.append(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
            content: t,
            position: e
        })
    }, o.prototype.remove = function(t) {
        (t = this.normalize(t, !0)) !== n && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, o.prototype.addTriggerableEvents = function() {
        var e = t.proxy(function(e, i) {
            return t.proxy(function(t) {
                t.relatedTarget !== this && (this.suppress([i]), e.apply(this, [].slice.call(arguments, 1)), this.release([i]))
            }, this)
        }, this);
        t.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, t.proxy(function(t, i) {
            this.$element.on(t + ".owl.carousel", e(i, t + ".owl.carousel"))
        }, this))
    }, o.prototype.watchVisibility = function() {
        function i(t) {
            return t.offsetWidth > 0 && t.offsetHeight > 0
        }

        function n() {
            i(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), e.clearInterval(this.e._checkVisibile))
        }
        i(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), e.clearInterval(this.e._checkVisibile), this.e._checkVisibile = e.setInterval(t.proxy(n, this), 500))
    }, o.prototype.preloadAutoWidthImages = function(e) {
        var i, n, o, s;
        i = 0, n = this, e.each(function(a, r) {
            o = t(r), s = new Image, s.onload = function() {
                i++, o.attr("src", s.src), o.css("opacity", 1), i >= e.length && (n.state.imagesLoaded = !0, n.initialize())
            }, s.src = o.attr("src") || o.attr("data-src") || o.attr("data-src-retina")
        })
    }, o.prototype.destroy = function() {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), !1 !== this.settings.responsive && t(e).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var n in this._plugins) this._plugins[n].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), t(i).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() {
            return !1
        })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, o.prototype.op = function(t, e, i) {
        var n = this.settings.rtl;
        switch (e) {
            case "<":
                return n ? t > i : i > t;
            case ">":
                return n ? i > t : t > i;
            case ">=":
                return n ? i >= t : t >= i;
            case "<=":
                return n ? t >= i : i >= t
        }
    }, o.prototype.on = function(t, e, i, n) {
        t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
    }, o.prototype.off = function(t, e, i, n) {
        t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
    }, o.prototype.trigger = function(e, i, n) {
        var o = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            s = t.camelCase(t.grep(["on", e, n], function(t) {
                return t
            }).join("-").toLowerCase()),
            a = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({
                relatedTarget: this
            }, o, i));
        return this._supress[e] || (t.each(this._plugins, function(t, e) {
            e.onTrigger && e.onTrigger(a)
        }), this.$element.trigger(a), this.settings && "function" == typeof this.settings[s] && this.settings[s].apply(this, a)), a
    }, o.prototype.suppress = function(e) {
        t.each(e, t.proxy(function(t, e) {
            this._supress[e] = !0
        }, this))
    }, o.prototype.release = function(e) {
        t.each(e, t.proxy(function(t, e) {
            delete this._supress[e]
        }, this))
    }, o.prototype.browserSupport = function() {
        if (this.support3d = h(), this.support3d) {
            this.transformVendor = l();
            var t = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = t[r()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = e.orientation
    }, t.fn.owlCarousel = function(e) {
        return this.each(function() {
            t(this).data("owlCarousel") || t(this).data("owlCarousel", new o(this, e))
        })
    }, t.fn.owlCarousel.Constructor = o
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
    var i = function(e) {
        this._core = e, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": t.proxy(function(e) {
                if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
                    for (var i = this._core.settings, n = i.center && Math.ceil(i.items / 2) || i.items, o = i.center && -1 * n || 0, s = (e.property && e.property.value || this._core.current()) + o, a = this._core.clones().length, r = t.proxy(function(t, e) {
                            this.load(e)
                        }, this); o++ < n;) this.load(a / 2 + this._core.relative(s)), a && t.each(this._core.clones(this._core.relative(s++)), r)
            }, this)
        }, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    i.Defaults = {
        lazyLoad: !1
    }, i.prototype.load = function(i) {
        var n = this._core.$stage.children().eq(i),
            o = n && n.find(".owl-lazy");
        !o || t.inArray(n.get(0), this._loaded) > -1 || (o.each(t.proxy(function(i, n) {
            var o, s = t(n),
                a = e.devicePixelRatio > 1 && s.attr("data-src-retina") || s.attr("data-src");
            this._core.trigger("load", {
                element: s,
                url: a
            }, "lazy"), s.is("img") ? s.one("load.owl.lazy", t.proxy(function() {
                s.css("opacity", 1), this._core.trigger("loaded", {
                    element: s,
                    url: a
                }, "lazy")
            }, this)).attr("src", a) : (o = new Image, o.onload = t.proxy(function() {
                s.css({
                    "background-image": "url(" + a + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: s,
                    url: a
                }, "lazy")
            }, this), o.src = a)
        }, this)), this._loaded.push(n.get(0)))
    }, i.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Lazy = i
}(window.Zepto || window.jQuery, window, document),
function(t) {
    var e = function(i) {
        this._core = i, this._handlers = {
            "initialized.owl.carousel": t.proxy(function() {
                this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                this._core.settings.autoHeight && "position" == t.property.name && this.update()
            }, this),
            "loaded.owl.lazy": t.proxy(function(t) {
                this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        }, this._core.options = t.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, e.prototype.update = function() {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function() {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(t, e, i) {
    var n = function(e) {
        this._core = e, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
            "resize.owl.carousel": t.proxy(function(t) {
                this._core.settings.video && !this.isInFullScreen() && t.preventDefault()
            }, this),
            "refresh.owl.carousel changed.owl.carousel": t.proxy(function() {
                this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                var i = t(e.content).find(".owl-video");
                i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
            this.play(t)
        }, this))
    };
    n.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, n.prototype.fetch = function(t, e) {
        var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube",
            n = t.attr("data-vimeo-id") || t.attr("data-youtube-id"),
            o = t.attr("data-width") || this._core.settings.videoWidth,
            s = t.attr("data-height") || this._core.settings.videoHeight,
            a = t.attr("href");
        if (!a) throw new Error("Missing video URL.");
        if (n = a.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), n[3].indexOf("youtu") > -1) i = "youtube";
        else {
            if (!(n[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
            i = "vimeo"
        }
        n = n[6], this._videos[a] = {
            type: i,
            id: n,
            width: o,
            height: s
        }, e.attr("data-video", a), this.thumbnail(t, this._videos[a])
    }, n.prototype.thumbnail = function(e, i) {
        var n, o, s, a = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
            r = e.find("img"),
            l = "src",
            h = "",
            c = this._core.settings,
            u = function(t) {
                o = '<div class="owl-video-play-icon"></div>', n = c.lazyLoad ? '<div class="owl-video-tn ' + h + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(n), e.after(o)
            };
        return e.wrap('<div class="owl-video-wrapper"' + a + "></div>"), this._core.settings.lazyLoad && (l = "data-src", h = "owl-lazy"), r.length ? (u(r.attr(l)), r.remove(), !1) : void("youtube" === i.type ? (s = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg", u(s)) : "vimeo" === i.type && t.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(t) {
                s = t[0].thumbnail_large, u(s)
            }
        }))
    }, n.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
    }, n.prototype.play = function(e) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var i, n, o = t(e.target || e.srcElement),
            s = o.closest("." + this._core.settings.itemClass),
            a = this._videos[s.attr("data-video")],
            r = a.width || "100%",
            l = a.height || this._core.$stage.height();
        "youtube" === a.type ? i = '<iframe width="' + r + '" height="' + l + '" src="http://www.youtube.com/embed/' + a.id + "?autoplay=1&v=" + a.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === a.type && (i = '<iframe src="http://player.vimeo.com/video/' + a.id + '?autoplay=1" width="' + r + '" height="' + l + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), s.addClass("owl-video-playing"), this._playing = s, n = t('<div style="height:' + l + "px; width:" + r + 'px" class="owl-video-frame">' + i + "</div>"), o.after(n)
    }, n.prototype.isInFullScreen = function() {
        var n = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
        return n && t(n).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), !(n && this._fullscreen && this._playing) && (this._fullscreen ? (this._fullscreen = !1, !1) : !this._playing || this._core.state.orientation === e.orientation || (this._core.state.orientation = e.orientation, !1))
    }, n.prototype.destroy = function() {
        var t, e;
        this._core.$element.off("click.owl.video");
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Video = n
}(window.Zepto || window.jQuery, window, document),
function(t, e, i, n) {
    var o = function(e) {
        this.core = e, this.core.options = t.extend({}, o.Defaults, this.core.options), this.swapping = !0, this.previous = n, this.next = n, this.handlers = {
            "change.owl.carousel": t.proxy(function(t) {
                "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
                this.swapping = "translated" == t.type
            }, this),
            "translate.owl.carousel": t.proxy(function() {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    o.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, o.prototype.swap = function() {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var e, i = t.proxy(this.clear, this),
                n = this.core.$stage.children().eq(this.previous),
                o = this.core.$stage.children().eq(this.next),
                s = this.core.settings.animateIn,
                a = this.core.settings.animateOut;
            this.core.current() !== this.previous && (a && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.css({
                left: e + "px"
            }).addClass("animated owl-animated-out").addClass(a).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i)), s && o.addClass("animated owl-animated-in").addClass(s).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i))
        }
    }, o.prototype.clear = function(e) {
        t(e.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
    }, o.prototype.destroy = function() {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Animate = o
}(window.Zepto || window.jQuery, window, document),
function(t, e, i) {
    var n = function(e) {
        this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": t.proxy(function() {
                this.autoplay()
            }, this),
            "play.owl.autoplay": t.proxy(function(t, e, i) {
                this.play(e, i)
            }, this),
            "stop.owl.autoplay": t.proxy(function() {
                this.stop()
            }, this),
            "mouseover.owl.autoplay": t.proxy(function() {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this),
            "mouseleave.owl.autoplay": t.proxy(function() {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    n.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, n.prototype.autoplay = function() {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (e.clearInterval(this.interval), this.interval = e.setInterval(t.proxy(function() {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : e.clearInterval(this.interval)
    }, n.prototype.play = function() {
        return !0 === i.hidden || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : !1 === this.core.settings.autoplay ? void e.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }, n.prototype.stop = function() {
        e.clearInterval(this.interval)
    }, n.prototype.pause = function() {
        e.clearInterval(this.interval)
    }, n.prototype.destroy = function() {
        var t, i;
        e.clearInterval(this.interval);
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.autoplay = n
}(window.Zepto || window.jQuery, window, document),
function(t) {
    "use strict";
    var e = function(i) {
        this._core = i, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": t.proxy(function(e) {
                this._core.settings.dotsData && this._templates.push(t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "add.owl.carousel": t.proxy(function(e) {
                this._core.settings.dotsData && this._templates.splice(e.position, 0, t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "remove.owl.carousel prepared.owl.carousel": t.proxy(function(t) {
                this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this),
            "change.owl.carousel": t.proxy(function(t) {
                if ("position" == t.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var e = this._core.current(),
                        i = this._core.maximum(),
                        n = this._core.minimum();
                    t.data = t.property.value > i ? e >= i ? n : i : t.property.value < n ? i : t.property.value
                }
            }, this),
            "changed.owl.carousel": t.proxy(function(t) {
                "position" == t.property.name && this.draw()
            }, this),
            "refreshed.owl.carousel": t.proxy(function() {
                this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
            }, this)
        }, this._core.options = t.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    }, e.prototype.initialize = function() {
        var e, i, n = this._core.settings;
        n.dotsData || (this._templates = [t("<div>").addClass(n.dotClass).append(t("<span>")).prop("outerHTML")]), n.navContainer && n.dotsContainer || (this._controls.$container = t("<div>").addClass(n.controlsClass).appendTo(this.$element)), this._controls.$indicators = n.dotsContainer ? t(n.dotsContainer) : t("<div>").hide().addClass(n.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", t.proxy(function(e) {
            var i = t(e.target).parent().is(this._controls.$indicators) ? t(e.target).index() : t(e.target).parent().index();
            e.preventDefault(), this.to(i, n.dotsSpeed)
        }, this)), e = n.navContainer ? t(n.navContainer) : t("<div>").addClass(n.navContainerClass).prependTo(this._controls.$container), this._controls.$next = t("<" + n.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(n.navClass[0]).html(n.navText[0]).hide().prependTo(e).on("click", t.proxy(function() {
            this.prev(n.navSpeed)
        }, this)), this._controls.$next.addClass(n.navClass[1]).html(n.navText[1]).hide().appendTo(e).on("click", t.proxy(function() {
            this.next(n.navSpeed)
        }, this));
        for (i in this._overrides) this._core[i] = t.proxy(this[i], this)
    }, e.prototype.destroy = function() {
        var t, e, i, n;
        for (t in this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) this._controls[e].remove();
        for (n in this.overides) this._core[n] = this._overrides[n];
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, e.prototype.update = function() {
        var t, e, i, n = this._core.settings,
            o = this._core.clones().length / 2,
            s = o + this._core.items().length,
            a = n.center || n.autoWidth || n.dotData ? 1 : n.dotsEach || n.items;
        if ("page" !== n.slideBy && (n.slideBy = Math.min(n.slideBy, n.items)), n.dots || "page" == n.slideBy)
            for (this._pages = [], t = o, e = 0, i = 0; s > t; t++)(e >= a || 0 === e) && (this._pages.push({
                start: t - o,
                end: t - o + a - 1
            }), e = 0, ++i), e += this._core.mergers(this._core.relative(t))
    }, e.prototype.draw = function() {
        var e, i, n = "",
            o = this._core.settings,
            s = (this._core.$stage.children(), this._core.relative(this._core.current()));
        if (!o.nav || o.loop || o.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= s), this._controls.$next.toggleClass("disabled", s >= this._core.maximum())), this._controls.$previous.toggle(o.nav), this._controls.$next.toggle(o.nav), o.dots) {
            if (e = this._pages.length - this._controls.$indicators.children().length, o.dotData && 0 !== e) {
                for (i = 0; i < this._controls.$indicators.children().length; i++) n += this._templates[this._core.relative(i)];
                this._controls.$indicators.html(n)
            } else e > 0 ? (n = new Array(e + 1).join(this._templates[0]), this._controls.$indicators.append(n)) : 0 > e && this._controls.$indicators.children().slice(e).remove();
            this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(t.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(o.dots)
    }, e.prototype.onTrigger = function(e) {
        var i = this._core.settings;
        e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: i && (i.center || i.autoWidth || i.dotData ? 1 : i.dotsEach || i.items)
        }
    }, e.prototype.current = function() {
        var e = this._core.relative(this._core.current());
        return t.grep(this._pages, function(t) {
            return t.start <= e && t.end >= e
        }).pop()
    }, e.prototype.getPosition = function(e) {
        var i, n, o = this._core.settings;
        return "page" == o.slideBy ? (i = t.inArray(this.current(), this._pages), n = this._pages.length,
            e ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, e ? i += o.slideBy : i -= o.slideBy), i
    }, e.prototype.next = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
    }, e.prototype.prev = function(e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
    }, e.prototype.to = function(e, i, n) {
        var o;
        n ? t.proxy(this._overrides.to, this._core)(e, i) : (o = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % o + o) % o].start, i))
    }, t.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
    "use strict";
    var i = function(n) {
        this._core = n, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": t.proxy(function() {
                "URLHash" == this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": t.proxy(function(e) {
                var i = t(e.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[i] = e.content
            }, this)
        }, this._core.options = t.extend({}, i.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function() {
            var t = e.location.hash.substring(1),
                i = this._core.$stage.children(),
                n = this._hashes[t] && i.index(this._hashes[t]) || 0;
            return !!t && void this._core.to(n, !1, !0)
        }, this))
    };
    i.Defaults = {
        URLhashListener: !1
    }, i.prototype.destroy = function() {
        var i, n;
        t(e).off("hashchange.owl.navigation");
        for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
        for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Hash = i
}(window.Zepto || window.jQuery, window, document),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
}(function(t) {
    function e(e) {
        var a = e || window.event,
            r = l.call(arguments, 1),
            h = 0,
            u = 0,
            d = 0,
            p = 0,
            f = 0,
            m = 0;
        if (e = t.event.fix(a), e.type = "mousewheel", "detail" in a && (d = -1 * a.detail), "wheelDelta" in a && (d = a.wheelDelta), "wheelDeltaY" in a && (d = a.wheelDeltaY), "wheelDeltaX" in a && (u = -1 * a.wheelDeltaX), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (u = -1 * d, d = 0), h = 0 === d ? u : d, "deltaY" in a && (d = -1 * a.deltaY, h = d), "deltaX" in a && (u = a.deltaX, 0 === d && (h = -1 * u)), 0 !== d || 0 !== u) {
            if (1 === a.deltaMode) {
                var g = t.data(this, "mousewheel-line-height");
                h *= g, d *= g, u *= g
            } else if (2 === a.deltaMode) {
                var v = t.data(this, "mousewheel-page-height");
                h *= v, d *= v, u *= v
            }
            if (p = Math.max(Math.abs(d), Math.abs(u)), (!s || s > p) && (s = p, n(a, p) && (s /= 40)), n(a, p) && (h /= 40, u /= 40, d /= 40), h = Math[h >= 1 ? "floor" : "ceil"](h / s), u = Math[u >= 1 ? "floor" : "ceil"](u / s), d = Math[d >= 1 ? "floor" : "ceil"](d / s), c.settings.normalizeOffset && this.getBoundingClientRect) {
                var y = this.getBoundingClientRect();
                f = e.clientX - y.left, m = e.clientY - y.top
            }
            return e.deltaX = u, e.deltaY = d, e.deltaFactor = s, e.offsetX = f, e.offsetY = m, e.deltaMode = 0, r.unshift(e, h, u, d), o && clearTimeout(o), o = setTimeout(i, 200), (t.event.dispatch || t.event.handle).apply(this, r)
        }
    }

    function i() {
        s = null
    }

    function n(t, e) {
        return c.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 == 0
    }
    var o, s, a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        r = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        l = Array.prototype.slice;
    if (t.event.fixHooks)
        for (var h = a.length; h;) t.event.fixHooks[a[--h]] = t.event.mouseHooks;
    var c = t.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var i = r.length; i;) this.addEventListener(r[--i], e, !1);
            else this.onmousewheel = e;
            t.data(this, "mousewheel-line-height", c.getLineHeight(this)), t.data(this, "mousewheel-page-height", c.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var i = r.length; i;) this.removeEventListener(r[--i], e, !1);
            else this.onmousewheel = null;
            t.removeData(this, "mousewheel-line-height"), t.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(e) {
            var i = t(e),
                n = i["offsetParent" in t.fn ? "offsetParent" : "parent"]();
            return n.length || (n = t("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
        },
        getPageHeight: function(e) {
            return t(e).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    t.fn.extend({
        mousewheel: function(t) {
            return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
        },
        unmousewheel: function(t) {
            return this.unbind("mousewheel", t)
        }
    })
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
}(function(t) {
    function e(e) {
        var a = e || window.event,
            r = l.call(arguments, 1),
            h = 0,
            u = 0,
            d = 0,
            p = 0,
            f = 0,
            m = 0;
        if (e = t.event.fix(a), e.type = "mousewheel", "detail" in a && (d = -1 * a.detail), "wheelDelta" in a && (d = a.wheelDelta), "wheelDeltaY" in a && (d = a.wheelDeltaY), "wheelDeltaX" in a && (u = -1 * a.wheelDeltaX), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (u = -1 * d, d = 0), h = 0 === d ? u : d, "deltaY" in a && (d = -1 * a.deltaY, h = d), "deltaX" in a && (u = a.deltaX, 0 === d && (h = -1 * u)), 0 !== d || 0 !== u) {
            if (1 === a.deltaMode) {
                var g = t.data(this, "mousewheel-line-height");
                h *= g, d *= g, u *= g
            } else if (2 === a.deltaMode) {
                var v = t.data(this, "mousewheel-page-height");
                h *= v, d *= v, u *= v
            }
            if (p = Math.max(Math.abs(d), Math.abs(u)), (!s || s > p) && (s = p, n(a, p) && (s /= 40)), n(a, p) && (h /= 40, u /= 40, d /= 40), h = Math[h >= 1 ? "floor" : "ceil"](h / s), u = Math[u >= 1 ? "floor" : "ceil"](u / s), d = Math[d >= 1 ? "floor" : "ceil"](d / s), c.settings.normalizeOffset && this.getBoundingClientRect) {
                var y = this.getBoundingClientRect();
                f = e.clientX - y.left, m = e.clientY - y.top
            }
            return e.deltaX = u, e.deltaY = d, e.deltaFactor = s, e.offsetX = f, e.offsetY = m, e.deltaMode = 0, r.unshift(e, h, u, d), o && clearTimeout(o), o = setTimeout(i, 200), (t.event.dispatch || t.event.handle).apply(this, r)
        }
    }

    function i() {
        s = null
    }

    function n(t, e) {
        return c.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 == 0
    }
    var o, s, a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        r = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        l = Array.prototype.slice;
    if (t.event.fixHooks)
        for (var h = a.length; h;) t.event.fixHooks[a[--h]] = t.event.mouseHooks;
    var c = t.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var i = r.length; i;) this.addEventListener(r[--i], e, !1);
            else this.onmousewheel = e;
            t.data(this, "mousewheel-line-height", c.getLineHeight(this)), t.data(this, "mousewheel-page-height", c.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var i = r.length; i;) this.removeEventListener(r[--i], e, !1);
            else this.onmousewheel = null;
            t.removeData(this, "mousewheel-line-height"), t.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(e) {
            var i = t(e),
                n = i["offsetParent" in t.fn ? "offsetParent" : "parent"]();
            return n.length || (n = t("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
        },
        getPageHeight: function(e) {
            return t(e).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    t.fn.extend({
        mousewheel: function(t) {
            return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
        },
        unmousewheel: function(t) {
            return this.unbind("mousewheel", t)
        }
    })
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t : t(jQuery, window, document)
}(function(t) {
    ! function(e) {
        var i = "function" == typeof define && define.amd,
            n = "undefined" != typeof module && module.exports,
            o = "https:" == document.location.protocol ? "https:" : "http:";
        i || (n ? require("jquery-mousewheel")(t) : t.event.special.mousewheel || t("head").append(decodeURI("%3Cscript src=" + o + "//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js%3E%3C/script%3E"))), e()
    }(function() {
        var e, i = "mCustomScrollbar",
            n = "mCS",
            o = ".mCustomScrollbar",
            s = {
                setTop: 0,
                setLeft: 0,
                axis: "y",
                scrollbarPosition: "inside",
                scrollInertia: 950,
                autoDraggerLength: !0,
                alwaysShowScrollbar: 0,
                snapOffset: 0,
                mouseWheel: {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    deltaFactor: "auto",
                    disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                },
                scrollButtons: {
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                keyboard: {
                    enable: !0,
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                contentTouchScroll: 25,
                documentTouchScroll: !0,
                advanced: {
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize: !0,
                    updateOnImageLoad: "auto",
                    autoUpdateTimeout: 60
                },
                theme: "light",
                callbacks: {
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    alwaysTriggerOffsets: !0
                }
            },
            a = 0,
            r = {},
            l = window.attachEvent && !window.addEventListener ? 1 : 0,
            h = !1,
            c = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
            u = {
                init: function(e) {
                    var e = t.extend(!0, {}, s, e),
                        i = d.call(this);
                    if (e.live) {
                        var l = e.liveSelector || this.selector || o,
                            h = t(l);
                        if ("off" === e.live) return void f(l);
                        r[l] = setTimeout(function() {
                            h.mCustomScrollbar(e), "once" === e.live && h.length && f(l)
                        }, 500)
                    } else f(l);
                    return e.setWidth = e.set_width ? e.set_width : e.setWidth, e.setHeight = e.set_height ? e.set_height : e.setHeight, e.axis = e.horizontalScroll ? "x" : m(e.axis), e.scrollInertia = e.scrollInertia > 0 && e.scrollInertia < 17 ? 17 : e.scrollInertia, "object" != typeof e.mouseWheel && 1 == e.mouseWheel && (e.mouseWheel = {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        preventDefault: !1,
                        deltaFactor: "auto",
                        normalizeDelta: !1,
                        invert: !1
                    }), e.mouseWheel.scrollAmount = e.mouseWheelPixels ? e.mouseWheelPixels : e.mouseWheel.scrollAmount, e.mouseWheel.normalizeDelta = e.advanced.normalizeMouseWheelDelta ? e.advanced.normalizeMouseWheelDelta : e.mouseWheel.normalizeDelta, e.scrollButtons.scrollType = g(e.scrollButtons.scrollType), p(e), t(i).each(function() {
                        var i = t(this);
                        if (!i.data(n)) {
                            i.data(n, {
                                idx: ++a,
                                opt: e,
                                scrollRatio: {
                                    y: null,
                                    x: null
                                },
                                overflowed: null,
                                contentReset: {
                                    y: null,
                                    x: null
                                },
                                bindEvents: !1,
                                tweenRunning: !1,
                                sequential: {},
                                langDir: i.css("direction"),
                                cbOffsets: null,
                                trigger: null,
                                poll: {
                                    size: {
                                        o: 0,
                                        n: 0
                                    },
                                    img: {
                                        o: 0,
                                        n: 0
                                    },
                                    change: {
                                        o: 0,
                                        n: 0
                                    }
                                }
                            });
                            var o = i.data(n),
                                s = o.opt,
                                r = i.data("mcs-axis"),
                                l = i.data("mcs-scrollbar-position"),
                                h = i.data("mcs-theme");
                            r && (s.axis = r), l && (s.scrollbarPosition = l), h && (s.theme = h, p(s)), v.call(this), o && s.callbacks.onCreate && "function" == typeof s.callbacks.onCreate && s.callbacks.onCreate.call(this), t("#mCSB_" + o.idx + "_container img:not(." + c[2] + ")").addClass(c[2]), u.update.call(null, i)
                        }
                    })
                },
                update: function(e, i) {
                    var o = e || d.call(this);
                    return t(o).each(function() {
                        var e = t(this);
                        if (e.data(n)) {
                            var o = e.data(n),
                                s = o.opt,
                                a = t("#mCSB_" + o.idx + "_container"),
                                r = t("#mCSB_" + o.idx),
                                l = [t("#mCSB_" + o.idx + "_dragger_vertical"), t("#mCSB_" + o.idx + "_dragger_horizontal")];
                            if (!a.length) return;
                            o.tweenRunning && V(e), i && o && s.callbacks.onBeforeUpdate && "function" == typeof s.callbacks.onBeforeUpdate && s.callbacks.onBeforeUpdate.call(this), e.hasClass(c[3]) && e.removeClass(c[3]), e.hasClass(c[4]) && e.removeClass(c[4]), r.css("max-height", "none"), r.height() !== e.height() && r.css("max-height", e.height()), w.call(this), "y" === s.axis || s.advanced.autoExpandHorizontalScroll || a.css("width", y(a)), o.overflowed = k.call(this), D.call(this), s.autoDraggerLength && _.call(this), x.call(this), T.call(this);
                            var h = [Math.abs(a[0].offsetTop), Math.abs(a[0].offsetLeft)];
                            "x" !== s.axis && (o.overflowed[0] ? l[0].height() > l[0].parent().height() ? S.call(this) : (K(e, h[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }), o.contentReset.y = null) : (S.call(this), "y" === s.axis ? z.call(this) : "yx" === s.axis && o.overflowed[1] && K(e, h[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }))), "y" !== s.axis && (o.overflowed[1] ? l[1].width() > l[1].parent().width() ? S.call(this) : (K(e, h[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }), o.contentReset.x = null) : (S.call(this), "x" === s.axis ? z.call(this) : "yx" === s.axis && o.overflowed[0] && K(e, h[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }))), i && o && (2 === i && s.callbacks.onImageLoad && "function" == typeof s.callbacks.onImageLoad ? s.callbacks.onImageLoad.call(this) : 3 === i && s.callbacks.onSelectorChange && "function" == typeof s.callbacks.onSelectorChange ? s.callbacks.onSelectorChange.call(this) : s.callbacks.onUpdate && "function" == typeof s.callbacks.onUpdate && s.callbacks.onUpdate.call(this)), X.call(this)
                        }
                    })
                },
                scrollTo: function(e, i) {
                    if (void 0 !== e && null != e) {
                        var o = d.call(this);
                        return t(o).each(function() {
                            var o = t(this);
                            if (o.data(n)) {
                                var s = o.data(n),
                                    a = s.opt,
                                    r = {
                                        trigger: "external",
                                        scrollInertia: a.scrollInertia,
                                        scrollEasing: "mcsEaseInOut",
                                        moveDragger: !1,
                                        timeout: 60,
                                        callbacks: !0,
                                        onStart: !0,
                                        onUpdate: !0,
                                        onComplete: !0
                                    },
                                    l = t.extend(!0, {}, r, i),
                                    h = q.call(this, e),
                                    c = l.scrollInertia > 0 && l.scrollInertia < 17 ? 17 : l.scrollInertia;
                                h[0] = Y.call(this, h[0], "y"), h[1] = Y.call(this, h[1], "x"), l.moveDragger && (h[0] *= s.scrollRatio.y, h[1] *= s.scrollRatio.x), l.dur = ot() ? 0 : c, setTimeout(function() {
                                    null !== h[0] && "undefined" != typeof h[0] && "x" !== a.axis && s.overflowed[0] && (l.dir = "y", l.overwrite = "all", K(o, h[0].toString(), l)), null !== h[1] && "undefined" != typeof h[1] && "y" !== a.axis && s.overflowed[1] && (l.dir = "x", l.overwrite = "none", K(o, h[1].toString(), l))
                                }, l.timeout)
                            }
                        })
                    }
                },
                stop: function() {
                    var e = d.call(this);
                    return t(e).each(function() {
                        var e = t(this);
                        e.data(n) && V(e)
                    })
                },
                disable: function(e) {
                    var i = d.call(this);
                    return t(i).each(function() {
                        var i = t(this);
                        i.data(n) && (i.data(n), X.call(this, "remove"), z.call(this), e && S.call(this), D.call(this, !0), i.addClass(c[3]))
                    })
                },
                destroy: function() {
                    var e = d.call(this);
                    return t(e).each(function() {
                        var o = t(this);
                        if (o.data(n)) {
                            var s = o.data(n),
                                a = s.opt,
                                r = t("#mCSB_" + s.idx),
                                l = t("#mCSB_" + s.idx + "_container"),
                                h = t(".mCSB_" + s.idx + "_scrollbar");
                            a.live && f(a.liveSelector || t(e).selector), X.call(this, "remove"), z.call(this), S.call(this), o.removeData(n), J(this, "mcs"), h.remove(), l.find("img." + c[2]).removeClass(c[2]), r.replaceWith(l.contents()), o.removeClass(i + " _" + n + "_" + s.idx + " " + c[6] + " " + c[7] + " " + c[5] + " " + c[3]).addClass(c[4])
                        }
                    })
                }
            },
            d = function() {
                return "object" != typeof t(this) || t(this).length < 1 ? o : this
            },
            p = function(e) {
                var i = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                    n = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                    o = ["minimal", "minimal-dark"],
                    s = ["minimal", "minimal-dark"],
                    a = ["minimal", "minimal-dark"];
                e.autoDraggerLength = !(t.inArray(e.theme, i) > -1) && e.autoDraggerLength, e.autoExpandScrollbar = !(t.inArray(e.theme, n) > -1) && e.autoExpandScrollbar, e.scrollButtons.enable = !(t.inArray(e.theme, o) > -1) && e.scrollButtons.enable, e.autoHideScrollbar = t.inArray(e.theme, s) > -1 || e.autoHideScrollbar, e.scrollbarPosition = t.inArray(e.theme, a) > -1 ? "outside" : e.scrollbarPosition
            },
            f = function(t) {
                r[t] && (clearTimeout(r[t]), J(r, t))
            },
            m = function(t) {
                return "yx" === t || "xy" === t || "auto" === t ? "yx" : "x" === t || "horizontal" === t ? "x" : "y"
            },
            g = function(t) {
                return "stepped" === t || "pixels" === t || "step" === t || "click" === t ? "stepped" : "stepless"
            },
            v = function() {
                var e = t(this),
                    o = e.data(n),
                    s = o.opt,
                    a = s.autoExpandScrollbar ? " " + c[1] + "_expand" : "",
                    r = ["<div id='mCSB_" + o.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + s.theme + " mCSB_scrollTools_vertical" + a + "'><div class='" + c[12] + "'><div id='mCSB_" + o.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + o.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + s.theme + " mCSB_scrollTools_horizontal" + a + "'><div class='" + c[12] + "'><div id='mCSB_" + o.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                    l = "yx" === s.axis ? "mCSB_vertical_horizontal" : "x" === s.axis ? "mCSB_horizontal" : "mCSB_vertical",
                    h = "yx" === s.axis ? r[0] + r[1] : "x" === s.axis ? r[1] : r[0],
                    u = "yx" === s.axis ? "<div id='mCSB_" + o.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                    d = s.autoHideScrollbar ? " " + c[6] : "",
                    p = "x" !== s.axis && "rtl" === o.langDir ? " " + c[7] : "";
                s.setWidth && e.css("width", s.setWidth), s.setHeight && e.css("height", s.setHeight), s.setLeft = "y" !== s.axis && "rtl" === o.langDir ? "989999px" : s.setLeft, e.addClass(i + " _" + n + "_" + o.idx + d + p).wrapInner("<div id='mCSB_" + o.idx + "' class='mCustomScrollBox mCS-" + s.theme + " " + l + "'><div id='mCSB_" + o.idx + "_container' class='mCSB_container' style='position:relative; top:" + s.setTop + "; left:" + s.setLeft + ";' dir='" + o.langDir + "' /></div>");
                var f = t("#mCSB_" + o.idx),
                    m = t("#mCSB_" + o.idx + "_container");
                "y" === s.axis || s.advanced.autoExpandHorizontalScroll || m.css("width", y(m)), "outside" === s.scrollbarPosition ? ("static" === e.css("position") && e.css("position", "relative"), e.css("overflow", "visible"), f.addClass("mCSB_outside").after(h)) : (f.addClass("mCSB_inside").append(h), m.wrap(u)), b.call(this);
                var g = [t("#mCSB_" + o.idx + "_dragger_vertical"), t("#mCSB_" + o.idx + "_dragger_horizontal")];
                g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
            },
            y = function(e) {
                var i = [e[0].scrollWidth, Math.max.apply(Math, e.children().map(function() {
                        return t(this).outerWidth(!0)
                    }).get())],
                    n = e.parent().width();
                return i[0] > n ? i[0] : i[1] > n ? i[1] : "100%"
            },
            w = function() {
                var e = t(this),
                    i = e.data(n),
                    o = i.opt,
                    s = t("#mCSB_" + i.idx + "_container");
                if (o.advanced.autoExpandHorizontalScroll && "y" !== o.axis) {
                    s.css({
                        width: "auto",
                        "min-width": 0,
                        "overflow-x": "scroll"
                    });
                    var a = Math.ceil(s[0].scrollWidth);
                    3 === o.advanced.autoExpandHorizontalScroll || 2 !== o.advanced.autoExpandHorizontalScroll && a > s.parent().width() ? s.css({
                        width: a,
                        "min-width": "100%",
                        "overflow-x": "inherit"
                    }) : s.css({
                        "overflow-x": "inherit",
                        position: "absolute"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: Math.ceil(s[0].getBoundingClientRect().right + .4) - Math.floor(s[0].getBoundingClientRect().left),
                        "min-width": "100%",
                        position: "relative"
                    }).unwrap()
                }
            },
            b = function() {
                var e = t(this),
                    i = e.data(n),
                    o = i.opt,
                    s = t(".mCSB_" + i.idx + "_scrollbar:first"),
                    a = it(o.scrollButtons.tabindex) ? "tabindex='" + o.scrollButtons.tabindex + "'" : "",
                    r = ["<a href='#' class='" + c[13] + "' " + a + " />", "<a href='#' class='" + c[14] + "' " + a + " />", "<a href='#' class='" + c[15] + "' " + a + " />", "<a href='#' class='" + c[16] + "' " + a + " />"],
                    l = ["x" === o.axis ? r[2] : r[0], "x" === o.axis ? r[3] : r[1], r[2], r[3]];
                o.scrollButtons.enable && s.prepend(l[0]).append(l[1]).next(".mCSB_scrollTools").prepend(l[2]).append(l[3])
            },
            _ = function() {
                var e = t(this),
                    i = e.data(n),
                    o = t("#mCSB_" + i.idx),
                    s = t("#mCSB_" + i.idx + "_container"),
                    a = [t("#mCSB_" + i.idx + "_dragger_vertical"), t("#mCSB_" + i.idx + "_dragger_horizontal")],
                    r = [o.height() / s.outerHeight(!1), o.width() / s.outerWidth(!1)],
                    h = [parseInt(a[0].css("min-height")), Math.round(r[0] * a[0].parent().height()), parseInt(a[1].css("min-width")), Math.round(r[1] * a[1].parent().width())],
                    c = l && h[1] < h[0] ? h[0] : h[1],
                    u = l && h[3] < h[2] ? h[2] : h[3];
                a[0].css({
                    height: c,
                    "max-height": a[0].parent().height() - 10
                }).find(".mCSB_dragger_bar").css({
                    "line-height": h[0] + "px"
                }), a[1].css({
                    width: u,
                    "max-width": a[1].parent().width() - 10
                })
            },
            x = function() {
                var e = t(this),
                    i = e.data(n),
                    o = t("#mCSB_" + i.idx),
                    s = t("#mCSB_" + i.idx + "_container"),
                    a = [t("#mCSB_" + i.idx + "_dragger_vertical"), t("#mCSB_" + i.idx + "_dragger_horizontal")],
                    r = [s.outerHeight(!1) - o.height(), s.outerWidth(!1) - o.width()],
                    l = [r[0] / (a[0].parent().height() - a[0].height()), r[1] / (a[1].parent().width() - a[1].width())];
                i.scrollRatio = {
                    y: l[0],
                    x: l[1]
                }
            },
            C = function(t, e, i) {
                var n = i ? c[0] + "_expanded" : "",
                    o = t.closest(".mCSB_scrollTools");
                "active" === e ? (t.toggleClass(c[0] + " " + n), o.toggleClass(c[1]), t[0]._draggable = t[0]._draggable ? 0 : 1) : t[0]._draggable || ("hide" === e ? (t.removeClass(c[0]), o.removeClass(c[1])) : (t.addClass(c[0]), o.addClass(c[1])))
            },
            k = function() {
                var e = t(this),
                    i = e.data(n),
                    o = t("#mCSB_" + i.idx),
                    s = t("#mCSB_" + i.idx + "_container"),
                    a = null == i.overflowed ? s.height() : s.outerHeight(!1),
                    r = null == i.overflowed ? s.width() : s.outerWidth(!1),
                    l = s[0].scrollHeight,
                    h = s[0].scrollWidth;
                return l > a && (a = l), h > r && (r = h), [a > o.height(), r > o.width()]
            },
            S = function() {
                var e = t(this),
                    i = e.data(n),
                    o = i.opt,
                    s = t("#mCSB_" + i.idx),
                    a = t("#mCSB_" + i.idx + "_container"),
                    r = [t("#mCSB_" + i.idx + "_dragger_vertical"), t("#mCSB_" + i.idx + "_dragger_horizontal")];
                if (V(e), ("x" !== o.axis && !i.overflowed[0] || "y" === o.axis && i.overflowed[0]) && (r[0].add(a).css("top", 0), K(e, "_resetY")), "y" !== o.axis && !i.overflowed[1] || "x" === o.axis && i.overflowed[1]) {
                    var l = dx = 0;
                    "rtl" === i.langDir && (l = s.width() - a.outerWidth(!1), dx = Math.abs(l / i.scrollRatio.x)), a.css("left", l), r[1].css("left", dx), K(e, "_resetX")
                }
            },
            T = function() {
                function e() {
                    a = setTimeout(function() {
                        t.event.special.mousewheel ? (clearTimeout(a), I.call(i[0])) : e()
                    }, 100)
                }
                var i = t(this),
                    o = i.data(n),
                    s = o.opt;
                if (!o.bindEvents) {
                    if (P.call(this), s.contentTouchScroll && E.call(this), $.call(this), s.mouseWheel.enable) {
                        var a;
                        e()
                    }
                    L.call(this), R.call(this), s.advanced.autoScrollOnFocus && N.call(this), s.scrollButtons.enable && B.call(this), s.keyboard.enable && j.call(this), o.bindEvents = !0
                }
            },
            z = function() {
                var e = t(this),
                    i = e.data(n),
                    o = i.opt,
                    s = n + "_" + i.idx,
                    a = ".mCSB_" + i.idx + "_scrollbar",
                    r = t("#mCSB_" + i.idx + ",#mCSB_" + i.idx + "_container,#mCSB_" + i.idx + "_container_wrapper," + a + " ." + c[12] + ",#mCSB_" + i.idx + "_dragger_vertical,#mCSB_" + i.idx + "_dragger_horizontal," + a + ">a"),
                    l = t("#mCSB_" + i.idx + "_container");
                o.advanced.releaseDraggableSelectors && r.add(t(o.advanced.releaseDraggableSelectors)), o.advanced.extraDraggableSelectors && r.add(t(o.advanced.extraDraggableSelectors)), i.bindEvents && (t(document).add(t(!A() || top.document)).unbind("." + s), r.each(function() {
                    t(this).unbind("." + s)
                }), clearTimeout(e[0]._focusTimeout), J(e[0], "_focusTimeout"), clearTimeout(i.sequential.step), J(i.sequential, "step"), clearTimeout(l[0].onCompleteTimeout), J(l[0], "onCompleteTimeout"), i.bindEvents = !1)
            },
            D = function(e) {
                var i = t(this),
                    o = i.data(n),
                    s = o.opt,
                    a = t("#mCSB_" + o.idx + "_container_wrapper"),
                    r = a.length ? a : t("#mCSB_" + o.idx + "_container"),
                    l = [t("#mCSB_" + o.idx + "_scrollbar_vertical"), t("#mCSB_" + o.idx + "_scrollbar_horizontal")],
                    h = [l[0].find(".mCSB_dragger"), l[1].find(".mCSB_dragger")];
                "x" !== s.axis && (o.overflowed[0] && !e ? (l[0].add(h[0]).add(l[0].children("a")).css("display", "block"), r.removeClass(c[8] + " " + c[10])) : (s.alwaysShowScrollbar ? (2 !== s.alwaysShowScrollbar && h[0].css("display", "none"), r.removeClass(c[10])) : (l[0].css("display", "none"), r.addClass(c[10])), r.addClass(c[8]))), "y" !== s.axis && (o.overflowed[1] && !e ? (l[1].add(h[1]).add(l[1].children("a")).css("display", "block"), r.removeClass(c[9] + " " + c[11])) : (s.alwaysShowScrollbar ? (2 !== s.alwaysShowScrollbar && h[1].css("display", "none"), r.removeClass(c[11])) : (l[1].css("display", "none"), r.addClass(c[11])), r.addClass(c[9]))), o.overflowed[0] || o.overflowed[1] ? i.removeClass(c[5]) : i.addClass(c[5])
            },
            W = function(e) {
                var i = e.type,
                    n = e.target.ownerDocument !== document && null !== frameElement ? [t(frameElement).offset().top, t(frameElement).offset().left] : null,
                    o = A() && e.target.ownerDocument !== top.document && null !== frameElement ? [t(e.view.frameElement).offset().top, t(e.view.frameElement).offset().left] : [0, 0];
                switch (i) {
                    case "pointerdown":
                    case "MSPointerDown":
                    case "pointermove":
                    case "MSPointerMove":
                    case "pointerup":
                    case "MSPointerUp":
                        return n ? [e.originalEvent.pageY - n[0] + o[0], e.originalEvent.pageX - n[1] + o[1], !1] : [e.originalEvent.pageY, e.originalEvent.pageX, !1];
                    case "touchstart":
                    case "touchmove":
                    case "touchend":
                        var s = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
                            a = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
                        return e.target.ownerDocument !== document ? [s.screenY, s.screenX, a > 1] : [s.pageY, s.pageX, a > 1];
                    default:
                        return n ? [e.pageY - n[0] + o[0], e.pageX - n[1] + o[1], !1] : [e.pageY, e.pageX, !1]
                }
            },
            P = function() {
                function e(t, e, n, o) {
                    if (p[0].idleTimer = c.scrollInertia < 233 ? 250 : 0, i.attr("id") === d[1]) var s = "x",
                        l = (i[0].offsetLeft - e + o) * r.scrollRatio.x;
                    else var s = "y",
                        l = (i[0].offsetTop - t + n) * r.scrollRatio.y;
                    K(a, l.toString(), {
                        dir: s,
                        drag: !0
                    })
                }
                var i, o, s, a = t(this),
                    r = a.data(n),
                    c = r.opt,
                    u = n + "_" + r.idx,
                    d = ["mCSB_" + r.idx + "_dragger_vertical", "mCSB_" + r.idx + "_dragger_horizontal"],
                    p = t("#mCSB_" + r.idx + "_container"),
                    f = t("#" + d[0] + ",#" + d[1]),
                    m = c.advanced.releaseDraggableSelectors ? f.add(t(c.advanced.releaseDraggableSelectors)) : f,
                    g = c.advanced.extraDraggableSelectors ? t(!A() || top.document).add(t(c.advanced.extraDraggableSelectors)) : t(!A() || top.document);
                f.bind("contextmenu." + u, function(t) {
                    t.preventDefault()
                }).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function(e) {
                    if (e.stopImmediatePropagation(), e.preventDefault(), tt(e)) {
                        h = !0, l && (document.onselectstart = function() {
                            return !1
                        }), H.call(p, !1), V(a), i = t(this);
                        var n = i.offset(),
                            r = W(e)[0] - n.top,
                            u = W(e)[1] - n.left,
                            d = i.height() + n.top,
                            f = i.width() + n.left;
                        d > r && r > 0 && f > u && u > 0 && (o = r, s = u), C(i, "active", c.autoExpandScrollbar)
                    }
                }).bind("touchmove." + u, function(t) {
                    t.stopImmediatePropagation(), t.preventDefault();
                    var n = i.offset(),
                        a = W(t)[0] - n.top,
                        r = W(t)[1] - n.left;
                    e(o, s, a, r)
                }), t(document).add(g).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function(t) {
                    if (i) {
                        var n = i.offset(),
                            a = W(t)[0] - n.top,
                            r = W(t)[1] - n.left;
                        if (o === a && s === r) return;
                        e(o, s, a, r)
                    }
                }).add(m).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function() {
                    i && (C(i, "active", c.autoExpandScrollbar), i = null), h = !1, l && (document.onselectstart = null), H.call(p, !0)
                })
            },
            E = function() {
                function i(t) {
                    if (!et(t) || h || W(t)[2]) return void(e = 0);
                    e = 1, x = 0, C = 0, c = 1, k.removeClass("mCS_touch_action");
                    var i = P.offset();
                    u = W(t)[0] - i.top, d = W(t)[1] - i.left, O = [W(t)[0], W(t)[1]]
                }

                function o(t) {
                    if (et(t) && !h && !W(t)[2] && (T.documentTouchScroll || t.preventDefault(), t.stopImmediatePropagation(), (!C || x) && c)) {
                        g = Z();
                        var e = D.offset(),
                            i = W(t)[0] - e.top,
                            n = W(t)[1] - e.left,
                            o = "mcsLinearOut";
                        if ($.push(i), I.push(n), O[2] = Math.abs(W(t)[0] - O[0]), O[3] = Math.abs(W(t)[1] - O[1]), S.overflowed[0]) var s = E[0].parent().height() - E[0].height(),
                            a = u - i > 0 && i - u > -s * S.scrollRatio.y && (2 * O[3] < O[2] || "yx" === T.axis);
                        if (S.overflowed[1]) var r = E[1].parent().width() - E[1].width(),
                            p = d - n > 0 && n - d > -r * S.scrollRatio.x && (2 * O[2] < O[3] || "yx" === T.axis);
                        a || p ? (R || t.preventDefault(), x = 1) : (C = 1, k.addClass("mCS_touch_action")), R && t.preventDefault(), b = "yx" === T.axis ? [u - i, d - n] : "x" === T.axis ? [null, d - n] : [u - i, null], P[0].idleTimer = 250, S.overflowed[0] && l(b[0], M, o, "y", "all", !0), S.overflowed[1] && l(b[1], M, o, "x", H, !0)
                    }
                }

                function s(t) {
                    if (!et(t) || h || W(t)[2]) return void(e = 0);
                    e = 1, t.stopImmediatePropagation(), V(k), m = Z();
                    var i = D.offset();
                    p = W(t)[0] - i.top, f = W(t)[1] - i.left, $ = [], I = []
                }

                function a(t) {
                    if (et(t) && !h && !W(t)[2]) {
                        c = 0, t.stopImmediatePropagation(), x = 0, C = 0, v = Z();
                        var e = D.offset(),
                            i = W(t)[0] - e.top,
                            n = W(t)[1] - e.left;
                        if (!(v - g > 30)) {
                            w = 1e3 / (v - m);
                            var o = "mcsEaseOut",
                                s = 2.5 > w,
                                a = s ? [$[$.length - 2], I[I.length - 2]] : [0, 0];
                            y = s ? [i - a[0], n - a[1]] : [i - p, n - f];
                            var u = [Math.abs(y[0]), Math.abs(y[1])];
                            w = s ? [Math.abs(y[0] / 4), Math.abs(y[1] / 4)] : [w, w];
                            var d = [Math.abs(P[0].offsetTop) - y[0] * r(u[0] / w[0], w[0]), Math.abs(P[0].offsetLeft) - y[1] * r(u[1] / w[1], w[1])];
                            b = "yx" === T.axis ? [d[0], d[1]] : "x" === T.axis ? [null, d[1]] : [d[0], null], _ = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia];
                            var k = parseInt(T.contentTouchScroll) || 0;
                            b[0] = u[0] > k ? b[0] : 0, b[1] = u[1] > k ? b[1] : 0, S.overflowed[0] && l(b[0], _[0], o, "y", H, !1), S.overflowed[1] && l(b[1], _[1], o, "x", H, !1)
                        }
                    }
                }

                function r(t, e) {
                    var i = [1.5 * e, 2 * e, e / 1.5, e / 2];
                    return t > 90 ? e > 4 ? i[0] : i[3] : t > 60 ? e > 3 ? i[3] : i[2] : t > 30 ? e > 8 ? i[1] : e > 6 ? i[0] : e > 4 ? e : i[2] : e > 8 ? e : i[3]
                }

                function l(t, e, i, n, o, s) {
                    t && K(k, t.toString(), {
                        dur: e,
                        scrollEasing: i,
                        dir: n,
                        overwrite: o,
                        drag: s
                    })
                }
                var c, u, d, p, f, m, g, v, y, w, b, _, x, C, k = t(this),
                    S = k.data(n),
                    T = S.opt,
                    z = n + "_" + S.idx,
                    D = t("#mCSB_" + S.idx),
                    P = t("#mCSB_" + S.idx + "_container"),
                    E = [t("#mCSB_" + S.idx + "_dragger_vertical"), t("#mCSB_" + S.idx + "_dragger_horizontal")],
                    $ = [],
                    I = [],
                    M = 0,
                    H = "yx" === T.axis ? "none" : "all",
                    O = [],
                    L = P.find("iframe"),
                    N = ["touchstart." + z + " pointerdown." + z + " MSPointerDown." + z, "touchmove." + z + " pointermove." + z + " MSPointerMove." + z, "touchend." + z + " pointerup." + z + " MSPointerUp." + z],
                    R = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
                P.bind(N[0], function(t) {
                    i(t)
                }).bind(N[1], function(t) {
                    o(t)
                }), D.bind(N[0], function(t) {
                    s(t)
                }).bind(N[2], function(t) {
                    a(t)
                }), L.length && L.each(function() {
                    t(this).bind("load", function() {
                        A(this) && t(this.contentDocument || this.contentWindow.document).bind(N[0], function(t) {
                            i(t), s(t)
                        }).bind(N[1], function(t) {
                            o(t)
                        }).bind(N[2], function(t) {
                            a(t)
                        })
                    })
                })
            },
            $ = function() {
                function i() {
                    return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
                }

                function o(t, e, i) {
                    c.type = i && s ? "stepped" : "stepless", c.scrollAmount = 10, F(a, t, e, "mcsLinearOut", i ? 60 : null)
                }
                var s, a = t(this),
                    r = a.data(n),
                    l = r.opt,
                    c = r.sequential,
                    u = n + "_" + r.idx,
                    d = t("#mCSB_" + r.idx + "_container"),
                    p = d.parent();
                d.bind("mousedown." + u, function() {
                    e || s || (s = 1, h = !0)
                }).add(document).bind("mousemove." + u, function(t) {
                    if (!e && s && i()) {
                        var n = d.offset(),
                            a = W(t)[0] - n.top + d[0].offsetTop,
                            h = W(t)[1] - n.left + d[0].offsetLeft;
                        a > 0 && a < p.height() && h > 0 && h < p.width() ? c.step && o("off", null, "stepped") : ("x" !== l.axis && r.overflowed[0] && (0 > a ? o("on", 38) : a > p.height() && o("on", 40)), "y" !== l.axis && r.overflowed[1] && (0 > h ? o("on", 37) : h > p.width() && o("on", 39)))
                    }
                }).bind("mouseup." + u + " dragend." + u, function() {
                    e || (s && (s = 0, o("off", null)), h = !1)
                })
            },
            I = function() {
                function e(e, n) {
                    if (V(i), !O(i, e.target)) {
                        var a = "auto" !== s.mouseWheel.deltaFactor ? parseInt(s.mouseWheel.deltaFactor) : l && e.deltaFactor < 100 ? 100 : e.deltaFactor || 100,
                            c = s.scrollInertia;
                        if ("x" === s.axis || "x" === s.mouseWheel.axis) var u = "x",
                            d = [Math.round(a * o.scrollRatio.x), parseInt(s.mouseWheel.scrollAmount)],
                            p = "auto" !== s.mouseWheel.scrollAmount ? d[1] : d[0] >= r.width() ? .9 * r.width() : d[0],
                            f = Math.abs(t("#mCSB_" + o.idx + "_container")[0].offsetLeft),
                            m = h[1][0].offsetLeft,
                            g = h[1].parent().width() - h[1].width(),
                            v = "y" === s.mouseWheel.axis ? e.deltaY || n : e.deltaX;
                        else var u = "y",
                            d = [Math.round(a * o.scrollRatio.y), parseInt(s.mouseWheel.scrollAmount)],
                            p = "auto" !== s.mouseWheel.scrollAmount ? d[1] : d[0] >= r.height() ? .9 * r.height() : d[0],
                            f = Math.abs(t("#mCSB_" + o.idx + "_container")[0].offsetTop),
                            m = h[0][0].offsetTop,
                            g = h[0].parent().height() - h[0].height(),
                            v = e.deltaY || n;
                        "y" === u && !o.overflowed[0] || "x" === u && !o.overflowed[1] || ((s.mouseWheel.invert || e.webkitDirectionInvertedFromDevice) && (v = -v), s.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== m || 0 > v && m !== g || s.mouseWheel.preventDefault) && (e.stopImmediatePropagation(), e.preventDefault()), e.deltaFactor < 5 && !s.mouseWheel.normalizeDelta && (p = e.deltaFactor, c = 17), K(i, (f - v * p).toString(), {
                            dir: u,
                            dur: c
                        }))
                    }
                }
                if (t(this).data(n)) {
                    var i = t(this),
                        o = i.data(n),
                        s = o.opt,
                        a = n + "_" + o.idx,
                        r = t("#mCSB_" + o.idx),
                        h = [t("#mCSB_" + o.idx + "_dragger_vertical"), t("#mCSB_" + o.idx + "_dragger_horizontal")],
                        c = t("#mCSB_" + o.idx + "_container").find("iframe");
                    c.length && c.each(function() {
                        t(this).bind("load", function() {
                            A(this) && t(this.contentDocument || this.contentWindow.document).bind("mousewheel." + a, function(t, i) {
                                e(t, i)
                            })
                        })
                    }), r.bind("mousewheel." + a, function(t, i) {
                        e(t, i)
                    })
                }
            },
            M = new Object,
            A = function(e) {
                var i = !1,
                    n = !1,
                    o = null;
                if (void 0 === e ? n = "#empty" : void 0 !== t(e).attr("id") && (n = t(e).attr("id")), !1 !== n && void 0 !== M[n]) return M[n];
                if (e) {
                    try {
                        var s = e.contentDocument || e.contentWindow.document;
                        o = s.body.innerHTML
                    } catch (t) {}
                    i = null !== o
                } else {
                    try {
                        var s = top.document;
                        o = s.body.innerHTML
                    } catch (t) {}
                    i = null !== o
                }
                return !1 !== n && (M[n] = i), i
            },
            H = function(t) {
                var e = this.find("iframe");
                if (e.length) {
                    var i = t ? "auto" : "none";
                    e.css("pointer-events", i)
                }
            },
            O = function(e, i) {
                var o = i.nodeName.toLowerCase(),
                    s = e.data(n).opt.mouseWheel.disableOver,
                    a = ["select", "textarea"];
                return t.inArray(o, s) > -1 && !(t.inArray(o, a) > -1 && !t(i).is(":focus"))
            },
            L = function() {
                var e, i = t(this),
                    o = i.data(n),
                    s = n + "_" + o.idx,
                    a = t("#mCSB_" + o.idx + "_container"),
                    r = a.parent();
                t(".mCSB_" + o.idx + "_scrollbar ." + c[12]).bind("mousedown." + s + " touchstart." + s + " pointerdown." + s + " MSPointerDown." + s, function(i) {
                    h = !0, t(i.target).hasClass("mCSB_dragger") || (e = 1)
                }).bind("touchend." + s + " pointerup." + s + " MSPointerUp." + s, function() {
                    h = !1
                }).bind("click." + s, function(n) {
                    if (e && (e = 0, t(n.target).hasClass(c[12]) || t(n.target).hasClass("mCSB_draggerRail"))) {
                        V(i);
                        var s = t(this),
                            l = s.find(".mCSB_dragger");
                        if (s.parent(".mCSB_scrollTools_horizontal").length > 0) {
                            if (!o.overflowed[1]) return;
                            var h = "x",
                                u = n.pageX > l.offset().left ? -1 : 1,
                                d = Math.abs(a[0].offsetLeft) - u * (.9 * r.width())
                        } else {
                            if (!o.overflowed[0]) return;
                            var h = "y",
                                u = n.pageY > l.offset().top ? -1 : 1,
                                d = Math.abs(a[0].offsetTop) - u * (.9 * r.height())
                        }
                        K(i, d.toString(), {
                            dir: h,
                            scrollEasing: "mcsEaseInOut"
                        })
                    }
                })
            },
            N = function() {
                var e = t(this),
                    i = e.data(n),
                    o = i.opt,
                    s = n + "_" + i.idx,
                    a = t("#mCSB_" + i.idx + "_container"),
                    r = a.parent();
                a.bind("focusin." + s, function() {
                    var i = t(document.activeElement),
                        n = a.find(".mCustomScrollBox").length,
                        s = 0;
                    i.is(o.advanced.autoScrollOnFocus) && (V(e), clearTimeout(e[0]._focusTimeout), e[0]._focusTimer = n ? (s + 17) * n : 0, e[0]._focusTimeout = setTimeout(function() {
                        var t = [nt(i)[0], nt(i)[1]],
                            n = [a[0].offsetTop, a[0].offsetLeft],
                            l = [n[0] + t[0] >= 0 && n[0] + t[0] < r.height() - i.outerHeight(!1), n[1] + t[1] >= 0 && n[0] + t[1] < r.width() - i.outerWidth(!1)],
                            h = "yx" !== o.axis || l[0] || l[1] ? "all" : "none";
                        "x" === o.axis || l[0] || K(e, t[0].toString(), {
                            dir: "y",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: h,
                            dur: s
                        }), "y" === o.axis || l[1] || K(e, t[1].toString(), {
                            dir: "x",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: h,
                            dur: s
                        })
                    }, e[0]._focusTimer))
                })
            },
            R = function() {
                var e = t(this),
                    i = e.data(n),
                    o = n + "_" + i.idx,
                    s = t("#mCSB_" + i.idx + "_container").parent();
                s.bind("scroll." + o, function() {
                    0 === s.scrollTop() && 0 === s.scrollLeft() || t(".mCSB_" + i.idx + "_scrollbar").css("visibility", "hidden")
                })
            },
            B = function() {
                var e = t(this),
                    i = e.data(n),
                    o = i.opt,
                    s = i.sequential,
                    a = n + "_" + i.idx,
                    r = ".mCSB_" + i.idx + "_scrollbar";
                t(r + ">a").bind("contextmenu." + a, function(t) {
                    t.preventDefault()
                }).bind("mousedown." + a + " touchstart." + a + " pointerdown." + a + " MSPointerDown." + a + " mouseup." + a + " touchend." + a + " pointerup." + a + " MSPointerUp." + a + " mouseout." + a + " pointerout." + a + " MSPointerOut." + a + " click." + a, function(n) {
                    function a(t, i) {
                        s.scrollAmount = o.scrollButtons.scrollAmount, F(e, t, i)
                    }
                    if (n.preventDefault(), tt(n)) {
                        var r = t(this).attr("class");
                        switch (s.type = o.scrollButtons.scrollType, n.type) {
                            case "mousedown":
                            case "touchstart":
                            case "pointerdown":
                            case "MSPointerDown":
                                if ("stepped" === s.type) return;
                                h = !0, i.tweenRunning = !1, a("on", r);
                                break;
                            case "mouseup":
                            case "touchend":
                            case "pointerup":
                            case "MSPointerUp":
                            case "mouseout":
                            case "pointerout":
                            case "MSPointerOut":
                                if ("stepped" === s.type) return;
                                h = !1, s.dir && a("off", r);
                                break;
                            case "click":
                                if ("stepped" !== s.type || i.tweenRunning) return;
                                a("on", r)
                        }
                    }
                })
            },
            j = function() {
                function e(e) {
                    function n(t, e) {
                        a.type = s.keyboard.scrollType, a.scrollAmount = s.keyboard.scrollAmount, "stepped" === a.type && o.tweenRunning || F(i, t, e)
                    }
                    switch (e.type) {
                        case "blur":
                            o.tweenRunning && a.dir && n("off", null);
                            break;
                        case "keydown":
                        case "keyup":
                            var r = e.keyCode ? e.keyCode : e.which,
                                l = "on";
                            if ("x" !== s.axis && (38 === r || 40 === r) || "y" !== s.axis && (37 === r || 39 === r)) {
                                if ((38 === r || 40 === r) && !o.overflowed[0] || (37 === r || 39 === r) && !o.overflowed[1]) return;
                                "keyup" === e.type && (l = "off"), t(document.activeElement).is(u) || (e.preventDefault(), e.stopImmediatePropagation(), n(l, r))
                            } else if (33 === r || 34 === r) {
                                if ((o.overflowed[0] || o.overflowed[1]) && (e.preventDefault(), e.stopImmediatePropagation()), "keyup" === e.type) {
                                    V(i);
                                    var d = 34 === r ? -1 : 1;
                                    if ("x" === s.axis || "yx" === s.axis && o.overflowed[1] && !o.overflowed[0]) var p = "x",
                                        f = Math.abs(h[0].offsetLeft) - d * (.9 * c.width());
                                    else var p = "y",
                                        f = Math.abs(h[0].offsetTop) - d * (.9 * c.height());
                                    K(i, f.toString(), {
                                        dir: p,
                                        scrollEasing: "mcsEaseInOut"
                                    })
                                }
                            } else if ((35 === r || 36 === r) && !t(document.activeElement).is(u) && ((o.overflowed[0] || o.overflowed[1]) && (e.preventDefault(), e.stopImmediatePropagation()), "keyup" === e.type)) {
                                if ("x" === s.axis || "yx" === s.axis && o.overflowed[1] && !o.overflowed[0]) var p = "x",
                                    f = 35 === r ? Math.abs(c.width() - h.outerWidth(!1)) : 0;
                                else var p = "y",
                                    f = 35 === r ? Math.abs(c.height() - h.outerHeight(!1)) : 0;
                                K(i, f.toString(), {
                                    dir: p,
                                    scrollEasing: "mcsEaseInOut"
                                })
                            }
                    }
                }
                var i = t(this),
                    o = i.data(n),
                    s = o.opt,
                    a = o.sequential,
                    r = n + "_" + o.idx,
                    l = t("#mCSB_" + o.idx),
                    h = t("#mCSB_" + o.idx + "_container"),
                    c = h.parent(),
                    u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                    d = h.find("iframe"),
                    p = ["blur." + r + " keydown." + r + " keyup." + r];
                d.length && d.each(function() {
                    t(this).bind("load", function() {
                        A(this) && t(this.contentDocument || this.contentWindow.document).bind(p[0], function(t) {
                            e(t)
                        })
                    })
                }), l.attr("tabindex", "0").bind(p[0], function(t) {
                    e(t)
                })
            },
            F = function(e, i, o, s, a) {
                function r(t) {
                    u.snapAmount && (d.scrollAmount = u.snapAmount instanceof Array ? "x" === d.dir[0] ? u.snapAmount[1] : u.snapAmount[0] : u.snapAmount);
                    var i = "stepped" !== d.type,
                        n = a || (t ? i ? m / 1.5 : g : 1e3 / 60),
                        o = t ? i ? 7.5 : 40 : 2.5,
                        l = [Math.abs(p[0].offsetTop), Math.abs(p[0].offsetLeft)],
                        c = [h.scrollRatio.y > 10 ? 10 : h.scrollRatio.y, h.scrollRatio.x > 10 ? 10 : h.scrollRatio.x],
                        f = "x" === d.dir[0] ? l[1] + d.dir[1] * (c[1] * o) : l[0] + d.dir[1] * (c[0] * o),
                        v = "x" === d.dir[0] ? l[1] + d.dir[1] * parseInt(d.scrollAmount) : l[0] + d.dir[1] * parseInt(d.scrollAmount),
                        y = "auto" !== d.scrollAmount ? v : f,
                        w = s || (t ? i ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear"),
                        b = !!t;
                    return t && 17 > n && (y = "x" === d.dir[0] ? l[1] : l[0]), K(e, y.toString(), {
                        dir: d.dir[0],
                        scrollEasing: w,
                        dur: n,
                        onComplete: b
                    }), t ? void(d.dir = !1) : (clearTimeout(d.step), void(d.step = setTimeout(function() {
                        r()
                    }, n)))
                }

                function l() {
                    clearTimeout(d.step), J(d, "step"), V(e)
                }
                var h = e.data(n),
                    u = h.opt,
                    d = h.sequential,
                    p = t("#mCSB_" + h.idx + "_container"),
                    f = "stepped" === d.type,
                    m = u.scrollInertia < 26 ? 26 : u.scrollInertia,
                    g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
                switch (i) {
                    case "on":
                        if (d.dir = [o === c[16] || o === c[15] || 39 === o || 37 === o ? "x" : "y", o === c[13] || o === c[15] || 38 === o || 37 === o ? -1 : 1], V(e), it(o) && "stepped" === d.type) return;
                        r(f);
                        break;
                    case "off":
                        l(), (f || h.tweenRunning && d.dir) && r(!0)
                }
            },
            q = function(e) {
                var i = t(this).data(n).opt,
                    o = [];
                return "function" == typeof e && (e = e()), e instanceof Array ? o = e.length > 1 ? [e[0], e[1]] : "x" === i.axis ? [null, e[0]] : [e[0], null] : (o[0] = e.y ? e.y : e.x || "x" === i.axis ? null : e, o[1] = e.x ? e.x : e.y || "y" === i.axis ? null : e), "function" == typeof o[0] && (o[0] = o[0]()), "function" == typeof o[1] && (o[1] = o[1]()), o
            },
            Y = function(e, i) {
                if (null != e && void 0 !== e) {
                    var o = t(this),
                        s = o.data(n),
                        a = s.opt,
                        r = t("#mCSB_" + s.idx + "_container"),
                        l = r.parent(),
                        h = typeof e;
                    i || (i = "x" === a.axis ? "x" : "y");
                    var c = "x" === i ? r.outerWidth(!1) - l.width() : r.outerHeight(!1) - l.height(),
                        d = "x" === i ? r[0].offsetLeft : r[0].offsetTop,
                        p = "x" === i ? "left" : "top";
                    switch (h) {
                        case "function":
                            return e();
                        case "object":
                            var f = e.jquery ? e : t(e);
                            if (!f.length) return;
                            return "x" === i ? nt(f)[1] : nt(f)[0];
                        case "string":
                        case "number":
                            if (it(e)) return Math.abs(e);
                            if (-1 !== e.indexOf("%")) return Math.abs(c * parseInt(e) / 100);
                            if (-1 !== e.indexOf("-=")) return Math.abs(d - parseInt(e.split("-=")[1]));
                            if (-1 !== e.indexOf("+=")) {
                                var m = d + parseInt(e.split("+=")[1]);
                                return m >= 0 ? 0 : Math.abs(m)
                            }
                            if (-1 !== e.indexOf("px") && it(e.split("px")[0])) return Math.abs(e.split("px")[0]);
                            if ("top" === e || "left" === e) return 0;
                            if ("bottom" === e) return Math.abs(l.height() - r.outerHeight(!1));
                            if ("right" === e) return Math.abs(l.width() - r.outerWidth(!1));
                            if ("first" === e || "last" === e) {
                                var f = r.find(":" + e);
                                return "x" === i ? nt(f)[1] : nt(f)[0]
                            }
                            return t(e).length ? "x" === i ? nt(t(e))[1] : nt(t(e))[0] : (r.css(p, e), void u.update.call(null, o[0]))
                    }
                }
            },
            X = function(e) {
                function i() {
                    return clearTimeout(d[0].autoUpdate), 0 === r.parents("html").length ? void(r = null) : void(d[0].autoUpdate = setTimeout(function() {
                        return h.advanced.updateOnSelectorChange && (l.poll.change.n = s(), l.poll.change.n !== l.poll.change.o) ? (l.poll.change.o = l.poll.change.n, void a(3)) : h.advanced.updateOnContentResize && (l.poll.size.n = r[0].scrollHeight + r[0].scrollWidth + d[0].offsetHeight + r[0].offsetHeight + r[0].offsetWidth, l.poll.size.n !== l.poll.size.o) ? (l.poll.size.o = l.poll.size.n, void a(1)) : !h.advanced.updateOnImageLoad || "auto" === h.advanced.updateOnImageLoad && "y" === h.axis || (l.poll.img.n = d.find("img").length, l.poll.img.n === l.poll.img.o) ? void((h.advanced.updateOnSelectorChange || h.advanced.updateOnContentResize || h.advanced.updateOnImageLoad) && i()) : (l.poll.img.o = l.poll.img.n, void d.find("img").each(function() {
                            o(this)
                        }))
                    }, h.advanced.autoUpdateTimeout))
                }

                function o(e) {
                    function i(t, e) {
                        return function() {
                            return e.apply(t, arguments)
                        }
                    }

                    function n() {
                        this.onload = null, t(e).addClass(c[2]), a(2)
                    }
                    if (t(e).hasClass(c[2])) return void a();
                    var o = new Image;
                    o.onload = i(o, n), o.src = e.src
                }

                function s() {
                    !0 === h.advanced.updateOnSelectorChange && (h.advanced.updateOnSelectorChange = "*");
                    var t = 0,
                        e = d.find(h.advanced.updateOnSelectorChange);
                    return h.advanced.updateOnSelectorChange && e.length > 0 && e.each(function() {
                        t += this.offsetHeight + this.offsetWidth
                    }), t
                }

                function a(t) {
                    clearTimeout(d[0].autoUpdate), u.update.call(null, r[0], t)
                }
                var r = t(this),
                    l = r.data(n),
                    h = l.opt,
                    d = t("#mCSB_" + l.idx + "_container");
                return e ? (clearTimeout(d[0].autoUpdate), void J(d[0], "autoUpdate")) : void i()
            },
            U = function(t, e, i) {
                return Math.round(t / e) * e - i
            },
            V = function(e) {
                var i = e.data(n);
                t("#mCSB_" + i.idx + "_container,#mCSB_" + i.idx + "_container_wrapper,#mCSB_" + i.idx + "_dragger_vertical,#mCSB_" + i.idx + "_dragger_horizontal").each(function() {
                    G.call(this)
                })
            },
            K = function(e, i, o) {
                function s(t) {
                    return l && h.callbacks[t] && "function" == typeof h.callbacks[t]
                }

                function a() {
                    return [h.callbacks.alwaysTriggerOffsets || b >= _[0] + k, h.callbacks.alwaysTriggerOffsets || -S >= b]
                }

                function r() {
                    var t = [p[0].offsetTop, p[0].offsetLeft],
                        i = [y[0].offsetTop, y[0].offsetLeft],
                        n = [p.outerHeight(!1), p.outerWidth(!1)],
                        s = [d.height(), d.width()];
                    e[0].mcs = {
                        content: p,
                        top: t[0],
                        left: t[1],
                        draggerTop: i[0],
                        draggerLeft: i[1],
                        topPct: Math.round(100 * Math.abs(t[0]) / (Math.abs(n[0]) - s[0])),
                        leftPct: Math.round(100 * Math.abs(t[1]) / (Math.abs(n[1]) - s[1])),
                        direction: o.dir
                    }
                }
                var l = e.data(n),
                    h = l.opt,
                    c = {
                        trigger: "internal",
                        dir: "y",
                        scrollEasing: "mcsEaseOut",
                        drag: !1,
                        dur: h.scrollInertia,
                        overwrite: "all",
                        callbacks: !0,
                        onStart: !0,
                        onUpdate: !0,
                        onComplete: !0
                    },
                    o = t.extend(c, o),
                    u = [o.dur, o.drag ? 0 : o.dur],
                    d = t("#mCSB_" + l.idx),
                    p = t("#mCSB_" + l.idx + "_container"),
                    f = p.parent(),
                    m = h.callbacks.onTotalScrollOffset ? q.call(e, h.callbacks.onTotalScrollOffset) : [0, 0],
                    g = h.callbacks.onTotalScrollBackOffset ? q.call(e, h.callbacks.onTotalScrollBackOffset) : [0, 0];
                if (l.trigger = o.trigger, 0 === f.scrollTop() && 0 === f.scrollLeft() || (t(".mCSB_" + l.idx + "_scrollbar").css("visibility", "visible"), f.scrollTop(0).scrollLeft(0)), "_resetY" !== i || l.contentReset.y || (s("onOverflowYNone") && h.callbacks.onOverflowYNone.call(e[0]), l.contentReset.y = 1), "_resetX" !== i || l.contentReset.x || (s("onOverflowXNone") && h.callbacks.onOverflowXNone.call(e[0]), l.contentReset.x = 1), "_resetY" !== i && "_resetX" !== i) {
                    if (!l.contentReset.y && e[0].mcs || !l.overflowed[0] || (s("onOverflowY") && h.callbacks.onOverflowY.call(e[0]), l.contentReset.x = null), !l.contentReset.x && e[0].mcs || !l.overflowed[1] || (s("onOverflowX") && h.callbacks.onOverflowX.call(e[0]), l.contentReset.x = null), h.snapAmount) {
                        var v = h.snapAmount instanceof Array ? "x" === o.dir ? h.snapAmount[1] : h.snapAmount[0] : h.snapAmount;
                        i = U(i, v, h.snapOffset)
                    }
                    switch (o.dir) {
                        case "x":
                            var y = t("#mCSB_" + l.idx + "_dragger_horizontal"),
                                w = "left",
                                b = p[0].offsetLeft,
                                _ = [d.width() - p.outerWidth(!1), y.parent().width() - y.width()],
                                x = [i, 0 === i ? 0 : i / l.scrollRatio.x],
                                k = m[1],
                                S = g[1],
                                T = k > 0 ? k / l.scrollRatio.x : 0,
                                z = S > 0 ? S / l.scrollRatio.x : 0;
                            break;
                        case "y":
                            var y = t("#mCSB_" + l.idx + "_dragger_vertical"),
                                w = "top",
                                b = p[0].offsetTop,
                                _ = [d.height() - p.outerHeight(!1), y.parent().height() - y.height()],
                                x = [i, 0 === i ? 0 : i / l.scrollRatio.y],
                                k = m[0],
                                S = g[0],
                                T = k > 0 ? k / l.scrollRatio.y : 0,
                                z = S > 0 ? S / l.scrollRatio.y : 0
                    }
                    x[1] < 0 || 0 === x[0] && 0 === x[1] ? x = [0, 0] : x[1] >= _[1] ? x = [_[0], _[1]] : x[0] = -x[0], e[0].mcs || (r(), s("onInit") && h.callbacks.onInit.call(e[0])), clearTimeout(p[0].onCompleteTimeout), Q(y[0], w, Math.round(x[1]), u[1], o.scrollEasing), !l.tweenRunning && (0 === b && x[0] >= 0 || b === _[0] && x[0] <= _[0]) || Q(p[0], w, Math.round(x[0]), u[0], o.scrollEasing, o.overwrite, {
                        onStart: function() {
                            o.callbacks && o.onStart && !l.tweenRunning && (s("onScrollStart") && (r(), h.callbacks.onScrollStart.call(e[0])), l.tweenRunning = !0, C(y), l.cbOffsets = a())
                        },
                        onUpdate: function() {
                            o.callbacks && o.onUpdate && s("whileScrolling") && (r(), h.callbacks.whileScrolling.call(e[0]))
                        },
                        onComplete: function() {
                            if (o.callbacks && o.onComplete) {
                                "yx" === h.axis && clearTimeout(p[0].onCompleteTimeout);
                                var t = p[0].idleTimer || 0;
                                p[0].onCompleteTimeout = setTimeout(function() {
                                    s("onScroll") && (r(), h.callbacks.onScroll.call(e[0])), s("onTotalScroll") && x[1] >= _[1] - T && l.cbOffsets[0] && (r(), h.callbacks.onTotalScroll.call(e[0])), s("onTotalScrollBack") && x[1] <= z && l.cbOffsets[1] && (r(), h.callbacks.onTotalScrollBack.call(e[0])), l.tweenRunning = !1, p[0].idleTimer = 0, C(y, "hide")
                                }, t)
                            }
                        }
                    })
                }
            },
            Q = function(t, e, i, n, o, s, a) {
                function r() {
                    _.stop || (y || f.call(), y = Z() - v, l(), y >= _.time && (_.time = y > _.time ? y + d - (y - _.time) : y + d - 1, _.time < y + 1 && (_.time = y + 1)), _.time < n ? _.id = p(r) : g.call())
                }

                function l() {
                    n > 0 ? (_.currVal = u(_.time, w, x, n, o), b[e] = Math.round(_.currVal) + "px") : b[e] = i + "px", m.call()
                }

                function h() {
                    d = 1e3 / 60, _.time = y + d, p = window.requestAnimationFrame ? window.requestAnimationFrame : function(t) {
                        return l(), setTimeout(t, .01)
                    }, _.id = p(r)
                }

                function c() {
                    null != _.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(_.id) : clearTimeout(_.id), _.id = null)
                }

                function u(t, e, i, n, o) {
                    switch (o) {
                        case "linear":
                        case "mcsLinear":
                            return i * t / n + e;
                        case "mcsLinearOut":
                            return t /= n, t--, i * Math.sqrt(1 - t * t) + e;
                        case "easeInOutSmooth":
                            return t /= n / 2, 1 > t ? i / 2 * t * t + e : (t--, -i / 2 * (t * (t - 2) - 1) + e);
                        case "easeInOutStrong":
                            return t /= n / 2, 1 > t ? i / 2 * Math.pow(2, 10 * (t - 1)) + e : (t--, i / 2 * (2 - Math.pow(2, -10 * t)) + e);
                        case "easeInOut":
                        case "mcsEaseInOut":
                            return t /= n / 2, 1 > t ? i / 2 * t * t * t + e : (t -= 2, i / 2 * (t * t * t + 2) + e);
                        case "easeOutSmooth":
                            return t /= n, t--, -i * (t * t * t * t - 1) + e;
                        case "easeOutStrong":
                            return i * (1 - Math.pow(2, -10 * t / n)) + e;
                        case "easeOut":
                        case "mcsEaseOut":
                        default:
                            var s = (t /= n) * t,
                                a = s * t;
                            return e + i * (.499999999999997 * a * s + -2.5 * s * s + 5.5 * a + -6.5 * s + 4 * t)
                    }
                }
                t._mTween || (t._mTween = {
                    top: {},
                    left: {}
                });
                var d, p, a = a || {},
                    f = a.onStart || function() {},
                    m = a.onUpdate || function() {},
                    g = a.onComplete || function() {},
                    v = Z(),
                    y = 0,
                    w = t.offsetTop,
                    b = t.style,
                    _ = t._mTween[e];
                "left" === e && (w = t.offsetLeft);
                var x = i - w;
                _.stop = 0, "none" !== s && c(), h()
            },
            Z = function() {
                return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
            },
            G = function() {
                var t = this;
                t._mTween || (t._mTween = {
                    top: {},
                    left: {}
                });
                for (var e = ["top", "left"], i = 0; i < e.length; i++) {
                    var n = e[i];
                    t._mTween[n].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(t._mTween[n].id) : clearTimeout(t._mTween[n].id), t._mTween[n].id = null, t._mTween[n].stop = 1)
                }
            },
            J = function(t, e) {
                try {
                    delete t[e]
                } catch (i) {
                    t[e] = null
                }
            },
            tt = function(t) {
                return !(t.which && 1 !== t.which)
            },
            et = function(t) {
                var e = t.originalEvent.pointerType;
                return !(e && "touch" !== e && 2 !== e)
            },
            it = function(t) {
                return !isNaN(parseFloat(t)) && isFinite(t)
            },
            nt = function(t) {
                var e = t.parents(".mCSB_container");
                return [t.offset().top - e.offset().top, t.offset().left - e.offset().left]
            },
            ot = function() {
                function t() {
                    var t = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var e = 0; e < t.length; e++)
                        if (t[e] + "Hidden" in document) return t[e] + "Hidden";
                    return null
                }
                var e = t();
                return !!e && document[e]
            };
        t.fn[i] = function(e) {
            return u[e] ? u[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist") : u.init.apply(this, arguments)
        }, t[i] = function(e) {
            return u[e] ? u[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist") : u.init.apply(this, arguments)
        }, t[i].defaults = s, window[i] = !0, t(window).bind("load", function() {
            t(o)[i](), t.extend(t.expr[":"], {
                mcsInView: t.expr[":"].mcsInView || function(e) {
                    var i, n, o = t(e),
                        s = o.parents(".mCSB_container");
                    if (s.length) return i = s.parent(), n = [s[0].offsetTop, s[0].offsetLeft], n[0] + nt(o)[0] >= 0 && n[0] + nt(o)[0] < i.height() - o.outerHeight(!1) && n[1] + nt(o)[1] >= 0 && n[1] + nt(o)[1] < i.width() - o.outerWidth(!1)
                },
                mcsInSight: t.expr[":"].mcsInSight || function(e, i, n) {
                    var o, s, a, r, l = t(e),
                        h = l.parents(".mCSB_container"),
                        c = "exact" === n[3] ? [
                            [1, 0],
                            [1, 0]
                        ] : [
                            [.9, .1],
                            [.6, .4]
                        ];
                    if (h.length) return o = [l.outerHeight(!1), l.outerWidth(!1)], a = [h[0].offsetTop + nt(l)[0], h[0].offsetLeft + nt(l)[1]], s = [h.parent()[0].offsetHeight, h.parent()[0].offsetWidth], r = [o[0] < s[0] ? c[0] : c[1], o[1] < s[1] ? c[0] : c[1]], a[0] - s[0] * r[0][0] < 0 && a[0] + o[0] - s[0] * r[0][1] >= 0 && a[1] - s[1] * r[1][0] < 0 && a[1] + o[1] - s[1] * r[1][1] >= 0
                },
                mcsOverflow: t.expr[":"].mcsOverflow || function(e) {
                    var i = t(e).data(n);
                    if (i) return i.overflowed[0] || i.overflowed[1]
                }
            })
        })
    })
}),
function(t, e) {
    function i(e, i) {
        var o, s, a, r = e.nodeName.toLowerCase();
        return "area" === r ? (o = e.parentNode, s = o.name, !(!e.href || !s || "map" !== o.nodeName.toLowerCase()) && (!!(a = t("img[usemap=#" + s + "]")[0]) && n(a))) : (/input|select|textarea|button|object/.test(r) ? !e.disabled : "a" === r ? e.href || i : i) && n(e)
    }

    function n(e) {
        return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
            return "hidden" === t.css(this, "visibility")
        }).length
    }
    var o = 0,
        s = /^ui-id-\d+$/;
    t.ui = t.ui || {}, t.extend(t.ui, {
        version: "1.10.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), t.fn.extend({
        focus: function(e) {
            return function(i, n) {
                return "number" == typeof i ? this.each(function() {
                    var e = this;
                    setTimeout(function() {
                        t(e).focus(), n && n.call(e)
                    }, i)
                }) : e.apply(this, arguments)
            }
        }(t.fn.focus),
        scrollParent: function() {
            var e;
            return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e
        },
        zIndex: function(i) {
            if (i !== e) return this.css("zIndex", i);
            if (this.length)
                for (var n, o, s = t(this[0]); s.length && s[0] !== document;) {
                    if (("absolute" === (n = s.css("position")) || "relative" === n || "fixed" === n) && (o = parseInt(s.css("zIndex"), 10), !isNaN(o) && 0 !== o)) return o;
                    s = s.parent()
                }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++o)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                s.test(this.id) && t(this).removeAttr("id")
            })
        }
    }), t.extend(t.expr[":"], {
        data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
            return function(i) {
                return !!t.data(i, e)
            }
        }) : function(e, i, n) {
            return !!t.data(e, n[3])
        },
        focusable: function(e) {
            return i(e, !isNaN(t.attr(e, "tabindex")))
        },
        tabbable: function(e) {
            var n = t.attr(e, "tabindex"),
                o = isNaN(n);
            return (o || n >= 0) && i(e, !o)
        }
    }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(i, n) {
        function o(e, i, n, o) {
            return t.each(s, function() {
                i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
            }), i
        }
        var s = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
            a = n.toLowerCase(),
            r = {
                innerWidth: t.fn.innerWidth,
                innerHeight: t.fn.innerHeight,
                outerWidth: t.fn.outerWidth,
                outerHeight: t.fn.outerHeight
            };
        t.fn["inner" + n] = function(i) {
            return i === e ? r["inner" + n].call(this) : this.each(function() {
                t(this).css(a, o(this, i) + "px")
            })
        }, t.fn["outer" + n] = function(e, i) {
            return "number" != typeof e ? r["outer" + n].call(this, e) : this.each(function() {
                t(this).css(a, o(this, e, !0, i) + "px")
            })
        }
    }), t.fn.addBack || (t.fn.addBack = function(t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
        return function(i) {
            return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
        }
    }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.support.selectstart = "onselectstart" in document.createElement("div"), t.fn.extend({
        disableSelection: function() {
            return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(t) {
                t.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), t.extend(t.ui, {
        plugin: {
            add: function(e, i, n) {
                var o, s = t.ui[e].prototype;
                for (o in n) s.plugins[o] = s.plugins[o] || [], s.plugins[o].push([i, n[o]])
            },
            call: function(t, e, i) {
                var n, o = t.plugins[e];
                if (o && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)
                    for (n = 0; n < o.length; n++) t.options[o[n][0]] && o[n][1].apply(t.element, i)
            }
        },
        hasScroll: function(e, i) {
            if ("hidden" === t(e).css("overflow")) return !1;
            var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                o = !1;
            return e[n] > 0 || (e[n] = 1, o = e[n] > 0, e[n] = 0, o)
        }
    })
}(jQuery),
function(t, e) {
    var i = 0,
        n = Array.prototype.slice,
        o = t.cleanData;
    t.cleanData = function(e) {
        for (var i, n = 0; null != (i = e[n]); n++) try {
            t(i).triggerHandler("remove")
        } catch (t) {}
        o(e)
    }, t.widget = function(e, i, n) {
        var o, s, a, r, l = {},
            h = e.split(".")[0];
        e = e.split(".")[1], o = h + "-" + e, n || (n = i, i = t.Widget), t.expr[":"][o.toLowerCase()] = function(e) {
            return !!t.data(e, o)
        }, t[h] = t[h] || {}, s = t[h][e], a = t[h][e] = function(t, e) {
            if (!this._createWidget) return new a(t, e);
            arguments.length && this._createWidget(t, e)
        }, t.extend(a, s, {
            version: n.version,
            _proto: t.extend({}, n),
            _childConstructors: []
        }), r = new i, r.options = t.widget.extend({}, r.options), t.each(n, function(e, n) {
            if (!t.isFunction(n)) return void(l[e] = n);
            l[e] = function() {
                var t = function() {
                        return i.prototype[e].apply(this, arguments)
                    },
                    o = function(t) {
                        return i.prototype[e].apply(this, t)
                    };
                return function() {
                    var e, i = this._super,
                        s = this._superApply;
                    return this._super = t, this._superApply = o, e = n.apply(this, arguments), this._super = i, this._superApply = s, e
                }
            }()
        }), a.prototype = t.widget.extend(r, {
            widgetEventPrefix: s ? r.widgetEventPrefix || e : e
        }, l, {
            constructor: a,
            namespace: h,
            widgetName: e,
            widgetFullName: o
        }), s ? (t.each(s._childConstructors, function(e, i) {
            var n = i.prototype;
            t.widget(n.namespace + "." + n.widgetName, a, i._proto)
        }), delete s._childConstructors) : i._childConstructors.push(a), t.widget.bridge(e, a)
    }, t.widget.extend = function(i) {
        for (var o, s, a = n.call(arguments, 1), r = 0, l = a.length; r < l; r++)
            for (o in a[r]) s = a[r][o], a[r].hasOwnProperty(o) && s !== e && (t.isPlainObject(s) ? i[o] = t.isPlainObject(i[o]) ? t.widget.extend({}, i[o], s) : t.widget.extend({}, s) : i[o] = s);
        return i
    }, t.widget.bridge = function(i, o) {
        var s = o.prototype.widgetFullName || i;
        t.fn[i] = function(a) {
            var r = "string" == typeof a,
                l = n.call(arguments, 1),
                h = this;
            return a = !r && l.length ? t.widget.extend.apply(null, [a].concat(l)) : a, r ? this.each(function() {
                var n, o = t.data(this, s);
                return o ? t.isFunction(o[a]) && "_" !== a.charAt(0) ? (n = o[a].apply(o, l), n !== o && n !== e ? (h = n && n.jquery ? h.pushStack(n.get()) : n, !1) : void 0) : t.error("no such method '" + a + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + a + "'")
            }) : this.each(function() {
                var e = t.data(this, s);
                e ? e.option(a || {})._init() : t.data(this, s, new o(a, this))
            }), h
        }
    }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(e, n) {
            n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(t) {
                    t.target === n && this.destroy()
                }
            }), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: t.noop,
        widget: function() {
            return this.element
        },
        option: function(i, n) {
            var o, s, a, r = i;
            if (0 === arguments.length) return t.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (r = {}, o = i.split("."), i = o.shift(), o.length) {
                    for (s = r[i] = t.widget.extend({}, this.options[i]), a = 0; a < o.length - 1; a++) s[o[a]] = s[o[a]] || {}, s = s[o[a]];
                    if (i = o.pop(), 1 === arguments.length) return s[i] === e ? null : s[i];
                    s[i] = n
                } else {
                    if (1 === arguments.length) return this.options[i] === e ? null : this.options[i];
                    r[i] = n
                } return this._setOptions(r), this
        },
        _setOptions: function(t) {
            var e;
            for (e in t) this._setOption(e, t[e]);
            return this
        },
        _setOption: function(t, e) {
            return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(e, i, n) {
            var o, s = this;
            "boolean" != typeof e && (n = i, i = e, e = !1), n ? (i = o = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, o = this.widget()), t.each(n, function(n, a) {
                function r() {
                    if (e || !0 !== s.options.disabled && !t(this).hasClass("ui-state-disabled")) return ("string" == typeof a ? s[a] : a).apply(s, arguments)
                }
                "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
                var l = n.match(/^(\w+)\s*(.*)$/),
                    h = l[1] + s.eventNamespace,
                    c = l[2];
                c ? o.delegate(c, h, r) : i.bind(h, r)
            })
        },
        _off: function(t, e) {
            e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
        },
        _delay: function(t, e) {
            function i() {
                return ("string" == typeof t ? n[t] : t).apply(n, arguments)
            }
            var n = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function(e) {
                    t(e.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(e) {
                    t(e.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function(e) {
                    t(e.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(e) {
                    t(e.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(e, i, n) {
            var o, s, a = this.options[e];
            if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], s = i.originalEvent)
                for (o in s) o in i || (i[o] = s[o]);
            return this.element.trigger(i, n), !(t.isFunction(a) && !1 === a.apply(this.element[0], [i].concat(n)) || i.isDefaultPrevented())
        }
    }, t.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(e, i) {
        t.Widget.prototype["_" + e] = function(n, o, s) {
            "string" == typeof o && (o = {
                effect: o
            });
            var a, r = o ? !0 === o || "number" == typeof o ? i : o.effect || i : e;
            o = o || {}, "number" == typeof o && (o = {
                duration: o
            }), a = !t.isEmptyObject(o), o.complete = s, o.delay && n.delay(o.delay), a && t.effects && t.effects.effect[r] ? n[e](o) : r !== e && n[r] ? n[r](o.duration, o.easing, s) : n.queue(function(i) {
                t(this)[e](), s && s.call(n[0]), i()
            })
        }
    })
}(jQuery),
function(t) {
    var e = !1;
    t(document).mouseup(function() {
        e = !1
    }), t.widget("ui.mouse", {
        version: "1.10.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName, function(i) {
                if (!0 === t.data(i.target, e.widgetName + ".preventClickEvent")) return t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(i) {
            if (!e) {
                this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                var n = this,
                    o = 1 === i.which,
                    s = !("string" != typeof this.options.cancel || !i.target.nodeName) && t(i.target).closest(this.options.cancel).length;
                return !(o && !s && this._mouseCapture(i)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    n.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = !1 !== this._mouseStart(i), !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                    return n._mouseMove(t)
                }, this._mouseUpDelegate = function(t) {
                    return n._mouseUp(t)
                }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0))
            }
        },
        _mouseMove: function(e) {
            return t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e), this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function(e) {
            return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
}(jQuery),
function(t, e) {
    function i(t, e, i) {
        return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
    }

    function n(e, i) {
        return parseInt(t.css(e, i), 10) || 0
    }

    function o(e) {
        var i = e[0];
        return 9 === i.nodeType ? {
            width: e.width(),
            height: e.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : t.isWindow(i) ? {
            width: e.width(),
            height: e.height(),
            offset: {
                top: e.scrollTop(),
                left: e.scrollLeft()
            }
        } : i.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: i.pageY,
                left: i.pageX
            }
        } : {
            width: e.outerWidth(),
            height: e.outerHeight(),
            offset: e.offset()
        }
    }
    t.ui = t.ui || {};
    var s, a = Math.max,
        r = Math.abs,
        l = Math.round,
        h = /left|center|right/,
        c = /top|center|bottom/,
        u = /[\+\-]\d+(\.[\d]+)?%?/,
        d = /^\w+/,
        p = /%$/,
        f = t.fn.position;
    t.position = {
            scrollbarWidth: function() {
                if (s !== e) return s;
                var i, n, o = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    a = o.children()[0];
                return t("body").append(o), i = a.offsetWidth, o.css("overflow", "scroll"), n = a.offsetWidth, i === n && (n = o[0].clientWidth), o.remove(), s = i - n
            },
            getScrollInfo: function(e) {
                var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                    n = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                    o = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth;
                return {
                    width: "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight ? t.position.scrollbarWidth() : 0,
                    height: o ? t.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(e) {
                var i = t(e || window),
                    n = t.isWindow(i[0]);
                return {
                    element: i,
                    isWindow: n,
                    isDocument: !!i[0] && 9 === i[0].nodeType,
                    offset: i.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: n ? i.width() : i.outerWidth(),
                    height: n ? i.height() : i.outerHeight()
                }
            }
        }, t.fn.position = function(e) {
            if (!e || !e.of) return f.apply(this, arguments);
            e = t.extend({}, e);
            var s, p, m, g, v, y, w = t(e.of),
                b = t.position.getWithinInfo(e.within),
                _ = t.position.getScrollInfo(b),
                x = (e.collision || "flip").split(" "),
                C = {};
            return y = o(w), w[0].preventDefault && (e.at = "left top"), p = y.width, m = y.height, g = y.offset, v = t.extend({}, g), t.each(["my", "at"], function() {
                var t, i, n = (e[this] || "").split(" ");
                1 === n.length && (n = h.test(n[0]) ? n.concat(["center"]) : c.test(n[0]) ? ["center"].concat(n) : ["center", "center"]), n[0] = h.test(n[0]) ? n[0] : "center", n[1] = c.test(n[1]) ? n[1] : "center", t = u.exec(n[0]), i = u.exec(n[1]), C[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [d.exec(n[0])[0], d.exec(n[1])[0]]
            }), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2), "bottom" === e.at[1] ? v.top += m : "center" === e.at[1] && (v.top += m / 2), s = i(C.at, p, m), v.left += s[0], v.top += s[1], this.each(function() {
                var o, h, c = t(this),
                    u = c.outerWidth(),
                    d = c.outerHeight(),
                    f = n(this, "marginLeft"),
                    y = n(this, "marginTop"),
                    k = u + f + n(this, "marginRight") + _.width,
                    S = d + y + n(this, "marginBottom") + _.height,
                    T = t.extend({}, v),
                    z = i(C.my, c.outerWidth(), c.outerHeight());
                "right" === e.my[0] ? T.left -= u : "center" === e.my[0] && (T.left -= u / 2), "bottom" === e.my[1] ? T.top -= d : "center" === e.my[1] && (T.top -= d / 2), T.left += z[0], T.top += z[1], t.support.offsetFractions || (T.left = l(T.left), T.top = l(T.top)), o = {
                    marginLeft: f,
                    marginTop: y
                }, t.each(["left", "top"], function(i, n) {
                    t.ui.position[x[i]] && t.ui.position[x[i]][n](T, {
                        targetWidth: p,
                        targetHeight: m,
                        elemWidth: u,
                        elemHeight: d,
                        collisionPosition: o,
                        collisionWidth: k,
                        collisionHeight: S,
                        offset: [s[0] + z[0], s[1] + z[1]],
                        my: e.my,
                        at: e.at,
                        within: b,
                        elem: c
                    })
                }), e.using && (h = function(t) {
                    var i = g.left - T.left,
                        n = i + p - u,
                        o = g.top - T.top,
                        s = o + m - d,
                        l = {
                            target: {
                                element: w,
                                left: g.left,
                                top: g.top,
                                width: p,
                                height: m
                            },
                            element: {
                                element: c,
                                left: T.left,
                                top: T.top,
                                width: u,
                                height: d
                            },
                            horizontal: n < 0 ? "left" : i > 0 ? "right" : "center",
                            vertical: s < 0 ? "top" : o > 0 ? "bottom" : "middle"
                        };
                    p < u && r(i + n) < p && (l.horizontal = "center"), m < d && r(o + s) < m && (l.vertical = "middle"), a(r(i), r(n)) > a(r(o), r(s)) ? l.important = "horizontal" : l.important = "vertical", e.using.call(this, t, l)
                }), c.offset(t.extend(T, {
                    using: h
                }))
            })
        }, t.ui.position = {
            fit: {
                left: function(t, e) {
                    var i, n = e.within,
                        o = n.isWindow ? n.scrollLeft : n.offset.left,
                        s = n.width,
                        r = t.left - e.collisionPosition.marginLeft,
                        l = o - r,
                        h = r + e.collisionWidth - s - o;
                    e.collisionWidth > s ? l > 0 && h <= 0 ? (i = t.left + l + e.collisionWidth - s - o, t.left += l - i) : t.left = h > 0 && l <= 0 ? o : l > h ? o + s - e.collisionWidth : o : l > 0 ? t.left += l : h > 0 ? t.left -= h : t.left = a(t.left - r, t.left)
                },
                top: function(t, e) {
                    var i, n = e.within,
                        o = n.isWindow ? n.scrollTop : n.offset.top,
                        s = e.within.height,
                        r = t.top - e.collisionPosition.marginTop,
                        l = o - r,
                        h = r + e.collisionHeight - s - o;
                    e.collisionHeight > s ? l > 0 && h <= 0 ? (i = t.top + l + e.collisionHeight - s - o, t.top += l - i) : t.top = h > 0 && l <= 0 ? o : l > h ? o + s - e.collisionHeight : o : l > 0 ? t.top += l : h > 0 ? t.top -= h : t.top = a(t.top - r, t.top)
                }
            },
            flip: {
                left: function(t, e) {
                    var i, n, o = e.within,
                        s = o.offset.left + o.scrollLeft,
                        a = o.width,
                        l = o.isWindow ? o.scrollLeft : o.offset.left,
                        h = t.left - e.collisionPosition.marginLeft,
                        c = h - l,
                        u = h + e.collisionWidth - a - l,
                        d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                        p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                        f = -2 * e.offset[0];
                    c < 0 ? ((i = t.left + d + p + f + e.collisionWidth - a - s) < 0 || i < r(c)) && (t.left += d + p + f) : u > 0 && ((n = t.left - e.collisionPosition.marginLeft + d + p + f - l) > 0 || r(n) < u) && (t.left += d + p + f)
                },
                top: function(t, e) {
                    var i, n, o = e.within,
                        s = o.offset.top + o.scrollTop,
                        a = o.height,
                        l = o.isWindow ? o.scrollTop : o.offset.top,
                        h = t.top - e.collisionPosition.marginTop,
                        c = h - l,
                        u = h + e.collisionHeight - a - l,
                        d = "top" === e.my[1],
                        p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                        f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                        m = -2 * e.offset[1];
                    c < 0 ? (n = t.top + p + f + m + e.collisionHeight - a - s, t.top + p + f + m > c && (n < 0 || n < r(c)) && (t.top += p + f + m)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - l, t.top + p + f + m > u && (i > 0 || r(i) < u) && (t.top += p + f + m))
                }
            },
            flipfit: {
                left: function() {
                    t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function() {
            var e, i, n, o, s, a = document.getElementsByTagName("body")[0],
                r = document.createElement("div");
            e = document.createElement(a ? "div" : "body"), n = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            }, a && t.extend(n, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (s in n) e.style[s] = n[s];
            e.appendChild(r), i = a || document.documentElement, i.insertBefore(e, i.firstChild), r.style.cssText = "position: absolute; left: 10.7432222px;", o = t(r).offset().left, t.support.offsetFractions = o > 10 && o < 11, e.innerHTML = "", i.removeChild(e)
        }()
}(jQuery),
function(t) {
    var e = 0,
        i = {},
        n = {};
    i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "hide", n.height = n.paddingTop = n.paddingBottom = n.borderTopWidth = n.borderBottomWidth = "show", t.widget("ui.accordion", {
        version: "1.10.4",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        _create: function() {
            var e = this.options;
            this.prevShow = this.prevHide = t(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), e.collapsible || !1 !== e.active && null != e.active || (e.active = 0), this._processPanels(), e.active < 0 && (e.active += this.headers.length), this._refresh()
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : t(),
                content: this.active.length ? this.active.next() : t()
            }
        },
        _createIcons: function() {
            var e = this.options.icons;
            e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader), this.headers.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function() {
            var t;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }), this._destroyIcons(), t = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }), "content" !== this.options.heightStyle && t.css("height", "")
        },
        _setOption: function(t, e) {
            if ("active" === t) return void this._activate(e);
            "event" === t && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(e)), this._super(t, e), "collapsible" !== t || e || !1 !== this.options.active || this._activate(0), "icons" === t && (this._destroyIcons(), e && this._createIcons()), "disabled" === t && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e)
        },
        _keydown: function(e) {
            if (!e.altKey && !e.ctrlKey) {
                var i = t.ui.keyCode,
                    n = this.headers.length,
                    o = this.headers.index(e.target),
                    s = !1;
                switch (e.keyCode) {
                    case i.RIGHT:
                    case i.DOWN:
                        s = this.headers[(o + 1) % n];
                        break;
                    case i.LEFT:
                    case i.UP:
                        s = this.headers[(o - 1 + n) % n];
                        break;
                    case i.SPACE:
                    case i.ENTER:
                        this._eventHandler(e);
                        break;
                    case i.HOME:
                        s = this.headers[0];
                        break;
                    case i.END:
                        s = this.headers[n - 1]
                }
                s && (t(e.target).attr("tabIndex", -1), t(s).attr("tabIndex", 0), s.focus(), e.preventDefault())
            }
        },
        _panelKeyDown: function(e) {
            e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus()
        },
        refresh: function() {
            var e = this.options;
            this._processPanels(), !1 === e.active && !0 === e.collapsible || !this.headers.length ? (e.active = !1, this.active = t()) : !1 === e.active ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1, this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
        },
        _processPanels: function() {
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
        },
        _refresh: function() {
            var i, n = this.options,
                o = n.heightStyle,
                s = this.element.parent(),
                a = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++e);
            this.active = this._findActive(n.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function(e) {
                var i = t(this),
                    n = i.attr("id"),
                    o = i.next(),
                    s = o.attr("id");
                n || (n = a + "-header-" + e, i.attr("id", n)), s || (s = a + "-panel-" + e, o.attr("id", s)), i.attr("aria-controls", s), o.attr("aria-labelledby", n)
            }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }).next().attr({
                "aria-hidden": "true"
            }).hide(), this.active.length ? this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }).next().attr({
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(n.event), "fill" === o ? (i = s.height(), this.element.siblings(":visible").each(function() {
                var e = t(this),
                    n = e.css("position");
                "absolute" !== n && "fixed" !== n && (i -= e.outerHeight(!0))
            }), this.headers.each(function() {
                i -= t(this).outerHeight(!0)
            }), this.headers.next().each(function() {
                t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
            }).css("overflow", "auto")) : "auto" === o && (i = 0, this.headers.next().each(function() {
                i = Math.max(i, t(this).css("height", "").height())
            }).height(i))
        },
        _activate: function(e) {
            var i = this._findActive(e)[0];
            i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: t.noop
            }))
        },
        _findActive: function(e) {
            return "number" == typeof e ? this.headers.eq(e) : t()
        },
        _setupEvents: function(e) {
            var i = {
                keydown: "_keydown"
            };
            e && t.each(e.split(" "), function(t, e) {
                i[e] = "_eventHandler"
            }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }), this._hoverable(this.headers), this._focusable(this.headers)
        },
        _eventHandler: function(e) {
            var i = this.options,
                n = this.active,
                o = t(e.currentTarget),
                s = o[0] === n[0],
                a = s && i.collapsible,
                r = a ? t() : o.next(),
                l = n.next(),
                h = {
                    oldHeader: n,
                    oldPanel: l,
                    newHeader: a ? t() : o,
                    newPanel: r
                };
            e.preventDefault(), s && !i.collapsible || !1 === this._trigger("beforeActivate", e, h) || (i.active = !a && this.headers.index(o), this.active = s ? t() : o, this._toggle(h), n.removeClass("ui-accordion-header-active ui-state-active"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), s || (o.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && o.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), o.next().addClass("ui-accordion-content-active")))
        },
        _toggle: function(e) {
            var i = e.newPanel,
                n = this.prevShow.length ? this.prevShow : e.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = n, this.options.animate ? this._animate(i, n, e) : (n.hide(), i.show(), this._toggleComplete(e)), n.attr({
                "aria-hidden": "true"
            }), n.prev().attr("aria-selected", "false"), i.length && n.length ? n.prev().attr({
                tabIndex: -1,
                "aria-expanded": "false"
            }) : i.length && this.headers.filter(function() {
                return 0 === t(this).attr("tabIndex")
            }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({
                "aria-selected": "true",
                tabIndex: 0,
                "aria-expanded": "true"
            })
        },
        _animate: function(t, e, o) {
            var s, a, r, l = this,
                h = 0,
                c = t.length && (!e.length || t.index() < e.index()),
                u = this.options.animate || {},
                d = c && u.down || u,
                p = function() {
                    l._toggleComplete(o)
                };
            return "number" == typeof d && (r = d), "string" == typeof d && (a = d), a = a || d.easing || u.easing, r = r || d.duration || u.duration, e.length ? t.length ? (s = t.show().outerHeight(), e.animate(i, {
                duration: r,
                easing: a,
                step: function(t, e) {
                    e.now = Math.round(t)
                }
            }), void t.hide().animate(n, {
                duration: r,
                easing: a,
                complete: p,
                step: function(t, i) {
                    i.now = Math.round(t), "height" !== i.prop ? h += i.now : "content" !== l.options.heightStyle && (i.now = Math.round(s - e.outerHeight() - h), h = 0)
                }
            })) : e.animate(i, r, a, p) : t.animate(n, r, a, p)
        },
        _toggleComplete: function(t) {
            var e = t.oldPanel;
            e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), e.length && (e.parent()[0].className = e.parent()[0].className), this._trigger("activate", null, t)
        }
    })
}(jQuery),
function(t) {
    t.widget("ui.autocomplete", {
        version: "1.10.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var e, i, n, o = this.element[0].nodeName.toLowerCase(),
                s = "textarea" === o,
                a = "input" === o;
            this.isMultiLine = !!s || !a && this.element.prop("isContentEditable"), this.valueMethod = this.element[s || a ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                keydown: function(o) {
                    if (this.element.prop("readOnly")) return e = !0, n = !0, void(i = !0);
                    e = !1, n = !1, i = !1;
                    var s = t.ui.keyCode;
                    switch (o.keyCode) {
                        case s.PAGE_UP:
                            e = !0, this._move("previousPage", o);
                            break;
                        case s.PAGE_DOWN:
                            e = !0, this._move("nextPage", o);
                            break;
                        case s.UP:
                            e = !0, this._keyEvent("previous", o);
                            break;
                        case s.DOWN:
                            e = !0, this._keyEvent("next", o);
                            break;
                        case s.ENTER:
                        case s.NUMPAD_ENTER:
                            this.menu.active && (e = !0, o.preventDefault(), this.menu.select(o));
                            break;
                        case s.TAB:
                            this.menu.active && this.menu.select(o);
                            break;
                        case s.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term), this.close(o), o.preventDefault());
                            break;
                        default:
                            i = !0, this._searchTimeout(o)
                    }
                },
                keypress: function(n) {
                    if (e) return e = !1, void(this.isMultiLine && !this.menu.element.is(":visible") || n.preventDefault());
                    if (!i) {
                        var o = t.ui.keyCode;
                        switch (n.keyCode) {
                            case o.PAGE_UP:
                                this._move("previousPage", n);
                                break;
                            case o.PAGE_DOWN:
                                this._move("nextPage", n);
                                break;
                            case o.UP:
                                this._keyEvent("previous", n);
                                break;
                            case o.DOWN:
                                this._keyEvent("next", n)
                        }
                    }
                },
                input: function(t) {
                    if (n) return n = !1, void t.preventDefault();
                    this._searchTimeout(t)
                },
                focus: function() {
                    this.selectedItem = null, this.previous = this._value()
                },
                blur: function(t) {
                    if (this.cancelBlur) return void delete this.cancelBlur;
                    clearTimeout(this.searching), this.close(t), this._change(t)
                }
            }), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().data("ui-menu"), this._on(this.menu.element, {
                mousedown: function(e) {
                    e.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur
                    });
                    var i = this.menu.element[0];
                    t(e.target).closest(".ui-menu-item").length || this._delay(function() {
                        var e = this;
                        this.document.one("mousedown", function(n) {
                            n.target === e.element[0] || n.target === i || t.contains(i, n.target) || e.close()
                        })
                    })
                },
                menufocus: function(e, i) {
                    if (this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type))) return this.menu.blur(), void this.document.one("mousemove", function() {
                        t(e.target).trigger(e.originalEvent)
                    });
                    var n = i.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", e, {
                        item: n
                    }) ? e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(n.value) : this.liveRegion.text(n.value)
                },
                menuselect: function(t, e) {
                    var i = e.item.data("ui-autocomplete-item"),
                        n = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = n, this._delay(function() {
                        this.previous = n, this.selectedItem = i
                    })), !1 !== this._trigger("select", t, {
                        item: i
                    }) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i
                }
            }), this.liveRegion = t("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        },
        _setOption: function(t, e) {
            this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var e = this.options.appendTo;
            return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
        },
        _initSource: function() {
            var e, i, n = this;
            t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, n) {
                n(t.ui.autocomplete.filter(e, i.term))
            }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, o) {
                n.xhr && n.xhr.abort(), n.xhr = t.ajax({
                    url: i,
                    data: e,
                    dataType: "json",
                    success: function(t) {
                        o(t)
                    },
                    error: function() {
                        o([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(t) {
            clearTimeout(this.searching), this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, t))
            }, this.options.delay)
        },
        search: function(t, e) {
            return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : !1 !== this._trigger("search", e) ? this._search(t) : void 0
        },
        _search: function(t) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                term: t
            }, this._response())
        },
        _response: function() {
            var e = ++this.requestIndex;
            return t.proxy(function(t) {
                e === this.requestIndex && this.__response(t), --this.pending || this.element.removeClass("ui-autocomplete-loading")
            }, this)
        },
        __response: function(t) {
            t && (t = this._normalize(t)), this._trigger("response", null, {
                content: t
            }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
        },
        close: function(t) {
            this.cancelSearch = !0, this._close(t)
        },
        _close: function(t) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
        },
        _change: function(t) {
            this.previous !== this._value() && this._trigger("change", t, {
                item: this.selectedItem
            })
        },
        _normalize: function(e) {
            return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
                return "string" == typeof e ? {
                    label: e,
                    value: e
                } : t.extend({
                    label: e.label || e.value,
                    value: e.value || e.label
                }, e)
            })
        },
        _suggest: function(e) {
            var i = this.menu.element.empty();
            this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var t = this.menu.element;
            t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(e, i) {
            var n = this;
            t.each(i, function(t, i) {
                n._renderItemData(e, i)
            })
        },
        _renderItemData: function(t, e) {
            return this._renderItem(t, e).data("ui-autocomplete-item", e)
        },
        _renderItem: function(e, i) {
            return t("<li>").append(t("<a>").text(i.label)).appendTo(e)
        },
        _move: function(t, e) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this._value(this.term), void this.menu.blur()) : void this.menu[t](e) : void this.search(null, e)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(t, e) {
            this.isMultiLine && !this.menu.element.is(":visible") || (this._move(t, e), e.preventDefault())
        }
    }), t.extend(t.ui.autocomplete, {
        escapeRegex: function(t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(e, i) {
            var n = new RegExp(t.ui.autocomplete.escapeRegex(i), "i");
            return t.grep(e, function(t) {
                return n.test(t.label || t.value || t)
            })
        }
    }), t.widget("ui.autocomplete", t.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(t) {
                    return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(t) {
            var e;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (e = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.text(e))
        }
    })
}(jQuery),
function(t) {
    var e, i = "ui-button ui-widget ui-state-default ui-corner-all",
        n = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
        o = function() {
            var e = t(this);
            setTimeout(function() {
                e.find(":ui-button").button("refresh")
            }, 1)
        },
        s = function(e) {
            var i = e.name,
                n = e.form,
                o = t([]);
            return i && (i = i.replace(/'/g, "\\'"), o = n ? t(n).find("[name='" + i + "']") : t("[name='" + i + "']", e.ownerDocument).filter(function() {
                return !this.form
            })), o
        };
    t.widget("ui.button", {
        version: "1.10.4",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, o), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var n = this,
                a = this.options,
                r = "checkbox" === this.type || "radio" === this.type,
                l = r ? "" : "ui-state-active";
            null === a.label && (a.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(i).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                a.disabled || this === e && t(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function() {
                a.disabled || t(this).removeClass(l)
            }).bind("click" + this.eventNamespace, function(t) {
                a.disabled && (t.preventDefault(), t.stopImmediatePropagation())
            }), this._on({
                focus: function() {
                    this.buttonElement.addClass("ui-state-focus")
                },
                blur: function() {
                    this.buttonElement.removeClass("ui-state-focus")
                }
            }), r && this.element.bind("change" + this.eventNamespace, function() {
                n.refresh()
            }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (a.disabled) return !1
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (a.disabled) return !1;
                t(this).addClass("ui-state-active"), n.buttonElement.attr("aria-pressed", "true");
                var e = n.element[0];
                s(e).not(e).map(function() {
                    return t(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                if (a.disabled) return !1;
                t(this).addClass("ui-state-active"), e = this, n.document.one("mouseup", function() {
                    e = null
                })
            }).bind("mouseup" + this.eventNamespace, function() {
                if (a.disabled) return !1;
                t(this).removeClass("ui-state-active")
            }).bind("keydown" + this.eventNamespace, function(e) {
                if (a.disabled) return !1;
                e.keyCode !== t.ui.keyCode.SPACE && e.keyCode !== t.ui.keyCode.ENTER || t(this).addClass("ui-state-active")
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                t(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function(e) {
                e.keyCode === t.ui.keyCode.SPACE && t(this).click()
            })), this._setOption("disabled", a.disabled), this._resetButton()
        },
        _determineButtonType: function() {
            var t, e, i;
            this.element.is("[type=checkbox]") ? this.type = "checkbox" : this.element.is("[type=radio]") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button", "checkbox" === this.type || "radio" === this.type ? (t = this.element.parents().last(), e = "label[for='" + this.element.attr("id") + "']", this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(i + " ui-state-active " + n).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function(t, e) {
            if (this._super(t, e), "disabled" === t) return this.element.prop("disabled", !!e), void(e && this.buttonElement.removeClass("ui-state-focus"));
            this._resetButton()
        },
        refresh: function() {
            var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            e !== this.options.disabled && this._setOption("disabled", e), "radio" === this.type ? s(this.element[0]).each(function() {
                t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            if ("input" === this.type) return void(this.options.label && this.element.val(this.options.label));
            var e = this.buttonElement.removeClass(n),
                i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),
                o = this.options.icons,
                s = o.primary && o.secondary,
                a = [];
            o.primary || o.secondary ? (this.options.text && a.push("ui-button-text-icon" + (s ? "s" : o.primary ? "-primary" : "-secondary")), o.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + o.primary + "'></span>"), o.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + o.secondary + "'></span>"), this.options.text || (a.push(s ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", t.trim(i)))) : a.push("ui-button-text-only"), e.addClass(a.join(" "))
        }
    }), t.widget("ui.buttonset", {
        version: "1.10.4",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(t, e) {
            "disabled" === t && this.buttons.button("option", t, e), this._super(t, e)
        },
        refresh: function() {
            var e = "rtl" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return t(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                return t(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
}(jQuery),
function(t, e) {
    function i() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, t.extend(this._defaults, this.regional[""]), this.dpDiv = n(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function n(e) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(i, "mouseout", function() {
            t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", function() {
            t.datepicker._isDisabledDatepicker(s.inline ? e.parent()[0] : s.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
        })
    }

    function o(e, i) {
        t.extend(e, i);
        for (var n in i) null == i[n] && (e[n] = i[n]);
        return e
    }
    t.extend(t.ui, {
        datepicker: {
            version: "1.10.4"
        }
    });
    var s, a = "datepicker";
    t.extend(i.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(t) {
            return o(this._defaults, t || {}), this
        },
        _attachDatepicker: function(e, i) {
            var n, o, s;
            n = e.nodeName.toLowerCase(), o = "div" === n || "span" === n, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), s = this._newInst(t(e), o), s.settings = t.extend({}, i || {}), "input" === n ? this._connectDatepicker(e, s) : o && this._inlineDatepicker(e, s)
        },
        _newInst: function(e, i) {
            return {
                id: e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
                input: e,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? n(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(e, i) {
            var n = t(e);
            i.append = t([]), i.trigger = t([]), n.hasClass(this.markerClassName) || (this._attachments(n, i), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, a, i), i.settings.disabled && this._disableDatepicker(e))
        },
        _attachments: function(e, i) {
            var n, o, s, a = this._get(i, "appendText"),
                r = this._get(i, "isRTL");
            i.append && i.append.remove(), a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[r ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), n = this._get(i, "showOn"), "focus" !== n && "both" !== n || e.focus(this._showDatepicker), "button" !== n && "both" !== n || (o = this._get(i, "buttonText"), s = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                src: s,
                alt: o,
                title: o
            }) : t("<button type='button'></button>").addClass(this._triggerClass).html(s ? t("<img/>").attr({
                src: s,
                alt: o,
                title: o
            }) : o)), e[r ? "before" : "after"](i.trigger), i.trigger.click(function() {
                return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
            }))
        },
        _autoSize: function(t) {
            if (this._get(t, "autoSize") && !t.inline) {
                var e, i, n, o, s = new Date(2009, 11, 20),
                    a = this._get(t, "dateFormat");
                a.match(/[DM]/) && (e = function(t) {
                    for (i = 0, n = 0, o = 0; o < t.length; o++) t[o].length > i && (i = t[o].length, n = o);
                    return n
                }, s.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), s.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - s.getDay())), t.input.attr("size", this._formatDate(t, s).length)
            }
        },
        _inlineDatepicker: function(e, i) {
            var n = t(e);
            n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(i.dpDiv), t.data(e, a, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(e, i, n, s, r) {
            var l, h, c, u, d, p = this._dialogInst;
            return p || (this.uuid += 1, l = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + l + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, t.data(this._dialogInput[0], a, p)), o(p.settings, s || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = r ? r.length ? r : [r.pageX, r.pageY] : null, this._pos || (h = document.documentElement.clientWidth, c = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + u, c / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = n, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], a, p), this
        },
        _destroyDatepicker: function(e) {
            var i, n = t(e),
                o = t.data(e, a);
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, a), "input" === i ? (o.append.remove(), o.trigger.remove(), n.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : "div" !== i && "span" !== i || n.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function(e) {
            var i, n, o = t(e),
                s = t.data(e, a);
            o.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, s.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : "div" !== i && "span" !== i || (n = o.children("." + this._inlineClass), n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                return t === e ? null : t
            }))
        },
        _disableDatepicker: function(e) {
            var i, n, o = t(e),
                s = t.data(e, a);
            o.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, s.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : "div" !== i && "span" !== i || (n = o.children("." + this._inlineClass), n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                return t === e ? null : t
            }), this._disabledInputs[this._disabledInputs.length] = e)
        },
        _isDisabledDatepicker: function(t) {
            if (!t) return !1;
            for (var e = 0; e < this._disabledInputs.length; e++)
                if (this._disabledInputs[e] === t) return !0;
            return !1
        },
        _getInst: function(e) {
            try {
                return t.data(e, a)
            } catch (t) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(i, n, s) {
            var a, r, l, h, c = this._getInst(i);
            if (2 === arguments.length && "string" == typeof n) return "defaults" === n ? t.extend({}, t.datepicker._defaults) : c ? "all" === n ? t.extend({}, c.settings) : this._get(c, n) : null;
            a = n || {}, "string" == typeof n && (a = {}, a[n] = s), c && (this._curInst === c && this._hideDatepicker(), r = this._getDateDatepicker(i, !0), l = this._getMinMaxDate(c, "min"), h = this._getMinMaxDate(c, "max"), o(c.settings, a), null !== l && a.dateFormat !== e && a.minDate === e && (c.settings.minDate = this._formatDate(c, l)), null !== h && a.dateFormat !== e && a.maxDate === e && (c.settings.maxDate = this._formatDate(c, h)), "disabled" in a && (a.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(t(i), c),
                this._autoSize(c), this._setDate(c, r), this._updateAlternate(c), this._updateDatepicker(c))
        },
        _changeDatepicker: function(t, e, i) {
            this._optionDatepicker(t, e, i)
        },
        _refreshDatepicker: function(t) {
            var e = this._getInst(t);
            e && this._updateDatepicker(e)
        },
        _setDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
        },
        _doKeyDown: function(e) {
            var i, n, o, s = t.datepicker._getInst(e.target),
                a = !0,
                r = s.dpDiv.is(".ui-datepicker-rtl");
            if (s._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
                case 9:
                    t.datepicker._hideDatepicker(), a = !1;
                    break;
                case 13:
                    return o = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", s.dpDiv), o[0] && t.datepicker._selectDay(e.target, s.selectedMonth, s.selectedYear, o[0]), i = t.datepicker._get(s, "onSelect"), i ? (n = t.datepicker._formatDate(s), i.apply(s.input ? s.input[0] : null, [n, s])) : t.datepicker._hideDatepicker(), !1;
                case 27:
                    t.datepicker._hideDatepicker();
                    break;
                case 33:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(s, "stepBigMonths") : -t.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 34:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(s, "stepBigMonths") : +t.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 35:
                    (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), a = e.ctrlKey || e.metaKey;
                    break;
                case 36:
                    (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), a = e.ctrlKey || e.metaKey;
                    break;
                case 37:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(s, "stepBigMonths") : -t.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 38:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), a = e.ctrlKey || e.metaKey;
                    break;
                case 39:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(s, "stepBigMonths") : +t.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 40:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), a = e.ctrlKey || e.metaKey;
                    break;
                default:
                    a = !1
            } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;
            a && (e.preventDefault(), e.stopPropagation())
        },
        _doKeyPress: function(e) {
            var i, n, o = t.datepicker._getInst(e.target);
            if (t.datepicker._get(o, "constrainInput")) return i = t.datepicker._possibleChars(t.datepicker._get(o, "dateFormat")), n = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || n < " " || !i || i.indexOf(n) > -1
        },
        _doKeyUp: function(e) {
            var i, n = t.datepicker._getInst(e.target);
            if (n.input.val() !== n.lastVal) try {
                i = t.datepicker.parseDate(t.datepicker._get(n, "dateFormat"), n.input ? n.input.val() : null, t.datepicker._getFormatConfig(n)), i && (t.datepicker._setDateFromField(n), t.datepicker._updateAlternate(n), t.datepicker._updateDatepicker(n))
            } catch (t) {}
            return !0
        },
        _showDatepicker: function(e) {
            if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                var i, n, s, a, r, l, h;
                i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), n = t.datepicker._get(i, "beforeShow"), s = n ? n.apply(e, [e, i]) : {}, !1 !== s && (o(i.settings, s), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), a = !1, t(e).parents().each(function() {
                    return !(a |= "fixed" === t(this).css("position"))
                }), r = {
                    left: t.datepicker._pos[0],
                    top: t.datepicker._pos[1]
                }, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), t.datepicker._updateDatepicker(i), r = t.datepicker._checkOffset(i, r, a), i.dpDiv.css({
                    position: t.datepicker._inDialog && t.blockUI ? "static" : a ? "fixed" : "absolute",
                    display: "none",
                    left: r.left + "px",
                    top: r.top + "px"
                }), i.inline || (l = t.datepicker._get(i, "showAnim"), h = t.datepicker._get(i, "duration"), i.dpDiv.zIndex(t(e).zIndex() + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[l] ? i.dpDiv.show(l, t.datepicker._get(i, "showOptions"), h) : i.dpDiv[l || "show"](l ? h : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function(e) {
            this.maxRows = 4, s = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var i, n = this._getNumberOfMonths(e),
                o = n[1];
            e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), o > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + o).css("width", 17 * o + "em"), e.dpDiv[(1 !== n[0] || 1 !== n[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
                i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(t) {
            return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
        },
        _checkOffset: function(e, i, n) {
            var o = e.dpDiv.outerWidth(),
                s = e.dpDiv.outerHeight(),
                a = e.input ? e.input.outerWidth() : 0,
                r = e.input ? e.input.outerHeight() : 0,
                l = document.documentElement.clientWidth + (n ? 0 : t(document).scrollLeft()),
                h = document.documentElement.clientHeight + (n ? 0 : t(document).scrollTop());
            return i.left -= this._get(e, "isRTL") ? o - a : 0, i.left -= n && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= n && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + o > l && l > o ? Math.abs(i.left + o - l) : 0), i.top -= Math.min(i.top, i.top + s > h && h > s ? Math.abs(s + r) : 0), i
        },
        _findPos: function(e) {
            for (var i, n = this._getInst(e), o = this._get(n, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[o ? "previousSibling" : "nextSibling"];
            return i = t(e).offset(), [i.left, i.top]
        },
        _hideDatepicker: function(e) {
            var i, n, o, s, r = this._curInst;
            !r || e && r !== t.data(e, a) || this._datepickerShowing && (i = this._get(r, "showAnim"), n = this._get(r, "duration"), o = function() {
                t.datepicker._tidyDialog(r)
            }, t.effects && (t.effects.effect[i] || t.effects[i]) ? r.dpDiv.hide(i, t.datepicker._get(r, "showOptions"), n, o) : r.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? n : null, o), i || o(), this._datepickerShowing = !1, s = this._get(r, "onClose"), s && s.apply(r.input ? r.input[0] : null, [r.input ? r.input.val() : "", r]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function(t) {
            t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(e) {
            if (t.datepicker._curInst) {
                var i = t(e.target),
                    n = t.datepicker._getInst(i[0]);
                (i[0].id === t.datepicker._mainDivId || 0 !== i.parents("#" + t.datepicker._mainDivId).length || i.hasClass(t.datepicker.markerClassName) || i.closest("." + t.datepicker._triggerClass).length || !t.datepicker._datepickerShowing || t.datepicker._inDialog && t.blockUI) && (!i.hasClass(t.datepicker.markerClassName) || t.datepicker._curInst === n) || t.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(e, i, n) {
            var o = t(e),
                s = this._getInst(o[0]);
            this._isDisabledDatepicker(o[0]) || (this._adjustInstDate(s, i + ("M" === n ? this._get(s, "showCurrentAtPos") : 0), n), this._updateDatepicker(s))
        },
        _gotoToday: function(e) {
            var i, n = t(e),
                o = this._getInst(n[0]);
            this._get(o, "gotoCurrent") && o.currentDay ? (o.selectedDay = o.currentDay, o.drawMonth = o.selectedMonth = o.currentMonth, o.drawYear = o.selectedYear = o.currentYear) : (i = new Date, o.selectedDay = i.getDate(), o.drawMonth = o.selectedMonth = i.getMonth(), o.drawYear = o.selectedYear = i.getFullYear()), this._notifyChange(o), this._adjustDate(n)
        },
        _selectMonthYear: function(e, i, n) {
            var o = t(e),
                s = this._getInst(o[0]);
            s["selected" + ("M" === n ? "Month" : "Year")] = s["draw" + ("M" === n ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(s), this._adjustDate(o)
        },
        _selectDay: function(e, i, n, o) {
            var s, a = t(e);
            t(o).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (s = this._getInst(a[0]), s.selectedDay = s.currentDay = t("a", o).html(), s.selectedMonth = s.currentMonth = i, s.selectedYear = s.currentYear = n, this._selectDate(e, this._formatDate(s, s.currentDay, s.currentMonth, s.currentYear)))
        },
        _clearDate: function(e) {
            var i = t(e);
            this._selectDate(i, "")
        },
        _selectDate: function(e, i) {
            var n, o = t(e),
                s = this._getInst(o[0]);
            i = null != i ? i : this._formatDate(s), s.input && s.input.val(i), this._updateAlternate(s), n = this._get(s, "onSelect"), n ? n.apply(s.input ? s.input[0] : null, [i, s]) : s.input && s.input.trigger("change"), s.inline ? this._updateDatepicker(s) : (this._hideDatepicker(), this._lastInput = s.input[0], "object" != typeof s.input[0] && s.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function(e) {
            var i, n, o, s = this._get(e, "altField");
            s && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), n = this._getDate(e), o = this.formatDate(i, n, this._getFormatConfig(e)), t(s).each(function() {
                t(this).val(o)
            }))
        },
        noWeekends: function(t) {
            var e = t.getDay();
            return [e > 0 && e < 6, ""]
        },
        iso8601Week: function(t) {
            var e, i = new Date(t.getTime());
            return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
        },
        parseDate: function(e, i, n) {
            if (null == e || null == i) throw "Invalid arguments";
            if ("" === (i = "object" == typeof i ? i.toString() : i + "")) return null;
            var o, s, a, r, l = 0,
                h = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                c = "string" != typeof h ? h : (new Date).getFullYear() % 100 + parseInt(h, 10),
                u = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                d = (n ? n.dayNames : null) || this._defaults.dayNames,
                p = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                f = (n ? n.monthNames : null) || this._defaults.monthNames,
                m = -1,
                g = -1,
                v = -1,
                y = -1,
                w = !1,
                b = function(t) {
                    var i = o + 1 < e.length && e.charAt(o + 1) === t;
                    return i && o++, i
                },
                _ = function(t) {
                    var e = b(t),
                        n = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                        o = new RegExp("^\\d{1," + n + "}"),
                        s = i.substring(l).match(o);
                    if (!s) throw "Missing number at position " + l;
                    return l += s[0].length, parseInt(s[0], 10)
                },
                x = function(e, n, o) {
                    var s = -1,
                        a = t.map(b(e) ? o : n, function(t, e) {
                            return [
                                [e, t]
                            ]
                        }).sort(function(t, e) {
                            return -(t[1].length - e[1].length)
                        });
                    if (t.each(a, function(t, e) {
                            var n = e[1];
                            if (i.substr(l, n.length).toLowerCase() === n.toLowerCase()) return s = e[0], l += n.length, !1
                        }), -1 !== s) return s + 1;
                    throw "Unknown name at position " + l
                },
                C = function() {
                    if (i.charAt(l) !== e.charAt(o)) throw "Unexpected literal at position " + l;
                    l++
                };
            for (o = 0; o < e.length; o++)
                if (w) "'" !== e.charAt(o) || b("'") ? C() : w = !1;
                else switch (e.charAt(o)) {
                    case "d":
                        v = _("d");
                        break;
                    case "D":
                        x("D", u, d);
                        break;
                    case "o":
                        y = _("o");
                        break;
                    case "m":
                        g = _("m");
                        break;
                    case "M":
                        g = x("M", p, f);
                        break;
                    case "y":
                        m = _("y");
                        break;
                    case "@":
                        r = new Date(_("@")), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
                        break;
                    case "!":
                        r = new Date((_("!") - this._ticksTo1970) / 1e4), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
                        break;
                    case "'":
                        b("'") ? C() : w = !0;
                        break;
                    default:
                        C()
                }
            if (l < i.length && (a = i.substr(l), !/^\s+/.test(a))) throw "Extra/unparsed characters found in date: " + a;
            if (-1 === m ? m = (new Date).getFullYear() : m < 100 && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (m <= c ? 0 : -100)), y > -1)
                for (g = 1, v = y;;) {
                    if (s = this._getDaysInMonth(m, g - 1), v <= s) break;
                    g++, v -= s
                }
            if (r = this._daylightSavingAdjust(new Date(m, g - 1, v)), r.getFullYear() !== m || r.getMonth() + 1 !== g || r.getDate() !== v) throw "Invalid date";
            return r
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(t, e, i) {
            if (!e) return "";
            var n, o = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                s = (i ? i.dayNames : null) || this._defaults.dayNames,
                a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                r = (i ? i.monthNames : null) || this._defaults.monthNames,
                l = function(e) {
                    var i = n + 1 < t.length && t.charAt(n + 1) === e;
                    return i && n++, i
                },
                h = function(t, e, i) {
                    var n = "" + e;
                    if (l(t))
                        for (; n.length < i;) n = "0" + n;
                    return n
                },
                c = function(t, e, i, n) {
                    return l(t) ? n[e] : i[e]
                },
                u = "",
                d = !1;
            if (e)
                for (n = 0; n < t.length; n++)
                    if (d) "'" !== t.charAt(n) || l("'") ? u += t.charAt(n) : d = !1;
                    else switch (t.charAt(n)) {
                        case "d":
                            u += h("d", e.getDate(), 2);
                            break;
                        case "D":
                            u += c("D", e.getDay(), o, s);
                            break;
                        case "o":
                            u += h("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            u += h("m", e.getMonth() + 1, 2);
                            break;
                        case "M":
                            u += c("M", e.getMonth(), a, r);
                            break;
                        case "y":
                            u += l("y") ? e.getFullYear() : (e.getYear() % 100 < 10 ? "0" : "") + e.getYear() % 100;
                            break;
                        case "@":
                            u += e.getTime();
                            break;
                        case "!":
                            u += 1e4 * e.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            l("'") ? u += "'" : d = !0;
                            break;
                        default:
                            u += t.charAt(n)
                    }
            return u
        },
        _possibleChars: function(t) {
            var e, i = "",
                n = !1,
                o = function(i) {
                    var n = e + 1 < t.length && t.charAt(e + 1) === i;
                    return n && e++, n
                };
            for (e = 0; e < t.length; e++)
                if (n) "'" !== t.charAt(e) || o("'") ? i += t.charAt(e) : n = !1;
                else switch (t.charAt(e)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        o("'") ? i += "'" : n = !0;
                        break;
                    default:
                        i += t.charAt(e)
                }
            return i
        },
        _get: function(t, i) {
            return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
        },
        _setDateFromField: function(t, e) {
            if (t.input.val() !== t.lastVal) {
                var i = this._get(t, "dateFormat"),
                    n = t.lastVal = t.input ? t.input.val() : null,
                    o = this._getDefaultDate(t),
                    s = o,
                    a = this._getFormatConfig(t);
                try {
                    s = this.parseDate(i, n, a) || o
                } catch (t) {
                    n = e ? "" : n
                }
                t.selectedDay = s.getDate(), t.drawMonth = t.selectedMonth = s.getMonth(), t.drawYear = t.selectedYear = s.getFullYear(), t.currentDay = n ? s.getDate() : 0, t.currentMonth = n ? s.getMonth() : 0, t.currentYear = n ? s.getFullYear() : 0, this._adjustInstDate(t)
            }
        },
        _getDefaultDate: function(t) {
            return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
        },
        _determineDate: function(e, i, n) {
            var o = function(t) {
                    var e = new Date;
                    return e.setDate(e.getDate() + t), e
                },
                s = function(i) {
                    try {
                        return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                    } catch (t) {}
                    for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, o = n.getFullYear(), s = n.getMonth(), a = n.getDate(), r = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = r.exec(i); l;) {
                        switch (l[2] || "d") {
                            case "d":
                            case "D":
                                a += parseInt(l[1], 10);
                                break;
                            case "w":
                            case "W":
                                a += 7 * parseInt(l[1], 10);
                                break;
                            case "m":
                            case "M":
                                s += parseInt(l[1], 10), a = Math.min(a, t.datepicker._getDaysInMonth(o, s));
                                break;
                            case "y":
                            case "Y":
                                o += parseInt(l[1], 10), a = Math.min(a, t.datepicker._getDaysInMonth(o, s))
                        }
                        l = r.exec(i)
                    }
                    return new Date(o, s, a)
                },
                a = null == i || "" === i ? n : "string" == typeof i ? s(i) : "number" == typeof i ? isNaN(i) ? n : o(i) : new Date(i.getTime());
            return a = a && "Invalid Date" === a.toString() ? n : a, a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a)
        },
        _daylightSavingAdjust: function(t) {
            return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
        },
        _setDate: function(t, e, i) {
            var n = !e,
                o = t.selectedMonth,
                s = t.selectedYear,
                a = this._restrictMinMax(t, this._determineDate(t, e, new Date));
            t.selectedDay = t.currentDay = a.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(), t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(), o === t.selectedMonth && s === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(n ? "" : this._formatDate(t))
        },
        _getDate: function(t) {
            return !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay))
        },
        _attachHandlers: function(e) {
            var i = this._get(e, "stepMonths"),
                n = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function() {
                var e = {
                    prev: function() {
                        t.datepicker._adjustDate(n, -i, "M")
                    },
                    next: function() {
                        t.datepicker._adjustDate(n, +i, "M")
                    },
                    hide: function() {
                        t.datepicker._hideDatepicker()
                    },
                    today: function() {
                        t.datepicker._gotoToday(n)
                    },
                    selectDay: function() {
                        return t.datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function() {
                        return t.datepicker._selectMonthYear(n, this, "M"), !1
                    },
                    selectYear: function() {
                        return t.datepicker._selectMonthYear(n, this, "Y"), !1
                    }
                };
                t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(t) {
            var e, i, n, o, s, a, r, l, h, c, u, d, p, f, m, g, v, y, w, b, _, x, C, k, S, T, z, D, W, P, E, $, I, M, A, H, O, L, N, R = new Date,
                B = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())),
                j = this._get(t, "isRTL"),
                F = this._get(t, "showButtonPanel"),
                q = this._get(t, "hideIfNoPrevNext"),
                Y = this._get(t, "navigationAsDateFormat"),
                X = this._getNumberOfMonths(t),
                U = this._get(t, "showCurrentAtPos"),
                V = this._get(t, "stepMonths"),
                K = 1 !== X[0] || 1 !== X[1],
                Q = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                Z = this._getMinMaxDate(t, "min"),
                G = this._getMinMaxDate(t, "max"),
                J = t.drawMonth - U,
                tt = t.drawYear;
            if (J < 0 && (J += 12, tt--), G)
                for (e = this._daylightSavingAdjust(new Date(G.getFullYear(), G.getMonth() - X[0] * X[1] + 1, G.getDate())), e = Z && e < Z ? Z : e; this._daylightSavingAdjust(new Date(tt, J, 1)) > e;) --J < 0 && (J = 11, tt--);
            for (t.drawMonth = J, t.drawYear = tt, i = this._get(t, "prevText"), i = Y ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, J - V, 1)), this._getFormatConfig(t)) : i, n = this._canAdjustMonth(t, -1, tt, J) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "e" : "w") + "'>" + i + "</span></a>" : q ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "e" : "w") + "'>" + i + "</span></a>", o = this._get(t, "nextText"), o = Y ? this.formatDate(o, this._daylightSavingAdjust(new Date(tt, J + V, 1)), this._getFormatConfig(t)) : o, s = this._canAdjustMonth(t, 1, tt, J) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + o + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "w" : "e") + "'>" + o + "</span></a>" : q ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + o + "'><span class='ui-icon ui-icon-circle-triangle-" + (j ? "w" : "e") + "'>" + o + "</span></a>", a = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? Q : B, a = Y ? this.formatDate(a, r, this._getFormatConfig(t)) : a, l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", h = F ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (j ? l : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>" : "") + (j ? "" : l) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), m = this._get(t, "monthNamesShort"), g = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), y = this._get(t, "selectOtherMonths"), w = this._getDefaultDate(t), b = "", x = 0; x < X[0]; x++) {
                for (C = "", this.maxRows = 4, k = 0; k < X[1]; k++) {
                    if (S = this._daylightSavingAdjust(new Date(tt, J, t.selectedDay)), T = " ui-corner-all", z = "", K) {
                        if (z += "<div class='ui-datepicker-group", X[1] > 1) switch (k) {
                            case 0:
                                z += " ui-datepicker-group-first", T = " ui-corner-" + (j ? "right" : "left");
                                break;
                            case X[1] - 1:
                                z += " ui-datepicker-group-last", T = " ui-corner-" + (j ? "left" : "right");
                                break;
                            default:
                                z += " ui-datepicker-group-middle", T = ""
                        }
                        z += "'>"
                    }
                    for (z += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + T + "'>" + (/all|left/.test(T) && 0 === x ? j ? s : n : "") + (/all|right/.test(T) && 0 === x ? j ? n : s : "") + this._generateMonthYearHeader(t, J, tt, Z, G, x > 0 || k > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead><tr>", D = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", _ = 0; _ < 7; _++) W = (_ + c) % 7, D += "<th" + ((_ + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + d[W] + "'>" + p[W] + "</span></th>";
                    for (z += D + "</tr></thead><tbody>", P = this._getDaysInMonth(tt, J), tt === t.selectedYear && J === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, P)), E = (this._getFirstDayOfMonth(tt, J) - c + 7) % 7, $ = Math.ceil((E + P) / 7), I = K && this.maxRows > $ ? this.maxRows : $, this.maxRows = I, M = this._daylightSavingAdjust(new Date(tt, J, 1 - E)), A = 0; A < I; A++) {
                        for (z += "<tr>", H = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(M) + "</td>" : "", _ = 0; _ < 7; _++) O = g ? g.apply(t.input ? t.input[0] : null, [M]) : [!0, ""], L = M.getMonth() !== J, N = L && !y || !O[0] || Z && M < Z || G && M > G, H += "<td class='" + ((_ + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (L ? " ui-datepicker-other-month" : "") + (M.getTime() === S.getTime() && J === t.selectedMonth && t._keyEvent || w.getTime() === M.getTime() && w.getTime() === S.getTime() ? " " + this._dayOverClass : "") + (N ? " " + this._unselectableClass + " ui-state-disabled" : "") + (L && !v ? "" : " " + O[1] + (M.getTime() === Q.getTime() ? " " + this._currentClass : "") + (M.getTime() === B.getTime() ? " ui-datepicker-today" : "")) + "'" + (L && !v || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") + (N ? "" : " data-handler='selectDay' data-event='click' data-month='" + M.getMonth() + "' data-year='" + M.getFullYear() + "'") + ">" + (L && !v ? "&#xa0;" : N ? "<span class='ui-state-default'>" + M.getDate() + "</span>" : "<a class='ui-state-default" + (M.getTime() === B.getTime() ? " ui-state-highlight" : "") + (M.getTime() === Q.getTime() ? " ui-state-active" : "") + (L ? " ui-priority-secondary" : "") + "' href='#'>" + M.getDate() + "</a>") + "</td>", M.setDate(M.getDate() + 1), M = this._daylightSavingAdjust(M);
                        z += H + "</tr>"
                    }
                    J++, J > 11 && (J = 0, tt++), z += "</tbody></table>" + (K ? "</div>" + (X[0] > 0 && k === X[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), C += z
                }
                b += C
            }
            return b += h, t._keyEvent = !1, b
        },
        _generateMonthYearHeader: function(t, e, i, n, o, s, a, r) {
            var l, h, c, u, d, p, f, m, g = this._get(t, "changeMonth"),
                v = this._get(t, "changeYear"),
                y = this._get(t, "showMonthAfterYear"),
                w = "<div class='ui-datepicker-title'>",
                b = "";
            if (s || !g) b += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
            else {
                for (l = n && n.getFullYear() === i, h = o && o.getFullYear() === i, b += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; c < 12; c++)(!l || c >= n.getMonth()) && (!h || c <= o.getMonth()) && (b += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
                b += "</select>"
            }
            if (y || (w += b + (!s && g && v ? "" : "&#xa0;")), !t.yearshtml)
                if (t.yearshtml = "", s || !v) w += "<span class='ui-datepicker-year'>" + i + "</span>";
                else {
                    for (u = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
                            var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                            return isNaN(e) ? d : e
                        }, f = p(u[0]), m = Math.max(f, p(u[1] || "")), f = n ? Math.max(f, n.getFullYear()) : f, m = o ? Math.min(m, o.getFullYear()) : m, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; f <= m; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                    t.yearshtml += "</select>", w += t.yearshtml, t.yearshtml = null
                } return w += this._get(t, "yearSuffix"), y && (w += (!s && g && v ? "" : "&#xa0;") + b), w += "</div>"
        },
        _adjustInstDate: function(t, e, i) {
            var n = t.drawYear + ("Y" === i ? e : 0),
                o = t.drawMonth + ("M" === i ? e : 0),
                s = Math.min(t.selectedDay, this._getDaysInMonth(n, o)) + ("D" === i ? e : 0),
                a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(n, o, s)));
            t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), "M" !== i && "Y" !== i || this._notifyChange(t)
        },
        _restrictMinMax: function(t, e) {
            var i = this._getMinMaxDate(t, "min"),
                n = this._getMinMaxDate(t, "max"),
                o = i && e < i ? i : e;
            return n && o > n ? n : o
        },
        _notifyChange: function(t) {
            var e = this._get(t, "onChangeMonthYear");
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
        },
        _getNumberOfMonths: function(t) {
            var e = this._get(t, "numberOfMonths");
            return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
        },
        _getMinMaxDate: function(t, e) {
            return this._determineDate(t, this._get(t, e + "Date"), null)
        },
        _getDaysInMonth: function(t, e) {
            return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
        },
        _getFirstDayOfMonth: function(t, e) {
            return new Date(t, e, 1).getDay()
        },
        _canAdjustMonth: function(t, e, i, n) {
            var o = this._getNumberOfMonths(t),
                s = this._daylightSavingAdjust(new Date(i, n + (e < 0 ? e : o[0] * o[1]), 1));
            return e < 0 && s.setDate(this._getDaysInMonth(s.getFullYear(), s.getMonth())), this._isInRange(t, s)
        },
        _isInRange: function(t, e) {
            var i, n, o = this._getMinMaxDate(t, "min"),
                s = this._getMinMaxDate(t, "max"),
                a = null,
                r = null,
                l = this._get(t, "yearRange");
            return l && (i = l.split(":"), n = (new Date).getFullYear(), a = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += n), i[1].match(/[+\-].*/) && (r += n)), (!o || e.getTime() >= o.getTime()) && (!s || e.getTime() <= s.getTime()) && (!a || e.getFullYear() >= a) && (!r || e.getFullYear() <= r)
        },
        _getFormatConfig: function(t) {
            var e = this._get(t, "shortYearCutoff");
            return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                shortYearCutoff: e,
                dayNamesShort: this._get(t, "dayNamesShort"),
                dayNames: this._get(t, "dayNames"),
                monthNamesShort: this._get(t, "monthNamesShort"),
                monthNames: this._get(t, "monthNames")
            }
        },
        _formatDate: function(t, e, i, n) {
            e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
            var o = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(n, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return this.formatDate(this._get(t, "dateFormat"), o, this._getFormatConfig(t))
        }
    }), t.fn.datepicker = function(e) {
        if (!this.length) return this;
        t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
            "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
        }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
    }, t.datepicker = new i, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.10.4"
}(jQuery),
function(t) {
    var e = {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        i = {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        };
    t.widget("ui.dialog", {
        version: "1.10.4",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(e) {
                    var i = t(this).css(e).offset().top;
                    i < 0 && t(this).css("top", e.top - i)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            }, this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var e = this.options.appendTo;
            return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
        },
        _destroy: function() {
            var t, e = this.originalPosition;
            this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: t.noop,
        enable: t.noop,
        close: function(e) {
            var i, n = this;
            if (this._isOpen && !1 !== this._trigger("beforeClose", e)) {
                if (this._isOpen = !1, this._destroyOverlay(), !this.opener.filter(":focusable").focus().length) try {
                    i = this.document[0].activeElement, i && "body" !== i.nodeName.toLowerCase() && t(i).blur()
                } catch (t) {}
                this._hide(this.uiDialog, this.options.hide, function() {
                    n._trigger("close", e)
                })
            }
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(t, e) {
            var i = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
            return i && !e && this._trigger("focus", t), i
        },
        open: function() {
            var e = this;
            if (this._isOpen) return void(this._moveToTop() && this._focusTabbable());
            this._isOpen = !0, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function() {
                e._focusTabbable(), e._trigger("focus")
            }), this._trigger("open")
        },
        _focusTabbable: function() {
            var t = this.element.find("[autofocus]");
            t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).focus()
        },
        _keepFocus: function(e) {
            function i() {
                var e = this.document[0].activeElement;
                this.uiDialog[0] === e || t.contains(this.uiDialog[0], e) || this._focusTabbable()
            }
            e.preventDefault(), i.call(this), this._delay(i)
        },
        _createWrapper: function() {
            this.uiDialog = t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                keydown: function(e) {
                    if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), void this.close(e);
                    if (e.keyCode === t.ui.keyCode.TAB) {
                        var i = this.uiDialog.find(":tabbable"),
                            n = i.filter(":first"),
                            o = i.filter(":last");
                        e.target !== o[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== n[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (o.focus(1), e.preventDefault()) : (n.focus(1), e.preventDefault())
                    }
                },
                mousedown: function(t) {
                    this._moveToTop(t) && this._focusTabbable()
                }
            }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var e;
            this.uiDialogTitlebar = t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
                mousedown: function(e) {
                    t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                }
            }), this.uiDialogTitlebarClose = t("<button type='button'></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                click: function(t) {
                    t.preventDefault(), this.close(t)
                }
            }), e = t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(e), this.uiDialog.attr({
                "aria-labelledby": e.attr("id")
            })
        },
        _title: function(t) {
            this.options.title || t.html("&#160;"), t.text(this.options.title)
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
        },
        _createButtons: function() {
            var e = this,
                i = this.options.buttons;
            if (this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length) return void this.uiDialog.removeClass("ui-dialog-buttons");
            t.each(i, function(i, n) {
                var o, s;
                n = t.isFunction(n) ? {
                    click: n,
                    text: i
                } : n, n = t.extend({
                    type: "button"
                }, n), o = n.click, n.click = function() {
                    o.apply(e.element[0], arguments)
                }, s = {
                    icons: n.icons,
                    text: n.showText
                }, delete n.icons, delete n.showText, t("<button></button>", n).button(s).appendTo(e.uiButtonSet)
            }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog)
        },
        _makeDraggable: function() {
            function e(t) {
                return {
                    position: t.position,
                    offset: t.offset
                }
            }
            var i = this,
                n = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(n, o) {
                    t(this).addClass("ui-dialog-dragging"),
                        i._blockFrames(), i._trigger("dragStart", n, e(o))
                },
                drag: function(t, n) {
                    i._trigger("drag", t, e(n))
                },
                stop: function(o, s) {
                    n.position = [s.position.left - i.document.scrollLeft(), s.position.top - i.document.scrollTop()], t(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", o, e(s))
                }
            })
        },
        _makeResizable: function() {
            function e(t) {
                return {
                    originalPosition: t.originalPosition,
                    originalSize: t.originalSize,
                    position: t.position,
                    size: t.size
                }
            }
            var i = this,
                n = this.options,
                o = n.resizable,
                s = this.uiDialog.css("position"),
                a = "string" == typeof o ? o : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: n.maxWidth,
                maxHeight: n.maxHeight,
                minWidth: n.minWidth,
                minHeight: this._minHeight(),
                handles: a,
                start: function(n, o) {
                    t(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", n, e(o))
                },
                resize: function(t, n) {
                    i._trigger("resize", t, e(n))
                },
                stop: function(o, s) {
                    n.height = t(this).height(), n.width = t(this).width(), t(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", o, e(s))
                }
            }).css("position", s)
        },
        _minHeight: function() {
            var t = this.options;
            return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
        },
        _position: function() {
            var t = this.uiDialog.is(":visible");
            t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
        },
        _setOptions: function(n) {
            var o = this,
                s = !1,
                a = {};
            t.each(n, function(t, n) {
                o._setOption(t, n), t in e && (s = !0), t in i && (a[t] = n)
            }), s && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", a)
        },
        _setOption: function(t, e) {
            var i, n, o = this.uiDialog;
            "dialogClass" === t && o.removeClass(this.options.dialogClass).addClass(e), "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({
                label: "" + e
            }), "draggable" === t && (i = o.is(":data(ui-draggable)"), i && !e && o.draggable("destroy"), !i && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (n = o.is(":data(ui-resizable)"), n && !e && o.resizable("destroy"), n && "string" == typeof e && o.resizable("option", "handles", e), n || !1 === e || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var t, e, i, n = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }), n.minWidth > n.width && (n.width = n.minWidth), t = this.uiDialog.css({
                height: "auto",
                width: n.width
            }).outerHeight(), e = Math.max(0, n.minHeight - t), i = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none", "auto" === n.height ? this.element.css({
                minHeight: e,
                maxHeight: i,
                height: "auto"
            }) : this.element.height(Math.max(0, n.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var e = t(this);
                return t("<div>").css({
                    position: "absolute",
                    width: e.outerWidth(),
                    height: e.outerHeight()
                }).appendTo(e.parent()).offset(e.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _allowInteraction: function(e) {
            return !!t(e.target).closest(".ui-dialog").length || !!t(e.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var e = this,
                    i = this.widgetFullName;
                t.ui.dialog.overlayInstances || this._delay(function() {
                    t.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(n) {
                        e._allowInteraction(n) || (n.preventDefault(), t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())
                    })
                }), this.overlay = t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
                    mousedown: "_keepFocus"
                }), t.ui.dialog.overlayInstances++
            }
        },
        _destroyOverlay: function() {
            this.options.modal && this.overlay && (t.ui.dialog.overlayInstances--, t.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
        }
    }), t.ui.dialog.overlayInstances = 0, !1 !== t.uiBackCompat && t.widget("ui.dialog", t.ui.dialog, {
        _position: function() {
            var e, i = this.options.position,
                n = [],
                o = [0, 0];
            i ? (("string" == typeof i || "object" == typeof i && "0" in i) && (n = i.split ? i.split(" ") : [i[0], i[1]], 1 === n.length && (n[1] = n[0]), t.each(["left", "top"], function(t, e) {
                +n[t] === n[t] && (o[t] = n[t], n[t] = e)
            }), i = {
                my: n[0] + (o[0] < 0 ? o[0] : "+" + o[0]) + " " + n[1] + (o[1] < 0 ? o[1] : "+" + o[1]),
                at: n.join(" ")
            }), i = t.extend({}, t.ui.dialog.prototype.options.position, i)) : i = t.ui.dialog.prototype.options.position, e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.position(i), e || this.uiDialog.hide()
        }
    })
}(jQuery),
function(t) {
    t.widget("ui.draggable", t.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
        },
        _mouseCapture: function(e) {
            var i = this.options;
            return !(this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(e), !!this.handle && (t(!0 === i.iframeFix ? "iframe" : i.iframeFix).each(function() {
                t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(t(this).offset()).appendTo("body")
            }), !0))
        },
        _mouseStart: function(e) {
            var i = this.options;
            return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, this.offset.scroll = !1, t.extend(this.offset, {
                click: {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), !1 === this._trigger("start", e) ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
        },
        _mouseDrag: function(e, i) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var n = this._uiHash();
                if (!1 === this._trigger("drag", e, n)) return this._mouseUp({}), !1;
                this.position = n.position
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
        },
        _mouseStop: function(e) {
            var i = this,
                n = !1;
            return t.ui.ddmanager && !this.options.dropBehaviour && (n = t.ui.ddmanager.drop(this, e)), this.dropped && (n = this.dropped, this.dropped = !1), !("original" === this.options.helper && !t.contains(this.element[0].ownerDocument, this.element[0])) && ("invalid" === this.options.revert && !n || "valid" === this.options.revert && n || !0 === this.options.revert || t.isFunction(this.options.revert) && this.options.revert.call(this.element, n) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                !1 !== i._trigger("stop", e) && i._clear()
            }) : !1 !== this._trigger("stop", e) && this._clear(), !1)
        },
        _mouseUp: function(e) {
            return t("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function(e) {
            return !this.options.handle || !!t(e.target).closest(this.element.find(this.options.handle)).length
        },
        _createHelper: function(e) {
            var i = this.options,
                n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var t = this.element.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, i, n, o = this.options;
            return o.containment ? "window" === o.containment ? void(this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === o.containment ? void(this.containment = [0, 0, t(document).width() - this.helperProportions.width - this.margins.left, (t(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : o.containment.constructor === Array ? void(this.containment = o.containment) : ("parent" === o.containment && (o.containment = this.helper[0].parentNode), i = t(o.containment), void((n = i[0]) && (e = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = i))) : void(this.containment = null)
        },
        _convertPositionTo: function(e, i) {
            i || (i = this.position);
            var n = "absolute" === e ? 1 : -1,
                o = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {
                top: o.scrollTop(),
                left: o.scrollLeft()
            }), {
                top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * n,
                left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * n
            }
        },
        _generatePosition: function(e) {
            var i, n, o, s, a = this.options,
                r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                l = e.pageX,
                h = e.pageY;
            return this.offset.scroll || (this.offset.scroll = {
                top: r.scrollTop(),
                left: r.scrollLeft()
            }), this.originalPosition && (this.containment && (this.relative_container ? (n = this.relative_container.offset(), i = [this.containment[0] + n.left, this.containment[1] + n.top, this.containment[2] + n.left, this.containment[3] + n.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), a.grid && (o = a.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, h = i ? o - this.offset.click.top >= i[1] || o - this.offset.click.top > i[3] ? o : o - this.offset.click.top >= i[1] ? o - a.grid[1] : o + a.grid[1] : o, s = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, l = i ? s - this.offset.click.left >= i[0] || s - this.offset.click.left > i[2] ? s : s - this.offset.click.left >= i[0] ? s - a.grid[0] : s + a.grid[0] : s)), {
                top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function(e, i, n) {
            return n = n || this._uiHash(), t.ui.plugin.call(this, e, [i, n]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, n)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), t.ui.plugin.add("draggable", "connectToSortable", {
        start: function(e, i) {
            var n = t(this).data("ui-draggable"),
                o = n.options,
                s = t.extend({}, i, {
                    item: n.element
                });
            n.sortables = [], t(o.connectToSortable).each(function() {
                var i = t.data(this, "ui-sortable");
                i && !i.options.disabled && (n.sortables.push({
                    instance: i,
                    shouldRevert: i.options.revert
                }), i.refreshPositions(), i._trigger("activate", e, s))
            })
        },
        stop: function(e, i) {
            var n = t(this).data("ui-draggable"),
                o = t.extend({}, i, {
                    item: n.element
                });
            t.each(n.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, n.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" === n.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, o))
            })
        },
        drag: function(e, i) {
            var n = t(this).data("ui-draggable"),
                o = this;
            t.each(n.sortables, function() {
                var s = !1,
                    a = this;
                this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (s = !0, t.each(n.sortables, function() {
                    return this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this !== a && this.instance._intersectsWith(this.instance.containerCache) && t.contains(a.instance.element[0], this.instance.element[0]) && (s = !1), s
                })), s ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(o).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return i.helper[0]
                }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = n.offset.click.top, this.instance.offset.click.left = n.offset.click.left, this.instance.offset.parent.left -= n.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= n.offset.parent.top - this.instance.offset.parent.top, n._trigger("toSortable", e), n.dropped = this.instance.element, n.currentItem = n.element, this.instance.fromOutside = n), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), n._trigger("fromSortable", e), n.dropped = !1)
            })
        }
    }), t.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var e = t("body"),
                i = t(this).data("ui-draggable").options;
            e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor)
        },
        stop: function() {
            var e = t(this).data("ui-draggable").options;
            e._cursor && t("body").css("cursor", e._cursor)
        }
    }), t.ui.plugin.add("draggable", "opacity", {
        start: function(e, i) {
            var n = t(i.helper),
                o = t(this).data("ui-draggable").options;
            n.css("opacity") && (o._opacity = n.css("opacity")), n.css("opacity", o.opacity)
        },
        stop: function(e, i) {
            var n = t(this).data("ui-draggable").options;
            n._opacity && t(i.helper).css("opacity", n._opacity)
        }
    }), t.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var e = t(this).data("ui-draggable");
            e.scrollParent[0] !== document && "HTML" !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset())
        },
        drag: function(e) {
            var i = t(this).data("ui-draggable"),
                n = i.options,
                o = !1;
            i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (n.axis && "x" === n.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < n.scrollSensitivity ? i.scrollParent[0].scrollTop = o = i.scrollParent[0].scrollTop + n.scrollSpeed : e.pageY - i.overflowOffset.top < n.scrollSensitivity && (i.scrollParent[0].scrollTop = o = i.scrollParent[0].scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < n.scrollSensitivity ? i.scrollParent[0].scrollLeft = o = i.scrollParent[0].scrollLeft + n.scrollSpeed : e.pageX - i.overflowOffset.left < n.scrollSensitivity && (i.scrollParent[0].scrollLeft = o = i.scrollParent[0].scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(document).scrollTop() < n.scrollSensitivity ? o = t(document).scrollTop(t(document).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < n.scrollSensitivity && (o = t(document).scrollTop(t(document).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(document).scrollLeft() < n.scrollSensitivity ? o = t(document).scrollLeft(t(document).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < n.scrollSensitivity && (o = t(document).scrollLeft(t(document).scrollLeft() + n.scrollSpeed)))), !1 !== o && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e)
        }
    }), t.ui.plugin.add("draggable", "snap", {
        start: function() {
            var e = t(this).data("ui-draggable"),
                i = e.options;
            e.snapElements = [], t(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
                var i = t(this),
                    n = i.offset();
                this !== e.element[0] && e.snapElements.push({
                    item: this,
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: n.top,
                    left: n.left
                })
            })
        },
        drag: function(e, i) {
            var n, o, s, a, r, l, h, c, u, d, p = t(this).data("ui-draggable"),
                f = p.options,
                m = f.snapTolerance,
                g = i.offset.left,
                v = g + p.helperProportions.width,
                y = i.offset.top,
                w = y + p.helperProportions.height;
            for (u = p.snapElements.length - 1; u >= 0; u--) r = p.snapElements[u].left, l = r + p.snapElements[u].width, h = p.snapElements[u].top, c = h + p.snapElements[u].height, v < r - m || g > l + m || w < h - m || y > c + m || !t.contains(p.snapElements[u].item.ownerDocument, p.snapElements[u].item) ? (p.snapElements[u].snapping && p.options.snap.release && p.options.snap.release.call(p.element, e, t.extend(p._uiHash(), {
                snapItem: p.snapElements[u].item
            })), p.snapElements[u].snapping = !1) : ("inner" !== f.snapMode && (n = Math.abs(h - w) <= m, o = Math.abs(c - y) <= m, s = Math.abs(r - v) <= m, a = Math.abs(l - g) <= m, n && (i.position.top = p._convertPositionTo("relative", {
                top: h - p.helperProportions.height,
                left: 0
            }).top - p.margins.top), o && (i.position.top = p._convertPositionTo("relative", {
                top: c,
                left: 0
            }).top - p.margins.top), s && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: r - p.helperProportions.width
            }).left - p.margins.left), a && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: l
            }).left - p.margins.left)), d = n || o || s || a, "outer" !== f.snapMode && (n = Math.abs(h - y) <= m, o = Math.abs(c - w) <= m, s = Math.abs(r - g) <= m, a = Math.abs(l - v) <= m, n && (i.position.top = p._convertPositionTo("relative", {
                top: h,
                left: 0
            }).top - p.margins.top), o && (i.position.top = p._convertPositionTo("relative", {
                top: c - p.helperProportions.height,
                left: 0
            }).top - p.margins.top), s && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: r
            }).left - p.margins.left), a && (i.position.left = p._convertPositionTo("relative", {
                top: 0,
                left: l - p.helperProportions.width
            }).left - p.margins.left)), !p.snapElements[u].snapping && (n || o || s || a || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, e, t.extend(p._uiHash(), {
                snapItem: p.snapElements[u].item
            })), p.snapElements[u].snapping = n || o || s || a || d)
        }
    }), t.ui.plugin.add("draggable", "stack", {
        start: function() {
            var e, i = this.data("ui-draggable").options,
                n = t.makeArray(t(i.stack)).sort(function(e, i) {
                    return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
                });
            n.length && (e = parseInt(t(n[0]).css("zIndex"), 10) || 0, t(n).each(function(i) {
                t(this).css("zIndex", e + i)
            }), this.css("zIndex", e + n.length))
        }
    }), t.ui.plugin.add("draggable", "zIndex", {
        start: function(e, i) {
            var n = t(i.helper),
                o = t(this).data("ui-draggable").options;
            n.css("zIndex") && (o._zIndex = n.css("zIndex")), n.css("zIndex", o.zIndex)
        },
        stop: function(e, i) {
            var n = t(this).data("ui-draggable").options;
            n._zIndex && t(i.helper).css("zIndex", n._zIndex)
        }
    })
}(jQuery),
function(t) {
    function e(t, e, i) {
        return t > e && t < e + i
    }
    t.widget("ui.droppable", {
        version: "1.10.4",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var e, i = this.options,
                n = i.accept;
            this.isover = !1, this.isout = !0, this.accept = t.isFunction(n) ? n : function(t) {
                return t.is(n)
            }, this.proportions = function() {
                if (!arguments.length) return e || (e = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                });
                e = arguments[0]
            }, t.ui.ddmanager.droppables[i.scope] = t.ui.ddmanager.droppables[i.scope] || [], t.ui.ddmanager.droppables[i.scope].push(this), i.addClasses && this.element.addClass("ui-droppable")
        },
        _destroy: function() {
            for (var e = 0, i = t.ui.ddmanager.droppables[this.options.scope]; e < i.length; e++) i[e] === this && i.splice(e, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(e, i) {
            "accept" === e && (this.accept = t.isFunction(i) ? i : function(t) {
                return t.is(i)
            }), t.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
        },
        _deactivate: function(e) {
            var i = t.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
        },
        _over: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
        },
        _out: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
        },
        _drop: function(e, i) {
            var n = i || t.ui.ddmanager.current,
                o = !1;
            return !(!n || (n.currentItem || n.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var e = t.data(this, "ui-droppable");
                if (e.options.greedy && !e.options.disabled && e.options.scope === n.options.scope && e.accept.call(e.element[0], n.currentItem || n.element) && t.ui.intersect(n, t.extend(e, {
                        offset: e.element.offset()
                    }), e.options.tolerance)) return o = !0, !1
            }), !o && (!!this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(n)), this.element)))
        },
        ui: function(t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            }
        }
    }), t.ui.intersect = function(t, i, n) {
        if (!i.offset) return !1;
        var o, s, a = (t.positionAbs || t.position.absolute).left,
            r = (t.positionAbs || t.position.absolute).top,
            l = a + t.helperProportions.width,
            h = r + t.helperProportions.height,
            c = i.offset.left,
            u = i.offset.top,
            d = c + i.proportions().width,
            p = u + i.proportions().height;
        switch (n) {
            case "fit":
                return c <= a && l <= d && u <= r && h <= p;
            case "intersect":
                return c < a + t.helperProportions.width / 2 && l - t.helperProportions.width / 2 < d && u < r + t.helperProportions.height / 2 && h - t.helperProportions.height / 2 < p;
            case "pointer":
                return o = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, s = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top, e(s, u, i.proportions().height) && e(o, c, i.proportions().width);
            case "touch":
                return (r >= u && r <= p || h >= u && h <= p || r < u && h > p) && (a >= c && a <= d || l >= c && l <= d || a < c && l > d);
            default:
                return !1
        }
    }, t.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(e, i) {
            var n, o, s = t.ui.ddmanager.droppables[e.options.scope] || [],
                a = i ? i.type : null,
                r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
            t: for (n = 0; n < s.length; n++)
                if (!(s[n].options.disabled || e && !s[n].accept.call(s[n].element[0], e.currentItem || e.element))) {
                    for (o = 0; o < r.length; o++)
                        if (r[o] === s[n].element[0]) {
                            s[n].proportions().height = 0;
                            continue t
                        } s[n].visible = "none" !== s[n].element.css("display"), s[n].visible && ("mousedown" === a && s[n]._activate.call(s[n], i), s[n].offset = s[n].element.offset(), s[n].proportions({
                        width: s[n].element[0].offsetWidth,
                        height: s[n].element[0].offsetHeight
                    }))
                }
        },
        drop: function(e, i) {
            var n = !1;
            return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (n = this._drop.call(this, i) || n), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
            }), n
        },
        dragStart: function(e, i) {
            e.element.parentsUntil("body").bind("scroll.droppable", function() {
                e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            })
        },
        drag: function(e, i) {
            e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var n, o, s, a = t.ui.intersect(e, this, this.options.tolerance),
                        r = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;
                    r && (this.options.greedy && (o = this.options.scope, s = this.element.parents(":data(ui-droppable)").filter(function() {
                        return t.data(this, "ui-droppable").options.scope === o
                    }), s.length && (n = t.data(s[0], "ui-droppable"), n.greedyChild = "isover" === r)), n && "isover" === r && (n.isover = !1, n.isout = !0, n._out.call(n, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), n && "isout" === r && (n.isout = !1, n.isover = !0, n._over.call(n, i)))
                }
            })
        },
        dragStop: function(e, i) {
            e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
        }
    }
}(jQuery),
function(t, e) {
    var i = "ui-effects-";
    t.effects = {
            effect: {}
        },
        function(t, e) {
            function i(t, e, i) {
                var n = u[e.type] || {};
                return null == t ? i || !e.def ? null : e.def : (t = n.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : n.mod ? (t + n.mod) % n.mod : 0 > t ? 0 : n.max < t ? n.max : t)
            }

            function n(e) {
                var i = h(),
                    n = i._rgba = [];
                return e = e.toLowerCase(), f(l, function(t, o) {
                    var s, a = o.re.exec(e),
                        r = a && o.parse(a),
                        l = o.space || "rgba";
                    if (r) return s = i[l](r), i[c[l].cache] = s[c[l].cache], n = i._rgba = s._rgba, !1
                }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, s.transparent), i) : s[e]
            }

            function o(t, e, i) {
                return i = (i + 1) % 1, 6 * i < 1 ? t + (e - t) * i * 6 : 2 * i < 1 ? e : 3 * i < 2 ? t + (e - t) * (2 / 3 - i) * 6 : t
            }
            var s, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                r = /^([\-+])=\s*(\d+\.?\d*)/,
                l = [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(t) {
                        return [t[1], t[2], t[3], t[4]]
                    }
                }, {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(t) {
                        return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                    }
                }, {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function(t) {
                        return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                    }
                }, {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function(t) {
                        return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                    }
                }, {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function(t) {
                        return [t[1], t[2] / 100, t[3] / 100, t[4]]
                    }
                }],
                h = t.Color = function(e, i, n, o) {
                    return new t.Color.fn.parse(e, i, n, o)
                },
                c = {
                    rgba: {
                        props: {
                            red: {
                                idx: 0,
                                type: "byte"
                            },
                            green: {
                                idx: 1,
                                type: "byte"
                            },
                            blue: {
                                idx: 2,
                                type: "byte"
                            }
                        }
                    },
                    hsla: {
                        props: {
                            hue: {
                                idx: 0,
                                type: "degrees"
                            },
                            saturation: {
                                idx: 1,
                                type: "percent"
                            },
                            lightness: {
                                idx: 2,
                                type: "percent"
                            }
                        }
                    }
                },
                u = {
                    "byte": {
                        floor: !0,
                        max: 255
                    },
                    percent: {
                        max: 1
                    },
                    degrees: {
                        mod: 360,
                        floor: !0
                    }
                },
                d = h.support = {},
                p = t("<p>")[0],
                f = t.each;
            p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function(t, e) {
                e.cache = "_" + t, e.props.alpha = {
                    idx: 3,
                    type: "percent",
                    def: 1
                }
            }), h.fn = t.extend(h.prototype, {
                parse: function(o, a, r, l) {
                    if (o === e) return this._rgba = [null, null, null, null], this;
                    (o.jquery || o.nodeType) && (o = t(o).css(a), a = e);
                    var u = this,
                        d = t.type(o),
                        p = this._rgba = [];
                    return a !== e && (o = [o, a, r, l], d = "array"), "string" === d ? this.parse(n(o) || s._default) : "array" === d ? (f(c.rgba.props, function(t, e) {
                        p[e.idx] = i(o[e.idx], e)
                    }), this) : "object" === d ? (o instanceof h ? f(c, function(t, e) {
                        o[e.cache] && (u[e.cache] = o[e.cache].slice())
                    }) : f(c, function(e, n) {
                        var s = n.cache;
                        f(n.props, function(t, e) {
                            if (!u[s] && n.to) {
                                if ("alpha" === t || null == o[t]) return;
                                u[s] = n.to(u._rgba)
                            }
                            u[s][e.idx] = i(o[t], e, !0)
                        }), u[s] && t.inArray(null, u[s].slice(0, 3)) < 0 && (u[s][3] = 1, n.from && (u._rgba = n.from(u[s])))
                    }), this) : void 0
                },
                is: function(t) {
                    var e = h(t),
                        i = !0,
                        n = this;
                    return f(c, function(t, o) {
                        var s, a = e[o.cache];
                        return a && (s = n[o.cache] || o.to && o.to(n._rgba) || [], f(o.props, function(t, e) {
                            if (null != a[e.idx]) return i = a[e.idx] === s[e.idx]
                        })), i
                    }), i
                },
                _space: function() {
                    var t = [],
                        e = this;
                    return f(c, function(i, n) {
                        e[n.cache] && t.push(i)
                    }), t.pop()
                },
                transition: function(t, e) {
                    var n = h(t),
                        o = n._space(),
                        s = c[o],
                        a = 0 === this.alpha() ? h("transparent") : this,
                        r = a[s.cache] || s.to(a._rgba),
                        l = r.slice();
                    return n = n[s.cache], f(s.props, function(t, o) {
                        var s = o.idx,
                            a = r[s],
                            h = n[s],
                            c = u[o.type] || {};
                        null !== h && (null === a ? l[s] = h : (c.mod && (h - a > c.mod / 2 ? a += c.mod : a - h > c.mod / 2 && (a -= c.mod)), l[s] = i((h - a) * e + a, o)))
                    }), this[o](l)
                },
                blend: function(e) {
                    if (1 === this._rgba[3]) return this;
                    var i = this._rgba.slice(),
                        n = i.pop(),
                        o = h(e)._rgba;
                    return h(t.map(i, function(t, e) {
                        return (1 - n) * o[e] + n * t
                    }))
                },
                toRgbaString: function() {
                    var e = "rgba(",
                        i = t.map(this._rgba, function(t, e) {
                            return null == t ? e > 2 ? 1 : 0 : t
                        });
                    return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
                },
                toHslaString: function() {
                    var e = "hsla(",
                        i = t.map(this.hsla(), function(t, e) {
                            return null == t && (t = e > 2 ? 1 : 0), e && e < 3 && (t = Math.round(100 * t) + "%"), t
                        });
                    return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
                },
                toHexString: function(e) {
                    var i = this._rgba.slice(),
                        n = i.pop();
                    return e && i.push(~~(255 * n)), "#" + t.map(i, function(t) {
                        return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                    }).join("")
                },
                toString: function() {
                    return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                }
            }), h.fn.parse.prototype = h.fn, c.hsla.to = function(t) {
                if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                var e, i, n = t[0] / 255,
                    o = t[1] / 255,
                    s = t[2] / 255,
                    a = t[3],
                    r = Math.max(n, o, s),
                    l = Math.min(n, o, s),
                    h = r - l,
                    c = r + l,
                    u = .5 * c;
                return e = l === r ? 0 : n === r ? 60 * (o - s) / h + 360 : o === r ? 60 * (s - n) / h + 120 : 60 * (n - o) / h + 240, i = 0 === h ? 0 : u <= .5 ? h / c : h / (2 - c), [Math.round(e) % 360, i, u, null == a ? 1 : a]
            }, c.hsla.from = function(t) {
                if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                var e = t[0] / 360,
                    i = t[1],
                    n = t[2],
                    s = t[3],
                    a = n <= .5 ? n * (1 + i) : n + i - n * i,
                    r = 2 * n - a;
                return [Math.round(255 * o(r, a, e + 1 / 3)), Math.round(255 * o(r, a, e)), Math.round(255 * o(r, a, e - 1 / 3)), s]
            }, f(c, function(n, o) {
                var s = o.props,
                    a = o.cache,
                    l = o.to,
                    c = o.from;
                h.fn[n] = function(n) {
                    if (l && !this[a] && (this[a] = l(this._rgba)), n === e) return this[a].slice();
                    var o, r = t.type(n),
                        u = "array" === r || "object" === r ? n : arguments,
                        d = this[a].slice();
                    return f(s, function(t, e) {
                        var n = u["object" === r ? t : e.idx];
                        null == n && (n = d[e.idx]), d[e.idx] = i(n, e)
                    }), c ? (o = h(c(d)), o[a] = d, o) : h(d)
                }, f(s, function(e, i) {
                    h.fn[e] || (h.fn[e] = function(o) {
                        var s, a = t.type(o),
                            l = "alpha" === e ? this._hsla ? "hsla" : "rgba" : n,
                            h = this[l](),
                            c = h[i.idx];
                        return "undefined" === a ? c : ("function" === a && (o = o.call(this, c), a = t.type(o)), null == o && i.empty ? this : ("string" === a && (s = r.exec(o)) && (o = c + parseFloat(s[2]) * ("+" === s[1] ? 1 : -1)), h[i.idx] = o, this[l](h)))
                    })
                })
            }), h.hook = function(e) {
                var i = e.split(" ");
                f(i, function(e, i) {
                    t.cssHooks[i] = {
                        set: function(e, o) {
                            var s, a, r = "";
                            if ("transparent" !== o && ("string" !== t.type(o) || (s = n(o)))) {
                                if (o = h(s || o), !d.rgba && 1 !== o._rgba[3]) {
                                    for (a = "backgroundColor" === i ? e.parentNode : e;
                                        ("" === r || "transparent" === r) && a && a.style;) try {
                                        r = t.css(a, "backgroundColor"), a = a.parentNode
                                    } catch (t) {}
                                    o = o.blend(r && "transparent" !== r ? r : "_default")
                                }
                                o = o.toRgbaString()
                            }
                            try {
                                e.style[i] = o
                            } catch (t) {}
                        }
                    }, t.fx.step[i] = function(e) {
                        e.colorInit || (e.start = h(e.elem, i), e.end = h(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                    }
                })
            }, h.hook(a), t.cssHooks.borderColor = {
                expand: function(t) {
                    var e = {};
                    return f(["Top", "Right", "Bottom", "Left"], function(i, n) {
                        e["border" + n + "Color"] = t
                    }), e
                }
            }, s = t.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [null, null, null, 0],
                _default: "#ffffff"
            }
        }(jQuery),
        function() {
            function i(e) {
                var i, n, o = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                    s = {};
                if (o && o.length && o[0] && o[o[0]])
                    for (n = o.length; n--;) i = o[n], "string" == typeof o[i] && (s[t.camelCase(i)] = o[i]);
                else
                    for (i in o) "string" == typeof o[i] && (s[i] = o[i]);
                return s
            }

            function n(e, i) {
                var n, o, a = {};
                for (n in i) o = i[n], e[n] !== o && (s[n] || !t.fx.step[n] && isNaN(parseFloat(o)) || (a[n] = o));
                return a
            }
            var o = ["add", "remove", "toggle"],
                s = {
                    border: 1,
                    borderBottom: 1,
                    borderColor: 1,
                    borderLeft: 1,
                    borderRight: 1,
                    borderTop: 1,
                    borderWidth: 1,
                    margin: 1,
                    padding: 1
                };
            t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
                t.fx.step[i] = function(t) {
                    ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (jQuery.style(t.elem, i, t.end), t.setAttr = !0)
                }
            }), t.fn.addBack || (t.fn.addBack = function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }), t.effects.animateClass = function(e, s, a, r) {
                var l = t.speed(s, a, r);
                return this.queue(function() {
                    var s, a = t(this),
                        r = a.attr("class") || "",
                        h = l.children ? a.find("*").addBack() : a;
                    h = h.map(function() {
                        return {
                            el: t(this),
                            start: i(this)
                        }
                    }), s = function() {
                        t.each(o, function(t, i) {
                            e[i] && a[i + "Class"](e[i])
                        })
                    }, s(), h = h.map(function() {
                        return this.end = i(this.el[0]), this.diff = n(this.start, this.end), this
                    }), a.attr("class", r), h = h.map(function() {
                        var e = this,
                            i = t.Deferred(),
                            n = t.extend({}, l, {
                                queue: !1,
                                complete: function() {
                                    i.resolve(e)
                                }
                            });
                        return this.el.animate(this.diff, n), i.promise()
                    }), t.when.apply(t, h.get()).done(function() {
                        s(), t.each(arguments, function() {
                            var e = this.el;
                            t.each(this.diff, function(t) {
                                e.css(t, "")
                            })
                        }), l.complete.call(a[0])
                    })
                })
            }, t.fn.extend({
                addClass: function(e) {
                    return function(i, n, o, s) {
                        return n ? t.effects.animateClass.call(this, {
                            add: i
                        }, n, o, s) : e.apply(this, arguments)
                    }
                }(t.fn.addClass),
                removeClass: function(e) {
                    return function(i, n, o, s) {
                        return arguments.length > 1 ? t.effects.animateClass.call(this, {
                            remove: i
                        }, n, o, s) : e.apply(this, arguments)
                    }
                }(t.fn.removeClass),
                toggleClass: function(i) {
                    return function(n, o, s, a, r) {
                        return "boolean" == typeof o || o === e ? s ? t.effects.animateClass.call(this, o ? {
                            add: n
                        } : {
                            remove: n
                        }, s, a, r) : i.apply(this, arguments) : t.effects.animateClass.call(this, {
                            toggle: n
                        }, o, s, a)
                    }
                }(t.fn.toggleClass),
                switchClass: function(e, i, n, o, s) {
                    return t.effects.animateClass.call(this, {
                        add: i,
                        remove: e
                    }, n, o, s)
                }
            })
        }(),
        function() {
            function n(e, i, n, o) {
                return t.isPlainObject(e) && (i = e, e = e.effect), e = {
                    effect: e
                }, null == i && (i = {}), t.isFunction(i) && (o = i, n = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (o = n, n = i, i = {}), t.isFunction(n) && (o = n, n = null), i && t.extend(e, i), n = n || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof n ? n : n in t.fx.speeds ? t.fx.speeds[n] : t.fx.speeds._default, e.complete = o || i.complete, e
            }

            function o(e) {
                return !(e && "number" != typeof e && !t.fx.speeds[e]) || ("string" == typeof e && !t.effects.effect[e] || (!!t.isFunction(e) || "object" == typeof e && !e.effect))
            }
            t.extend(t.effects, {
                version: "1.10.4",
                save: function(t, e) {
                    for (var n = 0; n < e.length; n++) null !== e[n] && t.data(i + e[n], t[0].style[e[n]])
                },
                restore: function(t, n) {
                    var o, s;
                    for (s = 0; s < n.length; s++) null !== n[s] && (o = t.data(i + n[s]), o === e && (o = ""), t.css(n[s], o))
                },
                setMode: function(t, e) {
                    return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
                },
                getBaseline: function(t, e) {
                    var i, n;
                    switch (t[0]) {
                        case "top":
                            i = 0;
                            break;
                        case "middle":
                            i = .5;
                            break;
                        case "bottom":
                            i = 1;
                            break;
                        default:
                            i = t[0] / e.height
                    }
                    switch (t[1]) {
                        case "left":
                            n = 0;
                            break;
                        case "center":
                            n = .5;
                            break;
                        case "right":
                            n = 1;
                            break;
                        default:
                            n = t[1] / e.width
                    }
                    return {
                        x: n,
                        y: i
                    }
                },
                createWrapper: function(e) {
                    if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                    var i = {
                            width: e.outerWidth(!0),
                            height: e.outerHeight(!0),
                            "float": e.css("float")
                        },
                        n = t("<div></div>").addClass("ui-effects-wrapper").css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0
                        }),
                        o = {
                            width: e.width(),
                            height: e.height()
                        },
                        s = document.activeElement;
                    try {
                        s.id
                    } catch (t) {
                        s = document.body
                    }
                    return e.wrap(n), (e[0] === s || t.contains(e[0], s)) && t(s).focus(), n = e.parent(), "static" === e.css("position") ? (n.css({
                        position: "relative"
                    }), e.css({
                        position: "relative"
                    })) : (t.extend(i, {
                        position: e.css("position"),
                        zIndex: e.css("z-index")
                    }), t.each(["top", "left", "bottom", "right"], function(t, n) {
                        i[n] = e.css(n), isNaN(parseInt(i[n], 10)) && (i[n] = "auto")
                    }), e.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })), e.css(o), n.css(i).show()
                },
                removeWrapper: function(e) {
                    var i = document.activeElement;
                    return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
                },
                setTransition: function(e, i, n, o) {
                    return o = o || {}, t.each(i, function(t, i) {
                        var s = e.cssUnit(i);
                        s[0] > 0 && (o[i] = s[0] * n + s[1])
                    }), o
                }
            }), t.fn.extend({
                effect: function() {
                    function e(e) {
                        function n() {
                            t.isFunction(s) && s.call(o[0]), t.isFunction(e) && e()
                        }
                        var o = t(this),
                            s = i.complete,
                            r = i.mode;
                        (o.is(":hidden") ? "hide" === r : "show" === r) ? (o[r](), n()) : a.call(o[0], i, n)
                    }
                    var i = n.apply(this, arguments),
                        o = i.mode,
                        s = i.queue,
                        a = t.effects.effect[i.effect];
                    return t.fx.off || !a ? o ? this[o](i.duration, i.complete) : this.each(function() {
                        i.complete && i.complete.call(this)
                    }) : !1 === s ? this.each(e) : this.queue(s || "fx", e)
                },
                show: function(t) {
                    return function(e) {
                        if (o(e)) return t.apply(this, arguments);
                        var i = n.apply(this, arguments);
                        return i.mode = "show", this.effect.call(this, i)
                    }
                }(t.fn.show),
                hide: function(t) {
                    return function(e) {
                        if (o(e)) return t.apply(this, arguments);
                        var i = n.apply(this, arguments);
                        return i.mode = "hide", this.effect.call(this, i)
                    }
                }(t.fn.hide),
                toggle: function(t) {
                    return function(e) {
                        if (o(e) || "boolean" == typeof e) return t.apply(this, arguments);
                        var i = n.apply(this, arguments);
                        return i.mode = "toggle", this.effect.call(this, i)
                    }
                }(t.fn.toggle),
                cssUnit: function(e) {
                    var i = this.css(e),
                        n = [];
                    return t.each(["em", "px", "%", "pt"], function(t, e) {
                        i.indexOf(e) > 0 && (n = [parseFloat(i), e])
                    }), n
                }
            })
        }(),
        function() {
            var e = {};
            t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
                e[i] = function(e) {
                    return Math.pow(e, t + 2)
                }
            }), t.extend(e, {
                Sine: function(t) {
                    return 1 - Math.cos(t * Math.PI / 2)
                },
                Circ: function(t) {
                    return 1 - Math.sqrt(1 - t * t)
                },
                Elastic: function(t) {
                    return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
                },
                Back: function(t) {
                    return t * t * (3 * t - 2)
                },
                Bounce: function(t) {
                    for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11;);
                    return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                }
            }), t.each(e, function(e, i) {
                t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
                    return 1 - i(1 - t)
                }, t.easing["easeInOut" + e] = function(t) {
                    return t < .5 ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
                }
            })
        }()
}(jQuery),
function(t) {
    var e = /up|down|vertical/,
        i = /up|left|vertical|horizontal/;
    t.effects.effect.blind = function(n, o) {
        var s, a, r, l = t(this),
            h = ["position", "top", "bottom", "left", "right", "height", "width"],
            c = t.effects.setMode(l, n.mode || "hide"),
            u = n.direction || "up",
            d = e.test(u),
            p = d ? "height" : "width",
            f = d ? "top" : "left",
            m = i.test(u),
            g = {},
            v = "show" === c;
        l.parent().is(".ui-effects-wrapper") ? t.effects.save(l.parent(), h) : t.effects.save(l, h), l.show(), s = t.effects.createWrapper(l).css({
            overflow: "hidden"
        }), a = s[p](), r = parseFloat(s.css(f)) || 0, g[p] = v ? a : 0, m || (l.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({
            position: "absolute"
        }), g[f] = v ? r : a + r), v && (s.css(p, 0), m || s.css(f, r + a)), s.animate(g, {
            duration: n.duration,
            easing: n.easing,
            queue: !1,
            complete: function() {
                "hide" === c && l.hide(), t.effects.restore(l, h), t.effects.removeWrapper(l), o()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.bounce = function(e, i) {
        var n, o, s, a = t(this),
            r = ["position", "top", "bottom", "left", "right", "height", "width"],
            l = t.effects.setMode(a, e.mode || "effect"),
            h = "hide" === l,
            c = "show" === l,
            u = e.direction || "up",
            d = e.distance,
            p = e.times || 5,
            f = 2 * p + (c || h ? 1 : 0),
            m = e.duration / f,
            g = e.easing,
            v = "up" === u || "down" === u ? "top" : "left",
            y = "up" === u || "left" === u,
            w = a.queue(),
            b = w.length;
        for ((c || h) && r.push("opacity"), t.effects.save(a, r), a.show(), t.effects.createWrapper(a), d || (d = a["top" === v ? "outerHeight" : "outerWidth"]() / 3), c && (s = {
                opacity: 1
            }, s[v] = 0, a.css("opacity", 0).css(v, y ? 2 * -d : 2 * d).animate(s, m, g)), h && (d /= Math.pow(2, p - 1)), s = {}, s[v] = 0, n = 0; n < p; n++) o = {}, o[v] = (y ? "-=" : "+=") + d, a.animate(o, m, g).animate(s, m, g), d = h ? 2 * d : d / 2;
        h && (o = {
            opacity: 0
        }, o[v] = (y ? "-=" : "+=") + d, a.animate(o, m, g)), a.queue(function() {
            h && a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i()
        }), b > 1 && w.splice.apply(w, [1, 0].concat(w.splice(b, f + 1))), a.dequeue()
    }
}(jQuery),
function(t) {
    t.effects.effect.clip = function(e, i) {
        var n, o, s, a = t(this),
            r = ["position", "top", "bottom", "left", "right", "height", "width"],
            l = t.effects.setMode(a, e.mode || "hide"),
            h = "show" === l,
            c = e.direction || "vertical",
            u = "vertical" === c,
            d = u ? "height" : "width",
            p = u ? "top" : "left",
            f = {};
        t.effects.save(a, r), a.show(), n = t.effects.createWrapper(a).css({
            overflow: "hidden"
        }), o = "IMG" === a[0].tagName ? n : a, s = o[d](), h && (o.css(d, 0), o.css(p, s / 2)), f[d] = h ? s : 0, f[p] = h ? 0 : s / 2, o.animate(f, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                h || a.hide(), t.effects.restore(a, r), t.effects.removeWrapper(a), i()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.drop = function(e, i) {
        var n, o = t(this),
            s = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
            a = t.effects.setMode(o, e.mode || "hide"),
            r = "show" === a,
            l = e.direction || "left",
            h = "up" === l || "down" === l ? "top" : "left",
            c = "up" === l || "left" === l ? "pos" : "neg",
            u = {
                opacity: r ? 1 : 0
            };
        t.effects.save(o, s), o.show(), t.effects.createWrapper(o), n = e.distance || o["top" === h ? "outerHeight" : "outerWidth"](!0) / 2, r && o.css("opacity", 0).css(h, "pos" === c ? -n : n), u[h] = (r ? "pos" === c ? "+=" : "-=" : "pos" === c ? "-=" : "+=") + n, o.animate(u, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                "hide" === a && o.hide(), t.effects.restore(o, s), t.effects.removeWrapper(o), i()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.explode = function(e, i) {
        function n() {
            w.push(this), w.length === u * d && o()
        }

        function o() {
            p.css({
                visibility: "visible"
            }), t(w).remove(), m || p.hide(), i()
        }
        var s, a, r, l, h, c, u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
            d = u,
            p = t(this),
            f = t.effects.setMode(p, e.mode || "hide"),
            m = "show" === f,
            g = p.show().css("visibility", "hidden").offset(),
            v = Math.ceil(p.outerWidth() / d),
            y = Math.ceil(p.outerHeight() / u),
            w = [];
        for (s = 0; s < u; s++)
            for (l = g.top + s * y, c = s - (u - 1) / 2, a = 0; a < d; a++) r = g.left + a * v, h = a - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
                position: "absolute",
                visibility: "visible",
                left: -a * v,
                top: -s * y
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: v,
                height: y,
                left: r + (m ? h * v : 0),
                top: l + (m ? c * y : 0),
                opacity: m ? 0 : 1
            }).animate({
                left: r + (m ? 0 : h * v),
                top: l + (m ? 0 : c * y),
                opacity: m ? 1 : 0
            }, e.duration || 500, e.easing, n)
    }
}(jQuery),
function(t) {
    t.effects.effect.fade = function(e, i) {
        var n = t(this),
            o = t.effects.setMode(n, e.mode || "toggle");
        n.animate({
            opacity: o
        }, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.fold = function(e, i) {
        var n, o, s = t(this),
            a = ["position", "top", "bottom", "left", "right", "height", "width"],
            r = t.effects.setMode(s, e.mode || "hide"),
            l = "show" === r,
            h = "hide" === r,
            c = e.size || 15,
            u = /([0-9]+)%/.exec(c),
            d = !!e.horizFirst,
            p = l !== d,
            f = p ? ["width", "height"] : ["height", "width"],
            m = e.duration / 2,
            g = {},
            v = {};
        t.effects.save(s, a), s.show(), n = t.effects.createWrapper(s).css({
            overflow: "hidden"
        }), o = p ? [n.width(), n.height()] : [n.height(), n.width()], u && (c = parseInt(u[1], 10) / 100 * o[h ? 0 : 1]), l && n.css(d ? {
            height: 0,
            width: c
        } : {
            height: c,
            width: 0
        }), g[f[0]] = l ? o[0] : c, v[f[1]] = l ? o[1] : 0, n.animate(g, m, e.easing).animate(v, m, e.easing, function() {
            h && s.hide(), t.effects.restore(s, a), t.effects.removeWrapper(s), i()
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.highlight = function(e, i) {
        var n = t(this),
            o = ["backgroundImage", "backgroundColor", "opacity"],
            s = t.effects.setMode(n, e.mode || "show"),
            a = {
                backgroundColor: n.css("backgroundColor")
            };
        "hide" === s && (a.opacity = 0), t.effects.save(n, o), n.show().css({
            backgroundImage: "none",
            backgroundColor: e.color || "#ffff99"
        }).animate(a, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                "hide" === s && n.hide(), t.effects.restore(n, o), i()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.pulsate = function(e, i) {
        var n, o = t(this),
            s = t.effects.setMode(o, e.mode || "show"),
            a = "show" === s,
            r = "hide" === s,
            l = a || "hide" === s,
            h = 2 * (e.times || 5) + (l ? 1 : 0),
            c = e.duration / h,
            u = 0,
            d = o.queue(),
            p = d.length;
        for (!a && o.is(":visible") || (o.css("opacity", 0).show(), u = 1), n = 1; n < h; n++) o.animate({
            opacity: u
        }, c, e.easing), u = 1 - u;
        o.animate({
            opacity: u
        }, c, e.easing), o.queue(function() {
            r && o.hide(), i()
        }), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, h + 1))), o.dequeue()
    }
}(jQuery),
function(t) {
    t.effects.effect.puff = function(e, i) {
        var n = t(this),
            o = t.effects.setMode(n, e.mode || "hide"),
            s = "hide" === o,
            a = parseInt(e.percent, 10) || 150,
            r = a / 100,
            l = {
                height: n.height(),
                width: n.width(),
                outerHeight: n.outerHeight(),
                outerWidth: n.outerWidth()
            };
        t.extend(e, {
            effect: "scale",
            queue: !1,
            fade: !0,
            mode: o,
            complete: i,
            percent: s ? a : 100,
            from: s ? l : {
                height: l.height * r,
                width: l.width * r,
                outerHeight: l.outerHeight * r,
                outerWidth: l.outerWidth * r
            }
        }), n.effect(e)
    }, t.effects.effect.scale = function(e, i) {
        var n = t(this),
            o = t.extend(!0, {}, e),
            s = t.effects.setMode(n, e.mode || "effect"),
            a = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === s ? 0 : 100),
            r = e.direction || "both",
            l = e.origin,
            h = {
                height: n.height(),
                width: n.width(),
                outerHeight: n.outerHeight(),
                outerWidth: n.outerWidth()
            },
            c = {
                y: "horizontal" !== r ? a / 100 : 1,
                x: "vertical" !== r ? a / 100 : 1
            };
        o.effect = "size", o.queue = !1, o.complete = i, "effect" !== s && (o.origin = l || ["middle", "center"], o.restore = !0), o.from = e.from || ("show" === s ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : h), o.to = {
            height: h.height * c.y,
            width: h.width * c.x,
            outerHeight: h.outerHeight * c.y,
            outerWidth: h.outerWidth * c.x
        }, o.fade && ("show" === s && (o.from.opacity = 0, o.to.opacity = 1), "hide" === s && (o.from.opacity = 1, o.to.opacity = 0)), n.effect(o)
    }, t.effects.effect.size = function(e, i) {
        var n, o, s, a = t(this),
            r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
            l = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
            h = ["width", "height", "overflow"],
            c = ["fontSize"],
            u = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            p = t.effects.setMode(a, e.mode || "effect"),
            f = e.restore || "effect" !== p,
            m = e.scale || "both",
            g = e.origin || ["middle", "center"],
            v = a.css("position"),
            y = f ? r : l,
            w = {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            };
        "show" === p && a.show(), n = {
            height: a.height(),
            width: a.width(),
            outerHeight: a.outerHeight(),
            outerWidth: a.outerWidth()
        }, "toggle" === e.mode && "show" === p ? (a.from = e.to || w, a.to = e.from || n) : (a.from = e.from || ("show" === p ? w : n), a.to = e.to || ("hide" === p ? w : n)), s = {
            from: {
                y: a.from.height / n.height,
                x: a.from.width / n.width
            },
            to: {
                y: a.to.height / n.height,
                x: a.to.width / n.width
            }
        }, "box" !== m && "both" !== m || (s.from.y !== s.to.y && (y = y.concat(u), a.from = t.effects.setTransition(a, u, s.from.y, a.from), a.to = t.effects.setTransition(a, u, s.to.y, a.to)), s.from.x !== s.to.x && (y = y.concat(d), a.from = t.effects.setTransition(a, d, s.from.x, a.from), a.to = t.effects.setTransition(a, d, s.to.x, a.to))), "content" !== m && "both" !== m || s.from.y !== s.to.y && (y = y.concat(c).concat(h), a.from = t.effects.setTransition(a, c, s.from.y, a.from), a.to = t.effects.setTransition(a, c, s.to.y, a.to)), t.effects.save(a, y), a.show(), t.effects.createWrapper(a), a.css("overflow", "hidden").css(a.from), g && (o = t.effects.getBaseline(g, n), a.from.top = (n.outerHeight - a.outerHeight()) * o.y, a.from.left = (n.outerWidth - a.outerWidth()) * o.x, a.to.top = (n.outerHeight - a.to.outerHeight) * o.y, a.to.left = (n.outerWidth - a.to.outerWidth) * o.x), a.css(a.from), "content" !== m && "both" !== m || (u = u.concat(["marginTop", "marginBottom"]).concat(c), d = d.concat(["marginLeft", "marginRight"]), h = r.concat(u).concat(d), a.find("*[width]").each(function() {
            var i = t(this),
                n = {
                    height: i.height(),
                    width: i.width(),
                    outerHeight: i.outerHeight(),
                    outerWidth: i.outerWidth()
                };
            f && t.effects.save(i, h), i.from = {
                height: n.height * s.from.y,
                width: n.width * s.from.x,
                outerHeight: n.outerHeight * s.from.y,
                outerWidth: n.outerWidth * s.from.x
            }, i.to = {
                height: n.height * s.to.y,
                width: n.width * s.to.x,
                outerHeight: n.height * s.to.y,
                outerWidth: n.width * s.to.x
            }, s.from.y !== s.to.y && (i.from = t.effects.setTransition(i, u, s.from.y, i.from), i.to = t.effects.setTransition(i, u, s.to.y, i.to)), s.from.x !== s.to.x && (i.from = t.effects.setTransition(i, d, s.from.x, i.from), i.to = t.effects.setTransition(i, d, s.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.easing, function() {
                f && t.effects.restore(i, h)
            })
        })), a.animate(a.to, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                0 === a.to.opacity && a.css("opacity", a.from.opacity), "hide" === p && a.hide(), t.effects.restore(a, y), f || ("static" === v ? a.css({
                    position: "relative",
                    top: a.to.top,
                    left: a.to.left
                }) : t.each(["top", "left"], function(t, e) {
                    a.css(e, function(e, i) {
                        var n = parseInt(i, 10),
                            o = t ? a.to.left : a.to.top;
                        return "auto" === i ? o + "px" : n + o + "px"
                    })
                })), t.effects.removeWrapper(a), i()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.shake = function(e, i) {
        var n, o = t(this),
            s = ["position", "top", "bottom", "left", "right", "height", "width"],
            a = t.effects.setMode(o, e.mode || "effect"),
            r = e.direction || "left",
            l = e.distance || 20,
            h = e.times || 3,
            c = 2 * h + 1,
            u = Math.round(e.duration / c),
            d = "up" === r || "down" === r ? "top" : "left",
            p = "up" === r || "left" === r,
            f = {},
            m = {},
            g = {},
            v = o.queue(),
            y = v.length;
        for (t.effects.save(o, s), o.show(), t.effects.createWrapper(o), f[d] = (p ? "-=" : "+=") + l, m[d] = (p ? "+=" : "-=") + 2 * l, g[d] = (p ? "-=" : "+=") + 2 * l, o.animate(f, u, e.easing), n = 1; n < h; n++) o.animate(m, u, e.easing).animate(g, u, e.easing);
        o.animate(m, u, e.easing).animate(f, u / 2, e.easing).queue(function() {
            "hide" === a && o.hide(), t.effects.restore(o, s), t.effects.removeWrapper(o), i()
        }), y > 1 && v.splice.apply(v, [1, 0].concat(v.splice(y, c + 1))), o.dequeue()
    }
}(jQuery),
function(t) {
    t.effects.effect.slide = function(e, i) {
        var n, o = t(this),
            s = ["position", "top", "bottom", "left", "right", "width", "height"],
            a = t.effects.setMode(o, e.mode || "show"),
            r = "show" === a,
            l = e.direction || "left",
            h = "up" === l || "down" === l ? "top" : "left",
            c = "up" === l || "left" === l,
            u = {};
        t.effects.save(o, s), o.show(), n = e.distance || o["top" === h ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(o).css({
            overflow: "hidden"
        }), r && o.css(h, c ? isNaN(n) ? "-" + n : -n : n), u[h] = (r ? c ? "+=" : "-=" : c ? "-=" : "+=") + n, o.animate(u, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                "hide" === a && o.hide(), t.effects.restore(o, s), t.effects.removeWrapper(o), i()
            }
        })
    }
}(jQuery),
function(t) {
    t.effects.effect.transfer = function(e, i) {
        var n = t(this),
            o = t(e.to),
            s = "fixed" === o.css("position"),
            a = t("body"),
            r = s ? a.scrollTop() : 0,
            l = s ? a.scrollLeft() : 0,
            h = o.offset(),
            c = {
                top: h.top - r,
                left: h.left - l,
                height: o.innerHeight(),
                width: o.innerWidth()
            },
            u = n.offset(),
            d = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({
                top: u.top - r,
                left: u.left - l,
                height: n.innerHeight(),
                width: n.innerWidth(),
                position: s ? "fixed" : "absolute"
            }).animate(c, e.duration, e.easing, function() {
                d.remove(), i()
            })
    }
}(jQuery),
function(t) {
    t.widget("ui.menu", {
        version: "1.10.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, t.proxy(function(t) {
                this.options.disabled && t.preventDefault()
            }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                "mousedown .ui-menu-item > a": function(t) {
                    t.preventDefault()
                },
                "click .ui-state-disabled > a": function(t) {
                    t.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(e) {
                    var i = t(e.target).closest(".ui-menu-item");
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && t(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(e) {
                    var i = t(e.currentTarget);
                    i.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(e, i)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(t, e) {
                    var i = this.active || this.element.children(".ui-menu-item").eq(0);
                    e || this.focus(t, i)
                },
                blur: function(e) {
                    this._delay(function() {
                        t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
                    })
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function(e) {
                    t(e.target).closest(".ui-menu").length || this.collapseAll(e), this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var e = t(this);
                e.data("ui-menu-submenu-carat") && e.remove()
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(e) {
            function i(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var n, o, s, a, r, l = !0;
            switch (e.keyCode) {
                case t.ui.keyCode.PAGE_UP:
                    this.previousPage(e);
                    break;
                case t.ui.keyCode.PAGE_DOWN:
                    this.nextPage(e);
                    break;
                case t.ui.keyCode.HOME:
                    this._move("first", "first", e);
                    break;
                case t.ui.keyCode.END:
                    this._move("last", "last", e);
                    break;
                case t.ui.keyCode.UP:
                    this.previous(e);
                    break;
                case t.ui.keyCode.DOWN:
                    this.next(e);
                    break;
                case t.ui.keyCode.LEFT:
                    this.collapse(e);
                    break;
                case t.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                    break;
                case t.ui.keyCode.ENTER:
                case t.ui.keyCode.SPACE:
                    this._activate(e);
                    break;
                case t.ui.keyCode.ESCAPE:
                    this.collapse(e);
                    break;
                default:
                    l = !1, o = this.previousFilter || "", s = String.fromCharCode(e.keyCode), a = !1, clearTimeout(this.filterTimer), s === o ? a = !0 : s = o + s, r = new RegExp("^" + i(s), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return r.test(t(this).children("a").text())
                    }), n = a && -1 !== n.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : n, n.length || (s = String.fromCharCode(e.keyCode), r = new RegExp("^" + i(s), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return r.test(t(this).children("a").text())
                    })), n.length ? (this.focus(e, n), n.length > 1 ? (this.previousFilter = s, this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            l && e.preventDefault()
        },
        _activate: function(t) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
        },
        refresh: function() {
            var e, i = this.options.icons.submenu,
                n = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), n.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var e = t(this),
                    n = e.prev("a"),
                    o = t("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0);
                n.attr("aria-haspopup", "true").prepend(o), e.attr("aria-labelledby", n.attr("id"))
            }), e = n.add(this.element), e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }), e.children(":not(.ui-menu-item)").each(function() {
                var e = t(this);
                /[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider")
            }), e.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            } [this.options.role]
        },
        _setOption: function(t, e) {
            "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu), this._super(t, e)
        },
        focus: function(t, e) {
            var i, n;
            this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), n = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", n.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {
                item: e
            })
        },
        _scrollIntoView: function(e) {
            var i, n, o, s, a, r;
            this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, n = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, o = e.offset().top - this.activeMenu.offset().top - i - n, s = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.height(), o < 0 ? this.activeMenu.scrollTop(s + o) : o + r > a && this.activeMenu.scrollTop(s + o - a + r))
        },
        blur: function(t, e) {
            e || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", t, {
                item: this.active
            }))
        },
        _startOpening: function(t) {
            clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(), this._open(t)
            }, this.delay))
        },
        _open: function(e) {
            var i = t.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function(e, i) {
            clearTimeout(this.timer), this.timer = this._delay(function() {
                var n = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                n.length || (n = this.element), this._close(n), this.blur(e), this.activeMenu = n
            }, this.delay)
        },
        _close: function(t) {
            t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(t) {
            var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            e && e.length && (this._close(), this.focus(t, e))
        },
        expand: function(t) {
            var e = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            e && e.length && (this._open(e.parent()), this._delay(function() {
                this.focus(t, e)
            }))
        },
        next: function(t) {
            this._move("next", "first", t)
        },
        previous: function(t) {
            this._move("prev", "last", t)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(t, e, i) {
            var n;
            this.active && (n = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), n && n.length && this.active || (n = this.activeMenu.children(".ui-menu-item")[e]()), this.focus(i, n)
        },
        nextPage: function(e) {
            var i, n, o;
            if (!this.active) return void this.next(e);
            this.isLastItem() || (this._hasScroll() ? (n = this.active.offset().top, o = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return i = t(this), i.offset().top - n - o < 0
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]()))
        },
        previousPage: function(e) {
            var i, n, o;
            if (!this.active) return void this.next(e);
            this.isFirstItem() || (this._hasScroll() ? (n = this.active.offset().top, o = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return i = t(this), i.offset().top - n + o > 0
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first()))
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(e) {
            this.active = this.active || t(e.target).closest(".ui-menu-item");
            var i = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
        }
    })
}(jQuery),
function(t, e) {
    t.widget("ui.progressbar", {
        version: "1.10.4",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            }), this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
        },
        _destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
        },
        value: function(t) {
            if (t === e) return this.options.value;
            this.options.value = this._constrainedValue(t), this._refreshValue()
        },
        _constrainedValue: function(t) {
            return t === e && (t = this.options.value), this.indeterminate = !1 === t, "number" != typeof t && (t = 0), !this.indeterminate && Math.min(this.options.max, Math.max(this.min, t))
        },
        _setOptions: function(t) {
            var e = t.value;
            delete t.value, this._super(t), this.options.value = this._constrainedValue(e), this._refreshValue()
        },
        _setOption: function(t, e) {
            "max" === t && (e = Math.max(this.min, e)), this._super(t, e)
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function() {
            var e = this.options.value,
                i = this._percentage();
            this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": e
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== e && (this.oldValue = e, this._trigger("change")), e === this.options.max && this._trigger("complete")
        }
    })
}(jQuery),
function(t) {
    function e(t) {
        return parseInt(t, 10) || 0
    }

    function i(t) {
        return !isNaN(parseInt(t, 10))
    }
    t.widget("ui.resizable", t.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function() {
            var e, i, n, o, s, a = this,
                r = this.options;
            if (this.element.addClass("ui-resizable"), t.extend(this, {
                    _aspectRatio: !!r.aspectRatio,
                    aspectRatio: r.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize()), this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; i < e.length; i++) n = t.trim(e[i]), s = "ui-resizable-" + n, o = t("<div class='ui-resizable-handle " + s + "'></div>"), o.css({
                    zIndex: r.zIndex
                }), "se" === n && o.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[n] = ".ui-resizable-" + n, this.element.append(o);
            this._renderAxis = function(e) {
                var i, n, o, s;
                e = e || this.element;
                for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = t(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (n = t(this.handles[i], this.element), s = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth(), o = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(o, s), this._proportionallyResize()), t(this.handles[i]).length
            }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                a.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = o && o[1] ? o[1] : "se")
            }), r.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                r.disabled || (t(this).removeClass("ui-resizable-autohide"), a._handles.show())
            }).mouseleave(function() {
                r.disabled || a.resizing || (t(this).addClass("ui-resizable-autohide"), a._handles.hide())
            })), this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var e, i = function(e) {
                t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
        },
        _mouseCapture: function(e) {
            var i, n, o = !1;
            for (i in this.handles)((n = t(this.handles[i])[0]) === e.target || t.contains(n, e.target)) && (o = !0);
            return !this.options.disabled && o
        },
        _mouseStart: function(i) {
            var n, o, s, a = this.options,
                r = this.element.position(),
                l = this.element;
            return this.resizing = !0, /absolute/.test(l.css("position")) ? l.css({
                position: "absolute",
                top: l.css("top"),
                left: l.css("left")
            }) : l.is(".ui-draggable") && l.css({
                position: "absolute",
                top: r.top,
                left: r.left
            }), this._renderProxy(), n = e(this.helper.css("left")), o = e(this.helper.css("top")), a.containment && (n += t(a.containment).scrollLeft() || 0, o += t(a.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: n,
                top: o
            }, this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: l.width(),
                height: l.height()
            }, this.originalSize = this._helper ? {
                width: l.outerWidth(),
                height: l.outerHeight()
            } : {
                width: l.width(),
                height: l.height()
            }, this.originalPosition = {
                left: n,
                top: o
            }, this.sizeDiff = {
                width: l.outerWidth() - l.width(),
                height: l.outerHeight() - l.height()
            }, this.originalMousePosition = {
                left: i.pageX,
                top: i.pageY
            }, this.aspectRatio = "number" == typeof a.aspectRatio ? a.aspectRatio : this.originalSize.width / this.originalSize.height || 1, s = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === s ? this.axis + "-resize" : s), l.addClass("ui-resizable-resizing"), this._propagate("start", i), !0
        },
        _mouseDrag: function(e) {
            var i, n = this.helper,
                o = {},
                s = this.originalMousePosition,
                a = this.axis,
                r = this.position.top,
                l = this.position.left,
                h = this.size.width,
                c = this.size.height,
                u = e.pageX - s.left || 0,
                d = e.pageY - s.top || 0,
                p = this._change[a];
            return !!p && (i = p.apply(this, [e, u, d]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), this.position.top !== r && (o.top = this.position.top + "px"), this.position.left !== l && (o.left = this.position.left + "px"), this.size.width !== h && (o.width = this.size.width + "px"), this.size.height !== c && (o.height = this.size.height + "px"), n.css(o), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(o) || this._trigger("resize", e, this.ui()), !1)
        },
        _mouseStop: function(e) {
            this.resizing = !1;
            var i, n, o, s, a, r, l, h = this.options,
                c = this;
            return this._helper && (i = this._proportionallyResizeElements, n = i.length && /textarea/i.test(i[0].nodeName), o = n && t.ui.hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, s = n ? 0 : c.sizeDiff.width, a = {
                width: c.helper.width() - s,
                height: c.helper.height() - o
            }, r = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, l = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null, h.animate || this.element.css(t.extend(a, {
                top: l,
                left: r
            })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !h.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function(t) {
            var e, n, o, s, a, r = this.options;
            a = {
                minWidth: i(r.minWidth) ? r.minWidth : 0,
                maxWidth: i(r.maxWidth) ? r.maxWidth : Infinity,
                minHeight: i(r.minHeight) ? r.minHeight : 0,
                maxHeight: i(r.maxHeight) ? r.maxHeight : Infinity
            }, (this._aspectRatio || t) && (e = a.minHeight * this.aspectRatio, o = a.minWidth / this.aspectRatio, n = a.maxHeight * this.aspectRatio, s = a.maxWidth / this.aspectRatio, e > a.minWidth && (a.minWidth = e), o > a.minHeight && (a.minHeight = o), n < a.maxWidth && (a.maxWidth = n), s < a.maxHeight && (a.maxHeight = s)), this._vBoundaries = a
        },
        _updateCache: function(t) {
            this.offset = this.helper.offset(), i(t.left) && (this.position.left = t.left), i(t.top) && (this.position.top = t.top), i(t.height) && (this.size.height = t.height), i(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function(t) {
            var e = this.position,
                n = this.size,
                o = this.axis;
            return i(t.height) ? t.width = t.height * this.aspectRatio : i(t.width) && (t.height = t.width / this.aspectRatio), "sw" === o && (t.left = e.left + (n.width - t.width), t.top = null), "nw" === o && (t.top = e.top + (n.height - t.height), t.left = e.left + (n.width - t.width)), t
        },
        _respectSize: function(t) {
            var e = this._vBoundaries,
                n = this.axis,
                o = i(t.width) && e.maxWidth && e.maxWidth < t.width,
                s = i(t.height) && e.maxHeight && e.maxHeight < t.height,
                a = i(t.width) && e.minWidth && e.minWidth > t.width,
                r = i(t.height) && e.minHeight && e.minHeight > t.height,
                l = this.originalPosition.left + this.originalSize.width,
                h = this.position.top + this.size.height,
                c = /sw|nw|w/.test(n),
                u = /nw|ne|n/.test(n);
            return a && (t.width = e.minWidth), r && (t.height = e.minHeight), o && (t.width = e.maxWidth), s && (t.height = e.maxHeight), a && c && (t.left = l - e.minWidth), o && c && (t.left = l - e.maxWidth), r && u && (t.top = h - e.minHeight), s && u && (t.top = h - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) {
                var t, e, i, n, o, s = this.helper || this.element;
                for (t = 0; t < this._proportionallyResizeElements.length; t++) {
                    if (o = this._proportionallyResizeElements[t], !this.borderDif)
                        for (this.borderDif = [], i = [o.css("borderTopWidth"), o.css("borderRightWidth"), o.css("borderBottomWidth"), o.css("borderLeftWidth")], n = [o.css("paddingTop"), o.css("paddingRight"), o.css("paddingBottom"), o.css("paddingLeft")], e = 0; e < i.length; e++) this.borderDif[e] = (parseInt(i[e], 10) || 0) + (parseInt(n[e], 10) || 0);
                    o.css({
                        height: s.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: s.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            }
        },
        _renderProxy: function() {
            var e = this.element,
                i = this.options;
            this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(t, e) {
                return {
                    width: this.originalSize.width + e
                }
            },
            w: function(t, e) {
                var i = this.originalSize;
                return {
                    left: this.originalPosition.left + e,
                    width: i.width - e
                }
            },
            n: function(t, e, i) {
                var n = this.originalSize;
                return {
                    top: this.originalPosition.top + i,
                    height: n.height - i
                }
            },
            s: function(t, e, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(e, i, n) {
                return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
            },
            sw: function(e, i, n) {
                return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
            },
            ne: function(e, i, n) {
                return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
            },
            nw: function(e, i, n) {
                return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
            }
        },
        _propagate: function(e, i) {
            t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), t.ui.plugin.add("resizable", "animate", {
        stop: function(e) {
            var i = t(this).data("ui-resizable"),
                n = i.options,
                o = i._proportionallyResizeElements,
                s = o.length && /textarea/i.test(o[0].nodeName),
                a = s && t.ui.hasScroll(o[0], "left") ? 0 : i.sizeDiff.height,
                r = s ? 0 : i.sizeDiff.width,
                l = {
                    width: i.size.width - r,
                    height: i.size.height - a
                },
                h = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(t.extend(l, c && h ? {
                top: c,
                left: h
            } : {}), {
                duration: n.animateDuration,
                easing: n.animateEasing,
                step: function() {
                    var n = {
                        width: parseInt(i.element.css("width"), 10),
                        height: parseInt(i.element.css("height"), 10),
                        top: parseInt(i.element.css("top"), 10),
                        left: parseInt(i.element.css("left"), 10)
                    };
                    o && o.length && t(o[0]).css({
                        width: n.width,
                        height: n.height
                    }), i._updateCache(n), i._propagate("resize", e)
                }
            })
        }
    }), t.ui.plugin.add("resizable", "containment", {
        start: function() {
            var i, n, o, s, a, r, l, h = t(this).data("ui-resizable"),
                c = h.options,
                u = h.element,
                d = c.containment,
                p = d instanceof t ? d.get(0) : /parent/.test(d) ? u.parent().get(0) : d;
            p && (h.containerElement = t(p), /document/.test(d) || d === document ? (h.containerOffset = {
                left: 0,
                top: 0
            }, h.containerPosition = {
                left: 0,
                top: 0
            }, h.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height: t(document).height() || document.body.parentNode.scrollHeight
            }) : (i = t(p), n = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, o) {
                n[t] = e(i.css("padding" + o))
            }), h.containerOffset = i.offset(), h.containerPosition = i.position(), h.containerSize = {
                height: i.innerHeight() - n[3],
                width: i.innerWidth() - n[1]
            }, o = h.containerOffset, s = h.containerSize.height, a = h.containerSize.width, r = t.ui.hasScroll(p, "left") ? p.scrollWidth : a, l = t.ui.hasScroll(p) ? p.scrollHeight : s, h.parentData = {
                element: p,
                left: o.left,
                top: o.top,
                width: r,
                height: l
            }))
        },
        resize: function(e) {
            var i, n, o, s, a = t(this).data("ui-resizable"),
                r = a.options,
                l = a.containerOffset,
                h = a.position,
                c = a._aspectRatio || e.shiftKey,
                u = {
                    top: 0,
                    left: 0
                },
                d = a.containerElement;
            d[0] !== document && /static/.test(d.css("position")) && (u = l), h.left < (a._helper ? l.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - l.left : a.position.left - u.left), c && (a.size.height = a.size.width / a.aspectRatio), a.position.left = r.helper ? l.left : 0), h.top < (a._helper ? l.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - l.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio), a.position.top = a._helper ? l.top : 0), a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top, i = Math.abs((a._helper, a.offset.left - u.left + a.sizeDiff.width)), n = Math.abs((a._helper ? a.offset.top - u.top : a.offset.top - l.top) + a.sizeDiff.height), o = a.containerElement.get(0) === a.element.parent().get(0), s = /relative|absolute/.test(a.containerElement.css("position")), o && s && (i -= Math.abs(a.parentData.left)), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, c && (a.size.height = a.size.width / a.aspectRatio)), n + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - n, c && (a.size.width = a.size.height * a.aspectRatio))
        },
        stop: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                n = e.containerOffset,
                o = e.containerPosition,
                s = e.containerElement,
                a = t(e.helper),
                r = a.offset(),
                l = a.outerWidth() - e.sizeDiff.width,
                h = a.outerHeight() - e.sizeDiff.height;
            e._helper && !i.animate && /relative/.test(s.css("position")) && t(this).css({
                left: r.left - o.left - n.left,
                width: l,
                height: h
            }), e._helper && !i.animate && /static/.test(s.css("position")) && t(this).css({
                left: r.left - o.left - n.left,
                width: l,
                height: h
            })
        }
    }), t.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                n = function(e) {
                    t(e).each(function() {
                        var e = t(this);
                        e.data("ui-resizable-alsoresize", {
                            width: parseInt(e.width(), 10),
                            height: parseInt(e.height(), 10),
                            left: parseInt(e.css("left"), 10),
                            top: parseInt(e.css("top"), 10)
                        })
                    })
                };
            "object" != typeof i.alsoResize || i.alsoResize.parentNode ? n(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], n(i.alsoResize)) : t.each(i.alsoResize, function(t) {
                n(t)
            })
        },
        resize: function(e, i) {
            var n = t(this).data("ui-resizable"),
                o = n.options,
                s = n.originalSize,
                a = n.originalPosition,
                r = {
                    height: n.size.height - s.height || 0,
                    width: n.size.width - s.width || 0,
                    top: n.position.top - a.top || 0,
                    left: n.position.left - a.left || 0
                },
                l = function(e, n) {
                    t(e).each(function() {
                        var e = t(this),
                            o = t(this).data("ui-resizable-alsoresize"),
                            s = {},
                            a = n && n.length ? n : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        t.each(a, function(t, e) {
                            var i = (o[e] || 0) + (r[e] || 0);
                            i && i >= 0 && (s[e] = i || null)
                        }), e.css(s)
                    })
                };
            "object" != typeof o.alsoResize || o.alsoResize.nodeType ? l(o.alsoResize) : t.each(o.alsoResize, function(t, e) {
                l(t, e)
            })
        },
        stop: function() {
            t(this).removeData("resizable-alsoresize")
        }
    }), t.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                n = e.size;
            e.ghost = e.originalElement.clone(), e.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: n.height,
                width: n.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
        },
        resize: function() {
            var e = t(this).data("ui-resizable");
            e.ghost && e.ghost.css({
                position: "relative",
                height: e.size.height,
                width: e.size.width
            })
        },
        stop: function() {
            var e = t(this).data("ui-resizable");
            e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
        }
    }), t.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var e = t(this).data("ui-resizable"),
                i = e.options,
                n = e.size,
                o = e.originalSize,
                s = e.originalPosition,
                a = e.axis,
                r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
                l = r[0] || 1,
                h = r[1] || 1,
                c = Math.round((n.width - o.width) / l) * l,
                u = Math.round((n.height - o.height) / h) * h,
                d = o.width + c,
                p = o.height + u,
                f = i.maxWidth && i.maxWidth < d,
                m = i.maxHeight && i.maxHeight < p,
                g = i.minWidth && i.minWidth > d,
                v = i.minHeight && i.minHeight > p;
            i.grid = r, g && (d += l), v && (p += h), f && (d -= l), m && (p -= h), /^(se|s|e)$/.test(a) ? (e.size.width = d, e.size.height = p) : /^(ne)$/.test(a) ? (e.size.width = d, e.size.height = p, e.position.top = s.top - u) : /^(sw)$/.test(a) ? (e.size.width = d, e.size.height = p, e.position.left = s.left - c) : (p - h > 0 ? (e.size.height = p, e.position.top = s.top - u) : (e.size.height = h, e.position.top = s.top + o.height - h), d - l > 0 ? (e.size.width = d, e.position.left = s.left - c) : (e.size.width = l, e.position.left = s.left + o.width - l))
        }
    })
}(jQuery),
function(t) {
    t.widget("ui.selectable", t.ui.mouse, {
        version: "1.10.4",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var e, i = this;
            this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function() {
                    var e = t(this),
                        i = e.offset();
                    t.data(this, "selectable-item", {
                        element: this,
                        $element: e,
                        left: i.left,
                        top: i.top,
                        right: i.left + e.outerWidth(),
                        bottom: i.top + e.outerHeight(),
                        startselected: !1,
                        selected: e.hasClass("ui-selected"),
                        selecting: e.hasClass("ui-selecting"),
                        unselecting: e.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
        },
        _mouseStart: function(e) {
            var i = this,
                n = this.options;
            this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(n.filter, this.element[0]), this._trigger("start", e), t(n.appendTo).append(this.helper), this.helper.css({
                left: e.pageX,
                top: e.pageY,
                width: 0,
                height: 0
            }), n.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var n = t.data(this, "selectable-item");
                n.startselected = !0, e.metaKey || e.ctrlKey || (n.$element.removeClass("ui-selected"), n.selected = !1, n.$element.addClass("ui-unselecting"), n.unselecting = !0, i._trigger("unselecting", e, {
                    unselecting: n.element
                }))
            }), t(e.target).parents().addBack().each(function() {
                var n, o = t.data(this, "selectable-item");
                if (o) return n = !e.metaKey && !e.ctrlKey || !o.$element.hasClass("ui-selected"), o.$element.removeClass(n ? "ui-unselecting" : "ui-selected").addClass(n ? "ui-selecting" : "ui-unselecting"), o.unselecting = !n, o.selecting = n, o.selected = n, n ? i._trigger("selecting", e, {
                    selecting: o.element
                }) : i._trigger("unselecting", e, {
                    unselecting: o.element
                }), !1
            }))
        },
        _mouseDrag: function(e) {
            if (this.dragged = !0, !this.options.disabled) {
                var i, n = this,
                    o = this.options,
                    s = this.opos[0],
                    a = this.opos[1],
                    r = e.pageX,
                    l = e.pageY;
                return s > r && (i = r, r = s, s = i), a > l && (i = l, l = a, a = i), this.helper.css({
                    left: s,
                    top: a,
                    width: r - s,
                    height: l - a
                }), this.selectees.each(function() {
                    var i = t.data(this, "selectable-item"),
                        h = !1;
                    i && i.element !== n.element[0] && ("touch" === o.tolerance ? h = !(i.left > r || i.right < s || i.top > l || i.bottom < a) : "fit" === o.tolerance && (h = i.left > s && i.right < r && i.top > a && i.bottom < l), h ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, n._trigger("selecting", e, {
                        selecting: i.element
                    }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), n._trigger("unselecting", e, {
                        unselecting: i.element
                    }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, n._trigger("unselecting", e, {
                        unselecting: i.element
                    })))))
                }), !1
            }
        },
        _mouseStop: function(e) {
            var i = this;
            return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
                var n = t.data(this, "selectable-item");
                n.$element.removeClass("ui-unselecting"), n.unselecting = !1, n.startselected = !1, i._trigger("unselected", e, {
                    unselected: n.element
                })
            }), t(".ui-selecting", this.element[0]).each(function() {
                var n = t.data(this, "selectable-item");
                n.$element.removeClass("ui-selecting").addClass("ui-selected"), n.selecting = !1, n.selected = !0, n.startselected = !0, i._trigger("selected", e, {
                    selected: n.element
                })
            }), this._trigger("stop", e), this.helper.remove(), !1
        }
    })
}(jQuery),
function(t) {
    var e = 5;
    t.widget("ui.slider", t.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
        },
        _refresh: function() {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function() {
            var e, i, n = this.options,
                o = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                s = [];
            for (i = n.values && n.values.length || 1, o.length > i && (o.slice(i).remove(), o = o.slice(0, i)), e = o.length; e < i; e++) s.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
            this.handles = o.add(t(s.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(e) {
                t(this).data("ui-slider-handle-index", e)
            })
        },
        _createRange: function() {
            var e = this.options,
                i = "";
            e.range ? (!0 === e.range && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function() {
            var t = this.handles.add(this.range).filter("a");
            this._off(t), this._on(t, this._handleEvents), this._hoverable(t), this._focusable(t)
        },
        _destroy: function() {
            this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function(e) {
            var i, n, o, s, a, r, l, h = this,
                c = this.options;
            return !c.disabled && (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), i = {
                x: e.pageX,
                y: e.pageY
            }, n = this._normValueFromMouse(i), o = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                var i = Math.abs(n - h.values(e));
                (o > i || o === i && (e === h._lastChangedValue || h.values(e) === c.min)) && (o = i, s = t(this), a = e)
            }), !1 !== this._start(e, a) && (this._mouseSliding = !0, this._handleIndex = a, s.addClass("ui-state-active").focus(), r = s.offset(), l = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? {
                left: 0,
                top: 0
            } : {
                left: e.pageX - r.left - s.width() / 2,
                top: e.pageY - r.top - s.height() / 2 - (parseInt(s.css("borderTopWidth"), 10) || 0) - (parseInt(s.css("borderBottomWidth"), 10) || 0) + (parseInt(s.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, n), this._animateOff = !0, !0))
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(t) {
            var e = {
                    x: t.pageX,
                    y: t.pageY
                },
                i = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, i), !1
        },
        _mouseStop: function(t) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(t) {
            var e, i, n, o, s;
            return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), n = i / e, n > 1 && (n = 1), n < 0 && (n = 0), "vertical" === this.orientation && (n = 1 - n), o = this._valueMax() - this._valueMin(), s = this._valueMin() + n * o, this._trimAlignValue(s)
        },
        _start: function(t, e) {
            var i = {
                handle: this.handles[e],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
        },
        _slide: function(t, e, i) {
            var n, o, s;
            this.options.values && this.options.values.length ? (n = this.values(e ? 0 : 1), 2 === this.options.values.length && !0 === this.options.range && (0 === e && i > n || 1 === e && i < n) && (i = n), i !== this.values(e) && (o = this.values(), o[e] = i, s = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i,
                values: o
            }), n = this.values(e ? 0 : 1), !1 !== s && this.values(e, i))) : i !== this.value() && !1 !== (s = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i
            })) && this.value(i)
        },
        _stop: function(t, e) {
            var i = {
                handle: this.handles[e],
                value: this.value()
            };
            this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
        },
        _change: function(t, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = {
                    handle: this.handles[e],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
            }
        },
        value: function(t) {
            return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
        },
        values: function(e, i) {
            var n, o, s;
            if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), void this._change(null, e);
            if (!arguments.length) return this._values();
            if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
            for (n = this.options.values, o = arguments[0], s = 0; s < n.length; s += 1) n[s] = this._trimAlignValue(o[s]), this._change(null, s);
            this._refreshValue()
        },
        _setOption: function(e, i) {
            var n, o = 0;
            switch ("range" === e && !0 === this.options.range && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (o = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), n = 0; n < o; n += 1) this._change(null, n);
                    this._animateOff = !1;
                    break;
                case "min":
                case "max":
                    this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function() {
            var t = this.options.value;
            return t = this._trimAlignValue(t)
        },
        _values: function(t) {
            var e, i, n;
            if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
            if (this.options.values && this.options.values.length) {
                for (i = this.options.values.slice(), n = 0; n < i.length; n += 1) i[n] = this._trimAlignValue(i[n]);
                return i
            }
            return []
        },
        _trimAlignValue: function(t) {
            if (t <= this._valueMin()) return this._valueMin();
            if (t >= this._valueMax()) return this._valueMax();
            var e = this.options.step > 0 ? this.options.step : 1,
                i = (t - this._valueMin()) % e,
                n = t - i;
            return 2 * Math.abs(i) >= e && (n += i > 0 ? e : -e), parseFloat(n.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var e, i, n, o, s, a = this.options.range,
                r = this.options,
                l = this,
                h = !this._animateOff && r.animate,
                c = {};
            this.options.values && this.options.values.length ? this.handles.each(function(n) {
                i = (l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin()) * 100, c["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[h ? "animate" : "css"](c, r.animate), !0 === l.options.range && ("horizontal" === l.orientation ? (0 === n && l.range.stop(1, 1)[h ? "animate" : "css"]({
                    left: i + "%"
                }, r.animate), 1 === n && l.range[h ? "animate" : "css"]({
                    width: i - e + "%"
                }, {
                    queue: !1,
                    duration: r.animate
                })) : (0 === n && l.range.stop(1, 1)[h ? "animate" : "css"]({
                    bottom: i + "%"
                }, r.animate), 1 === n && l.range[h ? "animate" : "css"]({
                    height: i - e + "%"
                }, {
                    queue: !1,
                    duration: r.animate
                }))), e = i
            }) : (n = this.value(), o = this._valueMin(), s = this._valueMax(), i = s !== o ? (n - o) / (s - o) * 100 : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                width: i + "%"
            }, r.animate), "max" === a && "horizontal" === this.orientation && this.range[h ? "animate" : "css"]({
                width: 100 - i + "%"
            }, {
                queue: !1,
                duration: r.animate
            }), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                height: i + "%"
            }, r.animate), "max" === a && "vertical" === this.orientation && this.range[h ? "animate" : "css"]({
                height: 100 - i + "%"
            }, {
                queue: !1,
                duration: r.animate
            }))
        },
        _handleEvents: {
            keydown: function(i) {
                var n, o, s, a = t(i.target).data("ui-slider-handle-index");
                switch (i.keyCode) {
                    case t.ui.keyCode.HOME:
                    case t.ui.keyCode.END:
                    case t.ui.keyCode.PAGE_UP:
                    case t.ui.keyCode.PAGE_DOWN:
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, t(i.target).addClass("ui-state-active"), !1 === this._start(i, a))) return
                }
                switch (s = this.options.step, n = o = this.options.values && this.options.values.length ? this.values(a) : this.value(), i.keyCode) {
                    case t.ui.keyCode.HOME:
                        o = this._valueMin();
                        break;
                    case t.ui.keyCode.END:
                        o = this._valueMax();
                        break;
                    case t.ui.keyCode.PAGE_UP:
                        o = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / e);
                        break;
                    case t.ui.keyCode.PAGE_DOWN:
                        o = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / e);
                        break;
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                        if (n === this._valueMax()) return;
                        o = this._trimAlignValue(n + s);
                        break;
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (n === this._valueMin()) return;
                        o = this._trimAlignValue(n - s)
                }
                this._slide(i, a, o)
            },
            click: function(t) {
                t.preventDefault()
            },
            keyup: function(e) {
                var i = t(e.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"))
            }
        }
    })
}(jQuery),
function(t) {
    function e(t, e, i) {
        return t > e && t < e + i
    }

    function i(t) {
        return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
    }
    t.widget("ui.sortable", t.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function() {
            var t = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = !!this.items.length && ("x" === t.axis || i(this.items[0].item)), this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(e, i) {
            "disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(e, i) {
            var n = null,
                o = !1,
                s = this;
            return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(e), t(e.target).parents().each(function() {
                if (t.data(this, s.widgetName + "-item") === s) return n = t(this), !1
            }), t.data(e.target, s.widgetName + "-item") === s && (n = t(e.target)), !!n && (!(this.options.handle && !i && (t(this.options.handle, n).find("*").addBack().each(function() {
                this === e.target && (o = !0)
            }), !o)) && (this.currentItem = n, this._removeCurrentsFromItems(), !0))))
        },
        _mouseStart: function(e, i, n) {
            var o, s, a = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(),
                this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, t.extend(this.offset, {
                    click: {
                        left: e.pageX - this.offset.left,
                        top: e.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (s = this.document.find("body"), this.storedCursor = s.css("cursor"), s.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(s)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n)
                for (o = this.containers.length - 1; o >= 0; o--) this.containers[o]._trigger("activate", e, this._uiHash(this));
            return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
        },
        _mouseDrag: function(e) {
            var i, n, o, s, a = this.options,
                r = !1;
            for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - t(document).scrollTop() < a.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - a.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < a.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + a.scrollSpeed)), e.pageX - t(document).scrollLeft() < a.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - a.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < a.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + a.scrollSpeed))), !1 !== r && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                if (n = this.items[i], o = n.item[0], (s = this._intersectsWithPointer(n)) && n.instance === this.currentContainer && !(o === this.currentItem[0] || this.placeholder[1 === s ? "next" : "prev"]()[0] === o || t.contains(this.placeholder[0], o) || "semi-dynamic" === this.options.type && t.contains(this.element[0], o))) {
                    if (this.direction = 1 === s ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n)) break;
                    this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                    break
                } return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function(e, i) {
            if (e) {
                if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                    var n = this,
                        o = this.placeholder.offset(),
                        s = this.options.axis,
                        a = {};
                    s && "x" !== s || (a.left = o.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), s && "y" !== s || (a.top = o.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function() {
                        n._clear(e)
                    })
                } else this._clear(e, i);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected),
                n = [];
            return e = e || {}, t(i).each(function() {
                var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
            }), !n.length && e.key && n.push(e.key + "="), n.join("&")
        },
        toArray: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected),
                n = [];
            return e = e || {}, i.each(function() {
                n.push(t(e.item || this).attr(e.attribute || "id") || "")
            }), n
        },
        _intersectsWith: function(t) {
            var e = this.positionAbs.left,
                i = e + this.helperProportions.width,
                n = this.positionAbs.top,
                o = n + this.helperProportions.height,
                s = t.left,
                a = s + t.width,
                r = t.top,
                l = r + t.height,
                h = this.offset.click.top,
                c = this.offset.click.left,
                u = "x" === this.options.axis || n + h > r && n + h < l,
                d = "y" === this.options.axis || e + c > s && e + c < a,
                p = u && d;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : s < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < a && r < n + this.helperProportions.height / 2 && o - this.helperProportions.height / 2 < l
        },
        _intersectsWithPointer: function(t) {
            var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                n = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                o = i && n,
                s = this._getDragVerticalDirection(),
                a = this._getDragHorizontalDirection();
            return !!o && (this.floating ? a && "right" === a || "down" === s ? 2 : 1 : s && ("down" === s ? 2 : 1))
        },
        _intersectsWithSides: function(t) {
            var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                n = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                o = this._getDragVerticalDirection(),
                s = this._getDragHorizontalDirection();
            return this.floating && s ? "right" === s && n || "left" === s && !n : o && ("down" === o && i || "up" === o && !i)
        },
        _getDragVerticalDirection: function() {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== t && (t > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== t && (t > 0 ? "right" : "left")
        },
        refresh: function(t) {
            return this._refreshItems(t), this.refreshPositions(), this
        },
        _connectWith: function() {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function(e) {
            function i() {
                r.push(this)
            }
            var n, o, s, a, r = [],
                l = [],
                h = this._connectWith();
            if (h && e)
                for (n = h.length - 1; n >= 0; n--)
                    for (s = t(h[n]), o = s.length - 1; o >= 0; o--)(a = t.data(s[o], this.widgetFullName)) && a !== this && !a.options.disabled && l.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
            for (l.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), n = l.length - 1; n >= 0; n--) l[n][0].each(i);
            return t(r)
        },
        _removeCurrentsFromItems: function() {
            var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = t.grep(this.items, function(t) {
                for (var i = 0; i < e.length; i++)
                    if (e[i] === t.item[0]) return !1;
                return !0
            })
        },
        _refreshItems: function(e) {
            this.items = [], this.containers = [this];
            var i, n, o, s, a, r, l, h, c = this.items,
                u = [
                    [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                        item: this.currentItem
                    }) : t(this.options.items, this.element), this]
                ],
                d = this._connectWith();
            if (d && this.ready)
                for (i = d.length - 1; i >= 0; i--)
                    for (o = t(d[i]), n = o.length - 1; n >= 0; n--)(s = t.data(o[n], this.widgetFullName)) && s !== this && !s.options.disabled && (u.push([t.isFunction(s.options.items) ? s.options.items.call(s.element[0], e, {
                        item: this.currentItem
                    }) : t(s.options.items, s.element), s]), this.containers.push(s));
            for (i = u.length - 1; i >= 0; i--)
                for (a = u[i][1], r = u[i][0], n = 0, h = r.length; n < h; n++) l = t(r[n]), l.data(this.widgetName + "-item", a), c.push({
                    item: l,
                    instance: a,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                })
        },
        refreshPositions: function(e) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, n, o, s;
            for (i = this.items.length - 1; i >= 0; i--) n = this.items[i], n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (o = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item, e || (n.width = o.outerWidth(), n.height = o.outerHeight()), s = o.offset(), n.left = s.left, n.top = s.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; i >= 0; i--) s = this.containers[i].element.offset(), this.containers[i].containerCache.left = s.left, this.containers[i].containerCache.top = s.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function(e) {
            e = e || this;
            var i, n = e.options;
            n.placeholder && n.placeholder.constructor !== String || (i = n.placeholder, n.placeholder = {
                element: function() {
                    var n = e.currentItem[0].nodeName.toLowerCase(),
                        o = t("<" + n + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tr" === n ? e.currentItem.children().each(function() {
                        t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(o)
                    }) : "img" === n && o.attr("src", e.currentItem.attr("src")), i || o.css("visibility", "hidden"), o
                },
                update: function(t, o) {
                    i && !n.forcePlaceholderSize || (o.height() || o.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), o.width() || o.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                }
            }), e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), n.placeholder.update(e, e.placeholder)
        },
        _contactContainers: function(n) {
            var o, s, a, r, l, h, c, u, d, p, f = null,
                m = null;
            for (o = this.containers.length - 1; o >= 0; o--)
                if (!t.contains(this.currentItem[0], this.containers[o].element[0]))
                    if (this._intersectsWith(this.containers[o].containerCache)) {
                        if (f && t.contains(this.containers[o].element[0], f.element[0])) continue;
                        f = this.containers[o], m = o
                    } else this.containers[o].containerCache.over && (this.containers[o]._trigger("out", n, this._uiHash(this)), this.containers[o].containerCache.over = 0);
            if (f)
                if (1 === this.containers.length) this.containers[m].containerCache.over || (this.containers[m]._trigger("over", n, this._uiHash(this)), this.containers[m].containerCache.over = 1);
                else {
                    for (a = 1e4, r = null, p = f.floating || i(this.currentItem), l = p ? "left" : "top", h = p ? "width" : "height", c = this.positionAbs[l] + this.offset.click[l], s = this.items.length - 1; s >= 0; s--) t.contains(this.containers[m].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (p && !e(this.positionAbs.top + this.offset.click.top, this.items[s].top, this.items[s].height) || (u = this.items[s].item.offset()[l], d = !1, Math.abs(u - c) > Math.abs(u + this.items[s][h] - c) && (d = !0, u += this.items[s][h]), Math.abs(u - c) < a && (a = Math.abs(u - c), r = this.items[s], this.direction = d ? "up" : "down")));
                    if (!r && !this.options.dropOnEmpty) return;
                    if (this.currentContainer === this.containers[m]) return;
                    r ? this._rearrange(n, r, null, !0) : this._rearrange(n, null, this.containers[m].element, !0), this._trigger("change", n, this._uiHash()), this.containers[m]._trigger("change", n, this._uiHash(this)), this.currentContainer = this.containers[m], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[m]._trigger("over", n, this._uiHash(this)), this.containers[m].containerCache.over = 1
                }
        },
        _createHelper: function(e) {
            var i = this.options,
                n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
            return n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]), n[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), n[0].style.width && !i.forceHelperSize || n.width(this.currentItem.width()), n[0].style.height && !i.forceHelperSize || n.height(this.currentItem.height()), n
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var t = this.currentItem.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, i, n, o = this.options;
            "parent" === o.containment && (o.containment = this.helper[0].parentNode), "document" !== o.containment && "window" !== o.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === o.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === o.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(o.containment) || (e = t(o.containment)[0], i = t(o.containment).offset(), n = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(e, i) {
            i || (i = this.position);
            var n = "absolute" === e ? 1 : -1,
                o = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                s = /(html|body)/i.test(o[0].tagName);
            return {
                top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : s ? 0 : o.scrollTop()) * n,
                left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : s ? 0 : o.scrollLeft()) * n
            }
        },
        _generatePosition: function(e) {
            var i, n, o = this.options,
                s = e.pageX,
                a = e.pageY,
                r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                l = /(html|body)/i.test(r[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (s = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (s = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), o.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / o.grid[1]) * o.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - o.grid[1] : i + o.grid[1] : i, n = this.originalPageX + Math.round((s - this.originalPageX) / o.grid[0]) * o.grid[0], s = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n : n - this.offset.click.left >= this.containment[0] ? n - o.grid[0] : n + o.grid[0] : n)), {
                top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : r.scrollTop()),
                left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : r.scrollLeft())
            }
        },
        _rearrange: function(t, e, i, n) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var o = this.counter;
            this._delay(function() {
                o === this.counter && this.refreshPositions(!n)
            })
        },
        _clear: function(t, e) {
            function i(t, e, i) {
                return function(n) {
                    i._trigger(t, n, e._uiHash(e))
                }
            }
            this.reverting = !1;
            var n, o = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (n in this._storedCSS) "auto" !== this._storedCSS[n] && "static" !== this._storedCSS[n] || (this._storedCSS[n] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            for (this.fromOutside && !e && o.push(function(t) {
                    this._trigger("receive", t, this._uiHash(this.fromOutside))
                }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || o.push(function(t) {
                    this._trigger("update", t, this._uiHash())
                }), this !== this.currentContainer && (e || (o.push(function(t) {
                    this._trigger("remove", t, this._uiHash())
                }), o.push(function(t) {
                    return function(e) {
                        t._trigger("receive", e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)), o.push(function(t) {
                    return function(e) {
                        t._trigger("update", e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)))), n = this.containers.length - 1; n >= 0; n--) e || o.push(i("deactivate", this, this.containers[n])), this.containers[n].containerCache.over && (o.push(i("out", this, this.containers[n])), this.containers[n].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                if (!e) {
                    for (this._trigger("beforeStop", t, this._uiHash()), n = 0; n < o.length; n++) o[n].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
                for (n = 0; n < o.length; n++) o[n].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function() {
            !1 === t.Widget.prototype._trigger.apply(this, arguments) && this.cancel()
        },
        _uiHash: function(e) {
            var i = e || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || t([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: e ? e.element : null
            }
        }
    })
}(jQuery),
function(t) {
    function e(t) {
        return function() {
            var e = this.element.val();
            t.apply(this, arguments), this._refresh(), e !== this.element.val() && this._trigger("change")
        }
    }
    t.widget("ui.spinner", {
        version: "1.10.4",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function() {
            var e = {},
                i = this.element;
            return t.each(["min", "max", "step"], function(t, n) {
                var o = i.attr(n);
                o !== undefined && o.length && (e[n] = o)
            }), e
        },
        _events: {
            keydown: function(t) {
                this._start(t) && this._keydown(t) && t.preventDefault()
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val()
            },
            blur: function(t) {
                if (this.cancelBlur) return void delete this.cancelBlur;
                this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", t)
            },
            mousewheel: function(t, e) {
                if (e) {
                    if (!this.spinning && !this._start(t)) return !1;
                    this._spin((e > 0 ? 1 : -1) * this.options.step, t), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(t)
                    }, 100), t.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function(e) {
                function i() {
                    this.element[0] === this.document[0].activeElement || (this.element.focus(), this.previous = n, this._delay(function() {
                        this.previous = n
                    }))
                }
                var n;
                n = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), e.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
                    delete this.cancelBlur, i.call(this)
                }), !1 !== this._start(e) && this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(e) {
                if (t(e.currentTarget).hasClass("ui-state-active")) return !1 !== this._start(e) && void this._repeat(null, t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, e)
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function() {
            var t = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"), this.buttons = t.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * t.height()) && t.height() > 0 && t.height(t.height()), this.options.disabled && this.disable()
        },
        _keydown: function(e) {
            var i = this.options,
                n = t.ui.keyCode;
            switch (e.keyCode) {
                case n.UP:
                    return this._repeat(null, 1, e), !0;
                case n.DOWN:
                    return this._repeat(null, -1, e), !0;
                case n.PAGE_UP:
                    return this._repeat(null, i.page, e), !0;
                case n.PAGE_DOWN:
                    return this._repeat(null, -i.page, e), !0
            }
            return !1
        },
        _uiSpinnerHtml: function() {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function() {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
        },
        _start: function(t) {
            return !(!this.spinning && !1 === this._trigger("start", t)) && (this.counter || (this.counter = 1), this.spinning = !0, !0)
        },
        _repeat: function(t, e, i) {
            t = t || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                this._repeat(40, e, i)
            }, t), this._spin(e * this.options.step, i)
        },
        _spin: function(t, e) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1), i = this._adjustValue(i + t * this._increment(this.counter)), this.spinning && !1 === this._trigger("spin", e, {
                value: i
            }) || (this._value(i), this.counter++)
        },
        _increment: function(e) {
            var i = this.options.incremental;
            return i ? t.isFunction(i) ? i(e) : Math.floor(e * e * e / 5e4 - e * e / 500 + 17 * e / 200 + 1) : 1
        },
        _precision: function() {
            var t = this._precisionOf(this.options.step);
            return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
        },
        _precisionOf: function(t) {
            var e = t.toString(),
                i = e.indexOf(".");
            return -1 === i ? 0 : e.length - i - 1
        },
        _adjustValue: function(t) {
            var e, i, n = this.options;
            return e = null !== n.min ? n.min : 0, i = t - e, i = Math.round(i / n.step) * n.step, t = e + i, t = parseFloat(t.toFixed(this._precision())), null !== n.max && t > n.max ? n.max : null !== n.min && t < n.min ? n.min : t
        },
        _stop: function(t) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", t))
        },
        _setOption: function(t, e) {
            if ("culture" === t || "numberFormat" === t) {
                var i = this._parse(this.element.val());
                return this.options[t] = e, void this.element.val(this._format(i))
            }
            "max" !== t && "min" !== t && "step" !== t || "string" == typeof e && (e = this._parse(e)), "icons" === t && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)), this._super(t, e), "disabled" === t && (e ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
        },
        _setOptions: e(function(t) {
            this._super(t), this._value(this.element.val())
        }),
        _parse: function(t) {
            return "string" == typeof t && "" !== t && (t = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t), "" === t || isNaN(t) ? null : t
        },
        _format: function(t) {
            return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        _value: function(t, e) {
            var i;
            "" !== t && null !== (i = this._parse(t)) && (e || (i = this._adjustValue(i)), t = this._format(i)), this.element.val(t), this._refresh()
        },
        _destroy: function() {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
        },
        stepUp: e(function(t) {
            this._stepUp(t)
        }),
        _stepUp: function(t) {
            this._start() && (this._spin((t || 1) * this.options.step), this._stop())
        },
        stepDown: e(function(t) {
            this._stepDown(t)
        }),
        _stepDown: function(t) {
            this._start() && (this._spin((t || 1) * -this.options.step), this._stop())
        },
        pageUp: e(function(t) {
            this._stepUp((t || 1) * this.options.page)
        }),
        pageDown: e(function(t) {
            this._stepDown((t || 1) * this.options.page)
        }),
        value: function(t) {
            if (!arguments.length) return this._parse(this.element.val());
            e(this._value).call(this, t)
        },
        widget: function() {
            return this.uiSpinner
        }
    })
}(jQuery),
function(t, e) {
    function i() {
        return ++o
    }

    function n(t) {
        return t = t.cloneNode(!1), t.hash.length > 1 && decodeURIComponent(t.href.replace(s, "")) === decodeURIComponent(location.href.replace(s, ""))
    }
    var o = 0,
        s = /#.*$/;
    t.widget("ui.tabs", {
        version: "1.10.4",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function() {
            var e = this,
                i = this.options;
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(e) {
                t(this).is(".ui-state-disabled") && e.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                t(this).closest("li").is(".ui-state-disabled") && this.blur()
            }), this._processTabs(), i.active = this._initialActive(), t.isArray(i.disabled) && (i.disabled = t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                return e.tabs.index(t)
            }))).sort()), !1 !== this.options.active && this.anchors.length ? this.active = this._findActive(i.active) : this.active = t(), this._refresh(), this.active.length && this.load(i.active)
        },
        _initialActive: function() {
            var e = this.options.active,
                i = this.options.collapsible,
                n = location.hash.substring(1);
            return null === e && (n && this.tabs.each(function(i, o) {
                if (t(o).attr("aria-controls") === n) return e = i, !1
            }), null === e && (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), null !== e && -1 !== e || (e = !!this.tabs.length && 0)), !1 !== e && -1 === (e = this.tabs.index(this.tabs.eq(e))) && (e = !i && 0), !i && !1 === e && this.anchors.length && (e = 0), e
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : t()
            }
        },
        _tabKeydown: function(e) {
            var i = t(this.document[0].activeElement).closest("li"),
                n = this.tabs.index(i),
                o = !0;
            if (!this._handlePageNav(e)) {
                switch (e.keyCode) {
                    case t.ui.keyCode.RIGHT:
                    case t.ui.keyCode.DOWN:
                        n++;
                        break;
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.LEFT:
                        o = !1, n--;
                        break;
                    case t.ui.keyCode.END:
                        n = this.anchors.length - 1;
                        break;
                    case t.ui.keyCode.HOME:
                        n = 0;
                        break;
                    case t.ui.keyCode.SPACE:
                        return e.preventDefault(), clearTimeout(this.activating), void this._activate(n);
                    case t.ui.keyCode.ENTER:
                        return e.preventDefault(), clearTimeout(this.activating), void this._activate(n !== this.options.active && n);
                    default:
                        return
                }
                e.preventDefault(), clearTimeout(this.activating), n = this._focusNextTab(n, o), e.ctrlKey || (i.attr("aria-selected", "false"), this.tabs.eq(n).attr("aria-selected", "true"), this.activating = this._delay(function() {
                    this.option("active", n)
                }, this.delay))
            }
        },
        _panelKeydown: function(e) {
            this._handlePageNav(e) || e.ctrlKey && e.keyCode === t.ui.keyCode.UP && (e.preventDefault(), this.active.focus())
        },
        _handlePageNav: function(e) {
            return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
        },
        _findNextTab: function(e, i) {
            function n() {
                return e > o && (e = 0), e < 0 && (e = o), e
            }
            for (var o = this.tabs.length - 1; - 1 !== t.inArray(n(), this.options.disabled);) e = i ? e + 1 : e - 1;
            return e
        },
        _focusNextTab: function(t, e) {
            return t = this._findNextTab(t, e), this.tabs.eq(t).focus(), t
        },
        _setOption: function(t, e) {
            return "active" === t ? void this._activate(e) : "disabled" === t ? void this._setupDisabled(e) : (this._super(t, e), "collapsible" === t && (this.element.toggleClass("ui-tabs-collapsible", e), e || !1 !== this.options.active || this._activate(0)), "event" === t && this._setupEvents(e), void("heightStyle" === t && this._setupHeightStyle(e)))
        },
        _tabId: function(t) {
            return t.attr("aria-controls") || "ui-tabs-" + i()
        },
        _sanitizeSelector: function(t) {
            return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function() {
            var e = this.options,
                i = this.tablist.children(":has(a[href])");
            e.disabled = t.map(i.filter(".ui-state-disabled"), function(t) {
                return i.index(t)
            }), this._processTabs(), !1 !== e.active && this.anchors.length ? this.active.length && !t.contains(this.tablist[0], this.active[0]) ? this.tabs.length === e.disabled.length ? (e.active = !1,
                this.active = t()) : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1)) : e.active = this.tabs.index(this.active) : (e.active = !1, this.active = t()), this._refresh()
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var e = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function() {
                return t("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = t(), this.anchors.each(function(i, o) {
                var s, a, r, l = t(o).uniqueId().attr("id"),
                    h = t(o).closest("li"),
                    c = h.attr("aria-controls");
                n(o) ? (s = o.hash, a = e.element.find(e._sanitizeSelector(s))) : (r = e._tabId(h), s = "#" + r, a = e.element.find(s), a.length || (a = e._createPanel(r), a.insertAfter(e.panels[i - 1] || e.tablist)), a.attr("aria-live", "polite")), a.length && (e.panels = e.panels.add(a)), c && h.data("ui-tabs-aria-controls", c), h.attr({
                    "aria-controls": s.substring(1),
                    "aria-labelledby": l
                }), a.attr("aria-labelledby", l)
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function() {
            return this.tablist || this.element.find("ol,ul").eq(0)
        },
        _createPanel: function(e) {
            return t("<div>").attr("id", e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function(e) {
            t.isArray(e) && (e.length ? e.length === this.anchors.length && (e = !0) : e = !1);
            for (var i, n = 0; i = this.tabs[n]; n++) !0 === e || -1 !== t.inArray(n, e) ? t(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = e
        },
        _setupEvents: function(e) {
            var i = {
                click: function(t) {
                    t.preventDefault()
                }
            };
            e && t.each(e.split(" "), function(t, e) {
                i[e] = "_eventHandler"
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, i), this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(e) {
            var i, n = this.element.parent();
            "fill" === e ? (i = n.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                var e = t(this),
                    n = e.css("position");
                "absolute" !== n && "fixed" !== n && (i -= e.outerHeight(!0))
            }), this.element.children().not(this.panels).each(function() {
                i -= t(this).outerHeight(!0)
            }), this.panels.each(function() {
                t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
            }).css("overflow", "auto")) : "auto" === e && (i = 0, this.panels.each(function() {
                i = Math.max(i, t(this).height("").height())
            }).height(i))
        },
        _eventHandler: function(e) {
            var i = this.options,
                n = this.active,
                o = t(e.currentTarget),
                s = o.closest("li"),
                a = s[0] === n[0],
                r = a && i.collapsible,
                l = r ? t() : this._getPanelForTab(s),
                h = n.length ? this._getPanelForTab(n) : t(),
                c = {
                    oldTab: n,
                    oldPanel: h,
                    newTab: r ? t() : s,
                    newPanel: l
                };
            e.preventDefault(), s.hasClass("ui-state-disabled") || s.hasClass("ui-tabs-loading") || this.running || a && !i.collapsible || !1 === this._trigger("beforeActivate", e, c) || (i.active = !r && this.tabs.index(s), this.active = a ? t() : s, this.xhr && this.xhr.abort(), h.length || l.length || t.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(s), e), this._toggle(e, c))
        },
        _toggle: function(e, i) {
            function n() {
                s.running = !1, s._trigger("activate", e, i)
            }

            function o() {
                i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), a.length && s.options.show ? s._show(a, s.options.show, n) : (a.show(), n())
            }
            var s = this,
                a = i.newPanel,
                r = i.oldPanel;
            this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function() {
                i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), o()
            }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), o()), r.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }), i.oldTab.attr("aria-selected", "false"), a.length && r.length ? i.oldTab.attr("tabIndex", -1) : a.length && this.tabs.filter(function() {
                return 0 === t(this).attr("tabIndex")
            }).attr("tabIndex", -1), a.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }), i.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function(e) {
            var i, n = this._findActive(e);
            n[0] !== this.active[0] && (n.length || (n = this.active), i = n.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: t.noop
            }))
        },
        _findActive: function(e) {
            return !1 === e ? t() : this.tabs.eq(e)
        },
        _getIndex: function(t) {
            return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
        },
        _destroy: function() {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
                t.data(this, "ui-tabs-destroy") ? t(this).remove() : t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }), this.tabs.each(function() {
                var e = t(this),
                    i = e.data("ui-tabs-aria-controls");
                i ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : e.removeAttr("aria-controls")
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(i) {
            var n = this.options.disabled;
            !1 !== n && (i === e ? n = !1 : (i = this._getIndex(i), n = t.isArray(n) ? t.map(n, function(t) {
                return t !== i ? t : null
            }) : t.map(this.tabs, function(t, e) {
                return e !== i ? e : null
            })), this._setupDisabled(n))
        },
        disable: function(i) {
            var n = this.options.disabled;
            if (!0 !== n) {
                if (i === e) n = !0;
                else {
                    if (i = this._getIndex(i), -1 !== t.inArray(i, n)) return;
                    n = t.isArray(n) ? t.merge([i], n).sort() : [i]
                }
                this._setupDisabled(n)
            }
        },
        load: function(e, i) {
            e = this._getIndex(e);
            var o = this,
                s = this.tabs.eq(e),
                a = s.find(".ui-tabs-anchor"),
                r = this._getPanelForTab(s),
                l = {
                    tab: s,
                    panel: r
                };
            n(a[0]) || (this.xhr = t.ajax(this._ajaxSettings(a, i, l)), this.xhr && "canceled" !== this.xhr.statusText && (s.addClass("ui-tabs-loading"), r.attr("aria-busy", "true"), this.xhr.success(function(t) {
                setTimeout(function() {
                    r.html(t), o._trigger("load", i, l)
                }, 1)
            }).complete(function(t, e) {
                setTimeout(function() {
                    "abort" === e && o.panels.stop(!1, !0), s.removeClass("ui-tabs-loading"), r.removeAttr("aria-busy"), t === o.xhr && delete o.xhr
                }, 1)
            })))
        },
        _ajaxSettings: function(e, i, n) {
            var o = this;
            return {
                url: e.attr("href"),
                beforeSend: function(e, s) {
                    return o._trigger("beforeLoad", i, t.extend({
                        jqXHR: e,
                        ajaxSettings: s
                    }, n))
                }
            }
        },
        _getPanelForTab: function(e) {
            var i = t(e).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + i))
        }
    })
}(jQuery),
function(t) {
    function e(e, i) {
        var n = (e.attr("aria-describedby") || "").split(/\s+/);
        n.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(n.join(" ")))
    }

    function i(e) {
        var i = e.data("ui-tooltip-id"),
            n = (e.attr("aria-describedby") || "").split(/\s+/),
            o = t.inArray(i, n); - 1 !== o && n.splice(o, 1), e.removeData("ui-tooltip-id"), n = t.trim(n.join(" ")), n ? e.attr("aria-describedby", n) : e.removeAttr("aria-describedby")
    }
    var n = 0;
    t.widget("ui.tooltip", {
        version: "1.10.4",
        options: {
            content: function() {
                var e = t(this).attr("title") || "";
                return t("<a>").text(e).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
        },
        _setOption: function(e, i) {
            var n = this;
            if ("disabled" === e) return this[i ? "_disable" : "_enable"](), void(this.options[e] = i);
            this._super(e, i), "content" === e && t.each(this.tooltips, function(t, e) {
                n._updateContent(e)
            })
        },
        _disable: function() {
            var e = this;
            t.each(this.tooltips, function(i, n) {
                var o = t.Event("blur");
                o.target = o.currentTarget = n[0], e.close(o, !0)
            }), this.element.find(this.options.items).addBack().each(function() {
                var e = t(this);
                e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).attr("title", "")
            })
        },
        _enable: function() {
            this.element.find(this.options.items).addBack().each(function() {
                var e = t(this);
                e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
            })
        },
        open: function(e) {
            var i = this,
                n = t(e ? e.target : this.element).closest(this.options.items);
            n.length && !n.data("ui-tooltip-id") && (n.attr("title") && n.data("ui-tooltip-title", n.attr("title")), n.data("ui-tooltip-open", !0), e && "mouseover" === e.type && n.parents().each(function() {
                var e, n = t(this);
                n.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), n.attr("title") && (n.uniqueId(), i.parents[this.id] = {
                    element: this,
                    title: n.attr("title")
                }, n.attr("title", ""))
            }), this._updateContent(n, e))
        },
        _updateContent: function(t, e) {
            var i, n = this.options.content,
                o = this,
                s = e ? e.type : null;
            if ("string" == typeof n) return this._open(e, t, n);
            (i = n.call(t[0], function(i) {
                t.data("ui-tooltip-open") && o._delay(function() {
                    e && (e.type = s), this._open(e, t, i)
                })
            })) && this._open(e, t, i)
        },
        _open: function(i, n, o) {
            function s(t) {
                h.of = t, a.is(":hidden") || a.position(h)
            }
            var a, r, l, h = t.extend({}, this.options.position);
            if (o) {
                if (a = this._find(n), a.length) return void a.find(".ui-tooltip-content").html(o);
                n.is("[title]") && (i && "mouseover" === i.type ? n.attr("title", "") : n.removeAttr("title")), a = this._tooltip(n), e(n, a.attr("id")), a.find(".ui-tooltip-content").html(o), this.options.track && i && /^mouse/.test(i.type) ? (this._on(this.document, {
                    mousemove: s
                }), s(i)) : a.position(t.extend({
                    of: n
                }, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.show && this.options.show.delay && (l = this.delayedShow = setInterval(function() {
                    a.is(":visible") && (s(h.of), clearInterval(l))
                }, t.fx.interval)), this._trigger("open", i, {
                    tooltip: a
                }), r = {
                    keyup: function(e) {
                        if (e.keyCode === t.ui.keyCode.ESCAPE) {
                            var i = t.Event(e);
                            i.currentTarget = n[0], this.close(i, !0)
                        }
                    },
                    remove: function() {
                        this._removeTooltip(a)
                    }
                }, i && "mouseover" !== i.type || (r.mouseleave = "close"), i && "focusin" !== i.type || (r.focusout = "close"), this._on(!0, n, r)
            }
        },
        close: function(e) {
            var n = this,
                o = t(e ? e.currentTarget : this.element),
                s = this._find(o);
            this.closing || (clearInterval(this.delayedShow), o.data("ui-tooltip-title") && o.attr("title", o.data("ui-tooltip-title")), i(o), s.stop(!0), this._hide(s, this.options.hide, function() {
                n._removeTooltip(t(this))
            }), o.removeData("ui-tooltip-open"), this._off(o, "mouseleave focusout keyup"), o[0] !== this.element[0] && this._off(o, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function(e, i) {
                t(i.element).attr("title", i.title), delete n.parents[e]
            }), this.closing = !0, this._trigger("close", e, {
                tooltip: s
            }), this.closing = !1)
        },
        _tooltip: function(e) {
            var i = "ui-tooltip-" + n++,
                o = t("<div>").attr({
                    id: i,
                    role: "tooltip"
                }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            return t("<div>").addClass("ui-tooltip-content").appendTo(o), o.appendTo(this.document[0].body), this.tooltips[i] = e, o
        },
        _find: function(e) {
            var i = e.data("ui-tooltip-id");
            return i ? t("#" + i) : t()
        },
        _removeTooltip: function(t) {
            t.remove(), delete this.tooltips[t.attr("id")]
        },
        _destroy: function() {
            var e = this;
            t.each(this.tooltips, function(i, n) {
                var o = t.Event("blur");
                o.target = o.currentTarget = n[0], e.close(o, !0), t("#" + i).remove(), n.data("ui-tooltip-title") && (n.attr("title", n.data("ui-tooltip-title")), n.removeData("ui-tooltip-title"))
            })
        }
    })
}(jQuery),
function(t, e, i, n) {
    "use strict";
    var o = i("html"),
        s = i(t),
        a = i(e),
        r = i.fancybox = function() {
            r.open.apply(this, arguments)
        },
        l = navigator.userAgent.match(/msie/i),
        h = null,
        c = e.createTouch !== n,
        u = function(t) {
            return t && t.hasOwnProperty && t instanceof i
        },
        d = function(t) {
            return t && "string" === i.type(t)
        },
        p = function(t) {
            return d(t) && t.indexOf("%") > 0
        },
        f = function(t) {
            return t && !(t.style.overflow && "hidden" === t.style.overflow) && (t.clientWidth && t.scrollWidth > t.clientWidth || t.clientHeight && t.scrollHeight > t.clientHeight)
        },
        m = function(t, e) {
            var i = parseInt(t, 10) || 0;
            return e && p(t) && (i = r.getViewport()[e] / 100 * i), Math.ceil(i)
        },
        g = function(t, e) {
            return m(t, e) + "px"
        };
    i.extend(r, {
        version: "2.1.7",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !c,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
                loading: '<div id="fancybox-loading"><div></div></div>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: i.noop,
            beforeLoad: i.noop,
            afterLoad: i.noop,
            beforeShow: i.noop,
            afterShow: i.noop,
            beforeChange: i.noop,
            beforeClose: i.noop,
            afterClose: i.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(t, e) {
            if (t && (i.isPlainObject(e) || (e = {}), !1 !== r.close(!0))) return i.isArray(t) || (t = u(t) ? i(t).get() : [t]), i.each(t, function(o, s) {
                var a, l, h, c, p, f, m, g = {};
                "object" === i.type(s) && (s.nodeType && (s = i(s)), u(s) ? (g = {
                    href: s.data("fancybox-href") || s.attr("href"),
                    title: i("<div/>").text(s.data("fancybox-title") || s.attr("title") || "").html(),
                    isDom: !0,
                    element: s
                }, i.metadata && i.extend(!0, g, s.metadata())) : g = s), a = e.href || g.href || (d(s) ? s : null), l = e.title !== n ? e.title : g.title || "", h = e.content || g.content, c = h ? "html" : e.type || g.type, !c && g.isDom && ((c = s.data("fancybox-type")) || (p = s.prop("class").match(/fancybox\.(\w+)/), c = p ? p[1] : null)), d(a) && (c || (r.isImage(a) ? c = "image" : r.isSWF(a) ? c = "swf" : "#" === a.charAt(0) ? c = "inline" : d(s) && (c = "html", h = s)), "ajax" === c && (f = a.split(/\s+/, 2), a = f.shift(), m = f.shift())), h || ("inline" === c ? a ? h = i(d(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : g.isDom && (h = s) : "html" === c ? h = a : c || a || !g.isDom || (c = "inline", h = s)), i.extend(g, {
                    href: a,
                    type: c,
                    content: h,
                    title: l,
                    selector: m
                }), t[o] = g
            }), r.opts = i.extend(!0, {}, r.defaults, e), e.keys !== n && (r.opts.keys = !!e.keys && i.extend({}, r.defaults.keys, e.keys)), r.group = t, r._start(r.opts.index)
        },
        cancel: function() {
            var t = r.coming;
            t && !1 === r.trigger("onCancel") || (r.hideLoading(), t && (r.ajaxLoad && r.ajaxLoad.abort(), r.ajaxLoad = null, r.imgPreload && (r.imgPreload.onload = r.imgPreload.onerror = null), t.wrap && t.wrap.stop(!0, !0).trigger("onReset").remove(), r.coming = null, r.current || r._afterZoomOut(t)))
        },
        close: function(t) {
            r.cancel(), !1 !== r.trigger("beforeClose") && (r.unbindEvents(), r.isActive && (r.isOpen && !0 !== t ? (r.isOpen = r.isOpened = !1, r.isClosing = !0, i(".fancybox-item, .fancybox-nav").remove(), r.wrap.stop(!0, !0).removeClass("fancybox-opened"), r.transitions[r.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(), r._afterZoomOut())))
        },
        play: function(t) {
            var e = function() {
                    clearTimeout(r.player.timer)
                },
                i = function() {
                    e(), r.current && r.player.isActive && (r.player.timer = setTimeout(r.next, r.current.playSpeed))
                },
                n = function() {
                    e(), a.unbind(".player"), r.player.isActive = !1, r.trigger("onPlayEnd")
                },
                o = function() {
                    r.current && (r.current.loop || r.current.index < r.group.length - 1) && (r.player.isActive = !0, a.bind({
                        "onCancel.player beforeClose.player": n,
                        "onUpdate.player": i,
                        "beforeLoad.player": e
                    }), i(), r.trigger("onPlayStart"))
                };
            !0 === t || !r.player.isActive && !1 !== t ? o() : n()
        },
        next: function(t) {
            var e = r.current;
            e && (d(t) || (t = e.direction.next), r.jumpto(e.index + 1, t, "next"))
        },
        prev: function(t) {
            var e = r.current;
            e && (d(t) || (t = e.direction.prev), r.jumpto(e.index - 1, t, "prev"))
        },
        jumpto: function(t, e, i) {
            var o = r.current;
            o && (t = m(t), r.direction = e || o.direction[t >= o.index ? "next" : "prev"], r.router = i || "jumpto", o.loop && (t < 0 && (t = o.group.length + t % o.group.length), t %= o.group.length), o.group[t] !== n && (r.cancel(), r._start(t)))
        },
        reposition: function(t, e) {
            var n, o = r.current,
                s = o ? o.wrap : null;
            s && (n = r._getPosition(e), t && "scroll" === t.type ? (delete n.position, s.stop(!0, !0).animate(n, 200)) : (s.css(n), o.pos = i.extend({}, o.dim, n)))
        },
        update: function(t) {
            var e = t && t.originalEvent && t.originalEvent.type,
                i = !e || "orientationchange" === e;
            i && (clearTimeout(h), h = null), r.isOpen && !h && (h = setTimeout(function() {
                var n = r.current;
                n && !r.isClosing && (r.wrap.removeClass("fancybox-tmp"), (i || "load" === e || "resize" === e && n.autoResize) && r._setDimension(), "scroll" === e && n.canShrink || r.reposition(t), r.trigger("onUpdate"), h = null)
            }, i && !c ? 0 : 300))
        },
        toggle: function(t) {
            r.isOpen && (r.current.fitToView = "boolean" === i.type(t) ? t : !r.current.fitToView, c && (r.wrap.removeAttr("style").addClass("fancybox-tmp"), r.trigger("onUpdate")), r.update())
        },
        hideLoading: function() {
            a.unbind(".loading"), i("#fancybox-loading").remove()
        },
        showLoading: function() {
            var t, e;
            r.hideLoading(), t = i(r.opts.tpl.loading).click(r.cancel).appendTo("body"), a.bind("keydown.loading", function(t) {
                27 === (t.which || t.keyCode) && (t.preventDefault(), r.cancel())
            }), r.defaults.fixed || (e = r.getViewport(), t.css({
                position: "absolute",
                top: .5 * e.h + e.y,
                left: .5 * e.w + e.x
            })), r.trigger("onLoading")
        },
        getViewport: function() {
            var e = r.current && r.current.locked || !1,
                i = {
                    x: s.scrollLeft(),
                    y: s.scrollTop()
                };
            return e && e.length ? (i.w = e[0].clientWidth, i.h = e[0].clientHeight) : (i.w = c && t.innerWidth ? t.innerWidth : s.width(), i.h = c && t.innerHeight ? t.innerHeight : s.height()), i
        },
        unbindEvents: function() {
            r.wrap && u(r.wrap) && r.wrap.unbind(".fb"), a.unbind(".fb"), s.unbind(".fb")
        },
        bindEvents: function() {
            var t, e = r.current;
            e && (s.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), r.update), t = e.keys, t && a.bind("keydown.fb", function(o) {
                var s = o.which || o.keyCode,
                    a = o.target || o.srcElement;
                if (27 === s && r.coming) return !1;
                o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || a && (a.type || i(a).is("[contenteditable]")) || i.each(t, function(t, a) {
                    return e.group.length > 1 && a[s] !== n ? (r[t](a[s]), o.preventDefault(), !1) : i.inArray(s, a) > -1 ? (r[t](), o.preventDefault(), !1) : void 0
                })
            }), i.fn.mousewheel && e.mouseWheel && r.wrap.bind("mousewheel.fb", function(t, n, o, s) {
                for (var a = t.target || null, l = i(a), h = !1; l.length && !(h || l.is(".fancybox-skin") || l.is(".fancybox-wrap"));) h = f(l[0]), l = i(l).parent();
                0 === n || h || r.group.length > 1 && !e.canShrink && (s > 0 || o > 0 ? r.prev(s > 0 ? "down" : "left") : (s < 0 || o < 0) && r.next(s < 0 ? "up" : "right"), t.preventDefault())
            }))
        },
        trigger: function(t, e) {
            var n, o = e || r.coming || r.current;
            if (o) {
                if (i.isFunction(o[t]) && (n = o[t].apply(o, Array.prototype.slice.call(arguments, 1))), !1 === n) return !1;
                o.helpers && i.each(o.helpers, function(e, n) {
                    n && r.helpers[e] && i.isFunction(r.helpers[e][t]) && r.helpers[e][t](i.extend(!0, {}, r.helpers[e].defaults, n), o)
                })
            }
            a.trigger(t)
        },
        isImage: function(t) {
            return d(t) && t.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function(t) {
            return d(t) && t.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(t) {
            var e, n, o, s, a, l = {};
            if (t = m(t), !(e = r.group[t] || null)) return !1;
            if (l = i.extend(!0, {}, r.opts, e), s = l.margin, a = l.padding, "number" === i.type(s) && (l.margin = [s, s, s, s]), "number" === i.type(a) && (l.padding = [a, a, a, a]), l.modal && i.extend(!0, l, {
                    closeBtn: !1,
                    closeClick: !1,
                    nextClick: !1,
                    arrows: !1,
                    mouseWheel: !1,
                    keys: null,
                    helpers: {
                        overlay: {
                            closeClick: !1
                        }
                    }
                }), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), "auto" === l.height && (l.autoHeight = !0), l.group = r.group, l.index = t, r.coming = l, !1 === r.trigger("beforeLoad")) return void(r.coming = null);
            if (o = l.type, n = l.href, !o) return r.coming = null, !(!r.current || !r.router || "jumpto" === r.router) && (r.current.index = t, r[r.router](r.direction));
            if (r.isActive = !0, "image" !== o && "swf" !== o || (l.autoHeight = l.autoWidth = !1, l.scrolling = "visible"), "image" === o && (l.aspectRatio = !0), "iframe" === o && c && (l.scrolling = "scroll"), l.wrap = i(l.tpl.wrap).addClass("fancybox-" + (c ? "mobile" : "desktop") + " fancybox-type-" + o + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), i.extend(l, {
                    skin: i(".fancybox-skin", l.wrap),
                    outer: i(".fancybox-outer", l.wrap),
                    inner: i(".fancybox-inner", l.wrap)
                }), i.each(["Top", "Right", "Bottom", "Left"], function(t, e) {
                    l.skin.css("padding" + e, g(l.padding[t]))
                }), r.trigger("onReady"), "inline" === o || "html" === o) {
                if (!l.content || !l.content.length) return r._error("content")
            } else if (!n) return r._error("href");
            "image" === o ? r._loadImage() : "ajax" === o ? r._loadAjax() : "iframe" === o ? r._loadIframe() : r._afterLoad()
        },
        _error: function(t) {
            i.extend(r.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: t,
                content: r.coming.tpl.error
            }), r._afterLoad()
        },
        _loadImage: function() {
            var t = r.imgPreload = new Image;
            t.onload = function() {
                this.onload = this.onerror = null, r.coming.width = this.width / r.opts.pixelRatio, r.coming.height = this.height / r.opts.pixelRatio, r._afterLoad()
            }, t.onerror = function() {
                this.onload = this.onerror = null, r._error("image")
            }, t.src = r.coming.href, !0 !== t.complete && r.showLoading()
        },
        _loadAjax: function() {
            var t = r.coming;
            r.showLoading(), r.ajaxLoad = i.ajax(i.extend({}, t.ajax, {
                url: t.href,
                error: function(t, e) {
                    r.coming && "abort" !== e ? r._error("ajax", t) : r.hideLoading()
                },
                success: function(e, i) {
                    "success" === i && (t.content = e, r._afterLoad())
                }
            }))
        },
        _loadIframe: function() {
            var t = r.coming,
                e = i(t.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", c ? "auto" : t.iframe.scrolling).attr("src", t.href);
            i(t.wrap).bind("onReset", function() {
                try {
                    i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (t) {}
            }), t.iframe.preload && (r.showLoading(), e.one("load", function() {
                i(this).data("ready", 1), c || i(this).bind("load.fb", r.update), i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), r._afterLoad()
            })), t.content = e.appendTo(t.inner), t.iframe.preload || r._afterLoad()
        },
        _preloadImages: function() {
            var t, e, i = r.group,
                n = r.current,
                o = i.length,
                s = n.preload ? Math.min(n.preload, o - 1) : 0;
            for (e = 1; e <= s; e += 1) t = i[(n.index + e) % o], "image" === t.type && t.href && ((new Image).src = t.href)
        },
        _afterLoad: function() {
            var t, e, n, o, s, a, l = r.coming,
                h = r.current,
                c = "fancybox-placeholder";
            if (r.hideLoading(), l && !1 !== r.isActive) {
                if (!1 === r.trigger("afterLoad", l, h)) return l.wrap.stop(!0).trigger("onReset").remove(), void(r.coming = null);
                switch (h && (r.trigger("beforeChange", h), h.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), r.unbindEvents(), t = l, e = l.content, n = l.type, o = l.scrolling, i.extend(r, {
                    wrap: t.wrap,
                    skin: t.skin,
                    outer: t.outer,
                    inner: t.inner,
                    current: t,
                    previous: h
                }), s = t.href, n) {
                    case "inline":
                    case "ajax":
                    case "html":
                        t.selector ? e = i("<div>").html(e).find(t.selector) : u(e) && (e.data(c) || e.data(c, i('<div class="' + c + '"></div>').insertAfter(e).hide()), e = e.show().detach(), t.wrap.bind("onReset", function() {
                            i(this).find(e).length && e.hide().replaceAll(e.data(c)).data(c, !1)
                        }));
                        break;
                    case "image":
                        e = t.tpl.image.replace(/\{href\}/g, s);
                        break;
                    case "swf":
                        e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + s + '"></param>', a = "", i.each(t.swf, function(t, i) {
                            e += '<param name="' + t + '" value="' + i + '"></param>', a += " " + t + '="' + i + '"'
                        }), e += '<embed src="' + s + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>"
                }
                u(e) && e.parent().is(t.inner) || t.inner.append(e), r.trigger("beforeShow"), t.inner.css("overflow", "yes" === o ? "scroll" : "no" === o ? "hidden" : o), r._setDimension(), r.reposition(), r.isOpen = !1, r.coming = null, r.bindEvents(), r.isOpened ? h.prevMethod && r.transitions[h.prevMethod]() : i(".fancybox-wrap").not(t.wrap).stop(!0).trigger("onReset").remove(), r.transitions[r.isOpened ? t.nextMethod : t.openMethod](), r._preloadImages()
            }
        },
        _setDimension: function() {
            var t, e, n, o, s, a, l, h, c, u, d, f, v, y, w, b = r.getViewport(),
                _ = 0,
                x = !1,
                C = !1,
                k = r.wrap,
                S = r.skin,
                T = r.inner,
                z = r.current,
                D = z.width,
                W = z.height,
                P = z.minWidth,
                E = z.minHeight,
                $ = z.maxWidth,
                I = z.maxHeight,
                M = z.scrolling,
                A = z.scrollOutside ? z.scrollbarWidth : 0,
                H = z.margin,
                O = m(H[1] + H[3]),
                L = m(H[0] + H[2]);
            if (k.add(S).add(T).width("auto").height("auto").removeClass("fancybox-tmp"), t = m(S.outerWidth(!0) - S.width()), e = m(S.outerHeight(!0) - S.height()), n = O + t, o = L + e, s = p(D) ? (b.w - n) * m(D) / 100 : D, a = p(W) ? (b.h - o) * m(W) / 100 : W, "iframe" === z.type) {
                if (y = z.content, z.autoHeight && y && 1 === y.data("ready")) try {
                    y[0].contentWindow.document.location && (T.width(s).height(9999), w = y.contents().find("body"), A && w.css("overflow-x", "hidden"), a = w.outerHeight(!0))
                } catch (t) {}
            } else(z.autoWidth || z.autoHeight) && (T.addClass("fancybox-tmp"), z.autoWidth || T.width(s), z.autoHeight || T.height(a), z.autoWidth && (s = T.width()), z.autoHeight && (a = T.height()), T.removeClass("fancybox-tmp"));
            if (D = m(s), W = m(a), c = s / a, P = m(p(P) ? m(P, "w") - n : P), $ = m(p($) ? m($, "w") - n : $), E = m(p(E) ? m(E, "h") - o : E), I = m(p(I) ? m(I, "h") - o : I), l = $, h = I, z.fitToView && ($ = Math.min(b.w - n, $), I = Math.min(b.h - o, I)), f = b.w - O, v = b.h - L, z.aspectRatio ? (D > $ && (D = $, W = m(D / c)), W > I && (W = I, D = m(W * c)), D < P && (D = P, W = m(D / c)), W < E && (W = E, D = m(W * c))) : (D = Math.max(P, Math.min(D, $)), z.autoHeight && "iframe" !== z.type && (T.width(D), W = T.height()), W = Math.max(E, Math.min(W, I))), z.fitToView)
                if (T.width(D).height(W), k.width(D + t), u = k.width(), d = k.height(), z.aspectRatio)
                    for (;
                        (u > f || d > v) && D > P && W > E && !(_++ > 19);) W = Math.max(E, Math.min(I, W - 10)), D = m(W * c), D < P && (D = P, W = m(D / c)), D > $ && (D = $, W = m(D / c)), T.width(D).height(W), k.width(D + t), u = k.width(), d = k.height();
                else D = Math.max(P, Math.min(D, D - (u - f))), W = Math.max(E, Math.min(W, W - (d - v)));
            A && "auto" === M && W < a && D + t + A < f && (D += A), T.width(D).height(W), k.width(D + t), u = k.width(), d = k.height(), x = (u > f || d > v) && D > P && W > E, C = z.aspectRatio ? D < l && W < h && D < s && W < a : (D < l || W < h) && (D < s || W < a), i.extend(z, {
                dim: {
                    width: g(u),
                    height: g(d)
                },
                origWidth: s,
                origHeight: a,
                canShrink: x,
                canExpand: C,
                wPadding: t,
                hPadding: e,
                wrapSpace: d - S.outerHeight(!0),
                skinSpace: S.height() - W
            }), !y && z.autoHeight && W > E && W < I && !C && T.height("auto")
        },
        _getPosition: function(t) {
            var e = r.current,
                i = r.getViewport(),
                n = e.margin,
                o = r.wrap.width() + n[1] + n[3],
                s = r.wrap.height() + n[0] + n[2],
                a = {
                    position: "absolute",
                    top: n[0],
                    left: n[3]
                };
            return e.autoCenter && e.fixed && !t && s <= i.h && o <= i.w ? a.position = "fixed" : e.locked || (a.top += i.y, a.left += i.x), a.top = g(Math.max(a.top, a.top + (i.h - s) * e.topRatio)), a.left = g(Math.max(a.left, a.left + (i.w - o) * e.leftRatio)), a
        },
        _afterZoomIn: function() {
            var t = r.current;
            t && (r.isOpen = r.isOpened = !0, r.wrap.css("overflow", "visible").addClass("fancybox-opened").hide().show(0), r.update(), (t.closeClick || t.nextClick && r.group.length > 1) && r.inner.css("cursor", "pointer").bind("click.fb", function(e) {
                i(e.target).is("a") || i(e.target).parent().is("a") || (e.preventDefault(), r[t.closeClick ? "close" : "next"]())
            }), t.closeBtn && i(t.tpl.closeBtn).appendTo(r.skin).bind("click.fb", function(t) {
                t.preventDefault(), r.close()
            }), t.arrows && r.group.length > 1 && ((t.loop || t.index > 0) && i(t.tpl.prev).appendTo(r.outer).bind("click.fb", r.prev), (t.loop || t.index < r.group.length - 1) && i(t.tpl.next).appendTo(r.outer).bind("click.fb", r.next)), r.trigger("afterShow"), t.loop || t.index !== t.group.length - 1 ? r.opts.autoPlay && !r.player.isActive && (r.opts.autoPlay = !1, r.play(!0)) : r.play(!1))
        },
        _afterZoomOut: function(t) {
            t = t || r.current, i(".fancybox-wrap").trigger("onReset").remove(), i.extend(r, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            }), r.trigger("afterClose", t)
        }
    }), r.transitions = {
        getOrigPosition: function() {
            var t = r.current,
                e = t.element,
                i = t.orig,
                n = {},
                o = 50,
                s = 50,
                a = t.hPadding,
                l = t.wPadding,
                h = r.getViewport();
            return !i && t.isDom && e.is(":visible") && (i = e.find("img:first"), i.length || (i = e)), u(i) ? (n = i.offset(), i.is("img") && (o = i.outerWidth(), s = i.outerHeight())) : (n.top = h.y + (h.h - s) * t.topRatio, n.left = h.x + (h.w - o) * t.leftRatio), ("fixed" === r.wrap.css("position") || t.locked) && (n.top -= h.y, n.left -= h.x), n = {
                top: g(n.top - a * t.topRatio),
                left: g(n.left - l * t.leftRatio),
                width: g(o + l),
                height: g(s + a)
            }
        },
        step: function(t, e) {
            var i, n, o, s = e.prop,
                a = r.current,
                l = a.wrapSpace,
                h = a.skinSpace;
            "width" !== s && "height" !== s || (i = e.end === e.start ? 1 : (t - e.start) / (e.end - e.start), r.isClosing && (i = 1 - i), n = "width" === s ? a.wPadding : a.hPadding, o = t - n, r.skin[s](m("width" === s ? o : o - l * i)), r.inner[s](m("width" === s ? o : o - l * i - h * i)))
        },
        zoomIn: function() {
            var t = r.current,
                e = t.pos,
                n = t.openEffect,
                o = "elastic" === n,
                s = i.extend({
                    opacity: 1
                }, e);
            delete s.position, o ? (e = this.getOrigPosition(), t.openOpacity && (e.opacity = .1)) : "fade" === n && (e.opacity = .1), r.wrap.css(e).animate(s, {
                duration: "none" === n ? 0 : t.openSpeed,
                easing: t.openEasing,
                step: o ? this.step : null,
                complete: r._afterZoomIn
            })
        },
        zoomOut: function() {
            var t = r.current,
                e = t.closeEffect,
                i = "elastic" === e,
                n = {
                    opacity: .1
                };
            i && (n = this.getOrigPosition(), t.closeOpacity && (n.opacity = .1)), r.wrap.animate(n, {
                duration: "none" === e ? 0 : t.closeSpeed,
                easing: t.closeEasing,
                step: i ? this.step : null,
                complete: r._afterZoomOut
            })
        },
        changeIn: function() {
            var t, e = r.current,
                i = e.nextEffect,
                n = e.pos,
                o = {
                    opacity: 1
                },
                s = r.direction,
                a = 200;
            n.opacity = .1, "elastic" === i && (t = "down" === s || "up" === s ? "top" : "left", "down" === s || "right" === s ? (n[t] = g(m(n[t]) - a), o[t] = "+=" + a + "px") : (n[t] = g(m(n[t]) + a), o[t] = "-=" + a + "px")), "none" === i ? r._afterZoomIn() : r.wrap.css(n).animate(o, {
                duration: e.nextSpeed,
                easing: e.nextEasing,
                complete: r._afterZoomIn
            })
        },
        changeOut: function() {
            var t = r.previous,
                e = t.prevEffect,
                n = {
                    opacity: .1
                },
                o = r.direction;
            "elastic" === e && (n["down" === o || "up" === o ? "top" : "left"] = ("up" === o || "left" === o ? "-" : "+") + "=200px"), t.wrap.animate(n, {
                duration: "none" === e ? 0 : t.prevSpeed,
                easing: t.prevEasing,
                complete: function() {
                    i(this).trigger("onReset").remove()
                }
            })
        }
    }, r.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !c,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: i("html"),
        create: function(t) {
            var e;
            t = i.extend({}, this.defaults, t), this.overlay && this.close(), e = r.coming ? r.coming.parent : t.parent, this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(e && e.length ? e : "body"), this.fixed = !1, t.fixed && r.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function(t) {
            var e = this;
            t = i.extend({}, this.defaults, t), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(t), this.fixed || (s.bind("resize.overlay", i.proxy(this.update, this)), this.update()), t.closeClick && this.overlay.bind("click.overlay", function(t) {
                if (i(t.target).hasClass("fancybox-overlay")) return r.isActive ? r.close() : e.close(), !1
            }), this.overlay.css(t.css).show()
        },
        close: function() {
            s.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (i(".fancybox-margin").removeClass("fancybox-margin"), this.el.removeClass("fancybox-lock"), s.scrollTop(this.scrollV).scrollLeft(this.scrollH)), i(".fancybox-overlay").remove().hide(), i.extend(this, {
                overlay: null,
                fixed: !1
            })
        },
        update: function() {
            var t, i = "100%";
            this.overlay.width(i).height("100%"), l ? (t = Math.max(e.documentElement.offsetWidth, e.body.offsetWidth), a.width() > t && (i = a.width())) : a.width() > s.width() && (i = a.width()), this.overlay.width(i).height(a.height())
        },
        onReady: function(t, e) {
            var n = this.overlay;
            i(".fancybox-overlay").stop(!0, !0), n || this.create(t), t.locked && this.fixed && e.fixed && (e.locked = this.overlay.append(e.wrap), e.fixed = !1), !0 === t.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(t, e) {
            e.locked && !this.el.hasClass("fancybox-lock") && (!1 !== this.fixPosition && i("*:not(object)").filter(function() {
                return "fixed" === i(this).css("position") && !i(this).hasClass("fancybox-overlay") && !i(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin"), this.scrollV = s.scrollTop(), this.scrollH = s.scrollLeft(), this.el.addClass("fancybox-lock"), s.scrollTop(this.scrollV).scrollLeft(this.scrollH)), this.open(t)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(t) {
            this.overlay && !r.coming && this.overlay.fadeOut(t.speedOut, i.proxy(this.close, this))
        }
    }, r.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(t) {
            var e, n, o = r.current,
                s = o.title,
                a = t.type;
            if (i.isFunction(s) && (s = s.call(o.element, o)), d(s) && "" !== i.trim(s)) {
                switch (e = i('<div class="fancybox-title fancybox-title-' + a + '-wrap">' + s + "</div>"), a) {
                    case "inside":
                        n = r.skin;
                        break;
                    case "outside":
                        n = r.wrap;
                        break;
                    case "over":
                        n = r.inner;
                        break;
                    default:
                        n = r.skin, e.appendTo("body"), l && e.width(e.width()), e.wrapInner('<span class="child"></span>'), r.current.margin[2] += Math.abs(m(e.css("margin-bottom")))
                }
                e["top" === t.position ? "prependTo" : "appendTo"](n)
            }
        }
    }, i.fn.fancybox = function(t) {
        var e, n = i(this),
            o = this.selector || "",
            s = function(s) {
                var a, l, h = i(this).blur(),
                    c = e;
                s.ctrlKey || s.altKey || s.shiftKey || s.metaKey || h.is(".fancybox-wrap") || (a = t.groupAttr || "data-fancybox-group", l = h.attr(a), l || (a = "rel", l = h.get(0)[a]), l && "" !== l && "nofollow" !== l && (h = o.length ? i(o) : n, h = h.filter("[" + a + '="' + l + '"]'), c = h.index(this)), t.index = c, !1 !== r.open(h, t) && s.preventDefault())
            };
        return t = t || {}, e = t.index || 0, o && !1 !== t.live ? a.undelegate(o, "click.fb-start").delegate(o + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", s) : n.unbind("click.fb-start").bind("click.fb-start", s), this.filter("[data-fancybox-start=1]").trigger("click"), this
    }, a.ready(function() {
        var e, s;
        i.scrollbarWidth === n && (i.scrollbarWidth = function() {
            var t = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                e = t.children(),
                n = e.innerWidth() - e.height(99).innerWidth();
            return t.remove(), n
        }), i.support.fixedPosition === n && (i.support.fixedPosition = function() {
            var t = i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                e = 20 === t[0].offsetTop || 15 === t[0].offsetTop;
            return t.remove(), e
        }()), i.extend(r.defaults, {
            scrollbarWidth: i.scrollbarWidth(),
            fixed: i.support.fixedPosition,
            parent: i("body")
        }), e = i(t).width(), o.addClass("fancybox-lock-test"), s = i(t).width(), o.removeClass("fancybox-lock-test"), i("<style type='text/css'>.fancybox-margin{margin-right:" + (s - e) + "px;}</style>").appendTo("head")
    })
}(window, document, jQuery),
function(t) {
    "use strict";
    var e = function(e, i, n) {
        return n = n || "", "object" === t.type(n) && (n = t.param(n, !0)), t.each(i, function(t, i) {
            e = e.replace("$" + t, i || "")
        }), n.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + n), e
    };
    t.fancybox.helpers.media = {
        defaults: {
            youtube: {
                matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: "opaque",
                    enablejsapi: 1,
                    ps: "docs",
                    controls: 1
                },
                type: "iframe",
                url: "//www.youtube.com/embed/$3"
            },
            vimeo: {
                matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1
                },
                type: "iframe",
                url: "//player.vimeo.com/video/$1"
            },
            metacafe: {
                matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                params: {
                    autoPlay: "yes"
                },
                type: "swf",
                url: function(e, i, n) {
                    return n.swf.flashVars = "playerVars=" + t.param(i, !0), "//www.metacafe.com/fplayer/" + e[1] + "/.swf"
                }
            },
            dailymotion: {
                matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
                params: {
                    additionalInfos: 0,
                    autoStart: 1
                },
                type: "swf",
                url: "//www.dailymotion.com/swf/video/$1"
            },
            twitvid: {
                matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                params: {
                    autoplay: 0
                },
                type: "iframe",
                url: "//www.twitvid.com/embed.php?guid=$1"
            },
            twitpic: {
                matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                type: "image",
                url: "//twitpic.com/show/full/$1/"
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: "image",
                url: "//$1/p/$2/media/?size=l"
            },
            google_maps: {
                matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                type: "iframe",
                url: function(t) {
                    return "//maps.google." + t[1] + "/" + t[3] + t[4] + "&output=" + (t[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
                }
            }
        },
        beforeLoad: function(i, n) {
            var o, s, a, r, l = n.href || "",
                h = !1;
            for (o in i)
                if (i.hasOwnProperty(o) && (s = i[o], a = l.match(s.matcher))) {
                    h = s.type, r = t.extend(!0, {}, s.params, n[o] || (t.isPlainObject(i[o]) ? i[o].params : null)), l = "function" === t.type(s.url) ? s.url.call(this, a, r, n) : e(s.url, a, r);
                    break
                } h && (n.href = l, n.type = h, n.autoHeight = !1)
        }
    }
}(jQuery),
function() {
    "use strict";

    function t(n) {
        if (!n) throw new Error("No options passed to Waypoint constructor");
        if (!n.element) throw new Error("No element option passed to Waypoint constructor");
        if (!n.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, n), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = n.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
    }
    var e = 0,
        i = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, t.prototype.disable = function() {
        return this.enabled = !1, this
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function() {
        return this.group.next(this)
    }, t.prototype.previous = function() {
        return this.group.previous(this)
    }, t.invokeAll = function(t) {
        var e = [];
        for (var n in i) e.push(i[n]);
        for (var o = 0, s = e.length; s > o; o++) e[o][t]()
    }, t.destroyAll = function() {
        t.invokeAll("destroy")
    }, t.disableAll = function() {
        t.invokeAll("disable")
    }, t.enableAll = function() {
        t.invokeAll("enable")
    }, t.refreshAll = function() {
        t.Context.refreshAll()
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function() {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = o.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, n[t.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var i = 0,
        n = {},
        o = window.Waypoint,
        s = window.onload;
    e.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"), delete n[this.key])
    }, e.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, o.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || o.isTouch) && (e.didScroll = !0, o.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function() {
        o.Context.refreshAll()
    }, e.prototype.handleScroll = function() {
        var t = {},
            e = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var i in e) {
            var n = e[i],
                o = n.newScroll > n.oldScroll,
                s = o ? n.forward : n.backward;
            for (var a in this.waypoints[i]) {
                var r = this.waypoints[i][a],
                    l = n.oldScroll < r.triggerPoint,
                    h = n.newScroll >= r.triggerPoint,
                    c = l && h,
                    u = !l && !h;
                (c || u) && (r.queueTrigger(s), t[r.group.id] = r.group)
            }
        }
        for (var d in t) t[d].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, e.prototype.innerHeight = function() {
        return this.element == this.element.window ? o.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function() {
        return this.element == this.element.window ? o.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var n = 0, o = t.length; o > n; n++) t[n].destroy()
    }, e.prototype.refresh = function() {
        var t, e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            n = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var s in t) {
            var a = t[s];
            for (var r in this.waypoints[s]) {
                var l, h, c, u, d, p = this.waypoints[s][r],
                    f = p.options.offset,
                    m = p.triggerPoint,
                    g = 0,
                    v = null == m;
                p.element !== p.element.window && (g = p.adapter.offset()[a.offsetProp]), "function" == typeof f ? f = f.apply(p) : "string" == typeof f && (f = parseFloat(f), p.options.offset.indexOf("%") > -1 && (f = Math.ceil(a.contextDimension * f / 100))), l = a.contextScroll - a.contextOffset, p.triggerPoint = g + l - f, h = m < a.oldScroll, c = p.triggerPoint >= a.oldScroll, u = h && c, d = !h && !c, !v && u ? (p.queueTrigger(a.backward), n[p.group.id] = p.group) : !v && d ? (p.queueTrigger(a.forward), n[p.group.id] = p.group) : v && a.oldScroll >= p.triggerPoint && (p.queueTrigger(a.forward), n[p.group.id] = p.group)
            }
        }
        return o.requestAnimationFrame(function() {
            for (var t in n) n[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function() {
        for (var t in n) n[t].refresh()
    }, e.findByElement = function(t) {
        return n[t.waypointContextKey]
    }, window.onload = function() {
        s && s(), e.refreshAll()
    }, o.requestAnimationFrame = function(e) {
        (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t).call(window, e)
    }, o.Context = e
}(),
function() {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), n[this.axis][this.name] = this
    }
    var n = {
            vertical: {},
            horizontal: {}
        },
        o = window.Waypoint;
    i.prototype.add = function(t) {
        this.waypoints.push(t)
    }, i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var n = this.triggerQueues[i],
                o = "up" === i || "left" === i;
            n.sort(o ? e : t);
            for (var s = 0, a = n.length; a > s; s += 1) {
                var r = n[s];
                (r.options.continuous || s === n.length - 1) && r.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = o.Adapter.inArray(e, this.waypoints);
        return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = o.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, i.prototype.remove = function(t) {
        var e = o.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, i.prototype.first = function() {
        return this.waypoints[0]
    }, i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function(t) {
        return n[t.axis][t.name] || new i(t)
    }, o.Group = i
}(),
function() {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery,
        i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
        t.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function(i, n) {
        t[n] = e[n]
    }), i.adapters.push({
        name: "jquery",
        Adapter: t
    }), i.Adapter = t
}(),
function() {
    "use strict";

    function t(t) {
        return function() {
            var i = [],
                n = arguments[0];
            return t.isFunction(arguments[0]) && (n = t.extend({}, arguments[1]), n.handler = arguments[0]), this.each(function() {
                var o = t.extend({}, n, {
                    element: this
                });
                "string" == typeof o.context && (o.context = t(this).closest(o.context)[0]), i.push(new e(o))
            }), i
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}(),
function(t) {
    "use strict";
    t.fn.countUp = function(e) {
        var i = t.extend({
            time: 2e3,
            delay: 10
        }, e);
        return this.each(function() {
            var e = t(this),
                n = i,
                o = function() {
                    e.data("counterupTo") || e.data("counterupTo", e.text());
                    var t = parseInt(e.data("counter-time")) > 0 ? parseInt(e.data("counter-time")) : n.time,
                        i = parseInt(e.data("counter-delay")) > 0 ? parseInt(e.data("counter-delay")) : n.delay,
                        o = t / i,
                        s = e.data("counterupTo"),
                        a = [s],
                        r = /[0-9]+,[0-9]+/.test(s);
                    s = s.replace(/,/g, "");
                    for (var l = (/^[0-9]+$/.test(s), /^[0-9]+\.[0-9]+$/.test(s)), h = l ? (s.split(".")[1] || []).length : 0, c = o; c >= 1; c--) {
                        var u = parseInt(Math.round(s / o * c));
                        if (l && (u = parseFloat(s / o * c).toFixed(h)), r)
                            for (;
                                /(\d+)(\d{3})/.test(u.toString());) u = u.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                        a.unshift(u)
                    }
                    e.data("counterup-nums", a), e.text("0");
                    var d = function() {
                        e.text(e.data("counterup-nums").shift()), e.data("counterup-nums").length ? setTimeout(e.data("counterup-func"), i) : (e.data("counterup-nums"), e.data("counterup-nums", null), e.data("counterup-func", null))
                    };
                    e.data("counterup-func", d), setTimeout(e.data("counterup-func"), i)
                };
            e.waypoint(o, {
                offset: "100%",
                triggerOnce: !0
            })
        })
    }
}(jQuery), headerH = $("#header").outerHeight(), mHeaderH = $("#mob-header").outerHeight(), winW = $(window).width(), winTopPos = $(window).scrollTop(), $(".co-guest").click(function() {
        $(".guest-co-box").show()
    }),
    function(t) {
        t.fn.countdown = function(e, i) {
            function n() {
                var t = new Date(o.date),
                    e = a(),
                    n = t - e;
                if (0 > n) return clearInterval(r), void(i && "function" == typeof i && i());
                var l = 1e3,
                    h = 60 * l,
                    c = 60 * h,
                    u = 24 * c,
                    d = Math.floor(n / u),
                    p = Math.floor(n % u / c),
                    f = Math.floor(n % c / h),
                    m = Math.floor(n % h / l),
                    g = 1 === d ? o.day : o.days,
                    v = 1 === p ? o.hour : o.hours,
                    y = 1 === f ? o.minute : o.minutes,
                    w = 1 === m ? o.second : o.seconds;
                d = String(d).length >= 2 ? d : "0" + d, p = String(p).length >= 2 ? p : "0" + p, f = String(f).length >= 2 ? f : "0" + f, m = String(m).length >= 2 ? m : "0" + m, s.find(".days").text(d), s.find(".hours").text(p), s.find(".minutes").text(f), s.find(".seconds").text(m), s.find(".days_text").text(g), s.find(".hours_text").text(v), s.find(".minutes_text").text(y), s.find(".seconds_text").text(w)
            }
            var o = t.extend({
                date: null,
                offset: null,
                day: "Day",
                days: "Days",
                hour: "Hrs",
                hours: "Hrs",
                minute: "Min",
                minutes: "Min",
                second: "Sec",
                seconds: "Sec"
            }, e);
            o.date || t.error("Date is not defined."), Date.parse(o.date) || t.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");
            var s = this,
                a = function() {
                    var t = new Date,
                        e = t.getTime() + 6e4 * t.getTimezoneOffset();
                    return new Date(e + 36e5 * o.offset)
                },
                r = setInterval(n, 1e3)
        }
    }(jQuery), "function" != typeof Object.create && (Object.create = function(t) {
        function e() {}
        return e.prototype = t, new e
    }),
    function(t) {
        var e = {
            init: function(e, i) {
                var n = this;
                n.elem = i, n.$elem = t(i), n.imageSrc = n.$elem.data("zoom-image") ? n.$elem.data("zoom-image") : n.$elem.attr("src"), n.options = t.extend({}, t.fn.elevateZoom.options, e), n.options.tint && (n.options.lensColour = "none", n.options.lensOpacity = "1"), "inner" == n.options.zoomType && (n.options.showLens = !1), n.$elem.parent().removeAttr("title").removeAttr("alt"), n.zoomImage = n.imageSrc, n.refresh(1), t("#" + n.options.gallery + " a").click(function(e) {
                    return n.options.galleryActiveClass && (t("#" + n.options.gallery + " a").removeClass(n.options.galleryActiveClass), t(this).addClass(n.options.galleryActiveClass)), e.preventDefault(), t(this).data("zoom-image") ? n.zoomImagePre = t(this).data("zoom-image") : n.zoomImagePre = t(this).data("image"), n.swaptheimage(t(this).data("image"), n.zoomImagePre), !1
                })
            },
            refresh: function(t) {
                var e = this;
                setTimeout(function() {
                    e.fetch(e.imageSrc)
                }, t || e.options.refresh)
            },
            fetch: function(t) {
                var e = this,
                    i = new Image;
                i.onload = function() {
                    e.largeWidth = i.width, e.largeHeight = i.height, e.startZoom(), e.currentImage = e.imageSrc, e.options.onZoomedImageLoaded(e.$elem)
                }, i.src = t
            },
            startZoom: function() {
                var e = this;
                if (e.nzWidth = e.$elem.width(), e.nzHeight = e.$elem.height(), e.isWindowActive = !1, e.isLensActive = !1, e.isTintActive = !1, e.overWindow = !1, e.options.imageCrossfade && (e.zoomWrap = e.$elem.wrap('<div style="height:' + e.nzHeight + "px;width:" + e.nzWidth + 'px;" class="zoomWrapper" />'), e.$elem.css("position", "absolute")), e.zoomLock = 1, e.scrollingLock = !1, e.changeBgSize = !1, e.currentZoomLevel = e.options.zoomLevel, e.nzOffset = e.$elem.offset(), e.widthRatio = e.largeWidth / e.currentZoomLevel / e.nzWidth, e.heightRatio = e.largeHeight / e.currentZoomLevel / e.nzHeight, "window" == e.options.zoomType && (e.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " + String(e.options.zoomWindowBgColour) + ";width: " + String(e.options.zoomWindowWidth) + "px;height: " + String(e.options.zoomWindowHeight) + "px;float: left;background-size: " + e.largeWidth / e.currentZoomLevel + "px " + e.largeHeight / e.currentZoomLevel + "px;display: none;z-index:100;border: " + String(e.options.borderSize) + "px solid " + e.options.borderColour + ";background-repeat: no-repeat;position: absolute;"), "inner" == e.options.zoomType) {
                    var i = e.$elem.css("border-left-width");
                    e.zoomWindowStyle = "overflow: hidden;margin-left: " + String(i) + ";margin-top: " + String(i) + ";background-position: 0px 0px;width: " + String(e.nzWidth) + "px;height: " + String(e.nzHeight) + "px;px;float: left;display: none;cursor:" + e.options.cursor + ";px solid " + e.options.borderColour + ";background-repeat: no-repeat;position: absolute;"
                }
                "window" == e.options.zoomType && (e.nzHeight < e.options.zoomWindowWidth / e.widthRatio ? lensHeight = e.nzHeight : lensHeight = String(e.options.zoomWindowHeight / e.heightRatio), e.largeWidth < e.options.zoomWindowWidth ? lensWidth = e.nzWidth : lensWidth = e.options.zoomWindowWidth / e.widthRatio, e.lensStyle = "background-position: 0px 0px;width: " + String(e.options.zoomWindowWidth / e.widthRatio) + "px;height: " + String(e.options.zoomWindowHeight / e.heightRatio) + "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" + e.options.lensOpacity + ";filter: alpha(opacity = " + 100 * e.options.lensOpacity + "); zoom:1;width:" + lensWidth + "px;height:" + lensHeight + "px;background-color:" + e.options.lensColour + ";cursor:" + e.options.cursor + ";border: " + e.options.lensBorderSize + "px solid " + e.options.lensBorderColour + ";background-repeat: no-repeat;position: absolute;"), e.tintStyle = "display: block;position: absolute;background-color: " + e.options.tintColour + ";filter:alpha(opacity=0);opacity: 0;width: " + e.nzWidth + "px;height: " + e.nzHeight + "px;", e.lensRound = "", "lens" == e.options.zoomType && (e.lensStyle = "background-position: 0px 0px;float: left;display: none;border: " + String(e.options.borderSize) + "px solid " + e.options.borderColour + ";width:" + String(e.options.lensSize) + "px;height:" + String(e.options.lensSize) + "px;background-repeat: no-repeat;position: absolute;"), "round" == e.options.lensShape && (e.lensRound = "border-top-left-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;border-top-right-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;border-bottom-left-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;border-bottom-right-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;"), e.zoomContainer = t('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + e.nzOffset.left + "px;top:" + e.nzOffset.top + "px;height:" + e.nzHeight + "px;width:" + e.nzWidth + 'px;"></div>'), t("body").append(e.zoomContainer), e.options.containLensZoom && "lens" == e.options.zoomType && e.zoomContainer.css("overflow", "hidden"), "inner" != e.options.zoomType && (e.zoomLens = t("<div class='zoomLens' style='" + e.lensStyle + e.lensRound + "'>&nbsp;</div>").appendTo(e.zoomContainer).click(function() {
                    e.$elem.trigger("click")
                }), e.options.tint && (e.tintContainer = t("<div/>").addClass("tintContainer"), e.zoomTint = t("<div class='zoomTint' style='" + e.tintStyle + "'></div>"), e.zoomLens.wrap(e.tintContainer), e.zoomTintcss = e.zoomLens.after(e.zoomTint), e.zoomTintImage = t('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + e.nzWidth + "px; height: " + e.nzHeight + 'px;" src="' + e.imageSrc + '">').appendTo(e.zoomLens).click(function() {
                    e.$elem.trigger("click")
                }))), isNaN(e.options.zoomWindowPosition) ? e.zoomWindow = t("<div style='z-index:999;left:" + e.windowOffsetLeft + "px;top:" + e.windowOffsetTop + "px;" + e.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function() {
                    e.$elem.trigger("click")
                }) : e.zoomWindow = t("<div style='z-index:999;left:" + e.windowOffsetLeft + "px;top:" + e.windowOffsetTop + "px;" + e.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo(e.zoomContainer).click(function() {
                    e.$elem.trigger("click")
                }), e.zoomWindowContainer = t("<div/>").addClass("zoomWindowContainer").css("width", e.options.zoomWindowWidth), e.zoomWindow.wrap(e.zoomWindowContainer), "lens" == e.options.zoomType && e.zoomLens.css({
                    backgroundImage: "url('" + e.imageSrc + "')"
                }), "window" == e.options.zoomType && e.zoomWindow.css({
                    backgroundImage: "url('" + e.imageSrc + "')"
                }), "inner" == e.options.zoomType && e.zoomWindow.css({
                    backgroundImage: "url('" + e.imageSrc + "')"
                }), e.$elem.bind("touchmove", function(t) {
                    t.preventDefault();
                    var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0];
                    e.setPosition(i)
                }), e.zoomContainer.bind("touchmove", function(t) {
                    "inner" == e.options.zoomType && e.showHideWindow("show"), t.preventDefault();
                    var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0];
                    e.setPosition(i)
                }), e.zoomContainer.bind("touchend", function() {
                    e.showHideWindow("hide"), e.options.showLens && e.showHideLens("hide"), e.options.tint && "inner" != e.options.zoomType && e.showHideTint("hide")
                }), e.$elem.bind("touchend", function() {
                    e.showHideWindow("hide"), e.options.showLens && e.showHideLens("hide"), e.options.tint && "inner" != e.options.zoomType && e.showHideTint("hide")
                }), e.options.showLens && (e.zoomLens.bind("touchmove", function(t) {
                    t.preventDefault();
                    var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0];
                    e.setPosition(i)
                }), e.zoomLens.bind("touchend", function() {
                    e.showHideWindow("hide"), e.options.showLens && e.showHideLens("hide"), e.options.tint && "inner" != e.options.zoomType && e.showHideTint("hide")
                })), e.$elem.bind("mousemove", function(t) {
                    0 == e.overWindow && e.setElements("show"), e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
                }), e.zoomContainer.bind("mousemove", function(t) {
                    0 == e.overWindow && e.setElements("show"), e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
                }), "inner" != e.options.zoomType && e.zoomLens.bind("mousemove", function(t) {
                    e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
                }), e.options.tint && "inner" != e.options.zoomType && e.zoomTint.bind("mousemove", function(t) {
                    e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
                }), "inner" == e.options.zoomType && e.zoomWindow.bind("mousemove", function(t) {
                    e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
                }), e.zoomContainer.add(e.$elem).mouseenter(function() {
                    0 == e.overWindow && e.setElements("show")
                }).mouseleave(function() {
                    e.scrollLock || (e.setElements("hide"), e.options.onDestroy(e.$elem))
                }), "inner" != e.options.zoomType && e.zoomWindow.mouseenter(function() {
                    e.overWindow = !0, e.setElements("hide")
                }).mouseleave(function() {
                    e.overWindow = !1
                }), e.options.zoomLevel, e.options.minZoomLevel ? e.minZoomLevel = e.options.minZoomLevel : e.minZoomLevel = 2 * e.options.scrollZoomIncrement, e.options.scrollZoom && e.zoomContainer.add(e.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function(i) {
                    e.scrollLock = !0, clearTimeout(t.data(this, "timer")), t.data(this, "timer", setTimeout(function() {
                        e.scrollLock = !1
                    }, 250));
                    var n = i.originalEvent.wheelDelta || -1 * i.originalEvent.detail;
                    return i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault(), n / 120 > 0 ? e.currentZoomLevel >= e.minZoomLevel && e.changeZoomLevel(e.currentZoomLevel - e.options.scrollZoomIncrement) : e.options.maxZoomLevel ? e.currentZoomLevel <= e.options.maxZoomLevel && e.changeZoomLevel(parseFloat(e.currentZoomLevel) + e.options.scrollZoomIncrement) : e.changeZoomLevel(parseFloat(e.currentZoomLevel) + e.options.scrollZoomIncrement), !1
                })
            },
            setElements: function(t) {
                var e = this;
                if (!e.options.zoomEnabled) return !1;
                "show" == t && e.isWindowSet && ("inner" == e.options.zoomType && e.showHideWindow("show"), "window" == e.options.zoomType && e.showHideWindow("show"), e.options.showLens && e.showHideLens("show"), e.options.tint && "inner" != e.options.zoomType && e.showHideTint("show")), "hide" == t && ("window" == e.options.zoomType && e.showHideWindow("hide"), e.options.tint || e.showHideWindow("hide"), e.options.showLens && e.showHideLens("hide"), e.options.tint && e.showHideTint("hide"))
            },
            setPosition: function(t) {
                var e = this;
                return !!e.options.zoomEnabled && (e.nzHeight = e.$elem.height(), e.nzWidth = e.$elem.width(), e.nzOffset = e.$elem.offset(), e.options.tint && "inner" != e.options.zoomType && (e.zoomTint.css({
                    top: 0
                }), e.zoomTint.css({
                    left: 0
                })), e.options.responsive && !e.options.scrollZoom && e.options.showLens && (e.nzHeight < e.options.zoomWindowWidth / e.widthRatio ? lensHeight = e.nzHeight : lensHeight = String(e.options.zoomWindowHeight / e.heightRatio), e.largeWidth < e.options.zoomWindowWidth ? lensWidth = e.nzWidth : lensWidth = e.options.zoomWindowWidth / e.widthRatio, e.widthRatio = e.largeWidth / e.nzWidth, e.heightRatio = e.largeHeight / e.nzHeight, "lens" != e.options.zoomType && (e.nzHeight < e.options.zoomWindowWidth / e.widthRatio ? lensHeight = e.nzHeight : lensHeight = String(e.options.zoomWindowHeight / e.heightRatio), e.nzWidth < e.options.zoomWindowHeight / e.heightRatio ? lensWidth = e.nzWidth : lensWidth = String(e.options.zoomWindowWidth / e.widthRatio), e.zoomLens.css("width", lensWidth), e.zoomLens.css("height", lensHeight), e.options.tint && (e.zoomTintImage.css("width", e.nzWidth), e.zoomTintImage.css("height", e.nzHeight))), "lens" == e.options.zoomType && e.zoomLens.css({
                    width: String(e.options.lensSize) + "px",
                    height: String(e.options.lensSize) + "px"
                })), e.zoomContainer.css({
                    top: e.nzOffset.top
                }), e.zoomContainer.css({
                    left: e.nzOffset.left
                }), e.mouseLeft = parseInt(t.pageX - e.nzOffset.left), e.mouseTop = parseInt(t.pageY - e.nzOffset.top), "window" == e.options.zoomType && (e.Etoppos = e.mouseTop < e.zoomLens.height() / 2, e.Eboppos = e.mouseTop > e.nzHeight - e.zoomLens.height() / 2 - 2 * e.options.lensBorderSize, e.Eloppos = e.mouseLeft < 0 + e.zoomLens.width() / 2, e.Eroppos = e.mouseLeft > e.nzWidth - e.zoomLens.width() / 2 - 2 * e.options.lensBorderSize), "inner" == e.options.zoomType && (e.Etoppos = e.mouseTop < e.nzHeight / 2 / e.heightRatio, e.Eboppos = e.mouseTop > e.nzHeight - e.nzHeight / 2 / e.heightRatio, e.Eloppos = e.mouseLeft < 0 + e.nzWidth / 2 / e.widthRatio, e.Eroppos = e.mouseLeft > e.nzWidth - e.nzWidth / 2 / e.widthRatio - 2 * e.options.lensBorderSize), e.mouseLeft < 0 || e.mouseTop < 0 || e.mouseLeft > e.nzWidth || e.mouseTop > e.nzHeight ? void e.setElements("hide") : (e.options.showLens && (e.lensLeftPos = String(Math.floor(e.mouseLeft - e.zoomLens.width() / 2)), e.lensTopPos = String(Math.floor(e.mouseTop - e.zoomLens.height() / 2))), e.Etoppos && (e.lensTopPos = 0), e.Eloppos && (e.windowLeftPos = 0, e.lensLeftPos = 0, e.tintpos = 0), "window" == e.options.zoomType && (e.Eboppos && (e.lensTopPos = Math.max(e.nzHeight - e.zoomLens.height() - 2 * e.options.lensBorderSize, 0)), e.Eroppos && (e.lensLeftPos = e.nzWidth - e.zoomLens.width() - 2 * e.options.lensBorderSize)), "inner" == e.options.zoomType && (e.Eboppos && (e.lensTopPos = Math.max(e.nzHeight - 2 * e.options.lensBorderSize, 0)), e.Eroppos && (e.lensLeftPos = e.nzWidth - e.nzWidth - 2 * e.options.lensBorderSize)), "lens" == e.options.zoomType && (e.windowLeftPos = String(-1 * ((t.pageX - e.nzOffset.left) * e.widthRatio - e.zoomLens.width() / 2)), e.windowTopPos = String(-1 * ((t.pageY - e.nzOffset.top) * e.heightRatio - e.zoomLens.height() / 2)), e.zoomLens.css({
                    backgroundPosition: e.windowLeftPos + "px " + e.windowTopPos + "px"
                }), e.changeBgSize && (e.nzHeight > e.nzWidth ? ("lens" == e.options.zoomType && e.zoomLens.css({
                    "background-size": e.largeWidth / e.newvalueheight + "px " + e.largeHeight / e.newvalueheight + "px"
                }), e.zoomWindow.css({
                    "background-size": e.largeWidth / e.newvalueheight + "px " + e.largeHeight / e.newvalueheight + "px"
                })) : ("lens" == e.options.zoomType && e.zoomLens.css({
                    "background-size": e.largeWidth / e.newvaluewidth + "px " + e.largeHeight / e.newvaluewidth + "px"
                }), e.zoomWindow.css({
                    "background-size": e.largeWidth / e.newvaluewidth + "px " + e.largeHeight / e.newvaluewidth + "px"
                })), e.changeBgSize = !1), e.setWindowPostition(t)), e.options.tint && "inner" != e.options.zoomType && e.setTintPosition(t), "window" == e.options.zoomType && e.setWindowPostition(t), "inner" == e.options.zoomType && e.setWindowPostition(t), e.options.showLens && (e.fullwidth && "lens" != e.options.zoomType && (e.lensLeftPos = 0), e.zoomLens.css({
                    left: e.lensLeftPos + "px",
                    top: e.lensTopPos + "px"
                })), void 0))
            },
            showHideWindow: function(t) {
                var e = this;
                "show" == t && (e.isWindowActive || (e.options.zoomWindowFadeIn ? e.zoomWindow.stop(!0, !0, !1).fadeIn(e.options.zoomWindowFadeIn) : e.zoomWindow.show(), e.isWindowActive = !0)), "hide" == t && e.isWindowActive && (e.options.zoomWindowFadeOut ? e.zoomWindow.stop(!0, !0).fadeOut(e.options.zoomWindowFadeOut, function() {
                    e.loop && (clearInterval(e.loop), e.loop = !1)
                }) : e.zoomWindow.hide(), e.isWindowActive = !1)
            },
            showHideLens: function(t) {
                var e = this;
                "show" == t && (e.isLensActive || (e.options.lensFadeIn ? e.zoomLens.stop(!0, !0, !1).fadeIn(e.options.lensFadeIn) : e.zoomLens.show(), e.isLensActive = !0)), "hide" == t && e.isLensActive && (e.options.lensFadeOut ? e.zoomLens.stop(!0, !0).fadeOut(e.options.lensFadeOut) : e.zoomLens.hide(), e.isLensActive = !1)
            },
            showHideTint: function(t) {
                var e = this;
                "show" == t && (e.isTintActive || (e.options.zoomTintFadeIn ? e.zoomTint.css({
                    opacity: e.options.tintOpacity
                }).animate().stop(!0, !0).fadeIn("slow") : (e.zoomTint.css({
                    opacity: e.options.tintOpacity
                }).animate(), e.zoomTint.show()), e.isTintActive = !0)), "hide" == t && e.isTintActive && (e.options.zoomTintFadeOut ? e.zoomTint.stop(!0, !0).fadeOut(e.options.zoomTintFadeOut) : e.zoomTint.hide(), e.isTintActive = !1)
            },
            setLensPostition: function() {},
            setWindowPostition: function(e) {
                var i = this;
                if (isNaN(i.options.zoomWindowPosition)) i.externalContainer = t("#" + i.options.zoomWindowPosition), i.externalContainerWidth = i.externalContainer.width(), i.externalContainerHeight = i.externalContainer.height(), i.externalContainerOffset = i.externalContainer.offset(), i.windowOffsetTop = i.externalContainerOffset.top, i.windowOffsetLeft = i.externalContainerOffset.left;
                else switch (i.options.zoomWindowPosition) {
                    case 1:
                        i.windowOffsetTop = i.options.zoomWindowOffety, i.windowOffsetLeft = +i.nzWidth;
                        break;
                    case 2:
                        i.options.zoomWindowHeight > i.nzHeight && (i.windowOffsetTop = -1 * (i.options.zoomWindowHeight / 2 - i.nzHeight / 2), i.windowOffsetLeft = i.nzWidth);
                        break;
                    case 3:
                        i.windowOffsetTop = i.nzHeight - i.zoomWindow.height() - 2 * i.options.borderSize, i.windowOffsetLeft = i.nzWidth;
                        break;
                    case 4:
                        i.windowOffsetTop = i.nzHeight, i.windowOffsetLeft = i.nzWidth;
                        break;
                    case 5:
                        i.windowOffsetTop = i.nzHeight, i.windowOffsetLeft = i.nzWidth - i.zoomWindow.width() - 2 * i.options.borderSize;
                        break;
                    case 6:
                        i.options.zoomWindowHeight > i.nzHeight && (i.windowOffsetTop = i.nzHeight, i.windowOffsetLeft = -1 * (i.options.zoomWindowWidth / 2 - i.nzWidth / 2 + 2 * i.options.borderSize));
                        break;
                    case 7:
                        i.windowOffsetTop = i.nzHeight, i.windowOffsetLeft = 0;
                        break;
                    case 8:
                        i.windowOffsetTop = i.nzHeight, i.windowOffsetLeft = -1 * (i.zoomWindow.width() + 2 * i.options.borderSize);
                        break;
                    case 9:
                        i.windowOffsetTop = i.nzHeight - i.zoomWindow.height() - 2 * i.options.borderSize, i.windowOffsetLeft = -1 * (i.zoomWindow.width() + 2 * i.options.borderSize);
                        break;
                    case 10:
                        i.options.zoomWindowHeight > i.nzHeight && (i.windowOffsetTop = -1 * (i.options.zoomWindowHeight / 2 - i.nzHeight / 2), i.windowOffsetLeft = -1 * (i.zoomWindow.width() + 2 * i.options.borderSize));
                        break;
                    case 11:
                        i.windowOffsetTop = i.options.zoomWindowOffety, i.windowOffsetLeft = -1 * (i.zoomWindow.width() + 2 * i.options.borderSize);
                        break;
                    case 12:
                        i.windowOffsetTop = -1 * (i.zoomWindow.height() + 2 * i.options.borderSize), i.windowOffsetLeft = -1 * (i.zoomWindow.width() + 2 * i.options.borderSize);
                        break;
                    case 13:
                        i.windowOffsetTop = -1 * (i.zoomWindow.height() + 2 * i.options.borderSize), i.windowOffsetLeft = 0;
                        break;
                    case 14:
                        i.options.zoomWindowHeight > i.nzHeight && (i.windowOffsetTop = -1 * (i.zoomWindow.height() + 2 * i.options.borderSize), i.windowOffsetLeft = -1 * (i.options.zoomWindowWidth / 2 - i.nzWidth / 2 + 2 * i.options.borderSize));
                        break;
                    case 15:
                        i.windowOffsetTop = -1 * (i.zoomWindow.height() + 2 * i.options.borderSize), i.windowOffsetLeft = i.nzWidth - i.zoomWindow.width() - 2 * i.options.borderSize;
                        break;
                    case 16:
                        i.windowOffsetTop = -1 * (i.zoomWindow.height() + 2 * i.options.borderSize), i.windowOffsetLeft = i.nzWidth;
                        break;
                    default:
                        i.windowOffsetTop = i.options.zoomWindowOffety, i.windowOffsetLeft = i.nzWidth
                }
                i.isWindowSet = !0, i.windowOffsetTop = i.windowOffsetTop + i.options.zoomWindowOffety, i.windowOffsetLeft = i.windowOffsetLeft + i.options.zoomWindowOffetx, i.zoomWindow.css({
                    top: i.windowOffsetTop
                }), i.zoomWindow.css({
                    left: i.windowOffsetLeft
                }), "inner" == i.options.zoomType && (i.zoomWindow.css({
                    top: 0
                }), i.zoomWindow.css({
                    left: 0
                })), i.windowLeftPos = String(-1 * ((e.pageX - i.nzOffset.left) * i.widthRatio - i.zoomWindow.width() / 2)), i.windowTopPos = String(-1 * ((e.pageY - i.nzOffset.top) * i.heightRatio - i.zoomWindow.height() / 2)), i.Etoppos && (i.windowTopPos = 0), i.Eloppos && (i.windowLeftPos = 0), i.Eboppos && (i.windowTopPos = -1 * (i.largeHeight / i.currentZoomLevel - i.zoomWindow.height())), i.Eroppos && (i.windowLeftPos = -1 * (i.largeWidth / i.currentZoomLevel - i.zoomWindow.width())), i.fullheight && (i.windowTopPos = 0), i.fullwidth && (i.windowLeftPos = 0), "window" != i.options.zoomType && "inner" != i.options.zoomType || (1 == i.zoomLock && (i.widthRatio <= 1 && (i.windowLeftPos = 0), i.heightRatio <= 1 && (i.windowTopPos = 0)), "window" == i.options.zoomType && (i.largeHeight < i.options.zoomWindowHeight && (i.windowTopPos = 0), i.largeWidth < i.options.zoomWindowWidth && (i.windowLeftPos = 0)), i.options.easing ? (i.xp || (i.xp = 0), i.yp || (i.yp = 0), i.loop || (i.loop = setInterval(function() {
                    i.xp += (i.windowLeftPos - i.xp) / i.options.easingAmount, i.yp += (i.windowTopPos - i.yp) / i.options.easingAmount, i.scrollingLock ? (clearInterval(i.loop), i.xp = i.windowLeftPos, i.yp = i.windowTopPos, i.xp = -1 * ((e.pageX - i.nzOffset.left) * i.widthRatio - i.zoomWindow.width() / 2), i.yp = -1 * ((e.pageY - i.nzOffset.top) * i.heightRatio - i.zoomWindow.height() / 2), i.changeBgSize && (i.nzHeight > i.nzWidth ? ("lens" == i.options.zoomType && i.zoomLens.css({
                        "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                    }), i.zoomWindow.css({
                        "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                    })) : ("lens" != i.options.zoomType && i.zoomLens.css({
                        "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvalueheight + "px"
                    }), i.zoomWindow.css({
                        "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvaluewidth + "px"
                    })), i.changeBgSize = !1), i.zoomWindow.css({
                        backgroundPosition: i.windowLeftPos + "px " + i.windowTopPos + "px"
                    }), i.scrollingLock = !1, i.loop = !1) : Math.round(Math.abs(i.xp - i.windowLeftPos) + Math.abs(i.yp - i.windowTopPos)) < 1 ? (clearInterval(i.loop), i.zoomWindow.css({
                        backgroundPosition: i.windowLeftPos + "px " + i.windowTopPos + "px"
                    }), i.loop = !1) : (i.changeBgSize && (i.nzHeight > i.nzWidth ? ("lens" == i.options.zoomType && i.zoomLens.css({
                        "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                    }), i.zoomWindow.css({
                        "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                    })) : ("lens" != i.options.zoomType && i.zoomLens.css({
                        "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvaluewidth + "px"
                    }), i.zoomWindow.css({
                        "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvaluewidth + "px"
                    })), i.changeBgSize = !1), i.zoomWindow.css({
                        backgroundPosition: i.xp + "px " + i.yp + "px"
                    }))
                }, 16))) : (i.changeBgSize && (i.nzHeight > i.nzWidth ? ("lens" == i.options.zoomType && i.zoomLens.css({
                    "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                }), i.zoomWindow.css({
                    "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                })) : ("lens" == i.options.zoomType && i.zoomLens.css({
                    "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvaluewidth + "px"
                }), i.largeHeight / i.newvaluewidth < i.options.zoomWindowHeight ? i.zoomWindow.css({
                    "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvaluewidth + "px"
                }) : i.zoomWindow.css({
                    "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                })), i.changeBgSize = !1), i.zoomWindow.css({
                    backgroundPosition: i.windowLeftPos + "px " + i.windowTopPos + "px"
                })))
            },
            setTintPosition: function(t) {
                var e = this;
                e.nzOffset = e.$elem.offset(), e.tintpos = String(-1 * (t.pageX - e.nzOffset.left - e.zoomLens.width() / 2)), e.tintposy = String(-1 * (t.pageY - e.nzOffset.top - e.zoomLens.height() / 2)), e.Etoppos && (e.tintposy = 0), e.Eloppos && (e.tintpos = 0), e.Eboppos && (e.tintposy = -1 * (e.nzHeight - e.zoomLens.height() - 2 * e.options.lensBorderSize)), e.Eroppos && (e.tintpos = -1 * (e.nzWidth - e.zoomLens.width() - 2 * e.options.lensBorderSize)), e.options.tint && (e.fullheight && (e.tintposy = 0), e.fullwidth && (e.tintpos = 0), e.zoomTintImage.css({
                    left: e.tintpos + "px"
                }), e.zoomTintImage.css({
                    top: e.tintposy + "px"
                }))
            },
            swaptheimage: function(e, i) {
                var n = this,
                    o = new Image;
                n.options.loadingIcon && (n.spinner = t("<div style=\"background: url('" + n.options.loadingIcon + "') no-repeat center;height:" + n.nzHeight + "px;width:" + n.nzWidth + 'px;z-index: 2000;position: absolute; background-position: center center;"></div>'), n.$elem.after(n.spinner)), n.options.onImageSwap(n.$elem), o.onload = function() {
                    n.largeWidth = o.width, n.largeHeight = o.height, n.zoomImage = i, n.zoomWindow.css({
                        "background-size": n.largeWidth + "px " + n.largeHeight + "px"
                    }), n.swapAction(e, i)
                }, o.src = i
            },
            swapAction: function(e, i) {
                var n = this,
                    o = new Image;
                if (o.onload = function() {
                        n.nzHeight = o.height, n.nzWidth = o.width, n.options.onImageSwapComplete(n.$elem), n.doneCallback()
                    }, o.src = e, n.currentZoomLevel = n.options.zoomLevel, n.options.maxZoomLevel = !1, "lens" == n.options.zoomType && n.zoomLens.css({
                        backgroundImage: "url('" + i + "')"
                    }), "window" == n.options.zoomType && n.zoomWindow.css({
                        backgroundImage: "url('" + i + "')"
                    }), "inner" == n.options.zoomType && n.zoomWindow.css({
                        backgroundImage: "url('" + i + "')"
                    }), n.currentImage = i, n.options.imageCrossfade) {
                    var s = n.$elem,
                        a = s.clone();
                    if (n.$elem.attr("src", e), n.$elem.after(a), a.stop(!0).fadeOut(n.options.imageCrossfade, function() {
                            t(this).remove()
                        }), n.$elem.width("auto").removeAttr("width"), n.$elem.height("auto").removeAttr("height"), s.fadeIn(n.options.imageCrossfade), n.options.tint && "inner" != n.options.zoomType) {
                        var r = n.zoomTintImage,
                            l = r.clone();
                        n.zoomTintImage.attr("src", i), n.zoomTintImage.after(l), l.stop(!0).fadeOut(n.options.imageCrossfade, function() {
                            t(this).remove()
                        }), r.fadeIn(n.options.imageCrossfade), n.zoomTint.css({
                            height: n.$elem.height()
                        }), n.zoomTint.css({
                            width: n.$elem.width()
                        })
                    }
                    n.zoomContainer.css("height", n.$elem.height()), n.zoomContainer.css("width", n.$elem.width()), "inner" == n.options.zoomType && (n.options.constrainType || (n.zoomWrap.parent().css("height", n.$elem.height()), n.zoomWrap.parent().css("width", n.$elem.width()), n.zoomWindow.css("height", n.$elem.height()), n.zoomWindow.css("width", n.$elem.width()))), n.options.imageCrossfade && (n.zoomWrap.css("height", n.$elem.height()), n.zoomWrap.css("width", n.$elem.width()))
                } else n.$elem.attr("src", e), n.options.tint && (n.zoomTintImage.attr("src", i), n.zoomTintImage.attr("height", n.$elem.height()), n.zoomTintImage.css({
                    height: n.$elem.height()
                }), n.zoomTint.css({
                    height: n.$elem.height()
                })), n.zoomContainer.css("height", n.$elem.height()), n.zoomContainer.css("width", n.$elem.width()), n.options.imageCrossfade && (n.zoomWrap.css("height", n.$elem.height()), n.zoomWrap.css("width", n.$elem.width()));
                n.options.constrainType && ("height" == n.options.constrainType && (n.zoomContainer.css("height", n.options.constrainSize), n.zoomContainer.css("width", "auto"), n.options.imageCrossfade ? (n.zoomWrap.css("height", n.options.constrainSize), n.zoomWrap.css("width", "auto"), n.constwidth = n.zoomWrap.width()) : (n.$elem.css("height", n.options.constrainSize), n.$elem.css("width", "auto"), n.constwidth = n.$elem.width()), "inner" == n.options.zoomType && (n.zoomWrap.parent().css("height", n.options.constrainSize), n.zoomWrap.parent().css("width", n.constwidth), n.zoomWindow.css("height", n.options.constrainSize), n.zoomWindow.css("width", n.constwidth)), n.options.tint && (n.tintContainer.css("height", n.options.constrainSize), n.tintContainer.css("width", n.constwidth), n.zoomTint.css("height", n.options.constrainSize), n.zoomTint.css("width", n.constwidth), n.zoomTintImage.css("height", n.options.constrainSize), n.zoomTintImage.css("width", n.constwidth))), "width" == n.options.constrainType && (n.zoomContainer.css("height", "auto"), n.zoomContainer.css("width", n.options.constrainSize), n.options.imageCrossfade ? (n.zoomWrap.css("height", "auto"), n.zoomWrap.css("width", n.options.constrainSize), n.constheight = n.zoomWrap.height()) : (n.$elem.css("height", "auto"), n.$elem.css("width", n.options.constrainSize), n.constheight = n.$elem.height()), "inner" == n.options.zoomType && (n.zoomWrap.parent().css("height", n.constheight), n.zoomWrap.parent().css("width", n.options.constrainSize), n.zoomWindow.css("height", n.constheight), n.zoomWindow.css("width", n.options.constrainSize)), n.options.tint && (n.tintContainer.css("height", n.constheight), n.tintContainer.css("width", n.options.constrainSize), n.zoomTint.css("height", n.constheight), n.zoomTint.css("width", n.options.constrainSize), n.zoomTintImage.css("height", n.constheight), n.zoomTintImage.css("width", n.options.constrainSize))))
            },
            doneCallback: function() {
                var t = this;
                t.options.loadingIcon && t.spinner.hide(), t.nzOffset = t.$elem.offset(), t.nzWidth = t.$elem.width(), t.nzHeight = t.$elem.height(), t.currentZoomLevel = t.options.zoomLevel, t.widthRatio = t.largeWidth / t.nzWidth, t.heightRatio = t.largeHeight / t.nzHeight, "window" == t.options.zoomType && (t.nzHeight < t.options.zoomWindowWidth / t.widthRatio ? lensHeight = t.nzHeight : lensHeight = String(t.options.zoomWindowHeight / t.heightRatio), t.options.zoomWindowWidth < t.options.zoomWindowWidth ? lensWidth = t.nzWidth : lensWidth = t.options.zoomWindowWidth / t.widthRatio, t.zoomLens && (t.zoomLens.css("width", lensWidth), t.zoomLens.css("height", lensHeight)))
            },
            getCurrentImage: function() {
                return this.zoomImage
            },
            getGalleryList: function() {
                var e = this;
                return e.gallerylist = [], e.options.gallery ? t("#" + e.options.gallery + " a").each(function() {
                    var i = "";
                    t(this).data("zoom-image") ? i = t(this).data("zoom-image") : t(this).data("image") && (i = t(this).data("image")), i == e.zoomImage ? e.gallerylist.unshift({
                        href: "" + i,
                        title: t(this).find("img").attr("title")
                    }) : e.gallerylist.push({
                        href: "" + i,
                        title: t(this).find("img").attr("title")
                    })
                }) : e.gallerylist.push({
                    href: "" + e.zoomImage,
                    title: t(this).find("img").attr("title")
                }), e.gallerylist
            },
            changeZoomLevel: function(t) {
                var e = this;
                e.scrollingLock = !0, e.newvalue = parseFloat(t).toFixed(2), newvalue = parseFloat(t).toFixed(2), maxheightnewvalue = e.largeHeight / (e.options.zoomWindowHeight / e.nzHeight * e.nzHeight), maxwidthtnewvalue = e.largeWidth / (e.options.zoomWindowWidth / e.nzWidth * e.nzWidth), "inner" != e.options.zoomType && (maxheightnewvalue <= newvalue ? (e.heightRatio = e.largeHeight / maxheightnewvalue / e.nzHeight, e.newvalueheight = maxheightnewvalue, e.fullheight = !0) : (e.heightRatio = e.largeHeight / newvalue / e.nzHeight, e.newvalueheight = newvalue, e.fullheight = !1), maxwidthtnewvalue <= newvalue ? (e.widthRatio = e.largeWidth / maxwidthtnewvalue / e.nzWidth, e.newvaluewidth = maxwidthtnewvalue, e.fullwidth = !0) : (e.widthRatio = e.largeWidth / newvalue / e.nzWidth, e.newvaluewidth = newvalue, e.fullwidth = !1), "lens" == e.options.zoomType && (maxheightnewvalue <= newvalue ? (e.fullwidth = !0, e.newvaluewidth = maxheightnewvalue) : (e.widthRatio = e.largeWidth / newvalue / e.nzWidth, e.newvaluewidth = newvalue, e.fullwidth = !1))), "inner" == e.options.zoomType && (maxheightnewvalue = parseFloat(e.largeHeight / e.nzHeight).toFixed(2), maxwidthtnewvalue = parseFloat(e.largeWidth / e.nzWidth).toFixed(2), newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue), newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue), maxheightnewvalue <= newvalue ? (e.heightRatio = e.largeHeight / newvalue / e.nzHeight, newvalue > maxheightnewvalue ? e.newvalueheight = maxheightnewvalue : e.newvalueheight = newvalue, e.fullheight = !0) : (e.heightRatio = e.largeHeight / newvalue / e.nzHeight, newvalue > maxheightnewvalue ? e.newvalueheight = maxheightnewvalue : e.newvalueheight = newvalue, e.fullheight = !1), maxwidthtnewvalue <= newvalue ? (e.widthRatio = e.largeWidth / newvalue / e.nzWidth, newvalue > maxwidthtnewvalue ? e.newvaluewidth = maxwidthtnewvalue : e.newvaluewidth = newvalue, e.fullwidth = !0) : (e.widthRatio = e.largeWidth / newvalue / e.nzWidth, e.newvaluewidth = newvalue, e.fullwidth = !1)), scrcontinue = !1, "inner" == e.options.zoomType && (e.nzWidth >= e.nzHeight && (e.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, e.fullheight = !0, e.fullwidth = !0)), e.nzHeight > e.nzWidth && (e.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, e.fullheight = !0, e.fullwidth = !0))), "inner" != e.options.zoomType && (scrcontinue = !0), scrcontinue && (e.zoomLock = 0, e.changeZoom = !0, e.options.zoomWindowHeight / e.heightRatio <= e.nzHeight && (e.currentZoomLevel = e.newvalueheight, "lens" != e.options.zoomType && "inner" != e.options.zoomType && (e.changeBgSize = !0, e.zoomLens.css({
                    height: String(e.options.zoomWindowHeight / e.heightRatio) + "px"
                })), "lens" != e.options.zoomType && "inner" != e.options.zoomType || (e.changeBgSize = !0)), e.options.zoomWindowWidth / e.widthRatio <= e.nzWidth && ("inner" != e.options.zoomType && e.newvaluewidth > e.newvalueheight && (e.currentZoomLevel = e.newvaluewidth), "lens" != e.options.zoomType && "inner" != e.options.zoomType && (e.changeBgSize = !0, e.zoomLens.css({
                    width: String(e.options.zoomWindowWidth / e.widthRatio) + "px"
                })), "lens" != e.options.zoomType && "inner" != e.options.zoomType || (e.changeBgSize = !0)), "inner" == e.options.zoomType && (e.changeBgSize = !0, e.nzWidth > e.nzHeight && (e.currentZoomLevel = e.newvaluewidth), e.nzHeight > e.nzWidth && (e.currentZoomLevel = e.newvaluewidth))), e.setPosition(e.currentLoc)
            },
            closeAll: function() {
                self.zoomWindow && self.zoomWindow.hide(), self.zoomLens && self.zoomLens.hide(), self.zoomTint && self.zoomTint.hide()
            },
            changeState: function(t) {
                var e = this;
                "enable" == t && (e.options.zoomEnabled = !0), "disable" == t && (e.options.zoomEnabled = !1)
            }
        };
        t.fn.elevateZoom = function(i) {
            return this.each(function() {
                var n = Object.create(e);
                n.init(i, this), t.data(this, "elevateZoom", n)
            })
        };
        var i = t(".product-details").outerWidth(),
            n = t(".product-details").outerHeight() - 50;
        t.fn.elevateZoom.options = {
            zoomActivation: "hover",
            zoomEnabled: !0,
            preloading: 1,
            zoomLevel: 1,
            scrollZoom: !1,
            scrollZoomIncrement: .1,
            minZoomLevel: !1,
            maxZoomLevel: !1,
            easing: !1,
            easingAmount: 12,
            lensSize: 200,
            zoomWindowWidth: i,
            zoomWindowHeight: n,
            zoomWindowOffetx: 0,
            zoomWindowOffety: 0,
            zoomWindowPosition: 1,
            zoomWindowBgColour: "#fff",
            lensFadeIn: !1,
            lensFadeOut: !1,
            debug: !1,
            zoomWindowFadeIn: !1,
            zoomWindowFadeOut: !1,
            zoomWindowAlwaysShow: !1,
            zoomTintFadeIn: !1,
            zoomTintFadeOut: !1,
            borderSize: 4,
            showLens: !0,
            borderColour: "#fff",
            lensBorderSize: 1,
            lensBorderColour: "#000",
            lensShape: "square",
            zoomType: "window",
            containLensZoom: !1,
            lensColour: "white",
            lensOpacity: .4,
            lenszoom: !1,
            tint: !1,
            tintColour: "#333",
            tintOpacity: .4,
            gallery: !1,
            galleryActiveClass: "zoomGalleryActive",
            imageCrossfade: !1,
            constrainType: !1,
            constrainSize: !1,
            loadingIcon: !1,
            cursor: "default",
            responsive: !0,
            onComplete: t.noop,
            onDestroy: function() {},
            onZoomedImageLoaded: function() {},
            onImageSwap: t.noop,
            onImageSwapComplete: t.noop
        }
    }(jQuery, window, document), $(document).ready(function() {
        mainWrapPadding(), bannerSlider(), celebrationSider(), productSider(), tabList(), diariesSider(), familySider(), storySider(), instaSider(), mCustomScroll(), showPopup(), closePopup(), hiddenOverlay(), headerScroll(), halfSider(), oneThirdSider(), trendySider(), accessSider(), mobMenu(), moheyBridalSlider(), showList(), sortProduct(), openFilterBox(), priceRangeSlider(), listPopup(), openMobileFilter(), detailThumb(), quantityCount(), showToggleBox(), fancyBox(), lookSlider(), productDltSider(), similarProductSider(), inputFocus(), selectAddress(), optGenerate(), checkoutProcess(), mobOrderSummary(), showAddressBox(), orderAccordian(), faqAccordian(), innerBannerSlider(), curatedSlider(), fancyVideoPopup(), uploadBtn(), alterFormRageSlider(), blouseSlider(), bPopup(), scrollSet(), insertB(), openVideoText(), sherwaniSlider(), guestEmailPopup(), relUnder640(), measurePopup()
    }), $(window).load(function() {
        mainWrapPadding(), yearFor()
    }),
    function(t, e, i, n) {
        var o = t(e);
        t.fn.lazyload = function(s) {
            function a() {
                var e = 0;
                l.each(function() {
                    var i = t(this);
                    if (!h.skip_invisible || i.is(":visible"))
                        if (t.abovethetop(this, h) || t.leftofbegin(this, h));
                        else if (t.belowthefold(this, h) || t.rightoffold(this, h)) {
                        if (++e > h.failure_limit) return !1
                    } else i.trigger("appear"), e = 0
                })
            }
            var r, l = this,
                h = {
                    threshold: 0,
                    failure_limit: 0,
                    event: "scroll",
                    effect: "show",
                    container: e,
                    data_attribute: "original",
                    skip_invisible: !0,
                    appear: null,
                    load: null,
                    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
                };
            return s && (n !== s.failurelimit && (s.failure_limit = s.failurelimit, delete s.failurelimit), n !== s.effectspeed && (s.effect_speed = s.effectspeed, delete s.effectspeed), t.extend(h, s)), r = h.container === n || h.container === e ? o : t(h.container), 0 === h.event.indexOf("scroll") && r.bind(h.event, function() {
                return a()
            }), this.each(function() {
                var e = this,
                    i = t(e);
                e.loaded = !1, (i.attr("src") === n || !1 === i.attr("src")) && i.attr("src", h.placeholder), i.one("appear", function() {
                    if (!this.loaded) {
                        if (h.appear) {
                            var n = l.length;
                            h.appear.call(e, n, h)
                        }
                        t("<img />").bind("load", function() {
                            var n = i.data(h.data_attribute);
                            i.hide(), i.is("img") ? i.attr("src", n) : i.css("background-image", "url('" + n + "')"), i[h.effect](h.effect_speed), e.loaded = !0;
                            var o = t.grep(l, function(t) {
                                return !t.loaded
                            });
                            if (l = t(o), h.load) {
                                var s = l.length;
                                h.load.call(e, s, h)
                            }
                        }).attr("src", i.data(h.data_attribute))
                    }
                }), 0 !== h.event.indexOf("scroll") && i.bind(h.event, function() {
                    e.loaded || i.trigger("appear")
                })
            }), o.bind("resize", function() {
                a()
            }), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && o.bind("pageshow", function(e) {
                e.originalEvent && e.originalEvent.persisted && l.each(function() {
                    t(this).trigger("appear")
                })
            }), t(i).ready(function() {
                a()
            }), this
        }, t.belowthefold = function(i, s) {
            return (s.container === n || s.container === e ? (e.innerHeight ? e.innerHeight : o.height()) + o.scrollTop() : t(s.container).offset().top + t(s.container).height()) <= t(i).offset().top - s.threshold
        }, t.rightoffold = function(i, s) {
            return (s.container === n || s.container === e ? o.width() + o.scrollLeft() : t(s.container).offset().left + t(s.container).width()) <= t(i).offset().left - s.threshold
        }, t.abovethetop = function(i, s) {
            return (s.container === n || s.container === e ? o.scrollTop() : t(s.container).offset().top) >= t(i).offset().top + s.threshold + t(i).height()
        }, t.leftofbegin = function(i, s) {
            return (s.container === n || s.container === e ? o.scrollLeft() : t(s.container).offset().left) >= t(i).offset().left + s.threshold + t(i).width()
        }, t.inviewport = function(e, i) {
            return !(t.rightoffold(e, i) || t.leftofbegin(e, i) || t.belowthefold(e, i) || t.abovethetop(e, i))
        }, t.extend(t.expr[":"], {
            "below-the-fold": function(e) {
                return t.belowthefold(e, {
                    threshold: 0
                })
            },
            "above-the-top": function(e) {
                return !t.belowthefold(e, {
                    threshold: 0
                })
            },
            "right-of-screen": function(e) {
                return t.rightoffold(e, {
                    threshold: 0
                })
            },
            "left-of-screen": function(e) {
                return !t.rightoffold(e, {
                    threshold: 0
                })
            },
            "in-viewport": function(e) {
                return t.inviewport(e, {
                    threshold: 0
                })
            },
            "above-the-fold": function(e) {
                return !t.belowthefold(e, {
                    threshold: 0
                })
            },
            "right-of-fold": function(e) {
                return t.rightoffold(e, {
                    threshold: 0
                })
            },
            "left-of-fold": function(e) {
                return !t.rightoffold(e, {
                    threshold: 0
                })
            }
        })
    }(jQuery, window, document), $(".checkout-box.address-process").click(function() {
        $(".payment-process .checkout-header").addClass("pointer_event_none")
    }), $(document).on("click", ".track-btn", function(t) {
        "none" == $(".track-form").css("display") ? $(".track-form").fadeIn() : $(".track-form").fadeOut(), t.stopPropagation()
    }), $(".ac-back").click(function() {
        $(".menu-icon").click(), $("#my-account-open").click()
    }), $(".close-shipping").click(function() {
        $(".free_shiping").remove()
    });