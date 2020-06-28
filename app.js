$(document).ready(init);

const employees = [];
let monthlyCost = 0;
const costLimit = 20000;
let idControl = [];

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

    if (!newEmp.empID || !newEmp.salary) {
        $('#js-new-emp-form').append(`
        <h4 class="text-danger input-error">Please include Employee ID and salary!</h4>
        `)
        return false
    } else {
        $('h4').remove('.input-error');
    }

    if (idControl.includes(newEmp.empID)) {
        $('#js-new-emp-form').append(`
        <h4 class="text-danger input-error">That ID is already in use. Please use a unique ID!</h4>
        `)
        return false
    } else {
        $('h4').remove('.input-error');
    }
    idControl.push(newEmp.empID);
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
    }
    // deal with monthlyCost
    handleMonthlyCost();
    // display total employees;
    $('#js-total-emps').text(employees.length);
} // end renderEmpData


function handleMonthlyCost() {
    monthlyCost = 0;
    for (let emp of employees) {
        monthlyCost += (emp.salary / 12);
        if (monthlyCost > costLimit) {
            // style monthlyCost red
            $('#js-total-monthly').addClass('bg-danger');
        } else if (monthlyCost > (costLimit * 0.8)) {
            //style monthlyCost yellow
            $('#js-total-monthly').addClass('bg-warning');
        }
    }
    $('#js-total-monthly').text(`$${monthlyCost.toFixed(2)}`);
} // end handleMonthlyCost


function deleteEmp() {
    $(this).parent().fadeOut();


    console.log($(this).parent().text());


    let target = $(this).parent()[0].cells[2].textContent;

    for (let emp of employees) {
        if (emp.empID == target) {
            let toDelete = employees.indexOf(emp);
            employees.splice(toDelete, 1);
        }
    }
    renderEmpData();

} // end deleteEmp