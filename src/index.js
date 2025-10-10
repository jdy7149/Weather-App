import "./styles/reset.css";
import "./styles/styles.css";

import { populateContent, searchForm, searchInput, displayLoading } from "./scripts/displayController";

searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const loca = searchInput.value.trim();
  
  searchInput.setCustomValidity('');

  if (loca === '') {
    searchInput.setCustomValidity('You must enter location.');
    searchInput.reportValidity();
    return;
  }

  displayLoading();

  populateContent(loca);

  searchInput.value = "";
});

searchInput.addEventListener('input', () => {
  searchInput.setCustomValidity('');
});
