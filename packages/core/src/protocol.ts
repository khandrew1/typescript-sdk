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

export type {
    CallToolRequest,
    CallToolResult,
    ContentBlock,
    CreateMessageRequest,
    CreateMessageResult,
    CreateMessageResultWithTools,
    EmbeddedResource,
    EmptyResult,
    Implementation,
    JSONRPCMessage,
    ListPromptsRequest,
    ListPromptsResult,
    ListResourcesRequest,
    ListResourcesResult,
    ListResourceTemplatesRequest,
    ListResourceTemplatesResult,
    ListToolsRequest,
    ListToolsResult,
    LoggingMessageNotification,
    MessageExtraInfo,
    PingRequest,
    PromptListChangedNotification,
    ReadResourceRequest,
    ReadResourceResult,
    RequestId,
    ResourceLink,
    ResourceListChangedNotification,
    ServerCapabilities,
    StandardSchemaV1,
    Tool,
    ToolAnnotations,
    ToolListChangedNotification
} from '../../core-internal/src/exports/public/index';
export {
    type BaseContext,
    mergeCapabilities,
    Protocol,
    type ProtocolOptions,
    type RequestOptions
} from '../../core-internal/src/shared/protocol';
export type { Transport, TransportSendOptions } from '../../core-internal/src/shared/transport';
export { InMemoryTransport } from '../../core-internal/src/util/inMemory';
