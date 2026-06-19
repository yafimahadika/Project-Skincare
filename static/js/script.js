const alerts = document.querySelectorAll(".alert");

alerts.forEach((alertElement) => {
    setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(alertElement);
        alert.close();
    }, 4000);
});

document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
        const inputId = button.getAttribute("data-password-toggle");
        const input = document.getElementById(inputId);

        if (!input) {
            return;
        }

        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        button.innerHTML = isHidden
            ? '<i class="bi bi-eye-slash-fill"></i>'
            : '<i class="bi bi-eye-fill"></i>';
        button.setAttribute("aria-label", isHidden ? "Sembunyikan password" : "Tampilkan password");
        input.focus();
    });
});

document.querySelectorAll(".login-button").forEach((button) => {
    button.addEventListener("click", (event) => {
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.className = "ripple";
        ripple.style.height = `${size}px`;
        ripple.style.width = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 650);
    });
});

document.querySelectorAll(".login-panel form").forEach((form) => {
    form.addEventListener("submit", () => {
        const button = form.querySelector(".login-button");

        if (!button) {
            return;
        }

        const text = button.querySelector("span");
        button.classList.add("is-loading");
        button.disabled = true;

        if (text) {
            text.textContent = button.getAttribute("data-loading-text") || "Memproses...";
        }
    });
});

const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const sidebarStateKey = "wahyuni.sidebarCollapsed";

if (localStorage.getItem(sidebarStateKey) === "true" && window.innerWidth > 992) {
    document.body.classList.add("sidebar-collapsed");
}

function closeMobileSidebar() {
    document.body.classList.remove("sidebar-open");
}

if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
        if (window.innerWidth <= 992) {
            document.body.classList.toggle("sidebar-open");
            return;
        }

        document.body.classList.toggle("sidebar-collapsed");
        localStorage.setItem(sidebarStateKey, document.body.classList.contains("sidebar-collapsed"));
    });
}

if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener("click", closeMobileSidebar);
}

document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", closeMobileSidebar);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
        closeMobileSidebar();
        if (localStorage.getItem(sidebarStateKey) === "true") {
            document.body.classList.add("sidebar-collapsed");
        }
    } else {
        document.body.classList.remove("sidebar-collapsed");
    }
});

const overviewChart = document.getElementById("overviewChart");

if (overviewChart && window.Chart) {
    const produk = Number(overviewChart.dataset.produk || 0);
    const penjualan = Number(overviewChart.dataset.penjualan || 0);
    const klasifikasi = Number(overviewChart.dataset.klasifikasi || 0);

    new Chart(overviewChart, {
        type: "bar",
        data: {
            labels: ["Produk", "Penjualan", "Klasifikasi"],
            datasets: [
                {
                    label: "Jumlah Data",
                    data: [produk, penjualan, klasifikasi],
                    backgroundColor: ["#e875a8", "#ff9f87", "#b66ad6"],
                    borderRadius: 8,
                    borderSkipped: false,
                    maxBarThickness: 58,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: "#75445c",
                    padding: 12,
                    cornerRadius: 8,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: "#9c7088",
                        font: {
                            weight: 700,
                        },
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#a77b94",
                        precision: 0,
                    },
                    grid: {
                        color: "rgba(219, 145, 184, 0.18)",
                    },
                },
            },
        },
    });
}

const topProductChart = document.getElementById("topProductChart");

if (topProductChart && window.Chart) {
    const products = JSON.parse(topProductChart.dataset.products || "[]");
    const labels = products.length ? products.map((item) => item.nama_produk) : ["Belum ada data"];
    const values = products.length ? products.map((item) => item.total_terjual) : [0];

    new Chart(topProductChart, {
        type: "doughnut",
        data: {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: ["#e875a8", "#ff9f87", "#b66ad6", "#f3bf6c", "#70c6ba"],
                    borderColor: "#ffffff",
                    borderWidth: 3,
                    hoverOffset: 8,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "58%",
            plugins: {
                legend: {
                    position: "right",
                    labels: {
                        boxWidth: 12,
                        color: "#75445c",
                        font: {
                            weight: 700,
                        },
                    },
                },
                tooltip: {
                    backgroundColor: "#75445c",
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label(context) {
                            const item = products[context.dataIndex];
                            if (!item) {
                                return "Belum ada data";
                            }

                            return `${item.nama_produk}: ${item.total_terjual} terjual (${item.persentase}%)`;
                        },
                    },
                },
            },
        },
    });
}

document.querySelectorAll(".pretty-select").forEach((wrapper) => {
    const select = wrapper.querySelector("select");

    if (!select || wrapper.querySelector(".pretty-select-button")) {
        return;
    }

    const button = document.createElement("button");
    const menu = document.createElement("div");

    button.type = "button";
    button.className = "pretty-select-button";
    button.innerHTML = `<span>${select.options[select.selectedIndex].textContent}</span><i class="bi bi-chevron-down"></i>`;
    menu.className = "pretty-select-menu";

    Array.from(select.options).forEach((option) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "pretty-select-option";
        item.textContent = option.textContent;
        item.dataset.value = option.value;

        if (option.selected) {
            item.classList.add("active");
        }

        item.addEventListener("click", () => {
            select.value = option.value;
            select.dispatchEvent(new Event("change", { bubbles: true }));
            button.querySelector("span").textContent = option.textContent;
            menu.querySelectorAll(".pretty-select-option").forEach((optionButton) => {
                optionButton.classList.toggle("active", optionButton === item);
            });
            wrapper.classList.remove("open");
        });

        menu.appendChild(item);
    });

    button.addEventListener("click", () => {
        document.querySelectorAll(".pretty-select.open").forEach((openSelect) => {
            if (openSelect !== wrapper) {
                openSelect.classList.remove("open");
            }
        });
        wrapper.classList.toggle("open");
    });

    select.classList.add("native-select-hidden");
    wrapper.appendChild(button);
    wrapper.appendChild(menu);
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".pretty-select")) {
        document.querySelectorAll(".pretty-select.open").forEach((wrapper) => {
            wrapper.classList.remove("open");
        });
    }
});

function normalizeDateInput(value) {
    const cleaned = (value || "").trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
        return cleaned;
    }

    const match = cleaned.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) {
        return "";
    }

    const [, day, month, year] = match;
    return `${year}-${month}-${day}`;
}

function formatDateDisplay(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function parseDisplayDate(value) {
    const normalized = normalizeDateInput(value);

    if (!normalized) {
        return null;
    }

    const [year, month, day] = normalized.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return Number.isNaN(date.getTime()) ? null : date;
}

const monthNamesId = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

const dayNamesId = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function createDatePicker(input) {
    if (input.dataset.datePickerReady === "true") {
        return;
    }

    input.dataset.datePickerReady = "true";
    input.autocomplete = "off";

    const wrapper = document.createElement("span");
    const button = document.createElement("button");
    const picker = document.createElement("div");
    let visibleMonth = parseDisplayDate(input.value) || new Date();

    wrapper.className = "date-input-wrap";
    button.type = "button";
    button.className = "date-picker-button";
    button.setAttribute("aria-label", "Pilih tanggal");
    button.innerHTML = '<i class="bi bi-calendar-heart"></i>';
    picker.className = "date-picker-popover";

    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    wrapper.appendChild(button);
    document.body.appendChild(picker);

    function positionPicker() {
        const rect = wrapper.getBoundingClientRect();
        const pickerWidth = picker.offsetWidth || 260;
        const viewportGap = 12;
        let left = rect.left;
        let top = rect.bottom + 8;

        if (left + pickerWidth > window.innerWidth - viewportGap) {
            left = window.innerWidth - pickerWidth - viewportGap;
        }

        if (left < viewportGap) {
            left = viewportGap;
        }

        picker.style.left = `${left}px`;
        picker.style.top = `${top}px`;
    }

    function closeOtherPickers() {
        document.querySelectorAll(".date-picker-popover.open").forEach((openPicker) => {
            if (openPicker !== picker) {
                openPicker.classList.remove("open");
            }
        });
    }

    function selectDate(date) {
        input.value = formatDateDisplay(date);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
        picker.classList.remove("open");
        input.focus();
    }

    function renderPicker() {
        const year = visibleMonth.getFullYear();
        const month = visibleMonth.getMonth();
        const selectedDate = parseDisplayDate(input.value);
        const today = new Date();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        picker.innerHTML = "";

        const header = document.createElement("div");
        const monthSelect = document.createElement("select");
        const yearSelect = document.createElement("select");
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        const selectorGroup = document.createElement("div");

        header.className = "date-picker-header";
        selectorGroup.className = "date-picker-selectors";
        monthSelect.className = "date-picker-select";
        yearSelect.className = "date-picker-select";
        prevButton.type = "button";
        nextButton.type = "button";
        prevButton.setAttribute("aria-label", "Bulan sebelumnya");
        nextButton.setAttribute("aria-label", "Bulan berikutnya");
        prevButton.innerHTML = '<i class="bi bi-chevron-left"></i>';
        nextButton.innerHTML = '<i class="bi bi-chevron-right"></i>';

        monthNamesId.forEach((name, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = name;
            option.selected = index === month;
            monthSelect.appendChild(option);
        });

        for (let optionYear = year - 10; optionYear <= year + 10; optionYear += 1) {
            const option = document.createElement("option");
            option.value = optionYear;
            option.textContent = optionYear;
            option.selected = optionYear === year;
            yearSelect.appendChild(option);
        }

        selectorGroup.appendChild(monthSelect);
        selectorGroup.appendChild(yearSelect);
        header.appendChild(prevButton);
        header.appendChild(selectorGroup);
        header.appendChild(nextButton);
        picker.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "date-picker-grid";

        dayNamesId.forEach((name) => {
            const dayLabel = document.createElement("span");
            dayLabel.className = "date-picker-day-name";
            dayLabel.textContent = name;
            grid.appendChild(dayLabel);
        });

        for (let index = 0; index < firstDay; index += 1) {
            grid.appendChild(document.createElement("span"));
        }

        for (let day = 1; day <= lastDate; day += 1) {
            const date = new Date(year, month, day);
            const dayButton = document.createElement("button");
            dayButton.type = "button";
            dayButton.className = "date-picker-day";
            dayButton.textContent = day;

            if (
                selectedDate &&
                date.getFullYear() === selectedDate.getFullYear() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getDate() === selectedDate.getDate()
            ) {
                dayButton.classList.add("selected");
            }

            if (
                date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate()
            ) {
                dayButton.classList.add("today");
            }

            dayButton.addEventListener("click", () => selectDate(date));
            grid.appendChild(dayButton);
        }

        picker.appendChild(grid);

        const footer = document.createElement("div");
        footer.className = "date-picker-footer";
        footer.innerHTML = `
            <button type="button" data-clear-date>Clear</button>
            <button type="button" data-today-date>Hari ini</button>
        `;
        picker.appendChild(footer);

        prevButton.addEventListener("click", () => {
            visibleMonth = new Date(year, month - 1, 1);
            renderPicker();
            positionPicker();
        });

        nextButton.addEventListener("click", () => {
            visibleMonth = new Date(year, month + 1, 1);
            renderPicker();
            positionPicker();
        });

        monthSelect.addEventListener("change", () => {
            visibleMonth = new Date(year, Number(monthSelect.value), 1);
            renderPicker();
            positionPicker();
        });

        yearSelect.addEventListener("change", () => {
            visibleMonth = new Date(Number(yearSelect.value), month, 1);
            renderPicker();
            positionPicker();
        });

        picker.querySelector("[data-clear-date]").addEventListener("click", () => {
            input.value = "";
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
            picker.classList.remove("open");
            input.focus();
        });

        picker.querySelector("[data-today-date]").addEventListener("click", () => selectDate(new Date()));
    }

    picker.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    button.addEventListener("click", (event) => {
        event.stopPropagation();
        closeOtherPickers();
        visibleMonth = parseDisplayDate(input.value) || new Date();
        renderPicker();
        picker.classList.toggle("open");
        if (picker.classList.contains("open")) {
            positionPicker();
        }
    });

    input.addEventListener("focus", () => {
        visibleMonth = parseDisplayDate(input.value) || new Date();
        renderPicker();
        positionPicker();
    });

    window.addEventListener("resize", () => {
        if (picker.classList.contains("open")) {
            positionPicker();
        }
    });

    document.querySelector(".content-area")?.addEventListener("scroll", () => {
        if (picker.classList.contains("open")) {
            positionPicker();
        }
    });
}

document.querySelectorAll("[data-date-mask]").forEach((input) => {
    createDatePicker(input);

    input.addEventListener("input", () => {
        const digits = input.value.replace(/\D/g, "").slice(0, 8);
        const parts = [];

        if (digits.length > 0) {
            parts.push(digits.slice(0, 2));
        }

        if (digits.length > 2) {
            parts.push(digits.slice(2, 4));
        }

        if (digits.length > 4) {
            parts.push(digits.slice(4, 8));
        }

        input.value = parts.filter(Boolean).join("/");
    });
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".date-input-wrap") && !event.target.closest(".date-picker-popover")) {
        document.querySelectorAll(".date-picker-popover.open").forEach((picker) => {
            picker.classList.remove("open");
        });
    }
});

document.querySelectorAll("[data-table]").forEach((tablePanel) => {
    const table = tablePanel.querySelector("table");
    const tbody = tablePanel.querySelector("tbody");
    const searchInput = tablePanel.querySelector("[data-table-search]");
    const lengthSelect = tablePanel.querySelector("[data-table-length]");
    const dateFromInput = tablePanel.querySelector("[data-date-from]");
    const dateToInput = tablePanel.querySelector("[data-date-to]");
    const info = tablePanel.querySelector("[data-table-info]");
    const pageText = tablePanel.querySelector("[data-table-page]");
    const prevButton = tablePanel.querySelector("[data-table-prev]");
    const nextButton = tablePanel.querySelector("[data-table-next]");

    if (!table || !tbody) {
        return;
    }

    const allRows = Array.from(tbody.querySelectorAll("tr:not([data-empty-row])"));
    let filteredRows = [...allRows];
    let currentPage = 1;
    let sortIndex = null;
    let sortDirection = "asc";
    const sortableHeaders = Array.from(table.querySelectorAll("thead th[data-sort]"));

    function getPageSize() {
        if (!lengthSelect || lengthSelect.value === "all") {
            return filteredRows.length || 1;
        }

        return Number(lengthSelect.value);
    }

    function getCellValue(row, index) {
        const cell = row.children[index];
        return cell ? cell.dataset.value || cell.textContent.trim() : "";
    }

    function applySearch() {
        const keyword = (searchInput?.value || "").toLowerCase().trim();
        const dateFrom = normalizeDateInput(dateFromInput?.value || "");
        const dateTo = normalizeDateInput(dateToInput?.value || "");

        filteredRows = allRows.filter((row) => {
            const matchesKeyword = row.textContent.toLowerCase().includes(keyword);
            const dateCell = row.querySelector("[data-date]");
            const rowDate = dateCell?.dataset.date || "";
            const matchesFrom = !dateFrom || (rowDate && rowDate >= dateFrom);
            const matchesTo = !dateTo || (rowDate && rowDate <= dateTo);

            return matchesKeyword && matchesFrom && matchesTo;
        });
    }

    function applySort() {
        if (sortIndex === null) {
            return;
        }

        const header = table.querySelectorAll("thead th")[sortIndex];
        const sortType = header?.dataset.sort || "text";

        filteredRows.sort((a, b) => {
            let first = getCellValue(a, sortIndex);
            let second = getCellValue(b, sortIndex);

            if (sortType === "number") {
                first = Number(first) || 0;
                second = Number(second) || 0;
            } else {
                first = first.toLowerCase();
                second = second.toLowerCase();
            }

            if (first < second) {
                return sortDirection === "asc" ? -1 : 1;
            }

            if (first > second) {
                return sortDirection === "asc" ? 1 : -1;
            }

            return 0;
        });
    }

    function renderTable() {
        applySearch();
        applySort();

        const pageSize = getPageSize();
        const totalRows = filteredRows.length;
        const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
        currentPage = Math.min(currentPage, totalPages);

        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const visibleRows = filteredRows.slice(start, end);

        const emptyRow = tbody.querySelector("[data-empty-row]");

        allRows.forEach((row) => {
            row.remove();
            row.style.display = "none";
        });

        visibleRows.forEach((row) => {
            row.style.display = "";
            tbody.appendChild(row);
        });

        if (emptyRow) {
            tbody.appendChild(emptyRow);
            emptyRow.style.display = totalRows === 0 ? "" : "none";
        }

    sortableHeaders.forEach((header, index) => {
            const icon = header.querySelector("i");
            const columnIndex = header.cellIndex;

            header.classList.toggle("sorted-asc", sortIndex === columnIndex && sortDirection === "asc");
            header.classList.toggle("sorted-desc", sortIndex === columnIndex && sortDirection === "desc");

            if (icon) {
                const printHiddenClass = icon.classList.contains("print-hidden") ? " print-hidden" : "";
                icon.className = sortIndex === columnIndex
                    ? `bi ${sortDirection === "asc" ? "bi-sort-up" : "bi-sort-down"}${printHiddenClass}`
                    : `bi bi-arrow-down-up${printHiddenClass}`;
            }
        });

        if (info) {
            const shownStart = totalRows === 0 ? 0 : start + 1;
            const shownEnd = Math.min(end, totalRows);
            info.textContent = `Menampilkan ${shownStart}-${shownEnd} dari ${totalRows} data`;
        }

        if (pageText) {
            pageText.textContent = `${currentPage} / ${totalPages}`;
        }

        if (prevButton) {
            prevButton.disabled = currentPage <= 1;
        }

        if (nextButton) {
            nextButton.disabled = currentPage >= totalPages;
        }
    }

    sortableHeaders.forEach((header) => {
        header.addEventListener("click", () => {
            const columnIndex = header.cellIndex;

            if (sortIndex === columnIndex) {
                sortDirection = sortDirection === "asc" ? "desc" : "asc";
            } else {
                sortIndex = columnIndex;
                sortDirection = "asc";
            }

            currentPage = 1;
            renderTable();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            currentPage = 1;
            renderTable();
        });
    }

    if (lengthSelect) {
        lengthSelect.addEventListener("change", () => {
            currentPage = 1;
            renderTable();
        });
    }

    [dateFromInput, dateToInput].forEach((input) => {
        if (input) {
            input.addEventListener("input", () => {
                currentPage = 1;
                renderTable();
            });

            input.addEventListener("change", () => {
                currentPage = 1;
                renderTable();
            });
        }
    });

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            currentPage -= 1;
            renderTable();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            currentPage += 1;
            renderTable();
        });
    }

    renderTable();
});

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value || 0);
}

document.querySelectorAll(".app-modal").forEach((modal) => {
    const productSelect = modal.querySelector(".product-price-source");
    const quantityInput = modal.querySelector(".sales-quantity");
    const totalPreview = modal.querySelector("[data-total-preview]");
    const pricePreview = modal.querySelector("[data-price-preview]");

    if (!productSelect || !quantityInput || !totalPreview) {
        return;
    }

    function updateSalesPreview() {
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        const price = Number(selectedOption?.dataset.harga || 0);
        const quantity = Number(quantityInput.value || 0);

        if (pricePreview) {
            pricePreview.value = formatRupiah(price);
        }

        totalPreview.textContent = formatRupiah(price * quantity);
    }

    productSelect.addEventListener("change", updateSalesPreview);
    quantityInput.addEventListener("input", updateSalesPreview);

    updateSalesPreview();
});

document.querySelectorAll("[data-print-report]").forEach((button) => {
    button.addEventListener("click", () => {
        window.print();
    });
});

document.querySelectorAll("[data-bulk-form]").forEach((form) => {
    const checkAll = form.querySelector("[data-bulk-check-all]");
    const checks = Array.from(form.querySelectorAll("[data-bulk-check]"));
    const deleteButton = form.querySelector("[data-bulk-delete-button]");

    function updateBulkState() {
        const checkedCount = checks.filter((check) => check.checked).length;

        if (deleteButton) {
            deleteButton.disabled = checkedCount === 0;
            const label = deleteButton.querySelector("span");
            if (label) {
                label.textContent = checkedCount > 0 ? `Hapus Terpilih (${checkedCount})` : "Hapus Terpilih";
            }
        }

        if (checkAll) {
            checkAll.checked = checkedCount > 0 && checkedCount === checks.length;
            checkAll.indeterminate = checkedCount > 0 && checkedCount < checks.length;
        }
    }

    if (checkAll) {
        checkAll.addEventListener("change", () => {
            checks.forEach((check) => {
                check.checked = checkAll.checked;
            });
            updateBulkState();
        });
    }

    checks.forEach((check) => {
        check.addEventListener("change", updateBulkState);
    });

    updateBulkState();
});
