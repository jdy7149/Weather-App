import "./styles/reset.css";
import "./styles/styles.css";

import populateContent, { searchInput, searchBtn } from "./scripts/populateContent";

searchBtn.addEventListener("click", () => {
  const loca = searchInput.value;

  if (loca === "") {
    window.alert("Please enter location.");
    return;
  }

  populateContent(loca);

  searchInput.value = "";
});
