function handleSearch(event) {
  event.preventDefault();

  const searchString = document.querySelector("#search-input").value;
  if (searchString === "") {
    alert("검색어를 입력하세요!"); // 검색어가 비어있을 경우 알림을 표시하고 함수 종료
    return;
  }

  // TMDB API
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTE5ZjU0OTI3NWEyM2VjNjViNTRkZmQ2MTUyYTA4NiIsInN1YiI6IjY0NzA4YTllNzcwNzAwMDBhOTQ3ZDdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3W-E9KnuKEWvia4zXrXpCRKfHz9a5clH7RjrUwJD8iY",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=ko-kr&page=1",
    options
  )
    .then((response) => response.json()) // API 응답을 JSON 형식으로 변환
    .then((data) => {
      let rows = data["results"]; // API에서 가져온 영화 목록 배열
      let upperSearch = searchString.toUpperCase(); // 대소문자 구분 없이 검색하기 위해 입력된 검색어를 대문자로 변환
      let noarray = [];

      // API에서 가져온 영화 목록에서 각 영화의 제목을 대문자로 변환하여 배열에 저장
      for (let i = 0; i < rows.length; i++) {
        noarray.push(rows[i]["title"].toUpperCase());
      }

      // 대문자로 변환된 영화 제목 배열에서 검색어를 포함하는 제목만 필터링
      let filteredtitlearray = noarray.filter(function (item) {
        return item.includes(upperSearch);
      });

      if (filteredtitlearray.length === 0) {
        alert("찾으시는 영화가 없습니다!"); // 검색 결과가 없을 경우 알림을 표시하고 함수 종료
        return;
      }

      const cardsContainer = document.getElementById("cards");
      cardsContainer.innerHTML = "";

      // 각 영화 정보를 HTML로 변환하여 화면에 표시
      rows.forEach((a) => {
        let title = a["title"];
        let Title = title.toUpperCase();
        let poster_path = "https://image.tmdb.org/t/p/w500" + a["poster_path"];
        let overview = a["overview"];
        let vote_average = a["vote_average"];
        let id = a["id"];
        let temp = `<div class="card">
                      <div class="card-body" onclick='alert("영화 ID : ${id}")'>
                        <img src="${poster_path}" class="poster_path">
                        <div class="card-body">
                          <h4 class="cardtitle">${title}</h4>
                          <p class="vote_average">★ ${vote_average}</p>
                          <p class="overview">${overview}</p>
                        </div>
                      </div>
                    </div>`;

        if (Title.includes(upperSearch)) {
          cardsContainer.insertAdjacentHTML("beforeend", temp); // 검색어를 포함하는 영화만 화면에 추가
        }
      });
    });
}
