const icons = {
  html: "fa-brands fa-html5",
  css: "fa-brands fa-css3",
  sass: "fa-brands fa-sass",
  bootstrap: "fa-brands fa-bootstrap",
  js: "fa-brands fa-square-js",
  react: "fa-brands fa-react",
};

export const IconFinder = (title) => {
  title = title.toLowerCase();
  if (title.includes("sass") || title.includes("scss")) return icons.sass;
  if (title.includes("bootstrap")) return icons.bootstrap;
  if (title.includes("css")) return icons.css;
  if (title.includes("html")) return icons.html;
  if (title.includes("react")) return icons.react;
  if (title.includes("javascript")) return icons.js;
};
