$(document).ready(() => {
  //--------------------------------------------------
  $("textarea").on("keyup", function() {
    const charCountValue = $(this).val().length;

    const counter = $("textarea")
      .siblings()
      .children()[1];

    let counterNumber = 140 - charCountValue;

    if (charCountValue > 140) {
      $(counter)
        .text(counterNumber)
        .css("color", "red");
    } else {
      $(counter)
        .text(counterNumber)
        .css("color", "black");
    }
  });
});
