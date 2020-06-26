$(document).ready(init);

function init() {
    console.log(`Hey you it's jQ!`);
    $('#js-new-emp-form').on('submit', addEmp);
}

function addEmp(event) {
    event.preventDefault();
    console.log(`I've been clicked!`);

}