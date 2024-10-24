# relay-network

`relay-network` is a TypeScript package designed to build Relay environment objects for Beyond Digital APIs. It provides a set of middlewares and utilities to facilitate network operations in Relay.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [EnvironmentBuilder](#environmentbuilder)
  - [MiddlewareBuilderProps](#middlewarebuilderprops)
- [Custom Events](#custom-events)
- [Development](#development)
- [License](#license)

## Installation

To install the package, use npm:

```sh
npm install relay-network
```

## Usage

To create a Relay environment, use the `EnvironmentBuilder` function:

```typescript
import EnvironmentBuilder from 'relay-network';

const environment = EnvironmentBuilder({
    url: 'https://api.example.com/graphql',
    apiToken: 'your-api-token',
    extraHeaders: {
        'X-Custom-Header': 'value'
    },
    networkOpts: {
        noThrow: true
    }
});
```

## API

### EnvironmentBuilder

The `EnvironmentBuilder` function creates a Relay environment with the specified middlewares and network options.

```typescript
import EnvironmentBuilder from 'relay-network';

const environment = EnvironmentBuilder(props: MiddlewareBuilderProps): Environment;
```

### MiddlewareBuilderProps

The `MiddlewareBuilderProps` interface defines the properties for building the middleware.

```typescript
export interface MiddlewareBuilderProps {
    url: string;
    apiToken: string;
    token?: string;
    extraHeaders?: Record<string, string>;
    extraMiddleware?: Middleware[];
    networkOpts?: RelayNetworkLayerOpts;
}
```

## Custom Events

The `progressMiddleware` emits a custom event named `loadingProgress` during the loading process. You can listen to this event as follows:

### Web

```typescript
window.addEventListener('loadingProgress', (event: CustomEvent) => {
    const { current, total } = event.detail;
    console.log(`Downloaded: ${current} B, total: ${total} B`);
});
```

### React Native

```typescript
import { DeviceEventEmitter } from 'react-native';

DeviceEventEmitter.addListener('loadingProgress', (data) => {
    const { current, total } = data;
    console.log(`Downloaded: ${current} B, total: ${total} B`);
});
```

## Development

To build the project, run:

```sh
npm run build
```

To run tests, use:

```sh
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
