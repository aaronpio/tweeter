// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  }
];

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
     <main>${tweetObj.content.text}</main>
     <footer>
       ${tweetObj.created_at}
     </footer>
    </article>
   `;

  return $(htmlInjection)[0];
  //return jQuery.parseHTML(htmlInjection)[1];
};

$(document).ready(() => {
  const renderTweets = tweets => {
    for (const tweet of tweets) {
      let tweetElement = createTweetElement(tweet);
      $("tweetList").append("heyoyoyoyoyoyoyoyoyoy");
      $(".tweetList").append(tweetElement);
      console.log(tweetElement);
    }
  };

  renderTweets(data);
});
