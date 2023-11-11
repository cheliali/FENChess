import { expect } from "vitest";

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
// import { server } from "./mocks/server";
// import { QueryCache } from "@tanstack/react-query";

// const cache = new QueryCache();

// beforeAll(() => {
//   server.listen();
//   jest.spyOn(global.console, "error").mockImplementation((e) => {
//     if (e.name === "AxiosError") return;
//     console.error(e);
//   });
// });

// beforeEach(() => jest.useFakeTimers());

// afterEach(() => {
//   server.resetHandlers();
//   cache.clear();
// });

// afterAll(() => server.close());
