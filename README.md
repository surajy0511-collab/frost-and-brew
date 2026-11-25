# Frost & Brew

A café website for Frost & Brew, built with React and Vite.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

## WhatsApp checkout

Add the café's WhatsApp phone number, including its country code, to
`whatsappNumber` in `src/siteConfig.js`. Cart checkout will then open WhatsApp
with the selected products, quantities, and subtotal in a ready-to-send message.
