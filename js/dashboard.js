document.addEventListener("DOMContentLoaded", () => {
  updateProgress();

  // Als je invoervelden gebruikt (<input class="grade-input">), update live
  document.addEventListener("input", updateProgress);
});

function updateProgress() {
  const rows = document.querySelectorAll(".dashboard_section table tr");
  const progressBar = document.querySelector(".progress");
  const ecText = document.querySelector(".dashboard_section p");

  let totalEC = 0;
  const maxEC = 60;

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length >= 5) {
      const ecValue = parseFloat(cells[2].textContent);
      const gradeCell = cells[4];
      const gradeInput = gradeCell.querySelector(".grade-input");

      // Haal het cijfer op: uit de cel of uit het inputveld
      let grade = null;
      if (gradeInput) {
        grade = parseFloat(gradeInput.value);
      } else {
        grade = parseFloat(gradeCell.textContent.replace(",", "."));
      }

      // Eerst alle oude kleuren verwijderen
      for (let i = 1; i < cells.length; i++) {
        cells[i].classList.remove("behaald", "onvoldoende");
        cells[i].style.backgroundColor = "";
        cells[i].style.color = "";
      }

      // Controleer of het cijfer geldig is
      if (!isNaN(grade) && grade >= 5.5) {
        totalEC += ecValue;
        for (let i = 1; i < cells.length; i++) {
          cells[i].classList.add("behaald");
        }
      } else if (!isNaN(grade)) {
        for (let i = 1; i < cells.length; i++) {
          cells[i].classList.add("onvoldoende");
        }
      }
    }
  });

  // Update voortgangsbalk
  const percentage = (totalEC / maxEC) * 100;
  progressBar.style.width = `${percentage}%`;

  // Update tekst
  ecText.textContent = `${totalEC.toFixed(1)} / ${maxEC} EC behaald`;
}
