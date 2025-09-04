const need = (k: string) => {
  const v = process.env[k];
  if (!v) throw new Error(Missing env: );
  return v;
};

export const ENV = {
  region: process.env.AWS_REGION || "us-west-2",
  s3Bucket: process.env.S3_BUCKET || "phq-local-bucket",
  ddbTable: process.env.DDB_TABLE || "phq-local-ddb",
  accioBaseUrl: process.env.ACCIO_BASE_URL || "https://mock.example",
  accioSecretName: process.env.ACCIO_SECRET_NAME || "accio-api-key",
  slackSecretName: process.env.SLACK_SECRET_NAME || "slack-webhook",
  localAccioKey: process.env.ACCIO_API_KEY_LOCAL,
  localSlackWebhook: process.env.SLACK_WEBHOOK_URL_LOCAL
};
