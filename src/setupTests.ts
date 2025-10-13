import "@testing-library/jest-dom/vitest"

import { vi } from "vitest"

process.env.TZ = "UTC"

window.HTMLElement.prototype.scrollIntoView = function () {}

vi.mock("react-inlinesvg")

Object.defineProperty(window, "matchMedia", {
  writable: true,
  enumerable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
