// import config from '@payload-config'
// import { Admin } from '@payloadcms/next/views'

export default function AdminPage() {
  if (process.env.DISABLE_PAYLOAD_ADMIN === "true") {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h1>Admin panel is disabled in production.</h1>
      </div>
    );
  }

  // Uncomment and use your original admin code here:
  // return <Admin config={config} />;
  return null;
}
