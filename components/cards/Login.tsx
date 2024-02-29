"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import { FormLogin } from "./form-login"
import { useFormState } from "react-dom"
import { useAuth } from '@/hooks/auth'

export default function Login() {
    const initState = {
        message: ''
    }
    const [state, formAction]= useFormState(FormLogin, initState)

    return (
        <div>
            <Card className="w-[350px] rounded">
                <CardHeader>
                    <CardTitle>Login You Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" placeholder="example@example.com" className="rounded" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" placeholder="password" type="password" className="rounded" />
                            </div>
                            <div className="flex justify-between">
                                <button className="btn btn-success">Cancel</button>
                                <button className="btn btn-success" type="submit">Login</button>        
                            </div>
                        </div>
                        <div>
                            Message: {state.message}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
