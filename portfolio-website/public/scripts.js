function showPreview(pdfUrl) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <iframe src="${pdfUrl}" style="width:100%;height:80vh;"></iframe>
        </div>
    `;
    document.body.appendChild(modal);
}

document.getElementById('upload-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        document.getElementById('upload-message').textContent = result.message;

        const resourceGrid = document.querySelector('.resource-grid');
        const newResource = document.createElement('div');
        newResource.classList.add('resource');
        newResource.innerHTML = `
            <h2>${result.filename}</h2>
            <p>Newly uploaded file.</p>
            <a href="${result.url}" download>Download PDF</a>
            <button onclick="showPreview('${result.url}')">Preview</button>
        `;
        resourceGrid.appendChild(newResource);
    } catch (error) {
        document.getElementById('upload-message').textContent = 'Upload failed: Try again.';
    }
});