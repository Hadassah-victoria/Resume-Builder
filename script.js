// Global state
let resumeData = {
    personal: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        objective: '',
        linkedin: '',
        github: '',
        portfolio: ''
    },
    education: [],
    experience: [],
    skills: [],
    certifications: [],
    projects: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    addEducation();
    addExperience();
    addProject();
    updatePreview();
});

function initializeEventListeners() {
    // Personal information fields
    const personalFields = ['fullName', 'email', 'phone', 'address', 'objective', 'linkedin', 'github', 'portfolio'];
    personalFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('input', function() {
                resumeData.personal[field] = this.value;
                updatePreview();
            });
        }
    });

    // Skills input
    document.getElementById('skillInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSkill();
        }
    });

    // Certifications input
    document.getElementById('certificationInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addCertification();
        }
    });
}

// Education functions
function addEducation() {
    const container = document.getElementById('education-container');
    const index = resumeData.education.length;
    
    const educationEntry = {
        degree: '',
        institution: '',
        year: '',
        gpa: ''
    };
    
    resumeData.education.push(educationEntry);
    
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry-container';
    entryDiv.innerHTML = `
        <div class="entry-grid">
            <div class="form-group">
                <label>Degree</label>
                <input type="text" data-field="degree" data-index="${index}" placeholder="Bachelor of Science">
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" data-field="institution" data-index="${index}" placeholder="University Name">
            </div>
            <div class="form-group">
                <label>Year</label>
                <input type="text" data-field="year" data-index="${index}" placeholder="2020-2024">
            </div>
            <div class="form-group">
                <label>GPA (Optional)</label>
                <input type="text" data-field="gpa" data-index="${index}" placeholder="3.8/4.0">
            </div>
        </div>
    `;
    
    container.appendChild(entryDiv);
    
    // Add event listeners for the new inputs
    entryDiv.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            const field = this.dataset.field;
            const index = parseInt(this.dataset.index);
            resumeData.education[index][field] = this.value;
            updatePreview();
        });
    });
}

// Experience functions
function addExperience() {
    const container = document.getElementById('experience-container');
    const index = resumeData.experience.length;
    
    const experienceEntry = {
        position: '',
        company: '',
        duration: '',
        description: ''
    };
    
    resumeData.experience.push(experienceEntry);
    
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry-container';
    entryDiv.innerHTML = `
        <div class="entry-grid">
            <div class="form-group">
                <label>Position</label>
                <input type="text" data-field="position" data-index="${index}" placeholder="Software Engineer">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" data-field="company" data-index="${index}" placeholder="Tech Corp">
            </div>
        </div>
        <div class="form-group">
            <label>Duration</label>
            <input type="text" data-field="duration" data-index="${index}" placeholder="Jan 2022 - Present">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea data-field="description" data-index="${index}" placeholder="Describe your responsibilities and achievements..."></textarea>
        </div>
    `;
    
    container.appendChild(entryDiv);
    
    // Add event listeners for the new inputs
    entryDiv.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            const field = this.dataset.field;
            const index = parseInt(this.dataset.index);
            resumeData.experience[index][field] = this.value;
            updatePreview();
        });
    });
}

// Project functions
function addProject() {
    const container = document.getElementById('projects-container');
    const index = resumeData.projects.length;
    
    const projectEntry = {
        name: '',
        description: '',
        technologies: ''
    };
    
    resumeData.projects.push(projectEntry);
    
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry-container';
    entryDiv.innerHTML = `
        <div class="form-group">
            <label>Project Name</label>
            <input type="text" data-field="name" data-index="${index}" placeholder="My Awesome Project">
        </div>
        <div class="form-group">
            <label>Technologies</label>
            <input type="text" data-field="technologies" data-index="${index}" placeholder="React, Node.js, MongoDB">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea data-field="description" data-index="${index}" placeholder="Describe your project..."></textarea>
        </div>
    `;
    
    container.appendChild(entryDiv);
    
    // Add event listeners for the new inputs
    entryDiv.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            const field = this.dataset.field;
            const index = parseInt(this.dataset.index);
            resumeData.projects[index][field] = this.value;
            updatePreview();
        });
    });
}

// Skills functions
function addSkill() {
    const input = document.getElementById('skillInput');
    const skill = input.value.trim();
    
    if (skill && !resumeData.skills.includes(skill)) {
        resumeData.skills.push(skill);
        input.value = '';
        updateSkillsDisplay();
        updatePreview();
    }
}

function removeSkill(skill) {
    resumeData.skills = resumeData.skills.filter(s => s !== skill);
    updateSkillsDisplay();
    updatePreview();
}

function updateSkillsDisplay() {
    const container = document.getElementById('skills-display');
    container.innerHTML = resumeData.skills.map(skill => 
        `<span class="tag" onclick="removeSkill('${skill}')">${skill} ×</span>`
    ).join('');
}

// Certifications functions
function addCertification() {
    const input = document.getElementById('certificationInput');
    const certification = input.value.trim();
    
    if (certification && !resumeData.certifications.includes(certification)) {
        resumeData.certifications.push(certification);
        input.value = '';
        updateCertificationsDisplay();
        updatePreview();
    }
}

function removeCertification(certification) {
    resumeData.certifications = resumeData.certifications.filter(c => c !== certification);
    updateCertificationsDisplay();
    updatePreview();
}

function updateCertificationsDisplay() {
    const container = document.getElementById('certifications-display');
    container.innerHTML = resumeData.certifications.map(cert => 
        `<span class="tag certification" onclick="removeCertification('${cert}')">${cert} ×</span>`
    ).join('');
}

// Update preview
function updatePreview() {
    const preview = document.getElementById('resume-preview');
    
    preview.innerHTML = `
        <div class="resume-header">
            <h1 class="resume-name">${resumeData.personal.fullName || 'Your Name'}</h1>
            ${resumeData.personal.email ? `<div class="resume-contact">${resumeData.personal.email}</div>` : ''}
            ${resumeData.personal.phone ? `<div class="resume-contact">${resumeData.personal.phone}</div>` : ''}
            ${resumeData.personal.address ? `<div class="resume-contact">${resumeData.personal.address}</div>` : ''}
            ${(resumeData.personal.linkedin || resumeData.personal.github || resumeData.personal.portfolio) ? 
                `<div class="resume-links">
                    ${resumeData.personal.linkedin ? `<div>${resumeData.personal.linkedin}</div>` : ''}
                    ${resumeData.personal.github ? `<div>${resumeData.personal.github}</div>` : ''}
                    ${resumeData.personal.portfolio ? `<div>${resumeData.personal.portfolio}</div>` : ''}
                </div>` : ''}
        </div>

        ${resumeData.personal.objective ? 
            `<div class="resume-section">
                <h2 class="section-title">Objective</h2>
                <p class="section-content">${resumeData.personal.objective}</p>
            </div>` : ''}

        ${resumeData.education.some(edu => edu.degree || edu.institution) ? 
            `<div class="resume-section">
                <h2 class="section-title">Education</h2>
                ${resumeData.education.map(edu => {
                    if (!edu.degree && !edu.institution) return '';
                    return `
                        <div class="section-item">
                            <div class="item-header">
                                <div>
                                    ${edu.degree ? `<div class="item-title">${edu.degree}</div>` : ''}
                                    ${edu.institution ? `<div class="item-subtitle">${edu.institution}</div>` : ''}
                                </div>
                                <div>
                                    ${edu.year ? `<div class="item-date">${edu.year}</div>` : ''}
                                    ${edu.gpa ? `<div class="item-date">GPA: ${edu.gpa}</div>` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>` : ''}

        ${resumeData.experience.some(exp => exp.position || exp.company) ? 
            `<div class="resume-section">
                <h2 class="section-title">Experience</h2>
                ${resumeData.experience.map(exp => {
                    if (!exp.position && !exp.company) return '';
                    return `
                        <div class="section-item">
                            <div class="item-header">
                                <div>
                                    ${exp.position ? `<div class="item-title">${exp.position}</div>` : ''}
                                    ${exp.company ? `<div class="item-subtitle">${exp.company}</div>` : ''}
                                </div>
                                ${exp.duration ? `<div class="item-date">${exp.duration}</div>` : ''}
                            </div>
                            ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>` : ''}

        ${resumeData.skills.length > 0 ? 
            `<div class="resume-section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-grid">
                    ${resumeData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>` : ''}

        ${resumeData.projects.some(proj => proj.name || proj.description) ? 
            `<div class="resume-section">
                <h2 class="section-title">Projects</h2>
                ${resumeData.projects.map(project => {
                    if (!project.name && !project.description) return '';
                    return `
                        <div class="section-item">
                            ${project.name ? `<div class="item-title">${project.name}</div>` : ''}
                            ${project.technologies ? `<div class="project-tech">${project.technologies}</div>` : ''}
                            ${project.description ? `<div class="item-description">${project.description}</div>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>` : ''}

        ${resumeData.certifications.length > 0 ? 
            `<div class="resume-section">
                <h2 class="section-title">Certifications</h2>
                <ul class="certification-list">
                    ${resumeData.certifications.map(cert => `<li class="certification-item">${cert}</li>`).join('')}
                </ul>
            </div>` : ''}
    `;
}

// Validation
function validateForm() {
    const errors = [];
    
    if (!resumeData.personal.fullName.trim()) {
        errors.push('Full name is required');
    }
    
    if (!resumeData.personal.email.trim()) {
        errors.push('Email is required');
    }
    
    if (!resumeData.personal.phone.trim()) {
        errors.push('Phone is required');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (resumeData.personal.email && !emailRegex.test(resumeData.personal.email)) {
        errors.push('Please enter a valid email address');
    }
    
    return errors;
}

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// PDF Generation
async function generatePDF() {
    const errors = validateForm();
    if (errors.length > 0) {
        errors.forEach(error => showToast(error, 'error'));
        return;
    }

    const button = document.getElementById('downloadBtn');
    const originalText = button.innerHTML;
    
    try {
        button.innerHTML = 'Generating...';
        button.classList.add('loading');
        
        // Create a temporary container for PDF-optimized layout
        const tempContainer = document.createElement('div');
        tempContainer.style.cssText = `
            position: absolute;
            top: -9999px;
            left: -9999px;
            width: 794px;
            background: white;
            font-family: 'Times New Roman', serif;
            font-size: 12px;
            line-height: 1.4;
            color: #000;
            padding: 40px;
            box-sizing: border-box;
        `;
        
        // Generate professional PDF content
        tempContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 15px;">
                <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">${resumeData.personal.fullName || 'YOUR NAME'}</h1>
                <div style="font-size: 11px; color: #333; margin-bottom: 5px;">
                    ${[resumeData.personal.email, resumeData.personal.phone, resumeData.personal.address].filter(Boolean).join(' • ')}
                </div>
                ${(resumeData.personal.linkedin || resumeData.personal.github || resumeData.personal.portfolio) ? 
                    `<div style="font-size: 10px; color: #666;">
                        ${[resumeData.personal.linkedin, resumeData.personal.github, resumeData.personal.portfolio].filter(Boolean).join(' • ')}
                    </div>` : ''}
            </div>

            ${resumeData.personal.objective ? 
                `<div style="margin-bottom: 25px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0; padding-bottom: 3px; border-bottom: 1px solid #000;">Professional Summary</h2>
                    <p style="margin: 0; text-align: justify; line-height: 1.5;">${resumeData.personal.objective}</p>
                </div>` : ''}

            ${resumeData.education.some(edu => edu.degree || edu.institution) ? 
                `<div style="margin-bottom: 25px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 3px; border-bottom: 1px solid #000;">Education</h2>
                    ${resumeData.education.map(edu => {
                        if (!edu.degree && !edu.institution) return '';
                        return `
                            <div style="margin-bottom: 12px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
                                    <div>
                                        ${edu.degree ? `<div style="font-weight: bold; font-size: 12px;">${edu.degree}</div>` : ''}
                                        ${edu.institution ? `<div style="font-style: italic; color: #333; font-size: 11px;">${edu.institution}</div>` : ''}
                                    </div>
                                    <div style="text-align: right; font-size: 10px; color: #666;">
                                        ${edu.year ? `<div>${edu.year}</div>` : ''}
                                        ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>` : ''}

            ${resumeData.experience.some(exp => exp.position || exp.company) ? 
                `<div style="margin-bottom: 25px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 3px; border-bottom: 1px solid #000;">Professional Experience</h2>
                    ${resumeData.experience.map(exp => {
                        if (!exp.position && !exp.company) return '';
                        return `
                            <div style="margin-bottom: 15px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                                    <div>
                                        ${exp.position ? `<div style="font-weight: bold; font-size: 12px;">${exp.position}</div>` : ''}
                                        ${exp.company ? `<div style="font-style: italic; color: #333; font-size: 11px;">${exp.company}</div>` : ''}
                                    </div>
                                    ${exp.duration ? `<div style="font-size: 10px; color: #666;">${exp.duration}</div>` : ''}
                                </div>
                                ${exp.description ? `<div style="font-size: 11px; line-height: 1.4; text-align: justify; margin-top: 4px;">${exp.description}</div>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>` : ''}

            ${resumeData.skills.length > 0 ? 
                `<div style="margin-bottom: 25px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0; padding-bottom: 3px; border-bottom: 1px solid #000;">Technical Skills</h2>
                    <div style="font-size: 11px; line-height: 1.5;">
                        ${resumeData.skills.join(' • ')}
                    </div>
                </div>` : ''}

            ${resumeData.projects.some(proj => proj.name || proj.description) ? 
                `<div style="margin-bottom: 25px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; padding-bottom: 3px; border-bottom: 1px solid #000;">Projects</h2>
                    ${resumeData.projects.map(project => {
                        if (!project.name && !project.description) return '';
                        return `
                            <div style="margin-bottom: 12px;">
                                ${project.name ? `<div style="font-weight: bold; font-size: 12px; margin-bottom: 2px;">${project.name}</div>` : ''}
                                ${project.technologies ? `<div style="font-size: 10px; color: #666; font-style: italic; margin-bottom: 3px;">${project.technologies}</div>` : ''}
                                ${project.description ? `<div style="font-size: 11px; line-height: 1.4; text-align: justify;">${project.description}</div>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>` : ''}

            ${resumeData.certifications.length > 0 ? 
                `<div style="margin-bottom: 25px;">
                    <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0; padding-bottom: 3px; border-bottom: 1px solid #000;">Certifications</h2>
                    <div style="font-size: 11px; line-height: 1.5;">
                        ${resumeData.certifications.map(cert => `• ${cert}`).join('<br>')}
                    </div>
                </div>` : ''}
        `;
        
        document.body.appendChild(tempContainer);
        
        // Use html2canvas with optimized settings for PDF
        const canvas = await html2canvas(tempContainer, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: 794,
            height: 1123, // A4 aspect ratio
            scrollX: 0,
            scrollY: 0
        });
        
        // Remove temporary container
        document.body.removeChild(tempContainer);
        
        const imgData = canvas.toDataURL('image/png', 1.0);
        
        // Create PDF with exact A4 dimensions
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('portrait', 'mm', 'a4');
        
        // A4 dimensions in mm
        const pageWidth = 210;
        const pageHeight = 297;
        
        // Calculate image dimensions to fit A4 perfectly
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * pageWidth) / canvas.width;
        
        // If content is too tall, scale it down to fit
        if (imgHeight > pageHeight) {
            const scaleFactor = pageHeight / imgHeight;
            const finalWidth = imgWidth * scaleFactor;
            const finalHeight = pageHeight;
            const xOffset = (pageWidth - finalWidth) / 2;
            
            pdf.addImage(imgData, 'PNG', xOffset, 0, finalWidth, finalHeight);
        } else {
            // Center vertically if content is shorter than A4
            const yOffset = (pageHeight - imgHeight) / 2;
            pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
        }
        
        const fileName = resumeData.personal.fullName ? 
            `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf` : 
            'Professional_Resume.pdf';
            
        pdf.save(fileName);
        
        showToast('Professional resume downloaded successfully!', 'success');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        showToast('Failed to generate PDF. Please try again.', 'error');
    } finally {
        button.innerHTML = originalText;
        button.classList.remove('loading');
    }
}
