import { NextResponse } from "next/server";
import { createThirdwebClient, getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { privateKeyToAccount } from "thirdweb/wallets";
import { mintTo } from "thirdweb/extensions/erc721";

export async function POST() {

  try {

    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY!,
    });

    const account = privateKeyToAccount({
      client,
      privateKey: process.env.PRIVATE_KEY!,
    });

    const contract = getContract({
      client,
      chain: base,
      address: process.env.CONTRACT_ADDRESS!,
    });

    const tx = await mintTo({
      contract,
      to: account.address,
      nft: {
        name: "Farcaster Builder NFT",
        description: "Minted from Farcaster Mini App",
        image: "https://placehold.co/600x600/png",
      },
    });

    return NextResponse.json({
      success: true,
      message: "NFT Minted Successfully 🚀",
      tx
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      message: "Mint failed",
      error
    });

  }

}