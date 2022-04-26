export const chevron = (colour: string, clipped = false) =>
  toDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${
      clipped ? '6 6 12 12' : '0 0 24 24'
    }">
      <path
        fill="${encodeURIComponent(colour)}"
        d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
      />
    </svg>`,
  );

export const hamburger = (colour: string) =>
  toDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <path
        stroke="${encodeURIComponent(colour)}"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="2"
        d="M4 7h22M4 15h22M4 23h22"
      />
    </svg>`,
  );

export const close = (colour: string) =>
  toDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
      <path
        stroke="${encodeURIComponent(colour)}"
        stroke-width="2"
        d="M.75.75l13.5 13.5M14.25.75L.75 14.25"
      />
    </svg>`,
  );

export const external = (colour: string) =>
  toDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="${encodeURIComponent(colour)}"
        d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
      />
    </svg>`,
  );

function toDataUrl(svg: string) {
  return `url('data:image/svg+xml;utf8,${svg.replace(/\n/g, ' ')}')`;
}
