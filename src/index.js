import "./styles/reset.css";
import "./styles/styles.css";

import { populateContent, searchInput, searchBtn, displayLoading } from "./scripts/displayController";

searchBtn.addEventListener("click", () => {
  displayLoading();
  
  const loca = searchInput.value;

  if (loca === "") {
    window.alert("Please enter location.");
    return;
  }

  populateContent(loca);

  searchInput.value = "";
});
