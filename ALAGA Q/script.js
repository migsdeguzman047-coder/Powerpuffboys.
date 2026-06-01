function updateStaffPanel() {
    const queueData = JSON.parse(localStorage.getItem('alagaq_queue')) || [];
    
    const currentNumDisplay = document.getElementById('staff-current-number');
    const queueListUI = document.getElementById('queue-list');

    if (queueData.length > 0) {
        currentNumDisplay.innerText = queueData[0].number;

        const nextPatients = queueData.slice(1);
        
        queueListUI.innerHTML = nextPatients.map(p => `
            <li class="queue-item">
                <div class="item-left">
                    <span class="item-no">${p.number}</span> - <span>${p.name}</span>
                </div>
                <div class="item-service">${p.service}</div>
            </li>
        `).join('');
    } else {
        currentNumDisplay.innerText = "--";
        queueListUI.innerHTML = "<p style='text-align:center; color:#888;'>Queue is empty</p>";
    }
}

document.getElementById('btn-next').addEventListener('click', () => {
    let queueData = JSON.parse(localStorage.getItem('alagaq_queue')) || [];
    if (queueData.length > 0) {
        queueData.shift();
        localStorage.setItem('alagaq_queue', JSON.stringify(queueData));
        updateStaffPanel();
        localStorage.setItem('newItemTrigger', Date.now());
    }
});

document.getElementById('btn-skip').addEventListener('click', () => {
    let queueData = JSON.parse(localStorage.getItem('alagaq_queue')) || [];
    if (queueData.length > 0) {
        const skipped = queueData.shift();
        queueData.push(skipped);
        localStorage.setItem('alagaq_queue', JSON.stringify(queueData));
        updateStaffPanel();
        localStorage.setItem('newItemTrigger', Date.now());
    }
});

document.getElementById('btn-recall').addEventListener('click', () => {

    localStorage.setItem('newItemTrigger', Date.now());
    alert("Patient Recalled!");
});

window.addEventListener('storage', updateStaffPanel);
updateStaffPanel();
setInterval(updateStaffPanel, 2000);