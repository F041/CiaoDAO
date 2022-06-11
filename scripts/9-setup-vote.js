import sdk from "./1-initialize-sdk.js";

// Our governance contract.
const vote = sdk.getVote("0x90cF4B9860D2b5EC76E29f5BACCEd3c9627Ae386");

// Our ERC-20 contract.
const token = sdk.getToken("0xd1Bd927636549584C5234447Dc3d97118E78ba28");

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());
    // I don't like it
    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent = Number(ownedAmount) / 100 * 98.7;

    // Transfer 98.7% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent
    ); 

    console.log("✅ Successfully transferred " + percent + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();