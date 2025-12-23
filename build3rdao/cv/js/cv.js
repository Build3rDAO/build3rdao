// ===== CV Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    // Update current date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentDate').textContent = formattedDate;
    
    // Print CV
    const printBtn = document.getElementById('printCV');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Download PDF
    const downloadBtn = document.getElementById('downloadPDF');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            this.disabled = true;
            
            // Simulate PDF generation
            setTimeout(() => {
                // In production, you would generate/request a PDF
                // For now, we'll create a downloadable HTML version
                generatePrintableCV();
                
                this.innerHTML = '<i class="fas fa-download"></i> Download PDF';
                this.disabled = false;
            }, 1500);
        });
    }
    
    // Toggle Compact View
    const toggleBtn = document.getElementById('toggleCompact');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('compact-view');
            this.innerHTML = document.body.classList.contains('compact-view') 
                ? '<i class="fas fa-expand"></i> Expanded View'
                : '<i class="fas fa-compress"></i> Compact View';
        });
    }
    
    // Generate QR Code
    generateQRCode();
    
    // Skill proficiency visualization
    initSkillVisualization();
    
    // Timeline animation
    initTimelineAnimation();
});

function generateQRCode() {
    const canvas = document.getElementById('qrCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const url = window.location.href;
    
    // Simple QR-like pattern (in production, use a QR library)
    canvas.width = 128;
    canvas.height = 128;
    
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw QR-like pattern
    ctx.fillStyle = 'black';
    
    // Position markers
    ctx.fillRect(10, 10, 20, 20);
    ctx.fillRect(canvas.width - 30, 10, 20, 20);
    ctx.fillRect(10, canvas.height - 30, 20, 20);
    
    // Draw URL text
    ctx.fillStyle = 'black';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Build3rDAO CV', canvas.width/2, canvas.height - 10);
}

function generatePrintableCV() {
    // Create a printable version of the CV
    const printWindow = window.open('', '_blank');
    const cvContent = document.querySelector('.cv-container').cloneNode(true);
    
    // Remove interactive elements
    const elementsToRemove = cvContent.querySelectorAll('.cv-actions, .theme-toggle, .back-to-portfolio, .qr-code, .cv-disclaimer');
    elementsToRemove.forEach(el => el.remove());
    
    // Add print styles
    const styles = `
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #000;
                padding: 20px;
                background: white;
            }
            
            .cv-grid {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 30px;
            }
            
            .cv-section {
                break-inside: avoid;
            }
            
            .skill-item {
                display: inline-block;
                background: #f0f0f0;
                padding: 3px 8px;
                margin: 2px;
                border-radius: 10px;
                font-size: 12px;
            }
            
            @media print {
                .page-break {
                    page-break-before: always;
                }
            }
        </style>
    `;
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Build3rDAO - Curriculum Vitae</title>
                ${styles}
            </head>
            <body>
                ${cvContent.innerHTML}
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Auto-print after loading
    printWindow.onload = function() {
        printWindow.print();
    };
}

function initSkillVisualization() {
    // Add skill level indicators
    const skills = [
        { name: 'Solidity', level: 95 },
        { name: 'React', level: 90 },
        { name: 'Web3.js', level: 88 },
        { name: 'Node.js', level: 85 },
        { name: 'Security', level: 92 },
        { name: 'DeFi', level: 87 }
    ];
    
    const skillsContainer = document.querySelector('.skills-categories');
    if (skillsContainer) {
        const visualization = document.createElement('div');
        visualization.className = 'skill-visualization';
        visualization.innerHTML = `
            <h4>Skill Proficiency</h4>
            <div class="skill-bars">
                ${skills.map(skill => `
                    <div class="skill-bar">
                        <div class="skill-name">${skill.name}</div>
                        <div class="skill-progress">
                            <div class="skill-level" style="width: ${skill.level}%">
                                <span>${skill.level}%</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        skillsContainer.appendChild(visualization);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .skill-visualization {
                margin-top: 2rem;
                padding: 1rem;
                background: rgba(26, 29, 58, 0.3);
                border-radius: var(--border-radius-sm);
            }
            
            .skill-bars {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .skill-bar {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .skill-name {
                min-width: 100px;
                color: var(--text-primary);
            }
            
            .skill-progress {
                flex: 1;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
            }
            
            .skill-level {
                height: 100%;
                background: linear-gradient(90deg, var(--primary), var(--secondary));
                border-radius: 4px;
                position: relative;
                transition: width 1s ease;
            }
            
            .skill-level span {
                position: absolute;
                right: 5px;
                top: -20px;
                font-size: 0.8rem;
                color: var(--text-primary);
            }
        `;
        document.head.appendChild(style);
    }
}

function initTimelineAnimation() {
    // Animate timeline entries on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.3 });
    
    const timelineItems = document.querySelectorAll('.experience, .education');
    timelineItems.forEach(item => observer.observe(item));
}