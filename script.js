// Dummy shipment tracking data
const shipmentData = {
    'LPE123456789': {
        trackingNumber: 'LPE123456789',
        origin: 'New York, USA',
        destination: 'London, UK',
        status: 'in-transit',
        estimatedDelivery: 'December 31, 2025',
        timeline: [
            {
                status: 'Order Placed',
                location: 'New York, NY',
                date: 'December 26, 2025 - 10:30 AM',
                completed: true
            },
            {
                status: 'Package Picked Up',
                location: 'New York Distribution Center',
                date: 'December 26, 2025 - 2:15 PM',
                completed: true
            },
            {
                status: 'Departed Facility',
                location: 'JFK Airport, New York',
                date: 'December 27, 2025 - 8:00 AM',
                completed: true
            },
            {
                status: 'In Transit',
                location: 'International Flight',
                date: 'December 28, 2025 - 3:45 PM',
                completed: true
            },
            {
                status: 'Customs Clearance',
                location: 'Heathrow Airport, London',
                date: 'Pending',
                completed: false
            },
            {
                status: 'Out for Delivery',
                location: 'London Distribution Center',
                date: 'Pending',
                completed: false
            },
            {
                status: 'Delivered',
                location: 'London, UK',
                date: 'Pending',
                completed: false
            }
        ]
    },
    'LPE987654321': {
        trackingNumber: 'LPE987654321',
        origin: 'Dubai, UAE',
        destination: 'Singapore',
        status: 'delivered',
        estimatedDelivery: 'December 28, 2025',
        timeline: [
            {
                status: 'Order Placed',
                location: 'Dubai, UAE',
                date: 'December 23, 2025 - 9:00 AM',
                completed: true
            },
            {
                status: 'Package Picked Up',
                location: 'Dubai Logistics Hub',
                date: 'December 23, 2025 - 1:30 PM',
                completed: true
            },
            {
                status: 'Departed Facility',
                location: 'Dubai International Airport',
                date: 'December 24, 2025 - 11:00 PM',
                completed: true
            },
            {
                status: 'In Transit',
                location: 'International Flight',
                date: 'December 25, 2025 - 7:30 AM',
                completed: true
            },
            {
                status: 'Customs Clearance',
                location: 'Changi Airport, Singapore',
                date: 'December 26, 2025 - 10:00 AM',
                completed: true
            },
            {
                status: 'Out for Delivery',
                location: 'Singapore Distribution Center',
                date: 'December 27, 2025 - 8:15 AM',
                completed: true
            },
            {
                status: 'Delivered',
                location: 'Singapore',
                date: 'December 28, 2025 - 2:45 PM',
                completed: true
            }
        ]
    },
    'LPE555444333': {
        trackingNumber: 'LPE555444333',
        origin: 'Los Angeles, USA',
        destination: 'Sydney, Australia',
        status: 'processing',
        estimatedDelivery: 'January 3, 2026',
        timeline: [
            {
                status: 'Order Placed',
                location: 'Los Angeles, CA',
                date: 'December 29, 2025 - 11:20 AM',
                completed: true
            },
            {
                status: 'Package Picked Up',
                location: 'LA Warehouse',
                date: 'December 29, 2025 - 4:00 PM',
                completed: true
            },
            {
                status: 'Processing at Facility',
                location: 'Los Angeles Distribution Center',
                date: 'In Progress',
                completed: false
            },
            {
                status: 'Departed Facility',
                location: 'LAX Airport',
                date: 'Pending',
                completed: false
            },
            {
                status: 'In Transit',
                location: 'International Flight',
                date: 'Pending',
                completed: false
            },
            {
                status: 'Out for Delivery',
                location: 'Sydney, Australia',
                date: 'Pending',
                completed: false
            },
            {
                status: 'Delivered',
                location: 'Sydney, Australia',
                date: 'Pending',
                completed: false
            }
        ]
    }
};

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling and active navigation
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Track Shipment Form
const trackForm = document.getElementById('trackForm');
const trackResults = document.getElementById('trackResults');

trackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const trackingNumber = document.getElementById('trackingNumber').value.trim().toUpperCase();
    const shipment = shipmentData[trackingNumber];
    
    if (shipment) {
        displayTrackingResults(shipment);
        trackResults.classList.remove('hidden');
        
        // Smooth scroll to results
        trackResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        alert('Tracking number not found. Please try: LPE123456789, LPE987654321, or LPE555444333');
    }
});

function displayTrackingResults(shipment) {
    // Update status badge
    const statusBadge = document.getElementById('statusBadge');
    statusBadge.textContent = shipment.status.replace('-', ' ').toUpperCase();
    statusBadge.className = `status-badge ${shipment.status}`;
    
    // Update shipment details
    document.getElementById('resultTrackingNumber').textContent = shipment.trackingNumber;
    document.getElementById('resultOrigin').textContent = shipment.origin;
    document.getElementById('resultDestination').textContent = shipment.destination;
    document.getElementById('resultDelivery').textContent = shipment.estimatedDelivery;
    
    // Update timeline
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = '';
    
    shipment.timeline.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${item.completed ? 'completed' : ''}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-icon">
                <i class="fas ${item.completed ? 'fa-check' : 'fa-clock'}"></i>
            </div>
            <div class="timeline-content">
                <div class="timeline-title">${item.status}</div>
                <div class="timeline-location">${item.location}</div>
                <div class="timeline-date">${item.date}</div>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Quote Form
const quoteForm = document.getElementById('quoteForm');
const quoteResult = document.getElementById('quoteResult');

quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const weight = parseFloat(document.getElementById('weight').value);
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const shippingType = document.getElementById('shippingType').value;
    
    // Calculate quote
    const volumetricWeight = (length * width * height) / 5000;
    const chargeableWeight = Math.max(weight, volumetricWeight);
    
    let baseRate = 0;
    switch(shippingType) {
        case 'express':
            baseRate = chargeableWeight * 25;
            break;
        case 'air':
            baseRate = chargeableWeight * 35;
            break;
        case 'standard':
            baseRate = chargeableWeight * 15;
            break;
        case 'sea':
            baseRate = chargeableWeight * 8;
            break;
        case 'land':
            baseRate = chargeableWeight * 12;
            break;
        default:
            baseRate = chargeableWeight * 20;
    }
    
    const fuelSurcharge = baseRate * 0.15;
    const insurance = baseRate * 0.05;
    const total = baseRate + fuelSurcharge + insurance;
    
    // Display results
    document.getElementById('baseRate').textContent = `$${baseRate.toFixed(2)}`;
    document.getElementById('fuelSurcharge').textContent = `$${fuelSurcharge.toFixed(2)}`;
    document.getElementById('insurance').textContent = `$${insurance.toFixed(2)}`;
    document.getElementById('totalCost').textContent = `$${total.toFixed(2)}`;
    
    quoteResult.classList.remove('hidden');
    quoteResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been received. We'll respond to ${email} within 24 hours.`);
    
    // Reset form
    contactForm.reset();
});

// Scroll to top functionality
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
});

// Form validation enhancement
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add real-time validation feedback
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = 'var(--danger)';
            
            // Remove error styling after user starts typing again
            this.addEventListener('input', function() {
                this.style.borderColor = '';
            }, { once: true });
        }
    });
});

// Add number input validation
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and other animated elements
document.querySelectorAll('.service-card, .contact-card, .about-stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Auto-capitalize tracking number input
document.getElementById('trackingNumber').addEventListener('input', function(e) {
    this.value = this.value.toUpperCase();
});

// Prevent form submission on Enter in text inputs (except textarea)
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.type !== 'submit') {
            e.preventDefault();
        }
    });
});

// Add loading animation for form submissions
function showLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1500);
}

// Console welcome message
console.log('%c🚢 LogiPath Express', 'font-size: 24px; color: #0066CC; font-weight: bold;');
console.log('%cWelcome to our shipping platform!', 'font-size: 14px; color: #666;');
console.log('%cTry tracking numbers: LPE123456789, LPE987654321, LPE555444333', 'font-size: 12px; color: #999;');
