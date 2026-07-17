// @modelcontextprotocol/core/protocol
//
// Public, role-neutral extension point for consumers that build their own
// JSON-RPC protocol on the SDK engine. Unlike Client and Server, Protocol does
// not perform the MCP initialize handshake when connected.
//
// The implementation still lives in core-internal so the role packages can
// build from the same source. This entry bundles that source into core, giving
// consumers one canonical Protocol class without depending on either role
// package or the private core-internal package at runtime.

export * from '../../core-internal/src/exports/public/index';
export { mergeCapabilities, Protocol } from '../../core-internal/src/shared/protocol';
