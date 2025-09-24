
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { login } from '@/utlis/supabase/actions'
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
          <form
          action={login}
          className="flex flex-col gap-3">
          <Input
          name='email'
          placeholder='Enter Email'
          />
          <Input
          name='password'
          placeholder='Enter Password'
          />
          <Button type='submit'>Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home