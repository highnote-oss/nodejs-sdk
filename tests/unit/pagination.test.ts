import { describe, it, expect, vi } from "vitest";
import { paginate, type RelayConnection } from "../../src/pagination.js";

function makeConnection<T>(
  nodes: T[],
  hasNextPage: boolean,
  endCursor: string,
): RelayConnection<T> {
  return {
    edges: nodes.map((node, i) => ({ node, cursor: `cursor_${i}` })),
    pageInfo: { hasNextPage, endCursor },
  };
}

describe("paginate", () => {
  it("yields all items from a single page", async () => {
    const fetcher = vi.fn().mockResolvedValueOnce(
      makeConnection(["a", "b", "c"], false, "end"),
    );

    const results: string[] = [];
    for await (const item of paginate(fetcher)) {
      results.push(item);
    }

    expect(results).toEqual(["a", "b", "c"]);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith(undefined);
  });

  it("follows cursors across multiple pages", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(makeConnection([1, 2], true, "cursor_page1"))
      .mockResolvedValueOnce(makeConnection([3, 4], true, "cursor_page2"))
      .mockResolvedValueOnce(makeConnection([5], false, "cursor_page3"));

    const results: number[] = [];
    for await (const item of paginate(fetcher)) {
      results.push(item);
    }

    expect(results).toEqual([1, 2, 3, 4, 5]);
    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(fetcher).toHaveBeenNthCalledWith(1, undefined);
    expect(fetcher).toHaveBeenNthCalledWith(2, "cursor_page1");
    expect(fetcher).toHaveBeenNthCalledWith(3, "cursor_page2");
  });

  it("handles empty first page", async () => {
    const fetcher = vi.fn().mockResolvedValueOnce(makeConnection([], false, ""));

    const results: string[] = [];
    for await (const item of paginate(fetcher)) {
      results.push(item);
    }

    expect(results).toEqual([]);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("skips null nodes in edges", async () => {
    const fetcher = vi.fn().mockResolvedValueOnce({
      edges: [
        { node: "a", cursor: "c1" },
        { node: null, cursor: "c2" },
        { node: "b", cursor: "c3" },
      ],
      pageInfo: { hasNextPage: false, endCursor: "c3" },
    });

    const results: string[] = [];
    for await (const item of paginate(fetcher)) {
      results.push(item);
    }

    expect(results).toEqual(["a", "b"]);
  });

  it("supports break (stops fetching)", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(makeConnection([1, 2, 3], true, "page1"))
      .mockResolvedValueOnce(makeConnection([4, 5, 6], false, "page2"));

    const results: number[] = [];
    for await (const item of paginate(fetcher)) {
      results.push(item);
      if (item === 2) break;
    }

    expect(results).toEqual([1, 2]);
    // Should have fetched the first page but not the second
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("handles empty edges array", async () => {
    const fetcher = vi.fn().mockResolvedValueOnce({
      edges: [],
      pageInfo: { hasNextPage: false, endCursor: "" },
    });

    const results: string[] = [];
    for await (const item of paginate(fetcher)) {
      results.push(item);
    }

    expect(results).toEqual([]);
  });

  it("skips empty pages and continues to next", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce({
        edges: [],
        pageInfo: { hasNextPage: true, endCursor: "empty_cursor" },
      })
      .mockResolvedValueOnce(makeConnection(["found"], false, "end"));

    const results: string[] = [];
    for await (const item of paginate(fetcher)) {
      results.push(item);
    }

    expect(results).toEqual(["found"]);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("stops when hasNextPage is true but cursor does not advance", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(makeConnection(["a", "b"], true, "stuck_cursor"))
      .mockResolvedValueOnce(makeConnection(["c", "d"], true, "stuck_cursor"));

    const results: string[] = [];
    for await (const item of paginate(fetcher)) {
      results.push(item);
    }

    // Items from both pages are yielded, but pagination terminates
    // instead of looping infinitely with the same cursor
    expect(results).toEqual(["a", "b", "c", "d"]);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("continues when hasNextPage is true with null cursor on first page", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce({
        edges: [{ node: "x", cursor: "c1" }],
        pageInfo: { hasNextPage: true, endCursor: null },
      })
      .mockResolvedValueOnce(makeConnection(["y"], false, "end"));

    const results: string[] = [];
    for await (const item of paginate(fetcher)) {
      results.push(item);
    }

    expect(results).toEqual(["x", "y"]);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
