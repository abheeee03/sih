"use client"

import { useState } from "react"
import { ConnectWallet } from "@/components/ConnectWallet"
import { useReadContract, useWriteContract } from "wagmi"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Search, User, FileText, CreditCard, Globe } from "lucide-react"
import { motion } from "framer-motion"

import { keccak256, toHex } from "viem"
import { TOURIST_REGISTRY_ABI, TOURIST_REGISTRY_ADDRESS } from "@/lib/contract"

export default function Verify() {
  return (
    <div className="min-h-screen px-10 py-5">
     <div className="flex w-full text-center items-start justify-between">
      <h1 className="text-xl font-medium mt-4">Save The Documents on Chain</h1>
      <ConnectWallet/>
     </div>
      <div className="px-40 flex flex-col gap-10">
        <TouristForm/>
        <TouristCard/>
      </div>
    </div>
  )
}

function TouristForm() {
  const [name, setName] = useState("")
  const [passport, setPassport] = useState("")
  const [aadhaar, setAadhaar] = useState("")
  const [visa, setVisa] = useState("")

  const { writeContract, isPending } = useWriteContract()

  const handleSubmit = async () => {
    if (!name || !passport || !aadhaar || !visa) return

    await writeContract({
      address: TOURIST_REGISTRY_ADDRESS,
      abi: TOURIST_REGISTRY_ABI,
      functionName: "createTourist",
      args: [
        name,
        keccak256(toHex(passport)),
        keccak256(toHex(aadhaar)),
        keccak256(toHex(visa)),
      ],
    })

    setName("")
    setPassport("")
    setAadhaar("")
    setVisa("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card >
        <CardHeader >
          <CardTitle>
            Register Tourist
          </CardTitle>
          <p>Create a new tourist record on-chain</p>
        </CardHeader>
        <CardContent>
          {[
            { id: "name", label: "Full Name", value: name, setter: setName },
            { id: "passport", label: "Passport Number", value: passport, setter: setPassport },
            { id: "aadhaar", label: "Aadhaar Number", value: aadhaar, setter: setAadhaar },
            { id: "visa", label: "Visa Number", value: visa, setter: setVisa },
          ].map((field) => (
            <div key={field.id} className="">
              <Label htmlFor={field.id} className="mb-2">{field.label}</Label>
              <Input
                id={field.id}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={field.value}
                className="mb-5"
                onChange={(e) => field.setter(e.target.value)}
              />
            </div>
          ))}

          <Button
            onClick={handleSubmit}
            disabled={isPending || !name || !passport || !aadhaar || !visa}
            className="w-full rounded-xl"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Create Tourist Record"
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

type TouristData = [string, string, string, string, string]

function TouristCard() {
  const [touristId, setTouristId] = useState("")
  const [idToFetch, setIdToFetch] = useState<number | null>(null)

  const { data, isLoading } = useReadContract({
    address: TOURIST_REGISTRY_ADDRESS,
    abi: TOURIST_REGISTRY_ABI,
    functionName: "getTourist",
    args: idToFetch ? [BigInt(idToFetch)] : undefined,
  })

  const touristData = data as TouristData | undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card >
        <CardHeader >
          <CardTitle >
            Verify Tourist Record
          </CardTitle>
          <p >Search and verify existing records</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tourist-id">Tourist ID</Label>
            <Input
              id="tourist-id"
              placeholder="Enter tourist ID"
              value={touristId}
              onChange={(e) => setTouristId(e.target.value)}
              className="rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <Button
            onClick={() => setIdToFetch(Number(touristId))}
            disabled={!touristId || isNaN(Number(touristId))}
            className="w-full rounded-xl"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Record
          </Button>

          {isLoading && (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading tourist data...
            </div>
          )}

          {touristData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 space-y-5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">
                  <User className="w-3 h-3 mr-1" />
                  Record Found
                </Badge>
              </div>

              <Separator />

              <div className="space-y-4">
                {[
                  { icon: <User className="w-4 h-4 text-green-600" />, label: "Name", value: touristData[0] },
                  { icon: <FileText className="w-4 h-4 text-green-600" />, label: "Passport Hash", value: touristData[1] },
                  { icon: <CreditCard className="w-4 h-4 text-green-600" />, label: "Aadhaar Hash", value: touristData[2] },
                  { icon: <Globe className="w-4 h-4 text-green-600" />, label: "Visa Hash", value: touristData[3] },
                  { icon: <User className="w-4 h-4 text-green-600" />, label: "Issuer", value: touristData[4] },
                ].map((field, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-green-200 last:border-0"
                  >
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      {field.icon}
                      {field.label}
                    </div>
                    <span className="text-gray-900 font-mono text-sm bg-white/70 px-2 py-1 rounded">
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
