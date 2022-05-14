function connectToMetMask() {
    ethereum.request({ method: 'eth_requestAccounts' }).then(result => {
        console.log("Account: ", result);
    })
}

async function getJSON() {
    try {
        const response = await fetch("build/contracts/Certi.json");
        const json = await response.json();
        console.log(json.networks['5777'].address);
        return json;
    }
    catch (err) {
        console.log(err)
    }

}


$(document).ready(async function () {

    MyContractJSON = await getJSON();

    console.log("COntract JSON: ", MyContractJSON);

    web3 = new Web3(ethereum);
    console.log("Connection Object: ", web3)

    const contractAddress = MyContractJSON.networks['5777'].address;
    const contractAbi = MyContractJSON.abi;

    console.log("HAi", contractAbi)

    myContract = new web3.eth.Contract(contractAbi, contractAddress);
    console.log("Contract Object: ", myContract)
})
