document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LIGHT/DARK THEME TOGGLE WITH MEMORY ---
    const themeBtn = document.getElementById('themeBtn');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeBtn) themeBtn.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeBtn) themeBtn.textContent = '🌙';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                themeBtn.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeBtn.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- 2. SET UP JOINERS CORE DATA SYSTEM ---
    let storedJoiners = localStorage.getItem('foundationJoinersList');
    if (!storedJoiners) {
        const initialMockJoiners = [
            { name: "Aaliyah Johnson", role: "Student", email: "aaliyah@example.com" },
            { name: "Elena Rostova", role: "Volunteer", email: "elena.r@example.com" },
            { name: "Priya Sharma", role: "Donor", email: "priya@example.com" }
        ];
        localStorage.setItem('foundationJoinersList', JSON.stringify(initialMockJoiners));
        storedJoiners = JSON.stringify(initialMockJoiners);
    }

    let joinersArray = JSON.parse(storedJoiners);
    let totalMembers = 1243 + joinersArray.length;

    const heroCounterDisplay = document.getElementById('heroCounterDisplay');
    const mainMemberCounter = document.getElementById('mainMemberCounter');
    const toastCounterDisplay = document.getElementById('toastCounterDisplay');

    function refreshCounterUI() {
        if (heroCounterDisplay) heroCounterDisplay.innerText = totalMembers.toLocaleString() + '+';
        if (toastCounterDisplay) toastCounterDisplay.innerText = totalMembers.toLocaleString() + '+';
        if (mainMemberCounter) {
            mainMemberCounter.setAttribute('data-target', totalMembers);
            mainMemberCounter.innerText = totalMembers.toLocaleString() + '+';
        }
    }
    refreshCounterUI();

    // --- 3. MULTI-COUNTER SCROLL ANIMATION ---
    const counterElements = document.querySelectorAll('.counter-number');
    
    function startCounterAnimations() {
        counterElements.forEach(counter => {
            const targetAttr = counter.getAttribute('data-target');
            const target = (counter.id === 'mainMemberCounter') ? totalMembers : parseInt(targetAttr);
            
            counter.innerText = '0';
            const speed = target / 40;

            const updateNumber = () => {
                const current = parseInt(counter.innerText.replace(/,/g, ''));
                if (current < target) {
                    counter.innerText = Math.ceil(current + speed).toLocaleString() + '+';
                    setTimeout(updateNumber, 25);
                } else {
                    counter.innerText = target.toLocaleString() + '+';
                }
            };
            updateNumber();
        });
    }

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                startCounterAnimations();
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const impactSection = document.getElementById('impact');
    if (impactSection) scrollObserver.observe(impactSection);

    // --- 4. ADMIN MEMBER REGISTRATION INTERACTIVE DIRECTORY ---
    const adminDashboardModal = document.getElementById('adminDashboardModal');
    const adminMembersTableBody = document.getElementById('adminMembersTableBody');
    const closeAdminModal = document.querySelector('.close-admin-modal');
    const adminSearchInput = document.getElementById('adminSearchInput');
    const btnExportCSV = document.getElementById('btnExportCSV');
    
    const memberImpactCard = document.getElementById('mainMemberCounter')?.closest('.counter-card');

    // Enhanced renderer featuring query dynamic searches and individual Delete Hooks
    function renderAdminTable(filterText = '') {
        if (!adminMembersTableBody) return;
        adminMembersTableBody.innerHTML = '';
        
        const query = filterText.toLowerCase().trim();
        
        // Maps the original raw data indexes before reversing so removals target the true records
        const dynamicRows = joinersArray.map((member, index) => ({ ...member, originalIndex: index })).reverse();
        let crossMatchCount = 0;

        dynamicRows.forEach(member => {
            if (query && !member.name.toLowerCase().includes(query) && !member.role.toLowerCase().includes(query)) {
                return;
            }

            crossMatchCount++;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${member.name}</strong></td>
                <td><span class="role-badge">${member.role}</span></td>
                <td>
                    <div class="admin-actions-cell" style="display: flex; gap: 12px; align-items: center;">
                        <a href="mailto:${member.email}?subject=Update from She Can Foundation&body=Hi ${member.name}," class="btn-update-email" title="Send Update Email">
                            <i class="fas fa-envelope"></i>
                        </a>
                        <button class="btn-delete-member" data-index="${member.originalIndex}" title="Remove Member" style="background: none; border: none; color: #ff4d6d; cursor: pointer; font-size: 1.1rem; padding: 0 5px; transition: opacity 0.2s;">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            `;
            adminMembersTableBody.appendChild(row);
        });

        // Attach standalone event assignments directly to rendered deletion targets
        document.querySelectorAll('.btn-delete-member').forEach(button => {
            button.addEventListener('click', () => {
                const targetIndex = parseInt(button.getAttribute('data-index'));
                removeMemberFromDirectory(targetIndex);
            });
        });

        if (crossMatchCount === 0) {
            adminMembersTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; opacity:0.6; padding: 20px;">No matching members discovered.</td></tr>`;
        }
    }

    // Handles element list slicing, storage updates, and updates counter values
    function removeMemberFromDirectory(index) {
        if (confirm(`Are you sure you want to remove ${joinersArray[index].name} from the directory?`)) {
            // Remove from core list
            joinersArray.splice(index, 1);
            
            // Re-sync local storage database entry
            localStorage.setItem('foundationJoinersList', JSON.stringify(joinersArray));
            
            // Decouple member numeric balances cleanly
            totalMembers -= 1;
            
            // Render screen interfaces back to current parameters
            refreshCounterUI();
            renderAdminTable(adminSearchInput ? adminSearchInput.value : '');
        }
    }

    if (adminSearchInput) {
        adminSearchInput.addEventListener('input', (e) => {
            renderAdminTable(e.target.value);
        });
    }

    if (btnExportCSV) {
        btnExportCSV.addEventListener('click', () => {
            if (joinersArray.length === 0) return alert("No list elements present to download.");
            
            let csvContent = "data:text/csv;charset=utf-8,Name,Role,Email\n";
            joinersArray.forEach(m => {
                csvContent += `"${m.name.replace(/"/g, '""')}","${m.role.replace(/"/g, '""')}","${m.email.replace(/"/g, '""')}"\n`;
            });

            const encodedUri = encodeURI(csvContent);
            const downloadAnchor = document.createElement("a");
            downloadAnchor.setAttribute("href", encodedUri);
            downloadAnchor.setAttribute("download", "She_Can_Foundation_Joiners.csv");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            document.body.removeChild(downloadAnchor);
        });
    }

    if (memberImpactCard) {
        memberImpactCard.addEventListener('click', () => {
            if (adminSearchInput) adminSearchInput.value = '';
            renderAdminTable();
            if (adminDashboardModal) adminDashboardModal.style.display = 'flex';
        });
    }

    if (closeAdminModal) {
        closeAdminModal.addEventListener('click', () => {
            if (adminDashboardModal) adminDashboardModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === adminDashboardModal) {
            adminDashboardModal.style.display = 'none';
        }
    });

    const btnEmailAll = document.getElementById('btnEmailAll');

    if (btnEmailAll) {
        btnEmailAll.addEventListener('click', () => {
            if (joinersArray.length === 0) {
                return alert("There are no joiners in the list to email.");
            }

            const emailList = joinersArray.map(member => member.email).join(',');
            const subject = encodeURIComponent("An update from She Can Foundation");
            const body = encodeURIComponent("Hello Team,\n\nWe are absolutely thrilled to welcome you as official joiners of the She Can Foundation family!");
            
            window.location.href = `mailto:info@shecanfoundation.org?bcc=${emailList}&subject=${subject}&body=${body}`;
        });
    }

    // --- 5. BACKGROUND FORM PROCESSING (NOTIFICATION ONLY) ---
    const formsList = ['heroFormObj', 'contactFormObj', 'newsletterFormObj'];
    
    formsList.forEach(formId => {
        const formElement = document.getElementById(formId);
        if (!formElement) return;

        formElement.addEventListener('submit', async (event) => {
            event.preventDefault();

            const successCard = document.getElementById('successCard');
            const alertCard = document.getElementById('alertCard');
            const metricCard = document.getElementById('metricCard');
            const dynamicNameSpan = document.getElementById('dynamicJoinerName'); // Target the HTML container name placeholder
            const submitBtn = formElement.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

            const dataPayload = new FormData(formElement);

            try {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Submitting...`;
                }

                // Dispatches endpoint call. Transmits form logs EXCLUSIVELY to your inbox.
                const networkResponse = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: dataPayload
                });

                if (networkResponse.ok) {
                    if (formId === 'heroFormObj') {
                        const capturedName = dataPayload.get('name');
                        const capturedEmail = dataPayload.get('email');
                        const capturedRole = dataPayload.get('joinAsRole') || 'Student';

                        // Set the dynamic joiner name inside the banner before showing the card
                        if (dynamicNameSpan && capturedName) {
                            dynamicNameSpan.innerText = capturedName;
                        } else if (dynamicNameSpan) {
                            dynamicNameSpan.innerText = "New Member";
                        }

                        // Save joiner record values locally for your Admin panel
                        joinersArray.push({
                            name: capturedName,
                            role: capturedRole,
                            email: capturedEmail
                        });
                        localStorage.setItem('foundationJoinersList', JSON.stringify(joinersArray));

                        totalMembers += 1;
                        refreshCounterUI();
                        
                        if (alertCard) alertCard.style.display = 'block';
                        if (metricCard) metricCard.style.display = 'block';
                    }

                    formElement.reset();
                    if (successCard) successCard.style.display = 'block';

                } else {
                    alert("Submission error. Please ensure your access token code is valid.");
                }
            } catch (error) {
                console.error("Form error:", error);
                alert("Network communication failure. Please check your connection.");
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }
        });
    });

    // --- 6. FLIP CARDS CLICK EVENT ---
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // --- 7. POPUP WINDOW MANIPULATION ---
    document.querySelectorAll('.close-mock').forEach(closeButton => {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const toastElement = closeButton.closest('.mock-toast');
            if (toastElement) toastElement.style.display = 'none';
        });
    });

    const closeOkButton = document.querySelector('.ok-btn');
    if (closeOkButton) {
        closeOkButton.addEventListener('click', () => {
            const successCard = document.getElementById('successCard');
            if (successCard) successCard.style.display = 'none';
        });
    }
});