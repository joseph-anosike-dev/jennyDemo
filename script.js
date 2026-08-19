        // 1. App Routing / View Switching Logic
        function switchView(viewId) {
            // Check if view exists
            const targetView = document.getElementById(viewId);
            if (!targetView || !targetView.classList.contains('view-section')) return;

            // Hide all views
            document.querySelectorAll('.view-section').forEach(view => {
                view.classList.remove('active');
            });
            
            // Show target view
            targetView.classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Update Active Nav Link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + viewId) {
                    link.classList.add('active');
                }
            });

            // Toggle Global Bottom CTA
            const bottomCta = document.getElementById('global-bottom-cta');
            if (viewId === 'store' || viewId === 'contact' || viewId === 'academy') {
                bottomCta.style.display = 'none';
            } else {
                bottomCta.style.display = 'block';
            }

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }

        // Intercept App Links
        document.querySelectorAll('.app-link').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                // Change View
                switchView(targetId);
                
                // Push State to History (to allow native Back/Forward buttons)
                history.pushState({ view: targetId }, null, '#' + targetId);
            });
        });

        // Handle Browser Back/Forward buttons
        window.addEventListener('popstate', (e) => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                switchView(hash);
            } else {
                switchView('home');
            }
        });

        // Initialize App based on current URL
        window.addEventListener('DOMContentLoaded', () => {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                switchView(hash);
            } else {
                switchView('home');
                history.replaceState({ view: 'home' }, null, '#home');
            }
        });


        // 2. Mobile Hamburger Menu
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const navLinks = document.getElementById('navLinks');

        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });


        // 3. Pre-Order Modal Logic
        const modal = document.getElementById('preOrderModal');
        const openModalBtns = document.querySelectorAll('.btn-open-modal');
        const closeModalBtn = document.getElementById('closeModal');
        const modalProductName = document.getElementById('modalProductName');
        const hiddenProductName = document.getElementById('hiddenProductName');

        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const product = btn.getAttribute('data-product');
                modalProductName.textContent = product;
                hiddenProductName.value = product;
                modal.classList.add('active');
            });
        });

        closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });


        // 4. Login / Signup Tab Switching
        function switchTab(tabId) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            if (tabId === 'login') {
                document.querySelectorAll('.tab-btn')[0].classList.add('active');
                document.getElementById('login-tab').classList.add('active');
            } else {
                document.querySelectorAll('.tab-btn')[1].classList.add('active');
                document.getElementById('signup-tab').classList.add('active');
            }
        }


        // 5. Form Submissions & Demo Notifications
        const toast = document.getElementById('toast');
        
        function showNotification(message) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        document.querySelectorAll('.demo-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                let message = "Action completed successfully!";
                
                if (form.id === 'contactForm') message = "Message submitted for this demo. We'll get back to you!";
                else if (form.id === 'loginForm') message = "Demo Login successful. Welcome back!";
                else if (form.id === 'signupForm') message = "Student Account created for this demo!";
                else if (form.id === 'preOrderForm') {
                    message = "Pre-Order request received successfully!";
                    modal.classList.remove('active');
                }
                
                showNotification(message);
                form.reset();
            });
        });

        // 6. Academy Details/Summary Accordion Constraint
        const detailsElements = document.querySelectorAll('details');
        detailsElements.forEach(targetDetail => {
            targetDetail.addEventListener('click', () => {
                detailsElements.forEach(detail => {
                    if (detail !== targetDetail) detail.removeAttribute('open');
                });
            });
        });
