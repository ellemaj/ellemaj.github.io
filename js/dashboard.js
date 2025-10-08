document.addEventListener("DOMContentLoaded", () => {
  updateProgress();
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
    if (cells.length < 4) return; // sla lege rijen over

    // Bepaal kolomindexen afhankelijk van rowspan (bloknummer)
    let vakIndex, ecIndex, cijferIndex;

    if (cells.length === 5) {
      // Rij mét bloknummer
      vakIndex = 1;
      ecIndex = 2;
      cijferIndex = 4;
    } else {
      // Rij zonder bloknummer (onder rowspan)
      vakIndex = 0;
      ecIndex = 1;
      cijferIndex = 3;
    }

    const ecValue = parseFloat(cells[ecIndex].textContent.replace(",", "."));
    const gradeCell = cells[cijferIndex];
    const gradeInput = gradeCell.querySelector(".grade-input");

    let grade = null;
    if (gradeInput) {
      grade = parseFloat(gradeInput.value);
    } else {
      grade = parseFloat(gradeCell.textContent.replace(",", "."));
    }

    // Reset kleur (behalve bloknummer)
    for (let i = vakIndex; i < cells.length; i++) {
      cells[i].classList.remove("behaald", "onvoldoende");
    }

    if (!isNaN(grade) && grade >= 5.5) {
      totalEC += ecValue;
      for (let i = vakIndex; i < cells.length; i++) {
        cells[i].classList.add("behaald");
      }
    } else if (!isNaN(grade)) {
      for (let i = vakIndex; i < cells.length; i++) {
        cells[i].classList.add("onvoldoende");
      }
    }
  });

  // Update voortgangsbalk
  const percentage = Math.min((totalEC / maxEC) * 100, 100);
  progressBar.style.width = `${percentage}%`;

  // Update tekst
  ecText.textContent = `${totalEC.toFixed(1)} / ${maxEC} EC behaald`;
}
