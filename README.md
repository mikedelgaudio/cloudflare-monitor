# Cloudflare Worker Connectivity Verifier

This Cloudflare Worker script helps verify the connectivity to two web servers and automatically updates the DNS domain to point to the online server if one of them goes down.

## How It Works

1. The script periodically checks the connectivity of two web servers.
2. If the first server is online, it updates the DNS domain to point to that server.
3. If the first server is down but the second server is online, it updates the DNS domain to point to the second server.
4. If both servers are down, no changes are made to the DNS domain.

## Configuration

Before using the script, make sure to configure the following:

- `server1`: The URL of the first web server.
- `server2`: The URL of the second web server.
- `domain`: The DNS domain that needs to be updated.
- `dnsAPIKey`: The Cloudflare API key with DNS modification permissions.
- `dnsZoneID`: The Cloudflare zone ID where the DNS record resides.
- `dnsRecordID`: The ID of the DNS record that needs to be updated.

## Deployment

To deploy the script to Cloudflare Workers, you can use either the Cloudflare Workers GitHub Action or Wrangler.

- **Cloudflare Workers GitHub Action**: Configure the necessary secrets in your GitHub repository settings and update the workflow file to use the secrets and deploy the script on each push to the main branch.

- **Wrangler**: Install Wrangler and configure the `wrangler.toml` file with your account and project details. Use Wrangler commands to build and deploy the script.

## License

This script is licensed under the [MIT License](LICENSE).

Feel free to customize and adapt it according to your needs!
