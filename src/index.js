import "./reset.css";
import "./styles.css";

import populateContent, { searchInput, searchBtn } from "./populateContent";

searchBtn.addEventListener("click", () => {
  const loca = searchInput.value;

  populateContent(loca);

  searchInput.value = "";
});
