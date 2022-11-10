<script>
  export let messages;

  function readOutMessage(messages) {
    let message;
    if (messages.features.length > 0) {
      let lastMessage = messages.features[messages.features.length - 1];
      message =
        lastMessage.properties.input +
        ": " +
        lastMessage.properties.value +
        " at (" +
        // concatenate to level of individual humans https://en.wikipedia.org/wiki/Decimal_degrees#Precision
        lastMessage.geometry.coordinates[1].toFixed(6) +
        ", " +
        lastMessage.geometry.coordinates[0].toFixed(6) +
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
