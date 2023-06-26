connectToMetaMask = async () => {
  let accounts = await ethereum.request({ method: "eth_requestAccounts" });
  alert(`Connected to ${accounts[0]}!`);
};

let web3;
let MyContract;

window.onload = async () => {
  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_course",
          type: "string",
        },
        {
          internalType: "string",
          name: "_grade",
          type: "string",
        },
        {
          internalType: "string",
          name: "_date",
          type: "string",
        },
      ],
      name: "issue",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "string",
          name: "course",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "grade",
          type: "string",
        },
      ],
      name: "Issued",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "Certificates",
      outputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "course",
          type: "string",
        },
        {
          internalType: "string",
          name: "grade",
          type: "string",
        },
        {
          internalType: "string",
          name: "date",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const contractAddress = "0x8Dcd577D68C9851bda157Eb7f26d5ab2D05834f1";
  web3 = new Web3(ethereum);
  MyContract = new web3.eth.Contract(abi, contractAddress);
};

issueCertificate = async () => {
  let certificateID = document.getElementById("certificateID").value;
  let candidateName = document.getElementById("candidateName").value;
  let courseName = document.getElementById("courseName").value;
  let grade = document.getElementById("grade").value;
  let date = document.getElementById("date").value;
  let trxReceipt = await MyContract.methods
    .issue(certificateID, candidateName, courseName, grade, date)
    .send({ from: ethereum.selectedAddress, gasLimit: 500000 });
  console.log("Trx: ", trxReceipt);
  alert(`Certificate is issued for ${certificateID}!`);
};

getCertificateDetails = async () => {
  let certificateID = document.getElementById("certificateID").value;
  console.log(certificateID);
  let result = await MyContract.methods.Certificates(certificateID).call();
  sessionStorage.setItem("certificateID", certificateID);
  sessionStorage.setItem("candidateName", result.name);
  sessionStorage.setItem("courseName", result.course);
  sessionStorage.setItem("grade", result.grade);
  sessionStorage.setItem("date", result.date);
  window.location.href = "viewCertificate.html";
};
