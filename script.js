// Sample employee data (IDs)
const employees = [
  { id: '162721', name: 'Ryder' },
  { id: '834868', name: 'Mia' },
  { id: '091827', name: 'Emma' }
];

// Login elements
const loginPage = document.getElementById('loginPage');
const chatApp = document.getElementById('chatApp');
const loginInput = document.getElementById('loginInput');
const loginButton = document.getElementById('loginButton');
const loginError = document.getElementById('loginError');

// Chat elements
const employeeList = document.getElementById('employeeList');
const searchInput = document.getElementById('searchInput');
const chatWith = document.getElementById('chatWith');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');

let loggedInEmployee = null;
let selectedEmployeeId = null;
let chatHistory = {};

// Login logic
loginButton.addEventListener('click', () => {
  const enteredId = loginInput.value.trim();
  const employee = employees.find(emp => emp.id === enteredId);

  if (employee) {
    loggedInEmployee = employee;
    loginPage.style.display = 'none';
    chatApp.style.display = 'flex';
    loadEmployeeList();
  } else {
    loginError.style.display = 'block';
  }
});

// Populate the employee list
function loadEmployeeList() {
  employeeList.innerHTML = ''; // Clear previous list
  employees.forEach(employee => {
    if (employee.id !== loggedInEmployee.id) { // Don't list yourself
      const li = document.createElement('li');
      li.textContent = `${employee.name} (${employee.id})`;
      li.addEventListener('click', () => selectEmployee(employee));
      employeeList.appendChild(li);
    }
  });
}

// Select an employee to chat with
function selectEmployee(employee) {
  selectedEmployeeId = employee.id;
  chatWith.textContent = `Chat with: ${employee.name} (${employee.id})`;
  loadChatHistory(employee.id);
}

// Load chat history for the selected employee
function loadChatHistory(employeeId) {
  messages.innerHTML = '';
  const history = chatHistory[employeeId] || [];
  history.forEach(msg => addMessageToUI(msg));
}

// Add a message to the UI
function addMessageToUI(message) {
  const bubble = document.createElement('div');
  bubble.classList.add('message-bubble');
  bubble.classList.add(message.sender === loggedInEmployee.id ? 'sent' : 'received');
  bubble.textContent = message.text;
  messages.appendChild(bubble);
}

// Send a message
sendMessageButton.addEventListener('click', () => {
  if (!selectedEmployeeId || !messageInput.value) return;

  const message = {
    sender: loggedInEmployee.id,
    text: messageInput.value
  };

  // Save message to history
  if (!chatHistory[selectedEmployeeId]) {
    chatHistory[selectedEmployeeId] = [];
  }
  chatHistory[selectedEmployeeId].push(message);

  // Add message to the UI
  addMessageToUI(message);

  // Clear the input field
  messageInput.value = '';
});
