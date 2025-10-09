import "./reset.css";
import "./styles.css";

import populateContent, { searchInput, searchBtn } from "./populateContent";

searchBtn.addEventListener("click", () => {
  const loca = searchInput.value;

  if (loca === "") {
    window.alert("Please enter location.");
    return;
  }

  populateContent(loca);

  searchInput.value = "";
});
