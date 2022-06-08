$(function () {
  $(".navbar-toggler").click(function () {
    if ($(".navbar-toggler").attr("aria-expanded") === "true") {
      $(this)
        .find(".navbar-toggler-icon")
        .addClass("navbar-toggler-icon-active");
    } else {
      $(this)
        .find(".navbar-toggler-icon")
        .removeClass("navbar-toggler-icon-active");
    }
  });

  var audioBar = document.getElementById("audio-bar");
  var songID = 0;
  var currentSong = new Audio(`media/songs/${songID}.mp3`);

  var songs = [
    {
      songName: "Dhoka Dhadi",
      filePath: "media/songs/0.mp3",
      imgPath: "media/covers/dhokhadhadi.jpg",
      songTime: "4:18",
    },
    {
      songName: "Yeh Junoon",
      filePath: "media/songs/1.mp3",
      imgPath: "media/covers/yehjunoon.jpg",
      songTime: "2:04",
    },
    {
      songName: "Mast Magan",
      filePath: "media/songs/2.mp3",
      imgPath: "media/covers/mastmagan.jpg",
      songTime: "4:40",
    },
    {
      songName: "Kabira",
      filePath: "media/songs/3.mp3",
      imgPath: "media/covers/kabira.jpg",
      songTime: "4:11",
    },
    {
      songName: "Ilahi",
      filePath: "media/songs/4.mp3",
      imgPath: "media/covers/ilahi.jpg",
      songTime: "3:23",
    },
    {
      songName: "Lo Maan Liya",
      filePath: "media/songs/5.mp3",
      imgPath: "media/covers/lomaanliya.jpg",
      songTime: "4:59",
    },
    {
      songName: "Hawayein",
      filePath: "media/songs/6.mp3",
      imgPath: "media/covers/hawayein.jpg",
      songTime: "4:51",
    },
    {
      songName: "Tere Sang Yaara",
      filePath: "media/songs/7.mp3",
      imgPath: "media/covers/teresangyaara.jpg",
      songTime: "4:58",
    },
    {
      songName: "Jaan Ban Gaye",
      filePath: "media/songs/8.mp3",
      imgPath: "media/covers/jaanbangaye.jpg",
      songTime: "3:43",
    },
    {
      songName: "Sau Aasmaan",
      filePath: "media/songs/9.mp3",
      imgPath: "media/covers/sauaasmaan.jpg",
      songTime: "4:11",
    },
  ];

  $(".song-item").each((i) => {
    $(".song-img")[i].src = songs[i].imgPath;
    $(".song-name")[i].innerText = songs[i].songName;
    $(".song-time")[i].innerText = songs[i].songTime;
  });

  $("#play-main").click(() => {
    let tarName = currentSong.src.split(/(\\|\/)/g).pop();
    let tarID = tarName.split(".").slice(0, -1).join(".");

    if (currentSong.paused || currentSong.currentTime <= 0) {
      currentSong.play();

      $("#play-main").removeClass("bi bi-play-circle");
      $("#play-main").addClass("bi bi-pause-circle");

      $(".cs-gif").css("opacity", "1");

      $(".cs-name")[0].innerText = `— ${songs[songID].songName} —`;
      $(".cs-name").css("opacity", "1");

      $(`#${tarID}`).removeClass("bi bi-play-circle");
      $(`#${tarID}`).addClass("bi bi-pause-circle");

      var totalTimeMin = parseInt(currentSong.duration / 60);
      var totalTimeSec = parseInt(currentSong.duration % 60);
      if (totalTimeMin <= 9) {
        totalTimeMin = "0" + totalTimeMin;
      }
      if (totalTimeSec < 2) {
        totalTimeSec = "0" + totalTimeSec;
      }
      $(".total-time")[0].innerText = `${totalTimeMin}:${totalTimeSec}`;
    } else {
      currentSong.pause();

      $("#play-main").removeClass("bi bi-pause-circle");
      $("#play-main").addClass("bi bi-play-circle");

      $(".cs-gif").css("opacity", "0");

      $(`#${tarID}`).removeClass("bi bi-ause-circle");
      $(`#${tarID}`).addClass("bi bi-play-circle");
    }
  });

  $(currentSong).on("timeupdate", () => {
    let tarName = currentSong.src.split(/(\\|\/)/g).pop();
    let tarID = tarName.split(".").slice(0, -1).join(".");

    let progress = parseInt(
      (currentSong.currentTime / currentSong.duration) * 100
    );
    $(audioBar).val(progress);

    var progressTimeMin = parseInt(currentSong.currentTime / 60);
    var progressTimeSec = parseInt(currentSong.currentTime % 60);
    if (progressTimeMin <= 9) {
      progressTimeMin = "0" + progressTimeMin;
    }
    if (progressTimeSec <= 9) {
      progressTimeSec = "0" + progressTimeSec;
    }
    $(".start-time")[0].innerText = `${progressTimeMin}:${progressTimeSec}`;

    if (progress >= 100) {
      currentSong.currentTime = 0;

      $("#play-main").removeClass("bi bi-pause-circle");
      $("#play-main").addClass("bi bi-play-circle");

      $(".cs-gif").css("opacity", "0");
      $(".cs-name").css("opacity", "0");

      $(`#${tarID}`).removeClass("bi bi-pause-circle");
      $(`#${tarID}`).addClass("bi bi-play-circle");
    }
  });

  $(audioBar).on("change", () => {
    $(currentSong)[0].currentTime =
      ($(audioBar).val() * currentSong.duration) / 100;
  });

  const makeAllPlay = () => {
    $(".sec-play").each((element) => {
      $($(".sec-play")[element]).removeClass("bi bi-pause-circle");
      $($(".sec-play")[element]).addClass("bi bi-play-circle");
    });
  };

  $(".sec-play").each((element) => {
    $($(".sec-play")[element]).click((i) => {
      makeAllPlay();

      songID = parseInt(i.target.id);

      if ($(i.target).attr("class") == "sec-play bi-play-circle bi") {
        $(i.target).removeClass("bi bi-play-circle");
        $(i.target).addClass("bi bi-pause-circle");

        let tarName = currentSong.src.split(/(\\|\/)/g).pop();
        if (tarName != `${songID}.mp3`) {
          currentSong.currentTime = 0;
          currentSong.src = `media/songs/${songID}.mp3`;
        }

        currentSong.play();

        $("#play-main").removeClass("bi bi-play-circle");
        $("#play-main").addClass("bi bi-pause-circle");

        $(".cs-gif").css("opacity", "1");

        $(".cs-name")[0].innerText = `— ${songs[songID].songName} —`;
        $(".cs-name").css("opacity", "1");

        $(currentSong).on("loadeddata", () => {
          var totalTimeMin = parseInt(currentSong.duration / 60);
          var totalTimeSec = parseInt(currentSong.duration % 60);

          if (totalTimeMin <= 9) {
            totalTimeMin = "0" + totalTimeMin;
          }
          if (totalTimeSec <= 9) {
            totalTimeSec = "0" + totalTimeSec;
          }

          $(".total-time")[0].innerText = `${totalTimeMin}:${totalTimeSec}`;
        });
      } else {
        currentSong.pause();

        $("#play-main").removeClass("bi bi-pause-circle");
        $("#play-main").addClass("bi bi-play-circle");

        $(".cs-gif").css("opacity", "0");
      }
    });
  });

  $("#forward-main").click(() => {
    if (songID >= songs.length - 1) {
      songID = 0;

      $(`#${songID}`).removeClass("bi bi-play-circle");
      $(`#${songID}`).addClass("bi bi-pause-circle");

      $(`#${songs.length - 1}`).addClass("bi bi-play-circle");
      $(`#${songs.length - 1}`).removeClass("bi bi-pause-circle");
    } else {
      songID += 1;

      $(`#${songID}`).removeClass("bi bi-play-circle");
      $(`#${songID}`).addClass("bi bi-pause-circle");

      $(`#${songID - 1}`).addClass("bi bi-play-circle");
      $(`#${songID - 1}`).removeClass("bi bi-pause-circle");
    }

    currentSong.currentTime = 0;
    currentSong.src = `media/songs/${songID}.mp3`;
    currentSong.play();

    $("#play-main").removeClass("bi bi-play-circle");
    $("#play-main").addClass("bi bi-pause-circle");

    $(".cs-gif").css("opacity", "1");

    $(".cs-name")[0].innerText = `— ${songs[songID].songName} —`;
    $(".cs-name").css("opacity", "1");

    $(currentSong).on("loadeddata", () => {
      var totalTimeMin = parseInt(currentSong.duration / 60);
      var totalTimeSec = parseInt(currentSong.duration % 60);

      if (totalTimeMin <= 9) {
        totalTimeMin = "0" + totalTimeMin;
      }
      if (totalTimeSec <= 9) {
        totalTimeSec = "0" + totalTimeSec;
      }

      $(".total-time")[0].innerText = `${totalTimeMin}:${totalTimeSec}`;
    });
  });

  $("#backward-main").click(() => {
    if (songID <= 0) {
      songID = songs.length - 1;

      $(`#${songID}`).removeClass("bi bi-play-circle");
      $(`#${songID}`).addClass("bi bi-pause-circle");

      $(`#${0}`).addClass("bi bi-play-circle");
      $(`#${0}`).removeClass("bi bi-pause-circle");
    } else {
      songID -= 1;

      $(`#${songID}`).removeClass("bi bi-play-circle");
      $(`#${songID}`).addClass("bi bi-pause-circle");

      $(`#${songID + 1}`).addClass("bi bi-play-circle");
      $(`#${songID + 1}`).removeClass("bi bi-pause-circle");
    }

    currentSong.currentTime = 0;
    currentSong.src = `media/songs/${songID}.mp3`;
    currentSong.play();

    $("#play-main").removeClass("bi bi-play-circle");
    $("#play-main").addClass("bi bi-pause-circle");

    $(".cs-gif").css("opacity", "1");

    $(".cs-name")[0].innerText = `— ${songs[songID].songName} —`;
    $(".cs-name").css("opacity", "1");

    $(currentSong).on("loadeddata", () => {
      var totalTimeMin = parseInt(currentSong.duration / 60);
      var totalTimeSec = parseInt(currentSong.duration % 60);

      if (totalTimeMin <= 9) {
        totalTimeMin = "0" + totalTimeMin;
      }
      if (totalTimeSec < 2) {
        totalTimeSec = "0" + totalTimeSec;
      }

      $(".total-time")[0].innerText = `${totalTimeMin}:${totalTimeSec}`;
    });
  });

  $("#main-voldown").on("click", () => {
    if (currentSong.volume >= 0.1) {
      currentSong.volume -= 0.1;
    }
  });

  $("#main-volup").on("click", () => {
    if (currentSong.volume <= 0.9) {
      currentSong.volume += 0.1;
    }
  });
});
