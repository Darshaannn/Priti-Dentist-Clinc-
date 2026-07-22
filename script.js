document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const enquiryForm = document.getElementById('enquiryForm');
    const formSuccess = document.getElementById('formSuccess');

    // 1. Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            
            if (isOpen) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            
            // Re-create icons to reflect change
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            }
        });
    });

    // 3. Navigation link active state on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // 4. Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. Contact Enquiry Form submission
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form Data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation check
            if (name && phone && email && message) {
                // Simulate form submission API call
                const submitButton = enquiryForm.querySelector('.btn-submit');
                submitButton.textContent = 'SENDING...';
                submitButton.disabled = true;

                setTimeout(() => {
                    // Hide form and display success message
                    enquiryForm.style.display = 'none';
                    if (formSuccess) {
                        formSuccess.style.display = 'flex';
                    }
                }, 1000);
            }
        });
    }

    // 6. Testimonials Slider
    const testimonialTrack = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const sliderDotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;

    function initSlider() {
        if (!testimonialTrack) return;
        
        const cards = testimonialTrack.querySelectorAll('.patient-testimonial-card');
        const totalCards = cards.length;
        
        function getSlidesCount() {
            const isMobile = window.innerWidth <= 900;
            return isMobile ? totalCards : totalCards - 1;
        }
        
        function renderDots() {
            if (!sliderDotsContainer) return;
            sliderDotsContainer.innerHTML = '';
            const totalSlides = getSlidesCount();
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.className = i === currentSlide ? 'dot active' : 'dot';
                dot.setAttribute('data-index', i);
                dot.addEventListener('click', () => {
                    updateSlider(i);
                });
                sliderDotsContainer.appendChild(dot);
            }
        }
        
        function updateSlider(index) {
            const totalSlides = getSlidesCount();
            currentSlide = index;
            if (currentSlide >= totalSlides) currentSlide = 0;
            if (currentSlide < 0) currentSlide = totalSlides - 1;

            const isMobile = window.innerWidth <= 900;
            if (isMobile) {
                testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            } else {
                testimonialTrack.style.transform = `translateX(calc(-${currentSlide * 50}% - ${currentSlide * 15}px))`;
            }
            
            const dots = sliderDotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, idx) => {
                if (idx === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        if (nextBtn) {
            const newNextBtn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
            newNextBtn.addEventListener('click', () => {
                updateSlider(currentSlide + 1);
            });
        }

        if (prevBtn) {
            const newPrevBtn = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
            newPrevBtn.addEventListener('click', () => {
                updateSlider(currentSlide - 1);
            });
        }
        
        window.addEventListener('resize', () => {
            const totalSlides = getSlidesCount();
            if (currentSlide >= totalSlides) {
                currentSlide = totalSlides - 1;
            }
            updateSlider(currentSlide);
            renderDots();
        });
        
        renderDots();
        updateSlider(currentSlide);
    }
    
    initSlider();



    // 7. Language Switcher (EN | HI)
    const translations = {
        en: {
            nav_home: "Home",
            nav_services: "Services",
            nav_about: "About",
            nav_contact: "Contact",
            call_clinic: "Call Clinic",
            get_in_touch: "Get in Touch",
            hero_badge: "GENTLE CARE. LASTING CONFIDENCE.",
            hero_title: 'Comfort today.<br>Healthy smiles<br><span class="italic-highlight">for life.</span>',
            hero_desc: "Welcome to PritiSmile Dental Clinic, Mumbai, where advanced dentistry meets compassionate, gentle care. Led by Dr. Priti Parmar, we are committed to making your dental visit comfortable and stress-free.",
            hero_cta_book: "Book an Appointment",
            hero_cta_services: "Check Our Services",
            hero_cta_explore: "Explore Services",
            dr_name: "DR. PRITI PARMAR",
            dr_degree: "B.D.S. (Mumbai)",
            dr_surgeon: "Dental Surgeon",
            info_timings_title: "TIMINGS",
            info_morning: "Morning 10:30am – 01:00pm",
            info_evening: "Evening 06:00pm – 09:00pm",
            info_closed: "Closed on Sunday",
            info_call_hours: "Call only in the working hours",
            info_hours_desc: "Morning &nbsp;10:30am – 01:00pm<br>Evening &nbsp;06:00pm – 09:00pm<br><span class=\"time-closed\">Closed on Sunday</span><br><span class=\"time-call-hours\">Call only in the working hours</span>",
            info_address_title: "ADDRESS",
            info_address_val: "B-14, Pansare Sadan, Kailashpuram Rd, Mohili Village, Opp. Dr. Venkat Lab, Sakinaka, Mumbai - 400072",
            services_badge: "OUR SERVICES",
            services_title: 'Comprehensive Care for a <span class="italic-highlight">Healthier Smile.</span>',
            services_subtitle: "From preventive care to advanced treatments,<br>we keep your smile strong and bright.",
            srv_general_title: "General Dentistry",
            srv_general_desc: "Routine check-ups, fillings, and treatments for everyday oral health.",
            srv_cosmetic_title: "Cosmetic Dentistry",
            srv_cosmetic_desc: "Enhance your smile with teeth whitening, veneers, and smile makeovers.",
            srv_preventive_title: "Preventive Care",
            srv_preventive_desc: "Protect your teeth with cleanings, fluoride, and personalized guidance.",
            srv_restorative_title: "Restorative Care",
            srv_restorative_desc: "Crowns, bridges, and restorations to repair and strengthen your teeth.",
            srv_cleaning_title: "Teeth Cleaning",
            srv_cleaning_desc: "Professional cleaning to remove plaque and keep your smile fresh.",
            srv_rootcanal_title: "Root Canal Treatment",
            srv_rootcanal_desc: "Relieve pain and save your natural teeth with advanced root canal care.",
            srv_cta_bar_title: "Every smile is unique. So is our care.",
            srv_cta_bar_subtitle: "Let us help you keep yours healthy for life.",
            srv_cta_needhelp: "Need help or have questions?",
            srv_cta_callaway: "We're just a call away!",
            about_badge: "ABOUT DR. PRITI PARMAR",
            about_title: 'About <span class="italic-highlight">Dr. Priti</span> Parmar',
            about_subtitle: "B.D.S. (Mumbai) &nbsp;|&nbsp; Dental Surgeon",
            about_desc: "Dr. Priti Parmar is dedicated to providing gentle, ethical and personalized dental care. With years of experience and a passion for patient well-being, she focuses on prevention, long-term oral health, and creating beautiful, confident smiles.",
            trust_title: "Our Quality Promise",
            trust_subtitle: "Why patients trust us with their family's smiles",
            trust_p1_title: "100% Sterile & Hygienic",
            trust_p1_desc: "Strict sanitization and chemical/steam sterilization matching international clinic standards.",
            trust_p2_title: "Patient-First Care",
            trust_p2_desc: "Empathetic, gentle treatments with clear upfront pricing and transparent explanations.",
            trust_p3_title: "Modern Dental Tech",
            trust_p3_desc: "Advanced dental tools for less invasive, painless, and extremely precise treatments.",
            stat_exp_desc: "Years of Experience",
            stat_patients_desc: "Happy Patients",
            stat_cert_num: "Certified",
            stat_cert_desc: "Dental Professional",
            stat_trust_num: "Trusted",
            stat_trust_desc: "by Families",
            about_quote: "Your smile. My priority.",
            testimonials_badge: "WHAT OUR PATIENTS SAY",
            testimonials_title: "Trusted by Hundreds of Happy Patients",
            test_body_neha: "Very friendly and explains everything patiently. The clinic is clean, modern and makes you feel comfortable.",
            test_body_priyanka: "Amazing experience! Got my treatment done without any pain. Highly recommend Dr. Priti Parmar.",
            test_body_rahul: "Professional, gentle and genuinely cares about her patients. The best dental care I've ever received.",
            test_body_vikram: "Highly professional clinic. Dr. Priti and her staff follow top-notch hygiene protocols. The root canal treatment was completely painless, and she explained the process very clearly.",
            test_body_sunita: "Excellent experience for my children. Dr. Priti Parmar is very gentle and friendly with kids, making them feel absolutely safe and comfortable during the extraction.",
            test_google_btn: "Give us Reviews on google 😊",
            contact_badge: "GET IN TOUCH",
            contact_title: 'We\'re here<br><span class="italic-highlight">to help.</span>',
            contact_subtitle: "Fill in your details and our team will get back to you shortly.",
            placeholder_name: "Full Name",
            placeholder_phone: "Phone Number",
            placeholder_email: "Email Address",
            placeholder_message: "Your Message",
            btn_send_message: "Send Message",
            form_success_title: "Thank you!",
            form_success_desc: "Your enquiry has been sent. We will get back to you shortly.",
            talk_cta_title: "Prefer to talk?",
            talk_cta_desc: "Call us directly. We're happy to assist you.",
            talk_hours: "(Mon–Sat, 10:30am – 09:00pm)",
            details_badge: "CLINIC DETAILS",
            details_call: "Call Us",
            details_loc: "Our Location",
            details_hours: "Clinic Hours",
            details_email: "Email Us",
            footer_desc: "Personalized dental care in a calm, modern space—because your comfort comes first.",
            footer_col_links: "QUICK LINKS",
            footer_col_services: "OUR SERVICES",
            footer_col_details: "CLINIC DETAILS",
            footer_col_nextsteps: "NEXT STEPS",
            step_book_title: "Book a Visit",
            step_book_desc: "Schedule your appointment in just a few clicks.",
            step_call_title: "Call Us",
            step_call_desc: "Speak to our team for any queries.",
            step_ask_title: "Ask a Question",
            step_ask_desc: "We're here to help you with a smile.",
            sticky_call: "Call Clinic",
            sticky_whatsapp: "WhatsApp Us",
            nav_about_us: "About Us",
            nav_contact_us: "Contact Us",
            thank_you_smile: "Thank you for trusting us with your smile.",
            footer_rights: "All rights reserved.",
            footer_privacy: "Privacy Policy",
            footer_terms: "Terms & Conditions",
            footer_sitemap: "Sitemap"
        },
        hi: {
            nav_home: "होम",
            nav_services: "सेवाएं",
            nav_about: "हमारे बारे में",
            nav_contact: "संपर्क",
            call_clinic: "क्लीनिक को कॉल करें",
            get_in_touch: "संपर्क करें",
            hero_badge: "कोमल देखभाल। स्थायी आत्मविश्वास।",
            hero_title: 'आज आराम।<br>स्वस्थ मुस्कान<br><span class="italic-highlight">जीवन भर के लिए।</span>',
            hero_desc: "प्रीतिस्माइल डेंटल क्लीनिक, मुंबई में आपका स्वागत है, जहां उन्नत दंत चिकित्सा के साथ दयालु, कोमल देखभाल मिलती है। डॉ. प्रीति परमार के नेतृत्व में, हम आपकी दंत यात्रा को आरामदायक और तनाव मुक्त बनाने के लिए प्रतिबद्ध हैं।",
            hero_cta_book: "अपॉइंटमेंट बुक करें",
            hero_cta_services: "हमारी सेवाएं देखें",
            hero_cta_explore: "सेवाएं देखें",
            dr_name: "डॉ. प्रीति परमार",
            dr_degree: "बी.डी.एस. (मुंबई)",
            dr_surgeon: "दंत शल्य चिकित्सक",
            info_timings_title: "समय",
            info_morning: "सुबह 10:30 – दोपहर 01:00",
            info_evening: "शाम 06:00 – रात 09:00",
            info_closed: "रविवार को बंद",
            info_call_hours: "केवल काम के घंटों के दौरान कॉल करें",
            info_hours_desc: "सुबह &nbsp;10:30 – दोपहर 01:00<br>शाम &nbsp;06:00 – रात 09:00<br><span class=\"time-closed\">रविवार को बंद</span><br><span class=\"time-call-hours\">केवल काम के घंटों के दौरान कॉल करें</span>",
            info_address_title: "पता",
            info_address_val: "B-14, पंसारे सदन, कैलाशपुरम रोड, मोहिली विलेज, डॉ. वेंकट लैब के सामने, साकीनाका, मुंबई - 400072",
            services_badge: "हमारी सेवाएं",
            services_title: 'स्वस्थ मुस्कान के लिए <span class="italic-highlight">व्यापक देखभाल।</span>',
            services_subtitle: "निवारक देखभाल से लेकर उन्नत उपचारों तक,<br>हम आपकी मुस्कान को मजबूत और चमकदार रखते हैं।",
            srv_general_title: "सामान्य दंत चिकित्सा",
            srv_general_desc: "रोजमर्रा के मौखिक स्वास्थ्य के लिए नियमित जांच, फिलिंग और उपचार।",
            srv_cosmetic_title: "कॉस्मेटिक दंत चिकित्सा",
            srv_cosmetic_desc: "दांतों की सफेदी, विनियर और स्माइल मेकओवर के साथ अपनी मुस्कान को निखारें।",
            srv_preventive_title: "निवारक देखभाल",
            srv_preventive_desc: "सफाई, फ्लोराइड और व्यक्तिगत मार्गदर्शन से अपने दांतों की रक्षा करें।",
            srv_restorative_title: "रिस्टोरेटिव देखभाल",
            srv_restorative_desc: "आपके दांतों की मरम्मत और मजबूती के लिए क्राउन, ब्रिज और रिस्टोरेशन।",
            srv_cleaning_title: "दांतों की सफाई",
            srv_cleaning_desc: "प्लाक हटाने और अपनी मुस्कान को तरोताजा रखने के लिए पेशेवर सफाई।",
            srv_rootcanal_title: "रूट कैनाल उपचार",
            srv_rootcanal_desc: "उन्नत रूट कैनाल देखभाल के साथ दर्द से राहत पाएं और अपने प्राकृतिक दांतों को बचाएं।",
            srv_cta_bar_title: "हर मुस्कान अनोखी है। हमारी देखभाल भी ऐसी ही है।",
            srv_cta_bar_subtitle: "हमें इसे जीवन भर स्वस्थ रखने में आपकी मदद करने दें।",
            srv_cta_needhelp: "मदद चाहिए या कोई सवाल हैं?",
            srv_cta_callaway: "हम बस एक कॉल की दूरी पर हैं!",
            about_badge: "डॉ. प्रीति परमार के बारे में",
            about_title: 'के बारे में <span class="italic-highlight">डॉ. प्रीति</span> परमार',
            about_subtitle: "बी.डी.एस. (मुंबई) &nbsp;|&nbsp; दंत शल्य चिकित्सक",
            about_desc: "डॉ. प्रीति परमार कोमल, नैतिक और व्यक्तिगत दंत चिकित्सा देखभाल प्रदान करने के लिए समर्पित हैं। वर्षों के अनुभव और रोगी कल्याण के जुनून के साथ, वह रोकथाम, दीर्घकालिक मौखिक स्वास्थ्य और सुंदर, आत्मविश्वास से भरी मुस्कान बनाने पर ध्यान केंद्रित करती हैं।",
            trust_title: "हमारा गुणवत्ता संकल्प",
            trust_subtitle: "मरीज अपनी मुस्कान के लिए हम पर भरोसा क्यों करते हैं",
            trust_p1_title: "100% स्वच्छ और विसंक्रमित",
            trust_p1_desc: "अंतरराष्ट्रीय मानकों के अनुसार कठोर स्वच्छता और उपकरणों की पूर्ण नसबंदी।",
            trust_p2_title: "मरीज-प्रथम दृष्टिकोण",
            trust_p2_desc: "बिना किसी छिपे हुए खर्च के, स्पष्टीकरण के साथ कोमल और संवेदनशील इलाज।",
            trust_p3_title: "आधुनिक डेंटल तकनीक",
            trust_p3_desc: "अत्याधुनिक उपकरणों द्वारा दर्द रहित और सटीक उपचार।",
            stat_exp_desc: "वर्षों का अनुभव",
            stat_patients_desc: "संतुष्ट मरीज",
            stat_cert_num: "प्रमाणित",
            stat_cert_desc: "दंत पेशेवर",
            stat_trust_num: "विश्वसनीय",
            stat_trust_desc: "परिवारों द्वारा",
            about_quote: "आपकी मुस्कान। मेरी प्राथमिकता।",
            testimonials_badge: "हमारे मरीज क्या कहते हैं",
            testimonials_title: "सैकड़ों खुशहाल मरीजों द्वारा विश्वसनीय",
            test_body_neha: "बहुत दोस्ताना व्यवहार और धैर्यपूर्वक सब कुछ समझाती हैं। क्लीनिक साफ, आधुनिक है और आपको सहज महसूस कराता है।",
            test_body_priyanka: "अद्भुत अनुभव! बिना किसी दर्द के मेरा इलाज हो गया। डॉ. प्रीति परमार की अत्यधिक अनुशंसा करते हैं।",
            test_body_rahul: "पेशेवर, सौम्य और वास्तव में अपने मरीजों की परवाह करती हैं। दंत चिकित्सा की सबसे अच्छी देखभाल जो मुझे कभी मिली है।",
            test_body_vikram: "अत्यंत पेशेवर क्लीनिक। डॉ. प्रीति और उनका स्टाफ सर्वोत्तम स्वच्छता नियमों का पालन करता है। रूट कैनाल का इलाज पूरी तरह से दर्द रहित था, और उन्होंने प्रक्रिया को बहुत स्पष्ट रूप से समझाया।",
            test_body_sunita: "मेरे बच्चों के लिए बेहतरीन अनुभव। डॉ. प्रीति परमार बच्चों के साथ बहुत कोमल और मित्रवत हैं, जिससे वे दांत निकालने के दौरान बिल्कुल सुरक्षित और सहज महसूस करते हैं।",
            test_google_btn: "हमें गूगल पर समीक्षाएं दें 😊",
            contact_badge: "संपर्क करें",
            contact_title: 'हम यहाँ हैं<br><span class="italic-highlight">आपकी मदद के लिए।</span>',
            contact_subtitle: "अपना विवरण भरें और हमारी टीम जल्द ही आपसे संपर्क करेगी।",
            placeholder_name: "पूरा नाम",
            placeholder_phone: "फोन नंबर",
            placeholder_email: "ईमेल पता",
            placeholder_message: "आपका संदेश",
            btn_send_message: "संदेश भेजें",
            form_success_title: "धन्यवाद!",
            form_success_desc: "आपकी पूछताछ भेज दी गई है। हम जल्द ही आपसे संपर्क करेंगे।",
            talk_cta_title: "बात करना पसंद करेंगे?",
            talk_cta_desc: "हमें सीधे कॉल करें। हमें आपकी सहायता करने में खुशी होगी।",
            talk_hours: "(सोम–शनि, सुबह 10:30 – रात 09:00)",
            details_badge: "क्लीनिक विवरण",
            details_call: "हमें कॉल करें",
            details_loc: "हमारा स्थान",
            details_hours: "क्लीनिक का समय",
            details_email: "हमें ईमेल करें",
            footer_desc: "एक शांत, आधुनिक स्थान में व्यक्तिगत दंत चिकित्सा देखभाल - क्योंकि आपका आराम सबसे पहले आता है।",
            footer_col_links: "त्वरित संपर्क",
            footer_col_services: "हमारी सेवाएं",
            footer_col_details: "क्लीनिक विवरण",
            footer_col_nextsteps: "अगला कदम",
            step_book_title: "अपॉइंटमेंट लें",
            step_book_desc: "बस कुछ ही क्लिक में अपना अपॉइंटमेंट शेड्यूल करें।",
            step_call_title: "हमें कॉल करें",
            step_call_desc: "किसी भी प्रश्न के लिए हमारी टीम से बात करें।",
            step_ask_title: "एक सवाल पूछें",
            step_ask_desc: "हम यहां मुस्कान के साथ आपकी मदद करने के लिए हैं।",
            sticky_call: "क्लीनिक को कॉल करें",
            sticky_whatsapp: "व्हाट्सएप करें",
            nav_about_us: "हमारे बारे में",
            nav_contact_us: "संपर्क करें",
            thank_you_smile: "अपनी मुस्कान के साथ हम पर भरोसा करने के लिए धन्यवाद।",
            footer_rights: "सर्वाधिकार सुरक्षित।",
            footer_privacy: "गोपनीयता नीति",
            footer_terms: "नियम एवं शर्तें",
            footer_sitemap: "साइटमैप"
        }
    };

    const btnEN = document.getElementById('btnEN');
    const btnHI = document.getElementById('btnHI');

    function setLanguage(lang) {
        if (!translations[lang]) return;

        // Toggle active button switcher class
        if (lang === 'hi') {
            if (btnHI) btnHI.classList.add('active');
            if (btnEN) btnEN.classList.remove('active');
        } else {
            if (btnEN) btnEN.classList.add('active');
            if (btnHI) btnHI.classList.remove('active');
        }

        // Translate HTML text elements
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }

    if (btnEN) {
        btnEN.addEventListener('click', () => setLanguage('en'));
    }
    if (btnHI) {
        btnHI.addEventListener('click', () => setLanguage('hi'));
    }

    // 8. Stats Count-up Animation on scroll
    const statsGrid = document.querySelector('.about-stats-grid');
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    if (statsGrid && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(num => {
                        const target = parseInt(num.getAttribute('data-target'));
                        const duration = 2000; // 2 seconds animation
                        const startTime = performance.now();
                        
                        function updateCount(currentTime) {
                            const elapsedTime = currentTime - startTime;
                            const progress = Math.min(elapsedTime / duration, 1);
                            
                            // Easing: easeOutQuad
                            const easeProgress = progress * (2 - progress);
                            const currentCount = Math.floor(easeProgress * target);
                            
                            num.textContent = currentCount;
                            
                            if (progress < 1) {
                                requestAnimationFrame(updateCount);
                            } else {
                                num.textContent = target;
                            }
                        }
                        requestAnimationFrame(updateCount);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        statsObserver.observe(statsGrid);
    }
});
