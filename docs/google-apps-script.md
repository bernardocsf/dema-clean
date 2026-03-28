# Google Apps Script + Drive (Fotos Reais)

Este guia recebe pedidos do formulário e grava:
- dados do pedido numa Google Sheet
- fotos no Google Drive

## 1) Criar Google Sheet e pasta no Drive

1. Cria uma Google Sheet (ex.: `DEMA Clean - Pedidos`).
2. Cria uma pasta no Google Drive (ex.: `DEMA Clean Uploads`).
3. Copia:
   - `SHEET_ID` (da URL da sheet)
   - `FOLDER_ID` (da URL da pasta)

## 2) Criar Apps Script

1. Vai a `script.google.com` > New Project.
2. Cola o código abaixo em `Code.gs`.
3. Atualiza `SHEET_ID` e `FOLDER_ID`.

```javascript
const SHEET_ID = 'COLOCA_AQUI_O_SHEET_ID';
const FOLDER_ID = 'COLOCA_AQUI_O_FOLDER_ID';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    const folder = DriveApp.getFolderById(FOLDER_ID);

    const photoLinks = [];
    const photos = payload.photos || [];

    photos.forEach((photo, index) => {
      if (!photo.base64) return;
      const bytes = Utilities.base64Decode(photo.base64);
      const blob = Utilities.newBlob(bytes, photo.type || 'image/jpeg', photo.name || `foto-${index + 1}.jpg`);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      photoLinks.push(file.getUrl());
    });

    sheet.appendRow([
      new Date(),
      payload.name || '',
      payload.phone || '',
      payload.category || '',
      payload.service || '',
      payload.urgency || '',
      payload.contactWindow || '',
      payload.date || '',
      payload.time || '',
      payload.address || '',
      payload.doorNumber || '',
      payload.postalCode || '',
      payload.locality || '',
      payload.notes || '',
      payload.consent === true ? 'true' : 'false',
      photoLinks.join(' | ')
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, photoCount: photoLinks.length }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3) Deploy Web App

1. `Deploy` > `New deployment`.
2. Type: `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Copia a URL final do Web App.

## 4) Ligar ao projeto

No projeto frontend define:

```bash
VITE_BOOKING_WEBHOOK_URL="URL_DO_WEB_APP"
```

Se usares GitHub Pages, podes:
- usar `.env.production` local antes do build/deploy
- ou injetar em workflow de CI

## 5) Teste rápido

1. Seleciona 1-2 fotos no formulário.
2. Envia pedido.
3. Confirma:
   - nova linha na Sheet
   - ficheiros na pasta do Drive
   - links das fotos preenchidos na última coluna
