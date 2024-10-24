/// <reference types="lodash" />
import { Environment } from 'relay-runtime';
import { MiddlewareBuilderProps } from './middleware';
/**
 * DEFAULT Environment Builder for production
 *
 * @param {MiddlewareBuilderProps} props - The properties for building the middleware.
 * @param {Object} networkOpts - The network options for the RelayNetworkLayer.
 * @returns {Environment} - The Relay Environment instance.
 */
declare const EnvironmentBuilder: (({ networkOpts, ...props }: MiddlewareBuilderProps) => Environment) & import("lodash").MemoizedFunction;
export default EnvironmentBuilder;
export { middlewares, MiddlewareBuilderProps } from "./middleware";
