$(document).ready(function () {
  // Temp
  $(
    ".single-menu-item .info-icon, .single-menu-item .close-icon,.has-options .alternatives"
  ).on("click", function (e) {
    e.preventDefault();
    let classSwitch = "";

    if ($(this).hasClass("alternatives")) {
      $("#menuInfoModal").addClass("alternatives");

      if ($(this).parent().hasClass("single-menu-item-fruit")) {
        classSwitch = "single-menu-item-fruit";
      } else if ($(this).parent().hasClass("single-menu-item-drink")) {
        classSwitch = "single-menu-item-drink";
      }

      $("#menuInfoModal .single-menu-item-alternatives-options").removeClass(
        "single-menu-item-drink single-menu-item-fruit"
      );
      $("#menuInfoModal .single-menu-item-alternatives-options").addClass(
        classSwitch
      );
      $("#menuInfoModal .modal-content").addClass("overflow-visible");
      $("#menuInfoModal").modal("toggle");
    } else {
      $("#menuInfoModal .modal-content").removeClass("overflow-visible");
      $("#menuInfoModal").removeClass("alternatives");
      $("#menuInfoModal").modal("toggle");
    }
  });

  $("#menuTrigger, #main-menu .close-menu").on("click", function (e) {
    e.preventDefault();
    $("#main-menu").toggleClass("active");
    $("body").toggleClass("overflow-hidden");
  });
  $("#cartTrigger, #mini-cart .close-cart, #main-menu .shopping-cart").on(
    "click",
    function (e) {
      e.preventDefault();
      $("#main-menu").removeClass("active"); // Close Main menu if opened
      $("#mini-cart").toggleClass("active");
    }
  );
  $("#mini-cart .remove-order").on("click", function (e) {
    e.preventDefault();
    let parentContainer = $(this).parent();
    $.when(parentContainer.slideUp(750)).done(function () {
      parentContainer.remove(); //Temporary deletion of order
      // TODO: Send order for deletion to api.
      // TODO: Send order for deletion to api.
      // TODO: Send order for deletion to api.
      if ($(" #mini-cart .single-order").length == 0) {
        $("#mini-cart .empty-cart").fadeIn();
        $("#mini-cart .cart-footer").fadeOut();
      } else {
        $("#mini-cart .empty-cart").fadeOut();
        $("#mini-cart .cart-footer").fadeIn();
      }
    });
  });

  // show Modal on load
  // if (localStorage.getItem("cookieSeen") != "shown") {
  //   $("#splashModal").modal("show");
  //   console.log(
  //     "%c Where is your cookie ? :O ",
  //     "background: #fff; color: #000"
  //   );

  //   localStorage.setItem("cookieSeen", "shown");
  // } else {
  //   console.log(
  //     "%c You have a cookie! :) ",
  //     "background: #000; color: #bada55"
  //   );
  // }

  // Formated Input Fields jump to next
  if ($(".formated-inputs").length) {
    $(".formated-inputs input").keyup(function (e) {
      if (e.keyCode == 8) {
        $(this).prev(".formated-inputs input").focus();
      } else {
        if (this.value.length == this.maxLength) {
          $(this).next(".formated-inputs input").focus();
        }
      }
    });
  }
  // Submit Form
  if ($("#splashModal .submitForm").length) {
    $("#splashModal .submitForm").on("click", () => {
      // Temporary workaround
      let correctCapNum = "1,2,3,4,5";
      var capNumbers = $("input[name^=capNum]")
        .map(function (idx, elem) {
          return $(elem).val();
        })
        .get()
        .toString();

      if (capNumbers == correctCapNum) {
        // $("#splashModal .description").text(
        //   "Consegniamo piatti sani e gustosi anche nella tua zona."
        // );
        // $("#splashModal .description").before("<h4>FANTASTICO!</h4>");
        // $("#splashModal form, #splashModal .submitForm").slideUp();
        $("#splashModal").modal("hide");
        // $("#splashModal form").submit();
      } else {
        alert("Wrong Cap");
      }
    });
  }
  // Dropdown Filter
  if ($(".filter-wrap").length) {
    $(".filter-wrap a").on("click", function (e) {
      e.preventDefault();
      $(this).parent().parent().siblings(".filter-dropdown").slideToggle();
    });
  }
  if ($(".filter-dropdown .do-btn").length) {
    $(".filter-dropdown .do-btn").on("click", function (e) {
      e.preventDefault();
      $(this).parent().slideToggle();
    });
  }
  // Tabs Change theme color
  if ($(".cta-tabs-wrapper").length) {
    $(".cta-tabs-wrapper .nav-tabs li a").on("click", function () {
      let themeColor = $(this).attr("data-theme-color");
      $(".cta-tabs-wrapper .tab-content, .secondary-tabs .tab-content").attr(
        "class",
        "tab-content"
      ); //Clear theme classes
      $(
        ".cta-tabs-wrapper .tab-content, .secondary-tabs .tab-content"
      ).addClass(themeColor);
      // Support For secondary tabs
      let tabSelector = $(this).attr("href");
      let activeTabClasses = "in fade show active";
      $(".tab-pane").removeClass(activeTabClasses);
      $(tabSelector).addClass(activeTabClasses);
    });
  }
  // User Change info
  if ($(".user-toolbar").length) {
    $(".change-user-full-name").on("click", function (e) {
      e.preventDefault();
      $(".user-full-name, .user-email").attr("readonly", false);
      $(".user-info .form-btns").show();
      $(".user-toolbar").hide();
    });

    $(".change-user-password").on("click", function (e) {
      e.preventDefault();
      $("form#change-pass").slideToggle();
    });
    $('form#change-pass input[type="submit"]').on("click", function (e) {
      let oldPassField = $(this).parent().siblings("#oldPassword");
      let newPassField = $(this).parent().siblings("#newPassword");
      let confirmPass = $(this).parent().siblings("#confirmNewPassword");
      let tempPass = "password";
      e.preventDefault();
      function checkForm() {
        if (oldPassField.val() !== tempPass) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Old Password is incorrect.",
          });
        } else if (newPassField.val().length < 5) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password is too short",
          });
        } else if (newPassField.val() !== confirmPass.val()) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "New Passwords do not match.",
          });
        } else {
          return true;
        }
      }

      if (checkForm()) {
        $(this).parent().parent().submit();
      }
    });
    $('.form-btns input[type="reset"').on("click", function () {
      $(this).parent().parent().slideToggle();
    });
    $(".user-info .form-btns .cancel-user-info").on("click", function (e) {
      e.preventDefault();
      $(".user-full-name, .user-email").attr("readonly", true);
      $(".user-info .form-btns").hide();
      $(".user-toolbar").show();
    });
    $(".user-info .form-btns .save-user-info").on("click", function (e) {
      $(".info-block form.user-info").submit();
    });
  }
  if ($(".editable-info").length) {
    $(".editable-info .remove-address").on("click", function (e) {
      e.preventDefault();
      $(this).parent().addClass("waiting");
      $(this).parent().find(".delete-confrimation").fadeIn();
    });
    $(".editable-info .delete-confrimation a").on("click", function (e) {
      e.preventDefault();
      let parentContainer = $(this).parent().parent();

      if ($(this).attr("data-delete") == "yes") {
        parentContainer.removeClass("waiting");
        $.when(parentContainer.slideUp(750)).done(function () {
          parentContainer.remove(); //Temporary deletion of order
          // TODO: Send order for deletion to api.
          // TODO: Send order for deletion to api.
          // TODO: Send order for deletion to api.
        });
      } else {
        parentContainer.removeClass("waiting");
        parentContainer.find(".delete-confrimation").hide();
      }
    });
  }
  if ($(".add-to-fav").length) {
    $(".add-to-fav").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("active");
    });
  }
  //Mob Settings
  if ($(window).width() < 426) {
    $("#main-menu .menu-body ul li a").on("click", function () {
      $("#main-menu").toggleClass("active");
    });
  }
  // Sliders:
  if ($(".menu-card-slider").length) {
    $(".menu-card-slider").slick({
      dots: true,
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      mobileFirst: true,
    });
  }
  // Registration/login
  if ($("#registerWithCodice").length) {
    $("#registerWithCodice button").on("click", function (e) {
      e.preventDefault();
      function codiceCheck() {
        if ($("#codiceNumInput").val() === "123") {
          return true;
        } else {
          return false;
        }
      }
      if (codiceCheck()) {
        $("#registerWithCodice").submit();
      } else {
        $("#registerWithCodice .validation-msg").css("display", "flex");
        $("#registerWithCodice input").css("border-color", "#df4661");
      }
    });
  }
  // jQuery Validation
  if ($("#user-registration-form").length) {
    $("#user-registration-form").validate({
      rules: {
        firstName: {
          required: true,
          minlength: 2,
        },
        lastName: {
          required: true,
          minlength: 2,
        },
        userEmail: {
          required: true,
          email: true,
        },
        userPassword: {
          required: true,
          minlength: 5,
        },
        userConfirmPassword: {
          required: true,
          minlength: 5,
          equalTo: "#userPassword",
        },
        phoneNum: {
          required: true,
        },
      },
      messages: {
        firstName: {
          required: "Please insert your first name",
          minlength: "Name must be at least 2 characters",
        },
        lastName: {
          required: "Please insert your last name",
          minlength: "Last must be at least 2 characters",
        },
        userPassword: {
          required: "Please enter a password.",
          minlength: "Your password must be atleast 5 characters.",
        },
        phoneNum: {
          required: "Phone is required.",
        },
        userConfirmPassword: {
          required: "Please enter a password confirmation.",
          minlength: "Your password must be atleast 5 characters.",
          equalTo: "Please enter the same password as above.",
        },
      },
    });
  }
  // Phone extension flags
  if ($("#phoneNum").length) {
    let countryCodePhone = document.querySelector("#phoneNum");
    window.intlTelInput(countryCodePhone);
    $("#user-registration-form .input-grp .iti--allow-dropdown").on(
      "click",
      function () {
        $("ul .iti__country").on("click", function (e) {
          let extNumber = $(this).children(".iti__dial-code").text();
          $("#phoneNum").val("");
          $("#phoneNum").val(function () {
            return extNumber + this.value;
          });
        });
      }
    );
  }

  // Countdown
  var myreset = [19, 43, 00]; // at what time to reset - 19:40:00

  // Added myCountDownDiv variable to prevent jquery from walking the DOM o every update
  var myCountDownDiv = document.getElementById("countdown");

  var mycountdown = startCountdown();

  function startCountdown() {
    var enddate = calculateEndDate();
    return setInterval(function () {
      tickTock(calculateStartDate(), enddate);
    }, 1000);
  }
  function calculateStartDate() {
    //this needs to be edited if using the server time
    return new Date();
  }
  function calculateEndDate() {
    var enddate = new Date();
    enddate.setHours(myreset[0]);
    enddate.setMinutes(myreset[1]);
    enddate.setSeconds(myreset[2]);
    return enddate;
  }
  function tickTock(startdate, enddate) {
    var diff = enddate.getTime() - startdate.getTime();
    d = diff >= 0 ? diff : diff + 24 * 3600 * 1000;
    var h = Math.floor(d / 3600 / 1000);
    var m = Math.floor(d / 60 / 1000) - 60 * h;
    var s = Math.floor(d / 1000) - 3600 * h - 60 * m;
    if (m < 11) {
      $(".top-clock").removeClass("expired");
      printCountdown(h, m, s);
    } else {
      $(".top-clock").addClass("expired");
    }
  }

  function printCountdown(h, m, s) {
    var t = h + ":" + m + ":" + s;

    myCountDownDiv.innerText = t;
  }
  // Checkout Tabs

  if ($(".checkout-tabs").length) {
    $(".checkout-tabs a, .go-to-payment").on("click", function (e) {
      e.preventDefault();
      $(".checkout-tabs a").removeClass("active");
      $(this).addClass("active");

      let selectedTab = $(this).attr("data-target");
      $(".checkout-tabs-content-single").fadeOut(100);
      $("#" + selectedTab).fadeIn(1000);
    });
  }
});
