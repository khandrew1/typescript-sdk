---
'@modelcontextprotocol/core': minor
---

Expose the role-neutral `Protocol` engine and its supporting public types from
`@modelcontextprotocol/core/protocol`. Direct subclasses can implement custom
JSON-RPC protocols without depending on the client or server packages or
performing the MCP initialize handshake.
