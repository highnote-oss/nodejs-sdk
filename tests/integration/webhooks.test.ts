import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Highnote, NotificationEventName } from "../../src/index.js";

/**
 * Round-trip integration test against the Highnote test environment.
 *
 * This test creates a webhook notification target with a uniquely-prefixed
 * name, verifies it shows up in list, fetches it via get(), and then
 * removes it. If the test fails midway, the afterAll hook tries to remove
 * any target it created.
 */
describe("webhooks (integration)", () => {
  let client: Highnote;
  const namePrefix = `sdk-itest-${Date.now()}-`;
  const createdIds: string[] = [];

  beforeAll(() => {
    client = new Highnote({
      apiKey: process.env.HIGHNOTE_API_KEY!,
      environment: "test",
    });
  });

  afterAll(async () => {
    await Promise.allSettled(
      createdIds.map((targetId) => client.webhooks.remove({ targetId })),
    );
  });

  it("add → list (find by id) → get → remove → list (gone)", async () => {
    const name = `${namePrefix}roundtrip`;

    const created = await client.webhooks.add({
      name,
      uri: "https://example.com/sdk-itest",
      subscriptions: [NotificationEventName.CARD_PAYMENT_AUTHORIZED_EVENT],
    });
    createdIds.push(created.id);
    expect(created.id).toBeDefined();

    let foundViaList = false;
    for await (const t of client.webhooks.list({ pageSize: 50 })) {
      if (t.id === created.id) {
        foundViaList = true;
        expect(t.name).toBe(name);
        break;
      }
    }
    expect(foundViaList).toBe(true);

    const fetched = await client.webhooks.get(created.id);
    expect(fetched.id).toBe(created.id);
    expect(fetched.name).toBe(name);

    const removed = await client.webhooks.remove({ targetId: created.id });
    expect(removed.id).toBe(created.id);
    createdIds.length = 0;

    let stillThere = false;
    for await (const t of client.webhooks.list({ pageSize: 50 })) {
      if (t.id === created.id) {
        stillThere = true;
        break;
      }
    }
    expect(stillThere).toBe(false);
  });

  it("rename → rotateSigningKey → listEvents", async () => {
    // setEmail / removeEmail are blocked in the test environment per Highnote
    // ("This data is only stored in the live environment"), so they're covered
    // only by unit tests. Live-env consumers can exercise them directly.
    const created = await client.webhooks.add({
      name: `${namePrefix}metadata`,
      uri: "https://example.com/sdk-itest-meta",
      subscriptions: [NotificationEventName.CARD_PAYMENT_AUTHORIZED_EVENT],
    });
    createdIds.push(created.id);
    const initialKeyCount = created.signingKeys?.length ?? 0;

    const renamed = await client.webhooks.rename({
      targetId: created.id,
      name: `${namePrefix}metadata-renamed`,
    });
    expect(renamed.name).toBe(`${namePrefix}metadata-renamed`);

    const rotated = await client.webhooks.rotateSigningKey({ targetId: created.id });
    expect(rotated.signingKeys?.length ?? 0).toBeGreaterThan(initialKeyCount);

    let pageCount = 0;
    for await (const _e of client.webhooks.listEvents(created.id, { pageSize: 5 })) {
      pageCount++;
      if (pageCount >= 5) break;
    }
    expect(pageCount).toBeGreaterThanOrEqual(0);
  });
});
