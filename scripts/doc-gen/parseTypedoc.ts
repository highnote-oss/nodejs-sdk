/**
 * Stage 1 — invoke TypeDoc programmatically against `src/index.ts` and return
 * the serialized JSON model. We use TypeDoc only as a parser; rendering is
 * handled downstream by our own renderers.
 */

import * as TypeDoc from "typedoc";
import type { JSONOutput } from "typedoc";

export interface ParseTypedocOptions {
  /** Files to include as entry points. The first should be `src/index.ts`. */
  entryPoints: string[];
  /** Project tsconfig path. */
  tsconfig: string;
  /** Project root (for source path resolution). */
  cwd: string;
}

export async function parseTypedoc(
  options: ParseTypedocOptions,
): Promise<JSONOutput.ProjectReflection> {
  const app = await TypeDoc.Application.bootstrapWithPlugins({
    entryPoints: options.entryPoints,
    entryPointStrategy: "expand",
    tsconfig: options.tsconfig,
    excludeExternals: true,
    excludePrivate: true,
    excludeInternal: true,
    skipErrorChecking: true,
    logLevel: "Warn",
  });

  const project = await app.convert();
  if (!project) {
    throw new Error("TypeDoc.convert() returned no project — check tsconfig and entry point");
  }
  return app.serializer.projectToObject(project, options.cwd);
}
