var currentPage = "main";
var dialog = null;
var dialogVisibility = false;
var menuContext = null;
var menuContextVisibility = false;

// App initialization
$(document).ready(function () {
  // Cards from main screen controller
  $(".card").on("selected", function (event) {
    var target = $(event.currentTarget).attr("target");
    showPage(target);
  });

  // Return CTA controller
  $(document).on("keydown", function (event) {
    if (event.keyCode == 10009) {
      //Return
      if (currentPage == "main") {
        tizen.application.getCurrentApplication().exit();
      } else if (menuContextVisibility) {
        menuContext.caphContextMenu("close");
        menuContextVisibility = false;
        setTimeout(() => {
          $.caph.focus.controllerProvider.getInstance().setDepth(0, "context");
        }, 100);
      } else if (dialogVisibility) {
        dialog.caphDialog("close");
        dialogVisibility = false;
      } else {
        showPage("main");
      }
    }
  });

  // Initiate all of the components
  initButtons();
  initCheckboxs();
  initDialogs();
  initContexts();
  initRadioButtons();
  initEntries();
  initDropdowns();
  initLists();

  // We show the first window
  showPage("main");

  // Show window and focus the navigation group, both have the same name
  function showPage(pageName) {
    currentPage = pageName;
    $(".page").hide();
    $("#" + pageName).show();
    $.caph.focus.controllerProvider.getInstance().setGroup(pageName);
  }
});

// Initiate buttons from buttons screen
function initButtons() {
  $("#button1").caphButton({
    focusOption: {
      group: "buttons",
    },
    onSelected: function (event, originalEvent, selected) {},
  });
  $("#button2").caphButton({
    focusOption: {
      group: "buttons",
      disabled: true,
    },
    onSelected: function (event, originalEvent, selected) {},
  });
  $("#button3").caphButton({
    focusOption: {
      group: "buttons",
    },
    toggle: true,
    onSelected: function (event, originalEvent, selected) {},
  });
}

// initiate Dialog window
function initDialogs() {
  dialog = $("#dialog").caphDialog({
    center: true,
    focusOption: {
      group: "dialog",
      depth: 1,
    },
    onOpen: function () {
      setTimeout(() => {
        $.caph.focus.controllerProvider.getInstance().setDepth(1, "dialog");
      }, 100);
    },
    onSelected: function (buttonIndex, event) {
      dialog.caphDialog("close");
      dialogVisibility = false;
    },
  });
}

// Initiate the button that opens the dialog window
function initDialoging() {
  $("#botonD").caphButton({
    focusOption: {
      group: "dialoging",
    },
    onSelected: function (event, originalEvent, selected) {
      if (dialog == null) {
        initDialogs();
      }

      if (!dialogVisibility) {
        dialog.caphDialog("open");
        dialogVisibility = true;
      }
    },
  });
}
