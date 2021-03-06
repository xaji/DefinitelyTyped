// Type definitions for AWS Lambda
// Project: http://docs.aws.amazon.com/lambda
// Definitions by: James Darbyshire <https://github.com/darbio/aws-lambda-typescript>
//                 Michael Skarum <https://github.com/skarum>
//                 Stef Heyenrath <https://github.com/StefH/DefinitelyTyped>
//                 Toby Hede <https://github.com/tobyhede>
//                 Rich Buggy <https://github.com/buggy>
//                 Yoriki Yamaguchi <https://github.com/y13i>
//                 wwwy3y3 <https://github.com/wwwy3y3>
//                 Ishaan Malhi <https://github.com/OrthoDex>
//                 Michael Marner <https://github.com/MichaelMarner>
//                 Daniel Cottone <https://github.com/daniel-cottone>
//                 Kostya Misura <https://github.com/kostya-misura>
//                 Markus Tacker <https://github.com/coderbyheart>
//                 Palmi Valgeirsson <https://github.com/palmithor>
//                 Danilo Raisi <https://github.com/daniloraisi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

// API Gateway "event" request context
export interface APIGatewayEventRequestContext {
    accountId: string;
    apiId: string;
    authorizer?: AuthResponseContext | null;
    httpMethod: string;
    identity: {
        accessKey: string | null;
        accountId: string | null;
        apiKey: string | null;
        caller: string | null;
        cognitoAuthenticationProvider: string | null;
        cognitoAuthenticationType: string | null;
        cognitoIdentityId: string | null;
        cognitoIdentityPoolId: string | null;
        sourceIp: string;
        user: string | null;
        userAgent: string | null;
        userArn: string | null;
    };
    stage: string;
    requestId: string;
    requestTimeEpoch: number;
    resourceId: string;
    resourcePath: string;
}

// API Gateway "event"
export interface APIGatewayEvent {
    body: string | null;
    headers: { [name: string]: string };
    httpMethod: string;
    isBase64Encoded: boolean;
    path: string;
    pathParameters: { [name: string]: string } | null;
    queryStringParameters: { [name: string]: string } | null;
    stageVariables: { [name: string]: string } | null;
    requestContext: APIGatewayEventRequestContext;
    resource: string;
}

// API Gateway CustomAuthorizer "event"
export interface CustomAuthorizerEvent {
    type: string;
    methodArn: string;
    authorizationToken?: string;
    headers?: { [name: string]: string };
    pathParameters?: { [name: string]: string } | null;
    queryStringParameters?: { [name: string]: string } | null;
    requestContext?: APIGatewayEventRequestContext;
}

// Context
// http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_streams_AttributeValue.html
export interface AttributeValue {
    B?: string;
    BS?: string[];
    BOOL?: boolean;
    L?: AttributeValue[];
    M?: { [id: string]: AttributeValue };
    N?: string;
    NS?: string[];
    NULL?: boolean;
    S?: string;
    SS?: string[];
}

// Context
// http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_streams_StreamRecord.html
export interface StreamRecord {
    ApproximateCreationTime?: number;
    Keys?: { [key: string]: AttributeValue };
    NewImage?: { [key: string]: AttributeValue };
    OldImage?: { [key: string]: AttributeValue };
    SequenceNumber?: string;
    SizeBytes?: number;
    StreamViewType?: 'KEYS_ONLY' | 'NEW_IMAGE' | 'OLD_IMAGE' | 'NEW_AND_OLD_IMAGES';
}

// Context
// http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_streams_Record.html
export interface DynamoDBRecord {
    awsRegion?: string;
    dynamodb?: StreamRecord;
    eventID?: string;
    eventName?: 'INSERT' | 'MODIFY' | 'REMOVE';
    eventSource?: string;
    eventSourceARN?: string;
    eventVersion?: string;
    userIdentity?: any;
}

// AWS Lambda Stream event
// Context
// http://docs.aws.amazon.com/lambda/latest/dg/eventsources.html#eventsources-ddb-update
export interface DynamoDBStreamEvent {
    Records: DynamoDBRecord[];
}

// SNS "event"
export interface SNSMessageAttribute {
    Type: string;
    Value: string;
}

export interface SNSMessageAttributes {
    [name: string]: SNSMessageAttribute;
}

export interface SNSMessage {
    SignatureVersion: string;
    Timestamp: string;
    Signature: string;
    SigningCertUrl: string;
    MessageId: string;
    Message: string;
    MessageAttributes: SNSMessageAttributes;
    Type: string;
    UnsubscribeUrl: string;
    TopicArn: string;
    Subject: string;
}

export interface SNSEventRecord {
    EventVersion: string;
    EventSubscriptionArn: string;
    EventSource: string;
    Sns: SNSMessage;
}

export interface SNSEvent {
    Records: SNSEventRecord[];
}

/**
 * S3Create event
 * https://docs.aws.amazon.com/AmazonS3/latest/dev/notification-content-structure.html
 */
export interface S3EventRecord {
    eventVersion: string;
    eventSource: string;
    awsRegion: string;
    eventTime: string;
    eventName: string;
    userIdentity: {
        principalId: string;
    };
    requestParameters: {
        sourceIPAddress: string;
    };
    responseElements: {
        'x-amz-request-id': string;
        'x-amz-id-2': string;
    };
    s3: {
        s3SchemaVersion: string;
        configurationId: string;
        bucket: {
            name: string;
            ownerIdentity: {
                principalId: string;
            },
            arn: string;
        },
        object: {
            key: string;
            size: number;
            eTag: string;
            versionId: string;
            sequencer: string;
        }
    };
}

export interface S3CreateEvent {
    Records: S3EventRecord[];
}

/**
 * Cognito User Pool event
 * http://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html
 */
export interface CognitoUserPoolEvent {
    version: number;
    triggerSource:
        | "PreSignUp_SignUp"
        | "PostConfirmation_ConfirmSignUp"
        | "PreAuthentication_Authentication"
        | "PostAuthentication_Authentication"
        | "CustomMessage_SignUp"
        | "CustomMessage_AdminCreateUser"
        | "CustomMessage_ResendCode"
        | "CustomMessage_ForgotPassword"
        | "CustomMessage_UpdateUserAttribute"
        | "CustomMessage_VerifyUserAttribute"
        | "CustomMessage_Authentication"
        | "DefineAuthChallenge_Authentication"
        | "CreateAuthChallenge_Authentication"
        | "VerifyAuthChallengeResponse_Authentication"
        | "PreSignUp_AdminCreateUser"
        | "PostConfirmation_ConfirmForgotPassword"
        | "TokenGeneration_HostedAuth"
        | "TokenGeneration_Authentication"
        | "TokenGeneration_NewPasswordChallenge"
        | "TokenGeneration_AuthenticateDevice"
        | "TokenGeneration_RefreshTokens";
    region: string;
    userPoolId: string;
    userName?: string;
    callerContext: {
        awsSdkVersion: string;
        clientId: string;
    };
    request: {
        userAttributes: {[key: string]: string};
        validationData?: {[key: string]: string};
        codeParameter?: string;
        usernameParameter?: string;
        newDeviceUsed?: boolean;
        session?: Array<{
            challengeName: "CUSTOM_CHALLENGE" | "PASSWORD_VERIFIER" | "SMS_MFA" | "DEVICE_SRP_AUTH" | "DEVICE_PASSWORD_VERIFIER" | "ADMIN_NO_SRP_AUTH";
            challengeResult: boolean;
            challengeMetaData?: string;
        }>;
        challengeName?: string;
        privateChallengeParameters?: {[key: string]: string};
        challengeAnswer?: {[key: string]: string};
    };
    response: {
        autoConfirmUser?: boolean;
        smsMessage?: string;
        emailMessage?: string;
        emailSubject?: string;
        challengeName?: string;
        issueTokens?: boolean;
        failAuthentication?: boolean;
        publicChallengeParameters?: {[key: string]: string};
        privateChallengeParameters?: {[key: string]: string};
        challengeMetaData?: string;
        answerCorrect?: boolean;
    };
}

/**
 * CloudFormation Custom Resource event and response
 * http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/crpg-ref.html
 */
export interface CloudFormationCustomResourceEventCommon {
    ServiceToken: string;
    ResponseURL: string;
    StackId: string;
    RequestId: string;
    LogicalResourceId: string;
    ResourceType: string;
    ResourceProperties: {
        ServiceToken: string;
        [Key: string]: any;
    };
}

export interface CloudFormationCustomResourceCreateEvent extends CloudFormationCustomResourceEventCommon {
    RequestType: "Create";
}

export interface CloudFormationCustomResourceUpdateEvent extends CloudFormationCustomResourceEventCommon {
    RequestType: "Update";
    PhysicalResourceId: string;
    OldResourceProperties: {
        [Key: string]: any;
    };
}

export interface CloudFormationCustomResourceDeleteEvent extends CloudFormationCustomResourceEventCommon {
    RequestType: "Delete";
    PhysicalResourceId: string;
}

export type CloudFormationCustomResourceEvent = CloudFormationCustomResourceCreateEvent | CloudFormationCustomResourceUpdateEvent | CloudFormationCustomResourceDeleteEvent;

export interface CloudFormationCustomResourceResponseCommon {
    PhysicalResourceId: string;
    StackId: string;
    RequestId: string;
    LogicalResourceId: string;
    Data?: {
        [Key: string]: any;
    };
}

export interface CloudFormationCustomResourceSuccessResponse extends CloudFormationCustomResourceResponseCommon {
    Status: "SUCCESS";
    Reason?: string;
}

export interface CloudFormationCustomResourceFailedResponse extends CloudFormationCustomResourceResponseCommon {
    Status: "FAILED";
    Reason: string;
}

export type CloudFormationCustomResourceResponse = CloudFormationCustomResourceSuccessResponse | CloudFormationCustomResourceFailedResponse;

/**
 * See https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html#eventsources-scheduled-event
 */
export interface ScheduledEvent {
    account: string;
    region: string;
    detail: any;
    "detail-type": string;
    source: string;
    time: string;
    id: string;
    resources: string[];
}

/**
 * See http://docs.aws.amazon.com/lambda/latest/dg/eventsources.html#eventsources-cloudwatch-logs
 */
export interface CloudWatchLogsEvent {
    awslogs: CloudWatchLogsEventData;
}

export interface CloudWatchLogsEventData {
    data: string;
}

export interface CloudWatchLogsDecodedData {
    owner: string;
    logGroup: string;
    logStream: string;
    subscriptionFilters: string[];
    messageType: string;
    logEvents: CloudWatchLogsLogEvent[];
}

/**
 * See http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#LambdaFunctionExample
 */
export interface CloudWatchLogsLogEvent {
    id: string;
    timestamp: number;
    message: string;
}

// Context
// http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
export interface Context {
    // Properties
    callbackWaitsForEmptyEventLoop: boolean;
    functionName: string;
    functionVersion: string;
    invokedFunctionArn: string;
    memoryLimitInMB: number;
    awsRequestId: string;
    logGroupName: string;
    logStreamName: string;
    identity?: CognitoIdentity;
    clientContext?: ClientContext;

    // Functions
    getRemainingTimeInMillis(): number;

    // Functions for compatibility with earlier Node.js Runtime v0.10.42
    // For more details see http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-using-old-runtime.html#nodejs-prog-model-oldruntime-context-methods
    done(error?: Error, result?: any): void;
    fail(error: Error | string): void;
    succeed(messageOrObject: any): void;
    succeed(message: string, object: any): void;
}

export interface CognitoIdentity {
    cognitoIdentityId: string;
    cognitoIdentityPoolId: string;
}

export interface ClientContext {
    client: ClientContextClient;
    Custom?: any;
    env: ClientContextEnv;
}

export interface ClientContextClient {
    installationId: string;
    appTitle: string;
    appVersionName: string;
    appVersionCode: string;
    appPackageName: string;
}

export interface ClientContextEnv {
    platformVersion: string;
    platform: string;
    make: string;
    model: string;
    locale: string;
}

export interface ProxyResult {
    statusCode: number;
    headers?: {
        [header: string]: boolean | number | string;
    };
    body: string;
    isBase64Encoded?: boolean;
}

/**
 * API Gateway CustomAuthorizer AuthResponse.
 * http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html#api-gateway-custom-authorizer-output
 */
export interface AuthResponse {
    principalId: string;
    policyDocument: PolicyDocument;
    context?: AuthResponseContext;
}

/**
 * API Gateway CustomAuthorizer AuthResponse.PolicyDocument.
 * http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html#api-gateway-custom-authorizer-output
 */
export interface PolicyDocument {
    Version: string;
    Statement: [Statement];
}

/**
 * API Gateway CustomAuthorizer AuthResponse.PolicyDocument.Statement.
 * http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html#api-gateway-custom-authorizer-output
 */
export interface Statement {
    Action: string | string[];
    Effect: string;
    Resource: string | string[];
}

/**
 * API Gateway CustomAuthorizer AuthResponse.PolicyDocument.Statement.
 * http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html#api-gateway-custom-authorizer-output
 */
export interface AuthResponseContext {
    [name: string]: any;
}

/**
 * CloudFront events
 * http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html
 */
export interface CloudFrontHeaders {
    [name: string]: Array<{
        key: string;
        value: string;
    }>;
}

export interface CloudFrontResponse {
    status: string;
    statusDescription: string;
    headers: CloudFrontHeaders;
}

export interface CloudFrontRequest {
    clientIp: string;
    method: string;
    uri: string;
    querystring: string;
    headers: CloudFrontHeaders;
}

export interface CloudFrontEvent {
    config: {
        distributionId: string;
        requestId: string;
    };
}

export interface CloudFrontResponseEvent {
    Records: Array<{
        cf: CloudFrontEvent & {
            request: CloudFrontRequest;
            response: CloudFrontResponse;
        }
    }>;
}

export interface CloudFrontRequestEvent {
    Records: Array<{
        cf: CloudFrontEvent & {
            request: CloudFrontRequest;
        }
    }>;
}

/**
 * AWS Lambda handler function.
 * http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
 *
 * @param event – event data.
 * @param context – runtime information of the Lambda function that is executing.
 * @param callback – optional callback to return information to the caller, otherwise return value is null.
 */
export type Handler = (event: any, context: Context, callback?: Callback) => Promise<void> | void;
export type ProxyHandler = (event: APIGatewayEvent, context: Context, callback?: ProxyCallback) => Promise<void> | void;
export type CustomAuthorizerHandler = (event: CustomAuthorizerEvent, context: Context, callback?: CustomAuthorizerCallback) => Promise<void> | void;

/**
 * Optional callback parameter.
 * http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
 *
 * @param error – an optional parameter that you can use to provide results of the failed Lambda function execution.
 * @param result – an optional parameter that you can use to provide the result of a successful function execution. The result provided must be JSON.stringify compatible.
 */
export type Callback = (error?: Error | null, result?: object | boolean | number | string) => void;
export type ProxyCallback = (error?: Error | null, result?: ProxyResult) => void;
export type CustomAuthorizerCallback = (error?: Error | null, result?: AuthResponse) => void;

export as namespace AWSLambda;
