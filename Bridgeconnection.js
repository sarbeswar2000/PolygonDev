const  maticjs =require("@maticnetwork/maticjs");
const { POSClient, use } = maticjs;
const  mi =require("@maticnetwork/maticjs-web3");
const { Web3ClientPlugin } = mi;
const  HDWalletProvider = require("@truffle/hdwallet-provider");
const  ethers =require ("ethers"); // Use ethers for additional utilities if needed

use(Web3ClientPlugin);
const privateKey="0166db2948aa539a5fb68e47f04e48e5eaef4ee8405dcae1677070fa9beb0a74";
const mainRpc="https://sepolia.infura.io/v3/b1308fcadfcf4e49b317f74184bbcd03";
const fromAddress="0x4879afBdA99d8162C2ff93310dbE227025F765bB";
const childRpc="https://rpc-amoy.polygon.technology";
const PosClient=new POSClient();
// const ERC20maincontractaddress="0x67cac16a22b3de301e3aa0567c30ad13f14bd03f";
// const ERC20childcontractaddress="0xbc40d494111f117a1b7c0c38ebac81f1b85086fd";
const dummyErc20maincontractaddress="0xb480378044d92C96D16589Eb95986df6a97F2cFB";

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  
const initializationPosclient=async()=>{
     
    try{
        await PosClient.init({
            network:"testnet",
            version:"amoy",
            parent:{
                provider: new HDWalletProvider(privateKey,mainRpc),
                defaultConfig:{
                    from:fromAddress
                }
            }
            ,
            child:{
                provider:new HDWalletProvider(privateKey,childRpc),
                defaultConfig:{
                    from:fromAddress
                }
            }
        });
        console.log("Amoy testnet initialized now ");
    }
    catch(error){
        console.log(error);
    }
}
const TransferEtherMaintoAmoy= async ()=>{
       try{
          await initializationPosclient();
          const ERC20mainToken=await PosClient.erc20(dummyErc20maincontractaddress,true);
          const  deposittoken= await ERC20mainToken.deposit(0.1,fromAddress);
          const gethash= await  deposittoken.getTransactionHash();
          const  Transactionrecipt=await deposittoken.getReceipt();
          console.log("trasanction hash: ",gethash);
          console.log("trasanction recipt",Transactionrecipt);
       }
       catch(error){
         console.log(error);
       }
}
// initializationPosclient();
TransferEtherMaintoAmoy();