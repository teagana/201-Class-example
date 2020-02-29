// WASTED CORE JAVASCRIPT

// TABLE OF CONTENTS

// 1. NAVBAR COLLAPSE/Expand

// 2.

//NAVBAR COLLAPSE/EXPAND

// Collapse/Expand icon
$("#collapse-icon").addClass("fa-angle-double-left");

// Collapse click
$("[data-toggle=sidebar-collapse]").click(function() {
  SidebarCollapse();
});

function SidebarCollapse() {
  $(".menu-collapsed").toggleClass("d-none");
  $("#sidebar-container").toggleClass("sidebar-expanded sidebar-collapsed");

  // Treating d-flex/d-none on separators with title
  var SeparatorTitle = $(".sidebar-separator-title");
  var HeaderText = $(".toggle");
  var AddIngred = $("#nav-add");
  if ($("#collapse-icon").hasClass("fa-angle-double-right")) {
    // SeparatorTitle.removeClass('d-flex');

    HeaderText.css("display", "inline-block");
    // $(".toggle").css("display", "inline-block");
    // $(".toggle").show();

    AddIngred.removeClass("sidebar-collapsed");
    $("#nav-add").css("width", "230px");
  } else {
    SeparatorTitle.addClass("d-flex");
    $(".list-group").css("background-color", "#a0d468");

    HeaderText.css("display", "none");
    // $(".toggle").hide();

    AddIngred.addClass("sidebar-collapsed");
    $("#nav-add").css("width", "auto");
  }

  // Collapse/Expand icon
  $("#collapse-icon").toggleClass("fa-angle-double-left fa-angle-double-right");
}

//
