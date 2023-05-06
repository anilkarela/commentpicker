const icon_loaded = document.querySelector(".icon_simple");
const icon_animate = document.querySelector(".icon_animate");


async function fetchData() {
    const search_input = document.querySelector(".search_input");
    let final_url = search_input.value.split("?v=")[1];
   final_url = final_url.match("&t=") ? final_url.split("&t=")[0] : final_url;

    const data = await fetch("https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=AIzaSyB0atlSJzMfSrC4vYyHhFlAaR2mYAag3VA&maxResults=100&videoId="+final_url);
    const finalData = await data.json();
    const count = finalData.items;
    const randomValue = Math.floor(Math.random() * count.length);
    const finalResult = finalData.items[randomValue].snippet.topLevelComment.snippet;
    const close_icon = document.querySelector(".close_icon");
    const winner_image = document.querySelector(".winner_image");
    const winner_name = document.querySelector(".winner_name");
    const winner_comment = document.querySelector(".winner_comment");
    const winner_box = document.querySelector(".winner_box");



    console.log(finalResult);
    const winnerComment = {
        name:finalResult.authorDisplayName,
        comment:finalResult.textDisplay,
        image:finalResult.authorProfileImageUrl,
        like:finalResult.likeCount
    }
    console.log(winnerComment);

    winner_image.src=winnerComment.image;
    winner_name.innerText=winnerComment.name;
    winner_comment.innerText=winnerComment.comment;
    winner_box.style.display="flex";
    icon_loaded.style.display="block";
    icon_animate.style.display="none";

    close_icon.onclick=function(){
        winner_box.style.display="none";
        
    }

}

const search_icon = document.querySelector(".search_icon_box");
search_icon.onclick = function () {
    icon_loaded.style.display="none";
    icon_animate.style.display="block";

    fetchData();


}