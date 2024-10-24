import memoize from 'lodash.memoize';
import { Environment, RecordSource, Store } from 'relay-runtime';
import { RelayNetworkLayer } from 'react-relay-network-modern';
import { MiddlewareBuilderProps, middlewares } from './middleware';

const source = new RecordSource();
const store = new Store(source);

/**
 * DEFAULT Environment Builder for production
 *
 * @param {MiddlewareBuilderProps} props - The properties for building the middleware.
 * @param {Object} networkOpts - The network options for the RelayNetworkLayer.
 * @returns {Environment} - The Relay Environment instance.
 */
const EnvironmentBuilder = memoize(
    ({ networkOpts, ...props }: MiddlewareBuilderProps): Environment => {
        const mw = middlewares(props);
        const env = new Environment({
            network: new RelayNetworkLayer(mw, networkOpts),
            store
        })
        return env;
    }
);

export default EnvironmentBuilder;
export { middlewares, MiddlewareBuilderProps } from "./middleware";
