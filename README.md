## 🚀 Running the `script.ts` Script

This guide outlines the steps to run this Hardhat script.

-----

### Prerequisites: Install Node.js

Before you begin, ensure Node.js (v16 or higher) is installed on your system.

#### **Windows**

1. Download the installer from [nodejs.org](https://nodejs.org/)
2. Run the `.msi` installer and follow the setup wizard
3. Verify installation:
```bash
   node --version
   npm --version
```

#### **macOS**

**Option 1: Using Homebrew (Recommended)**
```bash
brew install node
```

**Option 2: Using the Official Installer**
1. Download from [nodejs.org](https://nodejs.org/)
2. Run the `.pkg` installer
3. Verify installation:
```bash
   node --version
   npm --version
```

#### **Linux**

**Ubuntu/Debian:**
```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm -y

# Verify installation
node --version
npm --version
```

**For newer versions, use NodeSource:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

**Fedora/RHEL/CentOS:**
```bash
sudo dnf install nodejs npm -y
```

**Arch Linux:**
```bash
sudo pacman -S nodejs npm
```

-----
### Clone this repository
```bash
git clone https://github.com/jerydam/confluence-hack.git
```
```bash
cd confluence-hack
```
### Step 1: Install Dependencies
Since you've successfully cloned this repository, install the required packages:
```bash
npm install
```

-----

### Step 2: Configure the `.env` File

Rename the **`.env.example`** file in the **root directory** of the Hardhat project to **`.env`**.

Populate it with the required environment variables:
```dotenv
RPC_URL="https://celo-mainnet.g.alchemy.com/v2/paste-alchemy-api-here" 
PRIVATE_KEY="paste your privatekey here" # Private key of the account that will call the 'withdraw' function
CONTRACT_ADDRESS="contract address" # The address where you deployed the ConfluenceHack contract
```

> ⚠️ **Warning:** Never commit your `.env` file to version control. Keep your private key secure!

-----

### Step 3: Solve the CTF and Update the Script

1. Place the provided `script.ts` code into your Hardhat project's `scripts` folder (e.g., `scripts/script.ts`).
2. **Solve the cipher** based on the hints provided in the script's comments.
3. Update the **`SECRET_KEY_PLACEHOLDER`** variable in `scripts/script.ts` with your **27-digit solution**.

**In `scripts/script.ts`:**
```typescript
// Replace "" with your solved 27-digit key
const SECRET_KEY_PLACEHOLDER: string = "YOUR_SOLVED_27_DIGIT_KEY"; 
```

-----

### Step 4: Execute the Script

Run the script using the Hardhat command runner:
```bash
npx hardhat run scripts/script.ts
```

The output will display the initial and final contract balances, indicating whether the withdrawal was successful.

-----

## 🐛 Troubleshooting

- **"command not found: npx"** → Ensure Node.js is properly installed and in your PATH
- **Connection errors** → Verify your RPC_URL is correct and accessible
- **Transaction failures** → Check that your account has sufficient balance for gas fees
- **Invalid private key** → Ensure the PRIVATE_KEY in `.env` is correct and includes the `0x` prefix if required

-----
