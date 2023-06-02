// 엔터키 = 클릭과 똑같게 만들기
function btn() {
  // 엔터버튼으로도 입력받기
  button = document.querySelector("button");
  button = focus();
  InputDeviceInfo.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      Filter();
    }
  });
}

