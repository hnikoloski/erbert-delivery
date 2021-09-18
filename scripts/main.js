$(document).ready(function () {
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
  // show Modal on load
  if (localStorage.getItem("cookieSeen") != "shown") {
    $("#splashModal").modal("show");
    console.log(
      "%c Where is your cookie ? :O ",
      "background: #fff; color: #000"
    );

    localStorage.setItem("cookieSeen", "shown");
  } else {
    console.log(
      "%c You have a cookie! :) ",
      "background: #000; color: #bada55"
    );
  }

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
      userConfirmPassword: {
        required: "Please enter a password confirmation.",
        minlength: "Your password must be atleast 5 characters.",
        equalTo: "Please enter the same password as above.",
      },
    },
  });
  // Phone extension flags
  let countryCodePhone = document.querySelector("#phoneNum");
  window.intlTelInput(countryCodePhone);
});
