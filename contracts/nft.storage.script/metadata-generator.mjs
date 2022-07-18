import { NFTStorage, File } from "nft.storage"
import fs from "fs"
import path from "path"
import mime from "mime"
import dotenv from "dotenv"

dotenv.config()

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY


async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath)
  const type = mime.getType(filePath)
  return new File([content], path.basename(filePath), { type })
}


async function main() {
  const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY })
  const files = []
  for (var i = 0; i <= 49; i++) {
  
   
    const nft = {
      image: "ipfs://bafybeigzgthzqzthfkojdw6q5xk6qekj47oghouyfncg27ebx33loxnv34/" + i + "." + "png", 
      name: "BioFi NFT",
      description: "This is your BioFi NFT",
      }
     fs.writeFileSync(`/Users/hemesky/Desktop/bioFi/biofi-back/metadata/${i}.json`, JSON.stringify(nft));
     files.push(await fileFromPath(`/Users/hemesky/Desktop/bioFi/biofi-back/metadata/${i}.json`))

    }

  
  
  const cid = await nftStorage.storeDirectory(files)

  console.log(files)
}

main()