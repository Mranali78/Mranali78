let currentPage = 1;
const rowsPerPage = 5;

function searchTable() {
  var input, filter, table, tr, td, i, j, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
    tr[i].style.display = "none";
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      if (td[j]) {
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        }
      }
    }
  }
}

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (dir === "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount === 0 && dir === "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  paginateTable();
}

// pagination
document.addEventListener("DOMContentLoaded", () => {
  const rowsPerPage = 10;
  const table = document
    .getElementById("myTable")
    .getElementsByTagName("tbody")[0];
  const totalRows = table.getElementsByTagName("tr").length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginationDiv = document.getElementById("pagination");

  const createPagination = () => {
    paginationDiv.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.innerText = i;
      button.className = "pagination-button";
      button.addEventListener("click", () => changePage(i));
      paginationDiv.appendChild(button);
    }
  };

  const changePage = (pageNumber) => {
    const start = (pageNumber - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    Array.from(table.getElementsByTagName("tr")).forEach((row, index) => {
      row.style.display = index >= start && index < end ? "" : "none";
    });
    updateActiveButton(pageNumber);
  };

  const updateActiveButton = (pageNumber) => {
    Array.from(
      paginationDiv.getElementsByClassName("pagination-button")
    ).forEach((button, index) => {
      button.classList.toggle("active", index + 1 === pageNumber);
    });
  };

  // Initialize
  createPagination();
  changePage(1);
});
