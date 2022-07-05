connectToMetMask = async () => {
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    let account = accounts[0]
    console.log("Connected to ", account)
}

fetchJSON = async () => {
    try {
        let res = await fetch("build/contracts/certi.json")
        let json = res.json()
        return json
    } catch (error) {
        console.log(error)
    }
}

window.onload = async () => {
    let ContractArtifact = await fetchJSON()
    const ABI = ContractArtifact.abi
    const ContractAddress = ContractArtifact.networks['5777'].address
    // console.log("ABI is", ABI)
    // console.log("Contract Address is", ContractAddress)
    web3 = new Web3(ethereum)
    MyContract = new web3.eth.Contract(ABI, ContractAddress)
}

issueCertificate = async () => {
    let certificateID = document.getElementById("certificateID").value
    let courseName = document.getElementById("courseName").value
    let candidateName = document.getElementById("candidateName").value
    let grade = document.getElementById("grade").value
    let date = document.getElementById("date").value
    // console.log("ID: ", certificateID)
    // console.log("Course: ", courseName)
    // console.log("Candidate: ", candidateName)
    // console.log("Grade: ", grade)
    // console.log("Date: ", date)
    let trxReceipt = await MyContract.methods.newCertificate(certificateID, courseName, candidateName, grade, date)
        .send({ from: ethereum.selectedAddress, gasLimit: 500000 })
    console.log("Trx:", trxReceipt)
    alert("Certificate is issued for " + certificateID)
}

getCertificateDetails = async () => {
    let certificateID = document.getElementById("certificateID").value
    console.log(certificateID)
    console.log(MyContract.methods)
    let result = await MyContract.methods.certificateDetails(certificateID).call()
    localStorage.setItem("certificateID", certificateID)
    localStorage.setItem("courseName", result.courseName)
    localStorage.setItem("candidateName", result.candidateName)
    localStorage.setItem("grade", result.grade)
    localStorage.setItem("date", result.date)
    const url = "viewCertificate.html"
    window.location.href = url
}