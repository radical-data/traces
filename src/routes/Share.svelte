<script>
  const shareData = {
    title: "MDN",
    text: "Learn web development on MDN!",
    url: "https://developer.mozilla.org",
  };

  import jobi from "../jobi.jpg";

  let resultPara = "ye";

  function share() {
    if (!navigator.canShare) {
      resultPara = `Your browser doesn't support the Web Share API.`;
      return;
    }

    if (navigator.canShare({ jobi })) {
      navigator.share({
        shareData,
        title: "Images",
        text: "Beautiful images",
      });
      resultPara = "Shared!";
    }
  }
</script>

<div>
  <label for="files">Select images to share:</label>
  <input id="files" type="file" accept="image/*" multiple />
</div>
<button id="share" type="button" on:click={share}>Share your images!</button>
<p>{resultPara}</p>
<output id="output" />
