const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const { bytecode, interface } = require("../compile");
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const initialMesssage = "Hi there";

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [initialMesssage],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, initialMesssage);
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("Bye there").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "Bye there");
  });
});
