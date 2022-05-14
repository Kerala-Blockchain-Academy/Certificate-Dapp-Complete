const Certi = artifacts.require("Certi");

contract("Certi", function (accounts) {
  it("Testing Deployment", async function () {
    await Certi.deployed();
    return assert.isTrue(true);
  });

  it("Testing Certificate Issue", async function () {
    let instance = await Certi.deployed();

    let txRecipt = await instance.newCertificate("EB101", "Ethereum Bootcamp", "Ananthan", "S", "14-05-2022", {from: accounts[0]});

    let result = await instance.certificateDetails("EB101");

    assert.equal(result.courseName, "Ethereum Bootcamp");
    assert.equal(result.candidateName, "Ananthan");
    assert.equal(result.grade, "S");
    assert.equal(result.date, "14-05-2022");
  });

  
});
