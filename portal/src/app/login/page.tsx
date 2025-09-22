
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'

function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
          <h1 className='text-center'>Admin Login</h1>

          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
          <Input
          placeholder='Enter Email'
          />
          <Input
          placeholder='Enter Password'
          />
          <Button>Login</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home