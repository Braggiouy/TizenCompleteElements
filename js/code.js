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
  initCheckboxes();
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

// Initiate contextual menu
function initContexts() {
  menuContext = $("#menuContext").caphContextMenu({
    items: [
      {
        id: "c",
        content: "Smart TV",
      },
      {
        id: "m",
        content: "Mobile",
      },
      {
        id: "s",
        content: "Smart Watch",
      },
      {
        id: "c1",
        content: "Neo QLED",
        parent: "c",
      },
      {
        id: "c2",
        content: "QLED",
        parent: c,
      },
      {
        id: "c3",
        content: "The Frame",
        parent: c,
      },
      {
        id: "m1",
        content: "Z Flip4",
        parent: m,
      },
      {
        id: "m2",
        content: "Z Fold4",
        parent: m,
      },
      {
        id: "s1",
        content: "Galaxy Watch 4 Classic",
        parent: "s",
      },
      {
        id: "s2",
        content: "Galaxy Watch 4 Pro",
        parent: "s",
      },
    ],
    focusableDepth: 1,
    onSelectedItem: function ($itemId, $event) {
      console.log($itemId + " selected");
      menuContext.caphContextMenu("close");
      menuContextVisibility = false;
      setTimeout(() => {
        $.caph.focus.controllerProvider.getInstance().setDepth(0, "context");
      }, 100);
    },
  });
}

function initContexting() {
  $("#botonC").caphButton({
    focusOption: {
      group: "context",
    },
    onSelected: function (event, originalEvent, selected) {
      if (menuContext == null) {
        initContexts();
      }

      if (!menuContextVisibility) {
        menuContext.caphContextMenu("open");
        menuContextVisibility = true;
      }
    },
  });
}

// Initiate checkboxes
function initCheckboxes() {
  $("#checkbox1").caphCheckbox({
    focusOption: {
      group: "checkboxes",
    },
    onSelected: function (event, originalEvent, selected) {},
  });
  $("#checkbox2").caphCheckbox({
    focusOption: {
      group: "checkboxes",
      disabled: true,
    },
    onSelected: function (event, originalEvent, selected) {},
  });
  $("#checkbox3").caphCheckbox({
    focusOption: {
      group: "checkboxes",
      checked: true,
    },
    onSelected: function (event, originalEvent, selected) {},
  });
}

// Initiate Radio Buttons
function initRadioButtons() {
  $("#buttonRadio1").caphRadioButton({
    focusOption: {
      group: "radioButton",
    },
    onSelected: function (event, originalEvent, selected) {},
  });

  $("#buttonRadio2").caphRadioButton({
    focusOption: {
      group: "radioButton",
      disabled: true,
    },
    onSelected: function (event, originalEvent, selected) {},
  });

  $("#buttonRadio3").caphRadioButton({
    focusOption: {
      group: "radioButton",
      checked: true,
    },
    onSelected: function (event, originalEvent, selected) {},
  });
}

// Initiate Entries
function initEntries() {
  $("#entry1").caphInput({
    onChanged: function (event, value) {
      console.log("value", value);
    },
    focusOption: {
      group: "textEntry",
    },
    maxLength: 40,
    value: "Default value",
  });

  $("#entry2").caphInput({
    onChanged: function (event, value) {
      console.log("value", value);
    },
    focusOption: {
      group: "textEntry",
    },
    maxLength: 10,
    value: "3",
  });
}
// Initiate Dropdown list
function initDropdowns() {
  dropdown = $("#dropdownList").caphDropdownList({
    items: [
      {
        id: "s",
        content: "Smart TV",
      },
      {
        id: "m",
        content: "Mobile",
      },
      {
        id: "t",
        content: "TV",
        disabled: true,
      },
      {
        id: "w",
        content: "Smart Watch",
      },
    ],
    focusOption: {
      group: "dropdown",
    },
    onSelectItem: function ($itemId, $event) {
      console.log($itemId + " selected");
    },
  });
}

// Initiate List
function initList() {
  $("#listed").caphList({
    items: [
      {
        id: "s",
        content: "Smart TV",
        letter: "S",
      },
      {
        id: "m",
        content: "Mobile",
        letter: "M",
      },
      {
        id: "w",
        content: "Smart Watch",
        letter: "W",
      },
    ],
    template: "template1",
  });
}
