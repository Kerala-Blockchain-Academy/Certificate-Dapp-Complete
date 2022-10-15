connectToMetaMask = async () => {
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    alert("Connected to " + accounts[0])
}

fetchJSON = async () => {
    try {
        let res = await fetch("build/contracts/Certi.json")
        let json = res.json()
        return json
    } catch (error) {
        console.log(error)
    }
}

window.onload = async () => {
    let { abi, networks } = await fetchJSON()
    const contractAddress = networks['5777'].address
    web3 = new Web3(ethereum)
    MyContract = new web3.eth.Contract(abi, contractAddress)
}

issueCertificate = async () => {
    let certificateID = document.getElementById("certificateID").value
    let courseName = document.getElementById("courseName").value
    let candidateName = document.getElementById("candidateName").value
    let grade = document.getElementById("grade").value
    let date = document.getElementById("date").value
    let trxReceipt = await MyContract.methods.newCertificate(certificateID, courseName, candidateName, grade, date)
        .send({ from: ethereum.selectedAddress, gasLimit: 500000 })
    console.log("Trx: ", trxReceipt)
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