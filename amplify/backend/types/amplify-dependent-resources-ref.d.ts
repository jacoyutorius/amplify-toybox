export type AmplifyDependentResourcesAttributes = {
  "analytics": {
    "amplifytoybox": {
      "Id": "string",
      "Region": "string",
      "appName": "string"
    },
    "amplifytoyboxKinesis": {
      "kinesisStreamArn": "string",
      "kinesisStreamId": "string",
      "kinesisStreamShardCount": "string"
    }
  },
  "auth": {
    "amplifytoybox": {
      "IdentityPoolId": "string",
      "IdentityPoolName": "string"
    }
  }
}