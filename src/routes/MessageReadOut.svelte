<script>
  export let messages;

  function readOutMessage(messages) {
    let message;
    if (messages.length > 0) {
      let lastMessage = messages[messages.length - 1];
      message =
        lastMessage.input +
        ": " +
        lastMessage.value +
        " at (" +
        // concatenate to level of individual humans https://en.wikipedia.org/wiki/Decimal_degrees#Precision
        lastMessage.latitude.toFixed(6) +
        ", " +
        lastMessage.longitude.toFixed(6) +
        ")";
      //   JSON.stringify(messages[messages.length - 1]);
    } else {
      message = " ";
    }
    return message;
  }
</script>

<p id="read-out">
  {readOutMessage(messages)}
</p>
