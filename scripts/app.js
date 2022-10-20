connectToMetamask = async () => {
    let accounts = await ethereum.request({method: 'eth_requestAccounts'})
    alert("connected to " +accounts[0]);
}

window.onload = async () => {
    let contractAddress = "0x5fB3a64d5824446c4d48A390244E5A072cC70AeC"
    let abi = 
        [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "certificates",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "courseName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "candidateName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "grade",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "date",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_certificateID",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_courseName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_candidateName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_grade",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_date",
                        "type": "string"
                    }
                ],
                "name": "newCertificate",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
    
    web3 = new Web3(ethereum)
    MyContract = new web3.eth.Contract(abi,contractAddress)
}

issueCertificate = async () => {
    let certificateID = document.getElementById("certificateID").value
    let courseName = document.getElementById("courseName").value
    let candidateName =  document.getElementById("candidateName").value
    let grade = document.getElementById("grade").value
    let date = document.getElementById("date").value
    console.log(certificateID, courseName, candidateName, grade, date)

    let trxReceipt = await MyContract.methods.newCertificate(certificateID, courseName,candidateName, grade, date).send({ from: ethereum.selectedAddress })
    console.log(trxReceipt)
   
    alert("Certificate is issued for " + certificateID)
}


getCertificate  = async () => {
    let certificateID = document.getElementById("certificateID").value
   // console.log(certificateID)
   
    let result = await MyContract.methods.certificates(certificateID).call()
    console.log(result)
    localStorage.setItem("certificateID", certificateID)
    localStorage.setItem("courseName", result.courseName)
    localStorage.setItem("candidateName", result.candidateName)
    localStorage.setItem("grade", result.grade)
    localStorage.setItem("date", result.date)
    const url = "viewCertificate.html"
    window.location.href = url
}