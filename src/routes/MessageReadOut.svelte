<script>
  export let messages;

  function readOutMessage(messages) {
    let message;
    if (messages.features.length > 0) {
      let lastMessage = messages.features[messages.features.length - 1];
      let latitude_to_print = "coordinates not found";
      let longitude_to_print = "coordinates not found";
      console.log(lastMessage.geometry.coordinates);
      // arr.includes(undefined);
      if (!lastMessage.geometry.coordinates.includes(undefined)) {
        latitude_to_print = lastMessage.geometry.coordinates[1].toFixed(6);
        longitude_to_print = lastMessage.geometry.coordinates[0].toFixed(6);
      }
      message =
        lastMessage.properties.input +
        ": " +
        lastMessage.properties.value +
        " at (" +
        // concatenate to level of individual humans https://en.wikipedia.org/wiki/Decimal_degrees#Precision
        latitude_to_print +
        ", " +
        longitude_to_print +
        ")";
    } else {
      message = " ";
    }
    return message;
  }
</script>

<p id="read-out">
  {readOutMessage(messages)}
</p>
