/**
 * Creates the file bucket (photos and spec-sheet PDFs) if it does not exist, and lets
 * the admin upload to it straight from the browser (CORS). Safe to run repeatedly.
 *
 *   pnpm storage:setup
 *
 * Reads S3_ENDPOINT, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY and S3_BUCKET:
 * the Docker store locally, Cloudflare R2 in production. On R2 the bucket and its CORS
 * rule can also be set in the Cloudflare dashboard.
 */
import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutBucketCorsCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const ORIGINS = [
  "http://localhost:3000",
  "https://megatecpumps.com",
  "https://www.megatecpumps.com",
  "https://*.vercel.app",
];

async function main() {
  const { S3_ENDPOINT, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET } =
    process.env;
  if (!S3_ENDPOINT || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY || !S3_BUCKET) {
    throw new Error("S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY and S3_BUCKET must be set");
  }
  const s3 = new S3Client({
    endpoint: S3_ENDPOINT,
    region: S3_REGION || "auto",
    forcePathStyle: true,
    credentials: { accessKeyId: S3_ACCESS_KEY_ID, secretAccessKey: S3_SECRET_ACCESS_KEY },
  });

  try {
    await s3.send(new HeadBucketCommand({ Bucket: S3_BUCKET }));
    console.log(`Bucket ${S3_BUCKET} already exists.`);
  } catch {
    await s3.send(new CreateBucketCommand({ Bucket: S3_BUCKET }));
    console.log(`Created bucket ${S3_BUCKET}.`);
  }

  await s3.send(
    new PutBucketCorsCommand({
      Bucket: S3_BUCKET,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedOrigins: ORIGINS,
            AllowedMethods: ["PUT", "GET", "HEAD"],
            AllowedHeaders: ["*"],
            MaxAgeSeconds: 3600,
          },
        ],
      },
    })
  );
  console.log(`Browser uploads allowed from ${ORIGINS.join(", ")}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
