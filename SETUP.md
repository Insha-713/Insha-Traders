# Insha Traders Website Setup

Open `index.html` in a browser to preview the site.

## EmailJS

The contact form is already wired for EmailJS. Replace these values in `script.js`:

```js
const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};
```

Use `to_email` or a fixed recipient in your EmailJS template and send it to:

```text
inshaf713@gmail.com
```

Suggested EmailJS template variables:

```text
{{name}}
{{mobile}}
{{email}}
{{location}}
{{message}}
{{to_email}}
{{subject}}
```

## Phone and WhatsApp

Replace every `910000000000` value with the real WhatsApp number including country code. Replace `+910000000000` with the real phone number.

## Gallery Images

No uploaded ceiling or wall design images were present in the workspace when this site was created. The current gallery uses remote fallback images. To use real project images, replace the gallery image `src` and `data-img` URLs in `index.html`.