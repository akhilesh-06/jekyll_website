<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://unpkg.com/pdf-lib@1.7.0"></script>
    <script src="https://unpkg.com/downloadjs@1.4.7"></script>
  </head>

  <body>
    <p>Click the button to create a document and attach a JPEG image and PDF file with <code>pdf-lib</code></p>
    <button onclick="addAttachments()">Create PDF</button>
    <p class="small">(Your browser will download the resulting file)</p>
  </body>

  <script>
    const { PDFDocument, rgb } = PDFLib

    async function addAttachments() {
			// Define attachment URLs
      const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'
      const pdfUrl = 'https://pdf-lib.js.org/assets/us_constitution.pdf';

			// Fetch attachments
      const jpgAttachmentBytes = await fetch(jpgUrl).then(res => res.arrayBuffer())
      const pdfAttachmentBytes = await fetch(pdfUrl).then(res => res.arrayBuffer())


      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create()

      // Add the JPG attachment
      await pdfDoc.attach(jpgAttachmentBytes, 'cat_riding_unicorn.jpg', {
        mimeType: 'image/jpeg',
        description: 'Cool cat riding a unicorn! 🦄🐈🕶️',
        creationDate: new Date('2019/12/01'),
        modificationDate: new Date('2020/04/19'),
      })

      // Add the PDF attachment
      await pdfDoc.attach(pdfAttachmentBytes, 'us_constitution.pdf', {
        mimeType: 'application/pdf',
        description: 'Constitution of the United States 🇺🇸🦅',
        creationDate: new Date('1787/09/17'),
        modificationDate: new Date('1992/05/07'),
      })

      // Add a page with some text
      const page = pdfDoc.addPage();
      page.drawText('This PDF has two attachments', { x: 135, y: 415 })

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()

			// Trigger the browser to download the PDF document
      download(pdfBytes, "pdf-lib_add_attachments.pdf", "application/pdf");
    }
  </script>
</html>
