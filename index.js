// URL과 옵션을 전역변수로 선언
const url =
  "https://api.themoviedb.org/3/movie/top_rated?language=ko-kr&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTY4M2RiNzQxZDBlNTRmNzMyNDkyNDkxYzQ1ZGEzZCIsInN1YiI6IjY0NzA5ZTYyMTNhMzIwMDEzMzg2MTIwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GJG5Wlc4JB9RrqO2gMejYtLD5UkkVx0U5pZk9lKic_s",
  },
};

// 카드, 데이터 만들어주기
function createCard(movieData) {
  const { title, poster_path, vote_average, overview, id } = movieData;

  const cardList = document.querySelector(".card-list");

  const card = document.createElement("div");
  card.className = "card";
  // ID 알림 창으로 띄우기
  card.onclick = function () {
    alert(`영화 ID : ${id}`);
  };

  // HTML에 추가
  const image = document.createElement("img");
  image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  image.className = "poster_path";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const titleElement = document.createElement("h4");
  titleElement.textContent = title;

  const starElement = document.createElement("p");
  starElement.className = "vote_average";
  starElement.textContent = `★ ${vote_average}`;

  const overviewElement = document.createElement("p");
  overviewElement.textContent = overview;

  cardBody.appendChild(titleElement);
  cardBody.appendChild(starElement);
  cardBody.appendChild(overviewElement);

  card.appendChild(image);
  card.appendChild(cardBody);

  cardList.appendChild(card);
}

function movie() {
  fetch(url, options)
    .then((response) => response.json()) // API 응답을 JSON 형식으로 변환
    .then((data) => {
      const movieList = data.results; // API에서 가져온 영화 목록 배열
      movieList.forEach((movieData) => {
        createCard(movieData); // 각 영화 데이터를 사용하여 카드 생성
      });
    });
}

movie(); // 영화 데이터를 가져와서 카드 생성
