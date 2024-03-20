/**
 * This is the back end code for our Tool n' Die shop. This code utilizes the local storage 
 * as means of storing data. This has 22 functions created for performing tasks that would help
 * a manager manage tasks in a Tool n' Die shop. 
*/


//Global Variables
//Job Details stored in array
const jobDetails = getJobDetailsFromLocalStorage();

//Job Number ID
let jobCount = parseInt(localStorage.getItem("jobCount") || "0");

//Job Materials
const materials = [
    { name: "Tool Steel", price: 10.00, stock: 6, id: 0 },
    { name: "High-Speed Steel", price: 20.19, stock: 7, id: 1 },
    { name: "Carbide", price: 32.00, stock: 5, id: 2 },
    { name: "Cast Iron", price: 13.36, stock: 5, id: 3 },
    { name: "Polymer composites", price: 10.00, stock: 5, id: 4 },
    { name: "M12 Dies", price: 15.50, stock: 3, id: 5 },
];

//Access HTML Elements
//Crud Functions Forms
const createJobForm = document.getElementById("createJobForm");
const viewJobForm = document.getElementById("viewJobForm");
const editJobForm = document.getElementById("editJobForm");
const deleteJobForm = document.getElementById("deleteJobForm");

//Main functions button
const createJobButton = document.getElementById("createJobButton");
const viewJobButton = document.getElementById("viewJobsButton");
const updateJobButton = document.getElementById("updateJobsButton");
const removeJobButton = document.getElementById("removeJobsButton");

//Create Job Elements
const materialsTableBody = document.getElementById("materialsTableBody");

//View Job Elements
//View Job Dropdown
const viewMaterialsTableBody = document.getElementById("materialsForJobTableBody");
const ongoingJobsSelect = document.getElementById("ongoing-jobs");

//Edit Job Elements
//Edit Job Button
const jobUpdateButton = document.getElementById("jobUpdateButton");
//Edit Job Dropdown
const editMaterialsTableBody = document.getElementById("editMaterialsTableBody");
const editOngoingJobSelect = document.getElementById("editOngoing-Jobs");
//Edit Selected Job
let selectedJobIndex = -1;

//Delete Job Elements
//Delete Job Dropdown
const deleteMaterialsForJobTableBody = document.getElementById("deleteMaterialsForJobTableBody");
const deleteOngoingJobSelect = document.getElementById("deleteOngoing-Jobs");
//Delete Button
const jobDeleteButton = document.getElementById("jobDeleteButton");



function createJob() {
    //Add job number
    jobNumber.innerText = jobCount.toString();

    //Add material to the materials table
    clearTable(materialsTableBody);
    materials.forEach(function (material) {
        const tableRow = document.createElement("tr");

        const checkboxCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("itemCheckbox");
        checkbox.name = "item";
        checkbox.value = material.id.toString();
        checkboxCell.appendChild(checkbox);

        const nameCell = document.createElement("td");
        nameCell.textContent = material.name;

        const priceCell = document.createElement("td");
        priceCell.textContent = `$${material.price.toFixed(2)}`; // Format price with 2 decimals

        const stockCell = document.createElement("td");
        stockCell.textContent = material.stock;

        const idCell = document.createElement("td");
        idCell.textContent = material.id;

        tableRow.appendChild(checkboxCell);
        tableRow.appendChild(nameCell);
        tableRow.appendChild(priceCell);
        tableRow.appendChild(stockCell);
        tableRow.appendChild(idCell);

        materialsTableBody.appendChild(tableRow);
    });


    scrollToForm(createJobForm);
}

function viewJob() {
    const ongoingJobsSelect = document.getElementById("ongoing-jobs");

    //Populate ViewJob Drop down
    ongoingJobsSelect.innerHTML = "";
    const filteredJobs = jobDetails.filter(job => Number(job.jobNumber) !== -1);
    filteredJobs.forEach((job) => {
        const option = document.createElement("option");
        option.value = job.jobNumber; // Assuming job has an ID property
        option.textContent = "ID: " + job.jobNumber + "\tName: " + job.jobName; // Assuming job has a name property
        ongoingJobsSelect.appendChild(option);
    });

    scrollToForm(viewJobForm);
}

function editJob() {
    const ongoingJobsSelect = document.getElementById("editOngoing-Jobs");

    //Populate editJob Drop down
    ongoingJobsSelect.innerHTML = "";
    const filteredJobs = jobDetails.filter(job => Number(job.jobNumber) !== -1);
    filteredJobs.forEach((job) => {
        const option = document.createElement("option");
        option.value = job.jobNumber; // Assuming job has an ID property
        option.textContent = "ID: " + job.jobNumber + "\tName: " + job.jobName; // Assuming job has a name property
        ongoingJobsSelect.appendChild(option);
    });

    clearTable(editMaterialsTableBody);
    materials.forEach(function (material) {
        const tableRow = document.createElement("tr");

        const checkboxCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("itemCheckbox");
        checkbox.name = "item";
        checkbox.value = material.id.toString();
        checkboxCell.appendChild(checkbox);

        const nameCell = document.createElement("td");
        nameCell.textContent = material.name;

        const priceCell = document.createElement("td");
        priceCell.textContent = `$${material.price.toFixed(2)}`; // Format price with 2 decimals

        const stockCell = document.createElement("td");
        stockCell.textContent = material.stock;

        const idCell = document.createElement("td");
        idCell.textContent = material.id;

        tableRow.appendChild(checkboxCell);
        tableRow.appendChild(nameCell);
        tableRow.appendChild(priceCell);
        tableRow.appendChild(stockCell);
        tableRow.appendChild(idCell);

        editMaterialsTableBody.appendChild(tableRow);
    });

    scrollToForm(editJobForm);

}

function deleteJob() {
    const ongoingJobsSelect = document.getElementById("deleteOngoing-Jobs");

    //Populate ViewJob Drop down
    ongoingJobsSelect.innerHTML = "";
    const filteredJobs = jobDetails.filter(job => Number(job.jobNumber) !== -1);
    filteredJobs.forEach((job) => {
        const option = document.createElement("option");
        option.value = job.jobNumber; // Assuming job has an ID property
        option.textContent = "ID: " + job.jobNumber + "\tName: " + job.jobName; // Assuming job has a name property
        ongoingJobsSelect.appendChild(option);
    });


    scrollToForm(deleteJobForm);
}

// Global Essential Functions
function scrollToForm(targetForm) {
    // Get the offset top position of the form element
    var formTop = targetForm.getBoundingClientRect().top;
    console.log(formTop);
    // Account for any potential fixed header or top navigation
    var scrollOffset = 0; // Adjust this value if needed

    // Scroll the page smoothly to the form position
    window.scrollBy({
        top: formTop + scrollOffset,
        behavior: 'smooth'
    });

}

function clearTable(table) {
    const rows = table.querySelectorAll("tr"); // Select all rows

    for (let i = rows.length - 1; i >= 0; i--) {
        rows[i].remove();
    }
}

function checkUserInputs(jobName, jobDescription, jobStartDate, jobEndDate, jobStartTime, jobEndTime) {
    let dateStarting = new Date();
    let selectedDate = null;

    const materialSelected = [];
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    for (let i = 0; i < allCheckboxes.length; i++) {
        materialSelected.push(allCheckboxes[i].value);
    }

    let hasErrors = false;
    let errorMessages = "";

    if (jobName.length === 0) {
        hasErrors = true;
        errorMessages += "Please enter a job name.\n";
    }

    if (jobDescription.length === 0) {
        hasErrors = true;
        errorMessages += "Please provide a job description.\n";
    }

    if (jobStartDate.length === 0) {
        hasErrors = true;
        errorMessages += "Please select a start date.\n";
    }

    try {
        selectedDate = new Date(jobStartDate);
    } catch (error) {
        console.error("Invalid date format:", error);
    }

    if (!selectedDate) {
        hasErrors = true;
        errorMessages += "Please select a start date on or after today.";
    }

    dateStarting = new Date(jobStartDate);

    if (jobEndDate.length === 0) {
        hasErrors = true;
        errorMessages += "Please select an end date.\n";
    }

    try {
        selectedDate = new Date(jobEndDate);
    } catch (error) {
        console.error("Invalid date format:", error);
    }

    if (selectedDate < dateStarting) {
        hasErrors = true;
        errorMessages += "Please select an end date after starting date.";
    }

    if (jobStartTime.length === 0) {
        hasErrors = true;
        errorMessages += "Please select a start time.\n";
    }

    if (jobEndTime.length === 0) {
        hasErrors = true;
        errorMessages += "Please select an end time.\n";
    }

    if (materialSelected.length === 0) {
        hasErrors = true;
        errorMessages += "Please select at least one material.\n";
    }

    if (hasErrors) {
        // Or display errors in a more user-friendly way
        window.alert(errorMessages);
        // Prevent form submission if errors exist
        return false;
    } else {
        // Proceed with form submission or other actions
        console.log("All inputs are valid!");
        return true;
    }

}

function editStock(materialId, newStockValue) {
    if (materialId !== -1) {
        materials[materialId].stock = newStockValue;
        console.log(`Stock of material with ID ${materialId} updated to ${newStockValue}`);
    } else {
        console.error(`Material with ID ${materialId} not found in the array`);
    }
}

function clearInputsForNewJob() {
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    //Clear Inputs
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function clearInputsForEditJob() {
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    //Clear Inputs
    document.getElementById("editName").value = "";
    document.getElementById("editDescription").value = "";
    document.getElementById("editStartDate").value = "";
    document.getElementById("editEndDate").value = "";
    document.getElementById("editStartTime").value = "";
    document.getElementById("editEndTime").value = "";
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}


function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days

    return `${year}-${month}-${day}`;
}

//Function for getting jobs stored in local storage
function getJobDetailsFromLocalStorage() {
    const jobDetailsString = localStorage.getItem("jobDetails");
    if (jobDetailsString) {
        return JSON.parse(jobDetailsString);
    } else {
        return [];
    }
}

//Populate Materials Table for selected job
function viewAddMaterialsForJob(material) {
    const tableRow = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = material.name;

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${material.price.toFixed(2)}`; // Format price with 2 decimals

    const stockCell = document.createElement("td");
    stockCell.textContent = material.stock;

    const idCell = document.createElement("td");
    idCell.textContent = material.id;

    tableRow.appendChild(nameCell);
    tableRow.appendChild(priceCell);
    tableRow.appendChild(stockCell);
    tableRow.appendChild(idCell);

    viewMaterialsTableBody.appendChild(tableRow);
}

//Populate Job Details For View
function updateJobDetailsText(selectedJob) {
    const jobDetails = getJobDetailsFromLocalStorage();
    const selectedJobObject = jobDetails[selectedJob];

    for (var i = viewMaterialsTableBody.rows.length - 1; i >= 0; i--) {
        viewMaterialsTableBody.deleteRow(i);
    }

    if (selectedJobObject) {
        document.getElementById("viewJobNumber").textContent = selectedJobObject.jobNumber;
        document.getElementById("viewJobName").textContent = selectedJobObject.jobName;
        // Update other text elements based on your jobDetails object structure
        document.getElementById("viewJobDesc").textContent = selectedJobObject.jobDescription || "--"; // Handle missing property
        document.getElementById("viewJobStartDate").textContent = selectedJobObject.jobStartDate || "--";
        document.getElementById("viewJobEndDate").textContent = selectedJobObject.jobEndDate || "--";
        document.getElementById("viewJobStartTime").textContent = selectedJobObject.jobStartTime || "--";
        document.getElementById("viewJobEndTime").textContent = selectedJobObject.jobEndTime || "--";
        document.getElementById("viewJobProgress").textContent = `${calculateProjectPercentageComplete(selectedJobObject).toFixed(2)}%` || "--";
        document.getElementById("viewJobProgressBar").value = Math.floor(calculateProjectPercentageComplete(selectedJobObject));
        selectedJobObject.materials.forEach((index) => {
            console.log("hi " + index)
            viewAddMaterialsForJob(materials[index]);  // Access and print elements
        });
    } else {
        // Handle case where no job is selected or job not found
        console.warn("Selected job not found in local storage"); // Log a warning for debugging
        updateTextWithDashes(); // Optionally, reset text elements with dashes
    }

}

// Helper function to reset text elements with dashes (optional)
function updateTextWithDashes() {
    document.getElementById("viewJobNumber").textContent = "--";
    document.getElementById("viewJobName").textContent = "--";
    document.getElementById("viewJobDesc").textContent = "--";
    document.getElementById("viewJobStartDate").textContent = "--";
    document.getElementById("viewJobEndDate").textContent = "--";
    document.getElementById("viewJobStartTime").textContent = "--";
    document.getElementById("viewJobEndTime").textContent = "--";
}

function calculateProjectPercentageComplete(selectedJobObject) {
    // Get today's date
    const today = new Date();

    // Convert strings to date objects
    const projectStartDate = new Date(selectedJobObject.jobStartDate);
    const projectEndDate = new Date(selectedJobObject.jobEndDate);

    // Calculate project duration in days (adjust for weeks if needed)
    const totalProjectDuration = (projectEndDate - projectStartDate) / (1000 * 60 * 60 * 24);

    // Calculate days elapsed since project start
    const daysElapsed = (today - projectStartDate) / (1000 * 60 * 60 * 24);

    // Calculate percentage complete (handle potential division by zero)
    let projectPercentageComplete = 0;
    if (totalProjectDuration > 0) {
        projectPercentageComplete = (daysElapsed / totalProjectDuration) * 100;
    }

    if (projectPercentageComplete < 0) {
        return 0;
    } else if (projectPercentageComplete > 100) {
        return 100
    }

    return projectPercentageComplete;
    console.log(`Project completion percentage: ${projectPercentageComplete.toFixed(2)}%`);
}


function editPopulateJobDetails(selectedJob) {
    console.log(selectedJob);
    const selectedJobObject = jobDetails[selectedJob];
    var checkboxes = document.getElementById("editMaterialsTableBody").querySelectorAll("input[type='checkbox']");


    //Populate Elements
    document.getElementById("editName").value = selectedJobObject.jobName;
    document.getElementById("editDescription").value = selectedJobObject.jobDescription || "--";
    document.getElementById("editStartDate").value = selectedJobObject.jobStartDate || "--";
    document.getElementById("editEndDate").value = selectedJobObject.jobEndDate || "--";
    document.getElementById("editStartTime").value = selectedJobObject.jobStartTime || "--";
    document.getElementById("editEndTime").value = selectedJobObject.jobEndTime || "--";
    // allCheckboxes.forEach(checkbox => {
    //     checkbox.checked = false;
    // });

    selectedJobObject.materials.forEach(material => {
        checkboxes[material].checked = true;
    });
}

function editDateFormatter(dateString) {
    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleDateString('en-US');
    return formattedDate;
}

function deleteJobDetailsText(selectedJob) {
    const jobDetails = getJobDetailsFromLocalStorage();
    const selectedJobObject = jobDetails[selectedJob];

    for (var i = viewMaterialsTableBody.rows.length - 1; i >= 0; i--) {
        viewMaterialsTableBody.deleteRow(i);
    }

    if (selectedJobObject) {
        document.getElementById("deleteJobNumber").textContent = selectedJobObject.jobNumber;
        document.getElementById("deleteJobName").textContent = selectedJobObject.jobName;
        // Update other text elements based on your jobDetails object structure
        document.getElementById("deleteJobDesc").textContent = selectedJobObject.jobDescription || "--"; // Handle missing property
        document.getElementById("deleteJobStartDate").textContent = selectedJobObject.jobStartDate || "--";
        document.getElementById("deleteJobEndDate").textContent = selectedJobObject.jobEndDate || "--";
        document.getElementById("deleteJobStartTime").textContent = selectedJobObject.jobStartTime || "--";
        document.getElementById("deleteJobEndTime").textContent = selectedJobObject.jobEndTime || "--";
        document.getElementById("deleteJobProgress").textContent = `${calculateProjectPercentageComplete(selectedJobObject).toFixed(2)}%` || "--";
        selectedJobObject.materials.forEach((index) => {
            deleteAddMaterialsForJob(materials[index]);  // Access and print elements
        });
    } else {
        // Handle case where no job is selected or job not found
        console.warn("Selected job not found in local storage"); // Log a warning for debugging
        updateTextWithDashes(); // Optionally, reset text elements with dashes
    }

}

function deleteAddMaterialsForJob(material) {
    const tableRow = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = material.name;

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${material.price.toFixed(2)}`; // Format price with 2 decimals

    const stockCell = document.createElement("td");
    stockCell.textContent = material.stock;

    const idCell = document.createElement("td");
    idCell.textContent = material.id;

    tableRow.appendChild(nameCell);
    tableRow.appendChild(priceCell);
    tableRow.appendChild(stockCell);
    tableRow.appendChild(idCell);

    deleteMaterialsForJobTableBody.appendChild(tableRow);
}

//Function for storing Job MAJOR FUNCTION!
function storeNewJob() {
    const jobNumber = jobCount;
    const jobName = document.getElementById("name").value;
    const jobDescription = document.getElementById("description").value;
    let jobStartDate = document.getElementById("startDate").value;
    let jobEndDate = document.getElementById("endDate").value;
    const jobStartTime = document.getElementById("startTime").value;
    const jobEndTime = document.getElementById("endTime").value;

    const startDateObject = new Date(jobStartDate);
    const endDateObject = new Date(jobEndDate); // Convert to Date object



    let materialSelected = [];
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    for (let i = 0; i < allCheckboxes.length; i++) {
        materialSelected.push(allCheckboxes[i].value);
    }

    console.log(materials);
    materialSelected.forEach(index => editStock(index, materials[index].stock - 1 !== -1 ? materials[index].stock - 1 : materials[index].stock));
    console.log(materials);

    let errorMessages = ""


    // Add 1 day to the date
    materialSelected.forEach(index => {
        if (materials[index].stock === 0) {
            startDateObject.setDate(startDateObject.getDate() + 1);
            endDateObject.setDate(endDateObject.getDate() + 1);
            errorMessages += materials[index].name + " is out of stock. Dates will be adjusted for the acquiring of the materials.\n";
            errorMessages += "Previous start date: " + jobStartDate.toString() + "\n";
            jobStartDate = formatDate(startDateObject);
            errorMessages += "New start date: " + jobStartDate.toString() + "\n";
            errorMessages += "Previous end date: " + jobEndDate.toString() + "\n";
            jobEndDate = formatDate(endDateObject);
            errorMessages += "New end date: " + jobEndDate.toString();

            window.alert(errorMessages);
        }
    });

    const jobData = {
        jobNumber: jobNumber,
        jobName: jobName,
        jobDescription: jobDescription,
        jobStartDate: jobStartDate,
        jobEndDate: jobEndDate,
        jobStartTime: jobStartTime,
        jobEndTime: jobEndTime,
        materials: materialSelected

    };

    let existingJobs = JSON.parse(localStorage.getItem("jobDetails")) || [];

    existingJobs.push(jobData);

    localStorage.setItem("jobDetails", JSON.stringify(existingJobs));

    jobCount = jobCount + 1;
    localStorage.setItem("jobCount", jobCount.toString());

}

//Function for storing Job Edit MAJOR FUNCTION!!!
function storeUpdateJob(selectedJob) {
    const jobNumber = selectedJob;
    const jobName = document.getElementById("editName").value;
    const jobDescription = document.getElementById("editDescription").value;
    let jobStartDate = document.getElementById("editStartDate").value;
    let jobEndDate = document.getElementById("editEndDate").value;
    const jobStartTime = document.getElementById("editStartTime").value;
    const jobEndTime = document.getElementById("editEndTime").value;

    const startDateObject = new Date(jobStartDate);
    const endDateObject = new Date(jobEndDate);

    let materialSelected = [];
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    for (let i = 0; i < allCheckboxes.length; i++) {
        materialSelected.push(allCheckboxes[i].value);
    }

    console.log(materials);
    materialSelected.forEach(index => editStock(index, materials[index].stock - 1 !== -1 ? materials[index].stock - 1 : materials[index].stock));
    console.log(materials);

    let errorMessages = ""


    // Add 1 day to the date
    materialSelected.forEach(index => {
        if (materials[index].stock === 0) {
            startDateObject.setDate(startDateObject.getDate() + 1);
            endDateObject.setDate(endDateObject.getDate() + 1);
            errorMessages += materials[index].name + " is out of stock. Dates will be adjusted for the acquiring of the materials.\n";
            errorMessages += "Previous start date: " + jobStartDate.toString() + "\n";
            jobStartDate = formatDate(startDateObject);
            errorMessages += "New start date: " + jobStartDate.toString() + "\n";
            errorMessages += "Previous end date: " + jobEndDate.toString() + "\n";
            jobEndDate = formatDate(endDateObject);
            errorMessages += "New end date: " + jobEndDate.toString();

            window.alert(errorMessages);
        }
    });

    const jobData = {
        jobNumber: jobNumber,
        jobName: jobName,
        jobDescription: jobDescription,
        jobStartDate: jobStartDate,
        jobEndDate: jobEndDate,
        jobStartTime: jobStartTime,
        jobEndTime: jobEndTime,
        materials: materialSelected
    };

    let existingJobs = JSON.parse(localStorage.getItem("jobDetails")) || [];

    existingJobs[selectedJob] = jobData;

    localStorage.setItem("jobDetails", JSON.stringify(existingJobs));
}


//Function for Deleting Job MAJOR FUNCTION!!!
function removeJob(index) {

    // Retrieve the array
    letmyArray = JSON.parse(localStorage.getItem("jobDetails"));
    console.log(letmyArray);

    // Remove element by value (filter)
    letmyArray[index].jobNumber = -1;// Removes 1 element at index

    // Store the modified array back in local storage
    localStorage.setItem("jobDetails", JSON.stringify(letmyArray));
}

//Buttons Actions
//Side Panel Create Job
createJobButton.addEventListener('click', (event) => {
    event.preventDefault();
    createJob();

});

//Store Job Button
jobSaveButton.addEventListener('click', (event) => {
    event.preventDefault();

    //Get the Element that contains the values of user input
    const jobName = document.getElementById("name").value.trim();
    const jobDescription = document.getElementById("description").value.trim();
    const jobStartDate = document.getElementById("startDate").value.trim();
    const jobEndDate = document.getElementById("endDate").value.trim();
    const jobStartTime = document.getElementById("startTime").value.trim();
    const jobEndTime = document.getElementById("endTime").value.trim();

    if (checkUserInputs(jobName, jobDescription, jobStartDate, jobEndDate, jobStartTime, jobEndTime)) {
        storeNewJob();
        createJob();
        clearInputsForNewJob();
        alert("New Job Saved!");
    }

    console.log("clicked");
});

//Side Panel View Job
viewJobButton.addEventListener('click', (event) => {
    viewJob();
    viewJobForm.focus();
});

//View Job Dropdown
ongoingJobsSelect.addEventListener("change", function () {
    const selectedJob = this.value;
    updateJobDetailsText(selectedJob);
});

//Side Panel Update Job
updateJobButton.addEventListener("click", function () {
    editJob();

});

editOngoingJobSelect.addEventListener("change", function () {
    const selectedJob = this.value;
    editPopulateJobDetails(selectedJob);
    selectedJobIndex = selectedJob;
});

jobUpdateButton.addEventListener("click", function () {
    if (selectedJobIndex !== -1) {
        const jobName = document.getElementById("editName").value.trim();
        const jobDescription = document.getElementById("editDescription").value.trim();
        const jobStartDate = document.getElementById("editStartDate").value.trim();
        const jobEndDate = document.getElementById("editEndDate").value.trim();
        const jobStartTime = document.getElementById("editStartTime").value.trim();
        const jobEndTime = document.getElementById("editEndTime").value.trim();

        if (checkUserInputs(jobName, jobDescription, jobStartDate, jobEndDate, jobStartTime, jobEndTime)) {
            storeUpdateJob(selectedJobIndex);
            clearInputsForEditJob();
            alert("Job Edited!");
            window.location.reload();
        }
    }

});

removeJobButton.addEventListener("click", function () {
    deleteJob();
});

deleteOngoingJobSelect.addEventListener("change", function () {
    const selectedJob = this.value;
    deleteJobDetailsText(selectedJob);
    selectedJobIndex = selectedJob;

});

jobDeleteButton.addEventListener("click", function () {
    removeJob(selectedJobIndex);
    alert("Job Deleted!");
});


