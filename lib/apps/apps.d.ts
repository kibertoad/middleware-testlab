export interface EndpointDefinition {
  method: 'get' | 'post' | 'delete' | 'put' | 'patch' | 'options' | 'head'
  path: string
}
