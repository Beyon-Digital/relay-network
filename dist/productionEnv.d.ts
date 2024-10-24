import { Environment } from 'relay-runtime';
import { MiddlewareBuilderProps } from './middleware';
declare const EnvironmentBuilder: ({ networkOpts, ...props }: MiddlewareBuilderProps) => Environment;
export default EnvironmentBuilder;
