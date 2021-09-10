$(document).ready(function () {
  $("#menuTrigger, #main-menu .close-menu").on("click", function () {
    $("#main-menu").toggleClass("active");
    $("body").toggleClass("overflow-hidden");
  });

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
      $(".filter-dropdown").toggle();
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
});
