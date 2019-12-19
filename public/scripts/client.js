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

  //called in requestTweet to prepend the new tweet to top of list
  const renderTweet = tweet => {
    let tweetElement = createTweetElement(tweet);
    $(".tweetList").prepend(tweetElement);
  };
  //-----------------------------------------------------

  //called in requestTweets at startup to render all the tweets
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
  // - GET only called at startup to list all tweets
  // - POST called on new tweet form input to save tweet, as well as make a GET call to requestTweet that gets the new tweet, and ultimately renders it

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
          //GET request here to ultimately render the new tweet
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

  //Calls GET to list initial Database tweets at startup
  requestTweets("GET", "/tweets");

  //-----------------------------------------------------

  //Remove error message with refocus on textarea
  $("#tweetForm").click(function() {
    $("#errMsg").remove();
  });

  //Takes input and saves to database, then calls requestTweets with post to render jsut the new tweet
  // Does Error handling of input (with jquery)
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

  //Hides/shows new tweet form (also removes error(if any) for cleaner UI)
  $(".scrollBtn").on("click", () => {
    $("#errMsg").remove();
    $(".new-tweet").slideToggle(() => {
      window.scrollTo(0, -10000);
      $("textarea").focus();
    });
  });

  //-----------------------------------------------------
});
