import { print } from "graphql";

import type { TestResource } from "./index.js";
import { throwIfError, HighnoteUnexpectedResponseError } from "../../errors.js";
import type {
  SimulateApplicationStatusChangeMutation,
  SimulateApplicationStatusChangeMutationVariables,
  SimulateApplicationVerificationStatusChangeMutation,
  SimulateApplicationVerificationStatusChangeMutationVariables,
  SimulateApplicationDocumentReviewMutation,
  SimulateApplicationDocumentReviewMutationVariables,
  SimulateCreateApplicationDocumentsUploadSessionsMutation,
  SimulateCreateApplicationDocumentsUploadSessionsMutationVariables,
} from "../../generated/graphql.js";
import {
  SimulateApplicationStatusChangeDocument,
  SimulateApplicationVerificationStatusChangeDocument,
  SimulateApplicationDocumentReviewDocument,
  SimulateCreateApplicationDocumentsUploadSessionsDocument,
} from "../../generated/graphql.js";

// ── Types ──

type SimulatedApplication = Extract<
  NonNullable<SimulateApplicationStatusChangeMutation["simulateApplicationStatusChange"]>,
  { __typename: "AccountHolderCardProductApplication" }
>;

type SimulatedApplicationDocument = Extract<
  NonNullable<SimulateApplicationDocumentReviewMutation["simulateApplicationDocumentReview"]>,
  { __typename: "AccountHolderApplicationDocument" }
>;

// ── Resource ──

export class TestApplicationsResource {
  constructor(private readonly _test: TestResource) {}

  async changeStatus(
    input: SimulateApplicationStatusChangeMutationVariables["input"],
  ): Promise<SimulatedApplication> {
    this._test.guardEnvironment("test.applications.changeStatus");
    const { data } = await this._test._client.graphql.rawRequest<SimulateApplicationStatusChangeMutation>(
      print(SimulateApplicationStatusChangeDocument),
      { input },
    );
    const result = data?.simulateApplicationStatusChange;
    throwIfError(result);
    if (!result || result.__typename !== "AccountHolderCardProductApplication") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateApplicationStatusChange");
    }
    return result as SimulatedApplication;
  }

  async changeVerificationStatus(
    input: SimulateApplicationVerificationStatusChangeMutationVariables["input"],
  ): Promise<SimulatedApplication> {
    this._test.guardEnvironment("test.applications.changeVerificationStatus");
    const { data } = await this._test._client.graphql.rawRequest<SimulateApplicationVerificationStatusChangeMutation>(
      print(SimulateApplicationVerificationStatusChangeDocument),
      { input },
    );
    const result = data?.simulateApplicationVerificationStatusChange;
    throwIfError(result);
    if (!result || result.__typename !== "AccountHolderCardProductApplication") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateApplicationVerificationStatusChange");
    }
    return result as SimulatedApplication;
  }

  async reviewDocument(
    input: SimulateApplicationDocumentReviewMutationVariables["input"],
  ): Promise<SimulatedApplicationDocument> {
    this._test.guardEnvironment("test.applications.reviewDocument");
    const { data } = await this._test._client.graphql.rawRequest<SimulateApplicationDocumentReviewMutation>(
      print(SimulateApplicationDocumentReviewDocument),
      { input },
    );
    const result = data?.simulateApplicationDocumentReview;
    throwIfError(result);
    if (!result || result.__typename !== "AccountHolderApplicationDocument") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateApplicationDocumentReview");
    }
    return result as SimulatedApplicationDocument;
  }

  async createDocumentUploadSessions(
    input: SimulateCreateApplicationDocumentsUploadSessionsMutationVariables["input"],
  ): Promise<SimulatedApplication> {
    this._test.guardEnvironment("test.applications.createDocumentUploadSessions");
    const { data } = await this._test._client.graphql.rawRequest<SimulateCreateApplicationDocumentsUploadSessionsMutation>(
      print(SimulateCreateApplicationDocumentsUploadSessionsDocument),
      { input },
    );
    const result = data?.simulateCreateApplicationDocumentsUploadSessions;
    throwIfError(result);
    if (!result || result.__typename !== "AccountHolderCardProductApplication") {
      throw new HighnoteUnexpectedResponseError(result?.__typename ?? "null", "Unexpected response from simulateCreateApplicationDocumentsUploadSessions");
    }
    return result as SimulatedApplication;
  }
}
