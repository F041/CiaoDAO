import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xFF6A3010910D94126cF12559c0EB76769bE639aB");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Italian Flag",
        description: "This NFT will give you access to CiaoDAO!",
        image: readFileSync("scripts/assets/ItalianFlag.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();