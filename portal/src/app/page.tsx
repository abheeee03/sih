"use client"
import BentoGrid from '@/components/ui-components/bento-grid'
import { Button } from '@/components/ui/button'
import WorldMap from '@/components/ui/world-map'
import { motion } from 'framer-motion'
import { DownloadIcon, UserCheck } from 'lucide-react'
import { Inter_Tight, Plus_Jakarta_Sans } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const jarkarta = Plus_Jakarta_Sans()
const tightInter = Inter_Tight()



function Home() {
  return (
    <>
    <motion.div
    initial={{
      top: -100,
      opacity: 0
    }}
    animate={{
      top: 0,
      opacity: 1
    }}
    transition={{
      duration: 0.5
    }}
    className="z-20 fixed w-full px-10 py-5 backdrop-blur-3xl border-b-1">
      <div className="flex items-center justify-between">
        <h1>TourGuard</h1>
        <div className="flex gap-6">
        <Link href={'/'} className='hover:underline'>Download App</Link>
        <Link href={'/login'} className='hover:underline'>Admin Login</Link>
        <Link href={'https://github.com/abheeee03'} className='hover:underline'>Support</Link>
        </div>
      </div>
    </motion.div>
    <div className='min-h-screen w-full'>

      {/* HERO  */}
      <motion.div
      initial={{
        bottom: 100,
          opacity: 0
       }}
       animate={{
        bottom: 0,
          opacity: 1
        }}
         transition={{
        duration: 0.7
        }}
      className="w-fullx flex items-center justify-start flex-col gap-4 px-4">
        <span className='mt-40 border rounded-full px-5 py-1 text-sm'>Introducing TourGuard</span>
        <h1 
         
        className={`text-center text-4xl ${tightInter.className} font-medium`}>
          Trusted Travel with <br /> AI Intelligence & Blockchain Security.
        </h1>
        <p className={`${jarkarta.className} text-lg max-w-2xl text-center`}>Seamless travel safety powered by tamper-proof blockchain IDs, AI-driven alerts, and smart emergency response.</p>
        <div className="flex gap-5">
          <Button>
            <Link className='flex gap-2 items-center justify-center' href={'/'}>
            Download App <DownloadIcon/>
            </Link>
             </Button>
          <Button>
            <Link className='flex gap-2 items-center justify-center' href={'/login'}>
            Admin Login <UserCheck/> 
            </Link>
            </Button>
        </div>
      </motion.div>
      

    
      <div className="z-0 h-screen w-full">
        <BentoGrid />
      </div>
      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div>



    </div>
    </>
  )
}

export default Home