let currentRole = 'student'; 

function switchView(viewName, selectedRole) {
    if (selectedRole) {
        currentRole = selectedRole;
    }

    const listContainer = document.getElementById('view-list');
    const profileContainer = document.getElementById('view-profile');
    
    listContainer.className = 'view hidden white-container role-' + currentRole;
    profileContainer.className = 'view hidden white-container role-' + currentRole;

    if (currentRole === 'teacher') {
        document.getElementById('list-title-text').innerText = "Teacher Records";
        document.getElementById('profile-title-text').innerText = "Teacher Profile";
    } else {
        document.getElementById('list-title-text').innerText = "Student Records";
        document.getElementById('profile-title-text').innerText = "Student Profile";
    }

    document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
    document.getElementById('view-' + viewName).classList.remove('hidden');

    const pageHeader = document.getElementById('main-page-header');
    if(viewName === 'blank') {
        pageHeader.classList.add('hidden');
    } else {
        pageHeader.classList.remove('hidden');
    }

    if(viewName !== 'blank') {
        document.querySelectorAll('.sidebar-list li').forEach(li => li.classList.remove('active'));
        document.getElementById('nav-account-list').classList.add('active');
    }

    if(viewName === 'selection' || viewName === 'list') {
        resetAllGeneralSettings();
    }
}

function handleSidebarClick(element, targetView) {
    document.querySelectorAll('.sidebar-list li').forEach(li => li.classList.remove('active'));
    element.classList.add('active');
    switchView(targetView, 'student'); 
}

function handleModalTrackChange(trackValue) {
    const sectionSelect = document.getElementById('modal-input-section');
    if (trackValue === 'TVL') {
        sectionSelect.disabled = false;
        sectionSelect.className = "section-enabled";
    } else {
        sectionSelect.disabled = true;
        sectionSelect.className = "section-disabled";
    }
}

function openModal(modalType) {
    if(modalType === 'edit' && document.getElementById('btn-edit-details').classList.contains('cooldown-active')) return;
    if(modalType === 'password' && document.getElementById('btn-reset-password').classList.contains('cooldown-active')) return;
    if(modalType === 'deactivate' && document.getElementById('btn-deactivate').classList.contains('cooldown-active')) return;

    document.getElementById('modal-container').classList.remove('hidden');
    document.getElementById('modal-edit-student').classList.add('hidden');
    document.getElementById('modal-edit-teacher').classList.add('hidden');
    document.getElementById('modal-password').classList.add('hidden');
    document.getElementById('modal-deactivate').classList.add('hidden');

    if (modalType === 'edit') {
        if (currentRole === 'teacher') {
            document.getElementById('modal-edit-teacher').classList.remove('hidden');
        } else {
            document.getElementById('modal-edit-student').classList.remove('hidden');
        }
    } else {
        document.getElementById('modal-' + modalType).classList.remove('hidden');
    }
}

function closeModal() {
    document.getElementById('modal-container').classList.add('hidden');
}

function confirmAction(actionType) {
    closeModal();

    if(actionType === 'edit') {
        setButtonCooldown('btn-edit-details', 'cooldown-edit');
    } else if(actionType === 'password') {
        setButtonCooldown('btn-reset-password', 'cooldown-password');
    } else if(actionType === 'deactivate') {
        setButtonCooldown('btn-deactivate', 'cooldown-deactivate');
    }
}

function setButtonCooldown(buttonId, cooldownTextId) {
    const btn = document.getElementById(buttonId);
    const txt = document.getElementById(cooldownTextId);

    btn.classList.add('cooldown-active');
    txt.classList.remove('hidden');
}

function resetAllGeneralSettings() {
    const btnEdit = document.getElementById('btn-edit-details');
    if (btnEdit) btnEdit.classList.remove('cooldown-active');
    const cdEdit = document.getElementById('cooldown-edit');
    if (cdEdit) cdEdit.classList.add('hidden');

    const btnPass = document.getElementById('btn-reset-password');
    if (btnPass) btnPass.classList.remove('cooldown-active');
    const cdPass = document.getElementById('cooldown-password');
    if (cdPass) cdPass.classList.add('hidden');

    const btnDeact = document.getElementById('btn-deactivate');
    if (btnDeact) btnDeact.classList.remove('cooldown-active');
    const cdDeact = document.getElementById('cooldown-deactivate');
    if (cdDeact) cdDeact.classList.add('hidden');

    const sectionSelect = document.getElementById('modal-input-section');
    if (sectionSelect) {
        document.getElementById('modal-input-track').value = "Academics";
        sectionSelect.value = "Lmao";
        sectionSelect.disabled = true;
        sectionSelect.className = "section-disabled";
    }
}