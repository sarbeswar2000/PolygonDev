const  maticjs =require("@maticnetwork/maticjs");
const { POSClient, use } = maticjs;
const  mi =require("@maticnetwork/maticjs-web3");
const { Web3ClientPlugin } = mi;
const  HDWalletProvider = require("@truffle/hdwallet-provider");
const  ethers =require ("ethers"); // Use ethers for additional utilities if needed

use(Web3ClientPlugin);

const privateKey =
  "0166db2948aa539a5fb68e47f04e48e5eaef4ee8405dcae1677070fa9beb0a74"; // Replace with your private key
const fromAddress = "0x4879afBdA99d8162C2ff93310dbE227025F765bB"; // Replace with your wallet address named ethersaccount
const mainRpc = "https://sepolia.infura.io/v3/b1308fcadfcf4e49b317f74184bbcd03"; // Parent chain (Sepolia) RPC
const maticRpc = "https://rpc-amoy.polygon.technology"; // Child chain (Amoy) RPC
const posClient = new POSClient();

// Global unhandled rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Function to initialize POSClient
const initializePOSClient = async () => {
  try {
    await posClient.init({
      network: "testnet",
      version: "amoy",
      parent: {
        provider: new HDWalletProvider(privateKey, mainRpc),
        defaultConfig: {
          from: fromAddress,
        },
      },
      child: {
        provider: new HDWalletProvider(privateKey, maticRpc),
        defaultConfig: {
          from: fromAddress,
        },
      },
    });
    console.log("POS Client initialized for Amoy Testnet!");
  } catch (error) {
    console.error("Error initializing POS Client:", error);
  }
};

// Function to approve maximum for the parent ERC20 token
const ApproveMaxResultfun = async () => {
  try {
    // Ensure POSClient is initialized first
    await initializePOSClient();

    // Make sure you await the erc20 initialization as it is asynchronous
    const erc20TokenParent = await posClient.erc20("0xb480378044d92C96D16589Eb95986df6a97F2cFB", true); // Parent token
    const approveResult = await erc20TokenParent.approveMax(); // Approve maximum amount
    const txHash = await approveResult.getTransactionHash(); // Get the transaction hash
    console.log("Approve Result:", approveResult);
    console.log("Transaction Hash:", txHash);
    console.log("The code is running perfectly....");
  } catch (error) {
    console.log("Error occurred:", error);
  }
};

const TransferEtherMaintoAmoy= async ()=>{
   try
   {
    await initializePOSClient();
    const erc20TokenParent =await posClient.erc20("0xb480378044d92C96D16589Eb95986df6a97F2cFB",true);
    // const amountInWei = ethers.utils.parseEther("1");
 
    const Result = await erc20TokenParent.transfer(
      0.1,
      "0x4879afBdA99d8162C2ff93310dbE227025F765bB"
    );
    const Resulthash=await Result.getTransactionHash();
    const ResultRecipt=await Result.getReceipt();
    console.log(Resulthash);
    console.log(ResultRecipt);
   }
   catch(error){
    console.log(error);
   }
 
;}  
// Call the approve max function
ApproveMaxResultfun().then(()=>process.exit(0));
TransferEtherMaintoAmoy().then(()=>process.exit(0));
