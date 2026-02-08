const fetch = globalThis.fetch;

async function test() {
    const baseUrl = 'http://localhost:3000';
    const testUser = {
        name: "Verified User",
        email: "verified@example.com",
        password: "password123",
        level: "TC",
        stream: "TC_Sc",
        phone: "0600000000"
    };

    console.log("1. Testing Registration...");
    const regRes = await fetch(`${baseUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser)
    });
    const regData = await regRes.json();
    console.log("Registration Response:", regData);

    console.log("\n2. Testing Admin Login...");
    const loginRes = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@orienta.com', password: 'admin' })
    });
    const loginData = await loginRes.json();
    console.log("Login Response:", loginData);

    // Get cookie from login response
    const cookie = loginRes.headers.get('set-cookie');

    console.log("\n3. Testing Admin Users List...");
    const adminUsersRes = await fetch(`${baseUrl}/api/admin/users`, {
        headers: { 'Cookie': cookie }
    });
    const adminUsersData = await adminUsersRes.json();

    const newUser = adminUsersData.users.find(u => u.email === "verified@example.com");
    if (newUser) {
        console.log("Found newly registered user in admin table:");
        console.log("Name:", newUser.name);
        console.log("Phone:", newUser.phone);
        if (newUser.phone === "0600000000") {
            console.log("\nSUCCESS: Phone number correctly stored and retrieved!");
        } else {
            console.log("\nFAILURE: Phone number mismatch.");
        }
    } else {
        console.log("\nFAILURE: User not found in admin table.");
    }
}

test().catch(console.error);
