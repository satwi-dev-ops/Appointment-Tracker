document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const appointmentDate = document.getElementById('appointmentDate').value;

    const appointment = {
        name,
        email,
        appointmentDate,
        id: Date.now()
    };

    addAppointmentToList(appointment);
    saveAppointment(appointment);

    this.reset();
});

function addAppointmentToList(appointment) {
    const appointmentsList = document.getElementById('appointments');

    const li = document.createElement('li');
    li.textContent = `${appointment.name} - ${appointment.email} - ${appointment.appointmentDate}`;
    li.setAttribute('data-id', appointment.id);

    const rescheduleButton = document.createElement('button');
    rescheduleButton.textContent = 'Reschedule';
    rescheduleButton.addEventListener('click', () => rescheduleAppointment(appointment.id));

    li.appendChild(rescheduleButton);
    appointmentsList.appendChild(li);
}

function saveAppointment(appointment) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.forEach(addAppointmentToList);
}

function rescheduleAppointment(id) {
    const newDate = prompt('Enter new appointment date (YYYY-MM-DD):');
    if (newDate) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const appointmentIndex = appointments.findIndex(appointment => appointment.id === id);
        if (appointmentIndex !== -1) {
            appointments[appointmentIndex].appointmentDate = newDate;
            localStorage.setItem('appointments', JSON.stringify(appointments));
            document.getElementById('appointments').innerHTML = '';
            loadAppointments();
        }
    }
}

// Load appointments on page load
document.addEventListener('DOMContentLoaded', loadAppointments);
