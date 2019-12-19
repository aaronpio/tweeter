$(document).ready(() => {
  $("textarea").focus();

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //----------------------------------------------
  const createTweetElement = tweetObj => {
    const htmlInjection = `
  <article>
     <header>
       <div class="profName">
         <img src="${tweetObj.user.avatars}" />
         <h4>${tweetObj.user.name}</h4>
       </div>
       <div class="handle">${tweetObj.user.handle}</div>
     </header>
     <main>${escape(tweetObj.content.text)}</main>
     <footer>
       ${tweetObj.created_at}
     </footer>
    </article>
   `;

    return $(htmlInjection)[0];
  };

  //-----------------------------------------------------

  const renderTweet = tweet => {
    let tweetElement = createTweetElement(tweet);
    $(".tweetList").prepend(tweetElement);
  };
  //-----------------------------------------------------

  const renderTweets = tweets => {
    for (const tweet of tweets) {
      let tweetElement = createTweetElement(tweet);
      $(".tweetList").prepend(tweetElement);
    }
  };

  //-----------------------------------------------------
  //Function can take in GET or POST requests and handle them with AJAX
  const requestTweet = (method, url, data) => {
    $.ajax({
      method,
      url,
      data
    })
      .done(function(result) {
        if (result) {
          //does nothing for POSTS, rendersTweets for GET
          renderTweet(result.slice(-1)[0]);
        }
      })
      .fail(function(error) {
        console.log("Error: " + error);
      })
      .always(function() {
        console.log("request completed");
      });
  };

  //-----------------------------------------------------
  //Function can take in GET or POST requests and handle them with AJAX
  const requestTweets = (method, url, data) => {
    $.ajax({
      method,
      url,
      data
    })
      .done(function(result) {
        if (result) {
          //does nothing for POSTS, rendersTweets for GET
          renderTweets(result);
        } else {
          requestTweet("GET", "/tweets");
        }
      })
      .fail(function(error) {
        console.log("Error: " + error);
      })
      .always(function() {
        console.log("request completed");
      });
  };

  requestTweets("GET", "/tweets");

  //-----------------------------------------------------

  $("#tweetForm").click(function() {
    $("#errMsg").remove();
  });

  $("#tweetForm").on("submit", function(event) {
    event.preventDefault();
    const charCountValue =
      $(this)
        .val("text")
        .serialize().length - 5;

    if (charCountValue > 140) {
      $(".container").prepend(
        '<h5 id="errMsg">🚨 🚨 🚨 Your tweet is too long; Please condense and re-submit 🚨 🚨 🚨</h5>'
      );
    } else if (charCountValue === 0) {
      $(".container").prepend(
        '<h5 id="errMsg">🚨 🚨 🚨 You haven\'t entered a tweet; Please brainstorm and re-submit 🚨 🚨 🚨</h5>'
      );
    } else {
      const input = $(this)
        .val("text")
        .serialize();

      requestTweets("POST", "/tweets", input);

      //clear the input field and counter after "tweet" button press:
      $($(this).children()[0]).val("");
      $(
        $(this)
          .children("div")
          .children()[1]
      ).text("140");
    }
  });

  //-----------------------------------------------------

  $(".scrollBtn").on("click", () => {
    $("#errMsg").remove();
    $(".new-tweet").slideToggle(() => {
      window.scrollTo(0, -10000);
      $("textarea").focus();
    });
  });

  //-----------------------------------------------------
});
