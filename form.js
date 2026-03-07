const languages = ["Hindi", "English", "Gujarati"];
const technologies = ["PHP", "MySQL", "Laravel", "Oracle"];
const locations = ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Mumbai"];
const locationList = document.getElementById("locationList");
locations.forEach((loc, index) => {
    const li = document.createElement("li");

    li.innerHTML = `<span class="locName">${loc}</span>
    <input type="button" class="moveUp" value="Up">
    <input type="button" class="moveDown" value="Down">`;

    locationList.appendChild(li);
});

locationList.addEventListener("click", function (e) {
    if (e.target.classList.contains("moveUp")) {
        const li = e.target.parentElement;
        const prev = li.previousElementSibling;

        if (prev) {
            li.parentElement.insertBefore(li, prev);
        }
    }
    if (e.target.classList.contains("moveDown")) {
        const li = e.target.parentElement;
        const next = li.nextElementSibling;

        if (next) {
            li.parentElement.insertBefore(next, li);
        }
    }

});

function getPreferredLocations() {
    const locs = document.querySelectorAll("#locationList .locName");

    let result = [];
    locs.forEach(function (loc, index) {
        const city = loc.querySelector(".locName").innerText;
        result.push({
            location: city,
            priority: index + 1
        });
    });
    return result;
}


const tableRules = {

    education: [
        /^[A-Za-z\s]+$/,   // Course
        /^[0-9]{4}$/,      // Passing Year
        /^[A-Za-z\s]+$/,   // University
        /^[0-9]+$/         // Result
    ],

    experience: [
        /^[A-Za-z\s]+$/,   // Company
        /^\d{4}-\d{2}-\d{2}$/, // From Date
        /^\d{4}-\d{2}-\d{2}$/, // To Date
        /^[0-9]+$/,        // Package
        /^[A-Za-z\s]+$/,   // Reason Leave
        /^[0-9]{10}$/,     // Contact
        /^[A-Za-z\s]+$/    // Name
    ],

    ref: [
        /^[A-Za-z\s]+$/,   // Name
        /^[0-9]{10}$/,     // Contact
        /^[A-Za-z\s]+$/    // Relation
    ]

};
const langTable = document.getElementById("language");
const techTable = document.getElementById("tech");

languages.forEach((lang, index) => {
    const row = langTable.insertRow();
    row.innerHTML = `<td>${index + 1}</td>
  <td>${lang}</td>
  <td><input type="checkbox" name="${lang}_read"></td>
  <td><input type="checkbox" name="${lang}_write"></td>
  <td><input type="checkbox" name="${lang}_speak"></td>`;
});


technologies.forEach((tech, index) => {
    const row = techTable.insertRow();
    row.innerHTML = `<td>${index + 1}</td>
  <td><input type ="checkbox" name="techSelect" value="${tech}">${tech}</td>
  <td><input type="radio" name="${tech}_level" value="beginner">Beginner</td>
  <td><input type="radio" name="${tech}_level" value="mediator">Mediator</td>
  <td><input type="radio" name="${tech}_level" value="expert">Expert</td>`;
});


// error function
function showError(id, msg) {
    document.getElementById(id + "Error").textContent = msg;
    document.getElementById(id).classList.add("input-error");
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll(".input-error").forEach(e => e.classList.remove("input-error"));
}



// fieldvalidation
function validateField(id, rules) {

    const value = document.getElementById(id).value.trim();

    // Check if required field is empty
    if (rules.required && value === "") {
        showError(id, rules.label + " required");
        return false;
    }

    // Check length constraints
    if (rules.minLength && value.length < rules.minLength) {
        showError(id, "invalid " + rules.label);
        return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
        showError(id, "invalid " + rules.label);
        return false;
    }

    // Check pattern (regex) matching
    if (rules.pattern && !rules.pattern.test(value)) {
        showError(id, "invalid " + rules.label);
        return false
    }

    // Min/Max value checks for number and date fields
    if (rules.type === "number") {
        if (rules.min && value < rules.min) {
            showError(id, "invalid " + rules.label);
            return false;
        }
        if (rules.max && value > rules.max) {
            showError(id, "invalid " + rules.label);
            return false;
        }
    }
    if (rules.type === "date") {
        const fieldDate = new Date(value);
        if (rules.min && fieldDate < new Date(rules.min)) {
            showError(id, "invalid " + rules.label);
            return false;
        }
        if (rules.max && fieldDate > new Date(rules.max)) {
            showError(id, "invalid " + rules.label);
            return false;
        }
    }

    // If all checks pass
    return true;

}

// table validation
function validateTable(tableId) {

    const table = document.getElementById(tableId);
    const errorSpan = document.getElementById(tableId + "Error");
    const rules = tableRules[tableId];

    errorSpan.textContent = "";

    for (let i = 1; i < table.rows.length; i++) {

        const inputs = table.rows[i].querySelectorAll("input");

        for (let j = 0; j < inputs.length; j++) {

            const input = inputs[j];
            const value = input.value.trim();

            if (value === "") {

                input.classList.add("input-error");
                errorSpan.textContent = "Please fill all fields";
                return false;

            }

            if (rules && !rules[j].test(value)) {

                input.classList.add("input-error");
                errorSpan.textContent = "Invalid value in row " + i;
                return false;

            }

        }

    }

    return true;

}

// language validation
function validateLanguage() {
    const table = document.getElementById("language");
    const errorSpan = document.getElementById("languageError");

    errorSpan.textContent = "";
    let languageSelected = false;

    for (let i = 1; i < table.rows.length; i++) {
        const langName = table.rows[i].cells[1].textContent;
        const read = table.rows[i].querySelector("input[name='" + langName + "_read']");
        const write = table.rows[i].querySelector("input[name='" + langName + "_write']");
        const speak = table.rows[i].querySelector("input[name='" + langName + "_speak']");

        if (read.checked || write.checked || speak.checked) {
            languageSelected = true;
        }
    }

    if (!languageSelected) {
        errorSpan.textContent = "Select at least one language";
        return false;
    }
    return true;
}

// technology validation
function validateTech() {
    const techChecks = document.querySelectorAll("input[name = 'techSelect']");
    const errorSpan = document.getElementById("techError");

    errorSpan.textContent = "";

    const isChecked = false;

    for (let tech of techChecks) {
        if (tech.checked) {
            isChecked = true;
            const level = document.querySelector(`input[name="${tech.value}_level"]:checked`);
            if (!level) {
                errorSpan.textContent = "Select level for " + tech.value;
                return false;
            }
        }
    }
    if (!isChecked) {
        errorSpan.textContent = "Select least one Technology."
    }
    return true;
}


// Example usage in the form validation function:
function validateForm() {

    clearErrors();
    let valid = true;
    const schema = {

        firstName: { label: "First Name", required: true, pattern: /^[A-Za-z\s]+$/, minLength: 2, maxLength: 30 },
        lastName: { label: "Last Name", required: true, pattern: /^[A-Za-z\s]+$/, minLength: 2, maxLength: 30 },
        designation: { label: "Designation", required: true },
        email: { label: "Email", required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        phoneNumber: { label: "Phone", required: true, pattern: /^[0-9]{10}$/, },
        zipcode: { label: "Zipcode", required: true, pattern: /^[0-9]{5,6}$/ },
        city: { label: "City", required: true },
        address1: { label: "Address", required: true },
        address2: { label: "Address", required: false },
        dob: { label: "Date of Birth", required: true },
        noticePeriod: { label: "Notice", required: true },
        exCtc: { label: "Expected CTC", required: true, pattern: /^[0-9]+$/ },
        curCtc: { label: "Current CTC", required: true, pattern: /^[0-9]+$/ }

    };
    for (let id in schema) {

        if (!validateField(id, schema[id])) valid = false;

    }

    if (!document.querySelector("input[name='gender']:checked")) {
        document.getElementById("genderError").textContent = "Select gender";
        valid = false;
    }
    const prefLocation = getPreferredLocations();

    if (prefLocation === "") {
        document.getElementById("prefredLocationError").textContent =
            "Select preferred location";
        valid = false;
    }

    if (!validateTable("education")) valid = false;
    if (!validateTable("experience")) valid = false;
    if (!validateTable("ref")) valid = false;
    if (!validateLanguage()) valid = false;
    if (!validateTech()) valid = false;

    return valid;

}

// add row fuctionality for education
document.getElementById("educationAdd").addEventListener("click", function () {
    const table = document.getElementById("education");
    const rowCount = table.rows.length;
    const newRow = table.insertRow(rowCount);

    newRow.innerHTML = `
    <td>${rowCount}</td>
    <td><input type="text" name="course" id="course${rowCount}"></td>
    <td><input type="text" name="passingYear" id="passingYear${rowCount}"></td>
    <td><input type="text" name="uniBoard" id="uniBoard${rowCount}"></td>
    <td><input type="text" name="result" id="result${rowCount}"></td>`;
});

//remove row for education
document
    .getElementById("educationRemove")
    .addEventListener("click", function () {
        const table = document.getElementById("education");
        const rowCount = table.rows.length;

        if (rowCount > 1) {
            table.deleteRow(rowCount - 1);
        } else {
            alert("No rows to remove.");
        }
    });

//add row for experience
document.getElementById("experienceAdd").addEventListener("click", function () {
    const table = document.getElementById("experience");
    const rowCount = table.rows.length;
    const newRow = table.insertRow(rowCount);

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" name="company"></td>
        <td><input type="date" name="fromDate"></td>
        <td><input type="date" name="toDate"></td>
        <td><input type="text" name="annualPackage"></td>
        <td><input type="text" name="reasonLeave"></td>
        <td><input type="text" name="refContactNo"></td>
        <td><input type="text" name="refContactName"></td>`;

});

// remove row for the experience
document.getElementById("experienceRemove").addEventListener("click", function () {
    const table = document.getElementById("experience");
    const rowCount = table.rows.length;

    if (rowCount > 1) {
        table.deleteRow(rowCount - 1);

    } else {
        alert("No rows t remove.");
    }
});



// Add row functionality for references
document.getElementById("refAdd").addEventListener("click", function () {
    const table = document.getElementById("ref");
    const rowCount = table.rows.length;
    const newRow = table.insertRow(rowCount);

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" name="refName"></td>
        <td><input type="text" name="refContactNo"></td>
        <td><input type="text" name="refRelation"></td>
    `;
});

// Remove row functionality for references
document.getElementById("refRemove").addEventListener("click", function () {
    const table = document.getElementById("ref");
    const rowCount = table.rows.length;

    // Don't allow removing the header row
    if (rowCount > 1) {
        table.deleteRow(rowCount - 1);
    } else {
        alert("No rows to remove.");
    }
});
