# Mini PWA

A minimal installable PWA hosted on GitHub Pages. It includes:

- `manifest.webmanifest`
- `service-worker.js`
- 192 px and 512 px PNG icons
- a small counter
- a note field with an explicit save button
- a saved-note preview that proves the note was stored on the device

## Local preview

```bash
python3 -m http.server 5173
```

Open:

```text
http://localhost:5173
```

## iPhone install

1. Open the GitHub Pages URL in Safari on your iPhone.
2. Tap the Share button.
3. Choose Add to Home Screen.
4. Tap Add.

The app will appear on your iPhone home screen.

## How to test local saving

1. Type a note into the Note field.
2. Tap Save note.
3. Check the Saved note section below the field.
4. Close and reopen the app. The saved note should still be visible.
