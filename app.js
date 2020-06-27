$(document).ready(init);

const employees = [];
let monthlyCost = 0;
const costLimit = 20000;


function init() {
    console.log(`Hey it's jQ!`);
    $('#js-new-emp-form').on('submit', addEmp);
    $('#js-emp-display').on('click', '.js-delete-emp', deleteEmp);
} // end init

function addEmp(event) {
    event.preventDefault();
    //create and add new employee to array
    createNewEmp();
    // update DOM
    renderEmpData();
} // end addEmp


function createNewEmp() {
    console.log(`in createNewEmp`);

    const newEmp = {
        fName: $('#js-emp-fName').val(),
        lName: $('#js-emp-lName').val(),
        empID: parseInt($('#js-emp-ID').val()),
        title: $('#js-emp-title').val(),
        salary: parseFloat($('#js-emp-salary').val()),
    }
    employees.push(newEmp);
    $('#js-new-emp-form').trigger('reset');
} // end createNewEmp


function renderEmpData() {
    console.log(`in renderEmpData`);
    $('#js-emp-display').empty();

    for (let emp of employees) {
        $('#js-emp-display').append(`
        <tr>
        <td>${emp.fName}</td>
        <td>${emp.lName}</td>
        <td>${emp.empID}</td>
        <td>${emp.title}</td>
        <td>${emp.salary}</td>
        <td class="btn btn-danger js-delete-emp">X</td>
      </tr>
`);
        // deal with monthlyCost
        handleMonthlyCost(emp);
        // display total employees;
        $('#js-total-emps').text(employees.length);
    }
} // end renderEmpData


function handleMonthlyCost(emp) {

    monthlyCost += (emp.salary / 12);
    $('#js-total-monthly').text(monthlyCost);

    if (monthlyCost > costLimit) {
        // style monthlyCost red
        $('#js-total-monthly').addClass('bg-danger');
    } else if (monthlyCost > (costLimit * 0.8)) {
        //style monthlyCost yellow
        $('#js-total-monthly').addClass('bg-warning');
    }
} // end handleMonthlyCost


function deleteEmp() {
    $(this).parent().fadeOut();

    let target = $(this).parent()[0].cells[2].textContent;
    console.log(target);

    for (let emp of employees) {
        if (emp.empID == target) {
            console.log(emp);

            let toDelete = employees.indexOf(emp);
            monthlyCost -= (emp.salary / 12)
            employees.splice(toDelete, 1);
            renderEmpData();
            console.log(`oh he gone`);

        }
    }

} // end deleteEmp