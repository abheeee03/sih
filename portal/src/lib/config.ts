import { QueryClient } from "@tanstack/react-query";
import { mainnet, sepolia } from "viem/chains";
import { createConfig, http } from "wagmi";


export const config = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http()
    },
  })
  
export const queryClient = new QueryClient();