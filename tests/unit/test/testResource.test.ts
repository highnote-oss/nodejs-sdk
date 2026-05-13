import { describe, it, expect, vi, beforeEach } from "vitest";
import { Highnote } from "../../../src/client.js";
import {
  HighnoteSimulationError,
  HighnoteError,
} from "../../../src/errors.js";

const { mockRawRequest, MockGraphQLClient } = vi.hoisted(() => {
  const mockRawRequest = vi.fn();
  const MockGraphQLClient = vi.fn().mockImplementation(function () {
    return { rawRequest: mockRawRequest };
  });
  return { mockRawRequest, MockGraphQLClient };
});
vi.mock("graphql-request", () => ({
  default: MockGraphQLClient,
  GraphQLClient: MockGraphQLClient,
}));

describe("HighnoteSimulationError", () => {
  it("extends HighnoteError", () => {
    const err = new HighnoteSimulationError("test.transactions.authorize");
    expect(err).toBeInstanceOf(HighnoteError);
    expect(err).toBeInstanceOf(Error);
  });

  it("has descriptive message", () => {
    const err = new HighnoteSimulationError("test.transactions.authorize");
    expect(err.message).toBe(
      "test.transactions.authorize() is only available in the test environment",
    );
    expect(err.name).toBe("HighnoteSimulationError");
  });
});

describe("TestResource environment guard", () => {
  it("does not throw when environment is test", () => {
    const client = new Highnote({ apiKey: "sk_test_fake", environment: "test" });
    expect(client.test).toBeDefined();
  });

  it("exposes environment on client", () => {
    const testClient = new Highnote({ apiKey: "sk_test_fake", environment: "test" });
    expect(testClient.environment).toBe("test");

    const liveClient = new Highnote({ apiKey: "sk_live_fake", environment: "live" });
    expect(liveClient.environment).toBe("live");
  });

  it("defaults environment to test", () => {
    const client = new Highnote({ apiKey: "sk_test_fake" });
    expect(client.environment).toBe("test");
  });
});
