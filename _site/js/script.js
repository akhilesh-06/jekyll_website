const {
    PDFDocument
} = PDFLib
let jpgfileByteArray = [];
let pngfileByteArray = [];
async function embedImages() {
    const pdfDoc = await PDFDocument.create();
    for (let x = 0; x < jpgfileByteArray.length; x++) {
       var page = pdfDoc.addPage();
        var jpgImageBytes = jpgfileByteArray[x];
        var jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
        var jpgDims = jpgImage.scale(0.50);
        page.drawImage(jpgImage, {
            x: page.getWidth() / 2 - jpgDims.width / 2,
            y: page.getHeight() / 2 - jpgDims.height / 2 + 250,
            width: jpgDims.width,
            height: jpgDims.height,
        });
    }
    for (let x = 0; x < pngfileByteArray.length; x++) {
        var page = pdfDoc.addPage();
        var pngImageBytes = pngfileByteArray[x];
        var pngImage = await pdfDoc.embedPng(pngImageBytes)
        var pngDims = pngImage.scale(0.50);
        page.drawImage(pngImage, {
            x: page.getWidth() / 2 - pngDims.width / 2,
            y: page.getHeight() / 2 - pngDims.height / 2 + 250,
            width: pngDims.width,
            height: pngDims.height,
        })
    }
    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, "ImageToPdfConverter.pdf", "application/pdf");
}
const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", function(e) {
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);
fileElem.addEventListener("change", handleFiles, false);


function handleFiles() {
    if (!this.files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
    } else {
        fileList.innerHTML = "";
        const list = document.createElement("ul");
        fileList.appendChild(list);
        for (let i = 0; i < this.files.length; i++) {
        //debugger;
            const file = this.files[i];
            let reader = new FileReader();
            reader.onload = function(e) {
                let arrayBuffer = new Uint8Array(reader.result);
                console.log(file.type);
                if (file.type == "image/png") {
                    pngfileByteArray.push(arrayBuffer);
                } else if (file.type == "image/jpg"||file.type == "image/jpeg") {
                    jpgfileByteArray.push(arrayBuffer);
                } else {
                    alert("Please select only JPG or PNG file");
                }
            }

            reader.readAsArrayBuffer(file);
        }
    }
}
