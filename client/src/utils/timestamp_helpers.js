function formatDate(dateString) {
  const date = new Date(dateString); 
  // Format the date part
  const datePart = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Format the time part with no extra space before AM/PM
  let timePart = date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/(\d{2}:\d{2})( )([AP]M)/, "$1$3");

  // Concatenate date and time parts with a newline character
  return `${datePart}\n${timePart}`;
}

export default formatDate;
