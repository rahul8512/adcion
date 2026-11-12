const CONTRACT = "0x32EE6dB598E7F0Fa7c47D4601f8AB695d17Fe560";
const TOKEN = { address: CONTRACT, symbol: "ADCN", decimals: 18, image: `${location.origin}/assets/adcoin-logo.png` };
const BSC = {
  chainId: "0x38",
  chainName: "BNB Smart Chain",
  nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  rpcUrls: ["https://bsc-dataseed.bnbchain.org"],
  blockExplorerUrls: ["https://bscscan.com/"]
};

const $ = (id) => document.getElementById(id);
const toast = (message) => {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  window.setTimeout(() => el.classList.remove("show"), 2600);
};

$("year").textContent = new Date().getFullYear();

$("menuToggle").addEventListener("click", () => {
  const nav = $("mainNav");
  const open = nav.classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => {
  $("mainNav").classList.remove("open");
  $("menuToggle").setAttribute("aria-expanded", "false");
}));

$("copyBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(CONTRACT);
    $("copyStatus").textContent = "Contract address copied.";
    toast("ADCN contract address copied");
  } catch {
    $("copyStatus").textContent = "Copy was blocked by your browser. Select and copy the address manually.";
  }
});

async function getWallet() {
  if (!window.ethereum) {
    toast("MetaMask not detected. Install the official wallet first.");
    window.open("https://metamask.io/download/", "_blank", "noopener,noreferrer");
    throw new Error("MetaMask not installed");
  }
  return window.ethereum;
}

async function switchToBsc(provider) {
  try {
    await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: BSC.chainId }] });
  } catch (error) {
    if (error.code === 4902) {
      await provider.request({ method: "wallet_addEthereumChain", params: [BSC] });
    } else {
      throw error;
    }
  }
}

async function connectWallet() {
  try {
    const provider = await getWallet();
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    await switchToBsc(provider);
    const account = accounts[0];
    const short = `${account.slice(0, 6)}...${account.slice(-4)}`;
    $("walletStatus").textContent = `Connected: ${short} · BNB Smart Chain`;
    $("connectBtn").textContent = short;
    $("connectBtnBottom").textContent = short;
    toast("Wallet connected to BNB Smart Chain");
  } catch (error) {
    if (error.code === 4001) toast("Wallet connection was rejected.");
    else if (error.message !== "MetaMask not installed") toast(error.message || "Could not connect wallet.");
  }
}

async function addToken() {
  try {
    const provider = await getWallet();
    await switchToBsc(provider);
    const added = await provider.request({ method: "wallet_watchAsset", params: { type: "ERC20", options: TOKEN } });
    toast(added ? "ADCN token added to wallet." : "Token request was not completed.");
  } catch (error) {
    if (error.code === 4001) toast("Request was rejected in your wallet.");
    else if (error.message !== "MetaMask not installed") toast(error.message || "Could not add token.");
  }
}

$("connectBtn").addEventListener("click", connectWallet);
$("connectBtnBottom").addEventListener("click", connectWallet);
$("addNetworkBtn").addEventListener("click", async () => {
  try {
    const provider = await getWallet();
    await switchToBsc(provider);
    toast("BNB Smart Chain is selected.");
  } catch (error) {
    if (error.code === 4001) toast("Network change was rejected.");
    else if (error.message !== "MetaMask not installed") toast(error.message || "Could not switch network.");
  }
});
$("addTokenBtn").addEventListener("click", addToken);

if (window.ethereum) {
  window.ethereum.on?.("accountsChanged", (accounts) => {
    if (!accounts.length) {
      $("walletStatus").textContent = "Wallet disconnected.";
      $("connectBtn").textContent = "Connect Wallet";
      $("connectBtnBottom").textContent = "Connect MetaMask";
    } else {
      const a = accounts[0];
      $("walletStatus").textContent = `Connected: ${a.slice(0,6)}...${a.slice(-4)}`;
    }
  });
  window.ethereum.on?.("chainChanged", () => window.location.reload());
}
