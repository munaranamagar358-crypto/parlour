// ==============================
// Glow Beauty Parlour Management System
// ==============================

// Load Appointments from Local Storage
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// Services
const services = [
    "Facial Treatment",
    "Hair Cut & Styling",
    "Bridal Makeup",
    "Manicure",
    "Waxing",
    "Spa & Massage"
];

// ==============================
// Save Data
// ==============================

function saveData() {
    localStorage.setItem("appointments", JSON.stringify(appointments));
}

// ==============================
// Dashboard
// ==============================

function updateDashboard() {

    const customerCount = document.getElementById("customerCount");
    const serviceCount = document.getElementById("serviceCount");
    const appointmentCount = document.getElementById("appointmentCount");

    if (customerCount) customerCount.textContent = appointments.length;
    if (serviceCount) serviceCount.textContent = services.length;
    if (appointmentCount) appointmentCount.textContent = appointments.length;

}

// ==============================
// Appointment Functions
// ==============================

function addAppointment(customer, service, date, time) {

    appointments.push({
        id: Date.now(),
        customer,
        service,
        date,
        time
    });

    saveData();
    displayAppointments();
    updateDashboard();

}

function deleteAppointment(id) {

    appointments = appointments.filter(app => app.id !== id);

    saveData();
    displayAppointments();
    updateDashboard();

}

window.deleteAppointment = deleteAppointment;

// ==============================
// Display Appointments
// ==============================

function displayAppointments() {

    const table = document.getElementById("appointmentTable");

    if (!table) return;

    table.innerHTML = "";

    if (appointments.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center;">
                No Appointments Found
            </td>
        </tr>
        `;

        return;
    }

    appointments.forEach(app => {

        table.innerHTML += `
        <tr>
            <td>${app.customer}</td>
            <td>${app.service}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td>
                <button onclick="deleteAppointment(${app.id})">
                    Cancel
                </button>
            </td>
        </tr>
        `;

    });

}

// ==============================
// Smooth Scroll
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

// ==============================
// Page Load
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    updateDashboard();
    displayAppointments();

    const appointmentForm = document.getElementById("appointmentForm");

    appointmentForm.addEventListener("submit", function(e){

        e.preventDefault();

        const customer = document.getElementById("appCustomer").value.trim();
        const service = document.getElementById("appService").value;
        const date = document.getElementById("appDate").value;
        const time = document.getElementById("appTime").value;

        if(customer==="" || service==="" || date==="" || time===""){
            alert("Please fill all fields!");
            return;
        }

        addAppointment(customer,service,date,time);

        alert("Appointment Booked Successfully!");

        appointmentForm.reset();

    });

});
