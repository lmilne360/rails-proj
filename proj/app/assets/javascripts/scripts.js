$(function() {
    addComment();
    toggleComments();
    toggleFave();
});


function addComment() {
    $(document).on("submit", '#new_comment', function(e) {
        e.preventDefault();
        var values = $(this).serialize();
        var posting = $.post("/comments.js", values);
        // get template
        var templateScript = $("#comment-template").html();

        //compile templateScript
        var template = Handlebars.compile(templateScript);

        posting.done(function(data){
          console.log(data);
          //pass data to template
          var commentHTML = template(data);
          //Add the compiled html to pahe
          $('#comments').append(commentHTML);

          //Increase comment counter
          var size = parseInt($('#comment-size').html());
          size ++;
          $('#comment-size').html(size);

          //reset form submit button
          $('#new_comment input[type=submit]').attr('disabled', false);

          $('#comment_body').val('');
        });
    });
}


function toggleComments() {
  $(document).on("click",'#comments-toggle', function(e){
    e.preventDefault();
    $("#comments").fadeToggle("slow");
  });
}

function toggleFave() {
  $(document).on("click", ".link div.btn", function(e){
    var item = $(this).parent().closest('div');
    var id = $(this).attr('btn-id');
    item.toggleClass('fave');
    if (item.hasClass('fave')) {
      localStorage.setItem('favourite' + id, 'fave');
    } else {
      localStorage.removeItem('favourite' + id);
    }

  });
}
