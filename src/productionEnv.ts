import { Environment, RecordSource, Store } from 'relay-runtime';
import { RelayNetworkLayer } from 'react-relay-network-modern';
import { MiddlewareBuilderProps, middlewares } from './middleware';

const source = new RecordSource();
const store = new Store(source);
const EnvironmentBuilder = (props: MiddlewareBuilderProps): Environment => new Environment({
    network: new RelayNetworkLayer(middlewares(props), {}),
    store
});


export default EnvironmentBuilder;