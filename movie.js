const url = new URL(location.href); 
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")

const APILINK = 'http://127.0.0.1:8000/api/reviews/';

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
          <h3>How was the movie? Would you like to share your views here.</h3>
          <p>
          <strong>User: </strong><br>
            <input type="text" id="new_user" value="">
          </p> 
          <p>
          <strong>Review: </strong><br>
            <textarea rows="5" columns="100" id="new_review" value=""></textarea>
          </p>  
          <a id="saveButton" href="#" onclick="saveReview('new_review', 'new_user')"> SAVE 💾</a>
       </div>
    </div>
  </div>
`
main.appendChild(div_new)

returnReviews(APILINK);

function returnReviews(url){
  fetch(url + "movie/" + movieId).then(res => res.json())
  .then(function(data){
  console.log(data);
  data.forEach(review => {
      const div_card = document.createElement('div');
      div_card.innerHTML = `
          <div class="row">
            <div class="column">
              <div class="card" id="${review._id}">
                <p><strong>Review: </strong>${review.review}</p>
                <p><strong>By: </strong>${review.user}</p>
                <p><a id="editButton" href="#" onclick="editReview('${review._id}','${review.review}', '${review.user}')">EDIT ✏️</a> <a id="deleteButton" href="#" onclick="deleteReview('${review._id}')">Delete 🗑</a></p>
              </div>
            </div>
          </div>
        `

      main.appendChild(div_card);
    });
  });
}

function editReview(id, review, user) {

  const element = document.getElementById(id);
  const reviewInputId = "review" + id
  const userInputId = "user" + id
  
  element.innerHTML = `
              <p><strong>Review: </strong>
                <input type="text" id="${reviewInputId}" value="${review}">
              </p>
              <p><strong>User: </strong>
                <input type="text" id="${userInputId}" value="${user}">
              </p>
              <p><a id="saveButton" href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">SAVE 💾</a>
              </p>
  
  `
}

function saveReview(reviewInputId, userInputId, id="") {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  if (id) {
    fetch(APILINK + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"user": user, "review": review})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });        
  } else {
    fetch(APILINK + "new", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  }
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });    
}