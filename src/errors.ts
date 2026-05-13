/** A single field-level error from the Highnote API. */
export interface FieldError {
  code?: string;
  description?: string;
  errorPath?: string[];
}

/** Base class for all Highnote SDK errors. */
export class HighnoteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HighnoteError";
  }
}

/** Thrown when the API returns a UserError (validation / bad input). */
export class HighnoteUserError extends HighnoteError {
  readonly fieldErrors: FieldError[];

  constructor(fieldErrors: FieldError[]) {
    const message =
      fieldErrors.map((e) => e.description ?? e.code ?? "Unknown error").join("; ") ||
      "User error";
    super(message);
    this.name = "HighnoteUserError";
    this.fieldErrors = fieldErrors;
  }
}

/** Thrown when the API returns an AccessDeniedError. */
export class HighnoteAccessDeniedError extends HighnoteError {
  constructor(message: string) {
    super(message);
    this.name = "HighnoteAccessDeniedError";
  }
}

/** Thrown when the API returns a __typename we don't recognise as success. */
export class HighnoteUnexpectedResponseError extends HighnoteError {
  readonly typename: string;

  constructor(typename: string, message?: string) {
    super(message ?? `Unexpected response type: ${typename}`);
    this.name = "HighnoteUnexpectedResponseError";
    this.typename = typename;
  }
}

/** Thrown when a simulation method is called outside the test environment. */
export class HighnoteSimulationError extends HighnoteError {
  constructor(method: string) {
    super(`${method}() is only available in the test environment`);
    this.name = "HighnoteSimulationError";
  }
}

/**
 * Check a GraphQL union response and throw a typed error if the __typename
 * indicates a failure variant.
 *
 * Usage:
 * ```ts
 * const result = data.activatePaymentCard;
 * throwIfError(result);
 * // result is now narrowed to the success type
 * ```
 */
export function throwIfError(
  result:
    | {
        __typename?: string;
        message?: string;
        errors?: Array<{ code?: string | null; description?: string | null; errorPath?: string[] | null } | null> | null;
      }
    | undefined
    | null,
): void {
  if (!result || !result.__typename) return;

  switch (result.__typename) {
    case "UserError": {
      const fieldErrors: FieldError[] = (result.errors ?? [])
        .filter((e): e is NonNullable<typeof e> => e != null)
        .map((e) => ({
          code: e.code ?? undefined,
          description: e.description ?? undefined,
          errorPath: e.errorPath ?? undefined,
        }));
      throw new HighnoteUserError(fieldErrors);
    }
    case "AccessDeniedError":
      throw new HighnoteAccessDeniedError(result.message ?? "Access denied");
    default:
      // If it looks like an error type (ends with "Error"), throw
      if (result.__typename.endsWith("Error")) {
        throw new HighnoteUnexpectedResponseError(result.__typename, result.message);
      }
  }
}
