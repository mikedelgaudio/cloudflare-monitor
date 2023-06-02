// Define your web servers and DNS settings
const server1 = process.env.SERVER_URL1;
const server2 = process.env.SERVER_URL2;
const domain = process.env.DOMAIN;
const dnsAPIKey = process.env.DNS_API_KEY;
const dnsZoneID = process.env.DNS_ZONE_ID;
const dnsRecordIDs = process.env.DNS_RECORD_IDS.split(",");

// Function to check server connectivity
async function checkServerConnectivity(server) {
  try {
    const response = await fetch(server);
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Function to update DNS record
async function updateDNSRecords(ipAddress) {
  try {
    for (const recordID of dnsRecordIDs) {
      const url = `https://api.cloudflare.com/client/v4/zones/${dnsZoneID}/dns_records/${recordID}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dnsAPIKey}`,
      };
      const body = {
        type: "A",
        name: domain,
        content: ipAddress,
        ttl: 1,
        proxied: true,
      };

      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log(`Successfully updated DNS record ID ${recordID}`);
      } else {
        console.error(`Failed to update DNS record ID ${recordID}`);
      }
    }
  } catch (error) {
    console.error("Error updating DNS records:", error);
  }
}

// Function to periodically check servers and update DNS
async function checkServersAndDNS() {
  const isServer1Online = await checkServerConnectivity(server1);
  const isServer2Online = await checkServerConnectivity(server2);

  if (isServer1Online) {
    // Update DNS record to point to server1
    await updateDNSRecord(server1);
    console.log("Server 1 is online. DNS updated.");
  } else if (isServer2Online) {
    // Update DNS record to point to server2
    await updateDNSRecord(server2);
    console.log("Server 1 is down. Server 2 is online. DNS updated.");
  } else {
    console.log("Both servers are down.");
  }
}

// Schedule recurring checks
addEventListener("scheduled", (event) => {
  event.waitUntil(checkServersAndDNS());
});
