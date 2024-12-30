import "./FxBaseRootTunnel.sol";

contract FxCustomStateRootTunnet is FxBaseRootTunnel{
      bytes public latesData;
      constructor(address _checkPointManager,address _fxRoot)FxBaseRootTunnel(_checkPointManager,_fxRoot){

      }
      function _processMessageFromChild(bytes memory data)internal override{
         latesData =data;
      }
      function sendMessageToChild(bytes memory message){
         _sendMessageToChild(message);
         
      }
}