import { useWeb3React } from "@web3-react/core";
import Web3 from "web3"

 
export const useTransactionReceipt = () => {
    const {library} = useWeb3React()
    const web3 = new Web3(library?.provider);
     const getTransactionStatus = (hash: string) =>{
      return new Promise (async (resolve, reject)=>{
        const runInterval = setInterval(async () => {
          const txReceipt = await web3.eth.getTransactionReceipt(hash)
          console.log(txReceipt);
          if (txReceipt?.status === true) {
            //  show success and close modal
            clearInterval(runInterval);
            resolve(true);
          } else if (txReceipt?.status === false) {
            // show error and close modal
            clearInterval(runInterval);
            reject(false);
          }
        }, 500)
      })
    }
    return {
      getTransactionStatus
    }
  }